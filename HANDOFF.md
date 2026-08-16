# Heart's Library — project handoff

This folder is the complete, current build of Cody Heart's photography site
(all his own writing, at heartslibrary.com). Static site — no build
step, hosts anywhere (GitHub Pages, Netlify, any web server), or open
`index.html` straight from disk.

## What it is

**Since Aug 2026 a photography site** — home, gallery pages and journal
can run DARK in park.photos' register: near-black ground, white ink scale
(`html.dark` flips the token scale), self-hosted display type, and the wall
of frames itself. The register arrived with a fixed SVG film-grain wash over
everything; it was **deleted on 2026-08-16**, animation first and then the
wash, and nothing replaced it — the photographs sit on the ground
unmediated. Note also that light, not dark, is the default since 2026-08-13:
a first-time visitor lands light and dark is a stored choice.
The books wing (shelf, log, bookstores, Goodreads sync) was removed
outright later that month; a few side pages survive out of the global
nav. Every collection reads from one plain data file (see
HOW-TO-UPDATE.md).

The global nav is **Selected · Collections · Journal · About · Elsewhere**,
where Collections and Elsewhere are dropdowns; the Collections menu is
filled at runtime from `js/photos.js` (`#navTrips`, and `#menuTrips` on
mobile).

The first two are the edit and the archive, and the words are load-bearing:
**Selected** is the front wall, which shows only frames flagged `best: true`
(`bestPhotos()` in `js/hobby.js` — its own comment calls them the keepers);
**Collections** is everything, grouped by outing. It used to be called
Photos, which on a photography site distinguished nothing from anything —
both pages are photographs, so the pair read as two words for one idea.
"Home" was considered and rejected: the wordmark already links home from
every page, so a nav item for it would be a second control doing the first
one's job.

- **index.html** — the wall: every frame flagged `best: true`, newest
  first, full-bleed (`#bestWall`, built by `js/hobby.js` from
  `js/photos.js`), a frames/collections stat line, and the shared
  `<dialog>` lightbox with a personal-use download.
- **gallery.html?trip=<slug>** — one collection: crumb, title, note,
  mono meta, photo grid, the same lightbox, and a trail to the
  other galleries.
- **collections.html** — the index of collections (`#experienceList`).
- **feed.html — the Journal** — one post per note, newest first, each a
  grey card on the white page carrying its own header (`loc`/`at` as the
  title, then a dot, then the date as MM/DD/YY), the words, and the
  frames. Posting several times a day is normal. A post is valid with
  frames, or with words, or both — never required to have both. Media is
  four kinds: photos, your own clips, GIFs, and YouTube (an optional
  `youtube:` field; everything else is decided by file extension).

  It has been round the houses: a Threads-style thread with an avatar
  rail, then one post per outing with its notes on a connector, then
  same-day run-clustering that hid repeated datelines. All three were
  rejected — the reasoning for each is kept in the CSS beside the rules
  that replaced them, so don't rediscover them as improvements. Photos
  only; pins, games and writing do not appear here.
- **post.html** — the phone composer: writes a journal beat straight into
  `photos/<slug>/trip.txt` with a GitHub token. Noindex, linked from nowhere.
- **photos.html** — not a page any more: a redirect stub that forwards to
  `index.html` preserving `?trip=` deep links, so old URLs keep working.
- **experiences.html** — the same thing: the index was renamed Collections in
  Aug 2026, and this stub forwards to `collections.html` (query and hash
  preserved) so anything already pointing at the old address still lands. The
  word changed everywhere it was user-visible; the internal identifiers did
  not — `#experienceList`, `#experienceStats`, the `.xp-*` classes, `TRIPS`,
  `#navTrips` and `menu-trips` all keep their old names on purpose, since
  renaming them is churn with regression risk and nobody sees them.

Real photography now ships in `photos/` (deadbeat-tour, sandiego-zoo,
london-paris, dodgers-redsox, new-york,
salt-lake-city, universal-hollywood). The generated placeholder art in
`photos/placeholders/` survives only for collections that have no real
rolls yet — delete it as they land.
- **pins.html / writing.html / games.html** — pinboard of articles, own
  essays, and the games shelf, from `js/pins.js` / `js/writing.js` /
  `js/games.js` (sample starter content, clearly marked).
