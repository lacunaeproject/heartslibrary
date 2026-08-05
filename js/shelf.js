/* ============================================================
   HEART'S LIBRARY — shelf renderer.
   Reads window.BOOKS / window.UPNEXT from js/books.js and
   renders the browsable shelf: chips, search, stars, expand.
   You never need to edit this file to update the site.
   ============================================================ */
(function () {
  "use strict";

  var BOOKS = window.BOOKS || [];
  var UPNEXT = window.UPNEXT || [];

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- currently reading ---------- */
  var cr = document.getElementById("currentlyReading");
  var currentBooks = Array.isArray(window.CURRENT)
    ? window.CURRENT
    : (window.CURRENT && window.CURRENT.title ? [window.CURRENT] : []);
  if (cr && currentBooks.length) {
    cr.innerHTML =
      '<span class="cr-label">Currently reading</span>' +
      '<ul class="cr-list">' +
      currentBooks.map(function (c) {
        return "<li><span class=\"cr-title\">" + esc(c.title) + "</span>" +
          (c.author ? ' <span class="cr-by">' + esc(c.author) + "</span>" : "") +
          (c.note ? ' <span class="cr-note">' + esc(c.note) + "</span>" : "") + "</li>";
      }).join("") +
      "</ul>";
  } else if (cr) {
    cr.remove();
  }
  var av = document.getElementById("authorAvatar");
  if (av && window.META && window.META.avatar) {
    var img = document.createElement("img");
    img.className = "author-avatar";
    img.alt = "Cody Heart";
    img.onload = function () { img.classList.add("is-loaded"); };
    img.onerror = function () { img.remove(); };  // no photo → no circle
    img.src = window.META.avatar;
    av.replaceWith(img);
  }

  if (window.META && window.META.updated) {
    var uw = document.getElementById("updatedWhen");
    if (uw) uw.textContent = window.META.updated;
  }

  /* ---------- shelf rows ---------- */
  var shelf = document.getElementById("shelf");
  var countEl = document.getElementById("shelfCount");
  if (shelf) {
    var lastSection = null;
    BOOKS.forEach(function (b) {
      if (b.section !== lastSection) {
        lastSection = b.section;
        var deck = b.section === "Fiction"
          ? "Fourteen novels I hand people when they ask what to read next. Literary, sci-fi, and the ones I keep going back to."
          : "Thirty-four books that shaped how I understand the world. Essays, histories, criticism — organized by topic. A reader’s shelf, not a library.";
        var div = el("li", "shelf-divider");
        div.id = b.section.toLowerCase();
        div.setAttribute("data-section-divider", b.section.toLowerCase());
        div.innerHTML = "<h2>" + esc(b.section) + "</h2><p>" + esc(deck) + "</p>";
        shelf.appendChild(div);
      }

      var li = el("li", "book" + (b.featured ? " featured" : ""));
      li.setAttribute("data-tag", b.tag);
      li.setAttribute("data-section", b.section.toLowerCase());
      li.setAttribute("data-q",
        (b.title + " " + b.author + " " + b.tagLabel + " " + b.section).toLowerCase());

      var authorHtml = b.authorHref
        ? '<a href="' + esc(b.authorHref) + '" target="_blank" rel="noopener">' + esc(b.author) + "</a>"
        : esc(b.author);

      var fullBits = (b.full || []).join("");
      var extras = "";
      if (b.authorBio) {
        extras += '<div class="about-author"><h4>About the author</h4><p>' + b.authorBio + "</p>";
        if (b.works && b.works.length) {
          extras += '<ul class="also-by">' + b.works.map(function (w) {
            return '<li><a href="' + esc(w.href) + '" target="_blank" rel="noopener">' +
              esc(w.title) + "</a> <span>" + esc(w.year) + "</span></li>";
          }).join("") + "</ul>";
        }
        extras += "</div>";
      }
      var shopLine = b.shopName
        ? '<p class="shop-line">Read at <a href="' + esc(b.shopHref) + '" target="_blank" rel="noopener">' +
          esc(b.shopName) + " ↗</a></p>"
        : "";

      li.innerHTML =
        '<img class="thumb" src="' + esc(b.cover) + '" alt="" loading="lazy" ' +
          'data-title="' + esc(b.title) + '" data-author="' + esc(b.author) + '" ' +
          'onerror="coverFallback(this)">' +
        '<div class="book-main">' +
          '<div class="book-top">' +
            "<h3>" + esc(b.title) + "</h3>" +
          "</div>" +
          '<p class="book-meta">' + esc(b.byLabel) + " " + authorHtml +
            '<span class="dot">·</span><span class="tagpill">' + esc(b.tagLabel) + "</span>" +
            (b.featured ? '<span class="dot">·</span><span class="toppill">✶ Top ten</span>' : "") +
          "</p>" +
          '<p class="book-short">' + b.short + "</p>" +
          (fullBits
            ? "<details><summary>Full review</summary><div class=\"book-full\">" +
              fullBits + extras + shopLine + "</div></details>"
            : shopLine) +
        "</div>";
      li.style.animationDelay = Math.min(shelf.children.length * 22, 500) + "ms";
      shelf.appendChild(li);
    });
  }

  /* ---------- chips ---------- */
  var chipsEl = document.getElementById("chips");
  var current = "all";
  var query = "";

  function chipDef() {
    var defs = [{ key: "all", label: "All", count: BOOKS.length }];
    defs.push({ key: "__featured", label: "Top ten", count: BOOKS.filter(function (b) { return b.featured; }).length });
    var seen = {};
    BOOKS.forEach(function (b) {
      if (!seen[b.tag]) { seen[b.tag] = { key: b.tag, label: b.tagLabel, count: 0 }; }
      seen[b.tag].count++;
    });
    Object.keys(seen).forEach(function (k) { defs.push(seen[k]); });
    return defs;
  }

  function apply() {
    var rows = shelf ? Array.prototype.slice.call(shelf.querySelectorAll("li.book")) : [];
    var shown = 0;
    rows.forEach(function (r) {
      var okTag = current === "all" ||
        (current === "__featured" ? r.classList.contains("featured") : r.getAttribute("data-tag") === current);
      var okQ = !query || r.getAttribute("data-q").indexOf(query) !== -1;
      var show = okTag && okQ;
      r.hidden = !show;
      if (show) shown++;
    });
    Array.prototype.forEach.call(shelf.querySelectorAll(".shelf-divider"), function (d) {
      var sec = d.getAttribute("data-section-divider");
      var any = rows.some(function (r) { return !r.hidden && r.getAttribute("data-section") === sec; });
      d.hidden = !any;
    });
    if (countEl) {
      countEl.textContent = "Showing " + shown + " of " + BOOKS.length + " five-star reads · Compiled April 2026";
    }
  }

  var moreWrap = document.getElementById("moreWrap");
  var moreBtn = document.getElementById("moreBtn");
  var moreMenu = document.getElementById("moreMenu");
  var moreLabel = moreBtn ? moreBtn.querySelector(".more-label") : null;
  var sheetScrim = document.getElementById("sheetScrim");
  var allChips = [];

  function setMenu(open) {
    if (!moreBtn || !moreMenu) return;
    moreMenu.hidden = !open;
    if (sheetScrim) sheetScrim.hidden = !open;
    moreBtn.setAttribute("aria-expanded", open ? "true" : "false");
    document.documentElement.classList.toggle("sheet-open", open);
  }

  function syncMoreState() {
    if (!moreBtn || !moreMenu) return;
    var activeInMenu = null;
    Array.prototype.forEach.call(moreMenu.children, function (x) {
      if (x.getAttribute("aria-pressed") === "true") activeInMenu = x;
    });
    moreBtn.classList.toggle("is-active", !!activeInMenu);
    if (moreLabel) {
      moreLabel.textContent = activeInMenu
        ? activeInMenu.getAttribute("data-label")
        : "More";
    }
  }

  /* One line of chips; the rest live behind More. */
  function layoutChips() {
    if (!chipsEl || !moreWrap || !moreMenu) return;
    // reset: everything back into the row
    while (moreMenu.firstChild) chipsEl.appendChild(moreMenu.firstChild);
    moreWrap.hidden = false;
    var guard = 0;
    while (chipsEl.scrollWidth > chipsEl.clientWidth && chipsEl.children.length > 1 && guard < 60) {
      moreMenu.insertBefore(chipsEl.lastElementChild, moreMenu.firstChild);
      guard++;
    }
    if (!moreMenu.children.length) { moreWrap.hidden = true; setMenu(false); }
    syncMoreState();
  }

  if (chipsEl) {
    chipDef().forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.innerHTML = esc(c.label) + ' <span class="n">' + c.count + "</span>";
      b.setAttribute("data-chip", c.key);
      b.setAttribute("data-label", c.label);
      b.setAttribute("aria-pressed", c.key === "all" ? "true" : "false");
      b.addEventListener("click", function () {
        current = c.key;
        allChips.forEach(function (x) {
          x.setAttribute("aria-pressed", x === b ? "true" : "false");
        });
        apply();
        setMenu(false);
        syncMoreState();
      });
      allChips.push(b);
      chipsEl.appendChild(b);
    });
    layoutChips();
    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt); rt = setTimeout(layoutChips, 120);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutChips);
  }

  if (moreBtn) {
    moreBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setMenu(moreMenu.hidden);
    });
    document.addEventListener("click", function (e) {
      if (!moreMenu.hidden && !moreMenu.contains(e.target) && e.target !== moreBtn) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    if (sheetScrim) sheetScrim.addEventListener("click", function () { setMenu(false); });
  }

  /* ---------- up next ---------- */
  var un = document.getElementById("upnext");
  if (un) {
    UPNEXT.forEach(function (t) {
      var card = el("div", "upnext-card");
      card.innerHTML =
        '<img src="' + esc(t.cover) + '" alt="" loading="lazy" ' +
          'data-title="' + esc(t.title) + '" data-author="' + esc(t.author) + '" onerror="coverFallback(this)">' +
        "<div><h3>" + esc(t.title) + "</h3>" +
        '<p class="who">' + esc(t.author) +
          (t.subtitle ? " · " + esc(t.subtitle) : "") + "</p>" +
        '<p class="why">' + esc(t.why) + "</p></div>";
      un.appendChild(card);
    });
  }

  apply();
})();
