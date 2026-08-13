#!/usr/bin/env node
/* ============================================================
   THE SHELL — one definition of the chrome, swept into every page.

   There is no templating on this site and no build step, so the
   <head>, the nav, the mobile menu and the footer used to be
   duplicated by hand across every page and had forked into four
   variants. This script is the fix: the markup lives HERE, once,
   and gets written into the pages.

     node scripts/shell.js               rewrite every page
     node scripts/shell.js --check       report drift, write nothing
     node scripts/shell.js --stamp <v>   set the ?v= stamp, then rewrite

   The stamp lives in the STAMP constant below and is applied on every
   run, so this script is its only authority. CI passes --stamp to set
   it; that rewrites the constant here too, otherwise the next local
   run would drag every page back to the old value.

   To change the nav, the wordmark, the footer, a meta tag, the
   Elsewhere links, or anything else in the chrome: edit this file
   and run it. Never hand-edit a shell region in a .html file —
   the next run overwrites it.

   Each managed region is fenced by sentinel comments:

     <!--#shell:nav-->  ...generated...  <!--/#shell:nav-->

   Anything outside the fences is the page's own content and is
   never touched. On the first run (no fences present) the script
   finds the old markup by its landmarks and fences it.
   ============================================================ */
"use strict";

var fs = require("fs");
var path = require("path");

var ROOT = path.join(__dirname, "..");
var STAMP = "20260813-18";

/* Every link the chrome writes goes through P(). It is "" for the whole
   site, because every page lives at the repo root and a relative href
   is what lets you open one off the disk. 404.html sets it to "/": that
   file is served at whatever path was missing, so relative links there
   resolve against a directory that does not exist. Set per page, just
   before that page's chrome is generated. */
var PREFIX = "";
function P(rel) { return PREFIX + rel; }

/* ------------------------------------------------------------------
   THE PAGES. Everything page-specific lives in this table — title,
   description, which nav item is current, which scripts it needs.
   `shell: false` means the page renders its own chrome (redirect
   stubs and noindex tools).
   ------------------------------------------------------------------ */
var SITE = {
  name: "Cody Heart",
  suffix: "Cody Heart Photography",
  origin: "https://heartslibrary.com",
  email: "hello@heartslibrary.com",
  instagram: "codynheart",
  substack: "codyheart",
  /* The site-wide social card. It points at a real file on disk and
     nothing checks that for you — the previous one (dsc03638.jpg) was
     deleted in a prune and every page went on advertising it, which
     breaks link previews everywhere while the site itself looks fine.
     If you delete frames, grep for this path. */
  ogImage: "photos/deadbeat-tour/DSC03865.jpg",
  ogImageW: 1600,
  ogImageH: 1200
};

var PAGES = {
  "index.html": {
    title: "Cody Heart Photography",
    desc: "Cody Heart's photography — every frame on one wall, collection by collection, plus a running journal. Photos free to download for personal use.",
    canonical: "/",
    current: "selected",
    scripts: ["photos", "hobby"]
  },
  "collections.html": {
    title: "Collections",
    desc: "Every collection Cody Heart has photographed, newest first — what it was, when it was, and what came back on the card.",
    current: "collections",
    scrolltitle: "Collections",
    scripts: ["photos", "hobby"]
  },
  /* Kept working, deliberately not indexed. Every collection now has a
     real page of its own, so this one's only job is that links posted
     before they existed — gallery.html?trip=slug — still land somewhere
     right. Whatever it renders is by definition a duplicate of one of
     those pages, so it stays out of the index and out of the sitemap
     while staying perfectly usable for a human who follows an old link. */
  "gallery.html": {
    title: "The gallery",
    desc: "One collection, all of it — the frames and the notes written while it was going on.",
    scrolltitle: "The gallery",
    noindex: true,
    scripts: ["photos", "hobby"]
  },
  "feed.html": {
    title: "Journal",
    desc: "Cody Heart's journal — posts from things he actually went to: what he shot, and whatever else was worth keeping.",
    current: "journal",
    scrolltitle: "Journal",
    bodyClass: "feed-page",
    scripts: ["photos", "hobby"]
  },
  "about.html": {
    title: "About",
    desc: "Cody Heart — who's behind the camera, what he shoots with, and why any of it gets written down.",
    current: "about",
    scrolltitle: "About",
    scripts: ["photos", "hobby"]
  },
  "writing.html": {
    title: "Writing",
    desc: "Longer pieces by Cody Heart.",
    scrolltitle: "Writing",
    scripts: ["photos", "hobby", "writing"]
  },
  "pins.html": {
    title: "Pins",
    desc: "Things Cody Heart has pinned — small finds worth keeping.",
    scrolltitle: "Pins",
    scripts: ["photos", "hobby", "pins"]
  },
  "games.html": {
    title: "Games",
    desc: "Games Cody Heart has played, one line each.",
    scrolltitle: "Games",
    scripts: ["photos", "hobby", "games"]
  },
  "dashboards.html": {
    title: "Dashboards",
    desc: "Live data projects by Cody Heart.",
    scrolltitle: "Dashboards",
    scripts: ["photos", "hobby"]
  },

  "colophon.html": {
    title: "Colophon",
    desc: "How this site is built — the typefaces, the lack of a build step, and what you may do with the photographs on it.",
    scrolltitle: "Colophon",
    scripts: ["photos", "hobby"]
  },

  /* THE 404. GitHub Pages serves this file at whatever path was asked
     for, which is the one thing that makes it different from every
     other page here: at /some/deep/thing a relative "css/review.css"
     resolves to /some/deep/css/review.css and the page arrives naked.
     So this is the ONE page whose links are root-relative — see
     `prefix` below. It is also the one page you cannot check by
     double-clicking it, because file:// has no root. */
  "404.html": {
    title: "Not found",
    desc: "That page isn't here.",
    scrolltitle: "Not found",
    prefix: "/",
    noindex: true,
    scripts: ["photos", "hobby"]
  },

  /* Chrome-free by design — listed so the stamp sweep still finds them. */
  "photos.html": { shell: false, noindex: true },
  "experiences.html": { shell: false, noindex: true },
  "post.html": { shell: false, noindex: true },
  "print.html": { shell: false, noindex: true }
};

