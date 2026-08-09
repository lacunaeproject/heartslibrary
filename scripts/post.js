#!/usr/bin/env node
/* ============================================================
   POST A TRIP — turns a folder of photos and a plain-text note
   into an entry in js/photos.js. No dimensions to look up, no
   JavaScript to hand-write.

     node scripts/post.js big-sur

   It reads photos/big-sur/trip.txt, which you write the way you
   would text someone about the trip:

     Big Sur, Highway 1
     May 2025 · North America

     Windows down, fog in, fog out.

     bixby.jpg
     redwoods.jpg

     Stopped at every pull-off between
     Carmel and Lucia. Regretted none of it.

     mcway.jpg  The cove, four minutes of light

   Line 1 is the title. Line 2 is when it happened, plus an
   optional continent and an optional YYYY-MM-DD for ordering.
   After that: blank-line-separated blocks. A block of filenames
   is a group of photos; anything else is you talking, and shows
   up on the trip page as a message bubble. Two spaces after a
   filename gives that one frame a caption. Most won't need one.

   Pass --dry to print the entry instead of writing it.
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PHOTOS_JS = path.join(ROOT, "js", "photos.js");
const IMAGE_RE = /\.(jpe?g|png|webp|svg)$/i;
const VIDEO_RE = /\.(mp4|mov|m4v|webm)$/i;
const MEDIA_RE = /\.(jpe?g|png|webp|svg|mp4|mov|m4v|webm)$/i;
/* anything past this is too heavy for a static host to serve happily */
const FAT_MB = 8;

const MONTHS = ["january", "february", "march", "april", "may", "june", "july",
                "august", "september", "october", "november", "december"];
const CONTINENTS = ["North America", "South America", "Europe", "Africa", "Asia",
                    "Oceania", "Antarctica"];

/* ---------- reading pixel dimensions straight out of the file ---------- */

function jpegSize(buf) {
  let i = 2; /* past SOI */
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    /* SOF0-SOF15 carry the frame header; C4/C8/CC are other tables */
    if (marker >= 0xc0 && marker <= 0xcf &&
        marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
    }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd9)) { i += 2; continue; }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function webpSize(buf) {
  const fmt = buf.toString("ascii", 12, 16);
  if (fmt === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  if (fmt === "VP8L") {
    const b = buf.readUInt32LE(21);
    return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
  }
  if (fmt === "VP8X") {
    return { w: (buf.readUIntLE(24, 3) & 0xffffff) + 1, h: (buf.readUIntLE(27, 3) & 0xffffff) + 1 };
  }
  return null;
}

function svgSize(buf) {
  const s = buf.toString("utf8", 0, 2000);
  const vb = s.match(/viewBox\s*=\s*"[\d.\-]+\s+[\d.\-]+\s+([\d.]+)\s+([\d.]+)"/);
  if (vb) return { w: Math.round(+vb[1]), h: Math.round(+vb[2]) };
  const w = s.match(/\swidth\s*=\s*"([\d.]+)/), h = s.match(/\sheight\s*=\s*"([\d.]+)/);
  if (w && h) return { w: Math.round(+w[1]), h: Math.round(+h[1]) };
  return null;
}

/* MP4/MOV: walk the box tree for the visual sample description, which
   carries the coded width and height, and mvhd for the duration. */
function mp4Info(buf) {
  const NEST = new Set(["moov", "trak", "mdia", "minf", "stbl"]);
  let out = null, seconds = 0, turned = false;
  (function walk(start, end) {
    let i = start;
    while (i < end - 8) {
      let size = buf.readUInt32BE(i);
      const type = buf.toString("ascii", i + 4, i + 8);
      let hdr = 8;
      if (size === 1) { size = Number(buf.readBigUInt64BE(i + 8)); hdr = 16; }
      if (size < 8 || i + size > end) break;
      /* A phone held upright records landscape frames plus a rotation
         matrix. Trust the matrix, or the page reserves a letterbox the
         picture never fills. */
      if (type === "tkhd") {
        const body = i + hdr;
        const m = body + (buf[body] === 1 ? 52 : 40);
        const a = buf.readInt32BE(m) / 65536, b = buf.readInt32BE(m + 4) / 65536;
        const c = buf.readInt32BE(m + 12) / 65536, d = buf.readInt32BE(m + 16) / 65536;
        if (Math.abs(a) < 0.01 && Math.abs(d) < 0.01 && (Math.abs(b) > 0.5 || Math.abs(c) > 0.5)) {
          turned = true;
        }
      }
      if (type === "mvhd") {
        const v = buf[i + hdr];
        const scale = v === 1 ? Number(buf.readBigUInt64BE(i + hdr + 20)) : buf.readUInt32BE(i + hdr + 12);
        const dur = v === 1 ? Number(buf.readBigUInt64BE(i + hdr + 28)) : buf.readUInt32BE(i + hdr + 16);
        if (scale) seconds = dur / scale;
      }
      if (type === "stsd" && !out) {
        const n = buf.readUInt32BE(i + hdr + 4);
        let o = i + hdr + 8;
        for (let k = 0; k < n && o < i + size; k++) {
          const codec = buf.toString("ascii", o + 4, o + 8);
          if (["avc1", "hvc1", "hev1", "mp4v", "vp09", "av01"].includes(codec)) {
            out = { w: buf.readUInt16BE(o + 32), h: buf.readUInt16BE(o + 34), codec };
          }
          o += buf.readUInt32BE(o);
        }
      }
      if (NEST.has(type)) walk(i + hdr, i + size);
      i += size;
    }
  })(0, buf.length);
  if (out) {
    out.seconds = seconds;
    if (turned) { const w = out.w; out.w = out.h; out.h = w; out.rotated = true; }
  }
  return out;
}

function dimensions(file) {
  const buf = fs.readFileSync(file);
  if (buf.length < 24) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8) return jpegSize(buf);
  if (buf.toString("ascii", 1, 4) === "PNG") return pngSize(buf);
  if (buf.toString("ascii", 0, 4) === "RIFF") return webpSize(buf);
  if (/\.svg$/i.test(file)) return svgSize(buf);
  if (VIDEO_RE.test(file)) return mp4Info(buf);
  return null;
}

