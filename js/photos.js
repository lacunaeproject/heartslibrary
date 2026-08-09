/* ============================================================
   THE COLLECTIONS — one entry per collection. EDIT THIS FILE
   TO POST. (The array is still named TRIPS everywhere; a
   collection is any named set of frames — a trip, a show, a
   theme like "Film scans".)
   ------------------------------------------------------------
   Each collection is a gallery page at gallery.html?trip=<slug>;
   frames flagged `best: true` also hang on the front wall.

   To post a collection:
   1. Drop your image files into photos/<trip-slug>/
      (JPGs are fine; export around 1600px on the long side).
   2. Add a trip below — slug, place (the title), when, note,
      continent (feeds the seven-continents tracker; one of:
      North America, South America, Europe, Africa, Asia,
      Oceania, Antarctica), posted (YYYY-MM-DD, controls order),
      and the photos list. w/h are each image's aspect numbers
      (4/3, 3/4, 1/1 …). `nav:` is the collection's name in the
      index on the front page ("Dodgers vs. Red Sox @ Dodger
      Stadium"); `short` is used when it's missing. `loc:` is
      the venue or place for bylines ("Bridgestone Arena"). Flag your
      best frames `best: true` — only those hang on the wall.
   3. Bump the ?v= on js/photos.js in the HTML pages if you
      want caches to pick it up immediately.

   ⚠ EVERYTHING BELOW IS SAMPLE CONTENT. The images are
   generated placeholder art (photos/placeholders/*.svg) —
   replace the trips wholesale with your own.
   ============================================================ */