/* ------------------------------------------------------------------
   THE COLLECTION PAGES, one per trip, generated.

   WHY THESE EXIST. Every collection used to be gallery.html?trip=slug
   — seven collections behind one file, so they shared one <title>, one
   description, one canonical and one og:image. Pasted into iMessage or
   Instagram or a Substack post, all seven previewed as the same
   hardcoded concert photo with the title "The gallery", and the
   canonical told Google the seven were one page. None of that is
   fixable from js/hobby.js: a crawler reads the HTML it is served and
   does not run the script that would fix the tags.

   So the poster's data becomes pages. Each trip gets <slug>.html at the
   REPO ROOT with its own title, description, canonical and its own lead
   frame as the share image.

   ROOT, not collections/<slug>.html, and that is deliberate. Photo
   `src` values in js/photos.js are document-relative ("photos/x/y.jpg")
   and js/hobby.js hands them to every page unchanged; from a
   subdirectory every one of them would 404. The fixes for that are
   <base href="../">, which also redirects the "#main" skip link off the
   page, or rewriting srcs at runtime on every render path. Both are
   worse than a flat namespace. The cost of root is that a trip could be
   slugged "about" and clobber a real page, so `claim()` below refuses.

   These files are GENERATED IN FULL on every run, fences and body
   alike — hand-edit one and the next run eats it. Their body is
   gallery.html's body, read at run time rather than copied here, so the
   layout cannot drift between the two.
   ------------------------------------------------------------------ */
function loadPhotoData() {
  var sandbox = { window: {} };
  var src = fs.readFileSync(path.join(ROOT, "js", "photos.js"), "utf8");
  new Function("window", src)(sandbox.window);
  return { trips: sandbox.window.TRIPS || [], posts: sandbox.window.POSTS || [] };
}

var DATA = loadPhotoData();

/* the same name the nav, the index and the page itself use */
function xpName(t) { return t.nav || t.short || t.place || ""; }

/* the frame the collection leads with, which is also the frame its
   share card should be — the same choice js/hobby.js makes */
function leadFrame(t) {
  var stills = (t.photos || []).filter(function (p) { return !p.video; });
  return stills.filter(function (p) { return p.best; })[0] || stills[0] || null;
}

function collectionDesc(t) {
  var n = (t.photos || []).filter(function (p) { return !p.video; }).length;
  var bits = [xpName(t)];
  var tail = [];
  if (n) tail.push(n + (n === 1 ? " frame" : " frames"));
  if (t.when) tail.push(t.when);
  if (t.loc) tail.push(t.loc);
  return bits.join("") + " — " + (tail.length ? tail.join(", ") + ". " : "") +
    "Photographs by Cody Heart, free to download for personal use.";
}

/* gallery.html IS the template: everything between the nav fence and
   the footer fence, verbatim, with the one heading that is knowable
   ahead of time filled in so the page says the collection's name
   before any script runs. */
var GALLERY_BODY = (function () {
  var raw = fs.readFileSync(path.join(ROOT, "gallery.html"), "utf8").replace(/\r\n/g, "\n");
  var a = raw.indexOf("<!--/#shell:nav-->");
  var b = raw.indexOf("<!--#shell:footer-->");
  if (a < 0 || b < 0) throw new Error("gallery.html has no shell fences to take a body from");
  return raw.slice(a + "<!--/#shell:nav-->".length, b).replace(/^\n+|\n+$/g, "");
})();

/* what line endings this checkout uses, for files we create from
   nothing — gallery.html stands in for the tree */
var TREE_CRLF = fs.readFileSync(path.join(ROOT, "gallery.html"), "utf8").indexOf("\r\n") !== -1;

