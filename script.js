// Minimal progressive enhancement. The page works fully without JavaScript.

// 1) Auto-update the footer year.
(function setYear() {
  var el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

// 2) Highlight the active section link in the sticky nav as you scroll.
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
