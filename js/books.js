/* ════════════════════════════════════════════════════════════
   HEART'S LIBRARY — the shelf data.
   THIS IS THE ONLY FILE YOU EDIT to update the site.

   To add a book, copy any block between { ... } in BOOKS, paste
   it where you want it to appear, and change the fields:

     title / author  — what they say
     section         — "Fiction" or "Nonfiction"
     tag + tagLabel  — the filter chip it belongs to
                       (a new tag makes a new chip automatically)
     cover           — full URL to a cover image
     short           — the quick take shown on the shelf (HTML ok)
     full            — list of "<p>...</p>" paragraphs for the
                       expanded review (delete to skip)
     featured        — true puts it in the Top Ten chip
     shopName/shopHref — the "Read at" credit (optional)

   UPNEXT at the bottom is the to-be-read strip on the shelf.
   Save the file, refresh the page — done.
   ════════════════════════════════════════════════════════════ */

/* What you're reading right now — one entry per book, shown on the Shelf. */
window.CURRENT = [
  {
    "title": "Remarkably Bright Creatures",
    "author": "Shelby Van Pelt"
  },
  {
    "title": "The Underground Railroad",
    "author": "Colson Whitehead"
  },
  {
    "title": "The Only Plane in the Sky",
    "author": "Garrett M. Graff"
  }
];

/* Site-level bits: the author photo shown on the Shelf. */
window.META = {
  "avatar": "https://heartslibrary.com/images/cody-portrait.jpg"
};

