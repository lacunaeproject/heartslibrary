/* ============================================================
   THE COLLECTIONS — one entry per collection. EDIT THIS FILE
   TO POST. (The array is still named TRIPS everywhere; a
   collection is any named set of frames — a trip, a show, a
   theme like "Film scans".)
   ------------------------------------------------------------
   Each collection is a gallery page at gallery.html?trip=<slug>;
   frames flagged `best: true` also hang on the front wall.

   THE TWO HALVES OF AN EXPERIENCE. Its page shows HIGHLIGHTS (the
   frames you flagged `best` — edited later, at a computer) over
   AS IT HAPPENED (the `beats` below — what you wrote and posted
   from inside the moment). A new collection can start as posts
   alone; the highlights appear when you flag some frames. A beat
   may carry its own `photos: [...]` — the unedited ones off your
   phone, kept out of the collection's edited set:

     beats: [
       { time: "2026-08-09T00:07",
         say: "Shooting from the floor, hands shaking.",
         photos: [ { src: "photos/deadbeat-tour/live/img_1204.jpg",
                     w: 1200, h: 1600, alt: "From the floor" } ] }
     ]

   Without `photos:` a beat uses `shots: [i, …]`, indexes into the
   collection's own photos list.

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

   THE LIST BELOW IS REAL — every collection Cody wants tracked,
   newest first, back to 2019. Most are still waiting on their
   photographs: an entry with an empty `photos: []` is a slot, not a
   mistake. It shows on collections.html with a 0-frame count and is
   deliberately kept out of the nav, the burger menu, and the front
   wall until it has frames (see `withFrames` in js/hobby.js).

   To fill one in: drop the images in photos/<slug>/, write a
   trip.txt, and run `node scripts/post.js <slug>` — the poster
   replaces that one entry and leaves the rest alone.

   Entries with only a year in `when` are ordered by a `posted` date
   that is a sort key, not a claim about the day it happened. Put the
   real date in when you know it.
   ============================================================ */
