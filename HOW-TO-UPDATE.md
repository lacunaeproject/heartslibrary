# Updating Heart's Library

Everything on the shelf lives in **one file: `js/books.js`**. You never touch
HTML or CSS to add, remove, or edit a book.

## Add a book

1. Open `js/books.js`
2. Copy any existing block between `{ ... },` in the `BOOKS` list
3. Paste it where you want the book to appear (order on the page = order in the file)
4. Change the fields:

| Field | What it does |
|---|---|
| `title`, `author` | What they say |
| `section` | `"Fiction"` or `"Nonfiction"` — controls which shelf group it sits in |
| `tag`, `tagLabel` | The filter chip it belongs to. A brand-new tag makes a new chip automatically |
| `cover` | Full URL to a cover image (a missing/broken cover renders as a clean typeset jacket, so nothing ever looks broken) |
| `short` | The quick take shown on the shelf. Plain text or a little HTML (`<em>` etc.) |
| `full` | A list of `"<p>...</p>"` paragraphs for the full review. **Currently not shown** — the Full-review toggle is retired for now, but the field is kept so it can come back |
| `featured` | `true` puts it in the "★ Top ten" chip |
| `shopName`, `shopHref` | The "Read at ..." credit inside the review (optional) |

5. Save. Refresh the page. Done.

## The to-be-read strip (retired)

The "Up next" strip is currently off — its `UPNEXT` data still sits at the
bottom of `js/books.js` but isn't rendered. To bring it back, restore the
`upnext` section in `index.html` and its render block in `js/shelf.js`
(both are in git history).

## Everything else

- **Bookstores / Dashboards / About** are plain HTML pages (`bookstores.html`,
  `dashboards.html`, `about.html`) — edit the text right in the file.
- **Colors and fonts** are CSS variables at the top of `css/review.css`
  (`--foreground`, `--surface`, `--accent`, `--serif`, ...). They're copied
  from codyheart.design so the two sites stay in step — change once here,
  applies everywhere.
- Hosting: it's a fully static site — drop the folder on GitHub Pages, Netlify,
  or any host. No build step.

## Currently reading

**This one updates itself.** The `CURRENT` list in `js/books.js` is synced
from your Goodreads "currently reading" shelf every 6 hours by a GitHub
Action (`.github/workflows/sync-goodreads.yml`, which runs
`scripts/sync-goodreads.py`). Just update Goodreads and the site follows.

- Don't hand-edit `CURRENT` — the next sync overwrites it. To change what
  shows, change the shelf on Goodreads.
- To sync right now instead of waiting: GitHub → Actions → "Sync Goodreads"
  → Run workflow. (Or run `python scripts/sync-goodreads.py` locally and
  push.)
- Subtitles ("Rise and Kill First: The Secret History of…") and series
  markers are trimmed automatically so the card stays tidy.
- Empty shelf on Goodreads = the callout quietly disappears. Nothing breaks.
- `META.avatar` (also near the top of `js/books.js`) — the URL of the
  circular author photo on the Shelf. Still manual.

## Five-star reads → drafts

The same sync watches your "read" shelf. Rate a book **5 stars** on
Goodreads and a pre-filled entry (title, author, cover, your Goodreads
review text if you wrote one) lands in **`js/drafts.js`** on the next run.

That file is never loaded by the site — nothing is public until you act:

1. Open `js/drafts.js`, pick a draft, fill in `section`, `tag`/`tagLabel`,
   and `short`.
2. Cut the block and paste it into the `BOOKS` list in `js/books.js`
   wherever you want it on the page. Done.
3. Heads up: `fiction.html` and `nonfiction.html` keep their own static
   copies of the book rows (numbered `№ 01`, `№ 02`, …) — if the book
   belongs on one of those pages too, add a row there and renumber.

Don't want one on the shelf? Delete the block and add its title to
`DRAFT_SKIP` at the top of `js/drafts.js` so it isn't re-drafted.
Only books finished after 29 Jul 2026 are picked up — the older backlog
stays untouched.
