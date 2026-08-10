# Updating Heart's Library

Since the Aug 2026 pivot this is a photography-first site: the homepage is
the **wall** (every frame flagged `best`, newest first), and each collection
lives in **one plain data file** you edit to post. You never touch HTML or CSS:

| Collection | Page | Edit this file |
|---|---|---|
| Photos | `index.html` (the wall) + `gallery.html?trip=<slug>` | `js/photos.js` (+ drop images in `photos/<trip>/`) |
| Pins (articles) | `pins.html` | `js/pins.js` |
| Writing | `writing.html` | `js/writing.js` |
| Games | `games.html` | `js/games.js` |

Each file's header comment shows the exact fields.

`photos.html` still answers, but only as a forwarder to the homepage — it
keeps old links and `?trip=` deep links working. There's nothing to edit in it.

**The Journal** (`feed.html`) is the thread of what you wrote from inside each
experience: it renders the `beats` in `js/photos.js`, newest first. It is
photography only — pins, games, and writing do not appear there.

Imagery elsewhere: pins and games take an optional `image:` —
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
   headline.

   Two spaces after a filename describe that one frame:

   ```
   mcway.jpg  The cove, four minutes of light
   mcway.jpg  [Sunlit falls dropping onto a sand cove]
   mcway.jpg  Four minutes of light  [Sunlit falls onto sand]
   ```

   Plain text is a **caption** — printed under the frame, and used as
   its alt text. Text in **[brackets]** is alt only: it describes the
   picture for someone using a screen reader without putting a caption
   on the page. Most frames want the bracket form — a wall of visible
   captions isn't the look, but an undescribed photo isn't an option
   either. A frame with neither falls back to the collection's name,
   which reads identically on every frame and tells a blind visitor
   nothing; the poster counts those and tells you how many.
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

## Everything else

- **Dashboards / About** are plain HTML pages (`dashboards.html`,
  `about.html`) — edit the text right in the file.
- The About-page portrait is `images/cody-portrait.jpg`. Swap the file to
  change it; portrait-ish works best. If it ever goes missing the figure
  removes itself rather than showing a broken image.
- **Colors and fonts** are CSS variables at the top of `css/review.css`
  (`--foreground`, `--surface`, `--accent`, `--serif`, ...). They're copied
  from codyheart.design so the two sites stay in step — change once here,
  applies everywhere.
- Hosting: it's a fully static site — drop the folder on GitHub Pages, Netlify,
  or any host. No build step.

## Change the nav, a page title, or the footer

Everything around your content — the top nav, the phone menu, the footer, the
wordmark, and the bits of each page's `<head>` that don't show (the title in the
browser tab, the description Google prints, the picture that appears when a link
is shared) — lives in **one file**: `scripts/shell.js`. Edit it, then run:

```
node scripts/shell.js
```

and every page picks up the change at once. That's the place to go for a nav
link, a page's title or description, the Elsewhere menu (Substack, Instagram,
email), or the footer. `node scripts/shell.js --check` says whether any page has
drifted, without changing anything.

**Don't fix the nav by hand in an `.html` file.** In each page the generated
parts sit between marker comments:

```
<!--#shell:nav-->   ...the nav and the phone menu...   <!--/#shell:nav-->
```

Anything you type between a pair of those is wiped the next time the script
runs. Everything outside them is the page's own content and is left alone — so
editing the About essay or the Dashboards copy in place is still fine.

One more: if you ever change a file in `css/` or `js/`, bump `STAMP` near the
top of `scripts/shell.js` and run it. That's the `?v=` on the end of every link,
and without a fresh one anyone who's been to the site keeps the old file out of
their browser's cache. (Posting a trip does this for you.)

## Make a scrapbook (print.html)

Open **`print.html`** — it's yours only, linked from nowhere and kept out of
search. Tick the experiences you want, choose photos-and-writing or
writing-only, pick Letter or A4, say whether you're printing one-sided or
double-sided, and hit **Print / Save as PDF**. Every experience starts on a
fresh sheet, and the bound edge holds an extra ¾ inch so a three-hole punch
lands in the margin instead of in a photograph. Punch it, ring it, done.

In Chrome's print box leave Margins and Scale on **Default**, tick
**Background graphics** so the rules and captions come through, and tick
**Headers and footers** if you want page numbers. Printing everything at once
is slow — Chrome loads all ninety-odd frames before the box even opens — so
save it as a PDF and look at that before you commit a tray of paper.

If you want the photo files themselves rather than the printout, the page also
writes you a PowerShell command that gathers the frames from whatever you
ticked into one folder on the Desktop.
