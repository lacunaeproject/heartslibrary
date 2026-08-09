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
               tag: m.planned ? "up next" : (m.type === "event" ? "show" : ""),
               tagNext: !!m.planned };
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
        (it.thumb ? '<img class="place-thumb" src="' + esc(it.thumb) + '" alt="" draggable="false" loading="lazy">'
          : (it.badge ? '<span class="place-badge" aria-hidden="true">' + esc(it.badge) + "</span>" : "")) +
        '<span class="place-name">' + esc(it.name) + "</span>" +
        (it.tag ? '<span class="place-tag' + (it.tagNext ? " place-tag--next" : "") + '">' + esc(it.tag) + "</span>" : "");
      var cls = "place place-in" + (it.dim ? " place--soon" : "");
      if (it.href) return '<a class="' + cls + ' press-scale" href="' + esc(it.href) + '">' + inner + "</a>";
      return '<span class="' + cls + '">' + inner + "</span>";
    }

    /* --------- the physics: names as objects. They drop in when
       the section scrolls into view, tumble into a pile on the
       shelf line, and can be grabbed and thrown. Hand-rolled —
       gravity, wall/floor bounces, pairwise separation — because
       thirteen rectangles don't need a library. --------- */
    var reduced = false;
    try { reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    var bodies = [], rafId = 0, lastTs = 0, dropped = false, drag = null;

    function paint(b) {
      b.el.style.transform = "translate(" + b.x + "px," + b.y + "px) rotate(" + b.rot + "deg)";
    }
    function stopSim() { if (rafId) cancelAnimationFrame(rafId); rafId = 0; lastTs = 0; }
    function startSim() { if (!rafId && bodies.length) rafId = requestAnimationFrame(frame); }

    function frame(ts) {
      var dt = lastTs ? Math.min(32, ts - lastTs) / 1000 : 1 / 60;
      lastTs = ts;
      var W = cloud.clientWidth, H = cloud.clientHeight, G = 2600;
      bodies.forEach(function (b) {
        if (b.grab) return;
        b.vy += G * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.y + b.h > H) {
          b.y = H - b.h;
          if (b.vy > 0) b.vy = Math.abs(b.vy) > 140 ? -b.vy * .3 : 0;
          b.vx *= .95;
        }
        if (b.x < 0) { b.x = 0; b.vx = -b.vx * .5; }
        if (b.x + b.w > W) { b.x = W - b.w; b.vx = -b.vx * .5; }
      });
      for (var pass = 0; pass < 2; pass++) {
        for (var i = 0; i < bodies.length; i++) {
          for (var j = i + 1; j < bodies.length; j++) {
            var a = bodies[i], c = bodies[j];
            var ox = Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x);
            var oy = Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y);
            if (ox <= 0 || oy <= 0) continue;
            if (ox < oy) {
              var dx = (a.x + a.w / 2) < (c.x + c.w / 2) ? -1 : 1;
              if (!a.grab) a.x += dx * ox / 2;
              if (!c.grab) c.x -= dx * ox / 2;
              if (!a.grab && !c.grab) { var t = a.vx; a.vx = c.vx * .85; c.vx = t * .85; }
            } else {
              var up = (a.y + a.h / 2) < (c.y + c.h / 2) ? a : c;
              var dn = up === a ? c : a;
              if (!up.grab) up.y -= oy / (dn.grab ? 1 : 2);
              if (!dn.grab) dn.y += oy / (up.grab ? 1 : 2);
              if (!up.grab && up.vy > 0) up.vy = up.vy > 140 ? -up.vy * .25 : 0;
              if (!dn.grab && dn.vy < 0) dn.vy = 0;
            }
          }
        }
      }
      bodies.forEach(paint);
      rafId = requestAnimationFrame(frame);
    }

    function dropIn() {
      var els = Array.prototype.slice.call(cloud.children);
      if (!els.length) return;
      cloud.classList.add("is-physical");
      var W = cloud.clientWidth;
      bodies = els.map(function (el, i) {
        var w = el.offsetWidth, h = el.offsetHeight;
        return { el: el, w: w, h: h,
                 x: Math.random() * Math.max(1, W - w),
                 y: -h - 90 * i - Math.random() * 200,
                 vx: (Math.random() - .5) * 160, vy: 0,
                 rot: (Math.random() - .5) * 8, grab: null };
      });
      bodies.forEach(paint);
      stopSim();
      startSim();
    }
    function dropWhenReady() {
      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(function () { dropIn(); });
      } else { dropIn(); }
    }

    function localPoint(e) {
      var r = cloud.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    cloud.addEventListener("pointerdown", function (e) {
      if (!cloud.classList.contains("is-physical")) return;
      var el = e.target.closest(".place");
      if (!el) return;
      var b = null;
      bodies.forEach(function (x) { if (x.el === el) b = x; });
      if (!b) return;
      e.preventDefault();
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
      var p = localPoint(e);
      drag = { b: b, id: e.pointerId, dx: p.x - b.x, dy: p.y - b.y,
               lx: e.clientX, ly: e.clientY, lt: performance.now(),
               vx: 0, vy: 0, moved: 0 };
      b.grab = drag;
      el.classList.add("is-grabbed");
      startSim();
    });
    cloud.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var p = localPoint(e);
      var now = performance.now(), ms = Math.max(8, now - drag.lt);
      drag.vx = drag.vx * .55 + ((e.clientX - drag.lx) / ms * 1000) * .45;
      drag.vy = drag.vy * .55 + ((e.clientY - drag.ly) / ms * 1000) * .45;
      drag.moved += Math.abs(e.clientX - drag.lx) + Math.abs(e.clientY - drag.ly);
      drag.lx = e.clientX; drag.ly = e.clientY; drag.lt = now;
      drag.b.x = p.x - drag.dx;
      drag.b.y = p.y - drag.dy;
      paint(drag.b);
    });
    function endDrag(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var b = drag.b;
      b.vx = Math.max(-1500, Math.min(1500, drag.vx));
      b.vy = Math.max(-1500, Math.min(1500, drag.vy));
      b.grab = null;
      b.el.classList.remove("is-grabbed");
      if (drag.moved > 6) b.el.setAttribute("data-dragged", "1");
      drag = null;
    }
    cloud.addEventListener("pointerup", endDrag);
    cloud.addEventListener("pointercancel", endDrag);
    cloud.addEventListener("click", function (e) {
      var el = e.target.closest(".place");
      if (el && el.hasAttribute("data-dragged")) {
        el.removeAttribute("data-dragged");
        e.preventDefault();
      }
    }, true);

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
      if (dropped && !reduced) dropWhenReady();
    }
    /* Little live counts inside the filter pills */
    if (filters) {
      Array.prototype.forEach.call(filters.querySelectorAll("[data-view]"), function (b) {
        var c = b.querySelector(".pill-count");
        if (!c) return;
        var v = b.getAttribute("data-view");
        c.textContent = v === "seven" ? seen + "/7" : String(view(v).length);
      });
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
    if (!reduced && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            if (!dropped) { dropped = true; dropWhenReady(); }
            else startSim();
          } else stopSim();
        });
      }, { threshold: .1 });
      io.observe(cloud);
    } else if (!reduced) {
      dropped = true;
      dropWhenReady();
    }
    var resizeTimer = 0;
    window.addEventListener("resize", function () {
      if (!dropped || reduced) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(dropWhenReady, 300);
    });
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