function collectionBody(t) {
  return GALLERY_BODY.replace(
    /(<h1 id="galleryTitle">)[\s\S]*?(<\/h1>)/,
    "$1" + esc(xpName(t)) + "$2"
  );
}

DATA.trips.forEach(function (t) {
  if (!t.slug) return;
  var file = t.slug + ".html";
  if (PAGES[file]) {
    console.error('refusing to generate ' + file + ': the trip slug "' + t.slug +
      '" collides with a hand-maintained page. Rename the folder in photos/.');
    process.exit(2);
  }
  var lead = leadFrame(t);
  PAGES[file] = {
    title: xpName(t),
    desc: collectionDesc(t),
    scrolltitle: xpName(t),
    scripts: ["photos", "hobby"],
    generated: true,
    trip: t.slug,
    lastmod: t.posted || "",
    ogImage: lead ? lead.src : null,
    ogImageW: lead ? lead.w : null,
    ogImageH: lead ? lead.h : null,
    body: collectionBody(t)
  };
});

/* ------------------------------------------------------------------
   THE MARK. One heart path, one lockup:
     · the wordmark  — "Cody Heart", the heart leading the name
   The aperture variant (the same heart with a lens iris cut out of it)
   used to be built here as APERTURE_D and nothing ever referenced it;
   images/mark.svg carries its own complete copy for the favicon.
   The path fills with currentColor so the colour comes from the
   --heart token, not a hex literal repeated in every file.
   ------------------------------------------------------------------ */
var HEART_D = "M12.1 7.6C13.7 5 15.8 3.7 18 4.15 20.9 4.6 22.1 7.1 21.4 9.9 20.8 12.5 18 15.4 11.7 21.9 5.6 15.4 3.1 12.4 2.6 9.7 2 6.9 3.4 4.6 6 4.2 8.1 3.85 10.5 5 12.1 7.6Z";

/* The heart LEADS the lockup now — it used to be the full stop after
   the name. The TIGHT viewBox still matters: the path occupies only
   x 2.46–21.6 / y 4.06–21.9, so a `0 0 24 24` box would carry about
   2.4 units of dead padding on every side and the mark would sit
   visually adrift from the type it introduces. Don't "tidy" it back
   to 0 0 24 24. */
function wordmark() {
  return '<a class="wordmark" href="' + P("index.html") + '" aria-label="Cody Heart — home">' +
    '<svg class="wordmark__dot" viewBox="2.462 4.062 19.133 17.838" aria-hidden="true"><path fill="currentColor" d="' + HEART_D + '"/></svg>' +
    '<span class="wordmark__name">Cody Heart</span>' +
    "</a>";
}

/* ------------------------------------------------------------------
   THEME. Three states — light, dark, auto (follow the sun). The
   inline script must stay blocking in <head>: deferring it flashes
   the wrong theme. It sets BOTH html.dark (which flips the token
   scale) and html[data-theme] (which tells the control what to show).

   LIGHT IS THE DEFAULT, and it is the state stored as nothing at all:
   no key, an unreadable key, or junk all resolve to light. Auto and
   dark are the ones that have to be written down. It used to be the
   other way round — absence meant auto — so flipping the default also
   meant flipping which state clears the key in js/review.js `set()`.
   The two must agree or the picker lies about what it chose.
   ------------------------------------------------------------------ */
var THEME_INIT =
  '<script>(function(){var d=document.documentElement,s=null;try{s=localStorage.getItem("hl-theme")}catch(e){}' +
  'if(s!=="dark"&&s!=="auto")s="light";d.setAttribute("data-theme",s);var k;' +
  'if(s==="auto"){var t=new Date(),r=Math.PI/180,y=Math.floor((t-new Date(t.getFullYear(),0,0))/864e5),' +
  'q=23.45*Math.sin(r*(360/365)*(284+y)),c=(Math.cos(90.833*r)-Math.sin(39*r)*Math.sin(q*r))/(Math.cos(39*r)*Math.cos(q*r)),' +
  'H=Math.acos(Math.max(-1,Math.min(1,c)))/r/15,j=new Date(t.getFullYear(),0,1).getTimezoneOffset(),' +
  'n=t.getTimezoneOffset()<j?13:12,h=t.getHours()+t.getMinutes()/60;k=h<n-H||h>n+H}else{k=s==="dark"}' +
  'd.classList.toggle("dark",k)})();</script>';

var ICON_AUTO = '<svg class="theme-i theme-i--auto" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/><path fill="currentColor" d="M12 4a8 8 0 0 1 0 16Z"/></svg>';
var ICON_SUN = '<svg class="theme-i theme-i--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.8v2.3M12 18.9v2.3M2.8 12h2.3M18.9 12h2.3M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"/></svg>';
var ICON_MOON = '<svg class="theme-i theme-i--moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.6 14.2A8.8 8.8 0 0 1 9.8 3.4a8.8 8.8 0 1 0 10.8 10.8Z"/></svg>';

