/**
 * One-shot batch downloader for author portraits from Wikipedia /
 * Wikimedia Commons. Hits the page-summary REST API for each author,
 * pulls the lead image's source URL, saves it to authors/<slug>.jpg,
 * and writes attribution to authors/ATTRIBUTION.md.
 *
 * Idempotent — already-downloaded files are skipped on rerun.
 *
 * Run from the repo root:  node authors/_download_authors.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const UA = 'HeartsLibraryBot/1.0 (codynheart@gmail.com)';
const AUTHORS_DIR = 'authors';
const REQUEST_DELAY_MS = 1500;
const MAX_RETRIES = 3;

// [display_name, [wikipedia_title_candidates], slug]
// Multiple candidates handle authors whose bare-name page is a
// disambiguation; we try each in order and use the first that
// resolves to a person with a lead image.
const AUTHORS = [
  ['Larry McMurtry',          ['Larry McMurtry'],                                       'larry-mcmurtry'],
  ['Barbara Kingsolver',      ['Barbara Kingsolver'],                                   'barbara-kingsolver'],
  ['John Williams (Stoner)',  ['John Edward Williams', 'John Williams (author)'],       'john-williams'],
  ['John Steinbeck',          ['John Steinbeck'],                                       'john-steinbeck'],
  ['James Baldwin',           ['James Baldwin'],                                        'james-baldwin'],
  ['Andy Weir',               ['Andy Weir'],                                            'andy-weir'],
  ['Michael Crichton',        ['Michael Crichton'],                                     'michael-crichton'],
  ['Pierce Brown',            ['Pierce Brown', 'Pierce Brown (author)', 'Pierce Brown (novelist)'], 'pierce-brown'],
  ['Frank Herbert',           ['Frank Herbert'],                                        'frank-herbert'],
  ['Christopher Ruocchio',    ['Christopher Ruocchio'],                                 'christopher-ruocchio'],
  ['Stephen King',            ['Stephen King'],                                         'stephen-king'],
  ['Susanna Clarke',          ['Susanna Clarke'],                                       'susanna-clarke'],
  ['Taylor Jenkins Reid',     ['Taylor Jenkins Reid'],                                  'taylor-jenkins-reid'],
  ['Gabrielle Zevin',         ['Gabrielle Zevin'],                                      'gabrielle-zevin'],
  ['Rashid Khalidi',          ['Rashid Khalidi'],                                       'rashid-khalidi'],
  ['Plestia Alaqad',          ['Plestia Alaqad'],                                       'plestia-alaqad'],
  ['Theodor Herzl',           ['Theodor Herzl'],                                        'theodor-herzl'],
  ['Mohammed El-Kurd',        ['Mohammed El-Kurd'],                                     'mohammed-el-kurd'],
  ['Antony Loewenstein',      ['Antony Loewenstein'],                                   'antony-loewenstein'],
  ['Lawrence Wright',         ['Lawrence Wright'],                                      'lawrence-wright'],
  ['Ta-Nehisi Coates',        ['Ta-Nehisi Coates'],                                     'ta-nehisi-coates'],
  ['Omar El Akkad',           ['Omar El Akkad'],                                        'omar-el-akkad'],
  ['Solomon Northup',         ['Solomon Northup'],                                      'solomon-northup'],
  ['Frederick Douglass',      ['Frederick Douglass'],                                   'frederick-douglass'],
  ['Nikole Hannah-Jones',     ['Nikole Hannah-Jones'],                                  'nikole-hannah-jones'],
  ['Ibram X. Kendi',          ['Ibram X. Kendi'],                                       'ibram-x-kendi'],
  ['Bryan Stevenson',         ['Bryan Stevenson'],                                      'bryan-stevenson'],
  ['Michelle Alexander',      ['Michelle Alexander', 'Michelle Alexander (lawyer)'],    'michelle-alexander'],
  ['Martin Luther King Jr.',  ['Martin Luther King Jr.'],                               'martin-luther-king-jr'],
  ['Malcolm X',               ['Malcolm X'],                                            'malcolm-x'],
  ['Anthony Ray Hinton',      ['Anthony Ray Hinton'],                                   'anthony-ray-hinton'],
  ['W. E. B. Du Bois',        ['W. E. B. Du Bois'],                                     'w-e-b-du-bois'],
  ['Jessica Valenti',         ['Jessica Valenti'],                                      'jessica-valenti'],
  ['Laura Bates',             ['Laura Bates', 'Laura Bates (writer)', 'Laura Bates (feminist writer)'], 'laura-bates'],
  ['Chanel Miller',           ['Chanel Miller'],                                        'chanel-miller'],
  ['Silvia Federici',         ['Silvia Federici'],                                      'silvia-federici'],
  ['Caroline Criado Perez',   ['Caroline Criado Perez'],                                'caroline-criado-perez'],
  ['Lindy West',              ['Lindy West'],                                           'lindy-west'],
  ['Sarah Wynn-Williams',     ['Sarah Wynn-Williams'],                                  'sarah-wynn-williams'],
  ['John Carreyrou',          ['John Carreyrou'],                                       'john-carreyrou'],
  ['Jeremy Renner',           ['Jeremy Renner'],                                        'jeremy-renner'],
  ['Matthew McConaughey',     ['Matthew McConaughey'],                                  'matthew-mcconaughey'],
  ['Buddy Guy',               ['Buddy Guy'],                                            'buddy-guy'],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, label) {
  let lastErr;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    if (attempt > 0) await sleep(2000 * attempt);
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
      if (res.status === 429) {
        const ra = parseInt(res.headers.get('retry-after') || '5', 10) * 1000;
        await sleep(Math.max(ra, 3000));
        continue;
      }
      if (!res.ok) {
        if (res.status === 404) throw new Error('HTTP 404');  // not retried
        lastErr = new Error(`HTTP ${res.status}`);
        continue;
      }
      return res;
    } catch (e) {
      lastErr = e;
      if (e.message === 'HTTP 404') throw e;
    }
  }
  throw lastErr || new Error('exhausted retries');
}

async function fetchSummary(title) {
  const encoded = encodeURIComponent(title.replace(/ /g, '_'));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
  const res = await fetchWithRetry(url, `summary ${title}`);
  return res.json();
}

async function downloadImage(url, dest) {
  const res = await fetchWithRetry(url, `image ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
  return buf.length;
}

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function processAuthor(display, titles, slug) {
  const dest = path.join(AUTHORS_DIR, `${slug}.jpg`);
  if (await fileExists(dest)) {
    return { skipped: true };
  }
  let lastErr;
  for (const title of titles) {
    try {
      const summary = await fetchSummary(title);
      if (summary.type === 'disambiguation') { lastErr = 'disambiguation'; continue; }
      // Prefer .thumbnail.source — these come pre-sized to ~320px
      // (typically 30–100KB) which is plenty for the 88px round
      // display and saves the user from downloading 5MB originals.
      const img = summary.thumbnail || summary.originalimage;
      if (!img || !img.source) { lastErr = 'no image'; continue; }
      await sleep(REQUEST_DELAY_MS);
      const bytes = await downloadImage(img.source, dest);
      const pageUrl = summary?.content_urls?.desktop?.page || '';
      return { ok: true, bytes, src: img.source, pageUrl, title };
    } catch (e) {
      lastErr = e.message;
    }
    await sleep(REQUEST_DELAY_MS);
  }
  return { error: lastErr || 'unknown' };
}

async function main() {
  await fs.mkdir(AUTHORS_DIR, { recursive: true });

  const ok = [], skipped = [], noimg = [], fail = [];
  const attribution = [];

  for (const [display, titles, slug] of AUTHORS) {
    process.stdout.write(`  ${display.padEnd(30)} `);
    const r = await processAuthor(display, titles, slug);
    if (r.skipped) {
      console.log('skip (already present)');
      skipped.push(display);
    } else if (r.ok) {
      console.log(`OK   ${Math.round(r.bytes / 1024)} KB  (${slug}.jpg)`);
      ok.push(display);
      attribution.push(
        `- **${slug}.jpg** — ${display}. Source: ${r.src} (Wikipedia: ${r.pageUrl})`
      );
    } else if (r.error === 'no image' || r.error === 'disambiguation') {
      console.log(`NO IMAGE  (${r.error})`);
      noimg.push(display);
    } else {
      console.log(`FAIL  ${r.error}`);
      fail.push([display, r.error]);
    }
    await sleep(REQUEST_DELAY_MS);
  }

  console.log();
  console.log(`OK:       ${ok.length}`);
  console.log(`SKIPPED:  ${skipped.length}`);
  console.log(`NO IMAGE: ${noimg.length}  ${JSON.stringify(noimg)}`);
  console.log(`FAIL:     ${fail.length}  ${JSON.stringify(fail.map((f) => f[0]))}`);

  // Update attribution by appending; preserve previous lines.
  const attrPath = path.join(AUTHORS_DIR, 'ATTRIBUTION.md');
  const header =
    '# Author photo attribution\n\n' +
    'Photos in this folder were pulled from English Wikipedia / Wikimedia Commons ' +
    "via the page-summary REST API. The lead image of each author's Wikipedia article " +
    'is what was downloaded. Most images on Wikimedia Commons are licensed CC-BY-SA or ' +
    'are in the public domain — verify the specific license at the source URL before ' +
    'redistributing or modifying.\n\n';

  let existing = '';
  try { existing = await fs.readFile(attrPath, 'utf8'); } catch {}
  const lines = new Set();
  for (const line of existing.split('\n')) {
    if (line.startsWith('- **')) lines.add(line);
  }
  for (const line of attribution) lines.add(line);
  const sorted = [...lines].sort();
  await fs.writeFile(attrPath, header + sorted.join('\n') + '\n', 'utf8');
  console.log(`\nWrote ${attrPath}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
