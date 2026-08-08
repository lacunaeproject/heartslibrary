/* ============================================================
   HEART'S LIBRARY — the photo albums. EDIT THIS FILE TO POST.
   ------------------------------------------------------------
   Every trip is one entry in TRIPS, newest first. To post:

   1. Drop your image files into photos/<trip-slug>/
      (JPGs are fine; export around 1600px on the long side).
   2. Add a trip below — or add photos to an existing trip.
      w/h are the image's aspect numbers (any scale: 3/4, 4/3,
      1600/1067 all work) so the grid can reserve space.
   3. Bump the ?v= on js/photos.js in the HTML pages if you
      want caches to pick it up immediately.

   ⚠ EVERYTHING BELOW IS SAMPLE CONTENT. The images are
   generated placeholder art (photos/placeholders/*.svg) —
   replace the trips wholesale with your own.
   ============================================================ */
window.TRIPS = [
  {
    slug: "chicago-scouting",
    posted: "2026-07-12",
    place: "Chicago, first look",
    when: "July 2026",
    note: "Apartment-scouting weekend. Mostly walked, mostly looked up.",
    photos: [
      { src: "photos/placeholders/chi-1.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "The El, Adams & Wabash" },
      { src: "photos/placeholders/chi-2.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Lake Michigan, evening" },
      { src: "photos/placeholders/chi-3.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Under the tracks" },
      { src: "photos/placeholders/chi-4.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Wrigleyville, day game" }
    ]
  },
  {
    slug: "big-sur",
    posted: "2026-05-17",
    place: "Big Sur, California",
    when: "May 2026",
    note: "Highway 1 with the windows down. The camera barely kept up.",
    photos: [
      { src: "photos/placeholders/bigsur-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Bixby Creek Bridge" },
      { src: "photos/placeholders/bigsur-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "McWay Falls trail" },
      { src: "photos/placeholders/bigsur-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Redwood understory" },
      { src: "photos/placeholders/bigsur-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Highway 1, golden hour" }
    ]
  },
  {
    slug: "franklin",
    posted: "2026-04-05",
    place: "Franklin, Tennessee",
    when: "April 2026",
    note: "Home, for now. Learning to see the familiar again.",
    photos: [
      { src: "photos/placeholders/franklin-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Main Street at dusk" },
      { src: "photos/placeholders/franklin-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Back porch, spring storm" },
      { src: "photos/placeholders/franklin-3.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "The Harpeth, low water" },
      { src: "photos/placeholders/franklin-4.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Leiper's Fork barn" }
    ]
  }
];
