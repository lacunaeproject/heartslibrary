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
    var ps = t.photos || [];
    if (t.cover) {
      for (var i = 0; i < ps.length; i++) if (ps[i].src === t.cover) return ps[i];
      return { src: t.cover, alt: t.place };
    }
    return ps[0] || null;
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
      var dl = dlg.querySelector(".lightbox-dl");
      if (dl) dl.href = p.src;
      dlg.showModal();
    });
    dlg.addEventListener("click", function (e) {
      if (e.target.closest(".lightbox-dl")) return;
      dlg.close();
    });
  }
  bindLightbox();

  /* ----------------------------------------------------------
     HOMEPAGE — the gallery wall: big rounded-rectangle covers,
     two across, title on hover, clicking through to the
     gallery. Static tiles in index.html are only a no-JS
     fallback.
     ---------------------------------------------------------- */
  var grid = document.getElementById("galleryGrid");
  if (grid && TRIPS.length) {
    grid.innerHTML = TRIPS.map(function (t, i) {
      var c = cover(t);
      if (!c) return "";
      return '<a class="gcard" href="gallery.html?trip=' + esc(t.slug) + '">' +
        '<img src="' + esc(c.src) + '" alt="' + esc(t.place) + '"' + (i < 3 ? "" : ' loading="lazy"') + ">" +
        '<span class="gcard-label">' + esc(t.place) +
          '<span class="gcard-meta">' + esc(t.when) + " · " + (t.photos || []).length + " frames</span></span>" +
        '<span class="gcard-go" aria-hidden="true">→</span></a>';
    }).join("");
  }

  /* ----------------------------------------------------------
     WHERE I'VE BEEN — the filterable cloud: trips, shows, and
     what's next, set in the display serif. Views: this year /
     past trips / up next / seven continents. Deep-linkable via
     ?view=year|past|next|seven.
     ---------------------------------------------------------- */
  var cloud = document.getElementById("placesCloud");
  var filters = document.getElementById("placesFilters");
  if (cloud && TRIPS.length) {
    var MOMENTS = window.MOMENTS || [];
    var CONTINENTS = ["North America", "South America", "Europe", "Africa", "Asia", "Oceania", "Antarctica"];
    var byCont = {};
    TRIPS.forEach(function (t) {
      if (!t.continent) return;
      (byCont[t.continent] = byCont[t.continent] || []).push(t);
    });
    var seen = CONTINENTS.filter(function (c) { return byCont[c]; }).length;
    var countEl = document.getElementById("continentCount");
    if (countEl) countEl.textContent = seen + " of 7";

    function tripItem(t) {
      return { name: t.short || t.place, date: t.posted || "",
               href: "gallery.html?trip=" + t.slug, thumb: (cover(t) || {}).src };
    }
    function momentItem(m) {
      return { name: m.name, date: m.date || "",
               badge: m.type === "trip" ? "→" : "♪",
               tag: m.planned ? "up next" : (m.type === "event" ? "show" : "") };
    }
    function byDate(a, b) { return (a.date || "").localeCompare(b.date || ""); }
    function view(name) {
      if (name === "past") return TRIPS.map(tripItem);
      if (name === "next")
        return MOMENTS.filter(function (m) { return m.planned; }).map(momentItem).sort(byDate);
      if (name === "seven")
        return CONTINENTS.map(function (c) {
          var trips = byCont[c] || [];
          if (!trips.length) return { name: c, tag: "not yet", dim: true };
          return { name: c, thumb: (cover(trips[0]) || {}).src,
                   href: "gallery.html?trip=" + trips[0].slug,
                   tag: trips.length + (trips.length === 1 ? " trip" : " trips") };
        });
      /* default "year": places and shows, in calendar order */
      var yr = String(new Date().getFullYear());
      return TRIPS.filter(function (t) { return (t.posted || "").slice(0, 4) === yr; }).map(tripItem)
        .concat(MOMENTS.filter(function (m) { return (m.date || "").slice(0, 4) === yr; }).map(momentItem))
        .sort(byDate);
    }
    function itemHtml(it) {
      var inner =
        (it.thumb ? '<img class="place-thumb" src="' + esc(it.thumb) + '" alt="" loading="lazy">'
          : (it.badge ? '<span class="place-badge" aria-hidden="true">' + esc(it.badge) + "</span>" : "")) +
        '<span class="place-name">' + esc(it.name) + "</span>" +
        (it.tag ? '<span class="place-tag">' + esc(it.tag) + "</span>" : "");
      var cls = "place place-in" + (it.dim ? " place--soon" : "");
      if (it.href) return '<a class="' + cls + ' press-scale" href="' + esc(it.href) + '">' + inner + "</a>";
      return '<span class="' + cls + '">' + inner + "</span>";
    }
    function render(name) {
      cloud.innerHTML = view(name).map(itemHtml).join("");
      Array.prototype.forEach.call(cloud.children, function (el, i) {
        el.style.animationDelay = (i * 45) + "ms";
      });
      if (filters) {
        Array.prototype.forEach.call(filters.querySelectorAll("[data-view]"), function (b) {
          var on = b.getAttribute("data-view") === name;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
      }
    }
    var initial = "";
    try { initial = new URLSearchParams(location.search).get("view") || ""; } catch (e) {}
    if (["year", "past", "next", "seven"].indexOf(initial) < 0) initial = "year";
    render(initial);
    if (filters) {
      filters.addEventListener("click", function (e) {
        var b = e.target.closest("[data-view]");
        if (b) render(b.getAttribute("data-view"));
      });
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

    document.title = trip.place + " — Cody Heart Photography";
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
