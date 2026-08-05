/* ════════════════════════════════════════════════════════════
   LOG PAGE — renders window.LOG (js/log.js, generated from
   Goodreads by scripts/sync-goodreads.py) into #logList,
   grouped by the year each book was finished. Zero upkeep:
   the data file is rewritten by the sync, this just draws it.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var data = window.LOG || [];
  var root = document.getElementById("logList");
  if (!root || !data.length) return;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDay(d) {
    return MONTHS[+d.slice(5, 7) - 1] + " " + (+d.slice(8, 10));
  }

  /* Chicago six-pointed stars, like the footer's ✶✶✶✶ */
  function stars(n) {
    if (!n) return "";
    var s = "";
    for (var i = 1; i <= 5; i++) {
      s += '<span class="' + (i <= n ? "on" : "off") + '">✶</span>';
    }
    return s;
  }

  var stats = document.getElementById("logStats");
  if (stats) {
    var five = 0, firstYear = null;
    data.forEach(function (b) {
      if (b.rating === 5) five++;
      if (b.date) firstYear = b.date.slice(0, 4);
    });
    stats.textContent = data.length + " books · " + five +
      " five-stars" + (firstYear ? " · logging since " + firstYear : "");
  }

  var html = "", year = null, open = false;
  data.forEach(function (b) {
    var y = b.date ? b.date.slice(0, 4) : "Undated";
    if (y !== year) {
      year = y;
      if (open) html += "</ol>";
      html += '<h2 class="log-year">' + esc(y) + '</h2><ol class="log-rows">';
      open = true;
    }
    html +=
      '<li class="log-row' + (b.rating === 5 ? " is-five" : "") + '">' +
        '<span class="t">' + esc(b.title) + "</span>" +
        '<span class="a">' + esc(b.author) + "</span>" +
        '<span class="spacer"></span>' +
        '<span class="stars" aria-label="' + (b.rating ? b.rating + " of 5 stars" : "unrated") + '">' +
          stars(b.rating) + "</span>" +
        '<span class="d">' + (b.date ? fmtDay(b.date) : "") + "</span>" +
      "</li>";
  });
  if (open) html += "</ol>";
  root.innerHTML = html;
})();