/* ---------- the trip.txt format ---------- */

function parseTrip(text, slug) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let at = 0;
  while (at < lines.length && !lines[at].trim()) at++;

  const titleLine = (lines[at++] || "").trim();
  if (!titleLine) throw new Error("trip.txt needs a title on the first line");
  const whenLine = (lines[at++] || "").trim();
  if (!whenLine) throw new Error("trip.txt needs a date on the second line, e.g. 'May 2025'");

  /* "Big Sur, Highway 1 | Big Sur"  — the short name is optional */
  let place = titleLine, short = "";
  const piped = titleLine.split("|");
  if (piped.length > 1) { place = piped[0].trim(); short = piped[1].trim(); }
  if (!short) short = place.split(",")[0].trim();

  /* "May 2025 · North America · 2025-05-18" — last two optional */
  const fields = whenLine.split("·").map(s => s.trim()).filter(Boolean);
  let when = "", continent = "", posted = "";
  for (const f of fields) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(f)) posted = f;
    else if (CONTINENTS.some(c => c.toLowerCase() === f.toLowerCase())) {
      continent = CONTINENTS.find(c => c.toLowerCase() === f.toLowerCase());
    } else if (!when) when = f;
  }
  if (!when) throw new Error(`could not read a date from "${whenLine}"`);
  if (!posted) {
    const m = when.match(/([A-Za-z]+)\s+(\d{4})/);
    if (!m || MONTHS.indexOf(m[1].toLowerCase()) < 0) {
      throw new Error(`"${when}" needs a month and year, e.g. "May 2025", or an explicit · 2025-05-18`);
    }
    posted = `${m[2]}-${String(MONTHS.indexOf(m[1].toLowerCase()) + 1).padStart(2, "0")}-01`;
  }

  /* One blank-line-separated block is one post. Inside it, a line that
     names a file is media, a line in [brackets] is the dateline, and
     everything else is what you wrote. Media rides inside the post it
     belongs to, which is what makes a clip read as one moment. */
  const blocks = lines.slice(at).join("\n").split(/\n\s*\n/)
    .map(b => b.trim()).filter(Boolean);

  const photos = [], beats = [];
  let post = null;
  const open = () => { post = {}; beats.push(post); return post; };

  for (const block of blocks) {
    const rows = block.split("\n").map(r => r.trim()).filter(Boolean);
    const shots = [], words = [];
    let stamp = "", time = "";
    for (const row of rows) {
      const bracket = row.match(/^\[(.+)\]$/);
      if (bracket && !stamp && !time && !words.length && !shots.length) {
        /* [Encore], [2026-08-08T21:47], or [Encore · 2026-08-08T21:47] */
        for (const bit of bracket[1].split("·").map(s => s.trim()).filter(Boolean)) {
          if (/^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2})?$/.test(bit)) time = bit.replace(" ", "T");
          else if (!stamp) stamp = bit;
        }
        continue;
      }
      const head = row.split(/\s{2,}/)[0];
      if (MEDIA_RE.test(head)) {
        const [file, ...rest] = row.split(/\s{2,}/);
        shots.push(photos.length);
        photos.push({ file, caption: rest.join(" ").trim() });
      } else {
        words.push(row);
      }
    }
    if (!shots.length && !words.length && !stamp && !time) continue;

    /* A dateline always opens a post. Otherwise a block of files joins
       the post above it — writing the words, leaving a blank line, then
       listing the photos is the natural way to type one — and a block of
       prose opens a new post only once the one above already has media. */
    if (stamp || time || !post || (words.length && post.shots)) open();
    if (stamp) post.at = stamp;
    if (time) post.time = time;
    if (words.length) post.say = post.say ? post.say + " " + words.join(" ") : words.join(" ");
    if (shots.length) post.shots = (post.shots || []).concat(shots);
  }
  return { slug, place, short, when, continent, posted, photos, beats };
}