window.TRIPS = [
  {
    slug: "deadbeat-tour",
    loc: "Bridgestone Arena",
    posted: "2026-08-05",
    place: "The Deadbeat Tour",
    short: "Deadbeat Tour",
    nav: "Djo — The Deadbeat Tour",
    when: "August 2026",
    continent: "North America",
    photos: [
      { src: "photos/deadbeat-tour/dsc03638.jpg", best: true, w: 1600, h: 1200, alt: "The Deadbeat Tour" },
      { src: "photos/deadbeat-tour/dsc03659.jpg", w: 1200, h: 1600, alt: "The Deadbeat Tour" },
      { src: "photos/deadbeat-tour/dsc03660.jpg", best: true, w: 1200, h: 1600, alt: "The Deadbeat Tour" },
      { src: "photos/deadbeat-tour/dsc03676.jpg", w: 1200, h: 1600, alt: "The Deadbeat Tour" },
      { src: "photos/deadbeat-tour/dsc03707.jpg", w: 1200, h: 1600, alt: "The Deadbeat Tour" },
      { src: "photos/deadbeat-tour/dsc03684.jpg", best: true, w: 1200, h: 1600, alt: "The Deadbeat Tour" },
      { src: "photos/deadbeat-tour/dsc03683.jpg", w: 1200, h: 1600, alt: "The Deadbeat Tour" },
      { src: "photos/deadbeat-tour/dsc03789.jpg", best: true, w: 882, h: 1124, alt: "The Deadbeat Tour" }
    ],
    beats: [
      { at: "Djo", time: "2026-08-09T00:07", say: "I acquired these tickets a while ago. On the concert date, I was surprised to learn he was opening for Tame Impala. Below are several of the strongest images I captured during his set. On the day of the concert, I was surprised to discover he was opening for Tame Impala! Below are several of the strongest images I took during his set.", shots: [0, 1, 2, 3, 4, 5, 6, 7] }
    ]
  },
  {
    slug: "fenway",
    loc: "Dodger Stadium",
    posted: "2026-08-01",
    place: "Fenway Park",
    short: "Fenway",
    nav: "Dodgers vs. Red Sox @ Dodger Stadium",
    when: "August 2026",
    continent: "North America",
    photos: [
      { src: "photos/fenway/redsox-win.mp4", w: 1080, h: 1920, video: true, seconds: 5.9, alt: "The moment it landed", caption: "The moment it landed" }
    ],
    beats: [
      { at: "Bottom of the ninth", say: "They won it at home. Everyone around me stood up at the same time and I got about six seconds of it before my hands were shaking too much to hold the phone still.", shots: [0] }
    ]
  },
  {
    slug: "los-angeles",
    loc: "Los Angeles, CA",
    posted: "2026-07-11",
    place: "Los Angeles in July",
    short: "Los Angeles",
    when: "July 2026",
    continent: "North America",
    photos: [
      { src: "photos/placeholders/la-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Marine layer over the basin" },
      { src: "photos/placeholders/la-2.svg", best: true, w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Palms on Rossmore" },
      { src: "photos/placeholders/la-3.svg", best: true, w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "The 110 at gold hour" },
      { src: "photos/placeholders/la-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Stucco and shadow, Echo Park" },
      { src: "photos/placeholders/la-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Haze off the Pacific" },
      { src: "photos/placeholders/la-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Griffith, waiting for dark" }
    ],
    beats: [
      { at: "Mid-Wilshire", say: "The marine layer never really burned off. Grey until noon, gold by five, grey again for the drive home.", shots: [0, 1] },
      { at: "Echo Park", say: "Spent most of a week photographing stucco. It's the shadows here. They land harder than anywhere else I've shot.", shots: [2, 3] },
      { at: "Griffith", say: "Waited two hours for dark. Got about ninety seconds out of it.", shots: [4, 5] }
    ]
  },
  {
    slug: "san-diego",
    loc: "San Diego Zoo",
    posted: "2026-06-20",
    place: "My trip to San Diego",
    short: "San Diego",
    when: "June 2026",
    continent: "North America",
    cover: "photos/sandiego-zoo/web/grizzly-2.jpg",
    photos: [
      { src: "photos/sandiego-zoo/web/cheetah-2.jpg", best: true, w: 1600, h: 1067, alt: "A cheetah in profile, close up", caption: "The ambassador cheetah, in profile" },
      { src: "photos/sandiego-zoo/web/panda.jpg", best: true, w: 1139, h: 1600, alt: "A giant panda eating bamboo", caption: "Lunch, taken seriously" },
      { src: "photos/sandiego-zoo/web/grizzly.jpg", w: 1059, h: 1600, alt: "A grizzly bear against dark wet rock", caption: "Grizzly against the wet rock" },
      { src: "photos/sandiego-zoo/web/grizzly-2.jpg", best: true, w: 1059, h: 1600, alt: "A close-up of a grizzly bear resting its chin on a rock", caption: "Chin on the rock" },
      { src: "photos/sandiego-zoo/web/orang-2.jpg", best: true, w: 1173, h: 1600, alt: "An orangutan looking into the camera", caption: "The old man of the canopy" },
      { src: "photos/sandiego-zoo/web/bear_looking.jpg", best: true, w: 1600, h: 1067, alt: "A bear glancing over its shoulder", caption: "Caught looking" },
      { src: "photos/sandiego-zoo/web/camels.jpg", w: 1600, h: 1067, alt: "Camels standing in bright sun", caption: "Camels in the noon sun" },
      { src: "photos/sandiego-zoo/web/cheetah-1.jpg", w: 1165, h: 1600, alt: "A cheetah at rest", caption: "Spots at rest" },
      { src: "photos/sandiego-zoo/web/orang-1.jpg", w: 1087, h: 1600, alt: "An orangutan behind glass", caption: "Watching us watching him" },
      { src: "photos/sandiego-zoo/web/orang-3.jpg", w: 1172, h: 1600, alt: "An orangutan in profile", caption: "Deep in thought" },
      { src: "photos/sandiego-zoo/web/snake.jpg", w: 968, h: 1600, alt: "A snake in the reptile house", caption: "The reptile house regular" }
    ],
    beats: [
      { at: "Balboa Park", say: "Went for the zoo and basically never left it.", shots: [0, 1, 2] },
      { at: "The big cats", say: "The cheetah came right up to the glass. Four or five seconds, then gone.", shots: [3, 4, 5] },
      { at: "Orangutan canyon", say: "Spent way too long here. Worth it.", shots: [6, 7, 8, 9, 10] }
    ]
  },
  {
    slug: "chicago-february",
    loc: "Chicago, IL",
    posted: "2026-02-14",
    place: "Chicago in February",
    short: "Chicago",
    when: "February 2026",
    continent: "North America",
    photos: [
      { src: "photos/placeholders/chi-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "The lakefront, frozen over" },
      { src: "photos/placeholders/chi-2.svg", best: true, w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Steam over the Loop" },
      { src: "photos/placeholders/chi-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Snow on the Blue Line" },
      { src: "photos/placeholders/chi-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Radiator light, Logan Square" },
      { src: "photos/placeholders/chi-5.svg", best: true, w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "The El in a whiteout" },
      { src: "photos/placeholders/chi-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Lake Michigan, minus nine" }
    ],
    beats: [
      { at: "The lakefront", say: "Came in February on purpose. If I'm moving here I wanted to see it at its worst first.", shots: [0, 1] },
      { at: "Logan Square", say: "Minus nine outside and the radiators were winning. Best light of the trip came through a window I had no business standing near.", shots: [2, 3] },
      { at: "The Blue Line", say: "Shot the El in a whiteout. Couldn't feel my hands for an hour after.", shots: [4, 5] }
    ]
  },
  {
    slug: "london-paris",
    loc: "London & Paris",
    posted: "2025-10-12",
    place: "London and Paris",
    short: "London & Paris",
    when: "October 2025",
    continent: "Europe",
    photos: [
      { src: "photos/london-paris/web/monet-pond.jpg", best: true, w: 1200, h: 1600, alt: "Water lilies on Monet's pond at Giverny, clouds reflected in the water", caption: "Monet's pond, Giverny" },
      { src: "photos/placeholders/ldnpar-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Thames fog, morning" },
      { src: "photos/placeholders/ldnpar-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Gold hour on the Seine" },
      { src: "photos/placeholders/ldnpar-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Barbican in the rain" },
      { src: "photos/placeholders/ldnpar-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Café tabac, 7th arrondissement" },
      { src: "photos/placeholders/ldnpar-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "St Paul's from the bridge" },
      { src: "photos/placeholders/ldnpar-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Montmartre stairs" }
    ],
    beats: [
      { at: "Giverny", say: "Went to Monet's pond expecting to be underwhelmed. Wasn't.", shots: [0] },
      { at: "London", say: "Fog on the Thames every single morning, which felt like a cliché right up until I was standing in it. The Barbican in rain is the best building I've ever pointed a camera at.", shots: [1, 3, 5] },
      { at: "Paris", say: "Two cities, one carry-on. Gold hour on the Seine, then a tabac in the 7th where nobody minded the camera at all.", shots: [2, 4, 6] }
    ]
  },
  {
    slug: "nashville",
    loc: "Nashville, TN",
    posted: "2025-08-16",
    place: "Nashville, before the move",
    short: "Nashville",
    when: "August 2025",
    continent: "North America",
    photos: [
      { src: "photos/placeholders/nash-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Lower Broadway from the bridge" },
      { src: "photos/placeholders/nash-2.svg", best: true, w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Radnor Lake, first light" },
      { src: "photos/placeholders/nash-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Porch storm, Franklin" },
      { src: "photos/placeholders/nash-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "The Ryman’s alley" },
      { src: "photos/placeholders/nash-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Harpeth bends" },
      { src: "photos/placeholders/nash-6.svg", best: true, w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Neon spill, Printer’s Alley" }
    ],
    beats: [
      { at: "Franklin", say: "One last slow lap before the move. Sat out a storm on the porch and didn't take a frame for an hour.", shots: [2, 4] },
      { at: "Lower Broadway", say: "Easier to photograph than to stand in. Went at first light, when it was still just a street.", shots: [0, 3] },
      { at: "Radnor Lake", say: "First light, nobody else out. Printer's Alley later on, neon doing what neon does.", shots: [1, 5] }
    ]
  },
  {
    slug: "big-sur",
    loc: "Big Sur, CA",
    posted: "2025-05-18",
    place: "Big Sur, Highway 1",
    short: "Big Sur",
    when: "May 2025",
    continent: "North America",
    photos: [
      { src: "photos/placeholders/bigsur-1.svg", best: true, w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Bixby at golden hour" },
      { src: "photos/placeholders/bigsur-2.svg", best: true, w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Redwood understory" },
      { src: "photos/placeholders/bigsur-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "McWay cove" },
      { src: "photos/placeholders/bigsur-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Fog over Point Sur" },
      { src: "photos/placeholders/bigsur-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Pfeiffer surf" },
      { src: "photos/placeholders/bigsur-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Highway pull-off, dusk" }
    ],
    beats: [
      { at: "Highway 1", say: "Windows down, fog in, fog out. The camera barely kept up.", shots: [0, 1] },
      { at: "McWay", say: "Stopped at every pull-off between Carmel and Lucia. Regretted none of them.", shots: [2, 3] },
      { at: "Pfeiffer", say: "The surf here sounds bigger than it photographs. Stayed until dusk trying to fix that and never did.", shots: [4, 5] }
    ]
  },
  {
    slug: "new-york",
    loc: "New York, NY",
    posted: "2024-12-08",
    place: "New York, back for a week",
    short: "New York",
    when: "December 2024",
    continent: "North America",
    photos: [
      { src: "photos/placeholders/nyc-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Sixth Avenue steam" },
      { src: "photos/placeholders/nyc-2.svg", best: true, w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Snow on the High Line" },
      { src: "photos/placeholders/nyc-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Grand Central, 8 a.m." },
      { src: "photos/placeholders/nyc-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Roosevelt Island tram" },
      { src: "photos/placeholders/nyc-5.svg", best: true, w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Chinatown dusk" },
      { src: "photos/placeholders/nyc-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "The park after the storm" }
    ],
    beats: [
      { at: "Midtown", say: "Back for a week, two years after leaving. Walked the old commute, in snow this time.", shots: [0, 2] },
      { at: "The High Line", say: "Snow makes this city legible. Everything loud goes quiet for about six hours.", shots: [1, 5] },
      { at: "Chinatown", say: "Tram at dusk, then downtown. Ate standing up and shot one-handed.", shots: [3, 4] }
    ]
  },
  {
    slug: "joshua-tree",
    loc: "Joshua Tree National Park",
    posted: "2024-03-22",
    place: "Joshua Tree, dusk to dark",
    short: "Joshua Tree",
    when: "March 2024",
    continent: "North America",
    photos: [
      { src: "photos/placeholders/jtree-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Golden hour boulders" },
      { src: "photos/placeholders/jtree-2.svg", best: true, w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "First stars, Cap Rock" },
      { src: "photos/placeholders/jtree-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Cholla garden" },
      { src: "photos/placeholders/jtree-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Skull Rock silhouette" },
      { src: "photos/placeholders/jtree-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Dusk on the ridge" },
      { src: "photos/placeholders/jtree-6.svg", best: true, w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "The Milky Way, faint" }
    ],
    beats: [
      { at: "Hidden Valley", say: "Came out for the boulders. Stayed for what happened after the sun went.", shots: [0, 2] },
      { at: "Cap Rock", say: "First stars around eight. The cholla garden at dusk is the only hour that place isn't hostile.", shots: [1, 3] },
      { at: "The ridge", say: "Milky Way came in faint. Cold enough by then that I stopped caring whether the tripod was level.", shots: [4, 5] }
    ]
  },
  {
    slug: "the-bay",
    loc: "Bay Area, CA",
    posted: "2023-09-10",
    place: "The Bay, revisited",
    short: "The Bay",
    when: "September 2023",
    continent: "North America",
    photos: [
      { src: "photos/placeholders/bay-1.svg", best: true, w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Fog over the gate" },
      { src: "photos/placeholders/bay-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Berkeley hills, dry gold" },
      { src: "photos/placeholders/bay-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Ocean Beach wind" },
      { src: "photos/placeholders/bay-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Sutro through the mist" },
      { src: "photos/placeholders/bay-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Ferry wake" },
      { src: "photos/placeholders/bay-6.svg", best: true, w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Twin Peaks, blue hour" }
    ],
    beats: [
      { at: "Berkeley", say: "School streets, a decade on. The hills go gold in September and I had completely forgotten that.", shots: [1, 4] },
      { at: "Ocean Beach", say: "Wind off the water all afternoon. Sutro came and went through the mist about six times.", shots: [2, 3] },
      { at: "Twin Peaks", say: "Blue hour over the gate. Same view as always, which was the whole point.", shots: [0, 5] }
    ]
  }
];

/* ============================================================
   POSTS — the journal: standalone blog entries that don't belong
   to a trip. Anything goes — one photo, ten, none. They land on
   the Blog page (and Home when recent), newest first, next to
   the trip posts.

   To post: add an entry here, newest anywhere (order doesn't
   matter — the time sorts it), then bump the ?v= like always.

   { time: "2026-08-09T21:30",       ← local wall time, sorts the feed
     at: "The kitchen table",        ← optional dateline
     head: "A headline",             ← optional; first sentence of
                                        `say` is used when missing
     say: "The words.",
     photos: [                       ← optional, any number
       { src: "photos/journal/frame.jpg", w: 1600, h: 1200,
         alt: "What it shows", caption: "Optional caption" }
     ] }
   ============================================================ */
window.POSTS = [];

/* ============================================================
   MOMENTS — the rest of the record: shows seen, tickets held,
   trips planned. These join the trips in the "Where I've been"
   cloud on the homepage.
   - type: "event" (a show) or "trip"
   - planned: true puts it under "Up next"
   - date: YYYY-MM, drives calendar ordering
   ============================================================ */
window.MOMENTS = [
  { name: "Tame Impala", type: "event", when: "April 2026", date: "2026-04" },
  { name: "Chicago, the move", type: "trip", when: "September 2026", date: "2026-09", planned: true },
  { name: "Buddy Guy", type: "event", when: "October 2026", date: "2026-10", planned: true }
];
