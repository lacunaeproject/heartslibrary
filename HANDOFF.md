# Heart's Library — project handoff

This folder is the complete, current build of Cody Heart's book-review site
(all his own writing, migrated from heartslibrary.com). Static site — no build
step, hosts anywhere (GitHub Pages, Netlify, any web server), or open
`index.html` straight from disk.

## What it is

**Since Aug 2026 a photography-first site** — the photography wing
(home, gallery pages, archive) runs DARK in park.photos' full register:
near-black ground under a fixed film-grain wash (html.dark flips the
token scale; grain is an SVG-noise overlay), Instrument Serif display
type (self-hosted in fonts/), a two-row marquee of trip names and
thumbs, and the gallery grid: big rounded trip covers (newest trip gets
the wide tile), the title rising in on hover, each tile clicking through
to that trip's gallery. The hobby wings survive one floor down, out of
the global nav (which slims to Galleries · About · Elsewhere), reachable
from the homepage's Rest-of-the-Library row and the footer. Every
collection reads from one plain data file (see HOW-TO-UPDATE.md).

- **index.html** — hero + the gallery grid (`js/hobby.js` builds tiles
  from `js/photos.js`) + background links + colophon.
- **gallery.html?trip=<slug>** — one trip's gallery: crumb, title, note,
  mono meta, photo grid, shared `<dialog>` lightbox, and a trail to the
  other galleries.
- **photos.html** — the archive: every trip on one page, same lightbox.
  All photography ships with generated placeholder art in
  `photos/placeholders/` until real rolls land.
- **books.html — The Shelf** (the old homepage). All 50 five-star reads
  rendered from `js/books.js`: Fiction and Nonfiction groups, one-line
  filter chips with overflow behind a "More" dropdown (bottom sheet on
  mobile), short takes, and the books-wing card catalog (Log, Bookstores,
  Dashboards, Write back).
- **pins.html / writing.html / games.html** — pinboard of articles, own
  essays, and the games shelf, from `js/pins.js` / `js/writing.js` /
  `js/games.js` (sample starter content, clearly marked).
- **bookstores.html + 5 city pages** — indie bookstores by city, with region
  filters on city pages.
- **log.html, dashboards.html, about.html** — the Goodreads-synced log and
  static content pages.
- Shell: the codyheart.design top nav — sticky, backdrop-blurred, hides on
  scroll down; now just Galleries · About · Elsewhere (duotone-tile
  dropdown), burger below 768px; full-screen overlay menu on phones.

## Design system (css/review.css)

**Ported from Cody's portfolio (codyheart.design), then refined against the
site that register comes from (andreavollendorf.com)** so the reading site
reads as an extension of both:

- Fonts (all self-hosted in fonts/, same files as the portfolio):
  Geist Variable (body, 14px / weight 450 / 1.45rem line-height — the
  reference's exact body setting), Gooper ×6 cuts (wordmark + all display
  headings, weight 500), Geist Mono Variable (kickers, counts, meta labels).
  Chrome runs quiet like the reference: 12px nav links and footer, 14px serif
  wordmark, 280px dropdowns with 13/12px item type. Regards and Cheltenham
  Classic are retired but their files stay in fonts/ — restore an @font-face
  and point `--serif` at it to bring one back.
- Tokens in `:root`, copied 1:1 from the portfolio: white ground,
  `--foreground:#171717`, the ink-opacity scale (`--ink-85` … `--ink-30`),
  `--surface:#f6f7f9` cards, `--border`, `--accent:#4c74ff`, the three
  shadows (`--shadow-flush/raised/floating`), the ease-out curve family, and
  `--gutter` (24px → 80px at 1024px). One site-specific token:
  `--heart:#E5484D` (the wordmark heart; also the footer's four Chicago
  stars and the "Top ten" pill).
- Component language: surface cards with the flush inset ring (currently
  reading, up next, notes, atlas, pull-quote), pill buttons with
  `--shadow-raised` that invert to ink when active (chips, filters, links),
  quiet underlined text links, duotone menu icons that color on hover.
- Heading emphasis (`.accent`) is the portfolio's gradient italic
  (rose-brick → poppy, `#A64A3F → #D9603B`).
- Nav behaviors are ported from the portfolio's site.js: scroll-hide with a
  centered scroll-title, dropdowns that open on hover or click and close on
  Esc / outside click / scroll, burger → full-screen mobile menu.
- Motion is CSS-only (no GSAP/ScrollTrigger/SplitText, no CDN scripts): the
  page head rises once via a CSS animation the style engine finishes on its
  own, book rows keep their CSS stagger, and the dashboard count-up is a
  small IntersectionObserver enhancement whose markup already holds the
  final figures. Content is never hidden waiting on a script — the old
  JS-gated reveals could strand headings invisible when rAF stalled.

## Updating content

**`js/books.js` is the only file to edit for books** — instructions in its
header comment and in HOW-TO-UPDATE.md. Covers: adding/removing books,
tags/chips (new tags auto-create chips), the `CURRENT` currently-reading list,
`META.updated`, and the `UPNEXT` strip. Broken cover URLs render as a clean
typeset "jacket" fallback, never a broken image.

## Provenance / decisions log (short)

- All review text is verbatim from Cody's original site (verified
  programmatically during migration — 48 books, every paragraph).
- Book covers hotlink to https://heartslibrary.com/covers/ (all verified 200).
  The About-page portrait (images/cody-portrait.jpg) 404s on the source site
  too; a fallback plate shows until the real file exists.
- Design journey: started New Yorker/NYT editorial → simplified to a
  data-driven shelf → Notion-style workspace shell with magazine typography →
  Young Serif headings → subtle Chicago theming → **restyled as an extension
  of codyheart.design** (typography, dropdown nav, coloring copied from the
  portfolio at Cody's request — the reading site isn't shown on the portfolio,
  but should feel like it belongs to it) → **refined against
  andreavollendorf.com** (Aug 2026): 14px body and 12px chrome to the
  reference's exact scale, hero reset from a centered title-page to the
  reference's left-set quiet register (sky wash + ornament stars retired;
  the heart full stop, gradient-italic accent, W-flag and avatar-zoom
  easter eggs stay), log banner and dashboard stats moved from gradient/
  white-raised cards to the surface + flush-ring plate language, About
  rebuilt as the reference's floated-portrait essay, footer regrouped to
  the reference's two-cluster 12px layout, and GSAP dropped for CSS-only
  motion. Cody's standing preferences:
  minimal italics, no stars UI (everything's 5 stars), filters integrated
  into the list, no search box, whitespace concentrated inside rows/cards.
