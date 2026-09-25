/* Full search results page for #/search?q=... */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  function render(params, query) {
    var root = IFLRouter.outlet();
    var q = query.q || "";
    var results = q ? IFLData.search(q, 60) : [];
    root.innerHTML =
      '<div class="section-header"><h1>Search Results</h1></div>' +
      '<input type="search" id="results-search" value="' + esc(q) + '" placeholder="Search chapters, terms, glossary, questions…" class="mb-4">' +
      (q ? '<p class="text-sm text-muted mb-4">' + results.length + ' results for "' + esc(q) + '"</p>' : '<p class="text-muted">Type a search term above.</p>') +
      (results.length ? '<div class="card">' + results.map(function (r) {
        return '<a class="flex-col" data-nav="' + r.href + '" style="display:block;padding:var(--sp-3) 0;border-bottom:1px solid var(--color-border);text-decoration:none;color:inherit;">' +
          '<span class="badge-row mb-1"><span class="pill pill-brand">' + esc(r.kind) + '</span>' + (r.chapter ? '<span class="pill">Ch ' + r.chapter + '</span>' : "") + '</span>' +
          '<strong>' + esc(r.title) + '</strong>' +
          (r.context ? '<p class="text-sm text-muted mb-0">' + esc(String(r.context).slice(0, 140)) + '</p>' : "") +
        '</a>';
      }).join("") + '</div>' : (q ? '<div class="empty-state"><h3>No results</h3><p>Try a different term.</p></div>' : ""));

    document.getElementById("results-search").addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.value.trim()) {
        IFLRouter.navigate("#/search" + IFLRouter.buildQuery({ q: e.target.value.trim() }));
      }
    });
  }

  IFLRouter.register("/search", render);
})();
