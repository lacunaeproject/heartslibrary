# Heart's Library — working notes

Cody Heart's personal site: **a photography site**, plus a handful of side
pages (pins, writing, games, dashboards) kept out of the global nav.
**Static — no build step, no package.json, no bundler, no CDN scripts.**
Open any `.html` from disk and it works. Deployed to GitHub Pages at
**heartslibrary.com** (see `CNAME`).

The books wing — the shelf, the reading log, the bookstore pages, and the
Goodreads sync that fed them — was deleted in Aug 2026. Don't restore any
of it from git history unless Cody asks.

Two longer docs already exist and are the source of truth for their topics —
read them instead of re-deriving:

- **`HOW-TO-UPDATE.md`** — how Cody posts content (trips, pins, games,
  writing). This is the doc he actually uses. Don't break the workflows it
  describes.
- **`HANDOFF.md`** — design-system provenance and the decisions log. Explains
  *why* the type/color/motion choices are what they are.

Both were reconciled against the code on 2026-08-10, after the shell was
consolidated. Where a doc and the code disagree, **the code is current** — and
fix the doc.

## Layout

| What | Where |
|---|---|
| 12 hand-maintained pages | `*.html` at repo root |
| Content data (edit these to post) | `js/photos.js`, `js/pins.js`, `js/games.js`, `js/writing.js` |
| Auto-generated | `js/photos.js` is rewritten by the poster from `photos/<slug>/trip.txt` — hand-edits to a posted trip get overwritten |
| Renderers | `js/hobby.js` (front wall, galleries, experiences index), `js/review.js` (nav/shell behavior), one `js/<name>.js` per collection |
| The page shell — head, nav, mobile menu, footer | `scripts/shell.js` — one definition, swept into every page. See below |
| Styles | `css/review.css` — all tokens live in `:root` here, and every shelled page loads it and nothing else (`print.html` also loads `css/print.css`) |
| Media pipeline | `scripts/post.js`, `scripts/prep-media.js` |
| CI | `.github/workflows/post-trip.yml` |

## Conventions that matter

**The shell is generated. There is exactly one copy of the chrome and it is
`scripts/shell.js`.** That file holds the `<head>`, the nav, the mobile menu
and the footer, plus a `PAGES` manifest giving each page its title, meta
description, canonical, which nav item is current, its scrolltitle, its body
class and its script list. Run it to sweep all of that into every page:

```
node scripts/shell.js            rewrite every page
node scripts/shell.js --check    report drift, write nothing, exit 1 if any
```

**Anything written between the fences is destroyed on the next run.** Each
managed region is bracketed by sentinel comments — `<!--#shell:head-->` /
`<!--/#shell:head-->`, and the same for `#shell:nav` (nav *and* mobile menu, one
region) and `#shell:footer`. Everything outside them is the page's own content
and is never touched. To change a nav link, the wordmark, the footer, a meta
tag or the Elsewhere menu, edit `scripts/shell.js` and run it — never a `.html`
file. (`swap()` also knows how to find un-fenced legacy markup by its landmarks
and fence it in place; that first-run migration has already happened.)

The four hand-maintained shell variants that used to be documented here are
gone. All 9 shelled pages get the same nav — including the Experiences dropdown
(`#navTrips` / `#menuTrips`), which is why every one of them loads
`js/photos.js` and `js/hobby.js` to fill it. `aria-current` follows the
manifest's `current` key, so pages the nav doesn't link to (gallery, writing,
pins, games, dashboards) correctly have none.

Three pages carry `shell: false` and render their own chrome by design:
`photos.html` (redirect stub), `post.html` (the noindex phone composer) and
`print.html` (the noindex scrapbook tool). They stay in the manifest only so
the cache-stamp sweep still reaches them — in practice just `print.html`, the
one of the three that links a stamped asset. Don't "fix" any of them.

`nav__back` and `nav__wordmark` are gone. Every page now carries the same
`.wordmark` — "Cody Heart" with the heart as the full stop — and it links home,
so no page needs a bespoke back affordance. The `nav__scrolltitle` is an
ordinary flex child between the wordmark and the links, not absolutely centred;
see `css/review.css:386` for why.

**One naming register on the shelled pages.** Everything the shell touches
titles "… — Cody Heart Photography" (index is the bare
"Cody Heart Photography"), assembled from `SITE.suffix` in `scripts/shell.js`,
so it cannot drift. The only survivors of the old second register are the three
chrome-free pages, whose heads are hand-written: `post.html` and `print.html`
say "— Heart's Library", `photos.html` says "— Cody Heart". The books wing that
justified that register is gone; ask Cody before unifying them.

