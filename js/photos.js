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
      { src: "photos/deadbeat-tour/DSC04021.jpg", w: 1600, h: 1200, alt: "A single amber shaft cuts to the stage below monochrome screens and packed seats" },
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
    slug: "universal-hollywood",
    posted: "2026-08-03",
    place: "Universal Studios Hollywood",
    short: "Universal Hollywood",
    when: "2026",
    continent: "North America",
    photos: [
      { src: "photos/universal-hollywood/DSC02722.jpg", w: 1200, h: 1600, alt: "Hogsmeade's snow-capped roofs under a blown-out sun, the castle spires beyond" },
      { src: "photos/universal-hollywood/DSC02723.jpg", w: 1200, h: 1600, alt: "The same street a moment later, visitors crossing the cobbles under icicled eaves" },
      { src: "photos/universal-hollywood/DSC02737.jpg", w: 1600, h: 1200, alt: "Looking down the Starway's glass tunnel, escalators running to the lower lot" },
      { src: "photos/universal-hollywood/DSC02770.jpg", w: 1600, h: 1200, alt: "A backlot gas station set — Frank's Automotive, Gasoline & Oil — under hard blue sky" },
      { src: "photos/universal-hollywood/DSC02796.jpg", w: 1600, h: 1200, alt: "The Jaws shark lunging out of the green lagoon beside the tram" },
      { src: "photos/universal-hollywood/DSC02800.jpg", w: 1600, h: 1200, alt: "Close on the shark's head streaming water, teeth bared over green water" },
      { src: "photos/universal-hollywood/DSC02815.jpg", w: 1200, h: 1600, alt: "Water bursting across the tram window, the flash-flood set smeared to abstraction" },
      { src: "photos/universal-hollywood/DSC02817.jpg", w: 1200, h: 1600, alt: "The same wall of water, control panels and warning signs dissolving behind it" },
      { src: "photos/universal-hollywood/DSC02830.jpg", w: 1200, h: 1600, alt: "The Jaws shark strung up by the tail on the Amity dock, a HOTEL sign behind" },
      { src: "photos/universal-hollywood/DSC02843.jpg", w: 1200, h: 1600, alt: "The Bates Motel sign against blue sky, the house standing on the hill behind the fence" },
      { src: "photos/universal-hollywood/DSC02852.jpg", w: 1600, h: 1200, alt: "Rows of seats in the torn-open 747 wreck set, purple fuselage peeled back" },
      { src: "photos/universal-hollywood/DSC02867.jpg", w: 1600, h: 1200, alt: "A white horse prop upended on a pickup roof under pines" },
      { src: "photos/universal-hollywood/DSC02871.jpg", w: 1200, h: 1600, alt: "Looking up at a giant inflatable cowboy moored over the Jupiter's Claim rooftops" },
      { src: "photos/universal-hollywood/DSC02872.jpg", w: 1200, h: 1600, alt: "The same inflatable from the boardwalk, bunting strung across the western storefronts" },
      { src: "photos/universal-hollywood/DSC02873.jpg", w: 1200, h: 1600, alt: "Two cowboy mannequins sitting out on a saloon porch under star-spangled bunting" },
      { src: "photos/universal-hollywood/DSC02874.jpg", w: 1200, h: 1600, alt: "The inflatable rising over Dusty's Candy Bowl, pennants strung across the sand" },
      { src: "photos/universal-hollywood/DSC02875.jpg", w: 1200, h: 1600, alt: "The Sundae Saloon facade in hard sun, a figure seated either side of the doors" },
      { src: "photos/universal-hollywood/DSC02877.jpg", w: 1200, h: 1600, alt: "The inflatable's face and sheriff's star seen over the Licorice Rope sign" },
      { src: "photos/universal-hollywood/DSC02881.jpg", w: 1200, h: 1600, alt: "Parker's leather shop on the boardwalk, hats and bags hung along the porch" },
      { src: "photos/universal-hollywood/DSC02887.jpg", w: 1200, h: 1600, alt: "A deflated yellow inflatable collapsed into the grass beside a fence" },
      { src: "photos/universal-hollywood/DSC02890.jpg", w: 1600, h: 1200, alt: "The Star Lasso Experience sign under the splintered timber of the ride structure" },
      { src: "photos/universal-hollywood/DSC02914.jpg", w: 1200, h: 1600, alt: "Concrete steps switchbacking up a planted bank in flat midday sun" },
      { src: "photos/universal-hollywood/DSC02920.jpg", w: 1600, h: 1200, alt: "The Studio Tour arch under palms, the wait time board reading ten minutes" },
      { src: "photos/universal-hollywood/DSC02930.jpg", w: 1600, h: 1200, alt: "Coaster cars banked over the Lower Lot arch against blue sky" },
      { src: "photos/universal-hollywood/DSC02934.jpg", w: 1200, h: 1600, alt: "Dr. Nick's shingle hanging from a saw blade outside the Springfield clinic" },
      { src: "photos/universal-hollywood/DSC02935.jpg", w: 1200, h: 1600, alt: "The same sign closer — \"If you can put it in, we can take it out\"" },
      { src: "photos/universal-hollywood/DSC02936.jpg", w: 1200, h: 1600, alt: "Moe's in relief letters, the painted Springfield backdrop rising behind the roofline" },
      { src: "photos/universal-hollywood/DSC02957.jpg", w: 1200, h: 1600, alt: "The WaterWorld entrance built from corrugated scrap, a queue filing under the sign" },
      { src: "photos/universal-hollywood/DSC03004.jpg", w: 1200, h: 1600, alt: "A WaterWorld performer in netted rags leaning on a pole, looking straight out" },
      { src: "photos/universal-hollywood/DSC03008.jpg", w: 1200, h: 1600, alt: "The same performer hosing the front row, a man in an LA cap taking it full in the face" },
      { src: "photos/universal-hollywood/DSC03024.jpg", w: 1200, h: 1600, alt: "The performer grinning with both hands on his head, the crowd's hands up in front of him" },
      { src: "photos/universal-hollywood/DSC03027.jpg", w: 1200, h: 1600, alt: "Arms flung wide on the dock, the whole scrap-metal set and lagoon behind him" },
      { src: "photos/universal-hollywood/DSC03029.jpg", w: 1200, h: 1600, alt: "Leaning down over the rail to work the crowd, hands raised all along the front row" },
      { src: "photos/universal-hollywood/DSC03035.jpg", w: 1200, h: 1600, alt: "Standing alone against the lagoon, pointing straight down the lens" },
      { src: "photos/universal-hollywood/DSC03039.jpg", w: 1200, h: 1600, alt: "Sitting on the dock edge with one knee up, looking out over the water" },
      { src: "photos/universal-hollywood/DSC03056.jpg", w: 1600, h: 1200, alt: "Arms clasped overhead on the dock, rows of heads and caps filling the foreground" },
      { src: "photos/universal-hollywood/DSC03063.jpg", w: 1200, h: 1600, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03074.jpg", w: 1200, h: 1600, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03079.jpg", w: 1200, h: 1600, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03080.jpg", w: 1200, h: 1600, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03081.jpg", w: 1200, h: 1600, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03083.jpg", w: 1200, h: 1600, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03086.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03087.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03090.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03104.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03111.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03112.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03113.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03119.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03123.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03124.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03126.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03128.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03131.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03133.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03136.jpg", w: 1234, h: 1600, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03139.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03149.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03153.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03161.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03176.jpg", w: 1600, h: 901, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03180.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03182.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03198.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03202.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" },
      { src: "photos/universal-hollywood/DSC03205.jpg", w: 1600, h: 1200, alt: "Universal Studios Hollywood" }
    ]
  },
  {
    slug: "dodgers-redsox",
    posted: "2026-08-01",
    place: "Dodgers vs. Redsox",
    short: "Dodgers",
    nav: "Dodgers vs. Redsox",
    loc: "Dodger Stadium",
    when: "August 2026",
    continent: "North America",
    note: "They won it at home in the bottom of the ninth. Everyone stood up at once and I got about six seconds of it.",
    photos: [
      { src: "photos/dodgers-redsox/redsox-win.mp4", w: 1080, h: 1920, video: true, seconds: 5.9, alt: "The moment it landed", caption: "The moment it landed" },
      { src: "photos/dodgers-redsox/DSC03490.jpg", w: 802, h: 1080, alt: "A Dodgers pitcher set at the belt against a wall of green outfield" },
      { src: "photos/dodgers-redsox/DSC03498.jpg", w: 1600, h: 1200, alt: "A lone infielder crossing the dirt at second, the outfield running out empty above him" },
      { src: "photos/dodgers-redsox/DSC03524.jpg", w: 1600, h: 1200, alt: "A runner breaking down the line as the infield shifts to meet the throw" },
      { src: "photos/dodgers-redsox/DSC03528.jpg", w: 1600, h: 1200, alt: "The same play a beat later, a broadcast camera swinging in over the baseline" },
      { src: "photos/dodgers-redsox/DSC03530.jpg", w: 1200, h: 1600, alt: "Dodger Stadium wide from the reserve level, the San Gabriels standing behind the pavilion" },
      { src: "photos/dodgers-redsox/DSC03538.jpg", w: 1206, h: 1600, alt: "The Dodgers starter at the top of his motion, glove at his chin on the mound" },
      { src: "photos/dodgers-redsox/DSC03565.jpg", w: 1200, h: 1600, alt: "A Dodgers batter set in the box from high above, catcher and umpire crouched behind" },
      { src: "photos/dodgers-redsox/DSC03566.jpg", w: 1200, h: 1600, alt: "The same at-bat, the bat cocked as the pitch comes in" },
      { src: "photos/dodgers-redsox/DSC03567.jpg", w: 1200, h: 1600, alt: "Contact — the bat through the zone and the ball just off it" },
      { src: "photos/dodgers-redsox/DSC03568.jpg", w: 1200, h: 1600, alt: "Ohtani following the ball out of the box, catcher and umpire still down behind him" },
      { src: "photos/dodgers-redsox/DSC03573.jpg", w: 1200, h: 1600, alt: "Ohtani standing up on second after a double, a Boston infielder and the umpire either side" },
      { src: "photos/dodgers-redsox/DSC03576.jpg", w: 1600, h: 1200, alt: "Ohtani taking his lead off second, the Red Sox infielder holding the bag" },
      { src: "photos/dodgers-redsox/DSC03582.jpg", w: 1600, h: 1200, alt: "A Dodgers runner sliding into second ahead of the tag, the umpire running in on the call" },
      { src: "photos/dodgers-redsox/DSC03588.jpg", w: 1600, h: 1200, alt: "The 2025 World Champions pennant flying beside the flag over the Uniqlo Field sign" },
      { src: "photos/dodgers-redsox/DSC03595.jpg", w: 1600, h: 1200, alt: "Dodger Stadium wide from the loge on a clear evening, the San Gabriels behind the pavilion" },
      { src: "photos/dodgers-redsox/DSC03597.jpg", w: 1200, h: 1600, alt: "The reserve level packed and leaning in, the pavilions and the hills beyond" },
      { src: "photos/dodgers-redsox/DSC03615.jpg", w: 1600, h: 1200, alt: "A Dodgers infielder alone on the dirt waiting on the pitch, umpire down the line" },
      { src: "photos/dodgers-redsox/DSC03617.jpg", w: 1154, h: 1600, alt: "The same fielder closer, head down and glove hanging, a wall of green behind" },
      { src: "photos/dodgers-redsox/IMG_3232.jpg", w: 1200, h: 1600, alt: "A fan in a Bauer 27 jersey riding the escalator up into the park" },
      { src: "photos/dodgers-redsox/IMG_3238.jpg", w: 1200, h: 1600, alt: "The bobblehead at the gate — \"Welcome to Dodger Stadium!\" — Dodger Dogs behind" }
    ],
    beats: [
      { at: "Bottom of the ninth", say: "They won it at home. Everyone around me stood up at the same time and I got about six seconds of it before my hands were shaking too much to hold the phone still.", shots: [0] }
    ]
  },
  {
    slug: "san-diego",
    posted: "2026-06-20",
    place: "My trip to San Diego",
    short: "San Diego",
    nav: "San Diego Zoo",
    loc: "San Diego, CA",
    featured: true,
    when: "June 2026",
    continent: "North America",
    cover: "photos/sandiego-zoo/web/grizzly-2.jpg",
    note: "Went for the zoo and basically never left it — most of a day with the big cats and the orangutans.",
    camera: "Sony A7CR",
    photos: [
      { src: "photos/sandiego-zoo/web/mandrill-1.jpg", best: true, w: 1167, h: 1600, alt: "A mandrill's face, red and blue ridges along the muzzle", caption: "The best face in the park" },
      { src: "photos/sandiego-zoo/web/grizzly-1.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear eating greens in a shadowed enclosure", caption: "Greens, in the dark" },
      { src: "photos/sandiego-zoo/web/panda-1.jpg", best: true, w: 1600, h: 1067, alt: "A giant panda in profile working on a bamboo shoot", caption: "First one, still eating" },
      { src: "photos/sandiego-zoo/web/hibiscus.jpg", best: true, w: 1600, h: 1067, alt: "An orange and pink hibiscus flower open against dark leaves", caption: "Not everything there was an animal" },
      { src: "photos/sandiego-zoo/web/meerkat-1.jpg", best: true, w: 1600, h: 1067, alt: "A meerkat standing against a rock, looking upward", caption: "Looking up at something" },
      { src: "photos/sandiego-zoo/web/giraffes.jpg", best: true, w: 1600, h: 1067, alt: "Several giraffes gathered under a feeding shelter", caption: "The whole crowd of them" },
      { src: "photos/sandiego-zoo/web/carved-bamboo.jpg", best: true, w: 1600, h: 1067, alt: "Bamboo stalks covered in carved initials beside a sign reading please don't carve on me", caption: "The sign is losing" },
      { src: "photos/sandiego-zoo/web/grizzly-2.jpg", best: true, w: 1600, h: 1280, alt: "A grizzly bear facing the camera against a black background", caption: "Out of the dark" },
      { src: "photos/sandiego-zoo/web/elephant-1.jpg", best: true, w: 1600, h: 1067, alt: "An elephant tossing hay over its head with its trunk", caption: "Hay everywhere, entirely on purpose" },
      { src: "photos/sandiego-zoo/web/panda-mono.jpg", best: true, w: 1600, h: 1067, alt: "A giant panda's face head-on, photographed in black and white", caption: "In black and white, because the panda already is" },
      { src: "photos/sandiego-zoo/web/camel-1.jpg", best: true, w: 1600, h: 1067, alt: "A camel's head in profile", caption: "Profile, and unbothered" },
      { src: "photos/sandiego-zoo/web/grizzly-3.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear in profile in dim light", caption: "Profile, low light" },
      { src: "photos/sandiego-zoo/web/klipspringer.jpg", best: true, w: 1600, h: 1067, alt: "A klipspringer lying with its head resting on rock", caption: "Head down on the rock" },
      { src: "photos/sandiego-zoo/web/gorilla-1.jpg", best: true, w: 1143, h: 1600, alt: "A gorilla seen through green foliage", caption: "Through the leaves" },
      { src: "photos/sandiego-zoo/web/koala.jpg", best: true, w: 1280, h: 1600, alt: "A koala in a tree eating eucalyptus leaves", caption: "Awake, which is the rare part" },
      { src: "photos/sandiego-zoo/web/grizzly-4.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear with its head lowered beside a rock", caption: "Nose to the ground" },
      { src: "photos/sandiego-zoo/web/panda-2.jpg", best: true, w: 1600, h: 1067, alt: "A giant panda in profile biting through a bamboo cane", caption: "Bamboo, end to end" },
      { src: "photos/sandiego-zoo/web/hyrax-1.jpg", best: true, w: 1600, h: 1067, alt: "A hyrax tucked under an overhanging boulder", caption: "Under the boulder" },
      { src: "photos/sandiego-zoo/web/cheetah-1.jpg", best: true, w: 1600, h: 1067, alt: "A cheetah in a collar sitting against a yellow wall", caption: "The ambassador cheetah" },
      { src: "photos/sandiego-zoo/web/mountain-lion-1.jpg", best: true, w: 1600, h: 1067, alt: "A mountain lion standing in tall green grass", caption: "In the grass" },
      { src: "photos/sandiego-zoo/web/elephant-2.jpg", best: true, w: 1067, h: 1600, alt: "An elephant walking, full body, tusks forward", caption: "Walking it off" },
      { src: "photos/sandiego-zoo/web/grizzly-5.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear's head in profile against black", caption: "The long profile" },
      { src: "photos/sandiego-zoo/web/panda-3.jpg", best: true, w: 1600, h: 1067, alt: "A giant panda sitting upright holding a bamboo stalk in both paws", caption: "Sat up for it" },
      { src: "photos/sandiego-zoo/web/meerkat-2.jpg", best: true, w: 1067, h: 1600, alt: "A meerkat standing upright on a mound", caption: "On watch, as advertised" },
      { src: "photos/sandiego-zoo/web/grizzly-6.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear facing the camera, mouth slightly open", caption: "Mouth half open" },
      { src: "photos/sandiego-zoo/web/clouded-leopard-1.jpg", best: true, w: 1600, h: 1067, alt: "A clouded leopard feeding from a stump while a keeper holds the line", caption: "Feeding time on the stump" },
      { src: "photos/sandiego-zoo/web/elephant-3.jpg", best: true, w: 1600, h: 1067, alt: "An elephant's head in profile against bright sky", caption: "Profile, tusks and all" },
      { src: "photos/sandiego-zoo/web/grizzly-7.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear's head in profile, pale muzzle against dark fur", caption: "Turned away" },
      { src: "photos/sandiego-zoo/web/panda-4.jpg", best: true, w: 1067, h: 1600, alt: "A giant panda facing the camera with a bamboo stalk in its mouth", caption: "Straight on" },
      { src: "photos/sandiego-zoo/web/rhino-1.jpg", best: true, w: 1600, h: 1280, alt: "An Indian rhinoceros head-on, a visitor's arm at the edge of the frame", caption: "Both horns and an audience" },
      { src: "photos/sandiego-zoo/web/colobus.jpg", best: true, w: 1600, h: 1280, alt: "An Angolan colobus monkey, a long white mantle framing a dark face", caption: "All that hair, and a face somewhere in it" },
      { src: "photos/sandiego-zoo/web/bear-claws.jpg", best: true, w: 1600, h: 1067, alt: "A bear's front paw on rock, claws fully extended", caption: "The claws, which are the point" },
      { src: "photos/sandiego-zoo/web/binturong-1.jpg", best: true, w: 1600, h: 1280, alt: "A binturong facing the camera, long white whiskers fanned out", caption: "The binturong, awake for once" },
      { src: "photos/sandiego-zoo/web/panda-5.jpg", best: true, w: 1600, h: 1067, alt: "A giant panda eating, seen through a screen of bamboo leaves", caption: "Behind the leaves" },
      { src: "photos/sandiego-zoo/web/cheetah-paw.jpg", best: true, w: 1600, h: 1067, alt: "A keeper's hand holding a cheetah's front paw", caption: "The handshake" },
      { src: "photos/sandiego-zoo/web/elephant-4.jpg", best: true, w: 1600, h: 1067, alt: "An elephant lifting its trunk, tusks crossing the frame", caption: "Trunk up" },
      { src: "photos/sandiego-zoo/web/orangutan.jpg", best: true, w: 1202, h: 1600, alt: "A close view of an orangutan's face", caption: "Close enough to count the grey" },
      { src: "photos/sandiego-zoo/web/mandrill-2.jpg", best: true, w: 1600, h: 1067, alt: "A mandrill's face in close profile", caption: "Same face, second look" },
      { src: "photos/sandiego-zoo/web/grizzly-8.jpg", best: true, w: 1280, h: 1600, alt: "A grizzly bear's head in profile lit warm from above", caption: "Warm light on a big head" },
      { src: "photos/sandiego-zoo/web/hyrax-2.jpg", best: true, w: 1600, h: 1067, alt: "A hyrax in the gap beneath a large balanced rock", caption: "Still under the boulder" },
      { src: "photos/sandiego-zoo/web/meerkat-3.jpg", best: true, w: 1600, h: 1067, alt: "A meerkat's head and shoulders against green", caption: "Off to the side" },
      { src: "photos/sandiego-zoo/web/giraffe.jpg", best: true, w: 1600, h: 1067, alt: "A giraffe's neck and head against a screen of trees", caption: "Neck, and then more neck" },
      { src: "photos/sandiego-zoo/web/panda-6.jpg", best: true, w: 1600, h: 1067, alt: "A giant panda lying in a heap of cut bamboo", caption: "Lunch, lying down" },
      { src: "photos/sandiego-zoo/web/mountain-lion-2.jpg", best: true, w: 1600, h: 1067, alt: "A mountain lion with its mouth open, teeth showing", caption: "Mid-complaint" },
      { src: "photos/sandiego-zoo/web/grizzly-9.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear standing against a rock wall", caption: "Against the wall" },
      { src: "photos/sandiego-zoo/web/tiger.jpg", best: true, w: 1600, h: 1067, alt: "A tiger lying in the shade beside an enclosure gate", caption: "Out of the sun" },
      { src: "photos/sandiego-zoo/web/elephant-5.jpg", best: true, w: 1600, h: 1067, alt: "An elephant facing the camera, both tusks showing", caption: "Head on" },
      { src: "photos/sandiego-zoo/web/camels.jpg", best: true, w: 1600, h: 1067, alt: "Two camels in a sand yard, one lying down", caption: "Sat down for the afternoon" },
      { src: "photos/sandiego-zoo/web/grizzly-10.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear walking with its head lowered", caption: "Head down, going somewhere" },
      { src: "photos/sandiego-zoo/web/gorilla-2.jpg", best: true, w: 1600, h: 1067, alt: "A gorilla sitting among green fronds, looking up and away", caption: "Looking at something well past me" },
      { src: "photos/sandiego-zoo/web/panda-7.jpg", best: true, w: 1600, h: 1067, alt: "A giant panda reclining in bamboo, chewing", caption: "Still going" },
      { src: "photos/sandiego-zoo/web/grizzly-11.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear in profile with its mouth open", caption: "Saying something" },
      { src: "photos/sandiego-zoo/web/guenon.jpg", best: true, w: 1600, h: 1067, alt: "A red-tailed guenon sitting on a rock with its tongue out", caption: "Tongue out, opinion registered" },
      { src: "photos/sandiego-zoo/web/cheetah-2.jpg", best: true, w: 1600, h: 1067, alt: "A cheetah sitting on a rock while a keeper holds its lead", caption: "Up on the rock, on the lead" },
      { src: "photos/sandiego-zoo/web/elephant-6.jpg", best: true, w: 1600, h: 1067, alt: "An elephant standing beside a bare tree trunk", caption: "Beside the tree" },
      { src: "photos/sandiego-zoo/web/panda-8.jpg", best: true, w: 1600, h: 1067, alt: "A giant panda close up, chewing the length of a bamboo stalk", caption: "The whole stalk" },
      { src: "photos/sandiego-zoo/web/zebra.jpg", best: true, w: 1600, h: 1067, alt: "A zebra's head and shoulder, stripes running down the neck", caption: "Stripes, at rest" },
      { src: "photos/sandiego-zoo/web/grizzly-12.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear facing the camera in low light", caption: "Straight at it" },
      { src: "photos/sandiego-zoo/web/meerkat-4.jpg", best: true, w: 1600, h: 1067, alt: "A meerkat in profile against green", caption: "The other direction" },
      { src: "photos/sandiego-zoo/web/otters.jpg", best: true, w: 1600, h: 1067, alt: "Two otters in a shallow rocky stream", caption: "Otters, briefly still" },
      { src: "photos/sandiego-zoo/web/grizzly-13.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear walking across wet rock", caption: "Across the rocks" },
      { src: "photos/sandiego-zoo/web/mandrill-3.jpg", best: true, w: 1600, h: 1067, alt: "A mandrill standing in profile on bare ground", caption: "Standing off" },
      { src: "photos/sandiego-zoo/web/panda-9.jpg", best: true, w: 1600, h: 1067, alt: "A giant panda half buried in cut bamboo, eating", caption: "In the pile" },
      { src: "photos/sandiego-zoo/web/hippo.jpg", best: true, w: 1600, h: 1067, alt: "A hippopotamus surfacing with its mouth open, water spraying", caption: "Came up loud" },
      { src: "photos/sandiego-zoo/web/clouded-leopard-2.jpg", best: true, w: 1600, h: 1067, alt: "A clouded leopard stretching off a stump, marbled coat full out", caption: "Off the stump" },
      { src: "photos/sandiego-zoo/web/elephants.jpg", best: true, w: 1600, h: 1067, alt: "Two elephants together, one with a mouthful of hay", caption: "Two, and one of them eating" },
      { src: "photos/sandiego-zoo/web/hyrax-3.jpg", best: true, w: 1600, h: 1067, alt: "A hyrax resting on top of a sunlit rock", caption: "Out on the rock" },
      { src: "photos/sandiego-zoo/web/grizzly-14.jpg", best: true, w: 1600, h: 1067, alt: "A grizzly bear's face emerging from deep shadow", caption: "In the shadow" },
      { src: "photos/sandiego-zoo/web/mountain-lions.jpg", best: true, w: 1600, h: 1067, alt: "Two mountain lions pressed head to head", caption: "Two of them, sorting it out" },
      { src: "photos/sandiego-zoo/web/rhino-2.jpg", best: true, w: 1600, h: 1280, alt: "The head and armoured folds of an Indian rhinoceros", caption: "Plate armour, worn in" },
      { src: "photos/sandiego-zoo/web/panda-10.jpg", best: true, w: 1600, h: 1067, alt: "A giant panda among bamboo stalks, mid-chew", caption: "Last of the bamboo" },
      { src: "photos/sandiego-zoo/web/grizzly-15.jpg", best: true, w: 1301, h: 1600, alt: "A very close view of a grizzly bear's muzzle and brow", caption: "Every hair of him" },
      { src: "photos/sandiego-zoo/web/binturong-2.jpg", best: true, w: 1600, h: 1067, alt: "A binturong walking down a sloping branch", caption: "Along the branch" },
      { src: "photos/sandiego-zoo/web/cheetah-3.jpg", best: true, w: 1242, h: 1600, alt: "A cheetah facing the camera, tear lines running from its eyes", caption: "Straight down the lens" },
      { src: "photos/sandiego-zoo/web/elephant-trunk.jpg", best: true, w: 1600, h: 1067, alt: "A close view of an elephant's trunk and the base of its tusks", caption: "Just the trunk" }
    ],
    beats: [
      { at: "Balboa Park", say: "Went for the zoo and basically never left it.", shots: [2, 9, 16] },
      { at: "The big cats", say: "The cheetah came right up to the glass. Four or five seconds, then gone.", shots: [18, 34, 53, 73] },
      { at: "Orangutan canyon", say: "Spent way too long here. Worth it.", shots: [13, 49, 36] }
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
      { src: "photos/london-paris/web/monet-pond.jpg", w: 1200, h: 1600, alt: "Water lilies on Monet's pond at Giverny, clouds reflected in the water", caption: "Monet's pond, Giverny" },
      { src: "photos/giverny/web/signpost.jpg", w: 1200, h: 1600, alt: "A painted signpost in the garden pointing to Moscow, New York, Tahiti and the moon", caption: "Paris 75 km, la Lune rather further" },
      { src: "photos/giverny/web/sign-selfie.jpg", w: 1200, h: 1600, alt: "A selfie beside the painted Jardin-Garden Claude Monet sign, hedges and blue sky behind", caption: "Made it" },
      { src: "photos/giverny/web/ivy-house.jpg", w: 1200, h: 1600, alt: "A tall stone house almost entirely covered in ivy behind a green iron gate", caption: "A house on the walk up, more ivy than house" },
      { src: "photos/giverny/web/house-front.jpg", w: 1200, h: 1600, alt: "The front of Monet's pink house with green shutters and steps, climbing roses on the trellis", caption: "The green steps, the pink house" },
      { src: "photos/giverny/web/rose-path.jpg", w: 1200, h: 1600, alt: "A gravel path running beside a hedge of pink roses and orange daylilies under piled cloud", caption: "The long path, roses the whole way" },
      { src: "photos/giverny/web/daylilies.jpg", w: 1200, h: 1600, alt: "Orange daylilies crowding both banks of a narrow stream, pink roses behind", caption: "Daylilies leaning over the water" },
      { src: "photos/giverny/web/pond-wide.jpg", w: 1200, h: 1600, alt: "Monet's lily pond with cloud reflected in the dark water, visitors on the far bank", caption: "The pond, cloud and all" },
      { src: "photos/giverny/web/swan-cygnets.jpg", w: 1200, h: 1600, alt: "A swan and three grey cygnets on a green weed-covered channel", caption: "Three cygnets and a chaperone" },
      { src: "photos/giverny/web/pond-portrait.jpg", w: 1200, h: 1600, alt: "A portrait taken in front of the lily pond, willows and cloud behind", caption: "By the water" },
      { src: "photos/giverny/web/pond-sunglasses.jpg", w: 1200, h: 1600, alt: "A portrait in sunglasses and a blue jacket in front of the lily pond", caption: "The pond, and the jacket that went everywhere" },
      { src: "photos/giverny/web/balcony-standing.jpg", w: 1200, h: 1600, alt: "Standing at the green balcony rail of the pink house, climbing roses on the trellis above", caption: "On the balcony, roses coming through the rail" },
      { src: "photos/giverny/web/balcony-portrait.jpg", w: 1200, h: 1600, alt: "A portrait in the shade of the balcony, the garden and hills bright behind", caption: "Out of the sun for a minute" },
      { src: "photos/giverny/web/doorway.jpg", w: 1200, h: 1600, alt: "Two people standing together in the green doorway of the pink house, roses on the trellis", caption: "Both of us, in the doorway" },
      { src: "photos/giverny/web/window-garden.jpg", w: 1200, h: 1600, alt: "The kitchen garden seen through an open green-framed window with a balcony rail", caption: "The garden from inside, through the green" },
      { src: "photos/giverny/web/open-window.jpg", w: 1200, h: 1600, alt: "A green casement window standing open over a radiator, roses hanging above the frame", caption: "Windows open onto all of it" },
      { src: "photos/giverny/web/bedroom-window.jpg", w: 1200, h: 1600, alt: "A pale blue bedroom window hung with lace curtains, heavy dark drapes to either side", caption: "Lace, and the blue room" },
      { src: "photos/giverny/web/sitting-room.jpg", w: 1200, h: 1600, alt: "A blue-panelled sitting room with Japanese prints on the walls, a wicker chair and a marble fireplace", caption: "The blue sitting room, prints floor to ceiling" }
    ],
    beats: [
      { at: "Giverny", say: "Went to Monet's pond expecting to be underwhelmed. Wasn't.", shots: [0] }
    ]
  },
  {
    slug: "new-york",
    posted: "2023-06-01",
    place: "New York",
    short: "New York",
    when: "2023",
    continent: "North America",
    photos: [
      { src: "photos/new-york/0FF93CB6-99CC-4437-8B65-83CBD1A5F279.jpg", w: 1280, h: 1600, alt: "A long-haired dachshund held up over a Manhattan crosswalk, plaid collar and tags" },
      { src: "photos/new-york/172FB1FD-4A1B-4090-B0F2-862A5250AEB1.jpg", w: 642, h: 1141, alt: "A man walking two small dogs down a Hudson Yards sidewalk under an orange sunset" },
      { src: "photos/new-york/DSC02718.jpg", w: 1200, h: 1600, alt: "A bronze rearing horse in banded plate, shot from below against flat blue sky" },
      { src: "photos/new-york/IMG_0460-2.jpg", w: 1200, h: 1600, alt: "The Met's facade and reflecting pool on a clear afternoon, people scattered on the steps" },
      { src: "photos/new-york/IMG_0461-2.jpg", w: 1200, h: 1600, alt: "A woman in a mint sweatshirt and sunglasses sitting on the Met's steps in the sun" },
      { src: "photos/new-york/IMG_0812.jpg", w: 1200, h: 1600, alt: "Yankee Stadium's limestone corner and gold lettering against blue sky" },
      { src: "photos/new-york/IMG_0817.jpg", w: 1200, h: 1600, alt: "Yankee Stadium under piled cloud, both teams lined up along the baselines" },
      { src: "photos/new-york/IMG_0844.jpg", w: 1600, h: 1200, alt: "Yankee Stadium from behind the net, flags and lights running along the frieze" },
      { src: "photos/new-york/IMG_1124.jpg", w: 1600, h: 1200, alt: "Two people leaning together in a window booth at night, park lights behind the glass" },
      { src: "photos/new-york/IMG_3824.jpg", w: 1200, h: 1600, alt: "A UPS driver holding a long-haired dachshund up to the wheel of his truck" },
      { src: "photos/new-york/IMG_3828.jpg", w: 1200, h: 1600, alt: "The same driver laughing open-mouthed, the dachshund tucked under his arm" },
      { src: "photos/new-york/IMG_4416.jpg", w: 1341, h: 1600, alt: "A Nets guard sizing up a Bucks defender at the top of the key, Barclays packed behind" },
      { src: "photos/new-york/IMG_4458.jpg", w: 1200, h: 1600, alt: "A Bucks forward rising to dunk two-handed, the shot clock reading 45 above the rim" },
      { src: "photos/new-york/IMG_4513.jpg", w: 1200, h: 1600, alt: "A doorman in a grey suit holding a cream dachshund puppy, a beagle on the step below" },
      { src: "photos/new-york/IMG_4783.jpg", w: 593, h: 881, alt: "A selfie in a knit beanie holding a black-and-tan dachshund against a rain-streaked window" },
      { src: "photos/new-york/IMG_4907.jpg", w: 1200, h: 1600, alt: "A gravel path running between green benches in a shaded city garden" },
      { src: "photos/new-york/IMG_4941.jpg", w: 1600, h: 1200, alt: "Midtown from above the tunnel approach, buses queued on the ramps below" },
      { src: "photos/new-york/IMG_5014.jpg", w: 1200, h: 1600, alt: "A cream dachshund puppy held up under the Hudson Boulevard East street sign" },
      { src: "photos/new-york/IMG_5016.jpg", w: 1200, h: 1600, alt: "Yankee Stadium's Gate 6 at golden hour, the crowd queued behind the barriers" },
      { src: "photos/new-york/IMG_5018.jpg", w: 1600, h: 1200, alt: "Yankee Stadium under heavy evening cloud, the frieze lights burning along the rim" },
      { src: "photos/new-york/IMG_5043.jpg", w: 1600, h: 1200, alt: "Midtown towers catching low gold light beneath a bank of blue cloud" },
      { src: "photos/new-york/IMG_5060.jpg", w: 1078, h: 1600, alt: "A boy crouching to pet a cream dachshund puppy on the waterfront at sunset" },
      { src: "photos/new-york/IMG_5081.jpg", w: 1200, h: 1600, alt: "Sunset burning straight down an avenue between glass towers" },
      { src: "photos/new-york/IMG_5114.jpg", w: 1200, h: 1600, alt: "Midtown at dusk from above the highway ramps, a dark tower centre frame" },
      { src: "photos/new-york/IMG_5229.jpg", w: 1200, h: 1600, alt: "A tower going up in scaffolding and crane light at blue hour, a traffic sign in the foreground" },
      { src: "photos/new-york/IMG_5230.jpg", w: 1200, h: 1600, alt: "Low sun lighting the faces of Midtown towers under a bank of storm cloud" },
      { src: "photos/new-york/IMG_5353.jpg", w: 1600, h: 1200, alt: "A whole apartment's furniture stacked on the kerb — sofa, mattress, boxes — beside a parked car" },
      { src: "photos/new-york/IMG_5545.jpg", w: 1027, h: 1600, alt: "A fisheye from a high balcony, Midtown curving away under an evening sky" },
      { src: "photos/new-york/IMG_5609.jpg", w: 1200, h: 1600, alt: "A selfie from below in a beanie and check-lined coat, a glass tower rising behind" },
      { src: "photos/new-york/IMG_6122.jpg", w: 1200, h: 1600, alt: "The Christmas tree outside the Stock Exchange on Broad Street, flags along the facade" },
      { src: "photos/new-york/IMG_7169.jpg", w: 1200, h: 1600, alt: "A rapper in a leather jacket at the mic under purple light, chain swinging" },
      { src: "photos/new-york/IMG_7171.jpg", w: 1200, h: 1600, alt: "The same performer with one arm thrown up, green light overhead, keyboardist behind" },
      { src: "photos/new-york/IMG_7191.jpg", w: 1200, h: 1600, alt: "Close on the performer between verses in a Yankees cap, purple curtain behind" },
      { src: "photos/new-york/IMG_8225.jpg", w: 1290, h: 1600, alt: "A woman resting her cheek on her hand in a string-lit courtyard, smiling at the camera" }
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
      { src: "photos/salt-lake-city/24401611-45A8-4AF1-BE19-7F5CD1A89558.jpg", w: 1600, h: 1200, alt: "A band of sunset burning under heavy cloud over the valley, snow on the range at left" },
      { src: "photos/salt-lake-city/46B89C2D-AE24-4249-A535-5DEA4A04EF18.jpg", w: 1440, h: 756, alt: "The range in silhouette against a green-to-orange dusk, city lights strung along the valley floor" },
      { src: "photos/salt-lake-city/66A572C5-E8DF-4E8A-8CD9-4655A4B6007D.jpg", w: 1440, h: 753, alt: "The bobsled track at Utah Olympic Park under piled cloud, snow-covered ranges beyond" },
      { src: "photos/salt-lake-city/7536D9CB-E9E8-4696-B2DE-6F4FB20B5870.jpg", w: 1280, h: 1600, alt: "A lion in profile against snow, its mane lit warm" },
      { src: "photos/salt-lake-city/89838BF3-A65D-4D9C-B6DC-EAEDA1A456E7.jpg", w: 1600, h: 838, alt: "Dusk over the valley from the foothills, a construction crane against the last orange light" },
      { src: "photos/salt-lake-city/ACCC6595-CD50-4118-83AB-FECA32AD7BBB.jpg", w: 1600, h: 1200, alt: "Utah Olympic Park's track winding down the hillside under a wide cloud sky" },
      { src: "photos/salt-lake-city/IMG_3528.jpg", w: 1200, h: 1600, alt: "The Red Iguana's neon sign at dusk, snow banked along an empty sidewalk" },
      { src: "photos/salt-lake-city/IMG_3533.jpg", w: 1200, h: 1600, alt: "Looking up at the Red Iguana sign in falling snow, a queue waiting beneath it" },
      { src: "photos/salt-lake-city/IMG_3544.jpg", w: 1200, h: 1600, alt: "Inside the Tabernacle, the organ's gold pipes above rows of empty pews" },
      { src: "photos/salt-lake-city/IMG_3550.jpg", w: 1200, h: 1600, alt: "Looking straight up into the Conference Center's stained-glass skylights" },
      { src: "photos/salt-lake-city/IMG_3556.jpg", w: 1600, h: 1200, alt: "Temple Square under snow from above, the temple's spires against a white sky" },
      { src: "photos/salt-lake-city/IMG_3584.jpg", w: 1196, h: 1600, alt: "A lion's face filling the frame, scarred muzzle and pale eyes" },
      { src: "photos/salt-lake-city/IMG_3600.jpg", w: 1200, h: 1600, alt: "A lioness lying on cracked stone in the snow, looking straight into the camera" },
      { src: "photos/salt-lake-city/IMG_3684.jpg", w: 1200, h: 1600, alt: "The Union Pacific neon sign burning against a black night" },
      { src: "photos/salt-lake-city/IMG_3754.jpg", w: 1600, h: 392, alt: "A wide panorama of the snowed-in valley under flat grey cloud" },
      { src: "photos/salt-lake-city/IMG_3942.jpg", w: 1200, h: 1600, alt: "A U.S. Olympic Training Site marker standing against deep blue winter sky" },
      { src: "photos/salt-lake-city/IMG_3993.jpg", w: 1600, h: 514, alt: "Panorama from the Olympic Park deck, a child in a pink hat at the far right" },
      { src: "photos/salt-lake-city/IMG_3999.jpg", w: 1200, h: 1600, alt: "The 2002 Olympic snowflake mounted on a concrete gateway against blue sky and cumulus" },
      { src: "photos/salt-lake-city/IMG_4011.jpg", w: 1600, h: 1200, alt: "Park City's snowed-in bowl from above, a road switchbacking down through it" },
      { src: "photos/salt-lake-city/IMG_4016.jpg", w: 1600, h: 1200, alt: "A ridge of snowed aspens under towering cloud, the Olympic Park buildings below" },
      { src: "photos/salt-lake-city/IMG_4110.jpg", w: 1200, h: 1600, alt: "The Utah State Capitol lit gold beneath a deep blue evening sky" },
      { src: "photos/salt-lake-city/IMG_4122.jpg", w: 1200, h: 1600, alt: "An empty downtown street on a bright cold morning, snow on the Wasatch beyond" },
      { src: "photos/salt-lake-city/IMG_4151.jpg", w: 1202, h: 1600, alt: "Cody in a black jacket squinting into low winter sun, a snowbank behind him" },
      { src: "photos/salt-lake-city/IMG_4153.jpg", w: 1200, h: 1600, alt: "A small waterfall running into a half-frozen pond, snow banked around the rocks" },
      { src: "photos/salt-lake-city/IMG_4157.jpg", w: 1200, h: 1600, alt: "A creek running fast between snowy banks under bare trees" },
      { src: "photos/salt-lake-city/IMG_4160.jpg", w: 1200, h: 1600, alt: "A cleared path running under a tunnel of bare branches, snow banked either side" },
      { src: "photos/salt-lake-city/IMG_4164.jpg", w: 1200, h: 1600, alt: "A glass curtain wall reflecting the valley and the mountains beyond" },
      { src: "photos/salt-lake-city/IMG_4185.jpg", w: 1200, h: 1600, alt: "The snow-covered Wasatch front standing over the edge of the city, deep blue sky" },
      { src: "photos/salt-lake-city/IMG_4194.jpg", w: 1200, h: 1600, alt: "Downtown seen from the foothills, dry winter grass in the foreground" },
      { src: "photos/salt-lake-city/IMG_4213.jpg", w: 1200, h: 1600, alt: "A magpie perched on a bare sapling against the snowed Wasatch" },
      { src: "photos/salt-lake-city/IMG_4217.jpg", w: 1200, h: 1600, alt: "Alpenglow catching the top of the range at dusk, the city dark below" },
      { src: "photos/salt-lake-city/IMG_4304.jpg", w: 1600, h: 689, alt: "Panorama of the valley at last light, an orange band along the whole horizon" },
      { src: "photos/salt-lake-city/IMG_4308.jpg", w: 1600, h: 552, alt: "The same valley minutes later, a construction crane black against the orange" },
      { src: "photos/salt-lake-city/IMG_4316.jpg", w: 1600, h: 1200, alt: "City lights spread under a green-to-orange afterglow, the far range in silhouette" },
      { src: "photos/salt-lake-city/IMG_4322.jpg", w: 1200, h: 1600, alt: "A crane standing black against a green and orange sunset over the valley" }
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