window.BOOKS = [
  {
    "id": 1,
    "title": "Lonesome Dove",
    "author": "Larry McMurtry",
    "authorHref": "https://en.wikipedia.org/wiki/Larry_McMurtry",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "literary",
    "tagLabel": "Literary",
    "cover": "https://heartslibrary.com/covers/lonesomedove.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": true,
    "short": "Two aging Texas Rangers drive a cattle herd from the Rio Grande to Montana in the dying days of the frontier. The friendship between Gus and Call might be the truest thing in American fiction. Worth every one of its eight hundred pages.",
    "full": [
      "<p>It's eight hundred pages of two old men riding north with cattle. That should be unbearable, and instead it's one of the few novels I've read three times. McMurtry's gift is patience. He lets the friendship between Gus and Call build at the speed it actually would, and never makes either of them say out loud what the other one means to them.</p>",
      "<p>The cattle drive is the pretext. The book is really about long friendships — what they ask of you, what they cost, what you owe each other after forty years. McMurtry doesn't tell you that's what he's doing. He just keeps his camera on the men and lets you arrive at it.</p>",
      "<p>The supporting cast is a mile deep. Lorena, Newt, Jake Spoon, Deets, Pea Eye — every one of them gets a real interior life. McMurtry treats secondary characters with the same patience he gives the leads. By the end you've lived with these people long enough that the way they speak becomes familiar, the way you'd know somebody's voice on the phone before they say their name.</p>",
      "<p>It's also unsentimental about the frontier in a way most westerns aren't. The \"dying days\" framing doesn't get romanticized. It's a slow-motion description of land taken and people displaced, riders moving through somebody else's history without quite admitting it. McMurtry doesn't editorialize. He lets the events be what they are and trusts you to notice.</p>",
      "<p>The book earns the length. None of it is wasted. Most \"long novel\" recommendations come from people performing literary virtue. This isn't that. This is the one I've read three times and would read again. The only thing I want to say to anyone who thinks they don't have time for an eight-hundred-page western is that you'll know within the first hundred pages whether McMurtry has you. He had me by page twenty.</p>"
    ],
    "subtitle": "A novel",
    "authorBio": "Texas writer who turned out novels at industrial pace from 1961 until his death in 2021. <em>Lonesome Dove</em> was the masterpiece, but the smaller Texas books — <em>The Last Picture Show</em>, <em>Terms of Endearment</em> — are where his prose voice lives most clearly. Also ran a famous antiquarian bookstore in Archer City for decades.",
    "works": [
      {
        "title": "The Last Picture Show",
        "year": "1966",
        "href": "https://www.kobo.com/us/en/search?query=The+Last+Picture+Show+Larry+McMurtry"
      },
      {
        "title": "Terms of Endearment",
        "year": "1975",
        "href": "https://www.kobo.com/us/en/search?query=Terms+of+Endearment+Larry+McMurtry"
      },
      {
        "title": "All My Friends Are Going to Be Strangers",
        "year": "1972",
        "href": "https://www.kobo.com/us/en/search?query=All+My+Friends+Are+Going+to+Be+Strangers+McMurtry"
      },
      {
        "title": "Streets of Laredo",
        "year": "1993",
        "href": "https://www.kobo.com/us/en/search?query=Streets+of+Laredo+Larry+McMurtry"
      }
    ]
  },
  {
    "id": 2,
    "title": "Demon Copperhead",
    "author": "Barbara Kingsolver",
    "authorHref": "https://barbarakingsolver.com/",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "literary",
    "tagLabel": "Literary",
    "cover": "https://heartslibrary.com/covers/demoncopperhead.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": true,
    "short": "Dickens' <em>David Copperfield</em> reset in opioid-era Appalachia — a foster kid's first-person account of getting chewed up by systems that were never built to protect him. Earns every inch of its Pulitzer.",
    "full": [
      "<p>Kingsolver took the David Copperfield frame and dropped it into Lee County, Virginia in the worst years of the opioid crisis. That could have been gimmicky. Instead it's a 560-page argument that systems built to protect kids — foster care, schools, medicine, the law — are mostly built to process them, and the processing is what shapes the lives.</p>",
      "<p>The narrator's voice is the whole game. He's a kid who's read enough to know how he's getting played by every adult institution around him, bitter enough to say so out loud, and funny enough to keep you with him for 560 pages. Kingsolver is a good enough writer to never flatten Appalachia into ruin porn. These are real lives, drawn with care.</p>",
      "<p>One of the things the book does well is refuse the easy distinction between people who deserve help and people who don't. The opioid crisis is full of writing that quietly lets the reader off the hook by sorting people into worthy victims and unworthy ones. Kingsolver doesn't allow it. The kid is funny and sharp and also makes bad decisions, and the bad decisions don't stop the empathy, and the empathy doesn't soften the bad decisions. Both stay true.</p>",
      "<p>It's a sad book that isn't a hopeless one. The hope is structural — there's love in here, between people who try imperfectly to be there for each other. That's what the book wants you to notice. Whether the systems can be made to do better is a question it leaves open. Honestly, I think that's the right place to leave it.</p>",
      "<p>If you grew up around any of this, the book is going to be familiar in a way that hurts. If you didn't, it's going to be educational in a way that hurts differently. Either way, you don't come out the other side neutral. That's the point.</p>"
    ],
    "subtitle": "A novel",
    "authorBio": "Kentuckian, biologist by training, has been publishing novels since 1988. <em>Demon Copperhead</em> won her a second Pulitzer. <em>The Poisonwood Bible</em> is the one that made her name. Writes the rural American landscape with the patience of a field naturalist who's also an angry one.",
    "works": [
      {
        "title": "The Poisonwood Bible",
        "year": "1998",
        "href": "https://www.kobo.com/us/en/search?query=The+Poisonwood+Bible+Kingsolver"
      },
      {
        "title": "Prodigal Summer",
        "year": "2000",
        "href": "https://www.kobo.com/us/en/search?query=Prodigal+Summer+Kingsolver"
      },
      {
        "title": "The Lacuna",
        "year": "2009",
        "href": "https://www.kobo.com/us/en/search?query=The+Lacuna+Kingsolver"
      },
      {
        "title": "Flight Behavior",
        "year": "2012",
        "href": "https://www.kobo.com/us/en/search?query=Flight+Behavior+Kingsolver"
      }
    ]
  },
  {
    "id": 3,
    "title": "Stoner",
    "author": "John Williams",
    "authorHref": "https://en.wikipedia.org/wiki/John_Edward_Williams",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "literary",
    "tagLabel": "Literary",
    "cover": "https://heartslibrary.com/covers/stoner.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": true,
    "short": "The quiet life of a Missouri farmhand turned English professor. Almost nothing happens, and somehow everything does. Small, devastating, and the best case I've read for why literary fiction earns its place.",
    "full": [
      "<p>The premise is almost a joke. A man's whole life, told in 280 pages, in which essentially nothing of consequence happens. He marries badly, raises a daughter he loves, teaches Latin literature to undergraduates who don't care. That's it.</p>",
      "<p>By the last twenty pages I was wrecked. Williams wrote this as a quiet study of integrity — a man who tries, again and again, to do his work honestly against people and forces who don't think his work matters. The book makes the case that doing the work honestly is its own argument, even when no one is keeping score. Especially then.</p>",
      "<p>It's also one of the great novels about institutional small-mindedness. The university Stoner spends his career at is a regular American university — petty, political, occasionally generous, mostly indifferent — and Williams has the patience to draw the institutional weather day by day. He doesn't make it dramatic. He just makes it real. If you've ever worked at a place long enough to know its weather, the book will feel uncomfortably accurate.</p>",
      "<p>I press it into people's hands when they ask me what literary fiction is for. It's also a strange recovery story. Williams died in 1994 and almost nobody read this while he was alive. NYRB Classics reissued it twenty years later and it became one of the great recovered novels. Sometimes the work is right and the moment is wrong, and you have to make peace with both halves of that.</p>",
      "<p>There's a particular kind of reader for this book. If you have ever cared about doing something well that nobody is going to thank you for — the right thing in your job, the right thing in your marriage, the right thing in a piece of work no one will read — you will recognize Stoner. He's not a hero in any conventional sense. He's just a man who keeps showing up. That's enough for the book, and by the end, it's enough for you.</p>"
    ],
    "subtitle": "A novel",
    "authorBio": "Texas-born, taught literature at the University of Denver for thirty years. Wrote four novels that almost nobody read while he was alive. <em>Stoner</em> was rediscovered in 2003 — twenty years after his death — and has since become one of the great recovered novels of the century.",
    "works": [
      {
        "title": "Augustus",
        "year": "1972",
        "href": "https://www.kobo.com/us/en/search?query=Augustus+John+Williams"
      },
      {
        "title": "Butcher's Crossing",
        "year": "1960",
        "href": "https://www.kobo.com/us/en/search?query=Butcher%27s+Crossing+John+Williams"
      },
      {
        "title": "Nothing But the Night",
        "year": "1948",
        "href": "https://www.kobo.com/us/en/search?query=Nothing+But+the+Night+John+Williams"
      }
    ]
  },
  {
    "id": 4,
    "title": "East of Eden",
    "author": "John Steinbeck",
    "authorHref": "https://steinbeck.org/",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "literary",
    "tagLabel": "Literary",
    "cover": "https://heartslibrary.com/covers/eastofeden.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": true,
    "short": "Two California families retrace the Cain-and-Abel story across three generations. Steinbeck's widest canvas — the one where he tries to say everything he knows about inherited sin and free will. Timshel.",
    "full": [
      "<p>Steinbeck thought it was the only book he'd written. You can feel that on every page — the ambition is enormous, the canvas is enormous, and the question (can a person choose to be good?) is enormous. He's swinging for the fences and mostly connecting.</p>",
      "<p>The character of Cathy Ames is one of the most quietly disturbing things in American fiction. Lee, the Trask family's housekeeper, is one of the most quietly luminous. The book lives in the gap between those two — between the human capacity for evil and the human capacity to choose otherwise — and Steinbeck doesn't pretend that gap closes easily.</p>",
      "<p>Lee is the character I think about most. He's the moral intelligence of the book, mostly working in the background, and Steinbeck gives him conversations that stop the novel cold for ten or twenty pages while three men sit in a kitchen and try to translate a Hebrew word correctly. That kind of digression should be unforgivable in a 600-page novel. Steinbeck makes it the spine. He believes the question is worth that long a stop.</p>",
      "<p><em>Timshel</em> — \"thou mayest\" — is the word the book turns on. The choice is always yours, even when the inheritance is brutal. I think about it constantly. There's something American about that as a frame — the insistence on free will, sometimes against the evidence — and Steinbeck makes the case for it without pretending the evidence isn't there.</p>",
      "<p>The book is also about California in a way that gets less attention than it should. Steinbeck wrote California the way Faulkner wrote Mississippi — as a place where the land itself is part of the moral argument. The Salinas Valley shapes the people, and the people shape themselves in response, and you can't separate the two. The first hundred pages are essentially geography, and they earn it.</p>",
      "<p>I read it the year I left California for the South. I think that timing is part of why the book stayed with me. <em>East of Eden</em> is about leaving and being left, about what gets passed down whether you want it or not, about the work of choosing well inside an inheritance you didn't choose. That's a question I'm not done with. I don't think Steinbeck thought he was either.</p>"
    ],
    "subtitle": "A novel",
    "authorBio": "Salinas Valley by birth, Nobel laureate by 1962. Spent his career writing about working people in California — fruit pickers, ranch hands, displaced families — and made the case for them in prose plain enough to be quoted in church. <em>East of Eden</em> is his widest canvas.",
    "works": [
      {
        "title": "The Grapes of Wrath",
        "year": "1939",
        "href": "https://www.kobo.com/us/en/search?query=The+Grapes+of+Wrath+Steinbeck"
      },
      {
        "title": "Of Mice and Men",
        "year": "1937",
        "href": "https://www.kobo.com/us/en/search?query=Of+Mice+and+Men+Steinbeck"
      },
      {
        "title": "Cannery Row",
        "year": "1945",
        "href": "https://www.kobo.com/us/en/search?query=Cannery+Row+Steinbeck"
      },
      {
        "title": "Travels with Charley",
        "year": "1962",
        "href": "https://www.kobo.com/us/en/search?query=Travels+with+Charley+Steinbeck"
      }
    ]
  },
  {
    "id": 5,
    "title": "Giovanni's Room",
    "author": "James Baldwin",
    "authorHref": "https://www.jamesbaldwin.info/",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "literary",
    "tagLabel": "Literary",
    "cover": "https://heartslibrary.com/covers/giovannisroom.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Baldwin's American publisher told him to burn the manuscript. Too white, too gay, too unmarketable. He published it in 1956 anyway.",
    "full": [
      "<p>Baldwin's American publisher told him to burn the manuscript. Too white, too gay, too unmarketable. He published it in 1956 anyway. That decision is part of the argument — a writer staking his career on saying what he knew, not what was easy. The book is the result of that bet.</p>",
      "<p>An American in Paris, engaged to a woman, has an affair with an Italian bartender named Giovanni. The narrator is the kind of man who can't admit to himself what he's choosing, and Baldwin doesn't let him off the hook. The first-person voice is what makes it. You're inside someone telling himself the wrong story about his own life, in real time, and you can see exactly when he could have made a different call.</p>",
      "<p>What Baldwin does, and what most novels of repressed desire don't, is refuse the comfort of redemption. The narrator isn't a sympathetic victim of his time. He's a person responsible for what he did. The book gives you no exit from that, and the prose is beautiful enough that you stay anyway.</p>",
      "<p>It's also one of the rare American novels where Whiteness is named as a thing the narrator carries rather than the default to subtract. Baldwin had been writing about Blackness for years. Here he points the same instrument at a white American man and watches what happens. The result is the book most often borrowed from when contemporary writers try to do queer fiction with weight. Most of those borrowings show how hard it is to do well.</p>"
    ]
  },
  {
    "id": 6,
    "title": "Project Hail Mary",
    "author": "Andy Weir",
    "authorHref": "https://andyweirauthor.com/",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "speculative",
    "tagLabel": "Speculative",
    "cover": "https://heartslibrary.com/covers/projecthailmary.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": true,
    "short": "A lone astronaut wakes up light-years from home with one job: save the sun. Weir makes orbital mechanics and xenobiology feel like the plot — funny, earnest, and the friendship at the center blindsided me.",
    "full": [
      "<p>I went in expecting <em>The Martian</em> in space and got something completely different. Weir builds the science meticulously — there's a stretch around the middle where the physics is the suspense, somehow — and the book turns on a friendship I won't describe so I don't ruin it.</p>",
      "<p>I closed the book and immediately wanted to call somebody. It's a science fiction novel that's secretly about loneliness, and what another mind can mean when there's no one else around to think with. Earnest in the best way.</p>",
      "<p>It also belongs to the optimistic-engineering register that's hard to find right now in fiction. Most current sci-fi is either dystopian or knowing-cynical. Weir is just guy-who-likes-orbital-mechanics, sincerely problem-solving his way through. There's room for that. More than I expected.</p>",
      "<p>I'd give this one to anyone going through a hard time. It's not heavy in the way most \"smart\" fiction is. It's heavy in a different way — about how the small acts of trying to figure something out together are maybe what most of being alive is. Weir is unfashionable for caring about that. I respect him for caring anyway.</p>"
    ],
    "subtitle": "A novel",
    "authorBio": "Software engineer who self-published <em>The Martian</em> as a serial on his blog before it became a movie. Writes hard-science thrillers for people who want the math to actually work. Lives in California and apparently still does the orbital calculations himself.",
    "works": [
      {
        "title": "The Martian",
        "year": "2011",
        "href": "https://www.kobo.com/us/en/search?query=The+Martian+Andy+Weir"
      },
      {
        "title": "Artemis",
        "year": "2017",
        "href": "https://www.kobo.com/us/en/search?query=Artemis+Andy+Weir"
      }
    ]
  },
  {
    "id": 7,
    "title": "Jurassic Park",
    "author": "Michael Crichton",
    "authorHref": "https://michaelcrichton.com/",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "speculative",
    "tagLabel": "Speculative",
    "cover": "https://heartslibrary.com/covers/jurassicpark.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "The book is meaner than the movie. Spielberg made the dinosaurs into wonder; Crichton made them into a thesis statement about what happens when you ship technology you don't understand.",
    "full": [
      "<p>The book is meaner than the movie. Spielberg made the dinosaurs into wonder; Crichton made them into a thesis statement about what happens when you ship technology you don't understand. The argument isn't subtle and the book doesn't pretend it is — it's a 400-page case for taking biotech seriously, dressed up as a thriller about an island.</p>",
      "<p>The thing Crichton actually cared about is chaos theory — the way complex systems fail in ways their designers can't anticipate. Ian Malcolm is the mouthpiece, and the long lectures from Malcolm should be unbearable. They mostly aren't, because Crichton trusted that you'd hang with him through the math if the dinosaurs were good enough. The dinosaurs are good enough.</p>",
      "<p>Hammond is more clearly a villain in the book. The film made him benevolent and bewildered; Crichton wrote him as a man who is exactly arrogant enough to do this and exactly vain enough to keep doing it. That version reads more useful in 2026, when \"move fast and break things\" is no longer a quote about software.</p>",
      "<p>If you like Crichton's later thrillers, this is the cleanest one. He hadn't yet drifted into the cranky-uncle politics that made some of the late books harder to read. Jurassic Park is just an engineer who likes dinosaurs writing a book where the engineering is also the indictment.</p>"
    ]
  },
  {
    "id": 8,
    "title": "Red Rising",
    "author": "Pierce Brown",
    "authorHref": "https://www.piercebrown.com",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "speculative",
    "tagLabel": "Speculative",
    "cover": "https://heartslibrary.com/covers/redrising.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "The premise is YA-shaped — caste-system Mars, low-class kid infiltrates the elites — but Brown is doing something heavier with it.",
    "full": [
      "<p>The premise is YA-shaped — caste-system Mars, low-class kid infiltrates the elites — but Brown is doing something heavier with it. He's writing about how empires reproduce themselves, what it costs to wear the skin of the people who killed your family, and whether a revolution made by the methods of the old regime is still the revolution. The Hunger Games framing is deliberate; the engagement with Roman history and political theology is the part nobody warns you about.</p>",
      "<p>The first book is the trial run. Darrow goes through the Institute — a year-long combination of Hunger Games, Lord of the Flies, and Roman senate — and Brown spends most of the page count there. It works. The thing he's stress-testing is whether you, the reader, will start rooting for an ostensible hero who is also doing things that are clearly indefensible. You will. That's the trick.</p>",
      "<p>The series sustains it for seven books, which is its own achievement. Most space-opera collapses by book three under the weight of its own worldbuilding. Brown keeps the political stakes legible because he keeps making the characters pay for the choices they make. People die. Alliances break. The body count earns the scope.</p>",
      "<p>\"Bloodydamn\" is silly the first time you read it and earned by book six. That's a small marker for the series as a whole — the things that look like genre furniture turn out to be load-bearing. Start here, but know that book one is a setup. The thing the series is actually about doesn't fully arrive until later.</p>"
    ]
  },
  {
    "id": 9,
    "title": "Dune",
    "author": "Frank Herbert",
    "authorHref": "https://dunenovels.com/frank-herbert/",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "speculative",
    "tagLabel": "Speculative",
    "cover": "https://heartslibrary.com/covers/dune.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Dune invented the playbook. Star Wars borrows from it. Foundation borrows from it. Half the science fiction written since 1965 borrows from it.",
    "full": [
      "<p>Dune invented the playbook. Star Wars borrows from it. Foundation borrows from it. Half the science fiction written since 1965 borrows from it. If you've read sci-fi at any point and felt the shape of a desert planet, an oppressed people, a religious-political prophecy, and an extractive empire — Herbert was there first. That's the structural fact.</p>",
      "<p>The thing the movies can't capture is the interiority. Most of <em>Dune</em> is what people are thinking, and most of what they're thinking is whether the person across the table is lying to them. Herbert wrote a court-intrigue novel and dressed it as a planetary-scale war. Villeneuve's adaptations are good — better than the book deserved at this point — but they had to externalize what Herbert kept inside the head.</p>",
      "<p>The colonialism reading is right there in the text. Herbert was clear that he was writing about the West's relationship with the Middle East and the politics of resource extraction. The Fremen are not noble savages waiting for a white messiah. The book is about what happens when a colonizing prince decides he can ride the religious instrument of an oppressed people, and Herbert is honest about the fact that this works, and that the cost falls on the Fremen. Paul is not a hero. The book wants you to notice.</p>",
      "<p>Read it once for the worldbuilding. Read it again for the politics. The second pass is the one that makes the rest of the series make sense.</p>"
    ]
  },
  {
    "id": 10,
    "title": "Empire of Silence",
    "author": "Christopher Ruocchio",
    "authorHref": "https://www.highmatterbooks.com/",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "speculative",
    "tagLabel": "Speculative",
    "cover": "https://heartslibrary.com/covers/empireofsilence.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Ruocchio writes like Gene Wolfe with a Warhammer 40K problem, and I mean that as a compliment. The narrator is a disgraced nobleman writing his memoirs from a cell, awaiting execution for the worst crime in the empire's history, and he's going to take the whole series to tell you what he did.",
    "full": [
      "<p>Ruocchio writes like Gene Wolfe with a Warhammer 40K problem, and I mean that as a compliment. The narrator is a disgraced nobleman writing his memoirs from a cell, awaiting execution for the worst crime in the empire's history, and he's going to take the whole series to tell you what he did. The form is the bait. You stay because you want the confession.</p>",
      "<p>The world is operatic in a way modern sci-fi rarely is. Ruocchio takes Roman political structure, classical Greek tragedy, and a future-medieval interstellar empire and builds something that reads more like Cugel's Saga than like the Star Wars descendants. The prose is dense by current genre standards. He's asking you to slow down and let the names accrete.</p>",
      "<p>Where this book lands hardest is in the question of whether a person can tell you the truth about themselves. The narrator is unreliable in the way good first-person narrators are unreliable — he's not lying so much as protecting himself from his own conclusions. The series gets sharper about this as it goes. Book one is the long setup. The payoff is real.</p>",
      "<p>If you finished <em>Dune</em> and didn't know where to go next, this is the recommendation. Same pattern of literary sci-fi taking its philosophical and historical inheritance seriously without flinching.</p>"
    ]
  },
  {
    "id": 11,
    "title": "It",
    "author": "Stephen King",
    "authorHref": "https://stephenking.com/",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "speculative",
    "tagLabel": "Speculative",
    "cover": "https://heartslibrary.com/covers/it.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "An 1,100-page book about seven kids in Maine fighting a clown is one of the most American novels of the late twentieth century. It's also, if you sit with it, a book about what small towns agree to forget so the surface stays calm.",
    "full": [
      "<p>An 1,100-page book about seven kids in Maine fighting a clown is one of the most American novels of the late twentieth century. It's also, if you sit with it, a book about what small towns agree to forget so the surface stays calm. The clown is a vessel. Derry is the subject.</p>",
      "<p>King's gift, when he's at the height of it, is interiority for ordinary people. The Loser's Club kids feel like specific kids — the asthma, the stuttering, the dad who hits, the mom who controls — and the years he spends with them as adults makes the loss between the timelines hurt. The book is doing a horror plot and a coming-of-age plot and a midlife-reckoning plot at once, and most of the time the seams don't show.</p>",
      "<p>It's also a hard book to defend uncomplicatedly. The famous late-section scene with the kids is indefensible by current standards, and possibly by 1986 standards. King has talked about regretting it. The book is great. That scene is in the book. Both can be true, and I'd rather name that than pretend it isn't there.</p>",
      "<p>Where <em>It</em> still works is in the central observation — that the things we agree not to look at as a community accumulate, and the cost of that agreement gets paid by somebody. King is not subtle about this. He doesn't need to be. The book is an 1,100-page argument that small towns hide things in plain sight, and that the people who survive are the ones who refuse the deal.</p>"
    ]
  },
  {
    "id": 12,
    "title": "Piranesi",
    "author": "Susanna Clarke",
    "authorHref": "https://en.wikipedia.org/wiki/Susanna_Clarke",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "speculative",
    "tagLabel": "Speculative",
    "cover": "https://heartslibrary.com/covers/piranesi.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Sixteen years between Jonathan Strange and this. Clarke's first novel was 800 pages of footnoted alt-history. Piranesi is 245 pages of a man writing in a journal from inside an infinite house of statues and tides.",
    "full": [
      "<p>Sixteen years between <em>Jonathan Strange</em> and this. Clarke's first novel was 800 pages of footnoted alt-history. <em>Piranesi</em> is 245 pages of a man writing in a journal from inside an infinite house of statues and tides. The pivot is the point. Whatever she was solving for, this is what she found.</p>",
      "<p>The narrator doesn't know what he doesn't know. The book is structured around the slow accumulation of evidence that the world he's describing is not what he thinks it is, and Clarke is patient enough to let you arrive there before he does. The first hundred pages should feel longer than they do. They don't, because she's writing in a register that makes you want to keep walking the halls with him.</p>",
      "<p>What she's actually writing about is captivity and what it does to the imagination — specifically her own years of chronic illness, which the book doesn't mention but is obviously the engine. The narrator is at peace inside a circumstance most people would not be at peace inside. Clarke isn't arguing that the captivity is good. She's arguing that the mind does what it has to do to make a livable interior, and that whatever's beautiful about Piranesi's account is also a measure of what's been taken from him.</p>",
      "<p>Short, strange, and the book most worth recommending to people who don't think they like fantasy. Won the Women's Prize. Earned it.</p>"
    ]
  },
  {
    "id": 13,
    "title": "Atmosphere",
    "author": "Taylor Jenkins Reid",
    "authorHref": "https://www.taylorjenkinsreid.com/",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "contemporary",
    "tagLabel": "Contemporary",
    "cover": "https://heartslibrary.com/covers/atmosphere.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Reid's specialty is the celebrity-life period piece — Daisy Jones, Evelyn Hugo, the universe she's been building one book at a time.",
    "full": [
      "<p>Reid's specialty is the celebrity-life period piece — Daisy Jones, Evelyn Hugo, the universe she's been building one book at a time. <em>Atmosphere</em> is the same playbook in a different uniform: 1980s NASA, the second cohort of female astronauts, the Challenger years. The framing is romance against catastrophe. You know roughly what's going to happen because you know what happened in 1986.</p>",
      "<p>What she does well is character access. Joan Goodwin is an astronomy professor flying the second shuttle, and Reid lets you stay close enough to her interior that the program-and-procedure stuff feels like the air around her, not the subject. The relationship at the center is treated with care. Reid has gotten better, book by book, at writing women who exist for reasons other than being looked at.</p>",
      "<p>Where this book lands or doesn't is going to depend on whether you find the period detail load-bearing or decorative. I think she does the work. The training, the technical scaffolding, the politics of being a woman the program tolerated rather than welcomed — Reid researched it. It shows.</p>",
      "<p>Not the book of hers I'd start with — that's still <em>Evelyn Hugo</em> — but a real one if you've been with her since 2017 and want to see her stretch. Set in the same loose continuity as the others. The references will land if you've read them.</p>"
    ]
  },
  {
    "id": 14,
    "title": "The Storied Life of A.J. Fikry",
    "author": "Gabrielle Zevin",
    "authorHref": "https://gabriellezevin.com/",
    "byLabel": "By",
    "section": "Fiction",
    "tag": "contemporary",
    "tagLabel": "Contemporary",
    "cover": "https://heartslibrary.com/covers/thestoriedlifeofajfikry.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "A widowed bookshop owner on a fictional New England island finds an abandoned baby in his store. That sentence is going to sound twee, and the book mostly outruns the twee.",
    "full": [
      "<p>A widowed bookshop owner on a fictional New England island finds an abandoned baby in his store. That sentence is going to sound twee, and the book mostly outruns the twee. Zevin is a careful enough writer to land what she promises and skip what she can't.</p>",
      "<p>The structural device is each chapter opening with A.J.'s notes on a short story, and the notes do real work — they're a reading list, they're a portrait of the man, they're how the book teaches you to read what's coming. By chapter three you know what kind of book this is, and you're either with it or you're not. Most readers I know are with it.</p>",
      "<p>What she's actually doing is writing a novel about how people put themselves back together using the books they read. That's a sentimental claim, and the book is sentimental. The honesty is that Zevin doesn't pretend it isn't. She delivers a small story at the scale of a small story and trusts that the small story is the point.</p>",
      "<p>Indie bookstores have sold over two million copies on word of mouth, which is a kind of recommendation in itself. If you want a book that's going to be hard, this isn't it. If you want a book a friend would press into your hands and say \"trust me,\" that's what it is.</p>"
    ]
  },
  {
    "id": 15,
    "title": "The Hundred Years' War on Palestine",
    "author": "Rashid Khalidi",
    "authorHref": "https://history.columbia.edu/person/khalidi-rashid/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "middle-east",
    "tagLabel": "Middle East",
    "cover": "https://heartslibrary.com/covers/thehundredyearswaronpalestine.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": true,
    "short": "A Palestinian historian's century-long account of settler colonialism and resistance. Khalidi draws on family letters, political records, and decades of scholarship to trace what has actually happened since 1917. Essential if you want the full record, not a soundbite.",
    "full": [
      "<p>Khalidi is doing two things at once — laying out a hundred-year political history with the rigor of a working historian, and naming his own family's place in it. His great-great-uncle was the mayor of Jerusalem in 1899 who wrote to Theodor Herzl. His father was a Palestinian diplomat. The book carries the weight of both archive and inheritance, and that combination is what makes it different from most histories of the conflict.</p>",
      "<p>The structure is six \"declarations of war\" — Balfour, the Nakba, '67, '82, the Oslo years, Gaza. Each chapter shows how the same machinery has produced the same results across a century. It's not a polemic. It's the record. Khalidi keeps his temperature low and lets the documents do the work, which is exactly what gives the book its weight.</p>",
      "<p>The argument the structure makes — without ever stating it as an argument — is that this isn't a tragedy of misunderstanding. It's a sequence of decisions. People in specific rooms made specific choices, and the documents survive. Khalidi reads the documents. He doesn't editorialize on them. He doesn't have to. Once you see the pattern, the pattern names itself.</p>",
      "<p>One of the things I appreciate about the book is what it doesn't do. It doesn't ask you to take a side. It assumes you can read the record and draw your own conclusions, and if your conclusions don't match what the consensus has told you the conclusions should be, that is a question for the consensus, not for the record. That's an unusual posture in current writing on Palestine. It's also the right one.</p>",
      "<p>I read it next to the Malcolm autobiography and Northup's memoir, and the same thing keeps showing up: the people closest to the harm produce the clearest record. The rest of us either go to that record or settle for somebody else's version. Khalidi makes the case that the record on Palestine is available to anyone willing to read it. The reasons most people haven't aren't reasons of evidence.</p>",
      "<p>If you want to hold a real conversation about Palestine — not a soundbite version, not a comments-section version — this is one of the books to read first. It assumes you can handle history that doesn't flatter the side you're on. It rewards readers willing to sit with what the record actually says.</p>"
    ],
    "subtitle": "A History of Settler Colonialism and Resistance, 1917–2017",
    "authorBio": "Palestinian-American historian, Edward Said Professor of Modern Arab Studies at Columbia until 2020. Member of one of Jerusalem's oldest scholar families — his great-great-uncle was the mayor who wrote to Theodor Herzl in 1899. <em>The Hundred Years' War</em> is the career-summarizing book.",
    "works": [
      {
        "title": "Palestinian Identity",
        "year": "1997",
        "href": "https://www.kobo.com/us/en/search?query=Palestinian+Identity+Khalidi"
      },
      {
        "title": "Resurrecting Empire",
        "year": "2004",
        "href": "https://www.kobo.com/us/en/search?query=Resurrecting+Empire+Khalidi"
      },
      {
        "title": "The Iron Cage",
        "year": "2007",
        "href": "https://www.kobo.com/us/en/search?query=The+Iron+Cage+Khalidi"
      },
      {
        "title": "Brokers of Deceit",
        "year": "2013",
        "href": "https://www.kobo.com/us/en/search?query=Brokers+of+Deceit+Khalidi"
      }
    ]
  },
  {
    "id": 16,
    "title": "The Eyes of Gaza: A Diary of Resilience",
    "author": "Plestia Alaqad",
    "authorHref": "https://en.wikipedia.org/wiki/Plestia_Alaqad",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "middle-east",
    "tagLabel": "Middle East",
    "cover": "https://heartslibrary.com/covers/theeyesofgaza.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Required reading, and I hope we keep hearing more Palestinian voices directly. Alaqad's central claim stays with me: what's reaching us through media and social platforms is maybe ten percent of what's actually happening on the ground.",
    "full": [
      "<p>Required reading, and I hope we keep hearing more Palestinian voices directly. Alaqad's central claim stays with me: what's reaching us through media and social platforms is maybe ten percent of what's actually happening on the ground. She asks the reader not to receive Palestinians as victims but as people — with hopes, with aspirations, with a right to a normal life in their homeland.</p>",
      "<p>One of my first corporate jobs was at a social media company, doing data entry for a machine learning model built to detect violent content. For weeks I spent my days reviewing ISIS material — decapitations, burnings, infants with catastrophic injuries. I say this only because it means I'm not desensitized to what humans are capable of, and what humans are doing right now. It is not an abstraction to say that as I was reading this book, people were being bombed. Others were learning, in real time, that someone they love was gone.</p>",
      "<p>Coates writes that the job of the writer is to haunt the reader. Alaqad's diary haunts me. What's in it feels like a primal human reach for dignity and recognition.</p>",
      "<p>If I were suggesting a reading order for this topic, I'd start here.</p>"
    ]
  },
  {
    "id": 17,
    "title": "The Jewish State",
    "author": "Theodor Herzl",
    "authorHref": "https://en.wikipedia.org/wiki/Theodor_Herzl",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "middle-east",
    "tagLabel": "Middle East",
    "cover": "https://heartslibrary.com/covers/thejewishstate.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Herzl wrote this in 1896 in response to the Dreyfus Affair. The argument: European antisemitism is permanent, and the only solution is a Jewish homeland.",
    "full": [
      "<p>Herzl wrote this in 1896 in response to the Dreyfus Affair. The argument: European antisemitism is permanent, and the only solution is a Jewish homeland. The pamphlet is short, the prose is plain, and the author is sincere. Whatever you think of Israel as it exists today, the modern political project starts here.</p>",
      "<p>What's striking on a current read is how much of the book is logistics. Herzl is not writing political theology. He's writing a transition plan — funding mechanisms, who handles emigration, what kind of state, what relationship to the existing populations of the proposed locations. He considers Argentina. He considers Palestine. He treats it as a problem to be solved.</p>",
      "<p>The treatment of the existing populations is the part most pre-state Zionists later wished he'd written more of. Herzl mentions Arabs barely at all, and when he does, he assumes their interests can be reconciled with the project through economic improvement. That assumption was wrong. The cost of being wrong fell on people who were not consulted.</p>",
      "<p>Reading Herzl alongside Khalidi is the most useful pairing I can recommend. Two views of the same century, written from opposite ends of who paid for what. Neither writer is a stand-in for \"his side\" — both are specific people thinking carefully — and the gap between what Herzl assumed and what actually happened is most of the modern conflict. If you want to understand where the political project came from, you read Herzl. If you want to understand what it cost, you read Khalidi.</p>"
    ]
  },
  {
    "id": 18,
    "title": "Perfect Victims and the Politics of Appeal",
    "author": "Mohammed El-Kurd",
    "authorHref": "https://en.wikipedia.org/wiki/Mohammed_El-Kurd",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "middle-east",
    "tagLabel": "Middle East",
    "cover": "https://heartslibrary.com/covers/perfectvictimsandthepoliticsofappeal.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "El-Kurd's argument is that Palestinian suffering only counts in Western media when it's filtered through respectability politics — when the dead are the right kind of dead, when the survivors don't talk back.",
    "full": [
      "<p>El-Kurd's argument is that Palestinian suffering only counts in Western media when it's filtered through respectability politics — when the dead are the right kind of dead, when the survivors don't talk back. The book is a refusal of that filter. Its core claim is that the demand for \"perfect victims\" is a way of ranking who deserves to be heard, and that Palestinians shouldn't have to perform blamelessness to have their losses acknowledged.</p>",
      "<p>It's a polemic, and it knows it. El-Kurd doesn't pretend otherwise. The book is short, the prose is sharp, and the target is specifically the liberal sympathizer who would condemn the violence done to Palestinians only on the condition that those Palestinians stay quiet, contained, and politically agreeable. He names what's underneath that condition — that it's not really about decency, it's about who is allowed to speak in their own voice — and he's right.</p>",
      "<p>Where the book pushes back hardest is on the way Western humanitarianism turns oppressed people into the objects of sympathy rather than the subjects of their own politics. That structural move is bigger than Palestine. It's the same move applied, at different times, to Black Americans, to women, to anyone whose pain has been judged authentic only when it's expressed in a register the powerful find acceptable.</p>",
      "<p>Read this after Khalidi gives you the historical record. El-Kurd gives you the present-tense argument about how that record gets framed and misframed for a Western audience. If you find the book uncomfortable, that discomfort is the part you should sit with.</p>"
    ]
  },
  {
    "id": 19,
    "title": "The Palestine Laboratory",
    "author": "Antony Loewenstein",
    "authorHref": "https://www.antonyloewenstein.com/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "middle-east",
    "tagLabel": "Middle East",
    "cover": "https://heartslibrary.com/covers/thepalestinelaboratory.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Loewenstein's argument is concrete: Israel runs the Occupied Territories as a testing ground for surveillance and military technology, then exports what works to authoritarian regimes and liberal democracies alike.",
    "full": [
      "<p>Loewenstein's argument is concrete: Israel runs the Occupied Territories as a testing ground for surveillance and military technology, then exports what works to authoritarian regimes and liberal democracies alike. The book documents the contracts. It names the buyers. The \"laboratory\" framing is structural, not metaphorical — there is a specific market for tools whose efficacy is established on Palestinians, and whose customers include governments that want to do similar things to their own populations.</p>",
      "<p>What's useful about the book is that it doesn't moralize. Loewenstein lets the export records do the work. The companies are named. The regimes that buy from them are named. Once you see the supply chain, the argument that the conflict is purely regional becomes harder to sustain — the products are global, and the customers are using them on populations who have nothing to do with Israel or Palestine.</p>",
      "<p>The book extends a frame that's already familiar from the U.S. context: that surveillance and crowd-control tools developed for one population get cycled into use against others, that the boundary between \"war zone\" and \"domestic policing\" is more porous than the public conversation admits. Loewenstein is making the case that this dynamic operates at international scale, with Israel as one of its central nodes.</p>",
      "<p>Won the 2023 Walkley Book Award. Worth reading next to El-Kurd, who is making the moral argument; Loewenstein gives you the receipts that explain why the moral argument matters beyond Palestine.</p>"
    ]
  },
  {
    "id": 20,
    "title": "The Looming Tower: Al-Qaeda and the Road to 9/11",
    "author": "Lawrence Wright",
    "authorHref": "https://lawrencewright.com/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "middle-east",
    "tagLabel": "Middle East",
    "cover": "https://heartslibrary.com/covers/theloomingtower.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Wright structured this as four intersecting biographies — Sayyid Qutb in 1948 America, Ayman al-Zawahiri in Egyptian prisons, Osama bin Laden finding religion in Saudi Arabia, and FBI counterterrorism chief John O'Neill trying and failing to stop what was coming.",
    "full": [
      "<p>Wright structured this as four intersecting biographies — Sayyid Qutb in 1948 America, Ayman al-Zawahiri in Egyptian prisons, Osama bin Laden finding religion in Saudi Arabia, and FBI counterterrorism chief John O'Neill trying and failing to stop what was coming. The decision to do it that way is the book's argument: 9/11 didn't come out of nowhere, and reducing it to \"they hate us for our freedom\" was a way for the U.S. to avoid looking at its own role in the long causal chain.</p>",
      "<p>What Wright does well is explain radicalization without flattening it. The four biographies are taken seriously as inner lives. Qutb's experience as a graduate student in Greeley, Colorado in 1948 reads like exactly the kind of detail a thinner book would skip. Wright lets the reader see how a person becomes the thing they become, which is both more useful and more uncomfortable than a sociology-of-extremism treatment.</p>",
      "<p>The O'Neill thread is what saves the book from becoming pure indictment of Islamism. Wright is also writing about American intelligence failure — the bureaucratic infighting, the cultural blind spots, the institutional unwillingness to take a warning from a man who didn't fit the profile of a serious source. O'Neill died in the towers. The book makes you feel the institutional weight of why no one listened to him while he was alive.</p>",
      "<p>Five years of reporting, 560 interviews, won the Pulitzer. This is the book to start with on the post-9/11 Middle East if you want the framing without the post-9/11 American hubris.</p>"
    ]
  },
  {
    "id": 21,
    "title": "The Message",
    "author": "Ta-Nehisi Coates",
    "authorHref": "https://ta-nehisicoates.com/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "middle-east",
    "tagLabel": "Middle East",
    "cover": "https://heartslibrary.com/covers/themessage.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Three essays, three trips. Senegal and the Gorée slave memorial. Columbia, South Carolina, where his book was being banned. Israel and the occupied West Bank, just before October 7, 2023.",
    "full": [
      "<p>Three essays, three trips. Senegal and the Gorée slave memorial. Columbia, South Carolina, where his book was being banned. Israel and the occupied West Bank, just before October 7, 2023. Coates is asking what happens when a writer trained on the American story arrives at a story he wasn't trained for, and what the comparison costs and what it earns.</p>",
      "<p>The Palestine essay is the longest and the most divisive. Coates draws a direct line to Jim Crow and indicts the same media establishment that built his career for silencing Palestinian voices. Critics from his own usual coalition called the comparison reductive. He didn't soften it.</p>",
      "<p>What I appreciate is that he names the personal cost. Coates spent a career as the Black writer American liberalism assigned its racial reckonings to, and he's directly aware that turning the same instrument toward a different oppression risks the access and protection that role bought him. He decided the access wasn't worth keeping. That's a structural admission about who gets to write what under what conditions, and it lands harder than the political argument it sits next to.</p>",
      "<p>Whether you finish the book agreeing with the comparison is less the point than whether you finish the book taking seriously what was costly about making it. Coates is doing what he says writers should do — he's trying to haunt the reader, and he's accepting that a writer who haunts a reader doesn't get to keep the reader.</p>"
    ]
  },
  {
    "id": 22,
    "title": "One Day, Everyone Will Have Always Been Against This",
    "author": "Omar El Akkad",
    "authorHref": "https://en.wikipedia.org/wiki/Omar_El_Akkad",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "middle-east",
    "tagLabel": "Middle East",
    "cover": "https://heartslibrary.com/covers/onedayeveryonewillhavealwaysbeenagainstthis.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "El Akkad's title is the book in miniature — once the personal cost of speaking up has passed, everyone will retroactively claim to have been against Gaza all along.",
    "full": [
      "<p>El Akkad's title is the book in miniature — once the personal cost of speaking up has passed, everyone will retroactively claim to have been against Gaza all along. The book is aimed squarely at Western liberals and centrists who knew what was happening and stayed quiet, and at the institutions that rewarded silence and punished speech.</p>",
      "<p>What El Akkad gets right is the structural move. He doesn't waste the book on what makes the violence in Gaza wrong — he assumes the reader can do that math — and instead spends the pages on what makes the silence convenient. Who benefits from the pretense that this is complicated, who pays for the pretense, what kind of career you preserve by treating an obvious moral question as ambiguous.</p>",
      "<p>The book is uncomfortable in the right direction for a particular kind of reader. If you watched 2023 and 2024 and 2025 and noticed that the people most fluent in moral reasoning in your professional life suddenly went quiet, this book is for you. If you were one of those people, this book is also for you, and the discomfort is the assignment.</p>",
      "<p>Won the 2025 National Book Award for Nonfiction, which is itself part of the reception story — the book has been honored by the same institutional layer it indicts. El Akkad is presumably aware. The contradiction doesn't blunt the argument so much as illustrate it.</p>"
    ]
  },
  {
    "id": 23,
    "title": "12 Years a Slave",
    "author": "Solomon Northup",
    "authorHref": "https://en.wikipedia.org/wiki/Solomon_Northup",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/12yearsaslave.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": true,
    "short": "A free Black man in 1841 New York is kidnapped and sold into Louisiana bondage. Northup kept his literacy secret for twelve years to survive. The account is unrelenting, and impossible to forget.",
    "full": [
      "<p>Most of what most of us learned about slavery came filtered through somebody else's framing — a textbook, a movie, a museum that had to decide what to keep and what to leave out. This is the ground-level account, written by a man who was kidnapped from a free life in New York and spent twelve years being denied his name in Louisiana. He survived to write it. Most didn't.</p>",
      "<p>What hits is how exact Northup is. He isn't making a case. He's making a record. Names, dates, prices paid for human beings, what was said in what room, what was done with the whip and why. He tells you what happened and lets the cumulative weight of the facts argue for him. The years pile up.</p>",
      "<p>The book also corrects a particular kind of distance the United States has put between itself and slavery. We talk about it as past, as overcome, as something whose lessons have been integrated. Northup makes you reckon with the fact that this happened to specific people in specific rooms, that it had a daily texture and a daily ledger. The cruelty wasn't a system in the abstract. It was a person paying another person to do this to you on Tuesday.</p>",
      "<p>I read it alongside the Malcolm X autobiography and Khalidi's Palestine book, and the same thing kept showing up. The people closest to the harm produce the clearest record, and the rest of us either go to that record or settle for somebody else's version. Northup is a strong case for going to the record. The book is short, the prose is plain, and you finish it knowing you cannot say you didn't know.</p>"
    ],
    "subtitle": "A Slave Narrative",
    "authorBio": "A free Black man kidnapped from Saratoga Springs in 1841 and held in Louisiana bondage for twelve years. After his release he became an abolitionist speaker and witness in the trial of his kidnappers — they were acquitted. He disappeared from the historical record around 1857. No one knows where or how he died."
  },
  {
    "id": 24,
    "title": "Narrative of the Life of Frederick Douglass",
    "author": "Frederick Douglass",
    "authorHref": "https://en.wikipedia.org/wiki/Frederick_Douglass",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/narrativeofthelifeoffrederickdouglass.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Douglass published this in 1845 when he was 27 and still legally a fugitive. He used real names, real places, and his real history — meaning that printing the book put him at immediate risk of being recaptured.",
    "full": [
      "<p>Douglass published this in 1845 when he was 27 and still legally a fugitive. He used real names, real places, and his real history — meaning that printing the book put him at immediate risk of being recaptured. He went on a speaking tour in Britain and Ireland to put an ocean between himself and the men who legally owned him. The willingness to take that risk is part of what the book is.</p>",
      "<p>What's striking is the prose itself. Douglass had been free less than a decade. He had no formal schooling. The sentences are precise, the rhetoric is measured, and the case is unrelenting. At the time, the book was used by abolitionists as direct evidence against the pro-slavery argument that Black people were intellectually incapable of authorship. The book exists. The argument was wrong. That was its first political function.</p>",
      "<p>The autobiography is short by design. Douglass cuts what isn't necessary. The famous moment when he learns to read — and the slaveholder's wife who teaches him is forbidden from continuing once her husband recognizes the threat literacy poses to the institution — is a single chapter that does what whole sociology textbooks would later try to do. Power keeps the people it controls illiterate because literacy is what unbuilds the control.</p>",
      "<p>Read this before any later abolitionist or civil-rights text. Most of the moves you'll recognize from later writers — Du Bois, King, Baldwin — are already here in skeleton. Douglass set the form. The descendants are working in his shadow.</p>"
    ]
  },
  {
    "id": 25,
    "title": "The 1619 Project",
    "author": "Nikole Hannah-Jones",
    "authorHref": "https://nikolehannahjones.com/",
    "byLabel": "Edited by",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/the1619project.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "The argument the book is making, distilled: the United States started in 1619 with the arrival of enslaved Africans in Virginia, not in 1776 with the Declaration.",
    "full": [
      "<p>The argument the book is making, distilled: the United States started in 1619 with the arrival of enslaved Africans in Virginia, not in 1776 with the Declaration. The political point isn't to displace the founding myths but to add one — to refuse the editorial decision that made slavery a regrettable subplot rather than a load-bearing wall. The book is what happens when the most-attacked Times Magazine special issue gets expanded into a 600-page case.</p>",
      "<p>What's useful is the breadth of the contributors. Hannah-Jones edits, but the essays come from Matthew Desmond, Linda Villarosa, Jamelle Bouie, Ibram Kendi, and others. The book doesn't make a single argument so much as run the same lens over multiple American institutions — capitalism, medicine, mass incarceration, real estate, music, food — and ask what changes once you stop treating slavery as exception and start treating it as foundation.</p>",
      "<p>The criticism the book gets, including from credentialed historians, is that it sometimes overstates how directly slavery caused specific later outcomes. Some of those criticisms are fair. The book is at its strongest when it's documenting structural inheritances that have been politely sidelined and at its weakest when it's reaching for direct causation that the record doesn't fully support. Both can be true.</p>",
      "<p>Where the book is unambiguously useful is in what it forces — the question of whose story has been allowed to organize the American narrative, and what the cost of that organization has been. It's been banned in multiple school districts. That's a useful tell for what kind of question it raised.</p>"
    ]
  },
  {
    "id": 26,
    "title": "How to Be an Antiracist",
    "author": "Ibram X. Kendi",
    "authorHref": "https://www.ibramxkendi.com/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/howtobeanantiracist.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Kendi's structural move is the title — the opposite of \"racist\" is not \"not racist\" but \"antiracist.\" The book is part theory and part memoir, working through racial categories he himself once held: that some forms of racism are bigger problems than others, that economic uplift solves the racial problem, that some Black conservatism is a form of disloyalty.",
    "full": [
      "<p>Kendi's structural move is the title — the opposite of \"racist\" is not \"not racist\" but \"antiracist.\" The book is part theory and part memoir, working through racial categories he himself once held: that some forms of racism are bigger problems than others, that economic uplift solves the racial problem, that some Black conservatism is a form of disloyalty. Each chapter unwinds a position he used to hold and shows the work of leaving it.</p>",
      "<p>Where the book is most useful is in refusing the lane separation between \"I am a good person\" and \"I am part of a system that produces racial harm.\" Kendi argues that the second is the thing that matters, and that the first is a comfort that doesn't have to be true to be felt. The book is asking the reader to give up the comfort.</p>",
      "<p>The book has been used in opposite directions by readers who agree with it and by readers who don't. Right-wing critics treat it as a manifesto requiring loyalty oaths; left-wing critics treat it as a flattening of more nuanced traditions of Black political thought. The book is neither, but it is shorter and more declarative than the questions deserve, and that combination makes it easier to weaponize than to engage with.</p>",
      "<p>Worth reading next to Du Bois, Baldwin, and Coates — the long tradition Kendi is part of and not displacing. The case for \"antiracist as verb\" lands differently if you've read enough of the lineage to know where the move comes from.</p>"
    ]
  },
  {
    "id": 27,
    "title": "The Fire Next Time",
    "author": "James Baldwin",
    "authorHref": "https://www.jamesbaldwin.info/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/thefirenexttime.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": true,
    "short": "Two essays on race, faith, and what America owes itself. Baldwin's 1963 letter to his nephew still lands like it was written this morning. Short, precise, and a book that does its work in under a hundred pages.",
    "full": [
      "<p>Baldwin in 1963 sounds like Baldwin would sound today. That's the thing that hits. Sixty years later, the letter to his nephew is still the clearest-eyed thing I've read about being American, and most of what he's describing has barely shifted.</p>",
      "<p>He assumes you're an adult capable of hearing hard things, then he tells you hard things in prose so beautiful you read it twice just for the cadence. The book is short because he doesn't waste a sentence. \"Down at the Cross,\" the second essay, goes after the Nation of Islam, Christianity, and what white America has done with its terror of being seen. He doesn't offer redemption. He offers the chance to look.</p>",
      "<p>What I keep coming back to is how Baldwin handles love and rage in the same sentence. He's writing to a nephew he loves, in a country whose violence he hates, and he refuses to choose between the two registers. Most political writing collapses to one or the other — either tender appeals or pure indictment — and Baldwin keeps both lit at full brightness. That's the trick. That's why the book still works. Most writers who try to write like Baldwin pick the indictment and lose the love, and the result reads as performance.</p>",
      "<p>One line in here keeps catching me, about the necessity of giving up cherished myths in order to become free. It's the same beat that hit me in the Malcolm autobiography, and Baldwin has it more honestly — he's asking for something that costs the reader, and he's clear-eyed that most readers won't pay it. The book is short. The cost isn't.</p>"
    ],
    "subtitle": "Two essays",
    "authorBio": "Born 1924 in Harlem, died 1987 in Saint-Paul-de-Vence. Wrote with the rhythm of a Pentecostal preacher and the precision of a French essayist. Probably the most important American prose stylist of the twentieth century, and the model for what an essayist who was also a citizen could sound like.",
    "works": [
      {
        "title": "Notes of a Native Son",
        "year": "1955",
        "href": "https://www.kobo.com/us/en/search?query=Notes+of+a+Native+Son+Baldwin"
      },
      {
        "title": "Go Tell It on the Mountain",
        "year": "1953",
        "href": "https://www.kobo.com/us/en/search?query=Go+Tell+It+on+the+Mountain+Baldwin"
      },
      {
        "title": "Giovanni's Room",
        "year": "1956",
        "href": "https://www.kobo.com/us/en/search?query=Giovanni%27s+Room+Baldwin"
      },
      {
        "title": "Another Country",
        "year": "1962",
        "href": "https://www.kobo.com/us/en/search?query=Another+Country+Baldwin"
      }
    ]
  },
  {
    "id": 28,
    "title": "Nobody Knows My Name",
    "author": "James Baldwin",
    "authorHref": "https://www.jamesbaldwin.info/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/nobodyknowsmyname.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Baldwin's 1961 essay collection sits between Notes of a Native Son and The Fire Next Time , and its register is closer to Notes — these are working essays, written occasion by occasion, more interested in thinking than in arriving.",
    "full": [
      "<p>Baldwin's 1961 essay collection sits between <em>Notes of a Native Son</em> and <em>The Fire Next Time</em>, and its register is closer to <em>Notes</em> — these are working essays, written occasion by occasion, more interested in thinking than in arriving. If <em>The Fire Next Time</em> is the lightning, this is the longer weather.</p>",
      "<p>The pieces on Richard Wright are the most painful. Baldwin had idolized Wright, then publicly broken with him over what Baldwin saw as the limits of protest fiction. Wright died before they reconciled, and Baldwin is here writing about a friendship and a literary inheritance and an unresolved argument all at once. He doesn't pretend the grief is clean.</p>",
      "<p>The Norman Mailer essay — \"The Black Boy Looks at the White Boy\" — is the one I find most useful. Baldwin watches Mailer perform Blackness as bohemian costume, and names it, while still taking Mailer's actual writing seriously. He concedes what Mailer got right and pushes hard on what he didn't. It's the move at scale: empathy as floor, directness as register.</p>",
      "<p>Where this collection lands is in the watching-him-think register. Baldwin is testing the same questions that later become arguments in <em>The Fire Next Time</em> — what white America needs to give up to become free, what Black writers owe each other, what the South looked like to a man returning after a decade in Paris. The collection is preparation. It's also, in places, better than the more famous book that followed it.</p>"
    ]
  },
  {
    "id": 29,
    "title": "Just Mercy",
    "author": "Bryan Stevenson",
    "authorHref": "https://eji.org/bryan-stevenson/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/justmercy.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Stevenson's book is structured as a memoir of founding the Equal Justice Initiative in Montgomery, with the Walter McMillian case as its spine — a Black man wrongfully convicted of a 1986 murder in Monroeville, Alabama, the same town that gave us To Kill a Mockingbird .",
    "full": [
      "<p>Stevenson's book is structured as a memoir of founding the Equal Justice Initiative in Montgomery, with the Walter McMillian case as its spine — a Black man wrongfully convicted of a 1986 murder in Monroeville, Alabama, the same town that gave us <em>To Kill a Mockingbird</em>. The literary irony is too on-the-nose to be made up. Stevenson lets it sit.</p>",
      "<p>What the book is doing is showing, case by case, how the American criminal justice system punishes poverty and race more reliably than it punishes guilt. The argument is structural. Stevenson doesn't write angry. He writes precise. The cumulative effect of the cases — children sentenced to die in prison, men executed on evidence that would not survive a competent appeal — is more devastating than any polemical version of the same argument would be.</p>",
      "<p>The book is also doing something quieter. Stevenson is naming the cost of the work on the worker. He's been representing the same kinds of clients for decades. He doesn't perform exhaustion, but you can feel it under the prose, and the way he handles the human beings on each side of the cases — including the prosecutors and judges who are doing legal violence for legal reasons — is the most useful kind of moral instruction. He extends specific people the dignity of being specific people.</p>",
      "<p>Read this with <em>The Sun Does Shine</em>, which covers the McMillian case from inside the death row Stevenson was working to empty. The two books are companion pieces. The same case from opposite sides of the bars is the closest thing American justice writing has to a complete picture.</p>"
    ]
  },
  {
    "id": 30,
    "title": "The New Jim Crow",
    "author": "Michelle Alexander",
    "authorHref": "https://en.wikipedia.org/wiki/Michelle_Alexander",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/thenewjimcrow.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Alexander's argument is precise: American mass incarceration is a racial caste system operating under the legal language of colorblindness.",
    "full": [
      "<p>Alexander's argument is precise: American mass incarceration is a racial caste system operating under the legal language of colorblindness. The War on Drugs, structurally, functions as a legal replacement for Jim Crow — disproportionately labeling Black men as felons, then using that label to deny them housing, employment, voting rights, jury service, and the ordinary social goods that make a life. The criminal record does the work the explicit racial law used to do, and the system maintains the same outcomes while rejecting the language of the previous system.</p>",
      "<p>What makes the book load-bearing is that it predates the Black Lives Matter formulation. Alexander published in 2010 with no institutional cover and got read because the case is airtight. Once you read it, you can't see drug-policy debates the same way. The seemingly race-neutral metric — drug enforcement, sentencing guidelines, parole rules — is the operative racial mechanism, and the book documents it line by line.</p>",
      "<p>Where Alexander is most useful is in refusing the sorting move that divides \"violent\" and \"non-violent\" felons into different moral categories. She insists, correctly, that the political work being done by mass incarceration is largely independent of the rates of actual harm; the system's growth and shape track political opportunity, not crime. That's a hard claim to absorb if you've internalized the law-and-order frame. The book makes you sit with it.</p>",
      "<p>Read this with Stevenson and Hinton on one side and the 1619 Project on the other. The institutional inheritance is what binds them.</p>"
    ]
  },
  {
    "id": 31,
    "title": "Letter from Birmingham Jail",
    "author": "Martin Luther King Jr.",
    "authorHref": "https://thekingcenter.org/about-tkc/martin-luther-king-jr/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/letterfrombirminghamjail.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "King wrote this from a jail cell in 1963, addressed to eight white Alabama clergymen who had called the Birmingham nonviolent protest \"unwise and untimely.\" The letter is the most underread of King's major texts because everyone thinks they already know what's in it.",
    "full": [
      "<p>King wrote this from a jail cell in 1963, addressed to eight white Alabama clergymen who had called the Birmingham nonviolent protest \"unwise and untimely.\" The letter is the most underread of King's major texts because everyone thinks they already know what's in it. The line about the white moderate is famous; the rest of the letter is what the line is doing inside.</p>",
      "<p>The argument is a defense of civil disobedience against unjust laws, built on a careful read of Aquinas, Augustine, and Buber. King isn't being rhetorical when he calls the white moderate the greatest stumbling block to Black freedom — he's being analytical. The moderate prefers order to justice; the moderate's posture is a structural drag on the movement; the moderate's good intentions don't compensate for what the order they prefer is doing to the people the law is grinding. It's a structural critique, not a moral one.</p>",
      "<p>What's useful in 2026 is how transferable the argument is. King is naming a specific posture — the one that pleads for civility, that asks the harmed to wait, that treats nonviolent disruption as the actual problem — and the posture has not gone away. Every protest movement of the past sixty years has had to answer the same set of objections from the same set of people, and the letter is still the cleanest reply.</p>",
      "<p>Short, unrelenting, and the right place to start with King if you've only read the speeches. The speeches are sermons. The letter is the argument the sermons are built on.</p>"
    ]
  },
  {
    "id": 32,
    "title": "Chain of Ideas",
    "author": "Ibram X. Kendi",
    "authorHref": "https://www.ibramxkendi.com/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/chainofideas.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Kendi's argument: \"great replacement theory\" — the racist conspiracy that non-white peoples and migrants are being deliberately empowered to displace white majorities — has become the dominant political idea of the twenty-first century.",
    "full": [
      "<p>Kendi's argument: \"great replacement theory\" — the racist conspiracy that non-white peoples and migrants are being deliberately empowered to displace white majorities — has become the dominant political idea of the twenty-first century. The book traces it from Renaud Camus's <em>Le Grand Remplacement</em> through Charlottesville and Christchurch into the political programs of Le Pen, Orbán, Modi, Bolsonaro, and Trump.</p>",
      "<p>What the book does well is show the chain. Kendi is not arguing that these movements coordinate; he's arguing that they share a structural idea, and that the idea is what makes their otherwise different politics legible as a single global project. The case is mostly genealogical — who said what, who borrowed from whom, what specific sentence in what speech links to what other sentence — and the documentation is meticulous.</p>",
      "<p>Where the book is going to draw the most fire is in the breadth of the application. Kendi includes movements and politicians some readers will think don't belong in the same frame. The case for inclusion rests on the idea, not the specific style, and the question of whether the idea travels intact is exactly the question the book is making readers face. He concedes that some of the inclusions are debatable. Then he makes the case anyway.</p>",
      "<p>Released March 2026, in a political moment where the argument is going to be tested in real time. Whether you agree with every specific application, the structural claim — that we are watching a shared idea reorganize world politics — is the right question to ask, and the book is the most thorough current attempt to answer it.</p>"
    ]
  },
  {
    "id": 33,
    "title": "Between the World and Me",
    "author": "Ta-Nehisi Coates",
    "authorHref": "https://ta-nehisicoates.com/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/betweentheworldandme.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": true,
    "short": "A father's letter to his son on inhabiting a Black body in America. Coates writes with the grief of a parent and the clarity of a lifetime spent on this question. Doesn't offer comfort. Not the point.",
    "full": [
      "<p>Coates is doing something specific here — writing to his son, but also writing to readers like me who are not his son. The letter form lets him be tender in a way that an essay can't, and direct in a way that fiction can't. The book is short because it doesn't waste a sentence.</p>",
      "<p>I came to it expecting argument. What I got was grief. Coates is mourning, in real time, what it has cost him to raise a Black boy into the country we live in. He doesn't ask the reader to do anything. He asks the reader to stop pretending the cost isn't real.</p>",
      "<p>There's a specific texture to grief on the page that most American nonfiction doesn't allow itself. We tend to want our writers either angry or instructive — to land on a thesis, to give us next steps. Coates refuses the format. He's written something that sits closer to a eulogy, and he keeps it there because the situation he's writing about hasn't ended. You don't get to grieve and then get on with it. Grief is the form.</p>",
      "<p>It's a corrective to a particular kind of conversation that wants tidy resolution — that wants Coates to land on hope, or strategy, or what-do-we-do-now. He doesn't. The book ends where it ends because that's where the honest sentence stops. If you want the next move, that's on you.</p>"
    ],
    "subtitle": "A letter to his son",
    "authorBio": "Atlantic essayist turned novelist, born in Baltimore. The reparations essay (2014) is the piece of magazine writing his generation will be remembered for. He's been writing in book-length form since, working out the same questions about American history at greater range.",
    "works": [
      {
        "title": "We Were Eight Years in Power",
        "year": "2017",
        "href": "https://www.kobo.com/us/en/search?query=We+Were+Eight+Years+in+Power+Coates"
      },
      {
        "title": "The Beautiful Struggle",
        "year": "2008",
        "href": "https://www.kobo.com/us/en/search?query=The+Beautiful+Struggle+Coates"
      },
      {
        "title": "The Water Dancer",
        "year": "2019",
        "href": "https://www.kobo.com/us/en/search?query=The+Water+Dancer+Coates"
      },
      {
        "title": "The Message",
        "year": "2024",
        "href": "https://www.kobo.com/us/en/search?query=The+Message+Ta-Nehisi+Coates"
      }
    ]
  },
  {
    "id": 34,
    "title": "The Autobiography of Malcolm X",
    "author": "Malcolm X, as told to Alex Haley",
    "authorHref": "https://en.wikipedia.org/wiki/Malcolm_X",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/theautobiographyofmalcolmx.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": true,
    "short": "From Lansing hustler to civil-rights preacher, in his own voice. Malcolm's arc is the closest American history has to a self-reinvention myth — except he actually did it, repeatedly. A case for reading the primary source.",
    "full": [
      "<p>Regardless of how you feel about Malcolm X, this autobiography is brutally honest. Like many other reviewers, I do not agree with his views on women or many of his other beliefs. What I do admire is his devotion to reading and education, his openness to new ideas, his exploration of other cultures, the clarity of his truth, and above all his curiosity. He consistently took in new information and changed his beliefs over time. If you approach the book with the same curiosity, you can also find moments (through looking online) where he speaks positively about women and women's rights. His life was taken before he had the chance to continue evolving on that front. Regardless of the specifics of his beliefs, Malcolm comes across as more human than many public figures who followed him.</p>",
      "<p>While reading this alongside other books on slavery, a few things became very clear to me. For hundreds of years, Black Americans were enslaved, tortured, separated, segregated, brutalized, lynched, and systematically dehumanized. The word slavery does not fully capture the scale or cruelty of what occurred. It is one of the most inhumane chapters in human history. It is not something that becomes acceptable with time, nor something that disappears with a national apology, a holiday, or a celebration of Martin Luther King Jr. It is a permanent scar on American history. Arguments that slavery still exists elsewhere in the world or that America has made progress often function as distractions from fully accepting and emotionally integrating what was done and what continues to be done to Black Americans.</p>",
      "<p>It also became clear to me that later generations are, in effect, asking those who were harmed to sit at the table with them. Malcolm uses a version of this analogy in the book, and it stuck with me. It is like being stabbed repeatedly, surviving, healing, and being left with scars, only to be asked to share dinner every night with the person who stabbed you.</p>",
      "<p>I keep returning to the question of what you do with something that feels unforgivable. I do not have a clean answer, but the question itself seems central to conversations about slavery, civil rights, and America as a whole. Sitting with that unanswered question helped me better understand Malcolm's perspective and many of his statements about the American nightmare, capitalism, and racism. By the end of the book, one conclusion Malcolm seems to reach is that living alongside the person who stabbed you is not possible in any way currently imagined. At that point of tension, both individuals and societies face what James Baldwin described when he wrote that real change requires the loss of safety, identity, and long-held illusions. Only by surrendering cherished dreams or privileges, without bitterness or self-pity, can people become free for something greater.</p>",
      "<p>Malcolm repeatedly said he was not for violence but for self-defense. The problem is that if the conflict between white America and Black America is not only historical but ongoing, then violence becomes predictable. This is what I ultimately took away. Malcolm was not advocating violence so much as describing what inevitably follows from the conditions he observed.</p>",
      "<p>This book stirred up many more thoughts, but I will leave it there.</p>"
    ],
    "subtitle": "As told to Alex Haley",
    "authorBio": "Born Malcolm Little in Omaha, 1925. Hustler, prison convert, Nation of Islam minister, Muslim pilgrim, civil-rights speaker. Assassinated in Manhattan in 1965, two weeks before his thirty-ninth birthday. The autobiography, dictated to Alex Haley over two years of interviews, is the primary source.",
    "works": [
      {
        "title": "Malcolm X Speaks",
        "year": "1965",
        "href": "https://www.kobo.com/us/en/search?query=Malcolm+X+Speaks"
      },
      {
        "title": "By Any Means Necessary",
        "year": "1970",
        "href": "https://www.kobo.com/us/en/search?query=By+Any+Means+Necessary+Malcolm+X"
      },
      {
        "title": "The End of White World Supremacy",
        "year": "1971",
        "href": "https://www.kobo.com/us/en/search?query=End+of+White+World+Supremacy+Malcolm+X"
      }
    ]
  },
  {
    "id": 35,
    "title": "The Sun Does Shine",
    "author": "Anthony Ray Hinton",
    "authorHref": "https://en.wikipedia.org/wiki/Anthony_Ray_Hinton",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/thesundoesshine.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Hinton spent thirty years on Alabama's death row for two 1985 murders he didn't commit. The conviction was secured on racially biased forensic evidence and the kind of legal counsel that the Sixth Amendment is supposed to make impossible.",
    "full": [
      "<p>Hinton spent thirty years on Alabama's death row for two 1985 murders he didn't commit. The conviction was secured on racially biased forensic evidence and the kind of legal counsel that the Sixth Amendment is supposed to make impossible. He was freed in 2015 after Bryan Stevenson's Equal Justice Initiative took the case. The book is what those thirty years felt like from inside.</p>",
      "<p>What's striking is the choice of register. Hinton could have written this as pure indictment. He didn't. The book spends most of its pages on the friendships he built on death row, on the imaginative life he constructed to survive the daily reality of waiting for the state to kill him for something he didn't do, on the small decisions that kept him from breaking. The indictment is there. It's not the through-line.</p>",
      "<p>Read this with Stevenson's <em>Just Mercy</em>. <em>Just Mercy</em> is the McMillian case from the lawyer's side; <em>The Sun Does Shine</em> is its companion from the cell. The two books together are the closest thing the American carceral story has to a complete picture — the work of getting people out and the work of staying alive long enough to be gotten out.</p>",
      "<p>Hinton's prose is plain. He didn't go to college. He spent thirty years reading what the prison library had and writing in his head. The result is a memoir more controlled than most career memoirists produce. Make of that what you will about what the system was doing to a man it was supposed to be punishing for crimes he didn't commit.</p>"
    ]
  },
  {
    "id": 36,
    "title": "The Souls of Black Folk",
    "author": "W. E. B. Du Bois",
    "authorHref": "https://en.wikipedia.org/wiki/W._E._B._Du_Bois",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "black-history",
    "tagLabel": "Black History",
    "cover": "https://heartslibrary.com/covers/thesoulsofblackfolk.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Du Bois's 1903 collection is the founding document of modern Black American scholarship, and a hundred and twenty years later it still does most of the explanatory work it set out to do.",
    "full": [
      "<p>Du Bois's 1903 collection is the founding document of modern Black American scholarship, and a hundred and twenty years later it still does most of the explanatory work it set out to do. \"Double consciousness\" — the experience of always seeing yourself through the eyes of others — and \"the veil\" between the races aren't archaic categories. They're load-bearing in 2026, and every later Black American writer has had to answer them in some way.</p>",
      "<p>The book is fourteen essays, ranging across history, sociology, music, education, and biography. The piece on Booker T. Washington is the most consequential — Du Bois's careful, public break with the accommodationist program Washington had been selling, and the political consequences that break would set in motion. He doesn't tear Washington down. He concedes what Washington got right, then makes the case that the program asks Black Americans to give up too much in exchange for too little.</p>",
      "<p>What's most striking on a current read is how clearly Du Bois saw the American problem in structural terms before structural analysis was the dominant frame. He wasn't writing about prejudice as an attitude. He was writing about a country whose economic, political, and educational systems had been built around a racial caste, and what those systems would have to be re-designed to be anything else. The book is a research program. The questions are the right ones.</p>",
      "<p>Read this before reading later Black American thought. Most of the moves are already here — the argument with respectability, the argument with white liberalism, the argument with the kind of progress that asks the wrong people to wait — and Du Bois worked them out first.</p>"
    ]
  },
  {
    "id": 37,
    "title": "Abortion: Our Bodies, Their Lies, and the Truths We Use to Win",
    "author": "Jessica Valenti",
    "authorHref": "https://www.jessicavalenti.com/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "feminism",
    "tagLabel": "Feminism",
    "cover": "https://heartslibrary.com/covers/abortion.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Valenti's structural claim is the part most worth reading the book for: abortion isn't actually the polarizing issue American media makes it out to be.",
    "full": [
      "<p>Valenti's structural claim is the part most worth reading the book for: abortion isn't actually the polarizing issue American media makes it out to be. Roughly 80% of Americans oppose government regulation of pregnancy. The framing of \"two sides\" is itself a political achievement of a movement that doesn't have public opinion on its side, and the book is partly an argument about what it cost the country to let that framing dominate.</p>",
      "<p>The rest of the book is the working version of her daily newsletter <em>Abortion, Every Day</em>. Specific bills, specific clinics, specific lawsuits, specific data. Valenti is one of the few writers covering the post-<em>Dobbs</em> reality with the granularity of a beat reporter, and the book gives you the language to push back against legislative attacks because she's been documenting, day by day, what the legislative attacks actually look like — not the version they get translated into for cable news.</p>",
      "<p>What's useful is the refusal to let \"personal\" function as the limit of the argument. Valenti makes the structural case without abandoning the personal — these are individual lives being damaged in real time, and there is also a coordinated political project that depends on damaging them. Both are true. The book holds both.</p>",
      "<p>Released a month before the 2024 election. The political situation has only gotten harder since. The book's value as a working manual has gone up.</p>"
    ]
  },
  {
    "id": 38,
    "title": "Men Who Hate Women",
    "author": "Laura Bates",
    "authorHref": "https://www.laurabates.co.uk/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "feminism",
    "tagLabel": "Feminism",
    "cover": "https://heartslibrary.com/covers/menwhohatewomen.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Bates spent years undercover in the online manosphere — incels, pickup artists, MGTOW, men's rights forums — and the argument the book makes is that this is not a fringe problem but a pipeline.",
    "full": [
      "<p>Bates spent years undercover in the online manosphere — incels, pickup artists, MGTOW, men's rights forums — and the argument the book makes is that this is not a fringe problem but a pipeline. A pipeline that has produced multiple mass murderers, reshaped online discourse, and walked itself into mainstream political vocabulary. The fact that most public conversation still treats it as a curiosity is part of the problem the book is documenting.</p>",
      "<p>What Bates does well is take the men inside the pipeline seriously as people, even as she's making the case against the politics they've adopted. The book includes interviews with men who've left, who've radicalized, and who've talked themselves back. The fact that exit is possible is the small structural hope the book holds onto. The infrastructure that made the radicalization possible is what she wants policy to address.</p>",
      "<p>Where the book is most uncomfortable is in showing how the manosphere's vocabulary has migrated upward — into mainstream commentary, into political speeches, into product design at the platform level. Bates wrote it as a warning. The warning was correct. Years later, the vocabulary is fully ambient, and the political costs are being paid.</p>",
      "<p>Read this with <em>The New Age of Sexism</em>, her follow-up. The first book documents the human pipeline; the second book documents the same dynamic now operating with AI tools. Both books treat the misogyny as politically organized, not as private pathology. That framing is the right one.</p>"
    ]
  },
  {
    "id": 39,
    "title": "Know My Name",
    "author": "Chanel Miller",
    "authorHref": "https://chanel-miller.com/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "feminism",
    "tagLabel": "Feminism",
    "cover": "https://heartslibrary.com/covers/knowmyname.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Miller spent years as \"Emily Doe\" — the victim in the 2015 Brock Turner Stanford case — before publishing this book under her own name in 2019.",
    "full": [
      "<p>Miller spent years as \"Emily Doe\" — the victim in the 2015 Brock Turner Stanford case — before publishing this book under her own name in 2019. The 7,000-word victim impact statement she read into the Congressional Record was the first draft of this in miniature. The book is the long version. It is also a different book than the statement, because the statement was written for a courtroom and the book is written for a reader.</p>",
      "<p>What Miller does that most rape memoirs don't is refuse the narrative arc the genre wants. There is no transformative ending. There is no triumphant turn where she becomes whole. The book is structured as the actual shape of recovery — accumulation, regression, the slow re-acquisition of small things. She insists on that shape because the other shape is a lie.</p>",
      "<p>The book is also doing legal-critique work without ever calling itself that. Miller walks the reader through how the system is designed to break a survivor's testimony, how the cross-examination is engineered to suggest unreliability, how the press participates in what the defense lawyers begin. The Stanford swimming team yearbook entered into evidence; Turner's father's \"twenty minutes of action\" letter; the judge's six-month sentence. None of it was an accident, and the book makes you see the architecture.</p>",
      "<p>Won the 2019 National Book Critics Circle Award. The most useful book I know on what the assault and the system do to someone, and on what it costs someone to write about both honestly.</p>"
    ]
  },
  {
    "id": 40,
    "title": "Caliban and the Witch",
    "author": "Silvia Federici",
    "authorHref": "https://en.wikipedia.org/wiki/Silvia_Federici",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "feminism",
    "tagLabel": "Feminism",
    "cover": "https://heartslibrary.com/covers/calibanandthewitch.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Federici's argument is one of the major recoveries of late twentieth-century feminist scholarship: the European witch hunts, between the 15th and 17th centuries, were not religious mania.",
    "full": [
      "<p>Federici's argument is one of the major recoveries of late twentieth-century feminist scholarship: the European witch hunts, between the 15th and 17th centuries, were not religious mania. They were a tool of capitalist labor discipline. Hundreds of thousands of women were executed, and the targets were specifically women whose economic independence, communal knowledge, and reproductive control made the transition to wage labor and the nuclear family harder to enforce. Once you see the argument, the period reads differently.</p>",
      "<p>The structural move the book makes is reframing what counts as economic history. Federici insists that the privatization of women's labor — domestic, reproductive, caregiving — is not a side effect of capitalism's emergence but a precondition for it. The household had to be reorganized for the wage relation to function. The witch hunts were one of the mechanisms.</p>",
      "<p>Where the book is most generative is in connecting the early-modern argument to the present. Federici's later work argues that current attacks on social reproduction — on healthcare, on welfare, on the conditions of caregiving labor — are an ongoing version of the same project, not a new one. Whether you accept the full continuity, the historical case in this book is rigorous, and once you've read it, the casual treatment of \"primitive accumulation\" in standard economic histories starts to feel like an editing decision.</p>",
      "<p>Foundational text. Read it before reading current feminist economics. Most of the framing in newer books assumes you've already absorbed Federici's case, and they don't always make it explicit.</p>"
    ]
  },
  {
    "id": 41,
    "title": "Invisible Women",
    "author": "Caroline Criado Perez",
    "authorHref": "https://carolinecriadoperez.com/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "feminism",
    "tagLabel": "Feminism",
    "cover": "https://heartslibrary.com/covers/invisiblewomen.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "The book is a catalog. Criado Perez collected the consequences of building a world around an assumed male default and ran the data.",
    "full": [
      "<p>The book is a catalog. Criado Perez collected the consequences of building a world around an assumed male default and ran the data. Crash-test dummies modeled on male bodies. Drug trials that excluded women. Snow-plowing schedules optimized for commuters over caregivers. Phone keyboards too wide for women's hands. The PPE designed for the average male body that left women in healthcare and emergency response wearing equipment that didn't fit. Each example is small. The cumulative effect is the argument.</p>",
      "<p>What makes the book work is the calmness of the case. Criado Perez is not writing polemic. She's writing a research summary. The data does the work, and the data is overwhelming. The reader isn't being asked to feel a particular way. They're being asked to notice that \"neutral\" defaults are not neutral, and that the cost of treating them as neutral is paid disproportionately by half the population.</p>",
      "<p>The structural insight that survives the catalog is harder to absorb than the individual examples: most policy and design assumes a single user-default, and the user-default has historically been male and white and middle-class. The data gap is not a problem of malice. It's a problem of who gets counted as the standard observer. Once that's named, the question of how to fix specific gaps becomes secondary to the question of how the standard got built.</p>",
      "<p>Won the 2019 Royal Society Science Book Prize. The book to give to anyone who thinks the gender gap conversation is overstated. The data is the rebuttal.</p>"
    ]
  },
  {
    "id": 42,
    "title": "The New Age of Sexism",
    "author": "Laura Bates",
    "authorHref": "https://www.laurabates.co.uk/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "feminism",
    "tagLabel": "Feminism",
    "cover": "https://heartslibrary.com/covers/thenewageofsexism.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Bates's 2025 follow-up to Men Who Hate Women covers what changed when the misogyny got a new toolkit: deepfake pornography, AI chatbot \"girlfriends,\" metaverse harassment, sex robots, image-based abuse, and the bias embedded in AI training data.",
    "full": [
      "<p>Bates's 2025 follow-up to <em>Men Who Hate Women</em> covers what changed when the misogyny got a new toolkit: deepfake pornography, AI chatbot \"girlfriends,\" metaverse harassment, sex robots, image-based abuse, and the bias embedded in AI training data. The argument is that the window to regulate these systems is closing fast, and most policymakers have no idea what they're looking at.</p>",
      "<p>What's most useful in the book is the documentation of how the same dynamics from the first book — the politicization of misogyny, the pipeline-shaped radicalization — have been embedded into product design at the platform level. The AI girlfriend chatbots are not a niche curiosity; they're a multi-billion-dollar market with explicit feedback loops that train users into specific relational patterns. The deepfake market is not theoretical; it has identifiable supply chains and identifiable customers.</p>",
      "<p>Where the book pushes hardest is on the framing of AI ethics as a \"neutral safety\" question. Bates's case is that the harms being designed into these tools are gender-specific, that the labor going into surfacing them is disproportionately done by women researchers, and that the discourse around AI safety has so far refused to take the gender dimension seriously as load-bearing. The result is a regulatory environment that's missing the most predictable category of harm.</p>",
      "<p>Read this if you're working anywhere near AI policy or product. The book is the cleanest current statement of what's being missed, written by someone who has done the documentation and isn't going to soften it.</p>"
    ]
  },
  {
    "id": 43,
    "title": "Shrill",
    "author": "Lindy West",
    "authorHref": "https://www.lindywest.net/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "feminism",
    "tagLabel": "Feminism",
    "cover": "https://heartslibrary.com/covers/shrill.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Lindy West's essay collection is funny, and it would not survive being only funny. The substance underneath is what carries it. Fat acceptance, abortion, rape jokes in comedy, the time she confronted the internet troll impersonating her dead father — each piece is doing the comic register and a structural argument at the same time.",
    "full": [
      "<p>Lindy West's essay collection is funny, and it would not survive being only funny. The substance underneath is what carries it. Fat acceptance, abortion, rape jokes in comedy, the time she confronted the internet troll impersonating her dead father — each piece is doing the comic register and a structural argument at the same time. The argument doesn't get neutralized by the laughs.</p>",
      "<p>West is most useful on the rape-jokes-in-comedy chapter, which is also the one most often misread. Her case isn't that the jokes shouldn't exist. It's that the comedy industry's defense of the jokes — that they're punching at power, that they're transgressive — collapses on inspection, because the jokes overwhelmingly punch in the same direction the culture already punches. The structural read: the comic establishment is not a brave outsider; it's a status quo defending itself with the language of subversion.</p>",
      "<p>What West also does, and what the book is rare for, is take seriously the cost of being publicly fat and publicly female and publicly opinionated, all at the same time, on a 2010s internet that was practicing exactly how to make all three things expensive. She's writing partly from inside the storm. The fact that she stayed funny inside it is an achievement.</p>",
      "<p>Adapted into the 2019 Hulu series with Aidy Bryant. The series is good. The book is sharper, because the book is the thing without the network's comfort layer. Start here.</p>"
    ]
  },
  {
    "id": 44,
    "title": "Careless People",
    "author": "Sarah Wynn-Williams",
    "authorHref": "https://en.wikipedia.org/wiki/Sarah_Wynn-Williams",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "tech",
    "tagLabel": "Tech",
    "cover": "https://heartslibrary.com/covers/carelesspeople.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Seven years inside Meta, told by its former global policy director. Wynn-Williams was in the room for the company's complicity in the Rohingya genocide, for secret negotiations with the Chinese government over censorship tools, and for what she describes as serial misconduct by Sheryl Sandberg and Joel Kaplan.",
    "full": [
      "<p>Seven years inside Meta, told by its former global policy director. Wynn-Williams was in the room for the company's complicity in the Rohingya genocide, for secret negotiations with the Chinese government over censorship tools, and for what she describes as serial misconduct by Sheryl Sandberg and Joel Kaplan. The title is from <em>Gatsby</em>: the carelessness of people who smash things and retreat into their money. The frame is correct.</p>",
      "<p>What makes the book valuable is that it isn't a tell-all in the gossipy sense. Wynn-Williams was the policy person — she knows how the decisions were structured, who was in the room, what the institutional incentives were that produced the outcomes. The Rohingya chapters in particular are a case study in how a platform's moderation choices, framed internally as \"neutral,\" operate as foreign policy in countries where the platform is the dominant information environment.</p>",
      "<p>Meta obtained an emergency arbitration order to bar Wynn-Williams from promoting the book. The order drove the book to #1 on the New York Times list, which is the smaller story; the larger story is what kind of leverage a company has to suppress a former employee's account of its operations. The willingness to use that leverage is part of the indictment.</p>",
      "<p>Read this if you work in tech and especially if you've ever told yourself that the institutional culture is \"broken but well-intentioned.\" The book makes a precise case that the culture is not broken — it's working as designed — and the design produces predictable harms. The cost falls disproportionately on populations the company isn't accountable to.</p>"
    ]
  },
  {
    "id": 45,
    "title": "Bad Blood",
    "author": "John Carreyrou",
    "authorHref": "https://en.wikipedia.org/wiki/John_Carreyrou",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "tech",
    "tagLabel": "Tech",
    "cover": "https://heartslibrary.com/covers/badblood.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "The Theranos story, told by the Wall Street Journal reporter who broke it. Carreyrou's expanded case shows how Stanford pedigree, political connections (Shultz, Kissinger, Mattis on the board), and a culture of internal fear kept a fraud going for over a decade.",
    "full": [
      "<p>The Theranos story, told by the Wall Street Journal reporter who broke it. Carreyrou's expanded case shows how Stanford pedigree, political connections (Shultz, Kissinger, Mattis on the board), and a culture of internal fear kept a fraud going for over a decade. The book is the cleanest current account of how Silicon Valley's \"fake it till you make it\" register meets a domain — medical testing — where faking it is also poisoning patients.</p>",
      "<p>What's useful in the book is the granularity of the cover-up. Theranos didn't fail because of one bad bet. It failed because every layer of the company was structured to suppress information that would have killed the company sooner — internal critics fired, whistleblowers sued, journalists threatened, board members reassured by Holmes's TED-talk delivery rather than by lab results they could verify. The institutional culture of \"trust the founder\" was the operative mechanism. The medical fraud was the predictable output.</p>",
      "<p>The political tell, in retrospect, is which categories of people the system protected and which it didn't. Holmes's lawyers and PR machine treated dissent as treason long after the fraud was provable. The cost fell on the patients getting wrong test results, on the employees who tried to flag what they were seeing, and on the journalists who took the legal risk of reporting it. None of those costs were borne by the people running the company.</p>",
      "<p>Basis for the Hulu series <em>The Dropout</em>. The book is sharper, because the book is reporting and the show is dramatization. Read this with <em>Careless People</em> — same structural pattern, different industry, same lesson about what a \"visionary founder\" frame is doing to the social cost calculus.</p>"
    ]
  },
  {
    "id": 46,
    "title": "My Next Breath",
    "author": "Jeremy Renner",
    "authorHref": "https://officialjeremyrenner.com/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "memoir",
    "tagLabel": "Memoir",
    "cover": "https://heartslibrary.com/covers/mynextbreath.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "A 14,000-pound snowplow ran Renner over on New Year's Day 2023 while he was helping his nephew at his Lake Tahoe home. He stayed conscious under it for more than half an hour by using the Lamaze breathing he'd learned as a teenager helping his mother through her pregnancies.",
    "full": [
      "<p>A 14,000-pound snowplow ran Renner over on New Year's Day 2023 while he was helping his nephew at his Lake Tahoe home. He stayed conscious under it for more than half an hour by using the Lamaze breathing he'd learned as a teenager helping his mother through her pregnancies. The rest of the book is surgeries and rehab. That's the spine.</p>",
      "<p>What makes the book worth reading is what Renner doesn't do. He doesn't moralize the experience. He doesn't pretend the recovery has rebuilt him into a new person with a new philosophy. The book is about the mechanics — what the body had to do, what the family had to do, what kept him in the room with himself when the obvious move was to leave. The plainness is the register.</p>",
      "<p>Where Renner is honest is on the question of what the accident did to his sense of who he was. He was a working actor doing physically demanding work; he was the man who could do that work; the accident made him, for a long time, not that man anymore. The book is partly about what it costs to lose the version of yourself you'd built a career around, and what it takes to assemble whatever comes next without faking the gap between them.</p>",
      "<p>Published April 2025, the same month he returned to filming <em>Mayor of Kingstown</em>. The book is short. The story is the one a celebrity memoir usually wouldn't tell as plainly as he tells it. Worth picking up if you've ever had to put yourself back together after the thing you thought you were.</p>"
    ]
  },
  {
    "id": 47,
    "title": "Greenlights",
    "author": "Matthew McConaughey",
    "authorHref": "https://en.wikipedia.org/wiki/Matthew_McConaughey",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "memoir",
    "tagLabel": "Memoir",
    "cover": "https://heartslibrary.com/covers/greenlights.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "McConaughey built this from thirty-five years of journals he'd been keeping since he was a teenager. The structure is \"greenlights\" — the moments life gives you permission to go — and the yellows and reds that force you to stop and reroute.",
    "full": [
      "<p>McConaughey built this from thirty-five years of journals he'd been keeping since he was a teenager. The structure is \"greenlights\" — the moments life gives you permission to go — and the yellows and reds that force you to stop and reroute. It's a memoir in the shape of a personal philosophy, and whether you find that combination useful or insufferable is going to depend a lot on whether you can sit with someone working out their own framework in public.</p>",
      "<p>What I appreciate about the book is that it doesn't try to be a Hollywood memoir. McConaughey spends more time on his Texas childhood, the year in Australia, his relationship with his parents, and his thinking about how to live than on the films. The films are present, but they're not the load-bearing material. The memoir is about building a way of being in the world, and the films are evidence of how that building has gone.</p>",
      "<p>Where the book is going to lose readers is in the philosophical asides. McConaughey writes the way he talks, and the way he talks involves earnest, slightly-too-tidy aphorisms about persistence and presence. He's aware. The book includes them anyway, because what he's writing is the actual contents of his journals, and the actual contents include the earnestness. You either find the earnestness charming or you don't.</p>",
      "<p>Sold over three million copies in the first year. Not a book I'd press into the hands of someone looking for cultural critique, but a real one if you're interested in the genre of \"person trying, in public, to be honest about their own framework.\" The honesty is what carries it.</p>"
    ]
  },
  {
    "id": 48,
    "title": "When I Left Home",
    "author": "Buddy Guy (with David Ritz)",
    "authorHref": "https://www.buddyguy.net/",
    "byLabel": "By",
    "section": "Nonfiction",
    "tag": "memoir",
    "tagLabel": "Memoir",
    "cover": "https://heartslibrary.com/covers/whenilefthome.jpg",
    "shopName": "Parnassus Books",
    "shopHref": "https://parnassusbooks.net",
    "featured": false,
    "short": "Buddy Guy's memoir, written with David Ritz. The structure traces the life: Lettsworth, Louisiana, picking cotton, fashioning his first guitar from window-screen wire.",
    "full": [
      "<p>Buddy Guy's memoir, written with David Ritz. The structure traces the life: Lettsworth, Louisiana, picking cotton, fashioning his first guitar from window-screen wire. Chicago in 1957. Decades at Chess Records alongside Muddy Waters and Howlin' Wolf. Eventually, recognition as one of the most influential guitarists in American music — Clapton, Hendrix, and Vaughan all named him as a primary inspiration. This is the same story in his own voice.</p>",
      "<p>What makes the book valuable is the granularity on the Chicago years. Most blues histories tell the story from the outside — the labels, the recordings, the touring circuits. Guy tells it from inside the rooms. What it was actually like to be a young Black guitarist arriving at Chess in 1957, what the older men taught him and what they made him earn, how much of the famous discography is the product of specific Tuesday afternoons that nobody at the time was treating as historic.</p>",
      "<p>The Vaughan and Clapton material is the part most casual blues fans pick up. What's more useful is the long account of how the British Invasion took Black American music abroad, made it commercially viable, and brought it back to the United States where Black artists who had originated it had spent decades being underpaid for it. Guy is clear-eyed about the dynamics. He doesn't bitter himself with them. He names them.</p>",
      "<p>Read this if you've never read a memoir from inside the Chess generation. The story is American music history told by one of the people who built it, and it stays specific enough that the broader claims about race, money, and credit land harder than they would in a general history.</p>"
    ]
  }
];

window.UPNEXT = [
  {
    "title": "The Last Lion",
    "subtitle": "Visions of Glory",
    "author": "William Manchester",
    "cover": "https://heartslibrary.com/covers/the-last-lion.jpg",
    "why": "Manchester on Churchill, vol. one. Saving it for a long flight."
  },
  {
    "title": "London Falling",
    "subtitle": null,
    "author": "Patrick Radden Keefe",
    "cover": "https://heartslibrary.com/covers/london-falling.jpg",
    "why": "Radden Keefe on the city that's about to be under my feet."
  },
  {
    "title": "Adventures in the Louvre",
    "subtitle": null,
    "author": "Elaine Sciolino",
    "cover": "https://heartslibrary.com/covers/adventures-in-the-louvre.jpg",
    "why": "Reading on the train to Paris. Sciolino as my docent."
  },
  {
    "title": "The Count of Monte Cristo",
    "subtitle": null,
    "author": "Alexandre Dumas",
    "cover": "https://heartslibrary.com/covers/count-of-monte-cristo.jpg",
    "why": "The brick I keep promising myself. This is the year."
  }
];
