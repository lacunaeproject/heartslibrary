# Updating Heart's Library

Since the Aug 2026 pivot this is a hobbies site: the homepage is a hub
(latest photos + the card catalog of drawers), and each collection lives in
**one plain data file** you edit to post. You never touch HTML or CSS:

| Collection | Page | Edit this file |
|---|---|---|
| Photos | `photos.html` | `js/photos.js` (+ drop images in `photos/<trip>/`) |
| Books (the shelf) | `books.html` | `js/books.js` |
| Pins (articles) | `pins.html` | `js/pins.js` |
| Writing | `writing.html` | `js/writing.js` |
| Games | `games.html` | `js/games.js` |

Each file's header comment shows the exact fields. The hub's drawers and
counts fill themselves from the same files, and the homepage's
**Circulation Desk feed** merges everything into one thread: books come in
automatically from the Goodreads log; photos, pins, games, and writing
appear when their entry has a `posted: "YYYY-MM-DD"` date. No date, no
feed bubble — so you control what surfaces.

Feed imagery: book jackets are captured automatically by the sync (the
`cover` field in js/log.js). Pins and games take an optional `image:` —
paste the article's social/OG image URL (or any local path) for pins, and
for games a Steam header works great
(`https://cdn.cloudflare.steamstatic.com/steam/apps/<appid>/header.jpg`).
The five sample pins use generated plates in `images/articles/`. Entries
without an `image` fall back to a plain text bubble; broken image URLs
remove themselves quietly.

## Post a trip — from your phone, no laptop

Everything below happens on github.com or in the GitHub mobile app.
A workflow (`.github/workflows/post-trip.yml`) does the rest.

1. In the repo, go to `photos/` and make a folder named for the trip —
   `photos/big-sur/`. Lowercase, hyphens, no spaces.
2. Upload your photos and clips straight into it. Don't bother resizing;
   CI handles that.
3. Add a file in the same folder called **`trip.txt`**:

   ```
   Big Sur, Highway 1 | Big Sur
   May 2025 · North America

   [Highway 1]
   Windows down, fog in, fog out. The camera barely kept up.

   bixby.jpg
   redwoods.jpg

   [McWay]
   Stopped at every pull-off between Carmel and Lucia.

   mcway.jpg  The cove, four minutes of light
   ```

   Line 1 is the title (`|` gives a short name for the nav). Line 2 is
   when, plus optional continent and an optional `· 2025-05-18` if you
   want the exact sort position. After that, blank lines separate
   **posts**. A `[bracketed]` line is the dateline. Filenames are media.
   Everything else is you talking — the first sentence becomes the
   headline. Two spaces after a filename captions that one frame.
4. Commit. Within a couple of minutes the site is live.

The workflow resizes photos to 1600px, transcodes clips to web MP4 at
1080p, converts HEIC to JPEG, rewrites `trip.txt` to match, regenerates
`js/photos.js`, and bumps the `?v=` cache stamp on every page. Re-running
is free — anything already within limits is left alone.

**One thing worth knowing:** whatever you upload enters git history at
whatever size it arrived, and stays there permanently even after CI
shrinks it. For photos that's fine. For a long 4K video it isn't — trim
and export smaller on the phone first, or the repo grows forever.

Set iPhone to Settings → Camera → Formats → **Most Compatible** and it
shoots JPEG/H.264 instead of HEIC/HEVC, which skips a conversion step.

### From a laptop

Same folder and `trip.txt`, then `node scripts/post.js <slug>` — it reads
the dimensions out of the files itself. Add `--dry` to see the entry
without writing it. `node scripts/prep-media.js` does the resizing, but
needs ffmpeg installed locally; pushing and letting CI do it is easier.

Older trips still carry a hand-written `photos:` array in `js/photos.js`
and no `trip.txt`. Those keep working — the poster only rewrites the trip
whose slug you pass.

**The current frames are generated placeholder art**
(`photos/placeholders/*.svg`) so the layout is visible — replace the
sample trips in `js/photos.js` with your own and delete the folder when
you're done with it. The pins, games, and writing files ship with clearly
marked sample entries too.

## Add a book

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

**Currently not displayed** — the card was retired from the Shelf's hero.
The data keeps syncing and the renderer in `js/shelf.js` is intact; to
bring it back, add `<div id="currentlyReading" class="current-read">
</div>` to `books.html`.

- Don't hand-edit `CURRENT` — the next sync overwrites it. To change what
  shows, change the shelf on Goodreads.
- To sync right now instead of waiting: GitHub → Actions → "Sync Goodreads"
  → Run workflow. (Or run `python scripts/sync-goodreads.py` locally and
  push.)
- Subtitles ("Rise and Kill First: The Secret History of…") and series
  markers are trimmed automatically so the card stays tidy.
- Empty shelf on Goodreads = the callout quietly disappears. Nothing breaks.
- Your photo on the Shelf is `images/cody-portrait.jpg` — it's the little
  byline avatar under the deck, and hovering it zooms the full photo.
  Swap the file to change it (portrait-ish works best; the tooltip crops
  it 4:5, the circle crops near the top).

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

## The Log (log.html)

**Fully automatic.** `log.html` shows every book on your Goodreads "read"
shelf — title, author, star rating, date finished, grouped by year. The
sync rewrites `js/log.js` from the full shelf on every run; there is
nothing to maintain. Five-star rows get their stars in the wordmark red.
Mark a book read (or fix a rating) on Goodreads and the page follows.
It's linked from the footer on every page, the "A library of one" note
on the Shelf, and the mobile menus — deliberately not the main nav.
