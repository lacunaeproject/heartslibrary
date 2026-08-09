#!/usr/bin/env node
/* ============================================================
   NORMALISE WHAT THE PHONE UPLOADED — resize the photographs,
   transcode the clips, and rewrite trip.txt to match. Runs in CI
   before scripts/post.js, so a 12 MB frame straight off a camera
   becomes something a static host can actually serve.

     node scripts/prep-media.js [slug ...]

   With no arguments it walks every photos/<slug>/ that has a
   trip.txt. Idempotent: anything already within the limits below
   is left untouched, so re-running is free.

   Needs ffmpeg on PATH (and heif-convert for HEIC). The GitHub
   workflow installs both.
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { dimensions } = require("./post.js");

const ROOT = path.resolve(__dirname, "..");
const PHOTOS = path.join(ROOT, "photos");

/* what a static host can serve without anyone noticing */
const PHOTO_EDGE = 1600;      // longest side, px
const PHOTO_MAX_KB = 700;
const VIDEO_SHORT = 1080;     // shortest side, px
const VIDEO_MAX_MB = 8;

const IMAGE_RE = /\.(jpe?g|png|webp)$/i;
const HEIC_RE = /\.(heic|heif)$/i;
const VIDEO_RE = /\.(mp4|mov|m4v|webm|avi)$/i;

const kb = f => fs.statSync(f).size / 1024;
const mb = f => fs.statSync(f).size / 1048576;
const even = n => (n % 2 ? n - 1 : n);

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: ["ignore", "ignore", "pipe"] });
}

/* ---------- one file at a time ---------- */

function prepHeic(dir, name) {
  const from = path.join(dir, name);
  const to = from.replace(HEIC_RE, ".jpg");
  run("heif-convert", ["-q", "88", from, to]);
  fs.unlinkSync(from);
  return { renamed: [name, path.basename(to)] };
}

function prepPhoto(dir, name) {
  const file = path.join(dir, name);
  const d = dimensions(file);
  if (!d) return null;
  const long = Math.max(d.w, d.h);
  if (long <= PHOTO_EDGE && kb(file) <= PHOTO_MAX_KB) return null;

  const scale = Math.min(1, PHOTO_EDGE / long);
  const w = even(Math.round(d.w * scale));
  const h = even(Math.round(d.h * scale));
  const out = file.replace(IMAGE_RE, ".jpg");
  const tmp = out + ".tmp.jpg";
  run("ffmpeg", ["-y", "-i", file, "-vf", `scale=${w}:${h}`, "-q:v", "3",
                 "-map_metadata", "-1", tmp]);
  fs.renameSync(tmp, out);
  if (out !== file) fs.unlinkSync(file);
  return { renamed: out !== file ? [name, path.basename(out)] : null,
           note: `${d.w}x${d.h} -> ${w}x${h}` };
}

function prepVideo(dir, name) {
  const file = path.join(dir, name);
  const d = dimensions(file);
  const isMp4 = /\.mp4$/i.test(name);
  const short = d ? Math.min(d.w, d.h) : 0;
  if (isMp4 && short && short <= VIDEO_SHORT && mb(file) <= VIDEO_MAX_MB) return null;

  /* dimensions() already accounts for the rotation matrix, so these
     are the numbers the viewer actually sees */
  let w = d ? d.w : 0, h = d ? d.h : 0;
  if (short > VIDEO_SHORT) {
    const scale = VIDEO_SHORT / short;
    w = even(Math.round(w * scale));
    h = even(Math.round(h * scale));
  }
  const out = file.replace(/\.[^.]+$/, ".mp4");
  const tmp = out + ".tmp.mp4";
  const args = ["-y", "-i", file];
  if (w && h) args.push("-vf", `scale=${w}:${h}`);
  args.push("-c:v", "libx264", "-crf", "23", "-preset", "slow", "-pix_fmt", "yuv420p",
            /* one audio track only — phones attach spatial-audio and motion
               tracks that browsers choke on */
            "-map", "0:v:0", "-map", "0:a:0?", "-c:a", "aac", "-b:a", "128k",
            "-movflags", "+faststart", "-map_metadata", "-1", tmp);
  run("ffmpeg", args);
  fs.renameSync(tmp, out);
  if (out !== file) fs.unlinkSync(file);
  return { renamed: out !== file ? [name, path.basename(out)] : null,
           note: `${mb(out).toFixed(1)} MB` };
}

/* ---------- a folder at a time ---------- */

function prepTrip(slug) {
  const dir = path.join(PHOTOS, slug);
  const notePath = path.join(dir, "trip.txt");
  if (!fs.existsSync(notePath)) return 0;

  const renames = [];
  let changed = 0;

  for (const name of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, name);
    if (!fs.statSync(full).isFile() || name === "trip.txt") continue;
    if (/\.svg$/i.test(name)) continue;   // generated placeholder art

    let res = null;
    try {
      if (HEIC_RE.test(name)) res = prepHeic(dir, name);
      else if (IMAGE_RE.test(name)) res = prepPhoto(dir, name);
      else if (VIDEO_RE.test(name)) res = prepVideo(dir, name);
    } catch (e) {
      console.error(`  ! ${slug}/${name} — ${String(e.message).split("\n")[0]}`);
      process.exitCode = 1;
      continue;
    }
    if (!res) continue;
    changed++;
    if (res.renamed) renames.push(res.renamed);
    console.log(`  ${slug}/${name}${res.renamed ? " -> " + res.renamed[1] : ""}` +
                (res.note ? `  (${res.note})` : ""));
  }

  /* point trip.txt at whatever the files are called now */
  if (renames.length) {
    let text = fs.readFileSync(notePath, "utf8");
    for (const [from, to] of renames) {
      text = text.split(from).join(to);
    }
    fs.writeFileSync(notePath, text, "utf8");
  }
  return changed;
}

function main() {
  if (!fs.existsSync(PHOTOS)) return;
  const asked = process.argv.slice(2).filter(a => !a.startsWith("--"));
  const slugs = asked.length ? asked : fs.readdirSync(PHOTOS).filter(s =>
    fs.existsSync(path.join(PHOTOS, s, "trip.txt")));

  let total = 0;
  for (const slug of slugs) total += prepTrip(slug);
  console.log(total ? `\nnormalised ${total} file${total > 1 ? "s" : ""}`
                    : "nothing needed normalising");
}

if (require.main === module) main();
module.exports = { prepTrip };
