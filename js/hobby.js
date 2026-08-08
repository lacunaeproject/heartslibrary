/* ============================================================
   HEART'S LIBRARY — page renderers.
   One small file drives the photography pages (the homepage
   gallery grid, gallery.html, the photos.html archive) and the
   background wings (pins, games, writing), reading the plain
   data files. Each block no-ops unless its container exists,
   so every page can load the same script. You never need to
   edit this file to post — edit the data files.
   ============================================================ */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  var TRIPS = window.TRIPS || [];
  var PINS = window.PINS || [];
  var GAMES = window.GAMES || [];
  var WRITING = window.WRITING || [];

  function allPhotos() {
    var out = [];
    TRIPS.forEach(function (t) {
      (t.photos || []).forEach(function (p) { out.push({ trip: t, photo: p }); });
    });
    return out;
  }
  function cover(t) {
    return (t.photos && t.photos[0]) || null;
  }
  function shotHtml(t, p, i) {
    return '<figure class="shot">' +
      '<button class="shot-btn" type="button" data-trip="' + esc(t.slug) + '" data-i="' + i + '" aria-label="View larger: ' + esc(p.caption || t.place) + '">' +
      '<img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") + '" loading="lazy"' +
      (p.w && p.h ? ' style="aspect-ratio:' + Number(p.w) + '/' + Number(p.h) + '"' : "") + ">" +
      "</button>" +
      (p.caption ? '<figcaption class="shot-cap">' + esc(p.caption) + "</figcaption>" : "") +
      "</figure>";
  }

  /* Lightbox: one <dialog>, shared by any page that renders shots. */
  function bindLightbox() {
    var dlg = document.getElementById("lightbox");
    if (!dlg || typeof dlg.showModal !== "function") return;
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".shot-btn");
      if (!btn) return;
      var trip = TRIPS.filter(function (t) { return t.slug === btn.getAttribute("data-trip"); })[0];
      var p = trip && trip.photos[Number(btn.getAttribute("data-i"))];
      if (!p) return;
      dlg.querySelector("img").src = p.src;
      dlg.querySelector("img").alt = p.alt || "";
      dlg.querySelector(".lightbox-cap").textContent =
        (p.caption ? p.caption + " — " : "") + trip.place + ", " + trip.when;
      dlg.showModal();
    });
    dlg.addEventListener("click", function () { dlg.close(); });
  }
  bindLightbox();

  /* ----------------------------------------------------------
     HOMEPAGE — the gallery grid: one big rounded cover per
     trip, title on hover, clicking through to the gallery.
     Static tiles in index.html are only a no-JS fallback.
     ---------------------------------------------------------- */
  var grid = document.getElementById("galleryGrid");
  if (grid && TRIPS.length) {
    grid.innerHTML = TRIPS.map(function (t, i) {
      var c = cover(t);
      if (!c) return "";
      return '<a class="gcard' + (i === 0 ? " gcard--wide" : "") + '" href="gallery.html?trip=' + esc(t.slug) + '">' +
        '<img src="' + esc(c.src) + '" alt="' + esc(t.place) + '"' + (i === 0 ? "" : ' loading="lazy"') + ">" +
        '<span class="gcard-label">' + esc(t.place) +
          '<span class="gcard-meta">' + esc(t.when) + " · " + (t.photos || []).length + " frames</span></span>" +
        '<span class="gcard-go" aria-hidden="true">→</span></a>';
    }).join("");
  }

  /* ----------------------------------------------------------
     HOMEPAGE — the marquee rows: trip names and frame captions
     on the move. Content is doubled so the CSS -50% loop lands
     seamlessly; static markup in index.html is the fallback.
     ---------------------------------------------------------- */
  function mqItems(pairs) {
    var one = pairs.map(function (x) {
      return '<span class="mq-item"><span class="mq-name">' + esc(x[0]) +
        '</span><img class="mq-thumb" src="' + esc(x[1]) + '" alt=""></span>';
    }).join("");
    return one + one;
  }
  var mqa = document.getElementById("marqueeA");
  if (mqa && TRIPS.length) {
    mqa.innerHTML = mqItems(TRIPS.map(function (t) {
      var p = (t.photos && (t.photos[1] || t.photos[0])) || {};
      return [t.place, p.src || ""];
    }));
    var mqb = document.getElementById("marqueeB");
    if (mqb) {
      var caps = [];
      TRIPS.forEach(function (t) {
        (t.photos || []).slice(0, 2).forEach(function (p) {
          if (p.caption && p.src) caps.push([p.caption, p.src]);
        });
      });
      if (caps.length) mqb.innerHTML = mqItems(caps.slice(0, 5));
    }
  }

  /* ----------------------------------------------------------
     GALLERY page — one trip, from ?trip=<slug>
     ---------------------------------------------------------- */
  var galleryShots = document.getElementById("galleryShots");
  if (galleryShots && TRIPS.length) {
    var slug = "";
    try { slug = new URLSearchParams(location.search).get("trip") || ""; } catch (e) {}
    var trip = TRIPS.filter(function (t) { return t.slug === slug; })[0] || TRIPS[0];

    document.title = trip.place + " — Heart’s Library";
    var tEl = document.getElementById("galleryTitle");
    if (tEl) tEl.textContent = trip.place;
    var crumbEl = document.getElementById("crumbTrip");
    if (crumbEl) crumbEl.textContent = trip.place;
    var noteEl = document.getElementById("galleryNote");
    if (noteEl) noteEl.textContent = trip.note || "";
    var metaEl = document.getElementById("galleryMeta");
    if (metaEl) metaEl.textContent =
      (trip.photos || []).length + " frames · " + trip.when;

    galleryShots.innerHTML = (trip.photos || []).map(function (p, i) {
      return shotHtml(trip, p, i);
    }).join("");

    /* Trail: every other gallery, in order */
    var trail = document.getElementById("galleryTrail");
    if (trail) {
      trail.innerHTML = TRIPS.filter(function (t) { return t.slug !== trip.slug; })
        .map(function (t) {
          return '<a class="press-scale" href="gallery.html?trip=' + esc(t.slug) + '">' +
            esc(t.place) + ' <span class="arrow" aria-hidden="true">→</span></a>';
        }).join("") +
        '<a class="press-scale" href="index.html#galleries">All galleries <span class="arrow" aria-hidden="true">→</span></a>';
    }
  }

  /* ----------------------------------------------------------
     PHOTOS page — the archive: every trip on one page
     ---------------------------------------------------------- */
  var tripList = document.getElementById("tripList");
  if (tripList && TRIPS.length) {
    tripList.innerHTML = TRIPS.map(function (t) {
      return '<section class="trip" id="' + esc(t.slug) + '">' +
        '<div class="rubric" role="presentation"><span class="rubric-label">' +
          esc(t.place) + ' · ' + esc(t.when) + "</span></div>" +
        (t.note ? '<p class="trip-note">' + esc(t.note) + "</p>" : "") +
        '<div class="photo-grid">' +
        (t.photos || []).map(function (p, i) { return shotHtml(t, p, i); }).join("") +
        "</div></section>";
    }).join("");

    var stats = document.getElementById("photoStats");
    if (stats) stats.textContent = allPhotos().length + " frames · " + TRIPS.length + " trips · newest first";
  }

  /* ----------------------------------------------------------
     PINS page
     ---------------------------------------------------------- */
  var pinList = document.getElementById("pinList");
  if (pinList && PINS.length) {
    pinList.innerHTML = PINS.map(function (p) {
      return '<li class="pin">' +
        '<a class="pin-title" href="' + esc(p.url) + '" target="_blank" rel="noopener">' +
          esc(p.title) + ' <span class="arrow" aria-hidden="true">↗</span></a>' +
        '<span class="pin-meta">' + esc(p.source) + (p.year ? " · " + esc(p.year) : "") + "</span>" +
        (p.note ? '<p class="pin-note">' + esc(p.note) + "</p>" : "") +
        "</li>";
    }).join("");
    var pc = document.getElementById("pinCount");
    if (pc) pc.textContent = PINS.length + " pins · in the order they were saved";
  }

  /* ----------------------------------------------------------
     GAMES page
     ---------------------------------------------------------- */
  var gameList = document.getElementById("gameList");
  if (gameList && GAMES.length) {
    var groups = [
      { key: "playing", label: "Now playing" },
      { key: "finished", label: "Finished" },
      { key: "shelved", label: "Shelved" }
    ];
    gameList.innerHTML = groups.map(function (g) {
      var rows = GAMES.filter(function (x) { return x.status === g.key; });
      if (!rows.length) return "";
      return '<section class="game-group">' +
        '<div class="rubric" role="presentation"><span class="rubric-label">' + g.label +
        (g.key === "playing" ? ' <span class="live-pill"><span class="live-dot" aria-hidden="true"></span>Live</span>' : "") +
        "</span></div>" +
        '<ul class="games">' + rows.map(function (x) {
          return '<li class="game">' +
            '<div class="game-head"><span class="game-title">' + esc(x.title) + "</span>" +
            '<span class="platpill">' + esc(x.platform) + "</span>" +
            '<span class="game-when">' + esc(x.when || "") + "</span></div>" +
            (x.note ? '<p class="game-note">' + esc(x.note) + "</p>" : "") +
            "</li>";
        }).join("") + "</ul></section>";
    }).join("");
  }

  /* ----------------------------------------------------------
     WRITING page
     ---------------------------------------------------------- */
  var writingList = document.getElementById("writingList");
  if (writingList && WRITING.length) {
    writingList.innerHTML = WRITING.map(function (w) {
      return '<article class="piece" id="' + esc(w.slug) + '">' +
        '<span class="kicker">' + esc(w.when) + "</span>" +
        "<h2>" + esc(w.title) + "</h2>" +
        (w.deck ? '<p class="piece-deck">' + esc(w.deck) + "</p>" : "") +
        (w.paragraphs || []).map(function (p) { return '<p class="piece-body">' + p + "</p>"; }).join("") +
        "</article>";
    }).join("");
  }
})();
