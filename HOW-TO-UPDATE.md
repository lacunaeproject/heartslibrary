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
| `full` | A list of `"<p>...</p>"` paragraphs behind the "Full review" toggle. Delete the whole field to skip it |
| `featured` | `true` puts it in the "★ Top ten" chip |
| `shopName`, `shopHref` | The "Read at ..." credit inside the review (optional) |

5. Save. Refresh the page. Done.

## Edit the to-be-read strip

`UPNEXT` at the bottom of `js/books.js` — same idea: `title`, `author`,
`cover`, and `why` (the one-liner about why it's on deck).

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

Also in `js/books.js`, near the top:

- `CURRENT` — the book shown under the Shelf title (`title`, `author`,
  `cover`, and an optional one-line `note`). Swap it whenever you start
  something new; delete the block (or its `title`) to hide the callout.
- `META.avatar` — the URL of the circular author photo on the Shelf.
