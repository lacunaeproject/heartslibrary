/* ════════════════════════════════════════════════════════
   COMPONENT — CITY-PAGE.JS
   Behavior shared by every per-city bookstores page
   (LA, Bay Area, NY, Nashville, Chicago).
   • Region filter (typeset; click → dim non-matching + scroll)
   • Region & shop entrance reveals (eyebrow, headrow, source,
     shops stagger)
   • Active region scroll-tracking when "All" is selected
   • Credit block reveal
   • Next-city pointer reveal (rule draw-down + content fade)
   Depends on site.js (HL.prefersReducedMotion).
   ════════════════════════════════════════════════════════ */

(function () {
  'use strict';
  if (typeof gsap === 'undefined') return;
  const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
  if (!hasScrollTrigger) return;

  const prefersReducedMotion = (window.HL && window.HL.prefersReducedMotion)
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── REGION FILTER ───────────────────────────────────────
  // Filter buttons carry data-filter="all|<region>". Both the new
  // .btn--filter chips and the legacy .list-filter-btn typeset
  // buttons are queried so the migration is non-blocking.
  // .region-block elements carry data-region="<region>" — that's the
  // thing being filtered. Same for .shop-entry data-region.
  const filterBtns = document.querySelectorAll(
    '.btn--filter[data-filter], .list-filter-btn[data-filter]'
  );
  const regionBlocks = document.querySelectorAll('.region-block');
  const allShops = document.querySelectorAll('.shop-entry');

  // Total offset above content = header + sticky filter heights.
  // Reading them live ensures the offset stays correct even if
  // the filter bar's height shifts (wraps to multi-line on narrow
  // viewports, etc.).
  function getStickyOffset() {
    const header = document.getElementById('header');
    const filter = document.querySelector('[data-sticky-filter]');
    const headerH = header ? header.offsetHeight : 64;
    const filterH = filter ? filter.offsetHeight : 0;
    return headerH + filterH + 16;
  }

  function applyFilter(filter, opts) {
    const { scroll = true } = opts || {};
    filterBtns.forEach(b => {
      b.setAttribute('aria-pressed', String(b.dataset.filter === filter));
    });

    if (filter === 'all') {
      regionBlocks.forEach(rb => rb.classList.remove('dimmed'));
      if (!prefersReducedMotion) {
        gsap.to(allShops, {
          opacity: 1, y: 0,
          duration: 0.45,
          stagger: 0.02,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      } else {
        allShops.forEach(s => { s.style.opacity = '1'; });
      }
      return;
    }

    regionBlocks.forEach(rb => {
      const isMatch = rb.dataset.region === filter;
      rb.classList.toggle('dimmed', !isMatch);
    });

    if (!prefersReducedMotion) {
      const matched = document.querySelectorAll(`.region-block[data-region="${filter}"] .shop-entry`);
      gsap.fromTo(matched,
        { opacity: 0.4, y: 6 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out', overwrite: 'auto' }
      );
    }

    if (!scroll) return;

    const target = document.getElementById(`region-${filter}`);
    if (target) {
      // Wait for any reflow from the filter to settle, then measure
      // and scroll. Offset = header + sticky filter + breathing
      // room — the same formula book-list uses, so the visual
      // result feels uniform across list pages.
      gsap.delayedCall(0.1, () => {
        const offset = getStickyOffset();
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        if (window.HL && window.HL.motion && window.HL.motion.lenis) {
          window.HL.motion.lenis.scrollTo(target, { offset: -offset, duration: 1.2 });
        } else {
          window.scrollTo({
            top: Math.max(0, top),
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      });
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const wasActive = btn.getAttribute('aria-pressed') === 'true';
      applyFilter(btn.dataset.filter, { scroll: !wasActive });
    });
  });

  // ─── REGION & SHOP ENTRANCE REVEALS ─────────────────────
  if (!prefersReducedMotion) {
    regionBlocks.forEach(rb => {
      const eyebrow = rb.querySelector('.region-eyebrow');
      const eyebrowDash = rb.querySelector('.region-eyebrow .dash');
      const name = rb.querySelector('.region-name');
      const source = rb.querySelector('.region-source');
      const shops = rb.querySelectorAll('.shop-entry');

      if (eyebrow) {
        Array.from(eyebrow.children).forEach(c => {
          if (c === eyebrowDash) gsap.set(c, { scaleX: 0, transformOrigin: 'left center' });
          else gsap.set(c, { opacity: 0, y: 8 });
        });
      }
      if (name) gsap.set(name, { opacity: 0, y: 14 });
      if (source) gsap.set(source, { opacity: 0, y: 8 });
      gsap.set(shops, { opacity: 0, y: 18 });

      const rtl = gsap.timeline({
        scrollTrigger: {
          trigger: rb,
          start: 'top 78%',
          toggleActions: 'play none none reverse'
        }
      });

      if (eyebrow) {
        Array.from(eyebrow.children).forEach((c, i) => {
          if (c === eyebrowDash) {
            rtl.to(c, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, i * 0.05);
          } else {
            rtl.to(c, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, i * 0.05);
          }
        });
      }
      if (name) rtl.to(name, { opacity: 1, y: 0, duration: 0.85, ease: 'expo.out' }, 0.2);
      if (source) rtl.to(source, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.4);
      rtl.to(shops, {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out'
      }, 0.5);
    });
  }

  // ─── ACTIVE REGION TRACKING (when "All" is selected) ────
  function syncActiveBtn(region) {
    // Both selectors so the legacy typeset filter and the new
    // .btn--filter chip both pick up the scroll-active highlight.
    const allActive = document.querySelector(
      '.btn--filter[data-filter="all"][aria-pressed="true"], ' +
      '.list-filter-btn[data-filter="all"][aria-pressed="true"]'
    );
    if (allActive) {
      filterBtns.forEach(b => b.classList.toggle('scroll-active', b.dataset.filter === region));
    }
  }

  if (!prefersReducedMotion) {
    regionBlocks.forEach(rb => {
      ScrollTrigger.create({
        trigger: rb,
        start: 'top 35%',
        end: 'bottom 35%',
        onEnter: () => syncActiveBtn(rb.dataset.region),
        onEnterBack: () => syncActiveBtn(rb.dataset.region)
      });
    });
  }

  // ─── CREDIT BLOCK REVEAL ────────────────────────────────
  const creditBlock = document.querySelector('.credit-block');
  if (creditBlock && !prefersReducedMotion) {
    gsap.fromTo(creditBlock,
      { opacity: 0, y: 24, scale: 0.99 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: { trigger: creditBlock, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
  }

  // ─── NEXT-CITY POINTER REVEAL ───────────────────────────
  const nextRow = document.getElementById('nextCityRow') || document.querySelector('.next-city-row');
  if (nextRow && !prefersReducedMotion) {
    gsap.fromTo(nextRow,
      { '--rule-scale': 0 },
      {
        '--rule-scale': 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: nextRow, start: 'top 85%', toggleActions: 'play none none reverse' }
      });

    const nextChildren = [
      nextRow.querySelector('.next-city-label'),
      nextRow.querySelector('.next-city-name'),
      nextRow.querySelector('.next-city-blurb'),
      nextRow.querySelector('.next-city-arrow')
    ].filter(Boolean);
    if (nextChildren.length) {
      gsap.set(nextChildren, { opacity: 0, y: 12 });
      gsap.to(nextChildren, {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: nextRow, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    }
  }

})();