function themeButton() {
  return '<button class="theme-btn" type="button" data-theme-cycle aria-label="Colour theme">' +
    '<span class="theme-btn__stack">' + ICON_AUTO + ICON_SUN + ICON_MOON + "</span>" +
    "</button>";
}

function themePicker() {
  return '<div class="theme-pick" role="group" aria-label="Colour theme">' +
    ['auto', 'light', 'dark'].map(function (v) {
      var label = v.charAt(0).toUpperCase() + v.slice(1);
      return '<button class="theme-pick__opt" type="button" data-theme-set="' + v + '">' + label + "</button>";
    }).join("") +
    "</div>";
}

/* ------------------------------------------------------------------
   NAV. One nav on every shelled page. The wordmark holds the left
   and links home from everywhere, so no page needs a bespoke "back"
   affordance. The scrolltitle takes the flexible middle — it used to
   be absolutely centred at left:50%, which put it underneath the link
   row on any page whose links were wide enough. As a flex child it
   cannot overlap by construction; it just ellipsizes.
   ------------------------------------------------------------------ */
var NAV_LINKS = [
  { key: "selected", label: "Selected", href: "index.html" },
  { key: "collections", label: "Collections", href: "collections.html", menu: "trips" },
  { key: "journal", label: "Journal", href: "feed.html" },
  { key: "about", label: "About", href: "about.html" }
];

var ELSEWHERE = [
  {
    title: "Substack", desc: "The newsletter",
    href: "https://substack.com/@" + SITE.substack, tone: "c-orange",
    icon: '<rect class="duo-a" x="2" y="2" width="20" height="20" rx="3"/><rect class="duo-b" x="6" y="6.5" width="12" height="2.4" rx="1.2"/><rect class="duo-b" x="6" y="11" width="12" height="2.4" rx="1.2"/><path class="duo-b" d="M6 15.5h12v2a1 1 0 0 1-1.4.92L12 16.6l-4.6 1.82A1 1 0 0 1 6 17.5v-2Z"/>'
  },
  {
    title: "Instagram", desc: "@" + SITE.instagram,
    href: "https://instagram.com/" + SITE.instagram, tone: "c-teal",
    icon: '<rect class="duo-a" x="2" y="2" width="20" height="20" rx="5.6"/><circle class="duo-b" cx="12" cy="12" r="4.4"/><circle class="duo-b" cx="17.6" cy="6.4" r="1.4"/>'
  },
  {
    title: "Email", desc: SITE.email,
    href: "mailto:" + SITE.email, tone: "c-green",
    icon: '<path class="duo-b" d="M12 12.6 0 5.4V5a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v.4l-12 7.2Z"/><path class="duo-a" d="M0 8.2 12 15.4 24 8.2V19a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V8.2Z"/>'
  }
];

var CHEV = '<svg class="chev" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 4L5 6.5L7.5 4"/></svg>';

/* The bar's dropdown keeps the icons monochrome so the menu stays
   quiet next to the links; the mobile sheet has room to breathe and
   takes the colour, which is how it read before the sweep. */
function elsewhereItems(cls) {
  var colored = cls !== "menu-item";
  return ELSEWHERE.map(function (e) {
    var external = e.href.indexOf("http") === 0;
    return '<a class="' + cls + '"' + (cls === "menu-item" ? ' role="menuitem"' : "") +
      (external ? ' target="_blank" rel="noopener noreferrer"' : "") +
      ' href="' + e.href + '">' +
      '<div class="menu-item__tile"><svg class="icon-duo ' + (colored ? "is-colored " : "") + e.tone + '" viewBox="0 0 24 24" fill="none" aria-hidden="true">' + e.icon + "</svg></div>" +
      '<div><span class="menu-item__title">' + e.title + "</span>" +
      '<span class="menu-item__desc">' + e.desc + "</span></div></a>";
  }).join("");
}

function nav(page) {
  var links = NAV_LINKS.map(function (l) {
    var current = page.current === l.key ? ' aria-current="page"' : "";
    if (l.menu === "trips") {
      return '<div class="nav__drop">' +
        '<button class="nav__link link-hover press-scale" aria-expanded="false" aria-haspopup="true" aria-controls="menu-trips"' + current + ">" + l.label + CHEV + "</button>" +
        '<div class="nav__menu" id="menu-trips" role="menu" aria-hidden="true">' +
        '<div class="nav__menu-pad" id="navTrips"><a class="menu-item menu-item--all" role="menuitem" href="' + P("collections.html") + '"><div><span class="menu-item__title">All collections</span></div></a></div>' +
        "</div></div>";
    }
    return '<a class="nav__link link-hover" href="' + P(l.href) + '"' + current + ">" + l.label + "</a>";
  }).join("");

  return '<nav class="nav" aria-label="Main navigation">\n' +
    '  <div class="nav__inner">\n' +
    "    " + wordmark() + "\n" +
    '    <button class="nav__scrolltitle" type="button" aria-label="Scroll to top">' + esc(page.scrolltitle || "") + "</button>\n" +
    '    <div class="nav__links">' + links +
    '<div class="nav__drop">' +
    '<button class="nav__link link-hover press-scale" aria-expanded="false" aria-haspopup="true" aria-controls="menu-elsewhere">Elsewhere' + CHEV + "</button>" +
    '<div class="nav__menu" id="menu-elsewhere" role="menu" aria-hidden="true"><div class="nav__menu-pad">' + elsewhereItems("menu-item") + "</div></div>" +
    "</div></div>\n" +
    "    " + themeButton() + "\n" +
    '    <div class="nav__burger-wrap"><button class="nav__burger" aria-expanded="false" aria-label="Open menu"><span></span><span></span></button></div>\n' +
    "  </div>\n" +
    "</nav>";
}