**Cache stamps.** Every `css`/`js` link carries `?v=YYYYMMDD-N`, and
`scripts/shell.js` writes it from the `STAMP` constant at the top of that file
(currently `20260810-11`). Change a `.css` or `.js` file → bump `STAMP`, run
`node scripts/shell.js`. The old "bump it on every page at once" chore is gone,
and the `shell: false` pages are swept too.

`shell.js` is the only thing that stamps. `post-trip.yml` used to `sed` the
pages directly, which the next local run silently undid; it now calls
`node scripts/shell.js --stamp <date>-<run number>`, and that flag rewrites the
`STAMP` constant as well as the pages, so CI and the working tree can't drift
apart. (`scripts/post.js` doesn't stamp at all; it only prints a reminder.)

**Theme — three states.** `<html class="no-js dark">` plus an inline blocking
script in `<head>` (`THEME_INIT` in `scripts/shell.js`) that reads
`localStorage["hl-theme"]`; anything that isn't `"light"` or `"dark"` means
**auto**, which computes sunrise/sunset. `html[data-theme]` records what was
chosen (auto · light · dark), `html.dark` records what that resolves to and
flips the token scale. Choosing auto **removes** the key, so the sun-driven
default stays reachable. The bar carries one cycling glyph (`.theme-btn`,
hidden below 768px); the mobile menu carries the labelled three-way
(`.theme-pick`), because on phones the open overlay covers the bar. Both are
wired by `setupTheme()` in `js/review.js`, which resolves the sun exactly as
the head script does. The head script must stay inline and blocking in `<head>`
— deferring it causes a flash of the wrong theme. Don't hardcode hex for
text/surface/border. The one intentional fixed color is `--heart: #E5484D` in
`:root`; the mark's paths fill with `currentColor`, and the only place the hex
repeats is `images/mark.svg` (the aperture-heart favicon), which has no CSS.

**Motion is CSS-only.** No GSAP, no ScrollTrigger, no CDN. Content must never be
hidden waiting on JS — a previous JS-gated reveal stranded headings invisible
when rAF stalled. Render content visible; enhance after.

**Broken media degrades quietly.** Broken feed images remove themselves, and
the About portrait drops its whole `<figure>`. Preserve this — never let a
broken URL show a broken-image icon. (The old book-cover "jacket" fallback —
`window.coverFallback` inline in every head, `sweepBrokenCovers` in
`js/review.js` — is deleted, markup, script and CSS. Nothing calls it and
nothing should bring it back.)

**`photos.html` is an intentional redirect stub**, not a broken page. It forwards
to `index.html` preserving `?trip=` deep links so old URLs keep working. Leave it.

## Posting a trip (the short version)

Drop images in `photos/<slug>/`, add a `trip.txt` (format documented in
`HOW-TO-UPDATE.md` and in the header comment of `scripts/post.js`), commit.
`post-trip.yml` resizes, transcodes, regenerates `js/photos.js`, and bumps cache
stamps. Locally: `node scripts/post.js <slug>` (`--dry` to preview).

Anything uploaded enters git history at its original size **permanently**, even
after CI shrinks it. Fine for photos; trim 4K video before committing.

## Type

`--sans` Geist · `--serif` **and** `--display` Cheltenham Classic · `--mono`
Geist Mono. Cheltenham carries every serif role, display through caption —
that decision is recorded at `css/review.css:181`.

`fonts/` also holds Gooper, Instrument Serif, Sprig and Regards, and
`css/review.css` still declares `@font-face` for them, but **no token points at
any of them**. Two comments in that file (lines 7 and 95) still name Gooper and
Sprig as the site serif and are simply out of date — the token block at line 181
wins. Don't "restore" a font based on those comments.

## House style

Cody's standing preferences, from `HANDOFF.md`: minimal italics, no stars UI,
filters integrated into the list rather than a separate control, no search box,
whitespace concentrated inside rows and cards rather than between them.

For prose written under Cody's name, match the voice already on the site — the
trip notes, the About essay, and the journal beats are the reference. Plain,
concrete, understated; no marketing tone.

The through-line for photography copy: the work is visual **and written**
documentation of his life. Anything from a phone snapshot to a G Master lens
counts — the point is to shoot it and to write down what happened, not the
gear.
