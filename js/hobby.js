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
  /* Highlights: the lead frames of every trip, so each one stays
     represented on the homepage. Raise this to show more per trip;
     the full set always lives on the trip's own gallery page. */
  var HIGHLIGHTS_PER_TRIP = 3;
  function highlights(t) { return (t.photos || []).slice(0, HIGHLIGHTS_PER_TRIP); }
  function highlightCount() {
    return TRIPS.reduce(function (n, t) { return n + highlights(t).length; }, 0);
  }
  function cover(t) {
    var ps = t.photos || [];
    if (t.cover) {
      for (var i = 0; i < ps.length; i++) if (ps[i].src === t.cover) return ps[i];
      return { src: t.cover, alt: t.place };
    }
    return ps[0] || null;
  }
  var STAMP_MONTHS = ["Jan.", "Feb.", "March", "April", "May", "June",
                      "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  /* The time a post went up, written the way the reference writes it.
     Stored as local wall time with no offset on purpose — "9:47 p.m."
     on a trip means the hour it was there, not back home. */
  function stampText(s) {
    var m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/);
    if (!m) return s;
    var out = STAMP_MONTHS[Number(m[2]) - 1] + " " + Number(m[3]);
    if (m[4]) {
      var h = Number(m[4]);
      var suffix = h < 12 ? "a.m." : "p.m.";
      h = h % 12 || 12;
      out += ", " + h + ":" + m[5] + " " + suffix;
    }
    return out;
  }
  function clock(s) {
    var n = Math.round(s);
    return Math.floor(n / 60) + ":" + String(n % 60).padStart(2, "0");
  }
  /* The clip stays a still with a play button over it until asked —
     the reference's treatment, and it keeps a heavy file off the wire
     until someone actually wants it. */
  function bindVideos() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".vid-play");
      if (!btn) return;
      var wrap = btn.closest(".vid");
      var v = wrap && wrap.querySelector("video");
      if (!v) return;
      wrap.classList.add("is-playing");
      v.controls = true;
      v.play();
    });
  }
  function shotHtml(t, p, i) {
    var ratio = p.w && p.h ? ' style="aspect-ratio:' + Number(p.w) + "/" + Number(p.h) + '"' : "";
    /* A clip plays where it sits — no lightbox button wrapping it, or
       the click to play would fight the click to enlarge. */
    if (p.video) {
      return '<figure class="shot shot--video">' +
        '<div class="vid">' +
          /* #t=0.1 makes the browser seek a tenth of a second in and
             paint that frame, which stands in for a poster image */
          '<video src="' + esc(p.src) + '#t=0.1" playsinline preload="metadata"' +
          (p.poster ? ' poster="' + esc(p.poster) + '"' : "") + ratio + "></video>" +
          '<button class="vid-play" type="button" aria-label="Play the clip">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 6.5v11a1 1 0 0 0 1.5.87l9-5.5a1 1 0 0 0 0-1.74l-9-5.5A1 1 0 0 0 9 6.5Z"/></svg>' +
          "</button>" +
          (p.seconds ? '<span class="vid-dur">' + clock(p.seconds) + "</span>" : "") +
        "</div>" +
        (p.caption
          ? '<figcaption class="shot-cap">' + esc(p.caption) +
            '<span class="shot-credit">Cody Heart</span></figcaption>'
          : "") +
        "</figure>";
    }
    return '<figure class="shot">' +
      '<button class="shot-btn" type="button" data-trip="' + esc(t.slug) + '" data-i="' + i + '" aria-label="View larger: ' + esc(p.caption || t.place) + '">' +
      '<img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") + '" loading="lazy"' + ratio + ">" +
      (p.caption ? '<span class="shot-pill">' + esc(p.caption) + "</span>" : "") +
      "</button></figure>";
  }

  /* Lightbox: one <dialog>, shared by any page that renders shots. It
     opens on a set rather than a single frame — whatever sat alongside
     the one you tapped — so you can keep going with an arrow, a key or
     a thumb. */
  var lb = { trip: null, list: [], at: 0 };

  function lbShow(dlg, k) {
    if (k < 0 || k >= lb.list.length) return;
    lb.at = k;
    var p = lb.trip.photos[lb.list[k]];
    if (!p) return;
    var img = dlg.querySelector("img");
    img.src = p.src;
    img.alt = p.alt || "";
    dlg.querySelector(".lightbox-cap").textContent =
      (p.caption ? p.caption + " — " : "") + lb.trip.place + ", " + lb.trip.when;
    var dl = dlg.querySelector(".lightbox-dl");
    if (dl) dl.href = p.src;
    var many = lb.list.length > 1;
    dlg.classList.toggle("has-set", many);
    var tally = dlg.querySelector(".lightbox-tally");
    if (tally) tally.textContent = many ? (k + 1) + " / " + lb.list.length : "";
    var prev = dlg.querySelector(".lb-prev"), next = dlg.querySelector(".lb-next");
    if (prev) prev.disabled = k === 0;
    if (next) next.disabled = k === lb.list.length - 1;
  }

  function bindLightbox() {
    var dlg = document.getElementById("lightbox");
    if (!dlg || typeof dlg.showModal !== "function") return;

    /* the arrows and tally live here rather than in every page's markup */
    if (!dlg.querySelector(".lb-prev")) {
      var arrow = function (cls, label, d) {
        return '<button class="lb-arrow ' + cls + '" type="button" aria-label="' + label + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
          'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d +
          '"/></svg></button>';
      };
      dlg.insertAdjacentHTML("beforeend",
        arrow("lb-prev", "Previous frame", "M15 5l-7 7 7 7") +
        arrow("lb-next", "Next frame", "M9 5l7 7-7 7") +
        '<span class="lightbox-tally"></span>');
    }

    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".shot-btn");
      if (!btn) return;
      var trip = TRIPS.filter(function (t) { return t.slug === btn.getAttribute("data-trip"); })[0];
      if (!trip) return;
      var here = Number(btn.getAttribute("data-i"));
      lb.trip = trip;
      /* a card's tiles name their whole post, so the four you can see
         open onto all of it; elsewhere the set is whatever shares the
         strip or the grid */
      var tiles = btn.closest(".tiles");
      var box = btn.closest(".reel-track, .post-media, .stream-grid");
      if (tiles && tiles.getAttribute("data-all")) {
        lb.list = tiles.getAttribute("data-all").split(",").map(Number);
      } else if (box) {
        lb.list = Array.prototype.map.call(box.querySelectorAll(".shot-btn"), function (b) {
          return Number(b.getAttribute("data-i"));
        });
      } else {
        lb.list = [here];
      }
      var start = lb.list.indexOf(here);
      lbShow(dlg, start < 0 ? 0 : start);
      dlg.showModal();
    });

    dlg.addEventListener("click", function (e) {
      if (e.target.closest(".lightbox-dl")) return;
      var arrow = e.target.closest(".lb-arrow");
      if (arrow) {
        e.stopPropagation();
        lbShow(dlg, lb.at + (arrow.classList.contains("lb-next") ? 1 : -1));
        return;
      }
      dlg.close();
    });

    document.addEventListener("keydown", function (e) {
      if (!dlg.open) return;
      if (e.key === "ArrowRight") lbShow(dlg, lb.at + 1);
      if (e.key === "ArrowLeft") lbShow(dlg, lb.at - 1);
    });

    /* a thumb flick, the way you'd move through an album */
    var x0 = null;
    dlg.addEventListener("touchstart", function (e) {
      x0 = e.changedTouches[0].clientX;
    }, { passive: true });
    dlg.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) < 45) return;
      e.stopPropagation();
      lbShow(dlg, lb.at + (dx < 0 ? 1 : -1));
    });
  }
  /* Keep the counter honest as the strip is swiped: whichever frame is
     nearest the middle of the track is the one you're looking at.
     Listens on the way down rather than binding to each strip, because
     scroll doesn't bubble and the feed is built long after this runs. */
  function reelEnds(track) {
    var reel = track.closest(".reel");
    if (!reel) return;
    var prev = reel.querySelector(".reel-prev"), next = reel.querySelector(".reel-next");
    if (prev) prev.disabled = track.scrollLeft <= 2;
    if (next) next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }

  function bindReels() {
    var tick;
    /* a wheel only goes up and down, so a pointer needs something to
       press; touch just swipes and never sees these */
    document.addEventListener("click", function (e) {
      var arrow = e.target.closest && e.target.closest(".reel-arrow");
      if (!arrow) return;
      var track = arrow.closest(".reel-window").querySelector(".reel-track");
      var kids = track.children;
      if (!kids.length) return;

      /* Assigning scrollLeft rather than scrollBy — the easing belongs to
         the track's own scroll-behavior, so a press still lands on the
         right frame even where animation can't run. One frame a press. */
      var box = track.getBoundingClientRect();
      var mid = box.left + box.width / 2;
      var at = 0, gap = Infinity;
      Array.prototype.forEach.call(kids, function (kid, i) {
        var r = kid.getBoundingClientRect();
        var d = Math.abs(r.left + r.width / 2 - mid);
        if (d < gap) { gap = d; at = i; }
      });
      var want = at + (arrow.classList.contains("reel-next") ? 1 : -1);
      want = Math.max(0, Math.min(kids.length - 1, want));
      var target = kids[want].getBoundingClientRect();
      track.scrollLeft += (target.left + target.width / 2) - mid;
    });

    document.addEventListener("scroll", function (e) {
      var track = e.target && e.target.closest && e.target.closest(".reel-track");
      if (!track) return;
      reelEnds(track);
      clearTimeout(tick);
      tick = setTimeout(function () {
        var out = track.closest(".reel").querySelector(".reel-count b");
        if (!out) return;
        /* both sides measured against the viewport — offsetLeft is
           relative to the nearest positioned ancestor, which isn't the
           track, so it can't be compared with scrollLeft */
        var box = track.getBoundingClientRect();
        var mid = box.left + box.width / 2;
        var best = 0, gap = Infinity;
        Array.prototype.forEach.call(track.children, function (kid, i) {
          var r = kid.getBoundingClientRect();
          var c = r.left + r.width / 2;
          if (Math.abs(c - mid) < gap) { gap = Math.abs(c - mid); best = i; }
        });
        /* the first and last frames can never reach the middle, so the
           nearest-to-centre test undercounts at both ends */
        if (track.scrollLeft <= 2) best = 0;
        else if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
          best = track.children.length - 1;
        }
        out.textContent = best + 1;
      }, 60);
    }, true);
  }

  /* a strip narrow enough to hold everything needs no arrows at all */
  function settleReels() {
    Array.prototype.forEach.call(document.querySelectorAll(".reel-track"), function (track) {
      var reel = track.closest(".reel");
      var roomy = track.scrollWidth <= track.clientWidth + 2;
      reel.classList.toggle("is-whole", roomy);
      if (!roomy) reelEnds(track);
    });
  }

  bindLightbox();
  bindVideos();
  bindReels();

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
    if (noteEl) {
      /* hidden when absent, or the empty paragraph still holds its margin */
      noteEl.textContent = trip.note || "";
      noteEl.hidden = !trip.note;
    }
    var metaEl = document.getElementById("galleryMeta");
    if (metaEl) {
      var n = (trip.photos || []).length;
      metaEl.textContent = n + (n === 1 ? " frame · " : " frames · ") + trip.when;
    }

    /* A trip page is photographs and nothing else now. Whatever was
       written about the trip lives on the feed, where it can be read. */
    galleryShots.innerHTML = (trip.photos || []).map(function (p, i) {
      return shotHtml(trip, p, i);
    }).join("");
    settleReels();
    var reflow;
    window.addEventListener("resize", function () {
      clearTimeout(reflow);
      reflow = setTimeout(settleReels, 150);
    });

    /* Trail: every other gallery, in order */
    var trail = document.getElementById("galleryTrail");
    if (trail) {
      trail.innerHTML = TRIPS.filter(function (t) { return t.slug !== trip.slug; })
        .map(function (t) {
          return '<a class="press-scale" href="gallery.html?trip=' + esc(t.slug) + '">' +
            esc(t.place) + ' <span class="arrow" aria-hidden="true">→</span></a>';
        }).join("") +
        '<a class="press-scale" href="index.html#photos">Highlights <span class="arrow" aria-hidden="true">→</span></a>';
    }
  }

  /* ----------------------------------------------------------
     THE STREAM — every frame on one page (homepage + archive):
     a masonry wall per trip, split only by a thin roll line
     that clicks through to that trip's gallery.
     ---------------------------------------------------------- */
  var tripList = document.getElementById("tripList");
  if (tripList && TRIPS.length) {
    tripList.innerHTML = TRIPS.map(function (t) {
      return '<section class="roll" id="' + esc(t.slug) + '">' +
        '<a class="roll-head" href="gallery.html?trip=' + esc(t.slug) + '">' +
          '<span class="roll-place">' + esc(t.short || t.place) + '</span>' +
          '<span class="roll-meta">' + esc(t.when) + " · " + (t.photos || []).length + " frames</span>" +
          '<span class="roll-go" aria-hidden="true">→</span></a>' +
        '<div class="stream-grid">' +
        (t.photos || []).map(function (p, i) { return shotHtml(t, p, i); }).join("") +
        "</div></section>";
    }).join("");

    var statsText = allPhotos().length + " frames · " + TRIPS.length + " trips · newest first";
    Array.prototype.forEach.call(document.querySelectorAll(".photo-stats"), function (el) {
      el.textContent = statsText;
    });
  }
  /* The sidebar stat rows */
  (function () {
    var els = document.querySelectorAll("[data-stat]");
    if (!els.length || !TRIPS.length) return;
    var conts = {};
    TRIPS.forEach(function (t) { if (t.continent) conts[t.continent] = true; });
    var map = {
      frames: String(allPhotos().length),
      trips: String(TRIPS.length),
      continents: Object.keys(conts).length + " of 7"
    };
    Array.prototype.forEach.call(els, function (el) {
      var k = el.getAttribute("data-stat");
      if (map[k] != null) el.textContent = map[k];
    });
  })();

  /* ----------------------------------------------------------
     THE FEED — what I'm up to: every post from every trip on one
     page, newest first, each one a card. The trip pages are
     photographs; this is the place words live.
     ---------------------------------------------------------- */

  /* The tiled gallery, x's arrangement: one frame runs full width, two
     sit side by side, three put a tall one beside a stacked pair, four
     make a square. Past four the fourth tile carries the remainder. */
  function tileHtml(trip, shots) {
    var n = Math.min(shots.length, 4);
    var extra = shots.length - n;
    /* the tiles show at most four; data-all carries the whole post so
       the lightbox pages through every frame, not just the visible ones */
    return '<div class="tiles tiles--' + n + '" data-all="' + shots.join(",") + '">' +
      shots.slice(0, n).map(function (idx, k) {
        var p = trip.photos[idx];
        if (!p) return "";
        var more = (extra && k === n - 1)
          ? '<span class="tile-more">+' + extra + "</span>" : "";
        if (p.video) {
          return '<figure class="tile tile--video">' +
            '<video src="' + esc(p.src) + '#t=0.1" playsinline preload="metadata" muted></video>' +
            '<span class="tile-play" aria-hidden="true">▶</span>' + more + "</figure>";
        }
        return '<figure class="tile">' +
          '<button class="shot-btn tile-btn" type="button" data-trip="' + esc(trip.slug) +
          '" data-i="' + idx + '" aria-label="View larger: ' + esc(p.caption || trip.place) + '">' +
          '<img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") + '" loading="lazy">' +
          more + "</button></figure>";
      }).join("") + "</div>";
  }

  function cardHtml(trip, b) {
    var head = b.head || "", body = b.say || "";
    if (!head && body) {
      var cut = body.match(/^([^.!?]+[.!?])\s+(.+)$/);
      if (cut) { head = cut[1]; body = cut[2]; }
      else { head = body; body = ""; }
    }
    var out = '<article class="card">' +
      '<div class="card-top">' +
        '<a class="card-where" href="gallery.html?trip=' + esc(trip.slug) + '">' +
          esc(trip.short || trip.place) + "</a>" +
        '<span class="card-when">' + esc(b.time ? stampText(b.time) : trip.when) + "</span>" +
      "</div>";
    if (b.at) out += '<p class="card-at">' + esc(b.at) + "</p>";
    if (head) out += '<h2 class="card-head">' + esc(head) + "</h2>";
    if (body) out += '<p class="card-say">' + esc(body) + "</p>";
    if (b.shots && b.shots.length) out += tileHtml(trip, b.shots);
    return out + "</article>";
  }

  var feedList = document.getElementById("feedList");
  if (feedList && TRIPS.length) {
    var cards = [];
    TRIPS.forEach(function (t) {
      (t.beats || []).forEach(function (b, i) {
        /* a post's own stamp when it has one, else the trip's date —
           the index keeps a trip's posts in the order they were written */
        cards.push({ trip: t, beat: b, key: (b.time || t.posted || "") + "~" + i });
      });
    });
    cards.sort(function (a, b) { return a.key < b.key ? 1 : a.key > b.key ? -1 : 0; });
    feedList.innerHTML = cards.length
      ? cards.map(function (c) { return cardHtml(c.trip, c.beat); }).join("")
      : '<p class="noscript-note">Nothing posted yet.</p>';

    var feedStat = document.getElementById("feedStat");
    if (feedStat) {
      feedStat.textContent = cards.length + (cards.length === 1 ? " post" : " posts") +
        " · " + TRIPS.length + " events";
    }
  }

  /* ----------------------------------------------------------
     HIGHLIGHTS — the homepage: the lead frames of every trip in
     one endless masonry, newest first, no separators. The trip a
     frame belongs to shows up in its caption and its lightbox.
     ---------------------------------------------------------- */
  var photoStream = document.getElementById("photoStream");
  if (photoStream && TRIPS.length) {
    var reel = [];
    TRIPS.forEach(function (t) {
      /* i is the index into t.photos, which is what the lightbox
         resolves — highlights are the leading slice, so it lines up */
      highlights(t).forEach(function (p, i) { reel.push(shotHtml(t, p, i)); });
    });
    photoStream.innerHTML = '<div class="stream-grid">' + reel.join("") + "</div>";

    var homeStats = highlightCount() + " highlights · " + TRIPS.length + " trips · newest first";
    Array.prototype.forEach.call(document.querySelectorAll(".photo-stats"), function (el) {
      el.textContent = homeStats;
    });
  }

  /* ----------------------------------------------------------
     THE LEDGER — the notion-style sidebar index: Highlights on
     top, then every trip (date · count · name), each row a page
     of its own. The current page's row is marked. Mirrored into
     the burger menu on small screens.
     ---------------------------------------------------------- */
  var sideTrips = document.getElementById("sideTrips");
  var menuTrips = document.getElementById("menuTrips");
  if ((sideTrips || menuTrips) && TRIPS.length) {
    var activeSlug = "all";
    if (/gallery\.html$/i.test(location.pathname)) {
      try { activeSlug = new URLSearchParams(location.search).get("trip") || TRIPS[0].slug; } catch (e) { activeSlug = TRIPS[0].slug; }
    }
    var onFeed = /feed\.html$/i.test(location.pathname);
    if (sideTrips) {
      sideTrips.innerHTML =
        '<a class="side-trip' + (onFeed ? " is-active" : "") + '" href="feed.html">' +
          '<span class="side-name">What I’m up to</span>' +
          '<span class="side-trip-meta">' +
            TRIPS.reduce(function (n, t) { return n + (t.beats || []).length; }, 0) +
          " posts</span></a>" +
        '<a class="side-trip is-all' + (activeSlug === "all" && !onFeed ? " is-active" : "") + '" href="index.html">' +
          '<span class="side-name">Highlights</span>' +
          '<span class="side-trip-meta">' + highlightCount() + " frames</span></a>" +
        TRIPS.map(function (t) {
          return '<a class="side-trip' + (t.slug === activeSlug ? " is-active" : "") + '" href="gallery.html?trip=' + esc(t.slug) + '">' +
            '<span class="side-name">' + esc(t.short || t.place) + "</span>" +
            '<span class="side-trip-meta">' + esc(t.when) + "</span></a>";
        }).join("");
    }
    if (menuTrips) {
      menuTrips.innerHTML = TRIPS.map(function (t) {
        return '<a class="mobile-menu__trip" href="gallery.html?trip=' + esc(t.slug) + '">' +
          '<span>' + esc(t.short || t.place) + '</span>' +
          '<span class="mobile-menu__trip-meta">' + esc(t.when) + " · " + (t.photos || []).length + "</span></a>";
      }).join("");
    }
    /* The Trips dropdown in the top nav */
    var navTrips = document.getElementById("navTrips");
    if (navTrips) {
      navTrips.innerHTML =
        '<a class="menu-item" role="menuitem" href="index.html"><div>' +
          '<span class="menu-item__title">Highlights</span>' +
          '<span class="menu-item__desc">' + highlightCount() + " frames</span></div></a>" +
        TRIPS.map(function (t) {
          return '<a class="menu-item" role="menuitem" href="gallery.html?trip=' + esc(t.slug) + '"><div>' +
            '<span class="menu-item__title">' + esc(t.short || t.place) + "</span>" +
            '<span class="menu-item__desc">' + esc(t.when) + " · " + (t.photos || []).length + " frames</span></div></a>";
        }).join("");
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
