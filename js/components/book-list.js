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

  /* ─── REVIEW MODAL ────────────────────────────────────────
     A "Read full review" button on each row opens the singleton
     #bookModal and populates it from the row's cover, title,
     author, and .blurb-body content. The modal also renders a
     bordered purchase table (Kobo / bookstore / Libby) and an
     About-the-Author block (name + bio looked up from the map
     below). Closes via the floating close button or Escape.
  ──────────────────────────────────────────────────────── */

  // Author bios, keyed by the exact text inside .book-author a.
  // Authors with multiple books on the lists share one bio. Bios
  // for books that exist on the homepage are ported from there;
  // others are clipped factual paragraphs in the same register.
  const AUTHOR_BIOS = {
    "Larry McMurtry": "Texas writer who turned out novels at industrial pace from 1961 until his death in 2021. <em>Lonesome Dove</em> was the masterpiece, but the smaller Texas books — <em>The Last Picture Show</em>, <em>Terms of Endearment</em> — are where his prose voice lives most clearly. Also ran a famous antiquarian bookstore in Archer City for decades.",
    "Barbara Kingsolver": "Kentuckian, biologist by training, has been publishing novels since 1988. <em>Demon Copperhead</em> won her a second Pulitzer. <em>The Poisonwood Bible</em> is the one that made her name. Writes the rural American landscape with the patience of a field naturalist who's also an angry one.",
    "John Williams": "Texas-born, taught literature at the University of Denver for thirty years. Wrote four novels that almost nobody read while he was alive. <em>Stoner</em> was rediscovered in 2003 — twenty years after his death — and has since become one of the great recovered novels of the century.",
    "John Steinbeck": "Salinas Valley by birth, Nobel laureate by 1962. Spent his career writing about working people in California — fruit pickers, ranch hands, displaced families — and made the case for them in prose plain enough to be quoted in church. <em>East of Eden</em> is his widest canvas.",
    "James Baldwin": "Born 1924 in Harlem, died 1987 in Saint-Paul-de-Vence. Wrote with the rhythm of a Pentecostal preacher and the precision of a French essayist. Probably the most important American prose stylist of the twentieth century, and the model for what an essayist who was also a citizen could sound like.",
    "Andy Weir": "Software engineer who self-published <em>The Martian</em> as a serial on his blog before it became a movie. Writes hard-science thrillers for people who want the math to actually work. Lives in California and apparently still does the orbital calculations himself.",
    "Michael Crichton": "Harvard-trained MD turned techno-thriller writer. Spent the 1970s through the 90s writing books that took emerging technology seriously as a political problem. Died 2008. His best work — <em>Jurassic Park</em>, <em>The Andromeda Strain</em>, <em>State of Fear</em> — reads as research-driven argumentation in thriller costume.",
    "Pierce Brown": "California-born, started <em>Red Rising</em> as an unpublished manuscript in his early twenties. Finished the original trilogy by 2014, then kept going. Reads classics seriously — Roman, Greek, Old Testament — and you can see the source material in the series's political theology. Lives in Los Angeles.",
    "Frank Herbert": "Tacoma-born, ex-newspaperman. Spent six years researching <em>Dune</em>, which started as a magazine piece on the Oregon Dunes. Died 1986. The first book is the only one of the series most general readers finish — but the deeper political and theological argument plays out across the next five.",
    "Christopher Ruocchio": "Younger writer working in the Wolfe / Vance lineage of literary science fiction. Edits anthologies for Baen alongside the Sun Eater series, and writes about the influence of classical and medieval material on modern genre. The series is still ongoing.",
    "Stephen King": "Maine-born, has been the most-published American novelist since the late 1970s. Writes horror but has spent his career arguing, through both fiction and nonfiction, that the genre is a serious vehicle for thinking about American life. Still publishing.",
    "Susanna Clarke": "British, spent the early 2000s writing <em>Jonathan Strange &amp; Mr Norrell</em>. Was diagnosed with chronic fatigue syndrome shortly after; sixteen years passed before <em>Piranesi</em>. Clarke has been clear that the illness is part of how the second book exists at all. Writes carefully and rarely.",
    "Taylor Jenkins Reid": "Maryland-born, lives in Los Angeles. Built her reputation on celebrity-life period novels — <em>Daisy Jones</em>, <em>Evelyn Hugo</em>, <em>Carrie Soto</em>, <em>Malibu Rising</em>, <em>Atmosphere</em> — that share a loose continuity. Co-runs Best Case Studios, the production company that adapted <em>Daisy Jones</em> for Amazon.",
    "Gabrielle Zevin": "Korean-Jewish-American novelist born in New York. <em>A.J. Fikry</em> was the breakout. <em>Tomorrow, and Tomorrow, and Tomorrow</em>, about two video game designers, was the bigger 2022 hit. Writes books that take small subjects seriously and trusts the reader to take them with her.",

    "Rashid Khalidi": "Palestinian-American historian, Edward Said Professor of Modern Arab Studies at Columbia until 2020. Member of one of Jerusalem's oldest scholar families — his great-great-uncle was the mayor who wrote to Theodor Herzl in 1899. <em>The Hundred Years' War</em> is the career-summarizing book.",
    "Plestia Alaqad": "Palestinian journalist born in Gaza. Reported daily through the early months of the Israeli bombardment beginning October 2023, on Instagram and Telegram, when most international press was barred. The diary collected here was written in real time. Now living in exile.",
    "Theodor Herzl": "Austro-Hungarian Jewish journalist who covered the Dreyfus Affair for a Vienna newspaper in 1894. The trial radicalized him into political organization. Spent the next decade building the institutions that became the Zionist movement. Died in 1904, more than four decades before the founding of the state he proposed.",
    "Mohammed El-Kurd": "Palestinian poet and journalist born in East Jerusalem. Came to international attention as a teenager defending his family's home in Sheikh Jarrah from Israeli settler eviction. <em>Time</em> 100 in 2021. Writes from inside the political situation he's describing.",
    "Antony Loewenstein": "Australian-German Jewish journalist. Has spent his career documenting how disaster, surveillance, and military technology get exported between regimes. Lives between Sydney and East Jerusalem. The Walkley Book Award is Australia's most prestigious journalism prize.",
    "Lawrence Wright": "Texas-born <em>New Yorker</em> staff writer. Reports book-length nonfiction on subjects most reporters won't touch — Al-Qaeda, Scientology, the Saudi state. Also writes plays and screenplays. <em>The Looming Tower</em> won the Pulitzer; the FX adaptation in 2018 was fine, the book is the thing.",
    "Ta-Nehisi Coates": "Atlantic essayist turned novelist, born in Baltimore. The reparations essay (2014) is the piece of magazine writing his generation will be remembered for. He's been writing in book-length form since, working out the same questions about American history at greater range.",
    "Omar El Akkad": "Egyptian-Canadian novelist and former war reporter, now based in Portland. Spent his early career covering Guantánamo, Afghanistan, and the Black Lives Matter movement for the Globe and Mail. <em>American War</em> (2017) was the first novel; <em>What Strange Paradise</em> won the Giller. <em>One Day</em> is his first book of nonfiction.",
    "Solomon Northup": "A free Black man kidnapped from Saratoga Springs in 1841 and held in Louisiana bondage for twelve years. After his release he became an abolitionist speaker and witness in the trial of his kidnappers — they were acquitted. He disappeared from the historical record around 1857. No one knows where or how he died.",
    "Frederick Douglass": "Born into slavery on a Maryland plantation around 1818. Escaped at twenty, became the most prominent Black abolitionist orator of his time, wrote three autobiographies, advised Lincoln, served as US Marshal, and ran a newspaper in Rochester for sixteen years. Died in 1895. The skeleton of American Black political thought is his.",
    "Nikole Hannah-Jones": "Iowa-born investigative journalist, MacArthur Fellow, Pulitzer winner. Founded the Center for Journalism and Democracy at Howard after the University of North Carolina denied her tenure under political pressure in 2021. The 1619 Project began as a Times Magazine special issue and is now a book, podcast, and TV series.",
    "Ibram X. Kendi": "Born in Queens. Historian, founder of the BU Center for Antiracist Research. Wrote <em>Stamped from the Beginning</em> (2016), which won the National Book Award and is the more rigorous of his two big books. <em>Antiracist</em> is the better-selling one. Has been the most public face of one strand of US racial politics since 2019.",
    "Bryan Stevenson": "Delaware-born, Harvard-trained lawyer. Founded the Equal Justice Initiative in 1989 and has been representing death-row inmates and wrongfully convicted people in Alabama for over thirty-five years. Built the National Memorial for Peace and Justice in Montgomery — the first US memorial to lynching victims.",
    "Michelle Alexander": "Civil-rights lawyer, ACLU veteran, currently Visiting Professor at Union Theological Seminary. <em>The New Jim Crow</em> made her the most-read American writer on mass incarceration and reshaped how the issue gets discussed across the political spectrum. Has stayed mostly out of the celebrity-academic circuit since.",
    "Martin Luther King Jr.": "Atlanta-born Baptist minister, civil-rights movement leader, Nobel Peace laureate at thirty-five. Assassinated in Memphis in 1968 at thirty-nine. The speeches are the public record; the letters and the strategic correspondence are where the political theory lives. <em>Letter from Birmingham Jail</em> is the most underread of those.",
    "Malcolm X, as told to Alex Haley": "Born Malcolm Little in Omaha, 1925. Hustler, prison convert, Nation of Islam minister, Muslim pilgrim, civil-rights speaker. Assassinated in Manhattan in 1965, two weeks before his thirty-ninth birthday. The autobiography, dictated to Alex Haley over two years of interviews, is the primary source.",
    "Anthony Ray Hinton": "Born in 1956 in Praco, Alabama. Spent thirty years on Alabama's death row for a crime he didn't commit. Released in 2015 after the EJI took his case to the Supreme Court. Now travels speaking against the death penalty. The memoir is the only book.",
    "W. E. B. Du Bois": "Massachusetts-born, first Black PhD from Harvard. Co-founded the NAACP, edited <em>The Crisis</em> for twenty-four years, wrote across history, sociology, fiction, and political theory for over half a century. Renounced his US citizenship at ninety-three and died in Ghana the day before the March on Washington.",
    "Jessica Valenti": "Brooklyn-born journalist. Founded <em>Feministing</em> in 2004 — one of the first major US feminist blogs. Now writes <em>Abortion, Every Day</em>, a daily newsletter that has become required reading for anyone trying to understand the post-<em>Dobbs</em> landscape. Has published seven books before this one.",
    "Laura Bates": "British writer and activist, founder of the Everyday Sexism Project in 2012, which collected over 200,000 first-person accounts of misogyny within five years. Has spent the last decade reporting on what specifically the online misogynist movements are doing and how they connect to mainstream politics. Lives in London.",
    "Chanel Miller": "Chinese-American writer and artist born in Palo Alto. Wrote her victim impact statement in 2016 anonymously as &quot;Emily Doe&quot;; came forward as Chanel Miller with the publication of <em>Know My Name</em> in 2019. Now also publishes children's books. Lives in New York.",
    "Silvia Federici": "Italian-American feminist scholar, born in 1942. Co-founded the International Wages for Housework Campaign in 1972. Taught for years at SUNY Hofstra. <em>Caliban</em> is the foundational book; the later writing on social reproduction extends the same argument to the present.",
    "Caroline Criado Perez": "British activist and writer. Successfully campaigned for the first non-royal woman on a UK banknote (Jane Austen, 2017) and the first statue of a woman in Parliament Square (Millicent Fawcett, 2018). <em>Invisible Women</em> is the most rigorous current treatment of structural gender bias in policy and design.",
    "Lindy West": "Seattle-born essayist and screenwriter. Built her career at <em>The Stranger</em> and <em>Jezebel</em>; also writes for the <em>New York Times</em>. Created the Hulu series adaptation of <em>Shrill</em> with Aidy Bryant. Lives in Seattle. The voice is the same on the page as in the comments she famously did not back down from.",
    "Sarah Wynn-Williams": "New Zealand-born former diplomat. Worked at Meta for seven years as Director of Global Public Policy. Was forced out in 2018 after raising concerns internally. The book is her account; Meta has aggressively tried to suppress it. Now lives in the UK.",
    "John Carreyrou": "French-American Pulitzer-winning Wall Street Journal investigative reporter. Broke the Theranos story in 2015 against an extraordinary legal and PR campaign by the company. Left the Journal after the book; now hosts the <em>Bad Blood: The Final Chapter</em> podcast covering the trial.",
    "Jeremy Renner": "Modesto-born actor. Worked steadily for two decades — <em>The Hurt Locker</em>, <em>The Town</em>, the Avengers — before the 2023 snowplow accident. <em>Mayor of Kingstown</em> on Paramount+ is the post-accident project. <em>My Next Breath</em> is the first book.",
    "Matthew McConaughey": "Texas-born actor, Oscar winner for <em>Dallas Buyers Club</em>. Has been keeping daily journals since he was a teenager. <em>Greenlights</em> is the first book; he reads the audiobook himself, which is the version most listeners go to. Lives in Austin and lectures occasionally at the University of Texas.",
    "Buddy Guy (with David Ritz)": "Born George Guy in 1936 in Lettsworth, Louisiana. Moved to Chicago in 1957 and spent the next half-century at the center of the Chicago blues scene. Won six Grammys. Owns Buddy Guy's Legends in Chicago, where he still occasionally plays. The bridge between the original Delta-to-Chicago generation and the British Invasion guitarists who learned from him."
  };

  /* ─── BOOK PALETTES ───────────────────────────────────────
     Per-book color trios applied to the modal as --book-bg,
     --page-fg, --page-accent — same variables the homepage
     book-page sections use, so the modal sits in the same
     printed-paper-stock register.

     Books that overlap with the homepage use the homepage's
     hand-tuned palettes verbatim. Anything else gets a palette
     derived from the cover image at modal-open time, then
     toned to the same uncoated-stock register.
  ──────────────────────────────────────────────────────── */
  const BOOK_COLORS = {
    "12 Years a Slave":                          { bg: '#3d2818', fg: '#e8d9b8', accent: '#c8915a' },
    "Lonesome Dove":                             { bg: '#6e3818', fg: '#f0e4cd', accent: '#f5e6c8' },
    "The Fire Next Time":                        { bg: '#7a2820', fg: '#f0e4cd', accent: '#f0e4cd' },
    "Between the World and Me":                  { bg: '#1f2530', fg: '#dcd8d0', accent: '#b89868' },
    "Demon Copperhead":                          { bg: '#4a5e54', fg: '#e8e4d6', accent: '#d8b878' },
    "East of Eden":                              { bg: '#5a1a18', fg: '#e8d8a8', accent: '#d4b878' },
    "Project Hail Mary":                         { bg: '#244a52', fg: '#e8e4d6', accent: '#d8c8a8' },
    "The Autobiography of Malcolm X":            { bg: '#1f1410', fg: '#dcd0bc', accent: '#b85040' },
    "Stoner":                                    { bg: '#5a4e3a', fg: '#e4ddd0', accent: '#b89878' },
    "The Hundred Years' War on Palestine":       { bg: '#7a5a30', fg: '#f0e4cd', accent: '#f5e6c8' }
  };

  // Pulled palettes get cached so we only sample each cover once.
  const paletteCache = new Map();

  // Sample the dominant color of a cover image. Bucketing pixels
  // at 32-step rounding and skipping near-white / near-black /
  // very low-saturation gray gives a representative book-color
  // even on covers with text or busy artwork. Returns null if
  // the canvas readback fails (cross-origin without CORS, etc).
  function extractCoverColor(imgSrc) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const W = 40, H = 60;
          const canvas = document.createElement('canvas');
          canvas.width = W;
          canvas.height = H;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, W, H);
          const data = ctx.getImageData(0, 0, W, H).data;
          const buckets = new Map();
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
            if (a < 128) continue;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            const lum = (max + min) / 2 / 255;
            const sat = max === 0 ? 0 : (max - min) / max;
            if (lum > 0.93) continue;          // near-white
            if (lum < 0.05) continue;          // near-black
            if (sat < 0.08 && lum > 0.7) continue;  // light gray
            const key = `${(r >> 5) << 5},${(g >> 5) << 5},${(b >> 5) << 5}`;
            const entry = buckets.get(key) || { count: 0, r: 0, g: 0, b: 0 };
            entry.count++;
            entry.r += r; entry.g += g; entry.b += b;
            buckets.set(key, entry);
          }
          let best = null;
          for (const entry of buckets.values()) {
            if (!best || entry.count > best.count) best = entry;
          }
          if (!best) { resolve(null); return; }
          resolve({
            r: Math.round(best.r / best.count),
            g: Math.round(best.g / best.count),
            b: Math.round(best.b / best.count)
          });
        } catch (e) {
          resolve(null);  // canvas tainted (CORS) or other — fall back
        }
      };
      img.onerror = () => resolve(null);
      img.src = imgSrc;
    });
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return { h: h * 360, s, l };
  }

  function hsl(h, s, l) {
    return `hsl(${h.toFixed(0)}, ${(s * 100).toFixed(1)}%, ${(l * 100).toFixed(1)}%)`;
  }

  // Tone the dominant cover color into the printed-paper-stock
  // register the homepage uses. Even cool-bg books (e.g. teal
  // Project Hail Mary, navy Between the World) get warm cream
  // fg and warm-leaning accents on the homepage, so we hard-pull
  // fg and accent toward the warm side regardless of source hue.
  function deriveBookPalette(rgb) {
    const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // bg: dominant hue retained, darkened to printed-paper level
    const bgL = Math.min(0.22, Math.max(0.14, l * 0.45));
    const bgS = Math.min(s * 0.85, 0.55);

    // fg: warm cream, fixed hue independent of cover
    const fgH = 38;
    const fgS = 0.18;
    const fgL = 0.86;

    // accent: blend 70% toward warm cream-tan, 30% source hue.
    // Shortest path around the hue wheel so cool sources don't
    // take the long way around through magenta.
    let dh = 35 - h;
    if (dh > 180) dh -= 360;
    else if (dh < -180) dh += 360;
    const accentH = (h + dh * 0.7 + 360) % 360;
    const accentS = Math.max(0.32, Math.min(s * 0.7, 0.50));
    const accentL = 0.65;

    return {
      bg: hsl(h, bgS, bgL),
      fg: hsl(fgH, fgS, fgL),
      accent: hsl(accentH, accentS, accentL)
    };
  }

  // Build a Kobo search URL — the homepage uses the same pattern.
  function koboUrl(title, author) {
    const q = `${title} ${author}`;
    return `https://www.kobo.com/us/en/search?query=${encodeURIComponent(q)}`;
  }

  // Libby has no public per-title URL without a library context;
  // route to the app entry point so the user picks their library
  // and searches inside it. Same pattern the homepage uses.
  function libbyUrl() {
    return 'https://libbyapp.com';
  }

  // Build the purchase-table HTML for a given book. Three rows:
  // Kobo (eBook), the row's bookstore, Libby (Library hold).
  function buildPurchaseHTML({ title, author, bookstoreName, bookstoreHref }) {
    const koboHref = koboUrl(title, author);
    const libbyHref = libbyUrl();
    const bookstoreSafeName = bookstoreName || 'Bookstore';
    const bookstoreSafeHref = bookstoreHref || '#';
    return `
      <a href="${koboHref}" target="_blank" rel="noopener noreferrer" class="purchase-row">
        <span class="source"><span class="name">Kobo</span><span class="meta">eBook</span></span>
        <span class="arrow-out">↗</span>
      </a>
      <a href="${bookstoreSafeHref}" target="_blank" rel="noopener noreferrer" class="purchase-row">
        <span class="source"><span class="name">${bookstoreSafeName}</span><span class="meta">Independent</span></span>
        <span class="arrow-out">↗</span>
      </a>
      <a href="${libbyHref}" target="_blank" rel="noopener noreferrer" class="purchase-row">
        <span class="source"><span class="name">Libby</span><span class="meta">Library hold</span></span>
        <span class="arrow-out">↗</span>
      </a>
    `;
  }

  // Photos live in /authors/ as JPGs named by the author's slug.
  // Missing files fail the img onerror, which removes the img
  // and reveals the initials fallback rendered behind it.
  // Overrides keep awkward credit strings from producing ugly
  // filenames (and let the same author share a single photo
  // across pages where the byline differs).
  const AUTHOR_SLUG_OVERRIDES = {
    "Malcolm X, as told to Alex Haley": "malcolm-x",
    "Buddy Guy (with David Ritz)": "buddy-guy"
  };
  function authorSlug(name) {
    if (AUTHOR_SLUG_OVERRIDES[name]) return AUTHOR_SLUG_OVERRIDES[name];
    return String(name)
      .toLowerCase()
      .replace(/[‘’']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  function authorInitials(name) {
    const parts = String(name).split(/\s+/).filter(Boolean);
    const letters = parts
      .map(p => p.replace(/[^A-Za-z]/g, '')[0])
      .filter(Boolean);
    return ((letters[0] || '') + (letters[letters.length - 1] || '')).toUpperCase();
  }

  // Build the About-the-Author HTML. Author name links out to
  // the same external page the row's byline links to. Bio is
  // looked up from AUTHOR_BIOS by the link text. Photo defaults
  // to authors/<slug>.jpg with an initial-circle fallback.
  function buildAuthorHTML({ authorName, authorHref }) {
    const bio = AUTHOR_BIOS[authorName] || '';
    const nameMarkup = authorHref
      ? `<a href="${authorHref}" target="_blank" rel="noopener noreferrer">${authorName}</a>`
      : authorName;
    const slug = authorSlug(authorName);
    const initials = authorInitials(authorName);
    return `
      <div class="kicker">About the Author</div>
      <div class="author-photo" aria-hidden="true">
        <span class="initials">${initials}</span>
        <img src="authors/${slug}.jpg" alt="" loading="lazy" onerror="this.remove()">
      </div>
      <div class="author-name">${nameMarkup}</div>
      <p class="author-bio">${bio}</p>
    `;
  }

  const modal = document.getElementById('bookModal');
  if (modal) {
    const panel = modal.querySelector('.book-modal-panel');
    const slotCover = modal.querySelector('.book-modal-cover');
    const slotTitle = modal.querySelector('.book-modal-title');
    const slotBy = modal.querySelector('.book-modal-by');
    const slotReview = modal.querySelector('.book-modal-review');
    const slotPurchase = modal.querySelector('.book-modal-purchase');
    const slotAuthor = modal.querySelector('.book-modal-author');
    let lastTrigger = null;

    let currentTitle = null;

    function applyPalette(palette) {
      if (!palette) {
        modal.style.removeProperty('--book-bg');
        modal.style.removeProperty('--page-fg');
        modal.style.removeProperty('--page-accent');
        return;
      }
      modal.style.setProperty('--book-bg', palette.bg);
      modal.style.setProperty('--page-fg', palette.fg);
      modal.style.setProperty('--page-accent', palette.accent);
    }

    function openModal(triggerBtn) {
      const row = triggerBtn.closest('.book-row');
      if (!row) return;
      const coverImg = row.querySelector('.book-cover-wrap img');
      const titleEl = row.querySelector('.book-title');
      const authorEl = row.querySelector('.book-author');
      const authorLink = row.querySelector('.book-author a');
      const bodyEl = row.querySelector('.blurb-body');
      const bookstoreLink = row.querySelector('.book-bookstore');
      const bookstoreNameEl = row.querySelector('.book-bookstore .name');

      const title = titleEl ? titleEl.textContent.trim() : '';
      const authorName = authorLink ? authorLink.textContent.trim() : '';
      const authorHref = authorLink ? authorLink.href : '';
      const bookstoreHref = bookstoreLink ? bookstoreLink.href : '';
      const bookstoreName = bookstoreNameEl ? bookstoreNameEl.textContent.trim() : '';

      if (slotCover && coverImg) {
        slotCover.src = coverImg.src;
        slotCover.alt = coverImg.alt || '';
      }
      if (slotTitle && titleEl) slotTitle.innerHTML = titleEl.innerHTML;
      if (slotBy && authorEl) slotBy.innerHTML = authorEl.innerHTML;
      if (slotReview && bodyEl) slotReview.innerHTML = bodyEl.innerHTML;
      if (slotPurchase) {
        slotPurchase.innerHTML = buildPurchaseHTML({
          title, author: authorName, bookstoreName, bookstoreHref
        });
      }
      if (slotAuthor) {
        slotAuthor.innerHTML = buildAuthorHTML({ authorName, authorHref });
      }

      // Per-book palette. Hand-mapped books apply instantly;
      // others sample the cover async and apply when the data
      // returns (with a CSS transition softening the swap).
      currentTitle = title;
      const handMapped = BOOK_COLORS[title];
      const cached = paletteCache.get(title);
      if (handMapped) {
        applyPalette(handMapped);
      } else if (cached) {
        applyPalette(cached);
      } else {
        applyPalette(null);  // default paper while sampling
        if (coverImg) {
          extractCoverColor(coverImg.src).then((rgb) => {
            if (!rgb) return;
            const palette = deriveBookPalette(rgb);
            paletteCache.set(title, palette);
            // Only apply if the modal is still showing this book.
            if (modal.classList.contains('is-open') && currentTitle === title) {
              applyPalette(palette);
            }
          });
        }
      }

      lastTrigger = triggerBtn;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('book-modal-open');
      if (panel) {
        panel.scrollTop = 0;
        // Defer focus until the panel has fully transitioned in
        // so the screen reader announces the dialog correctly.
        requestAnimationFrame(() => panel.focus());
      }
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('book-modal-open');
      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    }

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.blurb-toggle');
      if (trigger) {
        e.preventDefault();
        openModal(trigger);
        return;
      }
      if (e.target.closest('[data-modal-close]')) {
        e.preventDefault();
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  /* ─── PUBLICATION YEARS ───────────────────────────────────
     Keyed by exact book-title text in the row. Used to render
     the "Author · YYYY" tail in the byline.
  ──────────────────────────────────────────────────────── */
  const BOOK_YEARS = {
    // Fiction
    "Lonesome Dove": 1985,
    "Demon Copperhead": 2022,
    "Stoner": 1965,
    "East of Eden": 1952,
    "Giovanni's Room": 1956,
    "Project Hail Mary": 2021,
    "Jurassic Park": 1990,
    "Red Rising": 2014,
    "Dune": 1965,
    "Empire of Silence": 2018,
    "It": 1986,
    "Piranesi": 2020,
    "Atmosphere": 2025,
    "The Storied Life of A.J. Fikry": 2014,
    // Nonfiction
    "The Hundred Years' War on Palestine": 2020,
    "The Eyes of Gaza: A Diary of Resilience": 2024,
    "The Jewish State": 1896,
    "Perfect Victims and the Politics of Appeal": 2025,
    "The Palestine Laboratory": 2023,
    "The Looming Tower: Al-Qaeda and the Road to 9/11": 2006,
    "The Message": 2024,
    "One Day, Everyone Will Have Always Been Against This": 2025,
    "12 Years a Slave": 1853,
    "Narrative of the Life of Frederick Douglass": 1845,
    "The 1619 Project": 2021,
    "How to Be an Antiracist": 2019,
    "The Fire Next Time": 1963,
    "Nobody Knows My Name": 1961,
    "Just Mercy": 2014,
    "The New Jim Crow": 2010,
    "Letter from Birmingham Jail": 1963,
    "Chain of Ideas": 2026,
    "Between the World and Me": 2015,
    "The Autobiography of Malcolm X": 1965,
    "The Sun Does Shine": 2018,
    "The Souls of Black Folk": 1903,
    "Abortion: Our Bodies, Their Lies, and the Truths We Use to Win": 2024,
    "Men Who Hate Women": 2020,
    "Know My Name": 2019,
    "Caliban and the Witch": 2004,
    "Invisible Women": 2019,
    "The New Age of Sexism": 2025,
    "Shrill": 2016,
    "Careless People": 2025,
    "Bad Blood": 2018,
    "My Next Breath": 2025,
    "Greenlights": 2020,
    "When I Left Home": 2012
  };

  /* ─── INLINE AUTHOR PORTRAITS + YEAR ──────────────────────
     Inject a round portrait into each row's byline, just before
     the author name, and a "· YYYY" tail just after. The link
     and year are wrapped in a single inline span so the flex
     gap between siblings only applies between photo and name,
     not between name and year.
  ──────────────────────────────────────────────────────── */
  allBooks.forEach((row) => {
    const authorEl = row.querySelector('.book-author');
    const authorLink = row.querySelector('.book-author a');
    if (!authorEl || !authorLink) return;
    if (authorEl.querySelector('.book-author-photo')) return;  // idempotent

    const titleEl = row.querySelector('.book-title');
    const title = titleEl ? titleEl.textContent.trim() : '';
    const name = authorLink.textContent.trim();
    const slug = authorSlug(name);
    const initials = authorInitials(name);
    const year = BOOK_YEARS[title];

    const photo = document.createElement('span');
    photo.className = 'book-author-photo';
    photo.setAttribute('aria-hidden', 'true');
    photo.innerHTML =
      `<span class="initials">${initials}</span>` +
      `<img src="authors/${slug}.jpg" alt="" loading="lazy" onerror="this.remove()">`;
    authorEl.insertBefore(photo, authorLink);

    if (year) {
      // Wrap the link + year in a single inline span so they
      // stay glued together (the parent flex-gap of 14px would
      // otherwise push the interpunct off into space).
      const line = document.createElement('span');
      line.className = 'book-author-line';
      authorEl.insertBefore(line, authorLink);
      line.appendChild(authorLink);
      const yearEl = document.createElement('span');
      yearEl.className = 'year';
      yearEl.textContent = String(year);
      line.appendChild(yearEl);
    }

    // Move the Read Review trigger out of the blurb wrapper and
    // into the footer where the bookstore CTA used to sit. Hide
    // the bookstore link itself — the modal still reads its
    // .name and .href to populate the purchase table.
    const toggle = row.querySelector('.blurb-toggle');
    const footer = row.querySelector('.book-footer');
    const bookstore = row.querySelector('.book-bookstore');
    if (toggle && footer && bookstore && !footer.contains(toggle)) {
      bookstore.style.display = 'none';
      footer.insertBefore(toggle, bookstore);
    }
  });

})();
