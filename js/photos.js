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
      continent (feeds the seven-continents tracker; one of:
      North America, South America, Europe, Africa, Asia,
      Oceania, Antarctica), posted (YYYY-MM-DD, controls order),
      and the photos list. w/h are each image's aspect numbers
      (4/3, 3/4, 1/1 …).
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
    continent: "North America",
    note: "Mostly the zoo, honestly — the cheetah alone was worth the flight.",
    photos: [
      { src: "photos/sandiego-zoo/web/cheetah-2.jpg", w: 1600, h: 1067, alt: "A cheetah in profile, close up", caption: "The ambassador cheetah, in profile" },
      { src: "photos/sandiego-zoo/web/panda.jpg", w: 1139, h: 1600, alt: "A giant panda eating bamboo", caption: "Lunch, taken seriously" },
      { src: "photos/sandiego-zoo/web/grizzly.jpg", w: 1059, h: 1600, alt: "A grizzly bear against dark wet rock", caption: "Grizzly against the wet rock" },
      { src: "photos/sandiego-zoo/web/orang-2.jpg", w: 1173, h: 1600, alt: "An orangutan looking into the camera", caption: "The old man of the canopy" },
      { src: "photos/sandiego-zoo/web/bear_looking.jpg", w: 1600, h: 1067, alt: "A bear glancing over its shoulder", caption: "Caught looking" },
      { src: "photos/sandiego-zoo/web/camels.jpg", w: 1600, h: 1067, alt: "Camels standing in bright sun", caption: "Camels in the noon sun" },
      { src: "photos/sandiego-zoo/web/cheetah-1.jpg", w: 1165, h: 1600, alt: "A cheetah at rest", caption: "Spots at rest" },
      { src: "photos/sandiego-zoo/web/orang-1.jpg", w: 1087, h: 1600, alt: "An orangutan behind glass", caption: "Watching us watching him" },
      { src: "photos/sandiego-zoo/web/orang-3.jpg", w: 1172, h: 1600, alt: "An orangutan in profile", caption: "Deep in thought" },
      { src: "photos/sandiego-zoo/web/snake.jpg", w: 968, h: 1600, alt: "A snake in the reptile house", caption: "The reptile house regular" }
    ]
  },
  {
    slug: "chicago-february",
    posted: "2026-02-14",
    place: "Chicago in February",
    when: "February 2026",
    continent: "North America",
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
    continent: "Europe",
    note: "Two cities, one carry-on. Fog on the Thames, gold hour on the Seine.",
    photos: [
      { src: "photos/placeholders/ldnpar-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Thames fog, morning" },
      { src: "photos/placeholders/ldnpar-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Gold hour on the Seine" },
      { src: "photos/placeholders/ldnpar-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Barbican in the rain" },
      { src: "photos/placeholders/ldnpar-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Café tabac, 7th arrondissement" },
      { src: "photos/placeholders/ldnpar-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "St Paul's from the bridge" },
      { src: "photos/placeholders/ldnpar-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Montmartre stairs" }
    ]
  },
  {
    slug: "nashville",
    posted: "2025-08-16",
    place: "Nashville, before the move",
    when: "August 2025",
    continent: "North America",
    note: "One last slow lap of the city that held the Franklin years.",
    photos: [
      { src: "photos/placeholders/nash-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Lower Broadway from the bridge" },
      { src: "photos/placeholders/nash-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Radnor Lake, first light" },
      { src: "photos/placeholders/nash-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Porch storm, Franklin" },
      { src: "photos/placeholders/nash-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "The Ryman’s alley" },
      { src: "photos/placeholders/nash-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Harpeth bends" },
      { src: "photos/placeholders/nash-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Neon spill, Printer’s Alley" }
    ]
  },
  {
    slug: "big-sur",
    posted: "2025-05-18",
    place: "Big Sur, Highway 1",
    when: "May 2025",
    continent: "North America",
    note: "Windows down, fog in, fog out. The camera barely kept up.",
    photos: [
      { src: "photos/placeholders/bigsur-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Bixby at golden hour" },
      { src: "photos/placeholders/bigsur-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Redwood understory" },
      { src: "photos/placeholders/bigsur-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "McWay cove" },
      { src: "photos/placeholders/bigsur-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Fog over Point Sur" },
      { src: "photos/placeholders/bigsur-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Pfeiffer surf" },
      { src: "photos/placeholders/bigsur-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Highway pull-off, dusk" }
    ]
  },
  {
    slug: "new-york",
    posted: "2024-12-08",
    place: "New York, back for a week",
    when: "December 2024",
    continent: "North America",
    note: "Two years after leaving — the old commute, in the snow this time.",
    photos: [
      { src: "photos/placeholders/nyc-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Sixth Avenue steam" },
      { src: "photos/placeholders/nyc-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Snow on the High Line" },
      { src: "photos/placeholders/nyc-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Grand Central, 8 a.m." },
      { src: "photos/placeholders/nyc-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Roosevelt Island tram" },
      { src: "photos/placeholders/nyc-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Chinatown dusk" },
      { src: "photos/placeholders/nyc-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "The park after the storm" }
    ]
  },
  {
    slug: "joshua-tree",
    posted: "2024-03-22",
    place: "Joshua Tree, dusk to dark",
    when: "March 2024",
    continent: "North America",
    note: "Out for the boulders, stayed for the stars.",
    photos: [
      { src: "photos/placeholders/jtree-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Golden hour boulders" },
      { src: "photos/placeholders/jtree-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "First stars, Cap Rock" },
      { src: "photos/placeholders/jtree-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Cholla garden" },
      { src: "photos/placeholders/jtree-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Skull Rock silhouette" },
      { src: "photos/placeholders/jtree-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Dusk on the ridge" },
      { src: "photos/placeholders/jtree-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "The Milky Way, faint" }
    ]
  },
  {
    slug: "the-bay",
    posted: "2023-09-10",
    place: "The Bay, revisited",
    when: "September 2023",
    continent: "North America",
    note: "School streets and fog lines, a decade on.",
    photos: [
      { src: "photos/placeholders/bay-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Fog over the gate" },
      { src: "photos/placeholders/bay-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Berkeley hills, dry gold" },
      { src: "photos/placeholders/bay-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Ocean Beach wind" },
      { src: "photos/placeholders/bay-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Sutro through the mist" },
      { src: "photos/placeholders/bay-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Ferry wake" },
      { src: "photos/placeholders/bay-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Twin Peaks, blue hour" }
    ]
  }
];