window.TRIPS = [
  {
    slug: "deadbeat-tour",
    posted: "2026-08-05",
    place: "The Deadbeat Tour",
    short: "Deadbeat Tour",
    nav: "Tame Impala: Deadbeat Tour with Djo",
    loc: "Bridgestone Arena",
    when: "August 2026",
    continent: "North America",
    note: "Bought the tickets for Djo months ago and found out that night he was opening for Tame Impala. Shot both sets from the floor.",
    camera: "Sony RX100 VII",
    photos: [
      { src: "photos/deadbeat-tour/dsc03707.jpg", w: 1200, h: 1600, alt: "Green and red beams flood the crowd as a singer grips a handheld mic" },
      { src: "photos/deadbeat-tour/DSC03678.jpg", w: 1200, h: 1600, alt: "Backlit in orange haze, the singer leans into the mic holding a guitar" },
      { src: "photos/deadbeat-tour/DSC03735.jpg", w: 1600, h: 1200, alt: "Hundreds of phone lights ring the arena around the amber-lit center stage" },
      { src: "photos/deadbeat-tour/DSC03795.jpg", w: 1219, h: 1600, alt: "Near-total darkness broken by a red-lit face glowing on the video wall" },
      { src: "photos/deadbeat-tour/DSC03821.jpg", w: 1600, h: 1200, alt: "Wide view of the round stage, orange lasers raking the floor beneath video screens" },
      { src: "photos/deadbeat-tour/DSC03855.jpg", w: 1200, h: 1600, alt: "Bathed in red-orange, a vocalist paces past keyboards while purple beams stripe the curtain" },
      { src: "photos/deadbeat-tour/DSC03865.jpg", w: 1600, h: 1200, alt: "From high above, the in-the-round stage glows magenta, crowd packed on every side" },
      { src: "photos/deadbeat-tour/DSC03881.jpg", w: 1200, h: 1600, alt: "Blurred amber crowd tiers and a handmade sign, camera shake smearing everything" },
      { src: "photos/deadbeat-tour/DSC03946.jpg", w: 1200, h: 1600, alt: "Teal and violet beams above screens relaying an overhead shot" },
      { src: "photos/deadbeat-tour/DSC03950.jpg", w: 1200, h: 1600, alt: "A guitarist walks through green-tinged haze, warm lamps behind" },
      { src: "photos/deadbeat-tour/DSC04021.jpg", best: true, w: 1600, h: 1200, alt: "A single amber shaft cuts to the stage below monochrome screens and packed seats" },
      { src: "photos/deadbeat-tour/DSC04039.jpg", w: 1600, h: 1200, alt: "Blurred dark frame, smeared red and blue light, a figure barely readable" },
      { src: "photos/deadbeat-tour/DSC04044.jpg", w: 1600, h: 1200, alt: "Side-lit on the video wall, a figure plays a keyboard in darkness" },
      { src: "photos/deadbeat-tour/DSC04063.jpg", w: 1081, h: 1600, alt: "Motion-blurred figure with raised arm, blown-out white light and streaking colored bulbs" },
      { src: "photos/deadbeat-tour/DSC04110.jpg", w: 1200, h: 1600, alt: "A lone guitarist on a round stage as confetti falls through teal lasers" },
      { src: "photos/deadbeat-tour/DSC04124.jpg", w: 1600, h: 1200, alt: "Deep blue wash across a hazy stage, rings of blue lights above the band" },
      { src: "photos/deadbeat-tour/DSC04150.jpg", w: 1200, h: 1600, alt: "Walking the confetti-strewn stage, mic in hand, past a glaring white video wall" },
      { src: "photos/deadbeat-tour/DSC04176.jpg", w: 1200, h: 1600, alt: "A singer's face fills the left screen while orange light floods the stage" },
      { src: "photos/deadbeat-tour/DSC04230.jpg", w: 1600, h: 1200, alt: "From above, the singer sings while a camera operator films from stage right" },
      { src: "photos/deadbeat-tour/DSC04243.jpg", w: 1200, h: 1600, alt: "Arm outstretched with the mic, the singer leans toward a hazy backlit crowd" },
      { src: "photos/deadbeat-tour/DSC04281.jpg", w: 1600, h: 1200, alt: "Blue lasers fan across the arena as confetti falls over the round stage" },
      { src: "photos/deadbeat-tour/DSC04282.jpg", w: 1600, h: 1200, alt: "Green laser beams sweep the entire arena, confetti glittering in the light" },
      { src: "photos/deadbeat-tour/DSC04283.jpg", w: 1600, h: 1200, alt: "Dense confetti fills the air above the in-the-round stage under white floodlight" },
      { src: "photos/deadbeat-tour/DSC04368.jpg", w: 1200, h: 1600, alt: "Teal and green light with curved video screens above the circular stage" }
    ],
    beats: [
      { at: "Djo", time: "2026-08-09T00:07", say: "Got these tickets months ago and only found out tonight he was opening for Tame Impala. Shooting from the floor, hands shaking. Will edit the good ones later.", shots: [0] }
    ]
  },
  {
    slug: "universal-hollywood-2026",
    posted: "2026-08-03",
    place: "Universal Studios Hollywood",
    short: "Universal Hollywood",
    nav: "Universal Studios Hollywood",
    when: "2026",
    continent: "North America",
    camera: "Sony RX100 VII",
    photos: [

    ]
  },
  {
    slug: "fenway",
    posted: "2026-08-01",
    place: "Dodgers vs. Redsox",
    short: "Dodgers",
    nav: "Dodgers vs. Redsox",
    loc: "Dodger Stadium",
    when: "August 2026",
    continent: "North America",
    note: "They won it at home in the bottom of the ninth. Everyone stood up at once and I got about six seconds of it.",
    photos: [
      { src: "photos/fenway/redsox-win.mp4", w: 1080, h: 1920, video: true, seconds: 5.9, alt: "The moment it landed", caption: "The moment it landed" }
    ],
    beats: [
      { at: "Bottom of the ninth", say: "They won it at home. Everyone around me stood up at the same time and I got about six seconds of it before my hands were shaking too much to hold the phone still.", shots: [0] }
    ]
  },
  {
    slug: "geffen-galleries",
    posted: "2026-07-20",
    place: "David Geffen Galleries",
    short: "Geffen Galleries",
    nav: "David Geffen Galleries",
    when: "2026",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "sea-world",
    posted: "2026-07-10",
    place: "Sea World",
    short: "Sea World",
    when: "2026",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "san-diego",
    posted: "2026-06-20",
    place: "My trip to San Diego",
    short: "San Diego",
    nav: "San Diego Zoo",
    loc: "San Diego, CA",
    when: "June 2026",
    continent: "North America",
    cover: "photos/sandiego-zoo/web/grizzly-2.jpg",
    note: "Went for the zoo and basically never left it — most of a day with the big cats and the orangutans.",
    camera: "Sony A7CR",
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
    slug: "blue-whale-watching",
    posted: "2026-06-10",
    place: "Blue Whale Watching",
    short: "Blue Whales",
    nav: "Blue Whale Watching",
    when: "2026",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "monet-giverny",
    posted: "2026-05-20",
    place: "Claude Monet’s House and Garden",
    short: "Giverny",
    nav: "Claude Monet’s House and Garden",
    loc: "Giverny, France",
    when: "2026",
    continent: "Europe",
    note: "Took the train out from Paris to see the pond. Expected to be underwhelmed and wasn't.",
    photos: [
      { src: "photos/london-paris/web/monet-pond.jpg", best: true, w: 1200, h: 1600, alt: "Water lilies on Monet's pond at Giverny, clouds reflected in the water", caption: "Monet's pond, Giverny" }
    ],
    beats: [
      { at: "Giverny", say: "Went to Monet's pond expecting to be underwhelmed. Wasn't.", shots: [0] }
    ]
  },
  {
    slug: "paris",
    posted: "2026-05-15",
    place: "Paris",
    short: "Paris",
    when: "2026",
    continent: "Europe",
    photos: [

    ],
    beats: [
      { at: "Paris", say: "Two cities, one carry-on. Gold hour on the Seine, then a tabac in the 7th where nobody minded the camera at all." }
    ]
  },
  {
    slug: "london",
    posted: "2026-05-10",
    place: "London",
    short: "London",
    when: "2026",
    continent: "Europe",
    photos: [

    ],
    beats: [
      { at: "London", say: "Fog on the Thames every single morning, which felt like a cliché right up until I was standing in it. The Barbican in rain is the best building I've ever pointed a camera at." }
    ]
  },
  {
    slug: "yankees-rays",
    posted: "2026-04-15",
    place: "Yankees vs. Rays",
    short: "Yankees",
    nav: "Yankees vs. Rays",
    when: "2026",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "chicago-2026",
    posted: "2026-03-10",
    place: "Chicago",
    short: "Chicago",
    when: "2026",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "lakers-rockets",
    posted: "2025-12-25",
    place: "Lakers vs. Rockets",
    short: "Lakers",
    nav: "Lakers vs. Rockets",
    when: "December 2025",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "walt-disney-world",
    posted: "2025-11-01",
    place: "Walt Disney World",
    short: "Disney World",
    nav: "Walt Disney World",
    when: "2025",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "epic-universe",
    posted: "2025-09-01",
    place: "Universal Studios Epic Universe+",
    short: "Epic Universe",
    nav: "Universal Studios Epic Universe+",
    when: "2025",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "universal-hollywood-2025",
    posted: "2025-07-01",
    place: "Universal Studios Hollywood",
    short: "Universal Hollywood",
    nav: "Universal Studios Hollywood",
    when: "2025",
    continent: "North America",
    camera: "Sony RX100 VII",
    photos: [

    ]
  },
  {
    slug: "gatlinburg-pigeon-forge",
    posted: "2025-05-01",
    place: "Gatlinburg and Pigeon Forge",
    short: "Gatlinburg",
    nav: "Gatlinburg and Pigeon Forge",
    when: "2025",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "denver",
    posted: "2024-10-01",
    place: "Denver",
    short: "Denver",
    when: "2024",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "scotland",
    posted: "2024-07-01",
    place: "Scotland",
    short: "Scotland",
    when: "2024",
    continent: "Europe",
    photos: [

    ]
  },
  {
    slug: "disneyland-california-adventure",
    posted: "2024-04-01",
    place: "Disneyland and California Adventure",
    short: "Disneyland",
    nav: "Disneyland and California Adventure",
    when: "2024",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "massachusetts",
    posted: "2022-06-01",
    place: "Massachusetts",
    short: "Massachusetts",
    when: "2022",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "salt-lake-city",
    posted: "2019-11-01",
    place: "Salt Lake City",
    short: "Salt Lake City",
    when: "2019",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "oregon-colorado",
    posted: "2019-09-01",
    place: "Oregon and Colorado",
    short: "Oregon & Colorado",
    nav: "Oregon and Colorado",
    when: "2019",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "sequoia-national-park",
    posted: "2019-07-01",
    place: "Sequoia National Park",
    short: "Sequoia",
    nav: "Sequoia National Park",
    when: "2019",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "dollywood",
    posted: "2019-05-01",
    place: "Dollywood",
    short: "Dollywood",
    when: "2019",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "chicago-2019",
    posted: "2019-04-01",
    place: "Chicago",
    short: "Chicago",
    when: "2019",
    continent: "North America",
    photos: [

    ]
  },
  {
    slug: "mexico",
    posted: "2019-02-01",
    place: "Mexico",
    short: "Mexico",
    when: "2019",
    continent: "North America",
    photos: [

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
window.POSTS = [
  { time: "2026-08-11T19:40",
    title: "The pizza",
    at: "Emmy Squared, East Nashville",
    say: "Detroit style, burnt cheese right to the edge of the pan. No photograph of it does anything for you, so here is the note instead." },

  { time: "2026-08-10T08:15",
    at: "Nashville",
    say: "Started keeping these on my phone instead of in my head. Most of them are two sentences long. That seems to be the whole trick." },

  { time: "2026-08-06T19:40",
    at: "Shelby Park",
    head: "Nothing on the card",
    say: "Walked the greenway after work, shot maybe forty frames, kept none of them. Still glad I brought the camera. Some evenings that is the entire report." }
];

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
