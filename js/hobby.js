/* ============================================================
   HEART'S LIBRARY — hobby renderers.
   One small file drives the hub and the four collection pages,
   reading the plain data files (photos.js, pins.js, games.js,
   writing.js, log.js). Each block no-ops unless its container
   exists, so every page can load the same script. You never
   need to edit this file to post — edit the data files.
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

  /* ----------------------------------------------------------
     HUB — latest frames strip
     ---------------------------------------------------------- */
  var strip = document.getElementById("framesStrip");
  if (strip && TRIPS.length) {
    strip.innerHTML = allPhotos().slice(0, 6).map(function (x) {
      return '<a class="frame" href="photos.html#' + esc(x.trip.slug) + '">' +
        '<img src="' + esc(x.photo.src) + '" alt="' + esc(x.photo.alt || "") + '" loading="lazy"' +
        (x.photo.w && x.photo.h ? ' style="aspect-ratio:' + Number(x.photo.w) + '/' + Number(x.photo.h) + '"' : "") + ">" +
        '<span class="frame-cap">' + esc(x.photo.caption || x.trip.place) + "</span></a>";
    }).join("");
  }

  /* ----------------------------------------------------------
     HUB — drawer papers + sub-lines
     ---------------------------------------------------------- */
  function fillPapers(id, items) {
    var el = document.getElementById(id);
    if (el && items.length) {
      el.innerHTML = items.slice(0, 3).map(function (t) {
        return '<span class="folder-paper">' + esc(t) + "</span>";
      }).join("");
    }
  }
  function setSub(id, text) {
    var el = document.getElementById(id);
    if (el && text) el.textContent = text;
  }

  if (document.getElementById("folderPhotosPapers")) {
    fillPapers("folderPhotosPapers", TRIPS.map(function (t) { return t.place; }));
    var frameCount = allPhotos().length;
    setSub("folderPhotosSub", frameCount + " frames from " + TRIPS.length + " trips");

    if (window.LOG && window.LOG.length) {
      var five = window.LOG.filter(function (b) { return b.rating === 5; });
      fillPapers("folderBooksPapers", five.map(function (b) { return b.title; }));
      setSub("folderBooksSub", window.LOG.length + " read · " + five.length + " five-stars");
    }
    fillPapers("folderPinsPapers", PINS.map(function (p) { return p.title; }));
    setSub("folderPinsSub", PINS.length + " pinned so far");
    fillPapers("folderWritingPapers", WRITING.map(function (w) { return w.title; }));
    setSub("folderWritingSub", WRITING.length === 1 ? "One piece, more coming" : WRITING.length + " pieces");
    var playing = GAMES.filter(function (g) { return g.status === "playing"; });
    fillPapers("folderGamesPapers", (playing.length ? playing : GAMES).map(function (g) { return g.title; }));
    setSub("folderGamesSub", playing.length ? "Now playing: " + playing.length : GAMES.length + " on the shelf");
  }

  /* ----------------------------------------------------------
     PHOTOS page — trips, grids, lightbox
     ---------------------------------------------------------- */
  var tripList = document.getElementById("tripList");
  if (tripList && TRIPS.length) {
    tripList.innerHTML = TRIPS.map(function (t) {
      return '<section class="trip" id="' + esc(t.slug) + '">' +
        '<div class="rubric" role="presentation"><span class="rubric-label">' +
          esc(t.place) + ' · ' + esc(t.when) + "</span></div>" +
        (t.note ? '<p class="trip-note">' + esc(t.note) + "</p>" : "") +
        '<div class="photo-grid">' +
        (t.photos || []).map(function (p, i) {
          return '<figure class="shot">' +
            '<button class="shot-btn" type="button" data-trip="' + esc(t.slug) + '" data-i="' + i + '" aria-label="View larger: ' + esc(p.caption || t.place) + '">' +
            '<img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") + '" loading="lazy"' +
            (p.w && p.h ? ' style="aspect-ratio:' + Number(p.w) + '/' + Number(p.h) + '"' : "") + ">" +
            "</button>" +
            (p.caption ? '<figcaption class="shot-cap">' + esc(p.caption) + "</figcaption>" : "") +
            "</figure>";
        }).join("") +
        "</div></section>";
    }).join("");

    var stats = document.getElementById("photoStats");
    if (stats) stats.textContent = allPhotos().length + " frames · " + TRIPS.length + " trips · newest first";

    /* Lightbox: one <dialog>, filled on open. */
    var dlg = document.getElementById("lightbox");
    if (dlg && typeof dlg.showModal === "function") {
      tripList.addEventListener("click", function (e) {
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
      dlg.addEventListener("click", function (e) {
        /* click anywhere (backdrop or frame) closes; the image itself too */
        dlg.close();
      });
    }
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
