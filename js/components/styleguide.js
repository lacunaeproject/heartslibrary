/* ════════════════════════════════════════════════════════
   COMPONENT — STYLEGUIDE.JS
   Wires up the live demos on styleguide.html. Reads CSS
   custom properties at runtime so every swatch / token
   tracks tokens.css automatically. Powers easing demos,
   duration ramp, scrub demo, replay buttons, curtain demo,
   reduced-motion simulator, dashboard primitives demo.

   Depends on motion.js (HL.motion) and gsap/ScrollTrigger.
   ════════════════════════════════════════════════════════ */

(function () {
  'use strict';
  if (typeof gsap === 'undefined') return;

  const prm = (window.HL && window.HL.motion && window.HL.motion.prefersReducedMotion) || false;

  /* ════════════════════════════════════════════════════════
     COLOR READBACK
     For each --var listed in the swatch markup (data-token),
     compute the actual current value of that variable and write
     it into the .sg-color-hex node. We probe :root directly via
     getComputedStyle on documentElement — the dark-theme probe
     was retired with the dark theme. The .sg-hex-dark / --swatch-dark
     bindings are kept null-safe so the markup can be simplified
     gradually without breaking this readback.
     ════════════════════════════════════════════════════════ */
  function readColorTokens() {
    const rootStyle = getComputedStyle(document.documentElement);

    document.querySelectorAll('.sg-color').forEach((el) => {
      const token = el.dataset.token;
      if (!token) return;
      const val = rootStyle.getPropertyValue(`--${token}`).trim();
      const lHex = el.querySelector('.sg-hex-light');
      const swatch = el.querySelector('.sg-color-swatch');
      if (lHex) lHex.textContent = formatColor(val);
      if (swatch) {
        swatch.style.setProperty('--swatch-light', val);
      }
    });
  }

  function formatColor(val) {
    if (!val) return '—';
    val = val.trim();
    // If it's already a hex, uppercase it
    if (/^#[0-9a-fA-F]{3,8}$/.test(val)) return val.toUpperCase();
    return val;
  }

  /* ════════════════════════════════════════════════════════
     EASING DEMOS
     For each cell with [data-easing], tween the puck across the
     track end-to-end using that easing curve. Replay button
     re-fires. Track the cell width on resize so the tween
     always animates to the rightmost edge minus puck width.
     ════════════════════════════════════════════════════════ */
  function setupEasingDemos() {
    const cells = document.querySelectorAll('.sg-motion-cell[data-easing]');
    cells.forEach((cell) => {
      const easing = cell.dataset.easing;
      const duration = parseFloat(cell.dataset.duration || '1.0');
      const puck = cell.querySelector('.sg-motion-puck');
      const track = cell.querySelector('.sg-motion-track');
      const replay = cell.querySelector('.sg-motion-replay');
      if (!puck || !track) return;

      function play() {
        if (htmlRMSimulated()) {
          gsap.set(puck, { x: 0 });
          return;
        }
        gsap.killTweensOf(puck);
        gsap.set(puck, { x: 0 });
        const trackW = track.getBoundingClientRect().width;
        const puckW = puck.getBoundingClientRect().width;
        gsap.to(puck, {
          x: trackW - puckW - 8,
          duration,
          ease: easing,
          delay: 0.05
        });
      }

      if (replay) replay.addEventListener('click', play);

      // Auto-play on first scroll into view, replay on scroll-back-in
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: cell,
          start: 'top 85%',
          onEnter: play,
          onEnterBack: play
        });
      } else {
        play();
      }
    });
  }

  /* ════════════════════════════════════════════════════════
     DURATION RAMP
     Three pucks in vertically-stacked tracks, all triggered
     by one replay button so the comparison is honest.
     ════════════════════════════════════════════════════════ */
  function setupDurationRamp() {
    const block = document.querySelector('[data-sg-block="duration"]');
    if (!block) return;
    const cells = block.querySelectorAll('.sg-duration-row');
    const replay = block.querySelector('.sg-motion-replay');

    function play() {
      cells.forEach((row) => {
        const puck = row.querySelector('.sg-motion-puck');
        const track = row.querySelector('.sg-motion-track');
        if (!puck || !track) return;
        const dur = parseFloat(row.dataset.duration || '1.0');
        if (htmlRMSimulated()) { gsap.set(puck, { x: 0 }); return; }
        gsap.killTweensOf(puck);
        gsap.set(puck, { x: 0 });
        const trackW = track.getBoundingClientRect().width;
        const puckW = puck.getBoundingClientRect().width;
        gsap.to(puck, {
          x: trackW - puckW - 8,
          duration: dur,
          ease: 'power3.out',
          delay: 0.05
        });
      });
    }
    if (replay) replay.addEventListener('click', play);

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: block,
        start: 'top 80%',
        onEnter: play,
        onEnterBack: play
      });
    } else {
      play();
    }
  }

  /* ════════════════════════════════════════════════════════
     SCRUB DEMO
     Two side-by-side cells. Both tween a "Q" mark from
     yPercent: 100 to yPercent: 0 as the user scrolls past
     the demo. One uses scrub: 0.6 (eased), one uses no scrub
     (toggle, plays once on enter).
     ════════════════════════════════════════════════════════ */
  function setupScrubDemo() {
    if (typeof ScrollTrigger === 'undefined') return;
    const block = document.querySelector('[data-sg-block="scrub"]');
    if (!block) return;
    const scrubMark = block.querySelector('.sg-scrub-cell.is-scrub .sg-scrub-mark');
    const toggleMark = block.querySelector('.sg-scrub-cell.is-toggle .sg-scrub-mark');

    if (scrubMark) {
      gsap.fromTo(scrubMark,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            end: 'bottom 30%',
            scrub: 0.6
          }
        }
      );
    }
    if (toggleMark) {
      gsap.set(toggleMark, { yPercent: 100 });
      ScrollTrigger.create({
        trigger: block,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          if (htmlRMSimulated()) { gsap.set(toggleMark, { yPercent: 0 }); return; }
          gsap.to(toggleMark, { yPercent: 0, duration: 0.9, ease: 'expo.out' });
        },
        onLeaveBack: () => {
          gsap.to(toggleMark, { yPercent: 100, duration: 0.5, ease: 'power2.in' });
        }
      });
    }
  }

  /* ════════════════════════════════════════════════════════
     REDUCED-MOTION SIMULATOR
     Adds html.sg-rm-simulated when on. Most of the demos check
     htmlRMSimulated() and skip animating. Doesn't override
     the actual prefers-reduced-motion media query — it's a
     local simulation for this page only.
     ════════════════════════════════════════════════════════ */
  function htmlRMSimulated() {
    return document.documentElement.classList.contains('sg-rm-simulated');
  }
  function setupRMToggle() {
    const toggle = document.getElementById('sgRMToggle');
    const state = document.getElementById('sgRMState');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const next = !document.documentElement.classList.contains('sg-rm-simulated');
      document.documentElement.classList.toggle('sg-rm-simulated', next);
      toggle.classList.toggle('is-on', next);
      toggle.setAttribute('aria-pressed', String(next));
      if (state) {
        state.textContent = next ? 'Simulating' : 'Off';
        state.classList.toggle('is-on', next);
      }
    });
  }

  /* ════════════════════════════════════════════════════════
     CURTAIN DEMO
     Borrow the global .page-curtain (created by motion.js).
     Slide it up, hold ~700ms, slide it down. No navigation.
     ════════════════════════════════════════════════════════ */
  function setupCurtainDemo() {
    const btn = document.getElementById('sgCurtainPlay');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const curtain = document.querySelector('.page-curtain');
      if (!curtain) return;
      if (htmlRMSimulated() || prm) return;
      curtain.style.transition = 'transform 0.65s cubic-bezier(0.65, 0, 0.35, 1)';
      curtain.classList.remove('down');
      curtain.classList.add('up');
      setTimeout(() => {
        curtain.style.transition = 'transform 0.85s cubic-bezier(0.65, 0, 0.35, 1)';
        curtain.classList.remove('up');
        curtain.classList.add('down');
        setTimeout(() => {
          curtain.style.transition = '';
          curtain.classList.remove('down');
        }, 900);
      }, 750);
    });
  }

  /* ════════════════════════════════════════════════════════
     IMAGE FADE-IN REPLAY
     Force-rewinds the image to the unloaded state and lets
     the natural .img-load-fade transition fire again.
     ════════════════════════════════════════════════════════ */
  function setupImageFadeReplay() {
    const btn = document.getElementById('sgImgReplay');
    const img = document.getElementById('sgImgFrame');
    if (!btn || !img) return;
    // motion.js binds its load listener with { once: true }, so on replay
    // we have to add our own one-shot listener that flips .is-loaded.
    btn.addEventListener('click', () => {
      img.classList.remove('is-loaded');
      img.classList.add('img-load-fade');
      const src = img.dataset.src || img.src;
      img.dataset.src = src;
      const onLoaded = () => {
        img.classList.add('is-loaded');
        img.removeEventListener('load', onLoaded);
        img.removeEventListener('error', onLoaded);
      };
      img.addEventListener('load', onLoaded);
      img.addEventListener('error', onLoaded);
      // Force a fresh fetch (cache-busting) so the load event actually fires
      img.src = '';
      requestAnimationFrame(() => {
        img.src = src + (src.includes('?') ? '&' : '?') + 'r=' + Date.now();
      });
    });
  }

  /* ════════════════════════════════════════════════════════
     DASHBOARD PRIMITIVES — replays
     ════════════════════════════════════════════════════════ */
  function setupDashReplays() {
    // Rule-draw replay
    const ruleBtn = document.getElementById('sgDashRulePlay');
    const ruleCell = document.getElementById('sgDashRuleCell');
    if (ruleBtn && ruleCell) {
      ruleBtn.addEventListener('click', () => {
        if (htmlRMSimulated()) {
          gsap.set(ruleCell, { '--rule-scale': 1 });
          return;
        }
        gsap.killTweensOf(ruleCell);
        gsap.fromTo(ruleCell,
          { '--rule-scale': 0 },
          { '--rule-scale': 1, duration: 1.05, ease: 'power3.out' }
        );
      });
    }

    // Count-up replay — preserves formatting (commas, %, +, T, ×)
    const countBtn = document.getElementById('sgDashCountPlay');
    const countEls = document.querySelectorAll('[data-sg-count]');
    if (countBtn && countEls.length) {
      // Capture original innerHTML once so replays restore decoration
      countEls.forEach((el) => {
        if (!el.dataset.sgOriginal) el.dataset.sgOriginal = el.innerHTML;
      });
      countBtn.addEventListener('click', () => {
        countEls.forEach((el) => {
          const original = el.dataset.sgOriginal;
          const text = el.textContent.trim();
          const match = text.match(/-?\d+(?:[.,]\d+)?/);
          if (!match) return;
          const target = parseFloat(match[0].replace(/,/g, ''));
          const hasDecimal = /\d+\.\d+/.test(original.replace(/<[^>]+>/g, ''));
          const decimalPlaces = hasDecimal
            ? (original.replace(/<[^>]+>/g, '').match(/\.(\d+)/) || [, ''])[1].length
            : 0;
          const hasComma = /\d{1,3},\d{3}/.test(original);
          if (htmlRMSimulated()) {
            el.innerHTML = original;
            return;
          }
          el.innerHTML = original.replace(/-?\d+(?:[.,]\d+)?/, '0');
          const proxy = { n: 0 };
          gsap.killTweensOf(proxy);
          gsap.to(proxy, {
            n: target,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              let formatted;
              if (hasDecimal) formatted = proxy.n.toFixed(decimalPlaces);
              else if (hasComma) formatted = Math.round(proxy.n).toLocaleString('en-US');
              else formatted = String(Math.round(proxy.n));
              el.innerHTML = original.replace(/-?\d+(?:[.,]\d+)?/, formatted);
            }
          });
        });
      });
    }

    // Word-reveal replay — uses HL.splitWords if available
    const wordBtn = document.getElementById('sgDashWordPlay');
    const wordTarget = document.getElementById('sgDashWordTarget');
    if (wordBtn && wordTarget) {
      // Capture original markup once
      if (!wordTarget.dataset.sgOriginal) {
        wordTarget.dataset.sgOriginal = wordTarget.innerHTML;
      }
      wordBtn.addEventListener('click', () => {
        // Restore original then re-split + replay
        wordTarget.innerHTML = wordTarget.dataset.sgOriginal;
        let words = [];
        if (window.HL && window.HL.splitWords) {
          words = window.HL.splitWords(wordTarget);
        }
        if (htmlRMSimulated() || !words.length) {
          if (words.length) gsap.set(words, { yPercent: 0, opacity: 1 });
          return;
        }
        gsap.set(words, { yPercent: 110, opacity: 0 });
        gsap.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.06,
          ease: 'expo.out'
        });
      });
      // Auto-play first time on scroll into view
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: wordTarget,
          start: 'top 85%',
          onEnter: () => wordBtn.click()
        });
      }
    }
  }

  /* ════════════════════════════════════════════════════════
     BOOT
     ════════════════════════════════════════════════════════ */
  function boot() {
    readColorTokens();
    setupEasingDemos();
    setupDurationRamp();
    setupScrubDemo();
    setupRMToggle();
    setupCurtainDemo();
    setupImageFadeReplay();
    setupDashReplays();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
