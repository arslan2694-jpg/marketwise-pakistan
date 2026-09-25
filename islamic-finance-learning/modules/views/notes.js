/* My Notes: searchable list of personal notes across chapters/topics. */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  function scopeHref(n) {
    if (n.scope === "topic") { var t = IFLData.getTopic(n.refId); return t && t.source ? "#/chapter/" + t.source.chapter + "/topic/" + n.refId : "#/dashboard"; }
    if (n.scope === "chapter") return "#/chapter/" + n.refId;
    return "#/dashboard";
  }

  function render(params, query) {
    var root = IFLRouter.outlet();
    var notes = IFLStore.get().notes.slice().reverse();
    var q = (query.q || "").toLowerCase();
    var filtered = q ? notes.filter(function (n) { return n.text.toLowerCase().indexOf(q) !== -1; }) : notes;

    root.innerHTML =
      '<div class="section-header"><h1>My Notes</h1><span class="text-sm text-muted">' + notes.length + ' notes</span></div>' +
      '<input type="search" id="notes-search" placeholder="Search your notes…" value="' + esc(query.q || "") + '" class="mb-4">' +
      (filtered.length ? filtered.map(function (n) {
        return '<div class="card mb-3">' +
          '<div class="flex items-center justify-between mb-2"><span class="pill">' + esc(n.scope) + '</span><small class="text-muted">' + IFLDom.relativeTime(n.updatedAt) + '</small></div>' +
          '<p style="white-space:pre-wrap;">' + esc(n.text) + '</p>' +
          '<div class="badge-row"><button class="btn btn-sm btn-outline" data-nav="' + scopeHref(n) + '">Open source →</button><button class="btn btn-sm btn-ghost" data-del="' + esc(n.id) + '">Delete</button></div>' +
        '</div>';
      }).join("") : '<div class="empty-state"><h3>No notes yet</h3><p>Add notes from any chapter or topic page.</p></div>');

    document.getElementById("notes-search").addEventListener("input", function (e) {
      clearTimeout(root._t);
      var val = e.target.value;
      root._t = setTimeout(function () { IFLRouter.navigate("#/notes" + IFLRouter.buildQuery({ q: val || undefined })); }, 250);
    });
    IFLDom.qsa("[data-del]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-del");
        IFLStore.update(function (s) { s.notes = s.notes.filter(function (n) { return n.id !== id; }); });
        render(params, query);
      });
    });
  }

  IFLRouter.register("/notes", render);
})();
