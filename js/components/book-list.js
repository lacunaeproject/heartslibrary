/* ════════════════════════════════════════════════════════
   COMPONENT — BOOK-LIST.JS
   Behavior shared by every book-list page (fiction.html,
   nonfiction.html, future themed lists).

   • Genre filter — uses .btn--filter chip buttons with
     aria-pressed as the source-of-truth active state.
   • On filter change: collapse non-matching rows, then
     smooth-scroll the FIRST matching row into view (just
     below the sticky nav + filter bar — offset accounts
     for both heights).
   • Per-row entrance reveals on scroll.
   • Live count in trailer updates per filter.

   Depends on site.js (HL.prefersReducedMotion).
   Filter row markup uses the new .sticky-filter component.
   ════════════════════════════════════════════════════════ */

(function () {
  'use strict';
  if (typeof gsap === 'undefined') return;
  const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';

  const prefersReducedMotion = (window.HL && window.HL.prefersReducedMotion)
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Both the new (.btn--filter) and legacy (.list-filter-btn)
  // selectors are queried so the migration to the new chip-button
  // style on each page is non-blocking.
  const filterBtns = document.querySelectorAll(
    '.btn--filter[data-filter], .list-filter-btn[data-filter]'
  );
  const allBooks = Array.from(document.querySelectorAll('.book-row'));
  const liveCountEls = document.querySelectorAll('[data-live-count]');

  if (!filterBtns.length || !allBooks.length) return;

  /* ─── FILTER ─────────────────────────────────────────────
     Click filter → fade-up reflow non-matching books, then
     smooth-scroll to the first match.
  ──────────────────────────────────────────────────────── */
  function isMatch(book, filter) {
    if (filter === 'all') return true;
    return book.dataset.genre === filter;
  }

  function hideBook(book) {
    if (book._hl_hidden) return;
    book._hl_hidden = true;
    if (prefersReducedMotion) {
      book.style.display = 'none';
      return;
    }
    gsap.to(book, {
      opacity: 0,
      y: -10,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.5,
      ease: 'power3.inOut',
      overwrite: 'auto'
    });
  }

  function showBook(book) {
    if (!book._hl_hidden) return;
    book._hl_hidden = false;
    if (prefersReducedMotion) {
      book.style.display = '';
      return;
    }
    gsap.to(book, {
      opacity: 1,
      y: 0,
      height: 'auto',
      paddingTop: '',
      paddingBottom: '',
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  }

  function updateLiveCount(filter) {
    const visibleBooks = allBooks.filter(b => isMatch(b, filter));
    liveCountEls.forEach(el => {
      el.textContent = String(visibleBooks.length);
    });
  }

  // Total offset above content = header height + sticky filter
  // height. Gives us the precise "land just below the chrome"
  // target so the first book isn't hidden behind the bar.
  function getStickyOffset() {
    const header = document.getElementById('header');
    const filter = document.querySelector('[data-sticky-filter]');
    const headerH = header ? header.offsetHeight : 64;
    const filterH = filter ? filter.offsetHeight : 0;
    // Add a small visual breathing-room margin above the row.
    return headerH + filterH + 16;
  }

  function scrollToFirstMatch(filter) {
    const firstMatch = allBooks.find(b => isMatch(b, filter));
    if (!firstMatch) return;
    // Wait for the layout to settle from the hide tweens before
    // measuring; otherwise the row's getBoundingClientRect can
    // be wrong by the height of the rows we just collapsed.
    gsap.delayedCall(0.45, () => {
      const offset = getStickyOffset();
      const rect = firstMatch.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - offset;
      const reduced = prefersReducedMotion;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: reduced ? 'auto' : 'smooth'
      });
    });
  }

  function applyFilter(filter, opts) {
    const { scroll = true } = opts || {};
    filterBtns.forEach(b => {
      b.setAttribute('aria-pressed', String(b.dataset.filter === filter));
    });

    allBooks.forEach(book => {
      if (isMatch(book, filter)) showBook(book);
      else hideBook(book);
    });

    updateLiveCount(filter);

    if (hasScrollTrigger && !prefersReducedMotion) {
      gsap.delayedCall(0.6, () => ScrollTrigger.refresh());
    }

    if (scroll) scrollToFirstMatch(filter);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      // Re-clicking the active filter is a no-op (don't re-scroll).
      const wasActive = btn.getAttribute('aria-pressed') === 'true';
      applyFilter(filter, { scroll: !wasActive });
    });
    // Make sure keyboard activation behaves identically to click.
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        // The native button behavior fires click on Enter/Space,
        // but Space scrolls the page by default — preventing it.
        if (e.key === ' ') e.preventDefault();
      }
    });
  });

  /* ─── ENTRANCE REVEALS ───────────────────────────────────
     Each book-row staggers in on scroll — cover fades up,
     title word-reveals (DIY split via splitWords), author/
     blurb/footer fade up sequenced.
  ──────────────────────────────────────────────────────── */
  if (!prefersReducedMotion && hasScrollTrigger) {
    allBooks.forEach(book => {
      const cover = book.querySelector('.book-cover-wrap');
      const title = book.querySelector('.book-title');
      const author = book.querySelector('.book-author');
      const blurb = book.querySelector('.book-blurb');
      const footer = book.querySelector('.book-footer');

      let titleWords = [];
      if (title && window.HL && window.HL.splitWords) {
        titleWords = window.HL.splitWords(title);
      }

      if (cover) gsap.set(cover, { opacity: 0, y: 16 });
      if (titleWords.length) {
        gsap.set(titleWords, { yPercent: 105, opacity: 0 });
      } else if (title) {
        gsap.set(title, { opacity: 0, y: 12 });
      }
      [author, blurb, footer].forEach(el => {
        if (el) gsap.set(el, { opacity: 0, y: 12 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: book,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.to(cover, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0);

      if (titleWords.length) {
        tl.to(titleWords, {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.04,
          ease: 'expo.out'
        }, 0.2);
      } else if (title) {
        tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.2);
      }

      tl.to(author, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.4);
      tl.to(blurb, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.5);
      tl.to(footer, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.65);
    });
  }

  /* ─── INITIAL LIVE COUNT ─────────────────────────────── */
  updateLiveCount('all');

})();