- **dashboards.html, about.html** — static content pages.
- Shell: the codyheart.design top nav — sticky and backdrop-blurred, but it
  stays put now (hiding it on scroll meant transforming a blurred sticky
  element over the photo wall, which flickered); wordmark left, the page name
  fading in beside it once you're past the masthead, links right, duotone-tile
  dropdowns for Collections and Elsewhere, burger below 768px onto a
  full-screen overlay menu. It is generated — `scripts/shell.js` holds the only
  copy of the head, nav, menu and footer and sweeps it into every page; the
  regions are fenced with `<!--#shell:…-->` comments and anything hand-written
  inside them is overwritten on the next run.

## Design system (css/review.css)

**Ported from Cody's portfolio (codyheart.design), then refined against the
site that register comes from (andreavollendorf.com)** so the reading site
reads as an extension of both:

- Fonts (all self-hosted in fonts/): Geist Variable (`--sans`; body, 14px /
  weight 450 / 1.45rem line-height — the reference's exact body setting),
  **Cheltenham Classic** (`--serif` AND `--display` — it carries every serif
  role, display through caption), Geist Mono Variable (`--mono`; kickers,
  counts, meta labels). Chrome runs quiet like the reference: 12px nav links
  and footer, 14px serif wordmark, 280px dropdowns with 13/12px item type.
  Gooper, Instrument Serif, Sprig and Regards still have `@font-face` blocks
  and files in fonts/, but **nothing points at them** — they lost the
  same-day tour recorded at `css/review.css:181` (Instrument unreadable at
  small sizes, Sprig no, Gooper slabby and weak small). To bring one back,
  point `--serif` at it. Two stale comments in review.css still name Gooper
  (line 7) and Sprig (line 95) as the site serif; they are wrong — the token
  block at line 181 is authoritative.
- Tokens in `:root`, copied 1:1 from the portfolio: white ground,
  `--foreground:#171717`, the ink-opacity scale (`--ink-85` … `--ink-30`),
  `--surface:#f6f7f9` cards, `--border`, `--accent:#4c74ff`, the three
  shadows (`--shadow-flush/raised/floating`), the ease-out curve family, and
  `--gutter` (24px → 80px at 1024px). One site-specific token:
  `--heart:#E5484D` (the wordmark heart).
- Component language: surface cards with the flush inset ring (atlas,
  pull-quote, dashboard stat plates), pill buttons with `--shadow-raised`
  that invert to ink when active (link rows), quiet underlined text links,
  duotone menu icons that color on hover. The shelf's chips, filter bars,
  cover plates and card-catalog drawers went out with the books wing.
- Heading emphasis (`.accent`) is the portfolio's gradient italic
  (rose-brick → poppy, `#A64A3F → #D9603B`).
- Nav behaviors are ported from the portfolio's site.js, minus the scroll-hide:
  the scroll-title fades in past 200px and scrolls you back to the top,
  dropdowns open on hover or click and close on Esc / outside click / scroll,
  burger → full-screen mobile menu. `js/review.js` wires behavior only — the
  markup it wires comes from `scripts/shell.js`.
- Motion is CSS-only (no GSAP/ScrollTrigger/SplitText, no CDN scripts): the
  page head rises once via a CSS animation the style engine finishes on its
  own, list rows keep their CSS stagger, and the dashboard count-up is a
  small IntersectionObserver enhancement whose markup already holds the
  final figures. Content is never hidden waiting on a script — the old
  JS-gated reveals could strand headings invisible when rAF stalled.

## Updating content

**`js/photos.js` is the only file to edit for photography** — and the
poster (`scripts/post.js`, or `post-trip.yml` in CI) regenerates it from
`photos/<slug>/trip.txt`, so in practice you edit the note file, not the
data file. Pins, writing and games each have their own data file with
instructions in its header comment. Full workflows in HOW-TO-UPDATE.md.

The chrome is not content: nav links, page titles, meta descriptions, the
Elsewhere menu and the `?v=` cache stamp all come from `scripts/shell.js`, and
editing a `.html` file between its `<!--#shell:…-->` fences is undone by the
next `node scripts/shell.js`.

## Provenance / decisions log (short)

- All prose is Cody's own, carried over from the original heartslibrary.com.
  The About page was rewritten in Aug 2026 to lead with the camera rather
  than the career (see below), but the argument in "Why this site" and the
  pull-quote are still his, near-verbatim.
- **The About page carries seven photographs, from `images/self/`.** They are
  the masthead frame (`.about-portrait`), two two-ups (`.about-pair`) and
  full-column frames between sections (`.about-figure`); all three share one
  block of rules so the treatment can't land on some and miss the others. The
  prose was cut to about two thirds of its old length at the same time — the
  pictures carry the page and the writing is caption-length around them.
  `.about-read h2` moved off bold Geist onto `--title-face` at 600, the same
  face and weight as every `.page-head h1`; Recoleta only declares 400–700, so
  don't push that weight higher without adding the face.
  Every frame keeps the `onerror` that removes its whole `<figure>` rather
  than showing a broken image. Two decisions worth keeping:
  **the frames are square** (`border-radius: 0`), matching the wall — a
  radius crops the corners of a picture composed to its edges and reads it
  as a card; and **only the two-up forces a ratio** (`aspect-ratio: 3/4`
  with `object-fit: cover`, inside the `min-width: 600px` query), because
  side-by-side frames of different shapes put their captions on different
  lines. The single frames are never cropped, and below 600px the pair
  stacks and the crop lifts. The old `images/cody-portrait.jpg` is no longer
  referenced; it is byte-identical to `images/self/me-monet.web.jpg`.
- **The shell was consolidated into `scripts/shell.js` (Aug 2026).** There is
  no templating on this site and no build step, so the `<head>`, the nav, the
  mobile menu and the footer were duplicated by hand in every page — and, as
  hand-duplicated markup does, they drifted into four variants: some pages
  carried the Collections dropdown, others had flattened it to a plain link,
  one had no theme control and no theme-init script at all, and the footers
  disagreed about what the site was called. Every change to the chrome was a
  multi-file sweep, and every sweep left one page behind. The markup now lives
  in one file alongside a `PAGES` manifest (title, description, canonical,
  current nav item, scrolltitle, script list) and `node scripts/shell.js`
  writes it into every page; `--check` reports drift without writing and exits
  non-zero, which is the CI-able form. Each region is fenced with
  `<!--#shell:head-->`-style sentinels: outside them is the page's own content
  and never touched, inside them is regenerated, so a hand edit between the
  fences survives exactly until the next run. Along the way the per-page
  `nav__back` ("Home") was retired — the wordmark is on every page now and
  links home, so the name appears everywhere instead of only on the front door,
  and the heart comes from the `--heart` token rather than a hex literal
  repeated in nine files. The Collections menu being universal is why every
  shelled page now loads `js/photos.js` and `js/hobby.js`.
- **The scroll-title stopped colliding with the nav links.** It had been
  absolutely positioned at `left:50%` while the link row was right-aligned and
  grew leftward, so on any page whose links were wide enough — collections.html
  at every width from 768px to about 1100px — the page name was drawn straight
  through them, half over and half under, and swallowed their clicks. It is an
  ordinary flex child between the wordmark and the links now: it cannot overlap
  by construction, and ellipsizes when the bar tightens.
- **The theme control went three-state: auto · light · dark.** The old control
  was a two-way flip that wrote `localStorage` on its first click, so touching
  it once put the sun-driven default permanently out of reach. Now
  `html[data-theme]` records what was chosen and `html.dark` records what that
  resolves to, and choosing auto clears the stored key so the sun takes over
  again. The bar carries a single cycling glyph; the mobile menu carries the
  labelled three-way picker, because below 768px the open overlay covers the
  bar entirely — the switch used to sit underneath it, visible but untouchable
  until you closed the menu. `js/review.js` resolves the sun with the same
  arithmetic as the inline head script, so cycling through auto lands on
  whatever the sun says at that moment, and a short dissolve (`.theme-anim`) is
  armed only around a deliberate change so the theme chosen before first paint
  never animates in.
- **Elsewhere is Substack · Instagram · Email.** Goodreads went out with the
  books wing; `@codynheart` came in, in the nav menu, the mobile menu and the
  footer. The favicon is `images/mark.svg` — the same heart with a lens iris
  cut out of it, for the places that need a square glyph and can't bring the
  wordmark along.
- Design journey: started New Yorker/NYT editorial → simplified to a
  data-driven shelf → Notion-style workspace shell with magazine typography →
  Young Serif headings → subtle Chicago theming → **restyled as an extension
  of codyheart.design** (typography, dropdown nav, coloring copied from the
  portfolio at Cody's request — the reading site isn't shown on the portfolio,
  but should feel like it belongs to it) → **refined against
  andreavollendorf.com** (Aug 2026): 14px body and 12px chrome to the
  reference's exact scale, hero reset from a centered title-page to the
  reference's left-set quiet register (sky wash + ornament stars retired;
  the heart full stop and gradient-italic accent stay — the W-flag and
  avatar-zoom easter eggs lived on the shelf hero and went out with it),
  dashboard stats moved from gradient/white-raised cards to the surface +
  flush-ring plate language, About rebuilt as the reference's
  floated-portrait essay, footer regrouped to the reference's two-cluster
  12px layout, and GSAP dropped for CSS-only motion → **books wing removed
  entirely** (Aug 2026), leaving photography plus a few side pages. Cody's
  standing preferences: minimal italics, no stars UI, filters integrated
  into the list, no search box, whitespace concentrated inside rows/cards.