function mobileMenu() {
  return '<div class="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">\n' +
    '  <div class="mobile-menu__inner">\n' +
    '    <button class="mobile-menu__close" type="button" aria-label="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>\n' +
    NAV_LINKS.map(function (l) {
      return '    <a class="mobile-menu__link" href="' + P(l.href) + '">' + l.label + "</a>\n";
    }).join("") +
    /* The bar's glyph sits underneath the open overlay, so the menu
       carries the control itself — and with room for labels it offers
       all three states instead of a two-way flip. It goes here, above
       the lists: at the foot of the sheet it fell below the fold on a
       phone, which is the opposite of easy to reach. */
    '    <div class="mobile-menu__section mobile-menu__section--theme">\n' +
    '      <p class="mobile-menu__label">Appearance</p>\n' +
    "      " + themePicker() + "\n" +
    "    </div>\n" +
    '    <div class="mobile-menu__section">\n' +
    '      <p class="mobile-menu__label">Collections</p>\n' +
    '      <div class="mobile-menu__triplist" id="menuTrips"></div>\n' +
    "    </div>\n" +
    '    <div class="mobile-menu__section">\n' +
    '      <p class="mobile-menu__label">Elsewhere</p>\n' +
    '      <div class="mobile-menu__list">' + elsewhereItems("mobile-menu__item") + "</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>";
}

function footer() {
  return '<footer class="footer">\n' +
    '  <div class="footer__inner">\n' +
    '    <span class="footer__left">© Cody Heart ' + new Date().getFullYear() + "</span>\n" +
    '    <span class="footer__links"><a class="link-hover" href="' + P("colophon.html") + '">Colophon</a><a class="link-hover" href="https://instagram.com/' + SITE.instagram + '" target="_blank" rel="noopener noreferrer">Instagram</a><a class="link-hover" href="mailto:' + SITE.email + '">Contact</a></span>\n' +
    "  </div>\n" +
    "</footer>";
}

/* ------------------------------------------------------------------
   HEAD. Generated whole, so the title register, the social cards and
   the asset stamps can never drift between pages again.
   ------------------------------------------------------------------ */
/* `rank` is load order, and it is enforced rather than trusted: the
   renderer reads its data off window at execution time (js/hobby.js:27
   takes window.PINS etc. immediately), so every data file has to be
   parsed before it. Listing them the wrong way round in a manifest
   entry silently renders an empty page, so the order is sorted here
   instead of being the author's problem. */
var SCRIPT_SRC = {
  photos: { src: "js/photos.js", rank: 0 },
  pins: { src: "js/pins.js", rank: 0 },
  games: { src: "js/games.js", rank: 0 },
  writing: { src: "js/writing.js", rank: 0 },
  hobby: { src: "js/hobby.js", rank: 1 }
};

