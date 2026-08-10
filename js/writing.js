/* ============================================================
   HEART'S LIBRARY — the writing desk. EDIT THIS FILE TO WRITE.
   ------------------------------------------------------------
   Each entry: slug, title, when, deck (one-line standfirst),
   and paragraphs (array of plain-text paragraphs; <em> is the
   only markup you should need). Newest first.

   ⚠ The first entry is a real colophon piece about how the
   site works; the second is an obvious placeholder — replace
   it with your own writing.
   ============================================================ */
window.WRITING = [
  {
    slug: "how-this-site-works",
    posted: "2026-08-08",
    title: "How this site works",
    when: "August 2026",
    deck: "A colophon, for the curious: no build step, no database, one folder of files.",
    paragraphs: [
      "Everything here is a static page — HTML, one stylesheet, a handful of small scripts. There is no build step and no CMS. The whole site is a folder; pushing that folder to GitHub is the entire deploy process.",
      "Each collection lives in one plain-text data file. The photo wall reads from <em>photos.js</em>, the pinboard from <em>pins.js</em>, the games shelf from <em>games.js</em>, and these essays from <em>writing.js</em>. Posting means editing a list and saving.",
      "The one moving part is posting pictures: I drop a folder of images and a short note into the repository, and a job resizes everything, transcodes the video, and rewrites <em>photos.js</em> by itself. The journal is the opposite — every entry there is typed by hand, which is the point.",
      "The design borrows its manners from portfolio sites I admire — quiet type, soft cards, one or two winks per page — set in Geist and Cheltenham, with the photographs given as much of the page as they'll take."
    ]
  },
  {
    slug: "placeholder",
    posted: "2026-08-01",
    title: "Your first essay goes here",
    when: "Someday soon",
    deck: "This is a placeholder entry — open js/writing.js and replace it.",
    paragraphs: [
      "This entry exists so the page has a shape before the real writing arrives. Delete it when you publish your first piece.",
      "The format is deliberately simple: a title, a date, a one-line deck, and paragraphs. No tags, no categories, no comments — just the words, on the page, in the order you wrote them."
    ]
  }
];
