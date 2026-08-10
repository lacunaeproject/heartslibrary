# Heart's Library — working notes

Cody Heart's personal site: a photography wing at the front, a books/hobby wing
one floor down. **Static — no build step, no package.json, no bundler, no CDN
scripts.** Open any `.html` from disk and it works. Deployed to GitHub Pages at
**heartslibrary.com** (see `CNAME`).

Two longer docs already exist and are the source of truth for their topics —
read them instead of re-deriving:

- **`HOW-TO-UPDATE.md`** — how Cody posts content (trips, books, pins, games).
  This is the doc he actually uses. Don't break the workflows it describes.
- **`HANDOFF.md`** — design-system provenance and the decisions log. Explains
  *why* the type/color/motion choices are what they are.

Both were reconciled against the code on 2026-08-09. Where a doc and the code
disagree, **the code is current** — and fix the doc.

## Layout

| What | Where |
|---|---|
| 21 hand-maintained pages | `*.html` at repo root |
| Content data (edit these to post) | `js/photos.js`, `js/books.js`, `js/pins.js`, `js/games.js`, `js/writing.js` |
| Auto-generated, never hand-edit | `js/log.js`, `js/drafts.js` (Goodreads sync overwrites both) |
| Renderers | `js/hobby.js` (front wall), `js/shelf.js` (books), `js/review.js` (nav/shell behavior), one `js/<name>.js` per collection |
| Styles | `css/review.css` — all tokens live in `:root` here, and it is the ONLY stylesheet any page loads |
| Media pipeline | `scripts/post.js`, `scripts/prep-media.js`, `scripts/sync-goodreads.py` |
| CI | `.github/workflows/post-trip.yml`, `sync-goodreads.yml` |

## Conventions that matter

**There is no templating, and the shell has forked into FIVE variants.** Nav,
mobile menu, and footer markup is duplicated by hand, so any shell change is a
multi-file sweep. Audited 2026-08-09:

| Shell | Pages | What it has |
|---|---|---|
| **A — current** | index, experiences, feed, gallery | Full nav with the Experiences dropdown (`#navTrips` / `#menuTrips`), theme toggle, `© Cody Heart 2026` footer, `html.no-js.dark` |
| **B — no trip menu** | about, dashboards, log, pins, writing | Experiences flattened to a plain link; no trip dropdown; `html.no-js` (light) |
| **C — legacy** | books, bookstores + 5 city pages, games | No Experiences at all, **no theme toggle, no theme-init script**, no mobile close button, a different "Heart's Library" footer |
| **D — intentional** | photos (redirect stub), post (noindex tool) | No shell by design. Do not "fix" these |

A fifth variant existed until Aug 2026: `fiction.html` and `nonfiction.html`
ran on a separate design system whose stylesheets had already been deleted, so
they rendered as near-raw HTML. They were orphaned and are now deleted. Their
book rows duplicated `js/books.js`, which is once again the only place a book
lives.

**`index.html` is NOT a copy-paste source.** It is the only page with
`nav__wordmark`; all 19 other shelled pages use `nav__back` ("Home") plus a
`nav__scrolltitle`. Copy the shell from a same-family page instead —
`experiences.html` for family A, `about.html` for family B.

**`aria-current="page"` only applies to pages the nav actually links to** —
index (Photos), experiences, feed (Journal), about. Every other page has no
matching nav item, so it correctly has none. Don't "fix" that.

**Two naming registers, deliberately.** Photography pages title as
"… — Cody Heart Photography" / "— Cody Heart"; books-wing pages title as
"… — Heart's Library". Don't unify them.

**Cache stamps.** Every `css`/`js` link carries `?v=YYYYMMDD-N` (currently
`v=20260810-7`, 59 occurrences). When you change a `.css` or `.js` file, bump
the stamp **on every page at once** or caches serve stale assets. `scripts/post.js`
does this automatically for trip posts.

**Theme.** `<html class="no-js dark">` plus an inline blocking script in `<head>`
that reads `localStorage["hl-theme"]`, else computes sunrise/sunset to pick a
theme. It must stay inline and blocking in `<head>` — deferring it causes a
flash of the wrong theme. Colors come from tokens in `:root`; `html.dark` flips
the scale. Don't hardcode hex for text/surface/border. The one intentional fixed
color is `--heart: #E5484D` (the wordmark heart, inline in each page's nav SVG).

**Motion is CSS-only.** No GSAP, no ScrollTrigger, no CDN. Content must never be
hidden waiting on JS — a previous JS-gated reveal stranded headings invisible
when rAF stalled. Render content visible; enhance after.

**Broken media degrades quietly.** Book covers fall back to a typeset "jacket"
(`window.coverFallback`); broken feed images remove themselves. Preserve this —
never let a broken URL show a broken-image icon.

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
that decision is recorded at `css/review.css:179`.

`fonts/` also holds Gooper, Instrument Serif, Sprig and Regards, and
`css/review.css` still declares `@font-face` for them, but **no token points at
any of them**. Two comments in that file (lines 7 and 95) still name Gooper and
Sprig as the site serif and are simply out of date — the token block at line 179
wins. Don't "restore" a font based on those comments.

## House style

Cody's standing preferences, from `HANDOFF.md`: minimal italics, no stars UI
(everything on the shelf is five stars), filters integrated into the list rather
than a separate control, no search box, whitespace concentrated inside rows and
cards rather than between them.

For prose written under Cody's name, match the voice already on the site — the
existing review copy and trip notes are the reference.