/* ---------- serialising back into photos.js, in the house style ---------- */

const q = s => '"' + String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';

function serializeTrip(t) {
  const out = [];
  out.push("  {");
  out.push(`    slug: ${q(t.slug)},`);
  out.push(`    posted: ${q(t.posted)},`);
  out.push(`    place: ${q(t.place)},`);
  out.push(`    short: ${q(t.short)},`);
  /* Curation the site adds by hand — the experience's full billing,
     its venue, and which frames are highlights. This writer replaces
     the whole TRIPS array, so anything it forgets to print is lost
     from every trip, not just the one being posted. */
  if (t.nav) out.push(`    nav: ${q(t.nav)},`);
  if (t.loc) out.push(`    loc: ${q(t.loc)},`);
  out.push(`    when: ${q(t.when)},`);
  if (t.continent) out.push(`    continent: ${q(t.continent)},`);
  if (t.cover) out.push(`    cover: ${q(t.cover)},`);
  if (t.note) out.push(`    note: ${q(t.note)},`);
  out.push("    photos: [");
  out.push(t.photos.map(p => {
    let row = `      { src: ${q(p.src)}`;
    if (p.best) row += ", best: true";
    row += `, w: ${p.w}, h: ${p.h}`;
    if (p.video) row += ", video: true";
    if (p.seconds) row += `, seconds: ${p.seconds}`;
    row += `, alt: ${q(p.alt || "")}`;
    if (p.caption) row += `, caption: ${q(p.caption)}`;
    return row + " }";
  }).join(",\n"));
  out.push("    ]" + (t.beats && t.beats.length ? "," : ""));
  if (t.beats && t.beats.length) {
    out.push("    beats: [");
    out.push(t.beats.map(b => {
      const bits = [];
      if (b.at) bits.push(`at: ${q(b.at)}`);
      if (b.time) bits.push(`time: ${q(b.time)}`);
      if (b.say) bits.push(`say: ${q(b.say)}`);
      if (b.shots) bits.push(`shots: [${b.shots.join(", ")}]`);
      return `      { ${bits.join(", ")} }`;
    }).join(",\n"));
    out.push("    ]");
  }
  out.push("  }");
  return out.join("\n");
}

function loadTrips() {
  const sandbox = { window: {} };
  new Function("window", fs.readFileSync(PHOTOS_JS, "utf8"))(sandbox.window);
  return sandbox.window.TRIPS || [];
}

/* Replace only the TRIPS array in place. Everything around it —
   the header comment above, the MOMENTS block below — is left
   byte for byte, and the file's CRLF endings are preserved. */
function writeTrips(trips) {
  const raw = fs.readFileSync(PHOTOS_JS, "utf8");
  const crlf = raw.includes("\r\n");
  const src = raw.replace(/\r\n/g, "\n");

  const start = src.indexOf("window.TRIPS = [");
  if (start < 0) throw new Error("could not find `window.TRIPS = [` in js/photos.js");
  const end = src.indexOf("\n];", start);
  if (end < 0) throw new Error("could not find the end of the TRIPS array in js/photos.js");

  const body = "window.TRIPS = [\n" + trips.map(serializeTrip).join(",\n") + "\n];";
  let out = src.slice(0, start) + body + src.slice(end + 3);
  if (crlf) out = out.replace(/\n/g, "\r\n");
  fs.writeFileSync(PHOTOS_JS, out, "utf8");
}

