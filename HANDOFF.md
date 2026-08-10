# Heart's Library — project handoff

This folder is the complete, current build of Cody Heart's photography site
(all his own writing, at heartslibrary.com). Static site — no build
step, hosts anywhere (GitHub Pages, Netlify, any web server), or open
`index.html` straight from disk.

## What it is

**Since Aug 2026 a photography site** — home, gallery pages and journal
run DARK in park.photos' full register: near-black ground under a fixed
film-grain wash (html.dark flips the token scale; grain is an SVG-noise
overlay), self-hosted serif display type, and the wall of frames itself.
The books wing (shelf, log, bookstores, Goodreads sync) was removed
outright later that month; a few side pages survive out of the global
nav. Every collection reads from one plain data file (see
HOW-TO-UPDATE.md).

The global nav is **Photos · Experiences · Journal · About · Elsewhere**,
where Experiences and Elsewhere are dropdowns; the Experiences menu is
filled at runtime from `js/photos.js` (`#navTrips`, and `#menuTrips` on
mobile).

- **index.html** — the wall: every frame flagged `best: true`, newest
  first, full-bleed (`#bestWall`, built by `js/hobby.js` from
  `js/photos.js`), a frames/collections stat line, and the shared
  `<dialog>` lightbox with a personal-use download.
- **gallery.html?trip=<slug>** — one collection: crumb, title, note,
  mono meta, photo grid, the same lightbox, and a trail to the
  other galleries.
- **experiences.html** — the index of collections (`#experienceList`).
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

Real photography now ships in `photos/` (deadbeat-tour, sandiego-zoo,
london-paris, fenway). The generated placeholder art in
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
  dropdowns for Experiences and Elsewhere, burger below 768px onto a
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
- The About-page portrait is `images/cody-portrait.jpg`; if it is missing
  the `<figure>` removes itself rather than showing a broken image.
- **The shell was consolidated into `scripts/shell.js` (Aug 2026).** There is
  no templating on this site and no build step, so the `<head>`, the nav, the
  mobile menu and the footer were duplicated by hand in every page — and, as
  hand-duplicated markup does, they drifted into four variants: some pages
  carried the Experiences dropdown, others had flattened it to a plain link,
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
  repeated in nine files. The Experiences menu being universal is why every
  shelled page now loads `js/photos.js` and `js/hobby.js`.
- **The scroll-title stopped colliding with the nav links.** It had been
  absolutely positioned at `left:50%` while the link row was right-aligned and
  grew leftward, so on any page whose links were wide enough — experiences.html
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
