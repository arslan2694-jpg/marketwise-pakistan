/* Comparison Lab: side-by-side dimension tables for textbook-supported
 * comparisons (Riba vs Trade, Murabaha vs Musawamah, etc). */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  function list() {
    var root = IFLRouter.outlet();
    var comparisons = IFLData.comparisons();
    if (!comparisons.length) {
      root.innerHTML = '<div class="empty-state"><h3>Comparison Lab is still being generated</h3></div>';
      return;
    }
    root.innerHTML =
      '<div class="section-header"><h1>Comparison Lab</h1></div>' +
      '<p class="text-secondary">Textbook-supported comparisons, dimension by dimension.</p>' +
      '<div class="card-grid">' + comparisons.map(function (c) {
        return '<button class="card card-clickable" data-nav="#/comparisons/' + esc(c.id) + '">' +
          '<div class="card-title">' + esc(c.title) + '</div>' +
          '<p class="text-sm mb-0">' + esc(c.itemALabel) + ' vs ' + esc(c.itemBLabel) + '</p></button>';
      }).join("") + '</div>';
  }

  function detail(params) {
    var root = IFLRouter.outlet();
    var c = IFLData.getComparison(params.id);
    if (!c) { root.innerHTML = '<div class="empty-state"><h3>Not found</h3><button class="btn btn-primary" data-nav="#/comparisons">Back</button></div>'; return; }
    root.innerHTML =
      '<nav class="text-sm text-muted mb-3"><a data-nav="#/comparisons">Comparison Lab</a> › ' + esc(c.title) + '</nav>' +
      '<h1>' + esc(c.title) + '</h1>' +
      (c.summary ? '<p class="text-secondary">' + esc(c.summary) + '</p>' : "") +
      '<div class="card">' +
        '<table><thead><tr><th>Dimension</th><th>' + esc(c.itemALabel) + '</th><th>' + esc(c.itemBLabel) + '</th></tr></thead><tbody>' +
        c.dimensions.map(function (d) {
          return '<tr><td><strong>' + esc(d.dimension) + '</strong></td><td>' + esc(d.itemA) + '</td><td>' + esc(d.itemB) + '</td></tr>';
        }).join("") +
        '</tbody></table>' +
      '</div>' +
      (c.source ? '<div class="source-footer"><span class="icon">📖</span> Source: <em>Understanding Islamic Finance</em>, Chapters ' + (c.source.chapters || []).join(", ") +
        (c.source.sections ? ", Sections " + c.source.sections.join(", ") : "") + (c.source.pages ? ", pp. " + c.source.pages.join(", ") : "") + '</div>' : "");
  }

  IFLRouter.register("/comparisons", list);
  IFLRouter.register("/comparisons/:id", detail);
})();