/* ---------- main ---------- */

function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const slug = args.filter(a => !a.startsWith("--"))[0];
  if (!slug) {
    console.error("usage: node scripts/post.js <folder-name> [--dry]");
    process.exit(1);
  }

  const dir = path.join(ROOT, "photos", slug);
  const notePath = path.join(dir, "trip.txt");
  if (!fs.existsSync(notePath)) {
    console.error(`no trip.txt in photos/${slug}/ — write one first (see the header of this file)`);
    process.exit(1);
  }

  const trip = parseTrip(fs.readFileSync(notePath, "utf8"), slug);
  if (!trip.photos.length) {
    console.error("that trip.txt lists no photos");
    process.exit(1);
  }

  let missingAlt = 0;
  const heavy = [];
  for (const p of trip.photos) {
    const file = path.join(dir, p.file);
    if (!fs.existsSync(file)) {
      console.error(`missing file: photos/${slug}/${p.file}`);
      process.exit(1);
    }
    const size = dimensions(file);
    if (!size) {
      console.error(`could not read dimensions from photos/${slug}/${p.file} — convert it to JPEG, PNG or MP4`);
      process.exit(1);
    }
    p.src = `photos/${slug}/${p.file}`;
    p.w = size.w;
    p.h = size.h;
    if (VIDEO_RE.test(p.file)) {
      p.video = true;
      if (size.seconds) p.seconds = Math.round(size.seconds * 10) / 10;
      const mb = fs.statSync(file).size / 1048576;
      if (mb > FAT_MB || !/\.(mp4|webm)$/i.test(p.file)) {
        heavy.push({ file: p.file, mb, w: size.w, codec: size.codec });
      }
    }
    /* a caption doubles as alt text; without one we fall back to the
       trip name so the image is never announced as unlabelled */
    p.alt = p.caption || trip.place;
    if (!p.caption) missingAlt++;
    delete p.file;
  }

  /* Re-posting a trip rebuilds it from trip.txt, which knows nothing
     about the curation added on the site — carry it across so a
     re-post never silently un-highlights a wall. Merged before the
     dry run prints, so --dry shows what would actually be written. */
  const existing = loadTrips();
  const prior = existing.filter(t => t.slug === slug)[0];
  if (prior) {
    if (prior.nav && !trip.nav) trip.nav = prior.nav;
    if (prior.loc && !trip.loc) trip.loc = prior.loc;
    const wasBest = {};
    (prior.photos || []).forEach(p => { if (p.best) wasBest[p.src] = true; });
    trip.photos.forEach(p => { if (wasBest[p.src]) p.best = true; });
  }

  if (dry) {
    console.log(serializeTrip(trip));
    return;
  }

  const trips = existing.filter(t => t.slug !== slug);
  trips.push(trip);
  trips.sort((a, b) => (a.posted < b.posted ? 1 : a.posted > b.posted ? -1 : 0));
  writeTrips(trips);

  const pos = trips.findIndex(t => t.slug === slug) + 1;
  console.log(`posted ${trip.place} — ${trip.photos.length} frames, ` +
              `${trip.beats.filter(b => b.say).length} notes, #${pos} of ${trips.length}`);
  if (missingAlt) {
    console.log(`${missingAlt} frame${missingAlt > 1 ? "s" : ""} fell back to "${trip.place}" ` +
                `for alt text — add captions in trip.txt and re-run to improve them`);
  }
  for (const v of heavy) {
    console.log(`\n  ⚠ ${v.file} is ${v.mb.toFixed(1)} MB at ${v.w}px wide.`);
    console.log(`    A static host will crawl, and git keeps it forever. Transcode first:`);
    console.log(`      ffmpeg -i photos/${slug}/${v.file} -vf scale=-2:1080 -c:v libx264 \\`);
    console.log(`             -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart \\`);
    console.log(`             -map_metadata -1 photos/${slug}/${v.file.replace(/\.[^.]+$/, "")}.mp4`);
    console.log(`    then point trip.txt at the .mp4 and re-run this.`);
  }
  console.log("\nremember to bump the ?v= in the HTML pages so caches pick it up");
}

if (require.main === module) main();

module.exports = { parseTrip, serializeTrip, dimensions, loadTrips };
