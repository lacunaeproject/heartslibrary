---
name: add-trip
description: Post a new photography collection (a trip, show, or theme) to heartslibrary.com — writes photos/<slug>/trip.txt, runs the poster to regenerate js/photos.js, bumps cache stamps, and verifies the gallery. Use when the user wants to add/post/publish photos, a trip, a show, or a new collection to the site.
---

# Post a collection

The site's photography is generated from `js/photos.js`, which is **built by
`scripts/post.js` from a plain-text `trip.txt`**. Never hand-edit `js/photos.js`
for a collection that has a `trip.txt` — the next post overwrites it.

## 1. Find out what's being posted

You need: a **slug**, a **title**, a **when**, and the **files**.

Ask only for what you can't determine. If the user already dropped files in
`photos/<something>/`, use that folder name as the slug and go.

- **slug** — lowercase, hyphens, no spaces (`big-sur`, `deadbeat-tour`). It
  becomes the URL: `gallery.html?trip=<slug>`.
- Check whether `photos/<slug>/` already exists. If it does and has a
  `trip.txt`, this is a **re-post** — see §5.

## 2. Confirm the media is in place

```bash
ls photos/<slug>/
```

Every filename referenced in `trip.txt` must exist in that folder. The poster
reads dimensions directly out of the files (JPEG/PNG/WebP/SVG/MP4/MOV), so
nothing needs to be measured by hand.

**Video is the one real trap.** Anything over 8 MB, or not already `.mp4`/`.webm`,
gets flagged — and git keeps the original size forever even after CI shrinks it.
If you see a large `.MOV`, transcode before committing; `post.js` prints the exact
ffmpeg command.

## 3. Write `photos/<slug>/trip.txt`

```
Dodgers vs. Red Sox | Dodgers
August 2026 · North America · 2026-08-09

[about]
The line that sits under the title.

[Bottom of the ninth]
They won it at home. Everyone stood up at once and I got about six
seconds of it before my hands were shaking too much.
redsox-win.mp4  The moment it landed

[highlights]
dsc03638.jpg
dsc03660.jpg
```

Line by line:

- **Line 1** — title. `|` adds a short name used in the nav index.
  Without one, the text before the first comma is used.
- **Line 2** — `·`-separated: when (needs month + year, e.g. `May 2025`),
  an optional continent (must be one of: North America, South America, Europe,
  Africa, Asia, Oceania, Antarctica — it feeds the continents tracker), and an
  optional `YYYY-MM-DD` that controls sort position. **Collections sort by this
  date, newest first.**
- **`[about]`** — the description under the title. Special block.
- **`[highlights]`** — frames flagged `best: true`. These are the ones that hang
  on the front wall at `index.html`. Special block.
- **Any other `[bracketed]` line** — a dateline heading a post.
- **Blank lines separate posts.** A bare filename is media; anything else is
  Cody talking, and the first sentence becomes the headline.
- **Two spaces after a filename** describe that frame. Three forms:

```
mcway.jpg  The cove, four minutes of light          ← visible caption, also the alt
mcway.jpg  [Sunlit falls dropping onto a sand cove] ← alt only, nothing on the page
mcway.jpg  Four minutes of light  [Sunlit falls]    ← both, independently
```

**Describe every frame.** A frame with neither caption nor `[alt]` falls back to
the collection title, which then reads identically on every frame — technically
labelled, useless in practice. Default to the `[bracket]` form: it fixes
accessibility without putting captions on a design that doesn't want them. The
poster counts the fallbacks and tells you how many.

## 4. Run the poster

Always dry-run first:

```bash
node scripts/post.js <slug> --dry
```

Read the output. Check the frame count, the `posted` date, and that
`best: true` landed on the frames listed under `[highlights]`. Then:

```bash
node scripts/post.js <slug>
```

It rewrites only this collection's entry in `js/photos.js` and re-sorts.

## 5. Re-posting an existing collection

`post.js` rebuilds the entry from `trip.txt`, which knows nothing about curation
done later on the site. It deliberately carries across:

- `best: true` flags on frames whose `src` still matches
- the collection's `nav` and `loc` fields

So a re-post won't silently un-highlight the wall. But **anything else added by
hand to that entry in `js/photos.js` is lost.** Check the existing entry for
custom fields before re-posting, and if there are any, fold them into `trip.txt`
or re-add them after.

## 6. Bump the cache stamp

Assets are cache-busted with `?v=YYYYMMDD-N` on **every** page. `post.js` prints
a reminder but does not do this locally. Bump it everywhere at once:

```bash
grep -oh 'v=20[0-9]*-[0-9]*' *.html | sort -u        # current stamp
sed -i 's/v=<old>/v=<new>/g' *.html                   # bump all pages
grep -c 'v=<new>' *.html                              # verify every page changed
```

Skipping this means visitors keep the old `js/photos.js` and don't see the new
collection.

## 7. Verify

```bash
python -m http.server 8765
```

Then check `http://localhost:8765/` (the new collection appears on the wall if it
has highlights) and `http://localhost:8765/gallery.html?trip=<slug>`. Confirm the
photos load, the aspect ratios are right (no letterboxing — a rotated phone video
should not reserve a landscape box), and the posts read in order.

Kill the server when done.

## 8. Commit

```bash
git add photos/<slug> js/photos.js *.html
git commit -m "<Collection title>"
```

Recent commits use short, plain subjects (`Post from photos/`, `json`) — match
that register, don't write a conventional-commits prefix.

## The CI alternative

Pushing `photos/**` triggers `.github/workflows/post-trip.yml`, which does all of
the above on GitHub — resizes to 1600px, transcodes clips to 1080p MP4, converts
HEIC, rewrites `trip.txt`, regenerates `js/photos.js`, and bumps cache stamps.
That's the path Cody uses **from his phone**, with no laptop involved.

If the user is on the phone or just wants it live, tell them to commit the folder
and `trip.txt` and let CI do the rest — don't run the local poster too, or the two
will fight over `js/photos.js`.