function head(file, page) {
  var full = page.canonical === "/" ? page.title : page.title + " — " + SITE.suffix;
  var url = SITE.origin + (page.canonical === "/" ? "/" : "/" + file);
  var v = "?v=" + STAMP;
  /* A collection advertises its OWN lead frame; everything else falls
     back to the site card. This is the whole point of the per-slug
     pages — a crawler never runs js/hobby.js, so if the tag isn't in
     the file it is served, the share card is wrong. */
  var img = page.ogImage || SITE.ogImage;
  var imgW = page.ogImage ? page.ogImageW : SITE.ogImageW;
  var imgH = page.ogImage ? page.ogImageH : SITE.ogImageH;
  var imgAlt = page.trip
    ? "A frame from " + page.title + ", photographed by Cody Heart"
    : "A frame from Cody Heart’s photography";

  var out = [];
  out.push('<meta charset="utf-8">');
  out.push('<meta name="viewport" content="width=device-width, initial-scale=1">');
  out.push("<title>" + esc(full) + "</title>");
  out.push('<meta name="description" content="' + esc(page.desc) + '">');
  if (page.noindex) out.push('<meta name="robots" content="noindex, follow">');
  out.push('<link rel="canonical" href="' + url + '">');
  out.push('<link rel="icon" href="' + P("images/mark.svg") + '" type="image/svg+xml">');
  /* so a reader that lands on any page can find the journal */
  out.push('<link rel="alternate" type="application/rss+xml" title="' +
    esc(SITE.suffix + " — Journal") + '" href="' + P("feed.xml") + '">');
  out.push('<meta property="og:type" content="website">');
  out.push('<meta property="og:site_name" content="' + SITE.suffix + '">');
  out.push('<meta property="og:title" content="' + esc(full) + '">');
  out.push('<meta property="og:description" content="' + esc(page.desc) + '">');
  out.push('<meta property="og:url" content="' + url + '">');
  out.push('<meta property="og:image" content="' + SITE.origin + "/" + img + '">');
  if (imgW) out.push('<meta property="og:image:width" content="' + imgW + '">');
  if (imgH) out.push('<meta property="og:image:height" content="' + imgH + '">');
  out.push('<meta property="og:image:alt" content="' + esc(imgAlt) + '">');
  out.push('<meta name="twitter:card" content="summary_large_image">');
  /* Which collection this page is. js/hobby.js reads it instead of
     ?trip= when it's here, which is what lets a static page render the
     right set without a query string. */
  if (page.trip) out.push('<meta name="hl-trip" content="' + esc(page.trip) + '">');
  /* js/hobby.js writes hrefs of its own — the nav's collection list,
     the index rows — and on a prefixed page they need the same prefix
     the chrome got. This is how it finds out. */
  if (PREFIX) out.push('<meta name="hl-base" content="' + esc(PREFIX) + '">');
  out.push(THEME_INIT);
  out.push('<link rel="stylesheet" href="' + P("css/review.css") + v + '">');
  out.push('<script defer src="' + P("js/review.js") + v + '"></script>');
  (page.scripts || []).slice().sort(function (a, b) {
    return SCRIPT_SRC[a].rank - SCRIPT_SRC[b].rank;
  }).forEach(function (s) {
    out.push('<script defer src="' + P(SCRIPT_SRC[s].src) + v + '"></script>');
  });
  return out.join("\n");
}

/* ------------------------------------------------------------------
   The sweep.
   ------------------------------------------------------------------ */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function fence(name, body) {
  return "<!--#shell:" + name + "-->\n" + body + "\n<!--/#shell:" + name + "-->";
}

/* Replace a fenced region, or on the first run find the legacy markup
   by its landmark and fence it in place. */
function swap(html, name, body, legacy) {
  var re = new RegExp("<!--#shell:" + name + "-->[\\s\\S]*?<!--/#shell:" + name + "-->");
  if (re.test(html)) return html.replace(re, fence(name, body));
  if (legacy && legacy.test(html)) return html.replace(legacy, fence(name, body));
  return null;
}

var LEGACY = {
  head: /(?<=<head>\n)[\s\S]*?(?=<\/head>)/,
  nav: /<nav class="nav"[\s\S]*?<\/nav>\n<div class="mobile-menu"[\s\S]*?\n<\/div>/,
  footer: /<footer class="footer">[\s\S]*?<\/footer>/
};

var args = process.argv.slice(2);
var CHECK = args.indexOf("--check") !== -1;
var report = [];
var changed = 0;

/* --stamp <value> rewrites the constant above, so the file stays the
   single source of the version rather than the pages drifting from it. */
var si = args.indexOf("--stamp");
if (si !== -1) {
  var given = args[si + 1];
  if (!given || given.charAt(0) === "-") {
    console.error("--stamp needs a value, e.g. --stamp 20260810-11");
    process.exit(2);
  }
  STAMP = given;
  var self = path.join(__dirname, "shell.js");
  var src = fs.readFileSync(self, "utf8");
  var bumped = src.replace(/^var STAMP = "[^"]*";$/m, 'var STAMP = "' + STAMP + '";');
  if (bumped === src) {
    console.error("could not find the STAMP constant to rewrite");
    process.exit(2);
  }
  if (!CHECK) fs.writeFileSync(self, bumped);
}

/* A generated page has no hand-written part, so it is built whole
   rather than patched through the fences. It still carries them: the
   --check path and every other reader treats it like any other page. */
function generatedPage(file, page) {
  return "<!DOCTYPE html>\n" +
    '<html lang="en" class="no-js">\n' +
    "<head>\n" +
    fence("head", head(file, page)) + "</head>\n" +
    "<body>\n\n" +
    '<a class="skip" href="#main">Skip to content</a>\n' +
    fence("nav", nav(page) + "\n" + mobileMenu()) + "\n\n" +
    page.body + "\n" +
    fence("footer", footer()) + "\n" +
    "</body>\n</html>\n";
}

