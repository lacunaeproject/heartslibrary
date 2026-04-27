"""
One-shot batch downloader for author portraits from Wikipedia /
Wikimedia Commons. Hits the page-summary REST API for each
author, pulls the lead image's source URL, and saves it to
authors/<slug>.jpg. Records attribution in authors/ATTRIBUTION.md.

Run from the repo root: python authors/_download_authors.py
"""
import urllib.request
import urllib.parse
import json
import os
import sys

UA = "HeartsLibraryBot/1.0 (codynheart@gmail.com)"
AUTHORS_DIR = "authors"
os.makedirs(AUTHORS_DIR, exist_ok=True)

# (display_name, wikipedia_title, slug)
# Wikipedia titles use disambiguation suffixes where the bare
# name lands on a disambiguation page (multiple John Williamses,
# Pierce Browns, Michelle Alexanders, Laura Bateses, etc).
AUTHORS = [
    ("Larry McMurtry",          "Larry McMurtry",                 "larry-mcmurtry"),
    ("Barbara Kingsolver",      "Barbara Kingsolver",             "barbara-kingsolver"),
    ("John Williams (Stoner)",  "John Edward Williams",           "john-williams"),
    ("John Steinbeck",          "John Steinbeck",                 "john-steinbeck"),
    ("James Baldwin",           "James Baldwin",                  "james-baldwin"),
    ("Andy Weir",               "Andy Weir",                      "andy-weir"),
    ("Michael Crichton",        "Michael Crichton",               "michael-crichton"),
    ("Pierce Brown",            "Pierce Brown (author)",          "pierce-brown"),
    ("Frank Herbert",           "Frank Herbert",                  "frank-herbert"),
    ("Christopher Ruocchio",    "Christopher Ruocchio",           "christopher-ruocchio"),
    ("Stephen King",            "Stephen King",                   "stephen-king"),
    ("Susanna Clarke",          "Susanna Clarke",                 "susanna-clarke"),
    ("Taylor Jenkins Reid",     "Taylor Jenkins Reid",            "taylor-jenkins-reid"),
    ("Gabrielle Zevin",         "Gabrielle Zevin",                "gabrielle-zevin"),
    ("Rashid Khalidi",          "Rashid Khalidi",                 "rashid-khalidi"),
    ("Plestia Alaqad",          "Plestia Alaqad",                 "plestia-alaqad"),
    ("Theodor Herzl",           "Theodor Herzl",                  "theodor-herzl"),
    ("Mohammed El-Kurd",        "Mohammed El-Kurd",               "mohammed-el-kurd"),
    ("Antony Loewenstein",      "Antony Loewenstein",             "antony-loewenstein"),
    ("Lawrence Wright",         "Lawrence Wright",                "lawrence-wright"),
    ("Ta-Nehisi Coates",        "Ta-Nehisi Coates",               "ta-nehisi-coates"),
    ("Omar El Akkad",           "Omar El Akkad",                  "omar-el-akkad"),
    ("Solomon Northup",         "Solomon Northup",                "solomon-northup"),
    ("Frederick Douglass",      "Frederick Douglass",             "frederick-douglass"),
    ("Nikole Hannah-Jones",     "Nikole Hannah-Jones",            "nikole-hannah-jones"),
    ("Ibram X. Kendi",          "Ibram X. Kendi",                 "ibram-x-kendi"),
    ("Bryan Stevenson",         "Bryan Stevenson",                "bryan-stevenson"),
    ("Michelle Alexander",      "Michelle Alexander (lawyer)",    "michelle-alexander"),
    ("Martin Luther King Jr.",  "Martin Luther King Jr.",         "martin-luther-king-jr"),
    ("Malcolm X",               "Malcolm X",                      "malcolm-x"),
    ("Anthony Ray Hinton",      "Anthony Ray Hinton",             "anthony-ray-hinton"),
    ("W. E. B. Du Bois",        "W. E. B. Du Bois",               "w-e-b-du-bois"),
    ("Jessica Valenti",         "Jessica Valenti",                "jessica-valenti"),
    ("Laura Bates",             "Laura Bates (activist)",         "laura-bates"),
    ("Chanel Miller",           "Chanel Miller",                  "chanel-miller"),
    ("Silvia Federici",         "Silvia Federici",                "silvia-federici"),
    ("Caroline Criado Perez",   "Caroline Criado Perez",          "caroline-criado-perez"),
    ("Lindy West",              "Lindy West",                     "lindy-west"),
    ("Sarah Wynn-Williams",     "Sarah Wynn-Williams",            "sarah-wynn-williams"),
    ("John Carreyrou",          "John Carreyrou",                 "john-carreyrou"),
    ("Jeremy Renner",           "Jeremy Renner",                  "jeremy-renner"),
    ("Matthew McConaughey",     "Matthew McConaughey",            "matthew-mcconaughey"),
    ("Buddy Guy",               "Buddy Guy",                      "buddy-guy"),
]


def fetch_summary(title):
    encoded = urllib.parse.quote(title.replace(" ", "_"), safe="_-(),.")
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return json.loads(r.read())
    except Exception as e:
        return {"_error": str(e)}


def download_image(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            data = r.read()
        with open(dest, "wb") as f:
            f.write(data)
        return True, len(data)
    except Exception as e:
        return False, str(e)


def main():
    ok, noimg, fail = [], [], []
    attribution = []
    for display, title, slug in AUTHORS:
        sys.stdout.write(f"  {display:30s} ")
        sys.stdout.flush()
        summary = fetch_summary(title)
        if "_error" in summary:
            print(f"ERR  {summary['_error']}")
            fail.append((display, summary["_error"]))
            continue
        if summary.get("type") == "disambiguation":
            print("DISAMBIG")
            fail.append((display, "disambiguation"))
            continue
        img = summary.get("originalimage") or summary.get("thumbnail")
        if not img or not img.get("source"):
            print("NO IMAGE on page")
            noimg.append(display)
            continue
        src = img["source"]
        page_url = summary.get("content_urls", {}).get("desktop", {}).get("page", "")
        dest = os.path.join(AUTHORS_DIR, f"{slug}.jpg")
        success, info = download_image(src, dest)
        if success:
            print(f"OK   {info // 1024} KB  ({slug}.jpg)")
            ok.append(display)
            attribution.append(
                f"- **{slug}.jpg** — {display}. "
                f"Source: {src} (Wikipedia page: {page_url})"
            )
        else:
            print(f"DL FAIL  {info}")
            fail.append((display, info))

    print()
    print(f"OK:       {len(ok)}/{len(AUTHORS)}")
    print(f"NO IMAGE: {len(noimg)}  {noimg}")
    print(f"FAIL:     {len(fail)}  {[d for d, _ in fail]}")

    attr_path = os.path.join(AUTHORS_DIR, "ATTRIBUTION.md")
    with open(attr_path, "w", encoding="utf-8") as f:
        f.write("# Author photo attribution\n\n")
        f.write(
            "Photos in this folder were pulled from English Wikipedia / "
            "Wikimedia Commons via the page-summary REST API. The lead "
            "image of each author's Wikipedia article is what was downloaded. "
            "Most images on Wikimedia Commons are licensed CC-BY-SA or are "
            "in the public domain — verify the specific license at the "
            "source URL before redistributing or modifying.\n\n"
        )
        for line in attribution:
            f.write(line + "\n")
    print(f"\nWrote {attr_path}")


if __name__ == "__main__":
    main()
