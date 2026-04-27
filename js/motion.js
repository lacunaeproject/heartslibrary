/* ════════════════════════════════════════════════════════
   Heart's Library — MOTION.JS
   Site-wide motion + interaction layer.

   Loads BEFORE site.js so page-specific animation can rely
   on the Lenis-driven scrolling and the HL.motion namespace.

   Modules:
     • Lenis smooth scroll  → tied to GSAP ticker, ScrollTrigger
     • Custom ink cursor    → fine-pointer only, accent dot
     • Magnetic buttons     → opt-in via [data-magnetic]
     • Page-transition curtain → mask the doc on navigation
     • Image fade-in        → lazy-decoded covers fade rather than pop
     • DIY split-words helper (HL.splitWords compatibility)

   Public namespace: window.HL.motion
   ════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';

  /* ════════════════════════════════════════════════════════
     LENIS SMOOTH SCROLL
     Configured for editorial pacing — long, smooth, no spring,
     no rubberband. Mobile uses native touch scroll (Lenis can
     hurt accessibility and momentum on iOS so we skip it on
     coarse pointers and small viewports).
     ════════════════════════════════════════════════════════ */
  let lenis = null;

  function initLenis() {
    // DISABLED — the Lenis interpolation (duration 1.15, lerp 0.085)
    // creates input-lag feel on long pages. The site's scroll rhythm
    // is already carried by GSAP entrance animations on rows/sections;
    // it doesn't need a smooth-scroll layer fighting the wheel input.
    // Re-enable by removing this early return if we ever want to
    // experiment with a snappier config (duration ~0.5, lerp ~0.4).
    return null;

    /* eslint-disable no-unreachable */
    if (prefersReducedMotion) return null;
    if (typeof window.Lenis === 'undefined') return null;
    // Skip on coarse-pointer touch devices — native momentum is
    // better there. Lenis on touch can fight pull-to-refresh and
    // overscroll-anchor, neither of which we want to break.
    if (isCoarsePointer) return null;

    const l = new window.Lenis({
      duration: 1.15,
      // power3-style ease curve — long roll-out, no overshoot.
      // Stripe Press / Linear marketing pacing.
      easing: (t) => 1 - Math.pow(1 - t, 3),
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical'
    });
    lenis = l;
    document.documentElement.classList.add('lenis-smooth');

    // GSAP integration — drive Lenis from gsap.ticker so scroll
    // and animation share the same RAF.
    if (hasGSAP) {
      window.gsap.ticker.add((time) => l.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);
    } else {
      // Fallback RAF loop if GSAP isn't loaded yet
      function raf(time) { l.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    }

    // ScrollTrigger ⇄ Lenis bridge — required so all pinned /
    // scrubbed timelines refresh after Lenis announces a new
    // scroll position. Without this, ScrollTrigger reads the
    // window scroll value but Lenis is interpolating, which
    // de-syncs timelines from on-screen position.
    if (hasScrollTrigger) {
      l.on('scroll', window.ScrollTrigger.update);
      // After all images / fonts load, refresh once more.
      window.ScrollTrigger.defaults({ scroller: window });
    }

    return l;
  }

  /* ════════════════════════════════════════════════════════
     PAGE-TRANSITION CURTAIN
     Inject the curtain element on first paint. Intercept
     same-origin link clicks to slide the curtain up, then
     navigate. On a fresh page load, slide the curtain off
     the top so the new page is revealed.
     ════════════════════════════════════════════════════════ */
  function injectCurtain() {
    if (prefersReducedMotion) return null;
    let el = document.querySelector('.page-curtain');
    if (!el) {
      el = document.createElement('div');
      el.className = 'page-curtain';
      el.setAttribute('aria-hidden', 'true');
      const mark = document.createElement('span');
      mark.className = 'page-curtain-mark';
      mark.textContent = '❦';
      el.appendChild(mark);
      document.body.appendChild(el);
    }
    return el;
  }

  function shouldInterceptNav(a) {
    if (!a) return false;
    if (a.target && a.target !== '_self') return false;
    if (a.hasAttribute('download')) return false;
    if (a.dataset.noTransition === 'true') return false;
    const href = a.getAttribute('href');
    if (!href) return false;
    if (href.startsWith('#')) return false;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    // External hosts get default behavior (we don't curtain external links)
    try {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return false;
      // Same page — no curtain
      if (url.pathname === window.location.pathname && url.search === window.location.search) return false;
    } catch (e) { return false; }
    return true;
  }

  // Session flag — true only when navigation happened via the
  // curtain. Lets the next page know to play the reveal pass.
  const CURTAIN_FLAG = 'hl-curtain-active';
  function setCurtainFlag() {
    try { sessionStorage.setItem(CURTAIN_FLAG, '1'); } catch (e) {}
  }
  function popCurtainFlag() {
    try {
      const v = sessionStorage.getItem(CURTAIN_FLAG);
      if (v) sessionStorage.removeItem(CURTAIN_FLAG);
      return v === '1';
    } catch (e) { return false; }
  }

  function setupCurtain() {
    const curtain = injectCurtain();
    if (!curtain) return;

    const cameViaCurtain = popCurtainFlag();

    if (cameViaCurtain) {
      // We arrived under a curtain — start with it up, drop it.
      curtain.classList.add('up');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          curtain.style.transition = 'transform 0.85s cubic-bezier(0.65, 0, 0.35, 1)';
          curtain.classList.remove('up');
          curtain.classList.add('down');
        });
      });
      setTimeout(() => {
        curtain.style.transition = '';
        curtain.classList.remove('down');
      }, 1100);
    }
    // Otherwise: first visit / direct nav — leave curtain hidden, no flash.

    // Intercept link clicks for outbound nav
    document.addEventListener('click', (e) => {
      // Honor modifier keys / middle click
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a');
      if (!a || !shouldInterceptNav(a)) return;
      e.preventDefault();
      setCurtainFlag();
      // Lift curtain (slides up from bottom to cover)
      curtain.style.transition = 'transform 0.65s cubic-bezier(0.65, 0, 0.35, 1)';
      curtain.classList.remove('down');
      curtain.classList.add('up');
      // Navigate after the curtain has covered the screen
      setTimeout(() => {
        window.location.href = a.href;
      }, 650);
    });

    // Browser back/forward — restore curtain instantly so the user
    // doesn't see a flash of the old page on bfcache restore.
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        // Came from bfcache — drop the curtain (no flicker)
        curtain.style.transition = 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)';
        curtain.classList.remove('up');
        curtain.classList.add('down');
        setTimeout(() => {
          curtain.style.transition = '';
          curtain.classList.remove('down');
        }, 800);
      }
    });
  }

  /* ════════════════════════════════════════════════════════
     CUSTOM INK CURSOR
     One DOM node, transformed via translate3d each mousemove.
     Adds .is-link / .is-text / .is-down classes on hover/click
     to morph between dot, link-pad, and text-bar shapes.
     ════════════════════════════════════════════════════════ */
  function setupCursor() {
    if (prefersReducedMotion) return;
    if (isCoarsePointer) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'ink-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);
    document.body.classList.add('has-ink-cursor');

    // Pre-bind quickTo handlers if GSAP is available — the
    // smoothing reads as *intent* rather than 1-to-1 cursor
    // following, which is editorial-correct (a soft pen, not
    // a laser).
    let setX, setY;
    if (hasGSAP) {
      setX = window.gsap.quickTo(cursor, 'x', { duration: 0.32, ease: 'power3.out' });
      setY = window.gsap.quickTo(cursor, 'y', { duration: 0.32, ease: 'power3.out' });
    } else {
      // Fallback — direct transform, no smoothing
      setX = (v) => { cursor._x = v; updateXY(); };
      setY = (v) => { cursor._y = v; updateXY(); };
      function updateXY() {
        cursor.style.transform = `translate3d(${cursor._x || 0}px, ${cursor._y || 0}px, 0)`;
      }
    }

    let visible = false;
    function showCursor() {
      if (visible) return;
      visible = true;
      cursor.classList.add('is-visible');
    }
    function hideCursor() {
      if (!visible) return;
      visible = false;
      cursor.classList.remove('is-visible');
    }

    window.addEventListener('mousemove', (e) => {
      showCursor();
      setX(e.clientX);
      setY(e.clientY);
    }, { passive: true });

    window.addEventListener('mouseleave', hideCursor);
    window.addEventListener('blur', hideCursor);
    window.addEventListener('mouseenter', showCursor);
    window.addEventListener('mousedown', () => cursor.classList.add('is-down'));
    window.addEventListener('mouseup', () => cursor.classList.remove('is-down'));

    // Delegated state changes — cheaper than per-element listeners
    document.addEventListener('mouseover', (e) => {
      const el = e.target;
      if (!el || !el.closest) return;
      const interactive = el.closest('a, button, [role="button"], [data-magnetic], .tick, .mini, .tbr-book, .city-row, .dashboard-card, .dashboard-cta, .purchase-row, .list-filter-btn');
      const text = el.closest('p, h1, h2, h3, h4, h5, h6, blockquote, .blurb, .review-body, .chapter-deck, .note-body, [data-text-cursor]');
      cursor.classList.toggle('is-link', !!interactive);
      cursor.classList.toggle('is-text', !interactive && !!text);
    });
  }

  /* ════════════════════════════════════════════════════════
     MAGNETIC BUTTONS
     Opt-in via [data-magnetic]. Hover within the bounding box
     and the button + (optional) inner content drift toward the
     cursor, scaled by --magnet-strength. The wrap translates
     more than the inner — that's where the pull illusion
     comes from.

     For best results, wrap the button's content in
     <span class="magnetic-inner">…</span> — JS will animate
     it at half-strength so the label feels independently
     magnetic from the button surface.
     ════════════════════════════════════════════════════════ */
  function setupMagnetic() {
    if (prefersReducedMotion) return;
    if (isCoarsePointer) return;

    const elements = document.querySelectorAll('[data-magnetic]');
    elements.forEach((el) => {
      const strength = parseFloat(el.dataset.magneticStrength || '18'); // px
      const innerStrength = strength * 0.55;
      const inner = el.querySelector('.magnetic-inner');

      // Pre-bind quickTo for sub-frame smoothing if GSAP is around
      let setX, setY, setIX, setIY;
      if (hasGSAP) {
        setX = window.gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
        setY = window.gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });
        if (inner) {
          setIX = window.gsap.quickTo(inner, 'x', { duration: 0.55, ease: 'power3.out' });
          setIY = window.gsap.quickTo(inner, 'y', { duration: 0.55, ease: 'power3.out' });
        }
      } else {
        const apply = (node) => {
          node.style.transform = `translate3d(${node._x || 0}px, ${node._y || 0}px, 0)`;
        };
        setX = (v) => { el._x = v; apply(el); };
        setY = (v) => { el._y = v; apply(el); };
        if (inner) {
          setIX = (v) => { inner._x = v; apply(inner); };
          setIY = (v) => { inner._y = v; apply(inner); };
        }
      }

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Normalize -1..1 within rect
        const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
        const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
        setX(nx * strength);
        setY(ny * strength);
        if (inner) {
          setIX(nx * innerStrength);
          setIY(ny * innerStrength);
        }
      });

      el.addEventListener('mouseleave', () => {
        setX(0); setY(0);
        if (inner) { setIX(0); setIY(0); }
      });
    });
  }

  /* ════════════════════════════════════════════════════════
     IMAGE FADE-IN
     Tag every <img> with the warm-up class on first paint;
     when the image decodes, swap to .is-loaded so it eases
     in. Defers gracefully — already-loaded images flip
     immediately.
     ════════════════════════════════════════════════════════ */
  function setupImageFades() {
    if (prefersReducedMotion) return;
    const imgs = document.querySelectorAll('img:not([data-no-fade])');
    imgs.forEach((img) => {
      img.classList.add('img-load-fade');
      const markLoaded = () => img.classList.add('is-loaded');
      if (img.complete && img.naturalWidth > 0) {
        markLoaded();
      } else {
        img.addEventListener('load', markLoaded, { once: true });
        img.addEventListener('error', markLoaded, { once: true });
      }
    });
    // Also scan dynamically-added images via MutationObserver — the
    // homepage injects all 10 covers + TBR covers from JS after
    // motion.js has run.
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const newImgs = n.tagName === 'IMG' ? [n] : n.querySelectorAll ? n.querySelectorAll('img:not([data-no-fade])') : [];
          newImgs.forEach((img) => {
            if (img.classList.contains('img-load-fade')) return;
            img.classList.add('img-load-fade');
            const markLoaded = () => img.classList.add('is-loaded');
            if (img.complete && img.naturalWidth > 0) markLoaded();
            else {
              img.addEventListener('load', markLoaded, { once: true });
              img.addEventListener('error', markLoaded, { once: true });
            }
          });
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  /* ════════════════════════════════════════════════════════
     READING PROGRESS BAR
     A hairline at the very top of the viewport that fills as
     the user scrolls through the document. We rAF-throttle the
     scaleX update so we never write transform more than once
     per frame even if Lenis fires multiple scroll events.
     ════════════════════════════════════════════════════════ */
  function setupReadingProgress() {
    if (prefersReducedMotion) return;
    const wrap = document.createElement('div');
    wrap.className = 'reading-progress';
    wrap.setAttribute('aria-hidden', 'true');
    const bar = document.createElement('div');
    bar.className = 'reading-progress-bar';
    wrap.appendChild(bar);
    document.body.appendChild(wrap);

    let pending = false;
    function update() {
      pending = false;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? Math.max(0, Math.min(1, window.scrollY / docH)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    }
    function schedule() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    if (lenis) lenis.on('scroll', schedule);
    update();
  }

  /* ════════════════════════════════════════════════════════
     DECORATE INTERACTIVE ELEMENTS
     Wrap the theme toggle and key end-link CTAs in magnetic
     affordance automatically — saves having to mark them up
     in every HTML page.
     ════════════════════════════════════════════════════════ */
  function decorateMagnetic() {
    // (Theme-toggle magnetic decoration retired with the toggle.)
    // Mobile menu fab — likewise
    const fab = document.getElementById('menuFab');
    if (fab && !fab.hasAttribute('data-magnetic')) {
      fab.setAttribute('data-magnetic', '');
      fab.dataset.magneticStrength = '10';
    }
    // Wordmark — gentle pull
    const wordmark = document.querySelector('.wordmark');
    if (wordmark && !wordmark.hasAttribute('data-magnetic')) {
      wordmark.setAttribute('data-magnetic', '');
      wordmark.dataset.magneticStrength = '4';
    }
  }

  /* ════════════════════════════════════════════════════════
     PUBLIC NAMESPACE
     Exposes Lenis + helpers so component code can opt in
     (e.g. scroll-to with eased duration).
     ════════════════════════════════════════════════════════ */
  function scrollTo(target, options) {
    if (lenis) {
      lenis.scrollTo(target, Object.assign({ duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 3) }, options || {}));
      return;
    }
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  window.HL = window.HL || {};
  window.HL.motion = {
    prefersReducedMotion,
    isCoarsePointer,
    get lenis() { return lenis; },
    scrollTo
  };

  /* ════════════════════════════════════════════════════════
     BOOT
     Lenis goes first so ScrollTrigger sees it wired. Then
     decorate, then setup interactions, then images, then
     curtain (which also does the page-load reveal).
     ════════════════════════════════════════════════════════ */
  function boot() {
    initLenis();
    decorateMagnetic();
    setupCursor();
    setupMagnetic();
    setupImageFades();
    setupReadingProgress();
    setupCurtain();

    // Refresh ScrollTrigger after fonts settle — gives SplitText
    // the right metrics, gives ScrollTrigger the right page heights.
    if (hasScrollTrigger && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { window.ScrollTrigger.refresh(); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
