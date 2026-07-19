/* ════════════════════════════════════════════════════════
   Heart's Library — SITE.JS
   Shared system JS used on every page.
   • GSAP + plugin registration, custom ease
   • Theme toggle (theme init IIFE lives in <head> for flash-prevention)
   • Header scroll state
   • Mobile menu (fab + overlay)
   • Universal entrance animations: chapter-title, end-page,
     breadcrumb, note-block — all auto-detect by selector
   • Exposes HL.splitWords, HL.makeDrawable, HL.prefersReducedMotion
   Edit once, every page updates.
   ════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── GSAP setup ──────────────────────────────────────────
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);
    if (typeof CustomEase !== 'undefined') {
      gsap.registerPlugin(CustomEase);
      CustomEase.create('inkIn', 'M0,0 C0.65,0 0.5,1 1,1');
    }
  }

  // ─── Public namespace ────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * splitWords(el)
   * DIY word-splitter that preserves nested elements (em, span, etc.).
   * Returns an array of .word-inner spans (the things you'll tween).
   */
  function splitWords(el) {
    if (!el) return [];
    const innerSpans = [];
    const makeWord = (text, styleTagName, styleClassName) => {
      const word = document.createElement('span');
      word.className = 'word';
      const inner = document.createElement('span');
      inner.className = 'word-inner';
      if (styleTagName) {
        const styled = document.createElement(styleTagName);
        if (styleClassName) styled.className = styleClassName;
        styled.textContent = text;
        inner.appendChild(styled);
      } else {
        inner.textContent = text;
      }
      word.appendChild(inner);
      innerSpans.push(inner);
      return word;
    };
    const processNode = (node, parent, styleTagName = null, styleClassName = null) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const tokens = node.textContent.split(/(\s+)/);
        tokens.forEach(token => {
          if (token === '') return;
          if (/^\s+$/.test(token)) {
            parent.appendChild(document.createTextNode(token));
            return;
          }
          parent.appendChild(makeWord(token, styleTagName, styleClassName));
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Preserve already-wrapped tokens (.word, intentional decorative spans)
        if (node.classList && node.classList.contains('word')) {
          parent.appendChild(node.cloneNode(true));
          return;
        }
        const tag = node.tagName.toLowerCase();
        const cls = node.className || null;
        Array.from(node.childNodes).forEach(child => {
          processNode(child, parent, tag, cls);
        });
      }
    };
    const original = Array.from(el.childNodes);
    el.innerHTML = '';
    original.forEach(child => processNode(child, el));
    return innerSpans;
  }

  /**
   * makeDrawable(el)
   * Marks an element as ready for a left-to-right scaleX draw-in.
   * Pair with `gsap.to(el, { scaleX: 1, ... })` from the initial scaleX:0.
   */
  function makeDrawable(el) {
    if (!el) return null;
    el.classList.add('draw-line');
    return el;
  }

  // Expose
  window.HL = {
    prefersReducedMotion,
    splitWords,
    makeDrawable
  };

  // (Theme toggle retired — site is now light-only. Stale
  // 'hl-theme' values in localStorage from prior sessions are
  // ignored; no read or write happens here anymore.)

  // ─── Nav dropdowns ───────────────────────────────────────
  // CSS handles the open/close on hover (pointer) and focus-within
  // (keyboard tab into a dropdown link). This layer adds:
  //  - Click-to-toggle on the trigger for touch users (no hover).
  //  - Esc-to-close from anywhere inside the dropdown.
  //  - Outside-click closes any open dropdown.
  // The .is-open class lets CSS keep the panel open even after the
  // pointer leaves (matching native menu behavior on tap).
  function setupNavDropdowns() {
    const items = document.querySelectorAll('.nav-item.has-dropdown');
    if (!items.length) return;

    function closeAll(except) {
      items.forEach(it => {
        if (it === except) return;
        if (it.classList.contains('is-open')) {
          it.classList.remove('is-open');
          const tr = it.querySelector('.nav-trigger');
          if (tr) tr.setAttribute('aria-expanded', 'false');
        }
      });
    }

    items.forEach(item => {
      const trigger = item.querySelector('.nav-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', (e) => {
        // Toggle on click — primarily for touch devices where hover
        // doesn't register. Mouse users get the same behavior, which
        // is fine: clicking the trigger pins the menu open.
        e.stopPropagation();
        const isOpen = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) closeAll(item);
      });
      // Esc on the trigger or anywhere inside the dropdown closes.
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          trigger.focus();
        }
      });
    });

    // Outside click closes any open dropdown.
    document.addEventListener('click', (e) => {
      const inside = e.target.closest('.nav-item.has-dropdown');
      if (!inside) closeAll(null);
    });
  }
  setupNavDropdowns();

  // ─── Header scroll state ─────────────────────────────────
  // Two thresholds — strict (default) and chapter-title-aware. On
  // pages with a hero chapter-title the header stays transparent
  // while the headline is in view, so the hero reads as one
  // continuous frame; the moment we clear the headline, the header
  // fills in. On non-hero pages (or any page if the title is
  // missing), the simple 20px threshold applies.
  const header = document.getElementById('header');
  if (header) {
    const heroHeadline = document.querySelector('.chapter-title');
    const onScroll = () => {
      if (heroHeadline) {
        const rect = heroHeadline.getBoundingClientRect();
        if (rect.bottom < 80) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      } else {
        if (window.scrollY > 20) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── Mobile drawer ───────────────────────────────────────
  // The new mobile-nav pattern: a hamburger inside the header
  // opens a right-side drawer (.nav-drawer) over a scrim
  // (.nav-scrim). Replaces the legacy fab+overlay markup.
  // Required behaviors:
  //  - Smooth slide-in / slide-out (CSS handles it)
  //  - Closes on toggle click, scrim click, Esc, or any
  //    nav link click inside the drawer
  //  - Focus is trapped inside the drawer while open
  //  - Focus returns to the toggle button on close
  //  - Body scroll is locked while open
  function setupMobileNav() {
    const toggle = document.getElementById('navToggle');
    const drawer = document.getElementById('navDrawer');
    const scrim = document.getElementById('navScrim');
    if (!toggle || !drawer || !scrim) return;

    let lastFocused = null;

    function getFocusableInDrawer() {
      // Visible tabbable elements only — drawer links + close
      // button. We deliberately exclude any disabled or hidden
      // elements so Tab/Shift+Tab cycle cleanly.
      return Array.from(drawer.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(el => el.offsetParent !== null || el === toggle);
    }

    function open() {
      lastFocused = document.activeElement;
      drawer.classList.add('is-open');
      scrim.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
      // Move focus to the first focusable inside the drawer.
      // Wrapped in rAF so the transform transition starts before
      // the focus shift; otherwise some browsers scroll-restore
      // jitterily.
      requestAnimationFrame(() => {
        const focusables = getFocusableInDrawer();
        if (focusables[0]) focusables[0].focus();
      });
    }

    function close() {
      drawer.classList.remove('is-open');
      scrim.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      // Restore focus — accessibility requirement: the user
      // should land back on the trigger they activated.
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      } else {
        toggle.focus();
      }
    }

    function toggleOpen() {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) close();
      else open();
    }

    toggle.addEventListener('click', toggleOpen);
    scrim.addEventListener('click', close);
    drawer.querySelectorAll('a[href]').forEach(a => {
      a.addEventListener('click', () => close());
    });

    // Esc closes — and the focus-trap loops Tab.
    document.addEventListener('keydown', (e) => {
      if (!drawer.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'Tab') {
        const focusables = getFocusableInDrawer();
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Close on resize-to-desktop in case the user resizes mid-state
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760 && drawer.classList.contains('is-open')) {
        close();
      }
    });
  }
  setupMobileNav();

  // ─── Colophon enrichment ─────────────────────────────────
  // Every page's <div class="end-footer"> gets two rows added
  // beneath it at runtime:
  //  1. .sitemap-row — links to every top-level destination so a
  //     reader can jump anywhere from anywhere (fixes the
  //     styleguide orphan; the header nav owns everything else).
  //  2. .colophon-meta — "Set in Chicago" mark + typeface list,
  //     the New Yorker colophon detail, cut with the Chicago
  //     flag hexagram star.
  // Injecting rather than editing 12 HTML files keeps the pattern
  // consistent — one edit here changes every page.
  const CSTAR_SVG =
    '<svg class="cstar" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
    + '<path d="M12 1 L15.18 6.5 L21.5 6.5 L18.35 12 L21.5 17.5 L15.18 17.5 '
    + 'L12 23 L8.82 17.5 L2.5 17.5 L5.65 12 L2.5 6.5 L8.82 6.5 Z"/></svg>';

  function enrichColophon() {
    const endFooter = document.querySelector('.end-footer');
    if (!endFooter || endFooter.dataset.enriched === '1') return;

    // Detect current page — normalize trailing slash and default
    // to index.html for the root.
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    // The Bookstores destination is a hub — mark it "here" for
    // both the index and every city page so a reader coming from
    // Chicago still recognizes they're in the Bookstores section.
    const isCityPage = /^bookstores-/.test(path);

    const links = [
      { href: 'index.html',      label: 'Home',       match: (p) => p === 'index.html' || p === '' },
      { href: 'fiction.html',    label: 'Fiction',    match: (p) => p === 'fiction.html' },
      { href: 'nonfiction.html', label: 'Nonfiction', match: (p) => p === 'nonfiction.html' },
      { href: 'bookstores.html', label: 'Bookstores', match: (p) => p === 'bookstores.html' || /^bookstores-/.test(p) },
      { href: 'dashboards.html', label: 'Dashboards', match: (p) => p === 'dashboards.html' },
      { href: 'about.html',      label: 'About',      match: (p) => p === 'about.html' },
      { href: 'styleguide.html', label: 'Style Guide', match: (p) => p === 'styleguide.html' }
    ];

    const sitemap = document.createElement('div');
    sitemap.className = 'sitemap-row';
    const parts = ['<span class="sitemap-label">All sections</span>'];
    links.forEach((l, i) => {
      const here = l.match(path) ? ' class="here"' : '';
      parts.push(`<a href="${l.href}"${here}>${l.label}</a>`);
      if (i < links.length - 1) parts.push('<span class="sitemap-sep" aria-hidden="true">·</span>');
    });
    sitemap.innerHTML = parts.join('');

    const colophon = document.createElement('div');
    colophon.className = 'colophon-meta';
    colophon.innerHTML =
      `<span class="set-in"><span class="set-in-text">Heart's Library · A library of one · Est. 2024</span></span>`
      + `<span class="typefaces">Set in Newsreader, Bricolage Grotesque, and JetBrains Mono</span>`;

    endFooter.insertAdjacentElement('afterend', sitemap);
    sitemap.insertAdjacentElement('afterend', colophon);
    endFooter.dataset.enriched = '1';
  }
  enrichColophon();

  // ─── Sticky filter bar ───────────────────────────────────
  // Adds .is-stuck to the bar when its top hits the header.
  // Also computes a body class so the back-to-top can adjust
  // its bottom offset on small screens if needed.
  function setupStickyFilter() {
    const bar = document.querySelector('[data-sticky-filter]');
    if (!bar) return;
    document.body.classList.add('has-sticky-filter');

    // Sentinel element placed BEFORE the bar — when it's no
    // longer in view, the bar is pinned and we add .is-stuck.
    // Cleaner than measuring scroll position because it stays
    // accurate through layout shifts.
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'height:1px;width:100%;pointer-events:none;visibility:hidden;';
    bar.parentNode.insertBefore(sentinel, bar);

    const headerEl = document.getElementById('header');
    const obs = new IntersectionObserver(
      ([entry]) => bar.classList.toggle('is-stuck', !entry.isIntersecting),
      {
        // The header is the visual top — observe with a negative
        // top margin equal to the header height, so the moment the
        // sentinel passes under the header we mark stuck.
        rootMargin: `-${(headerEl?.offsetHeight ?? 64) + 1}px 0px 0px 0px`,
        threshold: 0
      }
    );
    obs.observe(sentinel);
  }
  setupStickyFilter();

  // ─── Back-to-top button ──────────────────────────────────
  // Show after the user scrolls past one viewport height; smooth
  // scroll back on click. The button itself is rendered as
  // `.back-to-top` markup on each page that wants it.
  function setupBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    const SHOW_THRESHOLD = 600; // px scrolled before fading in

    let ticking = false;
    function update() {
      ticking = false;
      const visible = window.scrollY > SHOW_THRESHOLD;
      btn.classList.toggle('is-visible', visible);
      // Hide from screen readers when not interactable.
      if (visible) btn.removeAttribute('aria-hidden');
      else btn.setAttribute('aria-hidden', 'true');
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (window.HL && window.HL.scrollTo) {
        window.HL.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      }
      // Move focus back to the wordmark for accessibility — so
      // keyboard users land at the top of the page logically.
      const wordmark = document.querySelector('.wordmark');
      if (wordmark) wordmark.focus();
    });
  }
  setupBackToTop();

  /* ════════════════════════════════════════════════════════
     UNIVERSAL ENTRANCE ANIMATIONS
     All auto-detect by selector. If the page doesn't have
     a chapter-title, nothing runs — silent no-op.
     ════════════════════════════════════════════════════════ */

  if (typeof gsap === 'undefined') return;

  // ─── Breadcrumb fade ─────────────────────────────────────
  const breadcrumb = document.querySelector('.breadcrumb');

  // ─── Chapter title entrance ──────────────────────────────
  const chapterH2 = document.querySelector('.chapter-title h2');
  let chapterWords = [];
  let chapterAccentWords = [];
  let chapterOtherWords = [];

  if (chapterH2 && typeof SplitText !== 'undefined') {
    try {
      const split = SplitText.create(chapterH2, {
        type: 'lines, words',
        linesClass: 'split-line',
        wordsClass: 'word',
        mask: 'lines'
      });
      chapterWords = split.words;
      chapterAccentWords = chapterWords.filter(w => w.closest('em'));
      chapterOtherWords = chapterWords.filter(w => !w.closest('em'));
    } catch (e) {
      console.warn('[HL] SplitText fell through on chapter-title h2:', e);
    }
  }

  const chapterTitleEl = document.querySelector('.chapter-title');
  const eyebrowEl = chapterTitleEl?.querySelector('.chapter-eyebrow');
  const eyebrowChildren = eyebrowEl ? Array.from(eyebrowEl.children) : [];
  const eyebrowDash = eyebrowEl?.querySelector('.dash');
  const deckEl = chapterTitleEl?.querySelector('.chapter-deck');
  const metaItems = chapterTitleEl?.querySelectorAll('.chapter-meta .item') || [];

  if (chapterTitleEl) {
    if (!prefersReducedMotion) {
      if (breadcrumb) gsap.set(breadcrumb, { opacity: 0, y: 8 });
      eyebrowChildren.forEach(c => {
        if (c === eyebrowDash) gsap.set(c, { scaleX: 0, transformOrigin: 'left center' });
        else gsap.set(c, { opacity: 0, y: 12 });
      });
      if (chapterWords.length) {
        gsap.set(chapterWords, { yPercent: 110 });
        chapterOtherWords.forEach(w => { w.style.fontVariationSettings = '"opsz" 72, "wght" 400'; });
        chapterAccentWords.forEach(w => { w.style.fontVariationSettings = '"opsz" 72, "wght" 400'; });
      }
      if (deckEl) gsap.set(deckEl, { opacity: 0, y: 16 });
      if (metaItems.length) gsap.set(metaItems, { opacity: 0, y: 12 });

      const tl = gsap.timeline({ delay: 0.1 });

      if (breadcrumb) tl.to(breadcrumb, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0);

      eyebrowChildren.forEach((c, i) => {
        if (c === eyebrowDash) {
          tl.to(c, { scaleX: 1, duration: 0.55, ease: 'power2.out' }, 0.3 + i * 0.05);
        } else {
          tl.to(c, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.25 + i * 0.05);
        }
      });
      if (chapterWords.length) {
        tl.to(chapterOtherWords, { yPercent: 0, duration: 1.0, stagger: 0.07, ease: 'power3.out' }, 0.55);
        tl.to(chapterAccentWords, { yPercent: 0, duration: 1.05, stagger: 0.05, ease: 'expo.out' }, 0.95);

        // Per-word weight ink-in for Newsreader (400 → 600)
        chapterOtherWords.forEach((word, i) => {
          const proxy = { wght: 400 };
          tl.to(proxy, {
            wght: 600, duration: 1.1, ease: 'inkIn',
            onUpdate: () => { word.style.fontVariationSettings = `"opsz" 72, "wght" ${proxy.wght.toFixed(0)}`; }
          }, 0.65 + i * 0.06);
        });
        // Accent words overshoot (400 → 750 → 500 italic)
        chapterAccentWords.forEach((word, i) => {
          const proxy = { wght: 400 };
          tl.to(proxy, {
            wght: 750, duration: 0.7, ease: 'power3.out',
            onUpdate: () => { word.style.fontVariationSettings = `"opsz" 72, "wght" ${proxy.wght.toFixed(0)}`; }
          }, 1.05 + i * 0.05);
          tl.to(proxy, {
            wght: 500, duration: 0.4, ease: 'power2.inOut',
            onUpdate: () => { word.style.fontVariationSettings = `"opsz" 72, "wght" ${proxy.wght.toFixed(0)}`; }
          }, 1.75 + i * 0.05);
        });
      }

      if (deckEl) tl.to(deckEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.1);
      if (metaItems.length) tl.to(metaItems, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 1.3);
    } else {
      // Reduced motion: jump to final state
      if (eyebrowDash) eyebrowDash.style.transform = 'scaleX(1)';
      chapterOtherWords.forEach(w => { w.style.fontVariationSettings = '"opsz" 72, "wght" 600'; });
      chapterAccentWords.forEach(w => { w.style.fontVariationSettings = '"opsz" 72, "wght" 500'; });
    }
  }

  // ─── End page / colophon entrance ────────────────────────
  const endStage = document.querySelector('.end-stage');
  const ornament = document.querySelector('.end-stage .ornament');
  const endH2 = document.querySelector('.end-stage h2');
  let endWords = [];
  if (endH2 && typeof SplitText !== 'undefined') {
    try {
      const split = SplitText.create(endH2, {
        type: 'lines, words',
        linesClass: 'split-line',
        wordsClass: 'word',
        mask: 'lines'
      });
      endWords = split.words;
    } catch (e) { /* graceful */ }
  }
  const endPara = document.querySelector('.end-stage p');
  const endLinks = document.querySelectorAll('.end-links a');
  const footerLeft = document.querySelector('.end-footer .left');
  const footerLinks = document.querySelectorAll('.end-footer .right a');
  // Colophon extras injected by enrichColophon() above.
  const sitemapRow = document.querySelector('.sitemap-row');
  const sitemapLinks = document.querySelectorAll('.sitemap-row a');
  const colophonMeta = document.querySelector('.colophon-meta');
  const chiStar = document.querySelector('.colophon-meta .cstar');

  if (endStage && !prefersReducedMotion) {
    if (ornament) gsap.set(ornament, { rotate: -18, scale: 0.6, opacity: 0 });
    if (endWords.length) gsap.set(endWords, { yPercent: 110 });
    if (endPara) gsap.set(endPara, { y: 16, opacity: 0 });
    if (endLinks.length) gsap.set(endLinks, { y: 12, opacity: 0 });
    if (footerLeft) gsap.set(footerLeft, { y: 10, opacity: 0 });
    if (footerLinks.length) gsap.set(footerLinks, { y: 10, opacity: 0 });
    if (sitemapRow) gsap.set(sitemapRow, { y: 10, opacity: 0 });
    if (sitemapLinks.length) gsap.set(sitemapLinks, { y: 8, opacity: 0 });
    if (colophonMeta) gsap.set(colophonMeta, { y: 10, opacity: 0 });
    if (chiStar) gsap.set(chiStar, { rotate: -60, opacity: 0, transformOrigin: 'center center' });

    if (typeof ScrollTrigger !== 'undefined') {
      const endTl = gsap.timeline({
        scrollTrigger: { trigger: endStage, start: 'top 75%', toggleActions: 'play none none reverse' }
      });
      if (ornament) endTl.to(ornament, { rotate: 0, scale: 1, opacity: 1, duration: 1.0, ease: 'back.out(1.4)' }, 0);
      if (endWords.length) endTl.to(endWords, { yPercent: 0, duration: 0.95, stagger: 0.07, ease: 'expo.out' }, 0.3);
      if (endPara) endTl.to(endPara, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 1.0);
      if (endLinks.length) endTl.to(endLinks, { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out' }, 1.2);
      if (footerLeft || footerLinks.length) {
        endTl.to([footerLeft, ...footerLinks].filter(Boolean), {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out'
        }, 1.5);
      }
      if (sitemapRow) endTl.to(sitemapRow, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 1.7);
      if (sitemapLinks.length) endTl.to(sitemapLinks, { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power3.out' }, 1.75);
      if (chiStar) endTl.to(chiStar, { rotate: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.6)' }, 1.9);
      if (colophonMeta) endTl.to(colophonMeta, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 1.85);
    }
  } else if (endStage && prefersReducedMotion) {
    // No transforms needed — CSS defaults are the final state.
    // enrichColophon has already added the markup; nothing to hide.
  }

  // ─── Note block fade ─────────────────────────────────────
  const noteStage = document.querySelector('.note-stage');
  if (noteStage && !prefersReducedMotion && typeof ScrollTrigger !== 'undefined') {
    gsap.set(noteStage, { opacity: 0, y: 18 });
    gsap.to(noteStage, {
      opacity: 1, y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: noteStage, start: 'top 85%', toggleActions: 'play none none reverse' }
    });
  }

  // ─── Universal chapter-title scroll-out parallax ─────────
  // Every page that opens with .chapter-title (about, bookstores,
  // dashboards, fiction, nonfiction, city pages — and the homepage
  // gets its own stronger version inline) gets a soft scrub on
  // the chapter-stage as it leaves the viewport. The headline
  // doesn't snap to the next section — it eases out the top, so
  // the page feels like it has continuous depth.
  // We DON'T apply this to the homepage chapter-title since the
  // inline script there does its own (more dramatic) version.
  const isHomepage = !!document.getElementById('bookPages');
  if (chapterTitleEl && !isHomepage && !prefersReducedMotion && typeof ScrollTrigger !== 'undefined') {
    const stage = chapterTitleEl.querySelector('.chapter-stage');
    if (stage) {
      gsap.to(stage, {
        yPercent: -14,
        opacity: 0.55,
        ease: 'none',
        scrollTrigger: {
          trigger: chapterTitleEl,
          start: 'top top',
          end: 'bottom 30%',
          scrub: 0.6
        }
      });
    }
  }


  // ─── Refresh ScrollTrigger after fonts settle ────────────
  if (typeof ScrollTrigger !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => { ScrollTrigger.refresh(); });
  }

})();
