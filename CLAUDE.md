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
| 13 hand-maintained pages | `*.html` at repo root |
| Content data (edit these to post) | `js/photos.js`, `js/pins.js`, `js/games.js`, `js/writing.js` |
| Auto-generated | `js/photos.js` is rewritten by the poster from `photos/<slug>/trip.txt` — hand-edits to a posted trip get overwritten |
| Renderers | `js/hobby.js` (front wall, galleries, collections index), `js/review.js` (nav/shell behavior), one `js/<name>.js` per collection |
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
gone. All 9 shelled pages get the same nav — including the Collections dropdown
(`#navTrips` / `#menuTrips`), which is why every one of them loads
`js/photos.js` and `js/hobby.js` to fill it. `aria-current` follows the
manifest's `current` key, so pages the nav doesn't link to (gallery, writing,
pins, games, dashboards) correctly have none.

Four pages carry `shell: false` and render their own chrome by design:
`photos.html` and `experiences.html` (redirect stubs), `post.html` (the
noindex phone composer) and `print.html` (the noindex scrapbook tool). They
stay in the manifest only so the cache-stamp sweep still reaches them — in
practice just `print.html`, the one of the four that links a stamped asset.
Don't "fix" any of them.

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
(currently `20260813-16`). Change a `.css` or `.js` file → bump `STAMP`, run
`node scripts/shell.js`. The old "bump it on every page at once" chore is gone,
and the `shell: false` pages are swept too.

