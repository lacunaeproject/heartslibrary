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
      "Each collection lives in one plain-text data file. The bookshelf reads from <em>books.js</em>, the photo albums from <em>photos.js</em>, the pinboard from <em>pins.js</em>, the games shelf from <em>games.js</em>, and these essays from <em>writing.js</em>. Posting means editing a list and saving.",
      "The one moving part is the reading log: a scheduled job asks Goodreads what I've finished every six hours and rewrites <em>log.js</em> by itself. It has been faithfully keeping score since 2023, which is more than I can say for most of my systems.",
      "The design borrows its manners from portfolio sites I admire — quiet type, soft cards, one or two winks per page — set in Geist and Gooper, with a card catalog where a hero section would usually go. A library should have drawers."
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
