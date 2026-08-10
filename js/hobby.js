/* ============================================================
   HEART'S LIBRARY — page renderers.
   One small file drives the photography pages (the wall at
   index.html, gallery.html) and the
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
  /* Most experiences are logged before their photographs exist — the
     list goes back to 2019 and the camera does not. Those empty slots
     belong on experiences.html, which is the ledger and says "0
     frames" plainly; they do not belong in the nav or the burger,
     where every row wears a cover frame and an empty one would just
     be a blank tile. */
  var withFrames = TRIPS.filter(function (t) { return (t.photos || []).length; });
  var POSTS = window.POSTS || [];
  var PINS = window.PINS || [];
  var GAMES = window.GAMES || [];
  var WRITING = window.WRITING || [];

  /* A standalone blog post travels as a tiny synthetic trip so its
     tiles and the lightbox treat the frames like any other set. */
  var postTrips = {};
  function tripBySlug(slug) {
    if (postTrips[slug]) return postTrips[slug];
    return TRIPS.filter(function (t) { return t.slug === slug; })[0];
  }
  /* A post can carry its own frames — what came off the phone while
     it was happening — instead of pointing into the experience's
     edited set. They travel as a synthetic trip so the tiles and
     the lightbox treat them like any other set. */
  function beatSet(trip, b, key) {
    if (!b.photos || !b.photos.length) return { trip: trip, shots: b.shots || [] };
    var slug = "live-" + (trip.slug || "post") + "-" + key;
    var t = postTrips[slug] || (postTrips[slug] = {
      slug: slug, gallery: false, place: trip.place || "", nav: trip.nav || "", short: trip.short || "",
      when: trip.when || "", photos: b.photos
    });
    return { trip: t, shots: b.photos.map(function (_, i) { return i; }) };
  }
  function postCard(p, i) {
    var slug = "post-" + i;
    var t = postTrips[slug] || (postTrips[slug] = {
      slug: slug, gallery: false, place: "", short: "",
      when: "", photos: p.photos || []
    });
    return {
      trip: t,
      beat: { at: p.at, head: p.head, say: p.say, time: p.time,
              shots: (p.photos || []).map(function (_, k) { return k; }) },
      key: (p.time || "") + "~p" + i
    };
  }
  function postCount() {
    return TRIPS.reduce(function (n, t) { return n + (t.beats || []).length; }, 0) + POSTS.length;
  }

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
  /* What an experience is called, everywhere it's named: the full
     billing when it has one ("Tame Impala: Deadbeat Tour with
     Djo"), else the short name, else the title. */
  function xpName(t) {
    return t.nav || t.short || t.place || "";
  }
  /* An experience's face: its stated cover, else the first frame
     that isn't a clip (a video has no still to show) */
  function thumbSrc(t) {
    if (t.cover) return t.cover;
    var ps = t.photos || [];
    for (var i = 0; i < ps.length; i++) if (!ps[i].video) return ps[i].src;
    return "";
  }
  /* "August 5, 2026 @ Bridgestone Arena" — the same line in the
     nav menu and on the experiences index; a count stands in when
     an experience never said where it was */
  function xpByline(t) {
    var n = (t.photos || []).length;
    /* A `when` of just a year means the posted date is a sort key
       holding the given order, not a day this happened on. Print the
       year it claims rather than the date it was filed under, or the
       page invents a Tuesday in November that nobody went anywhere on. */
    var yearOnly = /^\d{4}$/.test(String(t.when || "").trim());
    var stamp = (!yearOnly && longDate(t.posted)) || esc(t.when);
    return stamp +
      (t.loc ? " @ " + esc(t.loc) : " · " + n + (n === 1 ? " frame" : " frames"));
  }
  var STAMP_MONTHS = ["Jan.", "Feb.", "March", "April", "May", "June",
                      "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  var LONG_MONTHS = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"];
  /* "August 5, 2026" from a posted date, for bylines */
  function longDate(s) {
    var m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return "";
    return LONG_MONTHS[Number(m[2]) - 1] + " " + Number(m[3]) + ", " + m[1];
  }
  /* The date a post went up. The hour still lives in the data —
     it keeps the sort honest — but the card shows only the day. */
  function stampText(s) {
    var m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/);
    if (!m) return s;
    return STAMP_MONTHS[Number(m[2]) - 1] + " " + Number(m[3]);
  }
  function clock(s) {
    var n = Math.round(s);
    return Math.floor(n / 60) + ":" + String(n % 60).padStart(2, "0");
  }
  /* Clips play themselves only in the journal, where the page is a
     feed and movement is the point. On an experience they hold still
     under a play badge until you open them. */
  var LIVE_VIDEO = /feed\.html$/i.test(location.pathname);
  /* Clips that do run are muted and looping; a press on the speaker
     is what gives them sound. */
  function playSafely(v) {
    var p = v.play();
    /* a browser that refuses autoplay rejects rather than throwing */
    if (p && p.catch) p.catch(function () {});
  }
  function bindVideos() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest(".vid-mute");
      if (!btn) return;
      e.stopPropagation();
      var wrap = btn.closest(".vid");
      var v = wrap && wrap.querySelector("video");
      if (!v) return;
      v.muted = !v.muted;
      if (!v.muted) playSafely(v);
      wrap.classList.toggle("is-muted", v.muted);
      btn.setAttribute("aria-label", v.muted ? "Unmute the clip" : "Mute the clip");
    });
  }
  /* Only the clips actually on screen run — a page of them would
     otherwise all decode at once. */
  var vidWatcher = null;
  function settleVideos() {
    if (!window.IntersectionObserver) return;
    if (!vidWatcher) {
      vidWatcher = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var v = en.target.querySelector("video");
          if (!v) return;
          if (en.isIntersecting) playSafely(v);
          else v.pause();
        });
      }, { threshold: 0.2 });
    }
    if (!LIVE_VIDEO) return;
    Array.prototype.forEach.call(document.querySelectorAll(".vid"), function (el) {
      if (el.dataset.watched) return;
      el.dataset.watched = "1";
      vidWatcher.observe(el);
    });
  }
  function shotHtml(t, p, i) {
    var ratio = p.w && p.h ? ' style="aspect-ratio:' + Number(p.w) + "/" + Number(p.h) + '"' : "";
    /* A landscape frame lies across two portrait cells on the wall */
    var wide = Number(p.w) > Number(p.h) ? " shot--wide" : "";
    /* A clip's own surface opens the viewer; only the speaker
       button swallows the press. */
    if (p.video) {
      /* In the journal a clip runs itself, silently and looping, and
         the speaker is the only control it needs. Everywhere else it
         holds a frame under a play badge — #t=0.1 is what paints that
         frame instead of a black box — and opens to play. */
      var live = LIVE_VIDEO;
      var speaker = '<button class="vid-mute" type="button" aria-label="Unmute the clip">' +
        '<svg class="icon-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M17 9.5 22 15M22 9.5 17 15"/></svg>' +
        '<svg class="icon-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M16 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11"/></svg>' +
        "</button>";
      var badge = '<span class="vid-badge" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 6.5v11a1 1 0 0 0 1.5.87l9-5.5a1 1 0 0 0 0-1.74l-9-5.5A1 1 0 0 0 9 6.5Z"/></svg></span>';
      return '<figure class="shot shot--video' + wide + '">' +
        '<div class="vid is-muted' + (live ? "" : " is-still") + '">' +
          '<video src="' + esc(p.src) + (live ? "" : "#t=0.1") +
          '" playsinline preload="metadata" muted loop' +
          (p.poster ? ' poster="' + esc(p.poster) + '"' : "") + ratio + "></video>" +
          (live ? "" : badge) +
          '<button class="vid-open" type="button" aria-label="View larger: ' +
            esc(p.caption || t.place) + '" data-trip="' + esc(t.slug) + '" data-i="' + i + '"></button>' +
          (live ? speaker : "") +
          (p.seconds ? '<span class="vid-dur">' + clock(p.seconds) + "</span>" : "") +
        "</div>" +
        (p.caption
          ? '<figcaption class="shot-cap">' + esc(p.caption) +
            '<span class="shot-credit">Cody Heart</span></figcaption>'
          : "") +
        "</figure>";
    }
    return '<figure class="shot' + wide + '">' +
      '<button class="shot-btn" type="button" data-trip="' + esc(t.slug) + '" data-i="' + i + '" aria-label="View larger: ' + esc(p.caption || t.place) + '">' +
      '<img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") + '" loading="lazy"' + ratio + ">" +
      (p.caption ? '<span class="shot-pill">' + esc(p.caption) + "</span>" : "") +
      "</button></figure>";
  }

  /* Lightbox: one <dialog>, shared by any page that renders shots. It
     opens on a set rather than a single frame — whatever sat alongside
     the one you tapped — so you can keep going with an arrow, a key or
     a thumb. Entries carry their own trip, so the best-of wall can
     page straight across events. */
  var lb = { list: [], at: 0 };

  function lbShow(dlg, k) {
    if (k < 0 || k >= lb.list.length) return;
    lb.at = k;
    lb.trip = lb.list[k].t;
    var p = lb.trip.photos[lb.list[k].i];
    if (!p) return;
    var img = dlg.querySelector("img");
    var vid = dlg.querySelector(".lb-video");
    /* a clip opens full screen and plays itself, like the stills do */
    if (p.video) {
      img.hidden = true;
      img.removeAttribute("src");
      if (vid) {
        vid.hidden = false;
        if (vid.getAttribute("src") !== p.src) vid.src = p.src;
        vid.muted = true;
        playSafely(vid);
      }
    } else {
      if (vid) { vid.pause(); vid.hidden = true; vid.removeAttribute("src"); }
      img.hidden = false;
      img.src = p.src;
    }
    img.alt = p.alt || "";
    /* a standalone post has no place or date to add */
    var where = [xpName(lb.trip), lb.trip.when].filter(Boolean).join(", ");
    dlg.querySelector(".lightbox-cap").textContent =
      (p.caption ? p.caption + (where ? " — " : "") : "") + where;
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

    /* the close, arrows and tally live here rather than in every
       page's markup */
    if (!dlg.querySelector(".lb-prev")) {
      var round = function (cls, label, d) {
        return '<button class="lb-round ' + cls + '" type="button" aria-label="' + label + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
          'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d +
          '"/></svg></button>';
      };
      var fig = dlg.querySelector("figure");
      if (fig && !fig.querySelector(".lb-video")) {
        fig.insertAdjacentHTML("afterbegin",
          '<video class="lb-video" playsinline loop controls hidden></video>');
      }
      dlg.insertAdjacentHTML("beforeend",
        round("lb-close", "Close", "M6 6l12 12M18 6L6 18") +
        round("lb-arrow lb-prev", "Previous frame", "M15 5l-7 7 7 7") +
        round("lb-arrow lb-next", "Next frame", "M9 5l7 7-7 7") +
        '<span class="lightbox-tally"></span>');
    }

    document.addEventListener("click", function (e) {
      if (e.target.closest(".vid-mute")) return;
      var btn = e.target.closest(".shot-btn, .vid-open");
      if (!btn) return;
      var trip = tripBySlug(btn.getAttribute("data-trip"));
      if (!trip) return;
      var here = Number(btn.getAttribute("data-i"));
      /* a card's tiles name their whole post, so the four you can see
         open onto all of it; elsewhere the set is whatever shares the
         strip or the grid */
      var tiles = btn.closest(".tiles");
      var box = btn.closest(".reel-track, .stream-grid, .msg-one");
      if (tiles && tiles.getAttribute("data-all")) {
        lb.list = tiles.getAttribute("data-all").split(",").map(function (n) {
          return { t: trip, i: Number(n) };
        });
      } else if (box) {
        lb.list = Array.prototype.map.call(box.querySelectorAll("[data-trip][data-i]"), function (b) {
          return { t: tripBySlug(b.getAttribute("data-trip")), i: Number(b.getAttribute("data-i")) };
        }).filter(function (en) { return en.t; });
      } else {
        lb.list = [{ t: trip, i: here }];
      }
      var start = -1;
      lb.list.some(function (en, k) {
        if (en.t === trip && en.i === here) { start = k; return true; }
        return false;
      });
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
    dlg.addEventListener("close", function () {
      var v = dlg.querySelector(".lb-video");
      if (v) v.pause();
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
  /* strips are built by several blocks below; settle them all once
     the page has finished rendering, and again when it reflows */
  function settleLater() {
    if (typeof settleReels === "function") settleReels();
    settleVideos();
  }
  window.addEventListener("load", settleLater);
  var settleTick;
  window.addEventListener("resize", function () {
    clearTimeout(settleTick);
    settleTick = setTimeout(settleLater, 150);
  });

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

    document.title = xpName(trip) + " — Cody Heart Photography";
    var tEl = document.getElementById("galleryTitle");
    if (tEl) tEl.textContent = xpName(trip);
    /* the bar's scroll-title carries the experience's full billing */
    var navTitle = document.querySelector(".nav__scrolltitle");
    if (navTitle) navTitle.textContent = xpName(trip);
    var crumbEl = document.getElementById("crumbTrip");
    if (crumbEl) crumbEl.textContent = xpName(trip);
    var noteEl = document.getElementById("galleryNote");
    if (noteEl) {
      /* hidden when absent, or the empty paragraph still holds its margin */
      noteEl.textContent = trip.note || "";
      noteEl.hidden = !trip.note;
    }
    /* An experience has two halves. HIGHLIGHTS are the frames
       flagged `best` — the ones edited and chosen after the fact.
       AS IT HAPPENED is the journal from inside the moment: what
       was written and whatever came off the phone at the time.
       A new experience starts as the second half alone and grows
       the first when there's time at a computer. */
    var beats = trip.beats || [];
    /* Every clip the experience holds shows in Video, whether or not
       a post also shows it — the post is the moment it went up, the
       section is where you go to watch. Stills don't double up: the
       wall takes the edited ones, the posts keep the rest. */
    /* Highlights is the edited gallery: every still not already in a
       post. Which of those also reach the home page is `best`. */
    var inAPost = {};
    beats.forEach(function (b) {
      if (!b.photos) (b.shots || []).forEach(function (i) { inAPost[i] = true; });
    });
    var picks = [], clips = [];
    (trip.photos || []).forEach(function (p, i) {
      if (p.video) clips.push({ p: p, i: i });
      else if (!inAPost[i]) picks.push({ p: p, i: i });
    });
    /* nothing edited yet and nothing written either — show the roll
       rather than an empty page */
    if (!picks.length && !clips.length && !beats.length) {
      (trip.photos || []).forEach(function (p, i) { picks.push({ p: p, i: i }); });
    }

    /* the small line carries when and where alongside the counts */
    var metaEl = document.getElementById("galleryMeta");
    if (metaEl) {
      var n = (trip.photos || []).length;
      var bits = [xpByline(trip), n + (n === 1 ? " frame" : " frames")];
      if (picks.length && picks.length !== n) bits.push(picks.length + " in the gallery");
      if (clips.length) bits.push(clips.length + (clips.length === 1 ? " clip" : " clips"));
      if (beats.length) bits.push(beats.length + (beats.length === 1 ? " post" : " posts"));
      metaEl.textContent = bits.join(" · ");
    }

    var hiSec = document.getElementById("highlightsSec");
    if (picks.length) {
      galleryShots.innerHTML = picks.map(function (en) {
        return shotHtml(trip, en.p, en.i);
      }).join("");
      if (hiSec) hiSec.hidden = false;
    }

    /* The clips stand apart from the stills — they play themselves,
       and a wall of moving frames would fight the photographs. */
    var vidEl = document.getElementById("galleryClips");
    var vidSec = document.getElementById("clipsSec");
    if (vidEl && clips.length) {
      vidEl.innerHTML = clips.map(function (en) {
        return shotHtml(trip, en.p, en.i);
      }).join("");
      if (vidSec) vidSec.hidden = false;
    }

    /* the posts run forward here — an experience reads as it was
       lived, not newest first like the journal */
    var liveEl = document.getElementById("asItHappened");
    var liveSec = document.getElementById("asItHappenedSec");
    if (liveEl && beats.length) {
      liveEl.innerHTML = beats.map(function (b, bi) {
        return cardHtml(trip, b, bi);
      }).join("");
      var liveSub = document.getElementById("liveSub");
      if (liveSub) {
        liveSub.textContent = "Posted from " + (trip.loc || trip.short || trip.place) +
          " while it was going on.";
      }
      if (liveSec) liveSec.hidden = false;
    }
    /* An experience is logged when it happens; its photographs can
       arrive years later, or never. Say that outright rather than
       leaving a title standing over a blank page. */
    var emptyEl = document.getElementById("galleryEmpty");
    if (emptyEl && !picks.length && !clips.length && !beats.length) emptyEl.hidden = false;

    settleReels();
    var reflow;
    window.addEventListener("resize", function () {
      clearTimeout(reflow);
      reflow = setTimeout(settleReels, 150);
    });

  }

  /* ----------------------------------------------------------
     THE WALL — the front door shows only the keepers: every
     frame flagged `best: true`, one unbroken wall, newest trip
     first. The full sets live on the event pages, indexed just
     below the wall.
     ---------------------------------------------------------- */
  function bestPhotos() {
    var out = [];
    TRIPS.forEach(function (t) {
      (t.photos || []).forEach(function (p, i) {
        if (p.best) out.push({ t: t, p: p, i: i });
      });
    });
    return out;
  }
  var bestWall = document.getElementById("bestWall");
  if (bestWall && TRIPS.length) {
    var picks = bestPhotos();
    bestWall.innerHTML = '<div class="stream-grid">' +
      picks.map(function (en) { return shotHtml(en.t, en.p, en.i); }).join("") + "</div>";
    var statsText = picks.length + " keepers · " + TRIPS.length + " experiences · newest first";
    Array.prototype.forEach.call(document.querySelectorAll(".photo-stats"), function (el) {
      el.textContent = statsText;
    });
  }
  /* ----------------------------------------------------------
     THE EXPERIENCES INDEX — every one on its own page, in the
     log's register: a face, its name, when and where, and the
     count of frames holding the right edge. Grouped by year.
     ---------------------------------------------------------- */
  var xpList = document.getElementById("experienceList");
  if (xpList && TRIPS.length) {
    /* The year still being lived reads differently from the ones
       already filed. It comes off the data rather than the clock, so
       the top group is always the loud one and nothing has to be
       changed in January. The years under it stay plain rows — the
       contrast is the point, and it only works if it happens once. */
    var thisYear = String((TRIPS[0] || {}).posted || "").slice(0, 4);
    /* The live year runs as a rail — three at a time, oversized, and
       grey until you arrive on one. Same reel the galleries use, so it
       inherits the arrows, the snapping and the end-stops. */
    var xpArrow = function (cls, label, d) {
      return '<button class="reel-arrow ' + cls + '" type="button" aria-label="' + label + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d +
        '"/></svg></button>';
    };
    var xhtml = "", xyear = null, xopen = "";
    TRIPS.forEach(function (t, i) {
      var y = String(t.posted || "").slice(0, 4) || "Undated";
      var loud = y === thisYear;
      if (y !== xyear) {
        xyear = y;
        if (xopen) xhtml += xopen;
        xhtml += '<h2 class="log-year' + (loud ? " log-year--now" : "") + '">' +
          (loud ? '<span class="accent">' + esc(y) + "</span>" : esc(y)) + "</h2>";
        if (loud) {
          xhtml += '<div class="reel xp-reel"><div class="reel-window">' +
            xpArrow("reel-prev", "Previous experience", "M15 5l-7 7 7 7") +
            xpArrow("reel-next", "Next experience", "M9 5l7 7-7 7") +
            '<div class="reel-track">';
          xopen = "</div></div></div>";
        } else {
          xhtml += '<ol class="xp-rows">';
          xopen = "</ol>";
        }
      }
      var n = (t.photos || []).length;
      var src = thumbSrc(t);
      if (loud) {
        xhtml += '<a class="xp-card" href="gallery.html?trip=' + esc(t.slug) + '">' +
          '<span class="xp-card__name">' + esc(xpName(t)) + "</span>" +
          '<span class="xp-card__meta">' +
            (n ? n + (n === 1 ? " frame" : " frames") : "Not yet") + "</span>" +
          "</a>";
        return;
      }
      xhtml += '<li class="xp-row"><a class="xp-link" href="gallery.html?trip=' + esc(t.slug) + '">' +
        '<span class="xp-thumb">' +
          (src ? '<img src="' + esc(src) + '" alt="" loading="lazy">' : "") + "</span>" +
        '<span class="xp-text">' +
          '<span class="xp-name">' + esc(xpName(t)) + "</span>" +
          '<span class="xp-meta">' + xpByline(t) + "</span></span>" +
        '<span class="xp-count">' + n + (n === 1 ? " frame" : " frames") + "</span>" +
        "</a></li>";
    });
    if (xopen) xhtml += xopen;
    xpList.innerHTML = xhtml;
    var xpStats = document.getElementById("experienceStats");
    if (xpStats) {
      xpStats.textContent = TRIPS.length + " experiences · " +
        allPhotos().length + " frames · newest first";
    }
  }

  /* The experiences on the front page: one ruled row each into
     its own page, where any frame goes. (Data still says TRIPS.) */
  var eventList = document.getElementById("eventList");
  if (eventList && TRIPS.length) {
    eventList.innerHTML = TRIPS.map(function (t) {
      var n = (t.photos || []).length;
      return '<a class="roll-head" href="gallery.html?trip=' + esc(t.slug) + '">' +
        '<span class="roll-place">' + esc(t.nav || t.place) + '</span>' +
        '<span class="roll-meta">' + esc(t.when) + " · " + n + (n === 1 ? " frame" : " frames") + "</span>" +
        '<span class="roll-go" aria-hidden="true">→</span></a>';
    }).join("");
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


  /* A post is one floating card — a tiny date above, then the words
     and the photos together inside. No headline, no tags; `head`/
     `at`/the experience all stay in the data only. */
  /* A post's frames. One sits inline at its own shape; several ride
     a strip that runs off the right edge of the column — swipe on a
     thumb, arrows on a pointer — and any of them opens the lightbox,
     which pages through the whole set. */
  function mediaHtml(trip, shots) {
    if (shots.length === 1) {
      var only = trip.photos[shots[0]];
      return only
        ? '<div class="msg-one">' + shotHtml(trip, only, shots[0]) + "</div>"
        : "";
    }
    var arrow = function (cls, label, d) {
      return '<button class="reel-arrow ' + cls + '" type="button" aria-label="' + label + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d +
        '"/></svg></button>';
    };
    return '<div class="reel msg-reel"><div class="reel-window">' +
      arrow("reel-prev", "Previous frame", "M15 5l-7 7 7 7") +
      arrow("reel-next", "Next frame", "M9 5l7 7-7 7") +
      '<div class="reel-track">' +
      shots.map(function (i) {
        var p = trip.photos[i];
        return p ? shotHtml(trip, p, i) : "";
      }).join("") +
      "</div></div></div>";
  }

  /* A post is a row in the thread: its date, what was written, then
     the frames. The rows share one rounded container and are split
     by hairlines — no avatar, no name, the site is one voice. */
  function cardHtml(trip, b, key, fromLink) {
    var stamp = b.time ? stampText(b.time) : trip.when;
    var set = beatSet(trip, b, key || 0);
    var out = '<article class="msg">';
    /* Where the reference puts a name, a post says which experience
       it belongs to and clicks through to it. On the experience's
       own page that would only point back at itself, so it's the
       journal that asks for the link. */
    var meta = "";
    if (fromLink && trip.gallery !== false && trip.slug) {
      meta += '<a class="msg-from" href="gallery.html?trip=' + esc(trip.slug) + '">' +
        esc(xpName(trip)) + "</a>";
    }
    if (stamp) {
      meta += (meta ? '<span class="msg-dot" aria-hidden="true">·</span>' : "") +
        "<span>" + esc(stamp) + "</span>";
    }
    if (meta) out += '<p class="msg-when">' + meta + "</p>";
    if (b.say) out += '<p class="msg-say">' + esc(b.say) + "</p>";
    if (set.shots.length) out += mediaHtml(set.trip, set.shots);
    return out + "</article>";
  }

  /* Everything postable lands in one pile: trip posts and the
     standalone journal entries, newest first. The blog page shows
     the whole pile; Home shows the top of it. */
  function allCards() {
    var cards = [];
    TRIPS.forEach(function (t) {
      (t.beats || []).forEach(function (b, i) {
        /* a post's own stamp when it has one, else the trip's date —
           the index keeps a trip's posts in the order they were written */
          cards.push({ trip: t, beat: b, at: i, key: (b.time || t.posted || "") + "~" + i });
      });
    });
    POSTS.forEach(function (p, i) { cards.push(postCard(p, i)); });
    cards.sort(function (a, b) { return a.key < b.key ? 1 : a.key > b.key ? -1 : 0; });
    return cards;
  }

  var feedList = document.getElementById("feedList");
  if (feedList && (TRIPS.length || POSTS.length)) {
    var cards = allCards();
    if (!cards.length) {
      feedList.innerHTML = '<p class="noscript-note">Nothing posted yet.</p>';
    } else if (!window.IntersectionObserver) {
      /* ancient browser: render everything at once */
      feedList.innerHTML = cards.map(function (c) {
        return cardHtml(c.trip, c.beat, c.at, true);
      }).join("");
    } else {
      /* Batches keep a journal years deep light: fifteen cards at a
         time, more as the bottom nears, with a month mark whenever
         the stream crosses into an earlier month. The while-loop
         matters — after a batch the sentinel can still be in view,
         and the observer alone won't re-fire for it. */
      var BATCH = 15;
      var at = 0;
      var sentinel = document.createElement("div");
      sentinel.className = "feed-sentinel";
      feedList.appendChild(sentinel);
      var renderBatch = function () {
        var out = "";
        var stop = Math.min(at + BATCH, cards.length);
        for (; at < stop; at++) {
          out += cardHtml(cards[at].trip, cards[at].beat, cards[at].at, true);
        }
        sentinel.insertAdjacentHTML("beforebegin", out);
      };
      var watcher = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) fill(); });
      }, { rootMargin: "1200px 0px" });
      var fill = function () {
        var guard = 0;
        while (at < cards.length && guard++ < 40 &&
               sentinel.getBoundingClientRect().top < window.innerHeight + 1200) {
          renderBatch();
        }
        if (at >= cards.length) {
          watcher.disconnect();
          sentinel.remove();
        }
      };
      fill();
      if (at < cards.length) watcher.observe(sentinel);
    }

    var feedStat = document.getElementById("feedStat");
    if (feedStat) {
      feedStat.textContent = cards.length + (cards.length === 1 ? " post" : " posts") +
        " · newest first";
    }
  }

  /* ----------------------------------------------------------
     HIGHLIGHTS — the homepage: the lead frames of every trip on
     one uniform wall, newest first, no separators. The trip a
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
     THE LEDGER — two pillars and the quiet rows. Photos is the
     front door; the events live as chips on the wall, not here.
     ---------------------------------------------------------- */
  var sideTrips = document.getElementById("sideTrips");
  var menuTrips = document.getElementById("menuTrips");
  if ((sideTrips || menuTrips) && TRIPS.length) {
    var onBlog = /feed\.html$/i.test(location.pathname);
    if (sideTrips) {
      var row = function (href, name, meta, active) {
        return '<a class="side-trip' + (active ? " is-active" : "") + '" href="' + href + '">' +
          '<span class="side-name">' + name + "</span>" +
          (meta ? '<span class="side-trip-meta">' + meta + "</span>" : "") + "</a>";
      };
      var keepers = 0;
      TRIPS.forEach(function (t) {
        (t.photos || []).forEach(function (p) { if (p.best) keepers++; });
      });
      sideTrips.innerHTML =
        row("index.html", "Photos", keepers + " keepers", !onBlog) +
        row("feed.html", "Journal", postCount() + " posts", onBlog) +
        '<div class="side-gap" aria-hidden="true"></div>' +
        row("about.html", "About", "", false) +
        row("mailto:hello@heartslibrary.com", "Contact", "email", false);
    }
    /* The way through to the full ledger wears a card like every other
       row — the same rounded square as the cover frames, so it reads as
       one of the options rather than a footnote underneath them. The
       count comes from the data, so it stays true as experiences land. */
    var oldest = (TRIPS[TRIPS.length - 1] || {}).posted || "";
    var allDesc = TRIPS.length + (oldest ? ", back to " + oldest.slice(0, 4) : "");
    var allCard =
      '<div class="menu-item__tile menu-item__tile--all">' +
        '<svg class="icon-duo" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<rect class="duo-a" x="3" y="3" width="8.4" height="8.4" rx="2.4"/>' +
          '<rect class="duo-b" x="12.6" y="3" width="8.4" height="8.4" rx="2.4"/>' +
          '<rect class="duo-b" x="3" y="12.6" width="8.4" height="8.4" rx="2.4"/>' +
          '<rect class="duo-a" x="12.6" y="12.6" width="8.4" height="8.4" rx="2.4"/>' +
        "</svg></div>" +
      '<div><span class="menu-item__title">See all experiences</span>' +
      '<span class="menu-item__desc">' + esc(allDesc) + "</span></div>";

    /* The burger says the same thing the desktop menu does: the six
       newest wearing their cover frame, then the way to the rest.
       Both are built from the same data, so posting updates both. */
    if (menuTrips) {
      menuTrips.innerHTML =
        withFrames.slice(0, 6).map(function (t) {
          var src = thumbSrc(t);
          return '<a class="mobile-menu__item" href="gallery.html?trip=' + esc(t.slug) + '">' +
            '<div class="menu-item__tile menu-item__tile--photo">' +
            (src ? '<img src="' + esc(src) + '" alt="" loading="lazy">' : "") +
            "</div><div>" +
            '<span class="menu-item__title">' + esc(xpName(t)) + "</span>" +
            '<span class="menu-item__desc">' + xpByline(t) + "</span></div></a>";
        }).join("") +
        '<a class="mobile-menu__item mobile-menu__all" href="experiences.html">' +
          allCard + "</a>";
    }
    /* The Trips dropdown in the top nav */
    var navTrips = document.getElementById("navTrips");
    if (navTrips) {
      /* the six newest, each wearing its cover frame; the rest live
         behind "See all experiences" */
      navTrips.innerHTML =
        withFrames.slice(0, 6).map(function (t) {
          var src = thumbSrc(t);
          var byline = xpByline(t);
          return '<a class="menu-item" role="menuitem" href="gallery.html?trip=' + esc(t.slug) + '">' +
            '<div class="menu-item__tile menu-item__tile--photo">' +
            (src ? '<img src="' + esc(src) + '" alt="" loading="lazy">' : "") +
            "</div><div>" +
            '<span class="menu-item__title">' + esc(xpName(t)) + "</span>" +
            '<span class="menu-item__desc">' + byline + "</span></div></a>";
        }).join("") +
        '<a class="menu-item menu-item--all" role="menuitem" href="experiences.html">' +
          allCard + "</a>";
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