Object.keys(PAGES).forEach(function (file) {
  var page = PAGES[file];
  var abs = path.join(ROOT, file);
  var exists = fs.existsSync(abs);
  if (!exists && !page.generated) { report.push("  missing   " + file); return; }

  /* every link the chrome writes on this page hangs off this */
  PREFIX = page.prefix || "";

  /* The working tree is CRLF (git checkout on Windows). Normalise for
     matching, then put the file's own endings back on the way out —
     otherwise every run shows the whole file as changed. A file we are
     about to create has no endings of its own yet, so it takes the
     tree's. */
  var raw = exists ? fs.readFileSync(abs, "utf8") : "";
  var crlf = exists ? raw.indexOf("\r\n") !== -1 : TREE_CRLF;
  var before = crlf ? raw.replace(/\r\n/g, "\n") : raw;
  var html = before;

  if (page.generated) {
    html = generatedPage(file, page);
  } else if (page.shell === false) {
    /* chrome-free pages: keep their asset stamps in step, nothing else */
    html = html.replace(/\?v=\d{8}-\d+/g, "?v=" + STAMP);
  } else {
    /* no `dark` here any more: the class is the pre-script guess, and
       with light the default the guess that costs nothing is light */
    var htmlTag = '<html lang="en" class="no-js">';
    html = html.replace(/<html[^>]*>/, htmlTag);
    if (page.bodyClass) {
      html = html.replace(/<body[^>]*>/, '<body class="' + page.bodyClass + '">');
    } else {
      html = html.replace(/<body[^>]*>/, "<body>");
    }

    var steps = [
      ["head", head(file, page), LEGACY.head],
      ["nav", nav(page) + "\n" + mobileMenu(), LEGACY.nav],
      ["footer", footer(), LEGACY.footer]
    ];
    for (var i = 0; i < steps.length; i++) {
      var next = swap(html, steps[i][0], steps[i][1], steps[i][2]);
      if (next === null) { report.push("  NO ANCHOR " + file + " → " + steps[i][0]); return; }
      html = next;
    }
  }

  if (html !== before) {
    changed++;
    var verb = CHECK ? (exists ? "drift" : "absent") : (exists ? "wrote" : "created");
    report.push("  " + verb + (verb.length < 6 ? "     " : "    ") + file);
    if (!CHECK) fs.writeFileSync(abs, crlf ? html.replace(/\n/g, "\r\n") : html);
  } else {
    report.push("  ok        " + file);
  }
});

/* ------------------------------------------------------------------
   THE GENERATED FILES THAT AREN'T PAGES.

   sitemap.xml and feed.xml both need the same two things this script
   already has and nothing else does: the full list of pages, and the
   data behind them. Putting them anywhere else would mean a second
   enumeration of the site that could disagree with this one.

   They are written next to the pages and go through the same --check,
   so CI fails on a stale sitemap the same way it fails on stale chrome.
   ------------------------------------------------------------------ */
function writeGenerated(name, body) {
  var abs = path.join(ROOT, name);
  var exists = fs.existsSync(abs);
  var raw = exists ? fs.readFileSync(abs, "utf8") : "";
  var crlf = exists ? raw.indexOf("\r\n") !== -1 : TREE_CRLF;
  var before = crlf ? raw.replace(/\r\n/g, "\n") : raw;
  if (before === body) { report.push("  ok        " + name); return; }
  changed++;
  var verb = CHECK ? (exists ? "drift" : "absent") : (exists ? "wrote" : "created");
  report.push("  " + verb + (verb.length < 6 ? "     " : "    ") + name);
  if (!CHECK) fs.writeFileSync(abs, crlf ? body.replace(/\n/g, "\r\n") : body);
}

function sitemap() {
  var urls = Object.keys(PAGES).filter(function (f) {
    return !PAGES[f].noindex && PAGES[f].shell !== false;
  }).map(function (f) {
    var page = PAGES[f];
    return {
      loc: SITE.origin + (page.canonical === "/" ? "/" : "/" + f),
      lastmod: page.lastmod || ""
    };
  });
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(function (u) {
      return "  <url>\n    <loc>" + esc(u.loc) + "</loc>\n" +
        (u.lastmod ? "    <lastmod>" + esc(u.lastmod) + "</lastmod>\n" : "") +
        "  </url>\n";
    }).join("") +
    "</urlset>\n";
}

/* Permissive on purpose. The pages that should stay out of an index say
   so with <meta name="robots" content="noindex">, and a crawler has to
   be allowed to fetch a page to read that — Disallow here would hide
   the instruction rather than enforce it. */
function robots() {
  return "User-agent: *\nAllow: /\n\nSitemap: " + SITE.origin + "/sitemap.xml\n";
}

/* ---- the journal feed ----------------------------------------------
   The same posts feed.html renders, assembled the same way: every beat
   of every collection is its own post, plus the standalone entries in
   window.POSTS, newest first. The anchors match `anchorFor()` in
   js/hobby.js — if that changes, every subscriber's read state breaks,
   so the two have to stay in step.
   ------------------------------------------------------------------ */