- **The grids don't crop any more (Aug 16 2026). Every frame is its own
  shape.** This REVERSES the two-box scheme described below, on Cody's
  instruction and for both grids — the collection pages and the front wall.
  What prompted it: replacing the San Diego rhinos made the cost legible.
  63 of that collection's 78 frames are the same 3:2 and each was losing
  16.6% off its sides, the side-profile rhino lost 21.3% — its horn — and
  the average across the collection was 14.8%. Undoing it took a deletion,
  not an addition: `shotHtml()` has always written
  `style="aspect-ratio:W/H"` on every img from the recorded dimensions, and
  a definite width AND height on the box is exactly what made that inline
  ratio inert. Releasing the height gives the frame back its shape.
  `.shot--wide` / `.shot--tall` were read by the four deleted rules and
  nothing else, so they are gone from the renderer too.

  **The trade moved rather than disappeared.** Rows are now ragged: a lone
  upright doubles its row's height and the landscapes beside it float in
  the space, which is mild on a collection page (most frames share a shape)
  and pronounced on the wall (it draws from every collection). `align-items:
  center` is still what decides how that space is distributed. If the
  gapping ever needs solving, the two candidates are `align-items: start`
  — cheap, gives each row one clean top line — and real masonry via CSS
  `columns`, which packs perfectly but reorders reading DOWN each column
  instead of across, and the collection sequence is deliberate.

