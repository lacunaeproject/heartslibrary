/* ============================================================
   HEART'S LIBRARY — The Review · motion & behavior
   Editorial register: single-axis movement, soft eases,
   one designed moment per page. Everything fires once.
   ============================================================ */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  /* If a cover image fails to load, set a typographic plate instead
     of a broken-image icon — the shelf stays composed. */
  var queued = window.__fellCovers || [];
  window.coverFallback = function (img) {
    if (img.getAttribute("data-fell")) return;
    img.setAttribute("data-fell", "1");
    var plate = document.createElement("div");
    plate.className = "cover-plate";
    var t = document.createElement("span");
    t.className = "plate-title";
    t.textContent = img.getAttribute("data-title") || "";
    var rule = document.createElement("span");
    rule.className = "plate-rule";
    var a = document.createElement("span");
    a.className = "plate-author";
    a.textContent = img.getAttribute("data-author") || "";
    plate.appendChild(t); plate.appendChild(rule); plate.appendChild(a);
    img.replaceWith(plate);
  };

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined";

  /* ----------------------------------------------------------
     Nav — ported from codyheart.design's site.js:
     hide on scroll down / show on scroll up, dropdowns that open
     on hover or click and close on Esc / outside click / scroll,
     and the full-screen mobile menu.
     ---------------------------------------------------------- */
  function setupNav() {
    /* Hide on scroll down, show on scroll up */
    var nav = document.querySelector(".nav");
    if (nav) {
      var title = nav.querySelector(".nav__scrolltitle");
      var last = 0;
      window.addEventListener("scroll", function () {
        var y = window.scrollY;
        if (y < 60 || y < last) nav.classList.remove("is-hidden");
        else if (y > last + 5) nav.classList.add("is-hidden");
        last = y;
        if (title) title.classList.toggle("is-visible", y > 200);
      }, { passive: true });
      if (title) {
        title.addEventListener("click", function () {
          window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        });
      }
    }

    /* Dropdowns (Bookstores, Elsewhere) */
    Array.prototype.forEach.call(document.querySelectorAll(".nav__drop"), function (drop) {
      var btn = drop.querySelector("button");
      var menu = drop.querySelector(".nav__menu");
      if (!btn || !menu) return;
      var closeTimer;

      function open() {
        clearTimeout(closeTimer);
        // Only one dropdown open at a time
        Array.prototype.forEach.call(document.querySelectorAll(".nav__menu.is-open"), function (m) {
          if (m !== menu) {
            m.classList.remove("is-open");
            m.setAttribute("aria-hidden", "true");
            var b = m.parentElement.querySelector("button");
            if (b) b.setAttribute("aria-expanded", "false");
          }
        });
        menu.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-hidden", "false");
      }
      function close() {
        menu.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
      }
      function delayedClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(close, 100);
      }

      btn.addEventListener("click", function () {
        menu.classList.contains("is-open") ? close() : open();
      });
      drop.addEventListener("mouseenter", function () {
        if (window.matchMedia("(hover: hover)").matches) open();
      });
      drop.addEventListener("mouseleave", function () {
        if (window.matchMedia("(hover: hover)").matches) delayedClose();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("is-open")) { close(); btn.focus(); }
      });
      document.addEventListener("mousedown", function (e) {
        if (menu.classList.contains("is-open") && !drop.contains(e.target)) close();
      });
      window.addEventListener("scroll", function () {
        if (menu.classList.contains("is-open")) close();
      }, { passive: true });
    });

    /* Mobile menu */
    var burger = document.querySelector(".nav__burger");
    var mobile = document.querySelector(".mobile-menu");
    if (burger && mobile) {
      var setMobile = function (openState) {
        mobile.classList.toggle("is-open", openState);
        burger.setAttribute("aria-expanded", String(openState));
        burger.setAttribute("aria-label", openState ? "Close menu" : "Open menu");
        document.body.classList.toggle("menu-locked", openState);
      };
      burger.addEventListener("click", function () {
        setMobile(!mobile.classList.contains("is-open"));
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && mobile.classList.contains("is-open")) { setMobile(false); burger.focus(); }
      });
      mobile.addEventListener("click", function (e) {
        if (e.target.closest("a")) setMobile(false);
      });
    }
  }

  /* ----------------------------------------------------------
     Filters (fiction / nonfiction genres, city regions)
     ---------------------------------------------------------- */
  function setupFilters() {
    var bar = document.querySelector("[data-filterbar]");
    if (!bar) return;
    var buttons = Array.prototype.slice.call(bar.querySelectorAll("button[data-filter]"));
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-filter-item]"));
    var dividers = Array.prototype.slice.call(document.querySelectorAll("[data-filter-divider]"));
    var live = document.querySelector("[data-live-count]");

    function apply(key) {
      // Neutralize any pending scroll-reveal state so filtered-in rows
      // can never be stuck invisible, then toggle plainly.
      if (hasGsap) {
        gsap.set(items.concat(dividers), { clearProps: "all", autoAlpha: 1 });
      }
      var shown = 0;
      items.forEach(function (el) {
        var match = key === "all" || el.getAttribute("data-filter-item") === key;
        el.classList.toggle("is-hidden", !match);
        if (match) shown++;
      });
      dividers.forEach(function (el) {
        var match = key === "all" || el.getAttribute("data-filter-divider") === key;
        el.classList.toggle("is-hidden", !match);
      });
      if (live) live.textContent = String(shown);
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        apply(btn.getAttribute("data-filter"));
      });
    });
  }

  /* ----------------------------------------------------------
     Reveal choreography
     ---------------------------------------------------------- */
  function showEverything() {
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el) {
      el.style.visibility = "visible";
    });
    Array.prototype.forEach.call(document.querySelectorAll(".draw-rule"), function (el) {
      el.style.transform = "none";
    });
  }

  function setupMotion() {
    if (!hasGsap || reduced) { showEverything(); return; }

    gsap.registerPlugin(window.ScrollTrigger || {});
    var hasST = typeof window.ScrollTrigger !== "undefined";
    var hasSplit = typeof window.SplitText !== "undefined";

    /* --- The one designed moment: opener arrival ---
       The nav is CSS-sticky chrome and arrives with the page; the
       page head rises in the portfolio's register — small distances,
       quart-family eases, once. */
    var arrival = gsap.timeline({ defaults: { ease: "power3.out" } });

    arrival.set(".page-head .reveal", { visibility: "visible" });

    var openerH1 = document.querySelector(".page-head h1");
    if (openerH1) {
      if (hasSplit) {
        document.fonts.ready.then(function () {
          var split = new SplitText(openerH1, {
            type: "lines", linesClass: "mask-line"
          });
          split.lines.forEach(function (line) {
            var inner = document.createElement("span");
            inner.className = "mask-inner";
            while (line.firstChild) inner.appendChild(line.firstChild);
            line.appendChild(inner);
          });
          gsap.set(openerH1, { visibility: "visible" });
          gsap.from(openerH1.querySelectorAll(".mask-inner"), {
            yPercent: 110, duration: 1.15, ease: "power4.out",
            stagger: 0.09, delay: 0.55
          });
        });
      } else {
        arrival.from(openerH1, { autoAlpha: 0, y: 24, duration: 1.0 }, 0.55);
      }
    }
    arrival.from(".page-head .crumb", { autoAlpha: 0, y: 6, duration: 0.5 }, 0.35);
    arrival.from(".page-head .deck", { autoAlpha: 0, y: 14, duration: 0.8 }, 0.65);
    arrival.from(".page-head .props .prop", {
      autoAlpha: 0, y: 8, duration: 0.5, stagger: 0.06
    }, 0.8);

    /* --- Everything below the fold: quiet, once, single-axis --- */
    if (hasST) {
      var groups = document.querySelectorAll(
        ".front-card, .review-article, .entry, .briefly-card, .era-chapter, .dash-feature, " +
        ".colophon-note, .note-block, .region-section, .about-grid, .pull-quote, .link-row"
      );
      Array.prototype.forEach.call(groups, function (el) {
        gsap.set(el.querySelectorAll(".reveal"), { visibility: "visible" });
        // Filterable elements toggle display; scroll-reveals on them fight
        // the filter and strand rows invisible. Leave them static.
        if (el.hasAttribute("data-filter-item") || el.hasAttribute("data-filter-divider")) return;
        gsap.from(el, {
          autoAlpha: 0, y: 26, duration: 0.9, ease: "power2.out",
          scrollTrigger: {
            trigger: el, start: "top 88%",
            once: true, fastScrollEnd: true
          }
        });
      });

      /* Rubric rules draw in as their section arrives. */
      Array.prototype.forEach.call(document.querySelectorAll(".rubric"), function (el) {
        gsap.from(el, {
          "--rubric-scale": 0,
          scrollTrigger: { trigger: el, start: "top 90%", once: true }
        });
      });

      /* Covers: a slow settle inside their frames. Desktop only. */
      if (window.matchMedia("(min-width: 60rem)").matches) {
        Array.prototype.forEach.call(document.querySelectorAll(".cover-clip img"), function (img) {
          gsap.fromTo(img, { y: -10 }, {
            y: 10, ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.2 }
          });
        });
      }

      /* Shop rows are filterable — no scroll-reveal on them, ever.
         (A pending reveal + a filter toggle = rows stuck invisible.) */

      /* Stat figures count up once, oldstyle and quiet. */
      Array.prototype.forEach.call(document.querySelectorAll(".stat .figure[data-count]"), function (el) {
        var end = parseFloat(el.getAttribute("data-count"));
        var pre = el.getAttribute("data-pre") || "";
        var post = el.getAttribute("data-post") || "";
        var dec = (el.getAttribute("data-count").split(".")[1] || "").length;
        var obj = { v: 0 };
        gsap.to(obj, {
          v: end, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: function () {
            var n = dec ? obj.v.toFixed(dec) : Math.round(obj.v).toLocaleString("en-US");
            el.childNodes[0].nodeValue = pre + n + post;
          }
        });
      });
    } else {
      showEverything();
    }

    /* Safety: anything never touched by a timeline. */
    setTimeout(showEverything, 2600);
  }

  /* ----------------------------------------------------------
     Boot
     ---------------------------------------------------------- */
  function sweepBrokenCovers() {
    queued.forEach(function (img) { window.coverFallback(img); });
    queued = [];
    Array.prototype.forEach.call(document.querySelectorAll("img[data-title]"), function (img) {
      if (img.complete && img.naturalWidth === 0) window.coverFallback(img);
    });
  }

  function boot() {
    sweepBrokenCovers();
    setupNav();
    setupFilters();
    setupMotion();
    window.addEventListener("load", sweepBrokenCovers);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
