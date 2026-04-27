/* ════════════════════════════════════════════════════════
   COMPONENT — TIMELINE.JS
   Bookstores-index city-timeline behavior.
   • Per-row left-edge rule draws down (--rule-scale 0→1)
   • Tick on spine draws right (--tick-scale 0→1)
   • Date / tag / headline word reveal / blurb / locale / count
     all stagger in on scroll
   • Shop count climbs from 0 → target as a number stamp
   • Trailer + eyebrow fade
   Depends on site.js (HL.prefersReducedMotion).
   ════════════════════════════════════════════════════════ */

(function () {
  'use strict';
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const cityRows = document.querySelectorAll('.city-row');
  if (!cityRows.length) return;

  const prefersReducedMotion = (window.HL && window.HL.prefersReducedMotion)
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cityRows.forEach((row) => {
    const innerSpans = Array.from(row.querySelectorAll('.city-name .word-inner'));
    const dates = row.querySelector('.city-dates');
    const tag = row.querySelector('.city-tag');
    const blurb = row.querySelector('.city-blurb');
    const shopsCount = row.querySelector('.city-shops .count');
    const shopsLabel = row.querySelector('.city-shops .label');
    const locale = row.querySelector('.city-locale');

    if (prefersReducedMotion) {
      // Reduced motion: jump to final state
      [dates, tag, blurb, shopsCount, shopsLabel, locale].forEach(el => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
      gsap.set(innerSpans, { yPercent: 0 });
      row.style.setProperty('--rule-scale', '1');
      row.style.setProperty('--tick-scale', '1');
      return;
    }

    // Initial state
    gsap.set(innerSpans, { yPercent: 110 });
    [dates, tag, blurb, shopsCount, shopsLabel, locale].forEach(el => {
      if (el) gsap.set(el, { opacity: 0, y: 14 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });

    // Left-edge rule draws down (the chosen motion)
    tl.fromTo(row,
      { '--rule-scale': 0 },
      { '--rule-scale': 1, duration: 1.05, ease: 'power3.out' },
      0);

    // Tick on the spine
    tl.fromTo(row,
      { '--tick-scale': 0 },
      { '--tick-scale': 1, duration: 0.45, ease: 'power2.out' },
      0.55);

    // Date / tag fade up
    if (dates) tl.to(dates, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.25);
    if (tag) tl.to(tag, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.45);

    // Headline word reveal
    if (innerSpans.length) {
      tl.to(innerSpans, {
        yPercent: 0,
        duration: 0.95,
        stagger: 0.07,
        ease: 'expo.out'
      }, 0.4);
    }

    if (blurb) tl.to(blurb, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.85);
    if (locale) tl.to(locale, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.0);

    // Shop count climbs in (number stamp)
    if (shopsCount) {
      const targetNum = parseInt(shopsCount.textContent, 10) || 0;
      const proxy = { n: 0 };
      tl.to(shopsCount, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 1.05);
      tl.to(proxy, {
        n: targetNum,
        duration: 0.9,
        ease: 'power2.out',
        onUpdate: () => { shopsCount.textContent = Math.round(proxy.n); }
      }, 1.05);
    }
    if (shopsLabel) tl.to(shopsLabel, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 1.15);
  });

  // ─── STATUS FILTER ─────────────────────────────────────
  // Bookstores index — filter cities by data-status (past /
  // current / upcoming). Same .btn--filter chips as the rest of
  // the site, same scroll-with-offset behavior as book-list.js.
  const filterBtns = document.querySelectorAll(
    '.btn--filter[data-filter], .list-filter-btn[data-filter]'
  );
  if (filterBtns.length && cityRows.length) {
    function getStickyOffset() {
      const header = document.getElementById('header');
      const filter = document.querySelector('[data-sticky-filter]');
      const headerH = header ? header.offsetHeight : 64;
      const filterH = filter ? filter.offsetHeight : 0;
      return headerH + filterH + 16;
    }

    function isMatch(row, filter) {
      if (filter === 'all') return true;
      return row.dataset.status === filter;
    }

    function hideRow(row) {
      if (row._hl_hidden) return;
      row._hl_hidden = true;
      if (prefersReducedMotion) {
        row.style.display = 'none';
        return;
      }
      gsap.to(row, {
        opacity: 0, y: -10, height: 0,
        paddingTop: 0, paddingBottom: 0,
        marginTop: 0, marginBottom: 0,
        duration: 0.5, ease: 'power3.inOut', overwrite: 'auto'
      });
    }
    function showRow(row) {
      if (!row._hl_hidden) return;
      row._hl_hidden = false;
      if (prefersReducedMotion) {
        row.style.display = '';
        return;
      }
      gsap.to(row, {
        opacity: 1, y: 0, height: 'auto',
        paddingTop: '', paddingBottom: '', marginTop: '', marginBottom: '',
        duration: 0.55, ease: 'power3.out', overwrite: 'auto'
      });
    }

    function applyFilter(filter, opts) {
      const { scroll = true } = opts || {};
      filterBtns.forEach(b => {
        b.setAttribute('aria-pressed', String(b.dataset.filter === filter));
      });
      cityRows.forEach(row => {
        if (isMatch(row, filter)) showRow(row);
        else hideRow(row);
      });
      if (!scroll) return;
      const firstMatch = Array.from(cityRows).find(r => isMatch(r, filter));
      if (firstMatch) {
        gsap.delayedCall(0.45, () => {
          const offset = getStickyOffset();
          const top = firstMatch.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: Math.max(0, top),
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        });
      }
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const wasActive = btn.getAttribute('aria-pressed') === 'true';
        applyFilter(btn.dataset.filter, { scroll: !wasActive });
      });
    });
  }

  // Trailer + eyebrow fade-in
  const trailer = document.querySelector('.timeline-trailer');
  const tlEyebrow = document.querySelector('.timeline-eyebrow');
  if (!prefersReducedMotion) {
    if (tlEyebrow) {
      gsap.from(tlEyebrow, {
        opacity: 0, y: 12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: tlEyebrow, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    }
    if (trailer) {
      gsap.from(trailer, {
        opacity: 0, y: 10,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: trailer, start: 'top 92%', toggleActions: 'play none none reverse' }
      });
    }
  }

})();