var RSS_MAX = 40;
var RFC_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var RFC_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function rfc822(s) {
  var m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);
  if (!m) return "";
  var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0)));
  return RFC_DAYS[d.getUTCDay()] + ", " + String(d.getUTCDate()).padStart(2, "0") + " " +
    RFC_MONTHS[d.getUTCMonth()] + " " + d.getUTCFullYear() + " " +
    String(d.getUTCHours()).padStart(2, "0") + ":" +
    String(d.getUTCMinutes()).padStart(2, "0") + ":00 +0000";
}

function longDate(s) {
  var m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  var LONG = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
  return LONG[+m[2] - 1] + " " + +m[3] + ", " + m[1];
}

function journalEntries() {
  var out = [];
  DATA.trips.forEach(function (t) {
    var beats = (t.beats || []).slice();
    if (!beats.length) return;
    if (beats.every(function (b) { return !!b.time; })) {
      beats.sort(function (a, b) { return a.time < b.time ? -1 : a.time > b.time ? 1 : 0; });
    }
    beats.forEach(function (b, i) {
      out.push({
        date: b.time || t.posted || "",
        slug: t.slug, n: i,
        where: t.loc || "", name: xpName(t),
        say: b.say || "",
        shots: (b.shots || []).map(function (k) { return (t.photos || [])[k]; }).filter(Boolean)
      });
    });
  });
  DATA.posts.forEach(function (p) {
    out.push({
      date: p.time || "", slug: "", n: 0,
      where: p.at || "", name: p.at || "",
      say: p.say || "",
      shots: (p.photos || [])
    });
  });
  out = out.filter(function (e) { return e.say || e.shots.length; });
  out.sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  return out.slice(0, RSS_MAX);
}

function anchorFor(e) {
  return "post-" + (String(e.date || "").slice(0, 10) || "x") +
    (e.slug ? "-" + e.slug : "") + (e.n ? "-" + e.n : "");
}

/* A reader shows a title whether the post has one or not, and the
   journal deliberately has none — the date carries the post and the
   place follows it. So the title is built from exactly those two, which
   is what the card itself says. */
function rssTitle(e) {
  var when = longDate(e.date);
  var who = e.name || e.where;
  return who ? who + " — " + when : when || "A post";
}

function feedXml() {
  var entries = journalEntries();
  var self = SITE.origin + "/feed.xml";
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n' +
    "<channel>\n" +
    "  <title>" + esc(SITE.suffix + " — Journal") + "</title>\n" +
    "  <link>" + SITE.origin + "/feed.html</link>\n" +
    "  <description>Posts from things Cody Heart actually went to: what he shot, and whatever else was worth keeping.</description>\n" +
    "  <language>en</language>\n" +
    '  <atom:link href="' + self + '" rel="self" type="application/rss+xml"/>\n' +
    entries.map(function (e) {
      var url = SITE.origin + "/feed.html#" + anchorFor(e);
      var body = "";
      if (e.say) body += "<p>" + esc(e.say) + "</p>";
      e.shots.forEach(function (p) {
        if (!p || p.video) return;
        body += '<p><img src="' + SITE.origin + "/" + esc(p.src) + '" alt="' +
          esc(p.alt || "") + '"></p>';
      });
      return "  <item>\n" +
        "    <title>" + esc(rssTitle(e)) + "</title>\n" +
        "    <link>" + esc(url) + "</link>\n" +
        '    <guid isPermaLink="true">' + esc(url) + "</guid>\n" +
        (rfc822(e.date) ? "    <pubDate>" + rfc822(e.date) + "</pubDate>\n" : "") +
        "    <description><![CDATA[" + body + "]]></description>\n" +
        "  </item>\n";
    }).join("") +
    "</channel>\n</rss>\n";
}

writeGenerated("sitemap.xml", sitemap());
writeGenerated("robots.txt", robots());
writeGenerated("feed.xml", feedXml());

/* ORPHANS. Rename a folder in photos/ and the trip changes slug, which
   means a new <slug>.html gets generated and the old one is left behind
   — still in the repo, still served, still in anyone's browser history,
   now rendering whatever TRIPS[0] happens to be. This does NOT delete
   them, because deleting files nobody asked to delete is how a generator
   loses your trust; it just says which ones no longer belong to a trip.
   They are recognisable by the meta only a generated page carries. */
fs.readdirSync(ROOT).forEach(function (f) {
  if (!/\.html$/.test(f) || PAGES[f]) return;
  var body = fs.readFileSync(path.join(ROOT, f), "utf8");
  if (body.indexOf('name="hl-trip"') === -1) return;
  report.push("  ORPHAN    " + f + " — no trip has this slug any more; delete it");
});

console.log("shell " + STAMP + (CHECK ? "  (check only)" : ""));
console.log(report.join("\n"));
console.log(changed ? "\n" + changed + " page(s) " + (CHECK ? "would change" : "updated") : "\nall pages current");
if (CHECK && changed) process.exit(1);
