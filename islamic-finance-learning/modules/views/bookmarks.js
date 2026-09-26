/* My Bookmarks: filterable list of everything the student has bookmarked. */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  function hrefFor(b) {
    if (b.type === "topic") { var t = IFLData.getTopic(b.refId); var chNum = t ? (t.source && t.source.chapter) : null; return chNum ? "#/chapter/" + chNum + "/topic/" + b.refId : "#/dashboard"; }
    if (b.type === "glossary") return "#/glossary?q=" + encodeURIComponent(b.refId);
    if (b.type === "concept") return "#/concept/" + b.refId;
    if (b.type === "comparison") return "#/comparisons/" + b.refId;
    if (b.type === "diagram") return "#/comparisons/" + b.refId;
    if (b.type === "question") return "#/quiz";
    return "#/dashboard";
  }

  function render(params, query) {
    var root = IFLRouter.outlet();
    var bookmarks = IFLStore.get().bookmarks.slice().reverse();
    var filter = query.type || "";
    var types = Array.from(new Set(bookmarks.map(function (b) { return b.type; })));

    root.innerHTML =
      '<div class="section-header"><h1>My Bookmarks</h1><span class="text-sm text-muted">' + bookmarks.length + ' saved</span></div>' +
      (types.length ? '<div class="badge-row mb-4"><button class="btn btn-sm ' + (!filter ? "btn-primary" : "btn-outline") + '" data-nav="#/bookmarks">All</button>' +
        types.map(function (t) { return '<button class="btn btn-sm ' + (filter === t ? "btn-primary" : "btn-outline") + '" data-nav="#/bookmarks' + IFLRouter.buildQuery({ type: t }) + '">' + esc(t) + '</button>'; }).join("") + '</div>' : "") +
      (bookmarks.length ? '<div class="card">' +
        bookmarks.filter(function (b) { return !filter || b.type === filter; }).map(function (b) {
          return '<div class="card-row mb-2" style="padding-bottom:var(--sp-2);border-bottom:1px solid var(--color-border);">' +
            '<span><span class="pill mb-1" style="display:inline-block;">' + esc(b.type) + '</span><br>' + esc(b.label) + '<br><small class="text-muted">' + IFLDom.relativeTime(b.createdAt) + '</small></span>' +
            '<span class="badge-row"><button class="btn btn-sm btn-outline" data-nav="' + hrefFor(b) + '">Open →</button><button class="btn btn-sm btn-ghost" data-remove="' + esc(b.id) + '">Remove</button></span>' +
          '</div>';
        }).join("") + '</div>' :
        '<div class="empty-state"><h3>No bookmarks yet</h3><p>Bookmark topics, glossary terms, comparisons and questions as you study.</p></div>');

    IFLDom.qsa("[data-remove]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-remove");
        IFLStore.update(function (s) { s.bookmarks = s.bookmarks.filter(function (b) { return b.id !== id; }); });
        render(params, query);
      });
    });
  }

  IFLRouter.register("/bookmarks", render);
})();