`shell.js` is the only thing that stamps. `post-trip.yml` used to `sed` the
pages directly, which the next local run silently undid; it now calls
`node scripts/shell.js --stamp <date>-<run number>`, and that flag rewrites the
`STAMP` constant as well as the pages, so CI and the working tree can't drift
apart. (`scripts/post.js` doesn't stamp at all; it only prints a reminder.)

**Theme — three states, and light is the default.** `<html class="no-js">` plus
an inline blocking script in `<head>` (`THEME_INIT` in `scripts/shell.js`) that
reads `localStorage["hl-theme"]`; anything that isn't `"dark"` or `"auto"` means
**light**, so a first-time visitor lands in light. `"auto"` computes
sunrise/sunset. `html[data-theme]` records what was chosen (auto · light ·
dark), `html.dark` records what that resolves to and flips the token scale.

**Light is the state stored as nothing at all** — choosing it **removes** the
key; auto and dark are written down. That is one fact in two places: the head
script's fallback and the `set()` branch in `js/review.js`. **They must name the
same state or a fresh tab paints one theme while the picker claims another.**
Until 2026-08-13 it was auto that cleared and `dark` that sat on the `<html>`
tag; flipping the default meant flipping both together. The `<html>` class is
only the pre-script guess, and the free guess is now light. The bar carries one
cycling glyph (`.theme-btn`,
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

**The wall's column ladder climbs one step at a time.** `.stream-grid`
goes 1 → 2 → 3 → 4 → 5 columns at 768 / 1152 / 1440 / 1920, and the gap
INTERPOLATES (`clamp(32px, 4.2vw, 80px)`) instead of stepping. It used to
go 2 → 4 at 1024 on the same pixel the gap jumped 32 → 80 and the page
gutter jumped 24 → 80: three discontinuities at once, which took the
photographs from 465px wide at 1023px to **153px at 1024px**. A 1024px
laptop showed smaller pictures than an 884px folding phone. Adding a
column costs about n/(n+1) of the frame's width, so one step is a 33% dip
at worst and the frames grow back before the next one — skipping a step
doubles that in a single pixel. Measured widths: 360 → 312, 884 → 399,
1024 → 411, 1440 → 275, 1920 → 288, 2560 → 416. **If you move a
breakpoint or the gutter, re-measure and keep the frames in the 260–480
band from tablet up.**

**Touch targets are 44px, and most of them are invisible.** The bar's
links and pills are 32px because that is the shape Cody approved, so the
missing height is added with an absolutely-positioned `::after` that
paints nothing — see `.wordmark`, `.nav__link`, `.theme-btn`,
`.link-row a`, `.btn-open`, `.crumb a`, `.nav__scrolltitle`. The visual
design is unchanged and the finger gets its 44px. Two things to know:
the desktop nav appears at 768px, which is **a folding phone unfolded and
every tablet in landscape** — fingers, not mice, so the bar is a touch
surface too; and `.post__head` is deliberately 24px (the WCAG 2.5.8
floor) and NOT 44, because it is a permalink to the post's own anchor and
a 44px band would hang down over the post's words and take taps meant for
them. If you add a control, check it at 320/390/768/884 before shipping.

**The lightbox follows the theme.** It was `#fff` in both, which meant a
white flash at night; the mat is `--lb-mat` now (white in light, `#111110`
in dark — just above the page ground so a photograph with true blacks
still has an edge). `::backdrop` repeats the two literals on purpose:
it only began inheriting from its originating element in Chrome 122, and
on anything older `var()` there computes to transparent and the page
flashes through. All the bar's chrome is on ink tokens, so the old
`#171717` focus-ring hack is gone.

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

Three faces, each with one job:

| Token | Face | Used for |
|---|---|---|
| `--title-face` | **Recoleta** | every `.page-head h1`, the ledger's years and row names |
| `--sans` `--serif` `--display` `--mono` | **Geist** | everything else — all four tokens point at the same family |
| `--wordmark-face` | **Geist Mono** | the wordmark, and nothing else |

Recoleta is decorative but not loud, which is the brief it was picked
against. Geist is variable 100–900, so weight is a dial rather than a
shipped file — the constraint that eliminated most of the alternatives.

**Only four Recoleta faces are declared: 400, 500, 600, 700.** A runtime
sweep of every page at two widths found the site renders 500, 600 and 700
and nothing else; 400 is kept as the family's natural base for prose that
has not been written yet. The Light (300) and Black (900) `@font-face`
blocks were deleted — nothing used them and each one was two more files
that had to ship. If you set a Recoleta weight outside 400–700, add the
face or the browser will synthesise it.

**Recoleta is commercial and its files are NOT covered by anything else in
this repo.** They were untracked for a while, which is a live trap: `git
add -u` stages only tracked files, so a commit could ship the CSS and the
pages without the fonts and every title on heartslibrary.com would render
in Georgia. The eight referenced files are now tracked. If you add a
weight, `git add` the file explicitly and check it with:

```
git ls-files fonts/ | grep Recoleta
```

`fonts/` also holds **RecoletaAlt**, which nothing declares or references
— it is the alternate-glyph cut, kept but unused. Cheltenham Classic,
Gooper, Sprig, Instrument Serif, Circular Std, Regards and Roony are all
gone: declarations deleted AND files removed from disk. Don't restore any
of them from git history unless Cody asks. (Gooper and Sprig were `-Trial`
files being served from a live site; that is what closed it.)

**Sizes come off a ladder**, `--type-2xs` (12px) through `--type-3xl`
(46px), roughly a 1.25 ratio above a 15px base. To make something bigger,
move it a step — don't invent a value. Every literal `font-size` that
already landed on a ladder step has been swapped to its token (49 of
them), verified by comparing 21 computed properties on all 3,097 elements
across all 9 pages at two widths: zero differences.

**The spacing scale does not yet cover the design.** `--space-1..6` is
4/6/10/16/24/36, and 72 literals that matched a step were swapped onto it
the same way. But 172 spacing literals do NOT land on any step, and they
cluster hard: 12px (27 uses), 8px (24), 20px (15), 14px (12), 18px (9).
Those are not sloppiness, they are the design — the ladder was drawn too
sparse to express it. **Do not "fix" them by snapping to the nearest
step**; that is a visible change in 172 places. Either widen the scale to
include 8/12/20 or leave the literals alone. This is an open decision.

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