- **[SUPERSEDED Aug 16 2026 — see above] The wall crops to two boxes, after
  franzgruenewald.com.** Every frame fills its whole column in either a 4:5
  upright or a 5:4 landscape, centre
  cropped, and the shape is read off what was shot so nothing has to be tagged
  by hand. It replaced a scheme that kept each frame at the proportions it was
  shot at and sized it by area (`--fw`, the square root of its aspect), which
  held an upright back to about 60% of its column. The two heights are what
  keep the new wall from reading as a rank of identical stamps, and
  `align-items: center` turns that difference into a stagger: a landscape frame
  sits inset among uprights, shorter, starting lower and ending higher. The
  crop is a real trade and it was taken deliberately — don't restore the old
  behaviour on the strength of a no-crop principle alone. *(That warning stood
  for three days and was overridden by Cody directly, which is the one thing
  that does outrank it. Kept here because the reasoning is still the case
  against — read it before undoing the reversal.)* Nothing is lost from
  the photograph itself: the lightbox still opens the whole frame, and the clip
  row is untouched, since both sit outside `.stream-grid`. The column count
  has since gone to 1 · 2 · 3 · 4 · 5 at 768 · 1152 · 1440 · 1920 with the gap
  interpolated by `clamp(32px, 4.2vw, 80px)` rather than stepped — see the
  column-ladder note in CLAUDE.md — and it steps by VIEWPORT rather than
  container width — the wall once sat
  beside a sidebar, that sidebar is gone, and `container-type` came off `.roll`
  with the last `@container` rule.
