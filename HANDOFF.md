# Heart's Library — project handoff

This folder is the complete, current build of Cody Heart's book-review site
(all his own writing, migrated from heartslibrary.com). Static site — no build
step, hosts anywhere (GitHub Pages, Netlify, any web server), or open
`index.html` straight from disk.

## What it is

- **index.html — The Shelf.** All 48 five-star reads rendered from
  `js/books.js`: Fiction and Nonfiction groups, one-line filter chips with
  overflow behind a "More" dropdown (bottom sheet on mobile), short takes with
  the full review behind a toggle, a Currently Reading note card, and an
  Up Next strip.
- **bookstores.html + 5 city pages** — indie bookstores by city, with region
  filters on city pages.
- **dashboards.html, about.html** — static content pages.
- Shell: the codyheart.design top nav — sticky, backdrop-blurred, hides on
  scroll down; Bookstores + Elsewhere dropdowns with duotone icon tiles;
  full-screen overlay menu on phones.

## Design system (css/review.css)

**Ported verbatim from Cody's portfolio (codyheart.design)** so the reading
site reads as an extension of it:

- Fonts (all self-hosted in fonts/, same files as the portfolio):
  Geist Variable (body, 15px / weight 450), Gooper ×6 cuts
  (wordmark + all display headings, weight 500), Geist Mono Variable
  (kickers, counts, meta labels). Regards and Cheltenham Classic are retired
  but their files stay in fonts/ — restore an @font-face and point `--serif`
  at it to bring one back.
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
  but should feel like it belongs to it). Cody's standing preferences:
  minimal italics, no stars UI (everything's 5 stars), filters integrated
  into the list, no search box, whitespace concentrated inside rows/cards.
