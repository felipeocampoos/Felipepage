// Minimal progressive enhancement. The page works fully without JavaScript.

// 1) Auto-update the footer year.
(function setYear() {
  var el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

// 2) Render the publications list from publications.json.
//    To add a paper, edit publications.json — never this file or the HTML.
(function renderPublications() {
  var list = document.getElementById("pub-list");
  if (!list) return;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Bold the author's own name wherever it appears.
  function highlightSelf(authors) {
    var name = "Felipe Ocampo";
    return esc(authors).replace(name, "<strong>" + name + "</strong>");
  }

  fetch(list.dataset.src || "publications.json")
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (pubs) {
      // Newest first by year.
      pubs.sort(function (a, b) { return (b.year || 0) - (a.year || 0); });

      list.innerHTML = pubs.map(function (p) {
        var thumb = p.thumb || "assets/pub1.svg";
        var links = Object.keys(p.links || {}).map(function (label) {
          return '<a href="' + esc(p.links[label]) +
            '" target="_blank" rel="noopener">' + esc(label) + "</a>";
        }).join("");
        var venue = [p.venue, p.year].filter(Boolean).map(esc).join(", ");

        return '' +
          '<li class="pub">' +
            '<img class="pub__thumb" src="' + esc(thumb) + '" alt="" />' +
            '<div class="pub__body">' +
              '<h3 class="pub__title">' + esc(p.title) + "</h3>" +
              '<p class="pub__authors">' + highlightSelf(p.authors) + "</p>" +
              (venue ? '<p class="pub__venue">' + venue + "</p>" : "") +
              (links ? '<p class="pub__links">' + links + "</p>" : "") +
            "</div>" +
          "</li>";
      }).join("");
    })
    .catch(function (err) {
      list.innerHTML =
        '<li class="pub"><div class="pub__body">' +
        "Could not load publications (" + esc(err.message) + "). " +
        'See <a href="publications.json">publications.json</a>.' +
        "</div></li>";
    });
})();

// 3) Highlight the active section link in the sticky nav as you scroll.
(function activeNav() {
  var links = Array.prototype.slice.call(
    document.querySelectorAll(".topnav a")
  );
  if (!links.length || !("IntersectionObserver" in window)) return;

  var byId = {};
  links.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    byId[id] = link;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove("is-active"); });
        var link = byId[entry.target.id];
        if (link) link.classList.add("is-active");
      });
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
  );

  document.querySelectorAll("main .section").forEach(function (section) {
    observer.observe(section);
  });
})();
