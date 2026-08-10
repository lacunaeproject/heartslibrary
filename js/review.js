/* ============================================================
   HEART'S LIBRARY — behavior. No animation libraries: the
   entrance choreography is CSS (see MOTION HELPERS in
   review.css), so content is never gated on a script loading
   or a timeline ticking. This file only wires up chrome —
   nav, dropdowns, mobile menu, filters, cover fallbacks —
   plus one enhancement: the dashboard stat count-up.
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

  /* ----------------------------------------------------------
     Nav: hide on scroll down / show on scroll up, dropdowns
     that open on hover or click and close on Esc / outside
     click / scroll, and the full-screen mobile menu.
     ---------------------------------------------------------- */
  function setupNav() {
    /* The theme follows the sun until someone says otherwise; this
       is the otherwise. The choice is stored, and each page's head
       script re-applies it before paint. */
    Array.prototype.forEach.call(document.querySelectorAll(".theme-toggle"), function (btn) {
      btn.addEventListener("click", function () {
        var dark = document.documentElement.classList.toggle("dark");
        try { localStorage.setItem("hl-theme", dark ? "dark" : "light"); } catch (e) {}
      });
    });

    /* The bar stays put now — hiding it on scroll meant animating a
       transform on a blurred sticky element, which flickered over
       the photo wall. All that's left is the page name fading in
       once you're past the masthead. */
    var nav = document.querySelector(".nav");
    if (nav) {
      var title = nav.querySelector(".nav__scrolltitle");
      if (title) {
        title.classList.toggle("is-visible", window.scrollY > 200);
        window.addEventListener("scroll", function () {
          title.classList.toggle("is-visible", window.scrollY > 200);
        }, { passive: true });
      }
      if (title) {
        title.addEventListener("click", function () {
          window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        });
      }
    }

    /* No switch anymore — the photo pages follow the sun. An inline
       script in each page's <head> computes today's daylight window
       on the visitor's clock and sets html.dark before first paint. */

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
        /* html is the scrolling element here, so locking body alone
           leaves the page scrolling behind the open menu */
        document.body.classList.toggle("menu-locked", openState);
        document.documentElement.classList.toggle("menu-locked", openState);
      };
      burger.addEventListener("click", function () {
        setMobile(!mobile.classList.contains("is-open"));
      });
      /* the menu sits above the bar now, so it carries its own way out */
      var closer = mobile.querySelector(".mobile-menu__close");
      if (closer) closer.addEventListener("click", function () { setMobile(false); });
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
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        apply(btn.getAttribute("data-filter"));
      });
    });
  }

  /* ----------------------------------------------------------
     Stat count-up (dashboards). The markup already holds the
     final value, so this is enhancement only: numbers roll up
     when the row scrolls into view, and a hard timer restores
     the exact original text no matter what.
     ---------------------------------------------------------- */
  function setupCountUp() {
    var figures = document.querySelectorAll(".stat .figure[data-count]");
    if (!figures.length || reduced || !("IntersectionObserver" in window)) return;

    function animate(el) {
      if (el.getAttribute("data-counted")) return;
      el.setAttribute("data-counted", "1");
      var finalText = el.textContent;
      var end = parseFloat(el.getAttribute("data-count"));
      if (isNaN(end)) return;
      var pre = el.getAttribute("data-pre") || "";
      var post = el.getAttribute("data-post") || "";
      var dec = (el.getAttribute("data-count").split(".")[1] || "").length;
      var dur = 1200;
      var t0 = performance.now();
      var done = false;
      function finish() {
        if (done) return;
        done = true;
        el.textContent = finalText;
      }
      function tick(now) {
        if (done) return;
        var p = Math.min((now - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var v = end * eased;
        el.textContent = pre + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-US")) + post;
        if (p < 1) requestAnimationFrame(tick);
        else finish();
      }
      requestAnimationFrame(tick);
      /* Wall-clock backstop: if rAF is throttled or never runs to
         completion, the exact original figure is put back. */
      setTimeout(finish, dur + 800);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    Array.prototype.forEach.call(figures, function (el) { io.observe(el); });
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
    setupCountUp();
    window.addEventListener("load", sweepBrokenCovers);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
