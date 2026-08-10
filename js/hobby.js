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
  /* No post wears a portrait. There is one author, the journal's
     masthead already carries his face, and a column of the same
     36px photograph forty times over told the reader nothing it
     hadn't already said. What marks where a post starts is the
     dateline and the hairline above it — see THE JOURNAL in
     css/review.css. */
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
  /* A standalone journal entry belongs to no experience, so it gets a
     synthetic trip of its own — nowhere to click through to, but the
     lightbox can page its frames like any other set. */
  function postTrip(p, i) {
    var slug = "post-" + i;
    return postTrips[slug] || (postTrips[slug] = {
      slug: slug, gallery: false, place: "", short: "", nav: "",
      when: "", photos: p.photos || []
    });
  }
  /* How many posts the journal holds: one per outing that was written
     from, plus every standalone entry. A trip's beats are passages of
     ONE post now, not posts of their own. */
  function postCount() {
    return TRIPS.filter(function (t) { return (t.beats || []).length; }).length + POSTS.length;
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
     that isn't a clip, else a clip's poster if it has one. An
     experience whose only frame is a video and whose video has no
     poster has no face at all, and says so with an empty tile
     rather than a white square. */
  function thumbSrc(t) {
    if (t.cover) return t.cover;
    var ps = t.photos || [];
    for (var i = 0; i < ps.length; i++) if (!ps[i].video) return ps[i].src;
    for (var j = 0; j < ps.length; j++) if (ps[j].poster) return ps[j].poster;
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
  var SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  /* A JOURNAL DATE reads "Aug 11" — short enough to sit beside a place
     without competing with it, and still a date rather than a code.
     The year is dropped while it is still this year and only earns its
     space once it is telling you something: "Jun 20, 2024". Computed
     off the real clock, so a 2026 post starts showing its year on its
     own the moment 2027 arrives. */
  function postDate(s) {
    var m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return "";
    var day = SHORT_MONTHS[Number(m[2]) - 1] + " " + Number(m[3]);
    return Number(m[1]) === new Date().getFullYear() ? day : day + ", " + m[1];
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
  /* On a wall a clip holds still under a play badge until you open
     it — a grid of moving frames fights the photographs beside it.
     (The journal used to run them muted and looping behind a speaker
     button; a post's clip now carries ordinary controls instead, so
     the autoplay watcher and the speaker went with the thread.) */
  function playSafely(v) {
    var p = v.play();
    /* a browser that refuses autoplay rejects rather than throwing */
    if (p && p.catch) p.catch(function () {});
  }
  /* `capped` asks for the caption as text under the frame rather than
     as a pill that only shows on hover. An experience's own wall takes
     it — the writing there is half the point of the page. The front
     wall doesn't: there the picture is the whole message. */
  function shotHtml(t, p, i, capped) {
    var ratio = p.w && p.h ? ' style="aspect-ratio:' + Number(p.w) + "/" + Number(p.h) + '"' : "";
    /* Equal area, not equal width: a frame's width is the square root
       of its aspect, so an upright and a landscape end up covering the
       same amount of paper and neither one dominates the wall. 3:2
       lands on the full column; everything narrower steps back from
       it. The wall is the only grid that reads this — everywhere else
       the variable goes unused. */
    var fw = "";
    if (p.w && p.h) {
      var pct = 100 * Math.sqrt((Number(p.w) / Number(p.h)) / 1.5);
      fw = ' style="--fw:' + Math.round(Math.max(54, Math.min(100, pct))) + '%"';
    }
    var wide = "";
    /* A clip's own surface opens the viewer; only the speaker
       button swallows the press. */
    if (p.video) {
      /* A clip on a wall holds a frame under a play badge — #t=0.1 is
         what paints that frame instead of a black box — and opens to
         play in the viewer. */
      var badge = '<span class="vid-badge" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 6.5v11a1 1 0 0 0 1.5.87l9-5.5a1 1 0 0 0 0-1.74l-9-5.5A1 1 0 0 0 9 6.5Z"/></svg></span>';
      return '<figure class="shot shot--video' + wide + '"' + fw + '>' +
        '<div class="vid">' +
          '<video src="' + esc(p.src) + '#t=0.1' +
          '" playsinline preload="metadata" muted' +
          (p.poster ? ' poster="' + esc(p.poster) + '"' : "") + ratio + "></video>" +
          badge +
          '<button class="vid-open" type="button" aria-label="View larger: ' +
            esc(p.caption || t.place) + '" data-trip="' + esc(t.slug) + '" data-i="' + i + '"></button>' +
          (p.seconds ? '<span class="vid-dur">' + clock(p.seconds) + "</span>" : "") +
        "</div>" +
        (p.caption
          ? '<figcaption class="shot-cap">' + esc(p.caption) +
            '<span class="shot-credit">Cody Heart</span></figcaption>'
          : "") +
        "</figure>";
    }
    /* one or the other, never both — the same words twice would be
       read out twice. A frame with nothing written under it says
       nothing, rather than holding an empty line. */
    var pill = p.caption && !capped
      ? '<span class="shot-pill">' + esc(p.caption) + "</span>" : "";
    var cap = p.caption && capped
      ? '<figcaption class="shot-cap">' + esc(p.caption) + "</figcaption>" : "";
    return '<figure class="shot' + wide + '"' + fw + '>' +
      '<button class="shot-btn" type="button" data-trip="' + esc(t.slug) + '" data-i="' + i + '" aria-label="View larger: ' + esc(p.caption || t.place) + '">' +
      '<img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") + '" loading="lazy"' + ratio + ">" +
      pill + "</button>" + cap + "</figure>";
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
      var btn = e.target.closest(".shot-btn, .vid-open, .frame-btn");
      if (!btn) return;
      var trip = tripBySlug(btn.getAttribute("data-trip"));
      if (!trip) return;
      var here = Number(btn.getAttribute("data-i"));
      /* The set you page through is whatever the frame belongs to: a
         whole journal post or a whole note — passages and all, so a
         post's frames read as one roll even when its beats carried
         their own — else the grid the frame shares. */
      var box = btn.closest(".post, .note, .stream-grid");
      if (box) {
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
  /* A strip of frames used to be a "reel": a track with hover arrows,
     a live counter under it, and a settle pass that measured whether
     it overflowed at all. Only the journal ever built one, and a post
     now carries a plain scroll-snapping strip whose overflow past the
     card edge is the whole affordance — so the arrows, the counter and
     the measuring went with the thread. What is left is the quiet
     sweep below: a frame whose file is missing takes its figure with
     it rather than showing a broken-image icon, and empties the strip
     or the block if it was the last one, so nothing is left holding a
     gap where a picture was. */
  function sweepBrokenFrames() {
    document.addEventListener("error", function (e) {
      var img = e.target;
      if (!img || img.tagName !== "IMG" || !img.classList ||
          !img.classList.contains("frame")) return;
      var fig = img.closest("figure");
      if (!fig) { img.remove(); return; }
      var box = fig.parentNode;
      fig.remove();
      while (box && box.classList && !box.children.length &&
             (box.classList.contains("strip") || box.classList.contains("media"))) {
        var up = box.parentNode;
        box.remove();
        box = up;
      }
    }, true);
  }

  bindLightbox();
  sweepBrokenFrames();

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
    /* An experience has two halves, and they weigh the same. The
       FRAMES are the pictures, edited and chosen after the fact.
       The NOTES are what was written from inside it, and whatever
       came off the phone at the time. A new experience often starts
       as notes alone and grows its frames when there's time at a
       computer; either half on its own is still the record. */
    var beats = trip.beats || [];
    /* Every clip the experience holds shows in Video, whether or not
       a post also shows it — the post is the moment it went up, the
       section is where you go to watch. Stills don't double up: the
       wall takes the edited ones, the posts keep the rest. */
    /* The wall is the edited gallery: every still not already in a
       note. Which of those also reach the home page is `best`. */
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
      /* the byline already counts the frames when an experience never
         said where it was — saying it twice read as a stutter */
      var bits = [xpByline(trip)];
      if (trip.loc) bits.push(n + (n === 1 ? " frame" : " frames"));
      if (picks.length && picks.length !== n) bits.push(picks.length + " in the gallery");
      if (clips.length) bits.push(clips.length + (clips.length === 1 ? " clip" : " clips"));
      if (beats.length) bits.push(beats.length + (beats.length === 1 ? " note" : " notes"));
      metaEl.textContent = bits.join(" · ");
    }

    var framesSec = document.getElementById("framesSec");
    if (picks.length) {
      /* captions read as text here, not as a pill on hover */
      galleryShots.innerHTML = picks.map(function (en) {
        return shotHtml(trip, en.p, en.i, true);
      }).join("");
      if (framesSec) framesSec.hidden = false;
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

    /* the notes run forward here — an experience reads as it was
       lived, not newest first like the journal */
    var notesEl = document.getElementById("notesList");
    var notesSec = document.getElementById("notesSec");
    if (notesEl && beats.length) {
      /* Everything written from inside one experience is one record
         by definition, so it is drawn as one: a single rule down the
         column, no hairlines cutting it into pieces, and nothing
         naming the author or the experience — both are on the page
         already, a few inches up. */
      var lastStamp = "";
      notesEl.innerHTML = beats.map(function (b, bi) {
        /* a beat with neither words nor frames would draw its tick on
           the rule and then say nothing */
        if (!b.say && !(b.photos || b.shots || []).length) return "";
        var stamp = b.time ? stampText(b.time) : (trip.when || "");
        var fresh = stamp && stamp !== lastStamp ? stamp : "";
        lastStamp = stamp;
        return noteHtml(trip, b, bi, fresh);
      }).join("");
      var notesSub = document.getElementById("notesSub");
      if (notesSub) {
        notesSub.textContent = "Written from " + (trip.loc || trip.short || trip.place) +
          " while it was going on, in the order I wrote it.";
      }
      if (notesSec) notesSec.hidden = false;
    }
    /* An experience is logged when it happens; its photographs can
       arrive years later, or never. Say that outright rather than
       leaving a title standing over a blank page. */
    var emptyEl = document.getElementById("galleryEmpty");
    if (emptyEl && !picks.length && !clips.length && !beats.length) emptyEl.hidden = false;
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
    /* Every experience gets a band: its name across the page, the
       byline under it, and its own roll running off the right edge —
       grey until the band is arrived on. The live year is marked at
       its heading only; the rows themselves read the same all the way
       back, because an experience from 2019 is not a lesser thing than
       one from this August. */
    var thisYear = String((TRIPS[0] || {}).posted || "").slice(0, 4);
    var xhtml = "", xyear = null, xopen = "";
    TRIPS.forEach(function (t) {
      var y = String(t.posted || "").slice(0, 4) || "Undated";
      if (y !== xyear) {
        xyear = y;
        if (xopen) xhtml += xopen;
        var live = y === thisYear;
        xhtml += '<h2 class="log-year' + (live ? " log-year--now" : "") + '">' +
          (live ? '<span class="accent">' + esc(y) + "</span>" : esc(y)) + "</h2>";
        xhtml += '<div class="xp-bands">';
        xopen = "</div>";
      }
      var n = (t.photos || []).length;
      /* a clip has no still to contribute, so it sits out of the roll */
      var stills = (t.photos || []).filter(function (p) { return !p.video; });
      /* Every frame declares its box before it arrives. The roll sets
         a height and lets width follow the shape, so without w/h the
         browser has nothing to size the slot with until the bytes
         land — which is what left the right-hand end of a row empty
         and then shoved it about as the pictures came in. The first
         two are fetched outright: a row is never blank on arrival. */
      var strip = stills.map(function (p, si) {
        var box = p.w && p.h
          ? ' width="' + Number(p.w) + '" height="' + Number(p.h) + '"'
          : "";
        return '<img src="' + esc(p.src) + '" alt=""' + box +
          ' loading="' + (si < 2 ? "eager" : "lazy") + '" decoding="async">';
      }).join("");
      /* An experience is logged when it happens; the photographs can
         arrive years later. A row with none yet holds its slots open
         — flat, inert blocks, no shimmer, because nothing is loading
         and nothing is about to. The byline beside them already says
         0 frames, so the slots need no caption of their own. */
      var slots = "";
      if (!stills.length) {
        for (var k = 0; k < 5; k++) slots += '<span class="xp-slot"></span>';
        slots = '<div class="xp-band__strip xp-band__strip--empty" aria-hidden="true">' +
          slots + "</div>" +
          '<p class="visually-hidden">' +
          (n ? "Only a clip from this one so far — no still photographs yet."
             : "No photographs from this one yet.") + "</p>";
      }
      xhtml += '<section class="xp-band">' +
        '<a class="xp-band__head" href="gallery.html?trip=' + esc(t.slug) + '">' +
          '<span class="xp-band__text">' +
            '<span class="xp-band__name">' + esc(xpName(t)) + "</span>" +
            '<span class="xp-band__meta">' + xpByline(t) + "</span>" +
          "</span>" +
          '<span class="xp-band__go" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
            'stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>' +
          "</span>" +
        "</a>" +
        (strip ? '<div class="xp-band__strip">' + strip + "</div>" : slots) +
        "</section>";
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

  /* ==========================================================
     WHAT A FRAME DOES WHERE THE WRITING IS THE POINT.

     Two places on this site put photographs under prose: a post
     in the journal and a note on an experience's page. They are
     deliberately different objects — a post is one of forty and
     has to say which outing it came from; a note sits on a page
     whose masthead already said all that — but a photograph must
     not behave differently in the two of them. So the media
     rules live here, once, and both call them.
     ========================================================== */

  /* ---------- what a piece of media IS ----------
     One field decides it. `youtube` wins; otherwise the extension
     does the work, so a .gif needs no new field at all — it rides the
     image path and animates on its own. */
  function kindOf(m) {
    if (!m) return "photo";
    if (m.youtube) return "youtube";
    if (m.video === true || /\.(mp4|mov|m4v|webm)$/i.test(m.src || "")) return "video";
    if (/\.gif$/i.test(m.src || "")) return "gif";
    return "photo";
  }
  /* the id out of whatever was pasted — a watch URL, a youtu.be
     short link, an embed, a short, or the bare id itself */
  function tubeId(v) {
    var s = String(v || "");
    var m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{6,})/);
    return m ? m[1] : s;
  }
  function mediaEl(t, p, i, single) {
    var k = kindOf(p);
    var box = (p.w && p.h)
      ? ' width="' + Number(p.w) + '" height="' + Number(p.h) + '"' : "";
    /* An iframe, not a script — nothing is fetched from a CDN at parse
       time, and nocookie keeps it from setting one before a click. */
    if (k === "youtube") {
      return '<div class="tube"><iframe src="https://www.youtube-nocookie.com/embed/' +
        esc(tubeId(p.youtube)) + '" title="' + esc(p.alt || p.caption || "YouTube video") +
        '" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"' +
        " allowfullscreen></iframe></div>";
    }
    /* A clip of his own: controls, not autoplay, because a written
       video is watched on purpose rather than glanced at on the way
       past. It plays where it sits and never opens the viewer. */
    if (k === "video") {
      return '<video class="frame" data-kind="video" src="' + esc(p.src) + '"' + box +
        ' controls playsinline preload="metadata"' +
        (p.poster ? ' poster="' + esc(p.poster) + '"' : "") + "></video>";
    }
    /* A still or a GIF opens the viewer. The button is capped to the
       picture's own width when the shape is known: a `max-height`
       never reaches intrinsic sizing, so without this the click target
       and the focus ring of an upright frame would run the whole
       measure beside it. */
    var fit = single && p.w && p.h
      ? ' style="max-width:min(100%,calc(var(--frame-cap) * ' +
        (Math.round((Number(p.w) / Number(p.h)) * 1e4) / 1e4) + '))"'
      : "";
    return '<button class="frame-btn" type="button" data-trip="' + esc(t.slug) +
      '" data-i="' + i + '" aria-label="View larger: ' +
      esc(p.caption || p.alt || xpName(t) || "frame") + '"' + fit + ">" +
      '<img class="frame" data-kind="' + k + '" src="' + esc(p.src) + '" alt="' +
      esc(p.alt || "") + '"' + box + ' loading="lazy" decoding="async"></button>';
  }
  /* `caps` asks for the written caption under the frame. Only a written
     caption ever shows; `alt` stays where it belongs — it describes the
     picture for someone who cannot see it, and printing it underneath
     says the same thing twice.

     A JOURNAL POST passes false. The post's own words are right above
     the picture, so a caption under it is a second, quieter voice
     saying something about the same frame — and on a strip of four it
     was four of them. An EXPERIENCE PAGE passes true: there the writing
     beside each frame is half the reason the page exists. */
  function figureFor(t, p, i, single, caps) {
    return "<figure" + (single ? ' class="one"' : "") + ">" +
      mediaEl(t, p, i, single) +
      (caps && p.caption ? "<figcaption>" + esc(p.caption) + "</figcaption>" : "") +
      "</figure>";
  }
  /* ONE item sits in the column, capped by height so a portrait can't
     own the screen. TWO OR MORE become a strip that runs past the
     right edge and scroll-snaps. That overflow is the point: it says
     "there's more here" without a count badge, and it is the one place
     the column is allowed to break. */
  function mediaHtml(t, shots, caps) {
    if (!shots || !shots.length) return "";
    if (shots.length === 1) {
      var only = t.photos[shots[0]];
      return only ? '<div class="media">' + figureFor(t, only, shots[0], true, caps) + "</div>" : "";
    }
    var out = shots.map(function (i) {
      var p = t.photos[i];
      return p ? figureFor(t, p, i, false, caps) : "";
    }).join("");
    return out ? '<div class="media"><div class="strip">' + out + "</div></div>" : "";
  }

  /* ----------------------------------------------------------
     A NOTE, on the experience's own page. The journal's card
     treatment is the journal's: there a post has to say which
     experience it came from and hold its own against forty
     others. Here the page is already one outing — the masthead
     names it, dates it, says where it was and counts what came
     back — so a note is just what was written at the time, with
     what was shot alongside it. No card, no author, no swipe:
     prose down a ruled column, and the frames laid out under
     each paragraph where they fit the measure.
     ---------------------------------------------------------- */
  /* The frames a note carries are laid out by the shared rules above —
     one in the column at a capped height, several on a strip — so a
     photograph reads the same here as it does in a post. (They used to
     be a wrapping sheet of negatives, all one height. That was a third
     way of showing a picture on a site that already had two.)

     `stamp` is passed in rather than worked out here: a run of notes
     written on one day says the date once, at the head of the run,
     the way a diary does. Give a beat its own `time` and it gets its
     own line back. */
  function noteHtml(trip, b, key, stamp) {
    var set = beatSet(trip, b, key || 0);
    var out = '<article class="note">';
    if (stamp) out += '<p class="note-when">' + esc(stamp) + "</p>";
    if (b.say) out += '<p class="note-say">' + esc(b.say) + "</p>";
    out += mediaHtml(set.trip, set.shots, true);
    return out + "</article>";
  }

  /* ----------------------------------------------------------
     THE JOURNAL — one post per outing, newest first.

     WHAT THIS REPLACED. The journal used to be a THREAD: every
     beat of every experience was its own row, hairlined off from
     the one above, and a run of rows from one experience was
     drawn as a chain hanging off a connector rail. Three notes
     written across one afternoon in San Diego came out as three
     orphans, each re-introducing the same experience, the same
     venue and the same date to the reader who had just read it.

     An outing is one thing, so it is now one POST. Its beats are
     the PASSAGES inside it — words, then whatever was shot while
     those words were being written, then the next paragraph. A
     standalone entry is a post of its own. The chain, the rail,
     the per-row header line and the whole thread container went
     with them.

     THE HEADER IS THE DATE. No titles: `b.head` and `p.head`
     still live in the data and nothing renders them, because a
     headline over two sentences is a title on a note to yourself.
     The date carries the post and the place follows it in the
     quiet weight, which is what a blog has always done.
     ---------------------------------------------------------- */

  /* post-2026-08-09-deadbeat-tour — stable as long as the day and the
     slug are, which is what a permalink has to be */
  function anchorFor(e) {
    return "post-" + (String(e.date || "").slice(0, 10) || "x") +
      (e.slug ? "-" + e.slug : "") + (e.n ? "-" + e.n : "");
  }
  function monthOf(d) { return String(d || "").slice(0, 7); }
  function monthLabel(k) {
    var m = String(k).match(/^(\d{4})-(\d{2})$/);
    return m ? LONG_MONTHS[Number(m[2]) - 1] : String(k);
  }

  /* ONE NOTE, ONE POST. Every beat stands on its own — three notes
     written across a day at the zoo are three posts, not one post with
     three parts. Posting more than once a day is the point; they queue
     up in the column the way anything else does, newest first, each
     with its own date and its own permalink.

     (This has been both ways. Grouping an outing into a single post
     with its passages strung on a rail was tried and rejected: the
     relationship it drew was real but it made a day feel like one
     obligation rather than several cheap ones, which is the opposite
     of the point.) */
  function journalPosts() {
    var out = [];
    TRIPS.forEach(function (t) {
      var beats = (t.beats || []).slice();
      if (!beats.length) return;
      /* Beats read in the order they were written; when every one of
         them carries a time, that order is the clock's. */
      if (beats.every(function (b) { return !!b.time; })) {
        beats.sort(function (a, b) { return a.time < b.time ? -1 : a.time > b.time ? 1 : 0; });
      }
      beats.forEach(function (b, i) {
        var set = beatSet(t, b, i);
        out.push({
          date: b.time || t.posted || "",
          title: b.title || "",
          where: t.loc || "",
          slug: t.slug,
          /* several notes can share a day AND an outing, so the anchor
             takes the beat's index too or the permalinks collide */
          n: i,
          passages: [{ say: b.say || "", trip: set.trip, shots: set.shots }]
        });
      });
    });
    POSTS.forEach(function (p, i) {
      var t = postTrip(p, i);
      out.push({
        date: p.time || "", title: p.title || "", where: p.at || "", slug: "", n: 0,
        passages: [{
          say: p.say || "", trip: t,
          shots: (p.photos || []).map(function (_, k) { return k; })
        }]
      });
    });
    /* AT LEAST ONE OF. A post is valid with frames, or with words, or
       both — it is never required to have both. What it may not be is
       neither: an outing that was logged and then never written from
       and never shot is an experience, not a post, and it belongs on
       the index rather than as an empty card here. */
    out = out.filter(function (e) {
      return e.passages.some(function (p) { return p.say || p.shots.length; });
    });
    out.sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
    return out;
  }

  /* EVERY POST CARRIES ITS OWN DATELINE. A previous pass suppressed it
     on a same-day run so the date wasn't repeated — but that made the
     first post of a day look structurally different from the two under
     it, and the ones without a header read as loose text with nothing
     holding them. Uniformity is worth more than avoiding a repeat, and
     at kicker size a repeat costs almost nothing. */
  function postHtml(e) {
    var id = anchorFor(e);
    /* THE TITLE IS WHATEVER THE POST IS ABOUT. Usually that is where you
       were — and where you were comes free, so most posts get a title
       without typing one — but it is not a location field. A post about
       the pizza is titled "The pizza"; a post about a clip somebody
       else made is titled with whatever you have to say about it.

         title:  what you wrote, if you wrote one     ← wins
         at:     a standalone post's own line
         loc:    the venue of the experience it belongs to
         date:   nothing else to say, so the date leads

       Falling back this way means old entries keep the venue they had
       and new ones can say anything, with no field to fill in unless
       you want to. */
    var place = e.title || e.where || "";
    var head = '<a class="post__head" id="' + esc(id) + '" href="#' + esc(id) + '">' +
      (place
        ? '<span class="post__title">' + esc(place) + "</span>" +
          '<span class="post__date">' + esc(postDate(e.date)) + "</span>"
        : '<span class="post__title">' + esc(postDate(e.date)) + "</span>") +
      "</a>";
    /* a passage with neither words nor frames is nothing — not an empty
       box, and not a gap where a paragraph would have been */
    var live = e.passages.filter(function (p) { return p.say || p.shots.length; });
    /* THE CARD holds all of it — the dateline, the words, and the
       frames. The photographs were briefly set outside it on the page,
       tied to the post by proximity alone; inside is what makes a post
       one object you can see the edges of. */
    var words = live.map(function (p) {
      return p.say ? '<p class="post__say">' + esc(p.say) + "</p>" : "";
    }).join("");
    var frames = live.map(function (p) {
      return mediaHtml(p.trip, p.shots, false);
    }).join("");
    /* a card with frames takes the full column: a strip has to have a
       width to overflow, and a picture shouldn't be sized by how long
       the sentence above it happened to be */
    var body = '<div class="bubble' + (frames ? " bubble--media" : "") + '">' +
      head + words + frames + "</div>";
    /* No tail. A post used to end with a row pointing at the experience
       it came from — cover thumb, label, name, chevron. It was the
       heaviest thing in the post and it repeated on every one of them,
       so a page of short entries read as a list of adverts for pages
       elsewhere. The nav's Experiences menu already goes there, and the
       post itself is the point. */
    return '<article class="post">' + body + "</article>";
  }

  /* ---------- THE ARCHIVE ----------
     A month index in the right-hand margin, grouped by year. The
     house rule on this site is that filters belong inside the list
     they filter rather than in a control beside it — see HANDOFF.md.
     The journal is the one deliberate exception, asked for by name:
     it is the shape every blog has, the record runs back to 2019,
     and there is no way to put "September 2021" inside a stream that
     lazily renders the last eight posts. It is a card of the same
     material as the posts, so it reads as the second column of one
     object rather than as chrome floating in the margin. Do not copy
     this pattern anywhere else on the site. */
  function monthIndex(entries) {
    var order = [], seen = {};
    /* entries arrive newest first, so the months do too */
    entries.forEach(function (e) {
      var k = monthOf(e.date);
      if (!k) return;
      if (!seen[k]) { seen[k] = { key: k, n: 0 }; order.push(seen[k]); }
      seen[k].n++;
    });
    var years = [], byYear = {}, keys = [];
    order.forEach(function (m) {
      var y = m.key.slice(0, 4);
      if (!byYear[y]) { byYear[y] = { year: y, months: [] }; years.push(byYear[y]); }
      byYear[y].months.push(m);
      keys.push(m.key);
    });
    return { years: years, keys: keys };
  }
  function archiveHtml(years, total) {
    var row = function (key, name, n) {
      return '<button class="archive__row" type="button" data-month="' + esc(key) + '">' +
        '<span class="archive__name">' + esc(name) + "</span>" +
        '<span class="archive__n">' + n + "</span></button>";
    };
    var out = '<div class="archive__in">' +
      '<p class="archive__label">Archive</p>' +
      row("all", "All posts", total);
    years.forEach(function (g) {
      out += '<div class="archive__year"><span class="archive__y">' + esc(g.year) + "</span>";
      g.months.forEach(function (m) { out += row(m.key, monthLabel(m.key), m.n); });
      out += "</div>";
    });
    return out + "</div>";
  }

  var feedList = document.getElementById("feedList");
  if (feedList && (TRIPS.length || POSTS.length)) {
    var entries = journalPosts();
    var index = monthIndex(entries);
    /* THE MONTH FILTER IS OFF. Its markup was pulled from feed.html, so
       everything below that touches `#feedArchive` no-ops on its own —
       the machinery is left intact for when it comes back. The one
       thing that would NOT no-op is the `?month=` deep link: it would
       still filter the journal with no visible control to undo it, so
       it is only honoured while the archive is actually on the page. */
    var month = "all";
    if (document.getElementById("feedArchive")) {
      try {
        var asked = new URLSearchParams(location.search).get("month") || "";
        if (asked && index.keys.indexOf(asked) >= 0) month = asked;
      } catch (e) {}
    }

    var view = entries, vAt = 0;
    var sentinel = document.createElement("div");
    sentinel.className = "feed-sentinel";
    /* Batches keep a journal years deep light: eight posts at a time,
       more as the bottom nears. The unit is a whole post, so the fold
       can never land inside one. The while-loop matters — after a
       batch the sentinel can still be in view, and the observer alone
       won't re-fire for it. */
    var BATCH = 8;
    var fill = function () {
      var guard = 0;
      while (vAt < view.length && guard++ < 40 &&
             sentinel.getBoundingClientRect().top < window.innerHeight + 1200) {
        var out = "", n = 0;
        while (vAt < view.length && n < BATCH) { out += postHtml(view[vAt]); vAt++; n++; }
        sentinel.insertAdjacentHTML("beforebegin", out);
      }
      if (vAt >= view.length && watcher) watcher.disconnect();
    };
    var watcher = window.IntersectionObserver
      ? new IntersectionObserver(function (ens) {
          ens.forEach(function (en) { if (en.isIntersecting) fill(); });
        }, { rootMargin: "1200px 0px" })
      : null;

    var frameCount = function (list) {
      var n = 0;
      list.forEach(function (e) {
        e.passages.forEach(function (p) { n += p.shots.length; });
      });
      return n;
    };
    var show = function (key) {
      month = key;
      view = key === "all" ? entries
        : entries.filter(function (e) { return monthOf(e.date) === key; });
      vAt = 0;
      if (watcher) watcher.disconnect();
      feedList.innerHTML = "";
      feedList.appendChild(sentinel);
      if (!view.length) {
        sentinel.insertAdjacentHTML("beforebegin",
          '<p class="noscript-note">Nothing posted ' +
          (key === "all" ? "yet." : "that month.") + "</p>");
      } else if (!watcher) {
        /* no IntersectionObserver: render the lot at once rather than
           leaving the page holding a sentinel and nothing else */
        sentinel.insertAdjacentHTML("beforebegin",
          view.map(postHtml).join(""));
        vAt = view.length;
      } else {
        fill();
        if (vAt < view.length) watcher.observe(sentinel);
      }

      var stat = document.getElementById("feedStat");
      if (stat) {
        var f = frameCount(view);
        stat.textContent = view.length + (view.length === 1 ? " post" : " posts") +
          (f ? " · " + f + (f === 1 ? " frame" : " frames") : "") + " · " +
          (key === "all" ? "newest first" : monthLabel(key) + " " + key.slice(0, 4));
      }
      var rail = document.getElementById("feedArchive");
      if (rail) {
        Array.prototype.forEach.call(rail.querySelectorAll("[data-month]"), function (b) {
          var on = b.getAttribute("data-month") === key;
          b.classList.toggle("is-active", on);
          if (on) b.setAttribute("aria-current", "true");
          else b.removeAttribute("aria-current");
        });
      }
      /* the month is a place you can send someone, so it lives in the
         URL — replaced rather than pushed, because the back button
         belongs to the pages you came from, not to a filter */
      try {
        var u = new URL(location.href);
        if (key === "all") u.searchParams.delete("month");
        else u.searchParams.set("month", key);
        history.replaceState(null, "", u.pathname + u.search + u.hash);
      } catch (e) {}
    };

    /* The posts render first and on their own. Nothing below can stop
       them: if the archive never builds, the journal is still a
       journal. */
    show(month);

    var rail = document.getElementById("feedArchive");
    if (rail && entries.length) {
      rail.innerHTML = archiveHtml(index.years, entries.length);
      rail.hidden = false;
      rail.addEventListener("click", function (e) {
        var b = e.target.closest("[data-month]");
        if (b) show(b.getAttribute("data-month"));
      });
      /* mark whatever the URL asked for, now that the rows exist */
      Array.prototype.forEach.call(rail.querySelectorAll("[data-month]"), function (b) {
        var on = b.getAttribute("data-month") === month;
        b.classList.toggle("is-active", on);
        if (on) b.setAttribute("aria-current", "true");
      });
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
            '<div class="menu-item__tile menu-item__tile--photo' +
            (src ? "" : " menu-item__tile--empty") + '">' +
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
            '<div class="menu-item__tile menu-item__tile--photo' +
            (src ? "" : " menu-item__tile--empty") + '">' +
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
