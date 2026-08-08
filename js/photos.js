/* ============================================================
   HEART'S LIBRARY — the galleries. EDIT THIS FILE TO POST.
   ------------------------------------------------------------
   Every trip is one entry in TRIPS, newest first. Each trip is
   a gallery: its cover (the first photo, or set `cover:`) shows
   on the homepage grid, and clicking through opens
   gallery.html?trip=<slug>.

   To post a trip:
   1. Drop your image files into photos/<trip-slug>/
      (JPGs are fine; export around 1600px on the long side).
   2. Add a trip below — slug, place (the title), when, note,
      posted (YYYY-MM-DD, controls order), and the photos list.
      w/h are each image's aspect numbers (4/3, 3/4, 1/1 …).
   3. Bump the ?v= on js/photos.js in the HTML pages if you
      want caches to pick it up immediately.

   ⚠ EVERYTHING BELOW IS SAMPLE CONTENT. The images are
   generated placeholder art (photos/placeholders/*.svg) —
   replace the trips wholesale with your own.
   ============================================================ */
window.TRIPS = [
  {
    slug: "san-diego",
    posted: "2026-06-20",
    place: "My trip to San Diego",
    when: "June 2026",
    note: "Three days of marine layer, fish tacos, and the light finally breaking over Sunset Cliffs.",
    photos: [
      { src: "photos/placeholders/sd-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Sunset Cliffs, golden hour" },
      { src: "photos/placeholders/sd-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Ocean Beach pier" },
      { src: "photos/placeholders/sd-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "La Jolla tide pools" },
      { src: "photos/placeholders/sd-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Balboa Park colonnade" },
      { src: "photos/placeholders/sd-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Coronado bridge, dusk" },
      { src: "photos/placeholders/sd-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Marine layer burning off" }
    ]
  },
  {
    slug: "chicago-february",
    posted: "2026-02-14",
    place: "Chicago in February",
    when: "February 2026",
    note: "Scouting the future neighborhood at its most honest — lake-effect gray and radiator warmth.",
    photos: [
      { src: "photos/placeholders/chi-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "The lakefront, frozen over" },
      { src: "photos/placeholders/chi-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Steam over the Loop" },
      { src: "photos/placeholders/chi-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Snow on the Blue Line" },
      { src: "photos/placeholders/chi-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Radiator light, Logan Square" },
      { src: "photos/placeholders/chi-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "The El in a whiteout" },
      { src: "photos/placeholders/chi-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Lake Michigan, minus nine" }
    ]
  },
  {
    slug: "london-paris",
    posted: "2025-10-12",
    place: "London and Paris",
    when: "October 2025",
    note: "Two cities, one carry-on. Fog on the Thames, gold hour on the Seine.",
    photos: [
      { src: "photos/placeholders/ldnpar-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Thames fog, morning" },
      { src: "photos/placeholders/ldnpar-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Gold hour on the Seine" },
      { src: "photos/placeholders/ldnpar-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Barbican in the rain" },
      { src: "photos/placeholders/ldnpar-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Café tabac, 7th arrondissement" },
      { src: "photos/placeholders/ldnpar-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "St Paul's from the bridge" },
      { src: "photos/placeholders/ldnpar-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Montmartre stairs" }
    ]
  }
];
