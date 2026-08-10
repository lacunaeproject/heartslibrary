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
   from inside the moment). A new experience can start as posts
   alone; the highlights appear when you flag some frames. A beat
   may carry its own `photos: [...]` — the unedited ones off your
   phone, kept out of the experience's edited set:

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

   ⚠ EVERYTHING BELOW IS SAMPLE CONTENT. The images are
   generated placeholder art (photos/placeholders/*.svg) —
   replace the trips wholesale with your own.
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
    photos: [
      { src: "photos/deadbeat-tour/dsc03659.jpg", w: 1200, h: 1600, alt: "Purple haze washes a round stage as the guitarist walks toward the crowd" },
      { src: "photos/deadbeat-tour/dsc03676.jpg", w: 1200, h: 1600, alt: "Warm amber light on the singer at the mic, bandmates clustered right" },
      { src: "photos/deadbeat-tour/dsc03707.jpg", w: 1200, h: 1600, alt: "Green and red beams flood the crowd as a singer grips a handheld mic" },
      { src: "photos/deadbeat-tour/dsc03683.jpg", w: 1200, h: 1600, alt: "Black and white frame, a figure raising one arm to the crowd through haze" },
      { src: "photos/deadbeat-tour/C0035T01.jpg", w: 1280, h: 720, alt: "Teal and green wash the stage lip, a lone figure standing above the barricade" },
      { src: "photos/deadbeat-tour/dsc03638.jpg", best: true, w: 1600, h: 1200, alt: "Deep red smoke swallows the stage, silhouetted players at guitar and keyboards" },
      { src: "photos/deadbeat-tour/dsc03660.jpg", best: true, w: 1200, h: 1600, alt: "Motion blur streaks violet and yellow as the guitarist strides mid-song" },
      { src: "photos/deadbeat-tour/DSC03678.jpg", w: 1200, h: 1600, alt: "Backlit in orange haze, the singer leans into the mic holding a guitar" },
      { src: "photos/deadbeat-tour/dsc03684.jpg", best: true, w: 1200, h: 1600, alt: "Cyan floodlight silhouettes the singer, one arm outstretched toward a blue-tinted crowd" },
      { src: "photos/deadbeat-tour/DSC03706.jpg", w: 1200, h: 1600, alt: "Distant arena view with green beams crossing above the round stage and video screen" },
      { src: "photos/deadbeat-tour/DSC03710.jpg", w: 1200, h: 1600, alt: "Orange haze and teal floor light frame the singer mid-vocal, guitarist behind" },
      { src: "photos/deadbeat-tour/DSC03735.jpg", w: 1600, h: 1200, alt: "Hundreds of phone lights ring the arena around the amber-lit center stage" },
      { src: "photos/deadbeat-tour/DSC03743.jpg", w: 1200, h: 1600, alt: "Full band at keyboards, bass and drums, hazy beams cutting over the crowd" },
      { src: "photos/deadbeat-tour/DSC03751.jpg", w: 1071, h: 1387, alt: "Motion-blurred figure in a yellow shirt doubles over, arm flung out against blue" },
      { src: "photos/deadbeat-tour/DSC03783.jpg", w: 1320, h: 1600, alt: "Two guitarists lean into a riff under white haze, one in yellow tee" },
      { src: "photos/deadbeat-tour/dsc03789.jpg", best: true, w: 1181, h: 1600, alt: "Black-and-white frame, a guitarist kicks mid-air on the stage lip, crowd behind" },
      { src: "photos/deadbeat-tour/DSC03794.jpg", w: 1359, h: 1600, alt: "Screen close-up of a face lit red, eyes shut, against purple pixels" },
      { src: "photos/deadbeat-tour/DSC03795.jpg", w: 1219, h: 1600, alt: "Near-total darkness broken by a red-lit face glowing on the video wall" },
      { src: "photos/deadbeat-tour/DSC03808.jpg", w: 1600, h: 1200, alt: "Purple and orange laser fans converge across the stage, two musicians silhouetted behind" },
      { src: "photos/deadbeat-tour/DSC03821.jpg", w: 1600, h: 1200, alt: "Wide view of the round stage, orange lasers raking the floor beneath video screens" },
      { src: "photos/deadbeat-tour/DSC03822.jpg", w: 1329, h: 1600, alt: "Green-edged orange lasers burst from one point toward a band in purple smoke" },
      { src: "photos/deadbeat-tour/DSC03825.jpg", w: 1600, h: 601, alt: "Blurred panoramic crop of the video wall, a guitarist silhouette and cymbal in orange bloom" },
      { src: "photos/deadbeat-tour/DSC03840.jpg", w: 1200, h: 1600, alt: "The singer sings alone at the stage edge as green smoke billows behind" },
      { src: "photos/deadbeat-tour/DSC03855.jpg", w: 1200, h: 1600, alt: "Bathed in red-orange, a vocalist paces past keyboards while purple beams stripe the curtain" },
      { src: "photos/deadbeat-tour/DSC03859.jpg", w: 1200, h: 1600, alt: "Violet beams slice diagonally across a lone figure at the mic, crowd surrounding" },
      { src: "photos/deadbeat-tour/DSC03865.jpg", w: 1600, h: 1200, alt: "From high above, the in-the-round stage glows magenta, crowd packed on every side" },
      { src: "photos/deadbeat-tour/DSC03868.jpg", w: 1600, h: 1200, alt: "Band on a round arena stage under pink and violet haze" },
      { src: "photos/deadbeat-tour/DSC03881.jpg", w: 1200, h: 1600, alt: "Blurred amber crowd tiers and a handmade sign, camera shake smearing everything" },
      { src: "photos/deadbeat-tour/DSC03896.jpg", w: 1200, h: 1600, alt: "Single orange beam cutting a wedge through dust, stage nearly black" },
      { src: "photos/deadbeat-tour/DSC03908.jpg", w: 1200, h: 1600, alt: "Red lasers fan across a circular stage, band silhouetted mid-song" },
      { src: "photos/deadbeat-tour/DSC03917.jpg", w: 1200, h: 1600, alt: "Dozens of red laser lines converge at one point above the crowd" },
      { src: "photos/deadbeat-tour/DSC03926.jpg", w: 1200, h: 1600, alt: "Dim orange stage glow, blurred keyboards and one standing figure" },
      { src: "photos/deadbeat-tour/DSC03943.jpg", w: 1200, h: 1600, alt: "Overhead screens show a figure lying on the grated stage floor" },
      { src: "photos/deadbeat-tour/DSC03946.jpg", w: 1200, h: 1600, alt: "Teal and violet beams above screens relaying an overhead shot" },
      { src: "photos/deadbeat-tour/DSC03947.jpg", w: 1200, h: 1600, alt: "Purple beams converge over silhouetted rigging and smoke on stage" },
      { src: "photos/deadbeat-tour/DSC03950.jpg", w: 1200, h: 1600, alt: "A guitarist walks through green-tinged haze, warm lamps behind" },
      { src: "photos/deadbeat-tour/DSC03953.jpg", w: 1200, h: 1600, alt: "Light shafts cut through smoke onto a guitarist at the mic" },
      { src: "photos/deadbeat-tour/DSC03960.jpg", w: 1179, h: 1600, alt: "Video wall close-up, blurred arm raised with mic against rigging" },
      { src: "photos/deadbeat-tour/DSC03962.jpg", w: 1600, h: 1073, alt: "Pixelated screen feed of a singer at the mic, hand outstretched" },
      { src: "photos/deadbeat-tour/DSC03964.jpg", w: 1200, h: 1600, alt: "Grainy video-screen close-up, the singer at the mic in a pale blue shirt" },
      { src: "photos/deadbeat-tour/DSC03971.jpg", w: 1600, h: 1200, alt: "Black-and-white screen fills the frame, a hand gripping the mic, LED pixels visible" },
      { src: "photos/deadbeat-tour/DSC03997.jpg", w: 1200, h: 1600, alt: "From above, red spotlight on a lone figure crossing the round stage" },
      { src: "photos/deadbeat-tour/DSC04002.jpg", w: 1200, h: 1600, alt: "Silhouetted heads at a railing while teal lasers fan across a violet arena" },
      { src: "photos/deadbeat-tour/DSC04017.jpg", w: 1600, h: 1200, alt: "Red beams radiate over the circular stage, band mid-song in drifting smoke" },
      { src: "photos/deadbeat-tour/DSC04020.jpg", w: 1600, h: 1200, alt: "Lasers converge to one burning point above the small amber-lit stage" },
      { src: "photos/deadbeat-tour/DSC04021.jpg", w: 1600, h: 1200, alt: "A single amber shaft cuts to the stage below monochrome screens and packed seats" },
      { src: "photos/deadbeat-tour/DSC04039.jpg", w: 1600, h: 1200, alt: "Blurred dark frame, smeared red and blue light, a figure barely readable" },
      { src: "photos/deadbeat-tour/DSC04042.jpg", w: 1221, h: 1600, alt: "Nearly black and grainy, a figure hunched over equipment, faint stage lights beyond" },
      { src: "photos/deadbeat-tour/DSC04044.jpg", w: 1600, h: 1200, alt: "Side-lit on the video wall, a figure plays a keyboard in darkness" },
      { src: "photos/deadbeat-tour/DSC04046.jpg", w: 1600, h: 1200, alt: "The keyboardist onscreen again, one arm reaching across the synth, surrounded by black" },
      { src: "photos/deadbeat-tour/DSC04051.jpg", w: 1249, h: 1600, alt: "Out-of-focus stage lamps, two white orbs with green, blue, and orange bokeh" },
      { src: "photos/deadbeat-tour/DSC04057.jpg", w: 1174, h: 1600, alt: "Tilted screen close-up of a figure singing into a mic, warm amber flare" },
      { src: "photos/deadbeat-tour/DSC04063.jpg", w: 1081, h: 1600, alt: "Motion-blurred figure with raised arm, blown-out white light and streaking colored bulbs" },
      { src: "photos/deadbeat-tour/DSC04110.jpg", w: 1200, h: 1600, alt: "A lone guitarist on a round stage as confetti falls through teal lasers" },
      { src: "photos/deadbeat-tour/DSC04121.jpg", w: 1200, h: 1600, alt: "Near-darkness, a figure over glowing amber keyboards, green lasers fanning across the floor" },
      { src: "photos/deadbeat-tour/DSC04124.jpg", w: 1600, h: 1200, alt: "Deep blue wash across a hazy stage, rings of blue lights above the band" },
      { src: "photos/deadbeat-tour/DSC04142.jpg", w: 1600, h: 1200, alt: "Tilted view of a video wall showing a high-contrast singer at the mic" },
      { src: "photos/deadbeat-tour/DSC04150.jpg", w: 1200, h: 1600, alt: "Walking the confetti-strewn stage, mic in hand, past a glaring white video wall" },
      { src: "photos/deadbeat-tour/DSC04156.jpg", w: 1200, h: 1600, alt: "Wide arena view, a dozen purple beams converging on the circular stage" },
      { src: "photos/deadbeat-tour/DSC04175.jpg", w: 1200, h: 1600, alt: "Red-saturated arena, twin hanging screens above smoke and a confetti-covered round stage" },
      { src: "photos/deadbeat-tour/DSC04176.jpg", w: 1200, h: 1600, alt: "A singer's face fills the left screen while orange light floods the stage" },
      { src: "photos/deadbeat-tour/DSC04206.jpg", w: 1600, h: 1200, alt: "Almost entirely lasers, magenta and cyan beams radiating from one bright point" },
      { src: "photos/deadbeat-tour/DSC04228.jpg", w: 1600, h: 1200, alt: "Blue-shirted singer at the mic, orange stage, crowd pressed against the barricade" },
      { src: "photos/deadbeat-tour/DSC04230.jpg", w: 1600, h: 1200, alt: "From above, the singer sings while a camera operator films from stage right" },
      { src: "photos/deadbeat-tour/DSC04233.jpg", w: 1600, h: 1200, alt: "The round stage cuts diagonally through darkness, the singer small at the mic" },
      { src: "photos/deadbeat-tour/DSC04234.jpg", w: 1600, h: 1200, alt: "Motion-blurred streaks of orange and white smear across a dark stage" },
      { src: "photos/deadbeat-tour/DSC04241.jpg", w: 1200, h: 1600, alt: "Tilted frame, a guitarist sings at the mic, crowd tiers rising behind" },
      { src: "photos/deadbeat-tour/DSC04243.jpg", w: 1200, h: 1600, alt: "Arm outstretched with the mic, the singer leans toward a hazy backlit crowd" },
      { src: "photos/deadbeat-tour/DSC04281.jpg", w: 1600, h: 1200, alt: "Blue lasers fan across the arena as confetti falls over the round stage" },
      { src: "photos/deadbeat-tour/DSC04282.jpg", w: 1600, h: 1200, alt: "Green laser beams sweep the entire arena, confetti glittering in the light" },
      { src: "photos/deadbeat-tour/DSC04283.jpg", w: 1600, h: 1200, alt: "Dense confetti fills the air above the in-the-round stage under white floodlight" },
      { src: "photos/deadbeat-tour/DSC04292.jpg", w: 1200, h: 1600, alt: "Under a purple wash, a figure sings center stage between two keyboard players" },
      { src: "photos/deadbeat-tour/DSC04298.jpg", w: 1200, h: 1600, alt: "Orange and magenta ghosting doubles the frame as the singer walks the ring" },
      { src: "photos/deadbeat-tour/DSC04300.jpg", w: 1200, h: 1600, alt: "Saturated pink floods the circular stage, a lone figure singing beneath a light bar" },
      { src: "photos/deadbeat-tour/DSC04307.jpg", w: 1200, h: 1600, alt: "Walking the stage lip in green haze, a figure faces the barricade crowd" },
      { src: "photos/deadbeat-tour/DSC04332.jpg", w: 1600, h: 1200, alt: "Deep red wash over a nearly black arena, the round stage barely lit" },
      { src: "photos/deadbeat-tour/DSC04368.jpg", w: 1200, h: 1600, alt: "Teal and green light with curved video screens above the circular stage" }
    ],
    beats: [
      { at: "Djo", time: "2026-08-09T00:07", say: "Got these tickets months ago and only found out tonight he was opening for Tame Impala. Shooting from the floor, hands shaking. Will edit the good ones later.", shots: [0, 1, 2, 3] }
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
    slug: "los-angeles",
    posted: "2026-07-11",
    place: "Los Angeles in July",
    short: "Los Angeles",
    nav: "David Geffen Galleries",
    loc: "LACMA",
    when: "July 2026",
    continent: "North America",
    note: "The new building's first summer. Went for the architecture and stayed for the light coming through it.",
    photos: [
      { src: "photos/placeholders/la-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Marine layer over the basin" },
      { src: "photos/placeholders/la-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Palms on Rossmore" },
      { src: "photos/placeholders/la-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "The 110 at gold hour" },
      { src: "photos/placeholders/la-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Stucco and shadow, Echo Park" },
      { src: "photos/placeholders/la-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Haze off the Pacific" },
      { src: "photos/placeholders/la-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Griffith, waiting for dark" },
      { src: "photos/placeholders/la-7.svg", best: true, w: 1000, h: 1000, alt: "Placeholder frame — replace with your photo", caption: "Wilshire, mid-afternoon" },
      { src: "photos/placeholders/la-8.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "The basin from the third floor" },
      { src: "photos/placeholders/la-9.svg", best: true, w: 900, h: 1200, alt: "Placeholder frame — replace with your photo", caption: "Travertine and shadow" },
      { src: "photos/placeholders/la-10.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "Last light on the plaza" }
    ],
    beats: [
      { at: "Mid-Wilshire", say: "The marine layer never really burned off. Grey until noon, gold by five, grey again for the drive home.", shots: [0, 1] },
      { at: "Echo Park", say: "Spent most of a week photographing stucco. It's the shadows here. They land harder than anywhere else I've shot.", shots: [2, 3] },
      { at: "Griffith", say: "Waited two hours for dark. Got about ninety seconds out of it.", shots: [4, 5] }
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
    posted: "2026-02-21",
    place: "Chicago in February",
    short: "Chicago",
    nav: "Bulls vs. Pistons",
    loc: "United Center",
    when: "February 2026",
    continent: "North America",
    note: "February in Chicago on purpose, the year before the move. First game at the United Center.",
    photos: [
      { src: "photos/placeholders/chi-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "The lakefront, frozen over" },
      { src: "photos/placeholders/chi-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Steam over the Loop" },
      { src: "photos/placeholders/chi-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Snow on the Blue Line" },
      { src: "photos/placeholders/chi-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Radiator light, Logan Square" },
      { src: "photos/placeholders/chi-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "The El in a whiteout" },
      { src: "photos/placeholders/chi-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Lake Michigan, minus nine" },
      { src: "photos/placeholders/chi-7.svg", best: true, w: 1000, h: 1000, alt: "Placeholder frame — replace with your photo", caption: "The lake, frozen out to the crib" },
      { src: "photos/placeholders/chi-8.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "Wacker at dusk" },
      { src: "photos/placeholders/chi-9.svg", best: true, w: 900, h: 1200, alt: "Placeholder frame — replace with your photo", caption: "Snow coming across the river" },
      { src: "photos/placeholders/chi-10.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "Blue hour, west loop" }
    ],
    beats: [
      { at: "The lakefront", say: "Came in February on purpose. If I'm moving here I wanted to see it at its worst first.", shots: [0, 1] },
      { at: "Logan Square", say: "Minus nine outside and the radiators were winning. Best light of the trip came through a window I had no business standing near.", shots: [2, 3] },
      { at: "The Blue Line", say: "Shot the El in a whiteout. Couldn't feel my hands for an hour after.", shots: [4, 5] }
    ]
  },
  {
    slug: "london-paris",
    posted: "2025-10-12",
    place: "London and Paris",
    short: "London & Paris",
    nav: "Claude Monet’s House and Gardens",
    loc: "Giverny, France",
    when: "October 2025",
    continent: "Europe",
    note: "Took the train out from Paris to see the pond. Expected to be underwhelmed and wasn't.",
    photos: [
      { src: "photos/london-paris/web/monet-pond.jpg", best: true, w: 1200, h: 1600, alt: "Water lilies on Monet's pond at Giverny, clouds reflected in the water", caption: "Monet's pond, Giverny" },
      { src: "photos/placeholders/ldnpar-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Thames fog, morning" },
      { src: "photos/placeholders/ldnpar-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Gold hour on the Seine" },
      { src: "photos/placeholders/ldnpar-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Barbican in the rain" },
      { src: "photos/placeholders/ldnpar-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Café tabac, 7th arrondissement" },
      { src: "photos/placeholders/ldnpar-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "St Paul's from the bridge" },
      { src: "photos/placeholders/ldnpar-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Montmartre stairs" },
      { src: "photos/placeholders/ldnpar-7.svg", best: true, w: 1000, h: 1000, alt: "Placeholder frame — replace with your photo", caption: "The pond, second morning" },
      { src: "photos/placeholders/ldnpar-8.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "Willows over the water" },
      { src: "photos/placeholders/ldnpar-9.svg", best: true, w: 900, h: 1200, alt: "Placeholder frame — replace with your photo", caption: "The garden path" },
      { src: "photos/placeholders/ldnpar-10.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "Giverny, going grey" }
    ],
    beats: [
      { at: "Giverny", say: "Went to Monet's pond expecting to be underwhelmed. Wasn't.", shots: [0] },
      { at: "London", say: "Fog on the Thames every single morning, which felt like a cliché right up until I was standing in it. The Barbican in rain is the best building I've ever pointed a camera at.", shots: [1, 3, 5] },
      { at: "Paris", say: "Two cities, one carry-on. Gold hour on the Seine, then a tabac in the 7th where nobody minded the camera at all.", shots: [2, 4, 6] }
    ]
  },
  {
    slug: "nashville",
    posted: "2025-08-16",
    place: "Nashville, before the move",
    short: "Nashville",
    loc: "Nashville, TN",
    when: "August 2025",
    continent: "North America",
    note: "One last slow lap before the move — Franklin, Radnor Lake, and Lower Broadway at first light.",
    photos: [
      { src: "photos/placeholders/nash-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Lower Broadway from the bridge" },
      { src: "photos/placeholders/nash-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Radnor Lake, first light" },
      { src: "photos/placeholders/nash-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Porch storm, Franklin" },
      { src: "photos/placeholders/nash-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "The Ryman’s alley" },
      { src: "photos/placeholders/nash-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Harpeth bends" },
      { src: "photos/placeholders/nash-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Neon spill, Printer’s Alley" },
      { src: "photos/placeholders/nash-7.svg", best: true, w: 1000, h: 1000, alt: "Placeholder frame — replace with your photo", caption: "Ridge line off Highway 96" },
      { src: "photos/placeholders/nash-8.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "The Harpeth in low water" },
      { src: "photos/placeholders/nash-9.svg", best: true, w: 900, h: 1200, alt: "Placeholder frame — replace with your photo", caption: "Late summer, Franklin" },
      { src: "photos/placeholders/nash-10.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "First light, Radnor" }
    ],
    beats: [
      { at: "Franklin", say: "One last slow lap before the move. Sat out a storm on the porch and didn't take a frame for an hour.", shots: [2, 4] },
      { at: "Lower Broadway", say: "Easier to photograph than to stand in. Went at first light, when it was still just a street.", shots: [0, 3] },
      { at: "Radnor Lake", say: "First light, nobody else out. Printer's Alley later on, neon doing what neon does.", shots: [1, 5] }
    ]
  },
  {
    slug: "big-sur",
    posted: "2025-05-18",
    place: "Big Sur, Highway 1",
    short: "Big Sur",
    loc: "Big Sur, CA",
    when: "May 2025",
    continent: "North America",
    note: "Highway 1 from Carmel down to Lucia, stopping at every pull-off. Fog in, fog out, all afternoon.",
    photos: [
      { src: "photos/placeholders/bigsur-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Bixby at golden hour" },
      { src: "photos/placeholders/bigsur-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Redwood understory" },
      { src: "photos/placeholders/bigsur-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "McWay cove" },
      { src: "photos/placeholders/bigsur-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Fog over Point Sur" },
      { src: "photos/placeholders/bigsur-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Pfeiffer surf" },
      { src: "photos/placeholders/bigsur-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Highway pull-off, dusk" },
      { src: "photos/placeholders/bigsur-7.svg", best: true, w: 1000, h: 1000, alt: "Placeholder frame — replace with your photo", caption: "South from Bixby" },
      { src: "photos/placeholders/bigsur-8.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "The cove at slack tide" },
      { src: "photos/placeholders/bigsur-9.svg", best: true, w: 900, h: 1200, alt: "Placeholder frame — replace with your photo", caption: "Fog on the ridge road" },
      { src: "photos/placeholders/bigsur-10.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "Pfeiffer, late afternoon" }
    ],
    beats: [
      { at: "Highway 1", say: "Windows down, fog in, fog out. The camera barely kept up.", shots: [0, 1] },
      { at: "McWay", say: "Stopped at every pull-off between Carmel and Lucia. Regretted none of them.", shots: [2, 3] },
      { at: "Pfeiffer", say: "The surf here sounds bigger than it photographs. Stayed until dusk trying to fix that and never did.", shots: [4, 5] }
    ]
  },
  {
    slug: "new-york",
    posted: "2024-12-08",
    place: "New York, back for a week",
    short: "New York",
    loc: "New York, NY",
    when: "December 2024",
    continent: "North America",
    note: "Back for a week, two years after leaving. Walked the old commute, in snow this time.",
    photos: [
      { src: "photos/placeholders/nyc-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Sixth Avenue steam" },
      { src: "photos/placeholders/nyc-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Snow on the High Line" },
      { src: "photos/placeholders/nyc-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Grand Central, 8 a.m." },
      { src: "photos/placeholders/nyc-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Roosevelt Island tram" },
      { src: "photos/placeholders/nyc-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Chinatown dusk" },
      { src: "photos/placeholders/nyc-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "The park after the storm" },
      { src: "photos/placeholders/nyc-7.svg", best: true, w: 1000, h: 1000, alt: "Placeholder frame — replace with your photo", caption: "Sixth Avenue in the snow" },
      { src: "photos/placeholders/nyc-8.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "The park after the storm" },
      { src: "photos/placeholders/nyc-9.svg", best: true, w: 900, h: 1200, alt: "Placeholder frame — replace with your photo", caption: "Uptown, white sky" },
      { src: "photos/placeholders/nyc-10.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "Hudson light, late day" }
    ],
    beats: [
      { at: "Midtown", say: "Back for a week, two years after leaving. Walked the old commute, in snow this time.", shots: [0, 2] },
      { at: "The High Line", say: "Snow makes this city legible. Everything loud goes quiet for about six hours.", shots: [1, 5] },
      { at: "Chinatown", say: "Tram at dusk, then downtown. Ate standing up and shot one-handed.", shots: [3, 4] }
    ]
  },
  {
    slug: "joshua-tree",
    posted: "2024-03-22",
    place: "Joshua Tree, dusk to dark",
    short: "Joshua Tree",
    loc: "Joshua Tree National Park",
    when: "March 2024",
    continent: "North America",
    note: "Came out for the boulders and stayed for what happened after the sun went down.",
    photos: [
      { src: "photos/placeholders/jtree-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Golden hour boulders" },
      { src: "photos/placeholders/jtree-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "First stars, Cap Rock" },
      { src: "photos/placeholders/jtree-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Cholla garden" },
      { src: "photos/placeholders/jtree-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Skull Rock silhouette" },
      { src: "photos/placeholders/jtree-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Dusk on the ridge" },
      { src: "photos/placeholders/jtree-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "The Milky Way, faint" },
      { src: "photos/placeholders/jtree-7.svg", best: true, w: 1000, h: 1000, alt: "Placeholder frame — replace with your photo", caption: "Dusk over the boulders" },
      { src: "photos/placeholders/jtree-8.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "Cap Rock, first stars" },
      { src: "photos/placeholders/jtree-9.svg", best: true, w: 900, h: 1200, alt: "Placeholder frame — replace with your photo", caption: "The cholla garden going dark" },
      { src: "photos/placeholders/jtree-10.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "Last colour on the ridge" }
    ],
    beats: [
      { at: "Hidden Valley", say: "Came out for the boulders. Stayed for what happened after the sun went.", shots: [0, 2] },
      { at: "Cap Rock", say: "First stars around eight. The cholla garden at dusk is the only hour that place isn't hostile.", shots: [1, 3] },
      { at: "The ridge", say: "Milky Way came in faint. Cold enough by then that I stopped caring whether the tripod was level.", shots: [4, 5] }
    ]
  },
  {
    slug: "the-bay",
    posted: "2023-09-10",
    place: "The Bay, revisited",
    short: "The Bay",
    loc: "Bay Area, CA",
    when: "September 2023",
    continent: "North America",
    note: "School streets a decade on. The hills go gold in September and I had completely forgotten that.",
    photos: [
      { src: "photos/placeholders/bay-1.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Fog over the gate" },
      { src: "photos/placeholders/bay-2.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Berkeley hills, dry gold" },
      { src: "photos/placeholders/bay-3.svg", w: 4, h: 3, alt: "Placeholder frame — replace with your photo", caption: "Ocean Beach wind" },
      { src: "photos/placeholders/bay-4.svg", w: 1, h: 1, alt: "Placeholder frame — replace with your photo", caption: "Sutro through the mist" },
      { src: "photos/placeholders/bay-5.svg", w: 3, h: 2, alt: "Placeholder frame — replace with your photo", caption: "Ferry wake" },
      { src: "photos/placeholders/bay-6.svg", w: 3, h: 4, alt: "Placeholder frame — replace with your photo", caption: "Twin Peaks, blue hour" },
      { src: "photos/placeholders/bay-7.svg", best: true, w: 1000, h: 1000, alt: "Placeholder frame — replace with your photo", caption: "The hills gone gold" },
      { src: "photos/placeholders/bay-8.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "Fog over the gate" },
      { src: "photos/placeholders/bay-9.svg", best: true, w: 900, h: 1200, alt: "Placeholder frame — replace with your photo", caption: "Berkeley, late September" },
      { src: "photos/placeholders/bay-10.svg", best: true, w: 1200, h: 900, alt: "Placeholder frame — replace with your photo", caption: "Twin Peaks at blue hour" }
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