- **The type system was rebuilt around three faces, after trying nine.**
  Recoleta carries every page title and the ledger's years and names;
  Geist carries everything else — `--sans`, `--serif`, `--display` and
  `--mono` all point at it; Roony carries the wordmark and nothing else.
  The brief that settled it was "decorative but not overpowering," which
  is what Recoleta does and what the alternatives each failed at from a
  different direction. The recurring trap, worth stating once: **a face
  that ships a single weight cannot hold a heading**, because the
  heading ends up lighter than the sans beneath it and no size fixes an
  inverted hierarchy. That killed Instrument Serif outright and is why
  Geist — variable 100–900 — held everything alone for a stretch.
  Gooper read as a dense slab once shrunk to caption size; Cheltenham
  had the range and the wrong voice; Sprig was the best of the rejects
  and is a Trial file; Circular Std ran the whole site for one iteration
  and is a one-token swap back; Regards was too much; Roony has no
  lowercase at all — its lowercase codepoints are drawn as capitals, so
  mixed-case set in it reads "ThE ExpErIENCEs." Every one of those is
  recorded in the token block in `css/review.css` so the tour doesn't
  get walked again.

  Sizes moved onto a ladder at the same time — `--type-2xs` (12px)
  through `--type-3xl` (46px), about 1.25 above a 15px base — because
  the sheet had accumulated 11, 12.5, 13, 14, 22 as literals chosen
  against whatever each element happened to sit beside. The photography
  pages use nothing but the ladder. (Superseded by the 2026-08-10
  breakpoint sweep below: every literal that already matched a step has
  since been swapped site-wide, and the spacing scale's gaps are
  recorded as an open decision.)

  The `@font-face` blocks for Cheltenham, Gooper, Sprig and Instrument
  Serif were **deleted**, not merely unreferenced. Gooper and Sprig were
  `-Trial` files being served from a live site, and deleting the
  declarations is the thing that actually stopped that. Recoleta, Roony
  and Circular are commercial; the web licences want confirming before
  any of this ships. (Since then only **Recoleta** remains — Roony,
  Circular and the rest were removed from `fonts/` entirely, so Recoleta
  is the only licence still to confirm. Its eight referenced files were
  untracked by git until 2026-08-10, which would have shipped the site
  with every title in Georgia.)

- **2026-08-10, the breakpoint-and-accessibility sweep.** Four things
  that were wrong at sizes nobody had opened the site at.

  *The wall collapsed in the middle of its own range.* `.stream-grid`
  went 2 columns → 4 columns at 1024px, on the same pixel its gap went
  32 → 80 and the page gutter went 24 → 80. Three discontinuities at
  once: photographs measured 465px wide at 1023px and **153px at
  1024px**, a 67% drop, so a 1024px laptop showed smaller pictures than
  an 884px folding phone and the wall got worse as the screen got
  bigger. Fixed by climbing one column at a time (768/1152/1440/1920)
  and interpolating the gap with `clamp()`. Adding a column inherently
  costs n/(n+1) of the width, so the dip is now 37% at worst and the
  frames recover before the next step. The frames stay in a 260–480px
  band from tablet up.

  *The lightbox ignored the theme.* It was `#fff` in both modes on the
  argument that a print hangs on a white wall. That argument loses to
  the fact that opening a photograph at night flashed a white screen,
  and every viewer people actually use goes dark with the room. Now
  `--lb-mat`. The dark value is `#111110` rather than the page's
  `#0A0A0A` so a photograph with true blacks still has an edge. A
  `#171717` focus-ring override existed only because the mat was white
  under `html.dark`; it is gone.

  *Contrast failed in both modes.* A pass over all 9 pages in both
  themes — compositing alpha properly, not eyeballing — found five
  colours under WCAG AA: `.atlas-label` and `.atlas-when` at 2.82:1
  light / 3.83:1 dark, `.xp-era__year` at 3.35:1, and the `.arrow`
  glyphs at 2.11:1, which is effectively invisible. All moved to
  `--ink-55`, the quietest step that clears 4.5:1 in both themes. A
  sixth, `.footer__links a:hover`, was the literal `rgba(0,0,0,.85)`
  with no dark override — hovering a footer link under `html.dark`
  painted it near-black on the near-black ground.

  *Touch targets were 32px and under.* Including the wordmark, at 14px
  tall, which is the only way home. The fix is an invisible
  `::after` on each control rather than a bigger control, so Cody's
  approved shapes are untouched; a hit test confirmed no expanded area
  steals its neighbour's clicks. `.post__head` was deliberately taken to
  24px and not 44 — it is a permalink, and a 44px band reaches down over
  the post's own words.

  Two things were verified rather than assumed. The 121 literal→token
  swaps were checked by diffing 21 computed properties on all 3,097
  elements across 9 pages at two widths (zero differences) — the first
  attempt at that check used a whole-page style hash that turned out to
  be non-deterministic, reporting "everything changed" on a control run
  with no edits at all. And the spacing ladder was **left alone**: 172
  literals don't land on a step and they cluster on 12/8/20/14/18, which
  means the scale is drawn too sparse for the design rather than the
  design being sloppy. Snapping them would be a visible change in 172
  places. That decision is still open; the counts are in `CLAUDE.md`.
