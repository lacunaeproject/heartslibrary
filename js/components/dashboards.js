/* ════════════════════════════════════════════════════════
   COMPONENT — DASHBOARDS.JS
   Per-card entrance choreography for dashboards.html.
   Each card is a "printed slip" — left-rule draws down, stat
   figures count up from zero, editorial column word-reveals.

   Depends on site.js (HL.splitWords, HL.prefersReducedMotion).
   ════════════════════════════════════════════════════════ */

(function () {
  'use strict';
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const cards = document.querySelectorAll('.dashboard-card');
  if (!cards.length) return;

  const prefersReducedMotion = (window.HL && window.HL.prefersReducedMotion)
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The eyebrow at the top of the dashboards section
  const dashboardsEyebrow = document.querySelector('.dashboards-eyebrow');
  if (dashboardsEyebrow && !prefersReducedMotion) {
    gsap.from(dashboardsEyebrow, {
      opacity: 0, y: 12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: dashboardsEyebrow, start: 'top 88%', toggleActions: 'play none none reverse' }
    });
  }

  cards.forEach((card) => {
    // The figure-by-figure motion is the center of gravity. The big
    // numbers count up as the card scrolls in. For non-numeric figures
    // (e.g. "12 / 36", "$2.7T") we just fade them in — counting them
    // would lie about precision.
    const stats = card.querySelectorAll('.dashboard-stat');
    const figures = card.querySelectorAll('.dashboard-stat-figure');
    const labels = card.querySelectorAll('.dashboard-stat-label');
    const sources = card.querySelectorAll('.dashboard-stat-source');

    const kicker = card.querySelector('.dashboard-kicker');
    const titleEl = card.querySelector('.dashboard-title');
    const deck = card.querySelector('.dashboard-deck');
    const books = card.querySelector('.dashboard-books');
    const cta = card.querySelector('.dashboard-cta');

    // Word-split title — preserves the <em>Casualties</em> styling
    let titleWords = [];
    if (titleEl && window.HL && window.HL.splitWords) {
      titleWords = window.HL.splitWords(titleEl);
    }

    // Capture each figure's display text + numeric target if parseable.
    // This lets the count-up tween restore exactly what was authored
    // in HTML (super/subscripts, "+", "T", "×", "%") at the end.
    const figureMeta = Array.from(figures).map((el) => {
      const original = el.innerHTML;
      // Strip everything but digits, decimals, and minus to get the
      // pure number we'll tween to.
      const text = el.textContent.trim();
      // Supports "30.5%", "75,200+", "$2.7T", "4.3×", "12 / 36", "200+"
      // First numeric token only.
      const match = text.match(/-?\d+(?:[.,]\d+)?/);
      let target = null;
      if (match) {
        target = parseFloat(match[0].replace(/,/g, ''));
        // Cap "12 / 36"-style figures to first number
      }
      return { el, original, target };
    });

    if (prefersReducedMotion) {
      // Reduced motion: jump to final state, no animation
      [stats, labels, sources].forEach((nl) => nl.forEach((el) => gsap.set(el, { opacity: 1, y: 0 })));
      if (titleWords.length) gsap.set(titleWords, { yPercent: 0, opacity: 1 });
      [kicker, deck, books, cta].forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
      gsap.set(card, { '--rule-scale': 1 });
      return;
    }

    // Initial states
    gsap.set(card, { '--rule-scale': 0 });
    if (kicker) gsap.set(kicker, { opacity: 0, y: 10 });
    if (titleWords.length) gsap.set(titleWords, { yPercent: 110, opacity: 0 });
    else if (titleEl) gsap.set(titleEl, { opacity: 0, y: 14 });
    if (deck) gsap.set(deck, { opacity: 0, y: 14 });
    if (books) gsap.set(books, { opacity: 0, y: 12 });
    if (cta) gsap.set(cta, { opacity: 0, y: 10 });
    gsap.set(stats, { opacity: 0, y: 18 });
    figureMeta.forEach(({ el, target, original }) => {
      // Show as zero (with leading style preserved by replacing only
      // the numeric portion) — but only if we successfully parsed a
      // number. Otherwise leave the original markup and let it fade.
      if (target !== null) {
        el.innerHTML = original.replace(/-?\d+(?:[.,]\d+)?/, '0');
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 78%',
        toggleActions: 'play none none reverse'
      }
    });

    // Left rule + card lift
    tl.fromTo(card, { '--rule-scale': 0 }, { '--rule-scale': 1, duration: 1.05, ease: 'power3.out' }, 0);

    // Editorial column first — kicker, title, deck — so the reader
    // knows what they're looking at before the figures resolve.
    if (kicker) tl.to(kicker, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.15);
    if (titleWords.length) {
      tl.to(titleWords, {
        yPercent: 0, opacity: 1,
        duration: 0.95,
        stagger: 0.06,
        ease: 'expo.out'
      }, 0.25);
    } else if (titleEl) {
      tl.to(titleEl, { opacity: 1, y: 0, duration: 0.85, ease: 'expo.out' }, 0.25);
    }
    if (deck) tl.to(deck, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.55);

    // Stats column — fade up rows, then animate the figures.
    // The stagger reads as the data resolving from top to bottom,
    // like a teletype catching up. 90ms between rows feels right —
    // not so fast it's a swarm, not so slow it's a parade.
    tl.to(stats, {
      opacity: 1, y: 0,
      duration: 0.55,
      stagger: 0.09,
      ease: 'power3.out'
    }, 0.45);

    // Each figure counts from 0 → target. We tween a proxy and write
    // the formatted number on every frame, restoring punctuation
    // (commas, decimals) from the original markup.
    figureMeta.forEach(({ el, target, original }, i) => {
      if (target === null) return;
      const proxy = { n: 0 };
      // Detect formatting characteristics from the original
      const hasDecimal = /\d+\.\d+/.test(original.replace(/<[^>]+>/g, ''));
      const decimalPlaces = hasDecimal
        ? (original.replace(/<[^>]+>/g, '').match(/\.(\d+)/) || [, ''])[1].length
        : 0;
      const hasComma = /\d{1,3},\d{3}/.test(original);
      tl.to(proxy, {
        n: target,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          let formatted;
          if (hasDecimal) {
            formatted = proxy.n.toFixed(decimalPlaces);
          } else if (hasComma) {
            formatted = Math.round(proxy.n).toLocaleString('en-US');
          } else {
            formatted = String(Math.round(proxy.n));
          }
          // Replace only the numeric token in the original markup.
          // This keeps "+", "T", "×", super/subscripts intact.
          el.innerHTML = original.replace(/-?\d+(?:[.,]\d+)?/, formatted);
        }
      }, 0.55 + i * 0.08);
    });

    // Books-behind-it bar + CTA — last, so the reader can tap once
    // the data has settled.
    if (books) tl.to(books, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.4);
    if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.55);
  });
})();
