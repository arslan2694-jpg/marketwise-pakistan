/* Searchable, filterable glossary — sourced from the book's own back-matter
 * glossary, merged with any chapter-embedded definitions (which carry exact
 * section/page citations). */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  function mergedGlossary() {
    var bookTerms = IFLData.glossaryTerms().map(function (g) {
      return { term: g.term, definition: g.definition, source: null };
    });
    var chapterDefs = [];
    IFLData.allChapters().forEach(function (c) {
      (c.topics || []).forEach(function (t) {
        (t.definitions || []).forEach(function (d) {
          chapterDefs.push({ term: d.term, definition: d.definition, source: t.source, chapterTitle: c.title });
        });
      });
    });
    // Prefer chapter-cited definition when the term matches (case-insensitive, loose)
    var byKey = {};
    bookTerms.forEach(function (t) { byKey[t.term.toLowerCase()] = t; });
    chapterDefs.forEach(function (t) {
      var key = t.term.toLowerCase();
      if (byKey[key]) {
        byKey[key].source = byKey[key].source || t.source;
        byKey[key].chapterTitle = byKey[key].chapterTitle || t.chapterTitle;
      } else {
        byKey[key] = t;
      }
    });
    return Object.keys(byKey).map(function (k) { return byKey[k]; }).sort(function (a, b) { return a.term.localeCompare(b.term); });
  }

  var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  function render(params, query) {
    var root = IFLRouter.outlet();
    var terms = mergedGlossary();
    var activeLetter = query.letter || "";
    var q = (query.q || "").toLowerCase();

    root.innerHTML =
      '<div class="section-header"><h1>Glossary</h1><span class="text-sm text-muted">' + terms.length + ' terms</span></div>' +
      '<p class="text-secondary">Definitions from Muhammad Ayub\'s <em>Understanding Islamic Finance</em> — its own glossary, supplemented by in-chapter definitions with page citations where available.</p>' +
      '<div class="card mb-4">' +
        '<input type="search" id="glossary-search" placeholder="Search terms…" value="' + esc(query.q || "") + '">' +
        '<div class="badge-row mt-3">' +
          '<button class="btn btn-sm ' + (!activeLetter ? "btn-primary" : "btn-outline") + '" data-letter="">All</button>' +
          ALPHABET.map(function (l) {
            var has = terms.some(function (t) { return t.term.toUpperCase().indexOf(l) === 0; });
            return '<button class="btn btn-sm ' + (activeLetter === l ? "btn-primary" : "btn-outline") + '" data-letter="' + l + '" ' + (has ? "" : "disabled") + '>' + l + '</button>';
          }).join("") +
        '</div>' +
      '</div>' +
      '<div id="glossary-list" class="card"></div>';

    function paint() {
      var filtered = terms.filter(function (t) {
        if (activeLetter && t.term.toUpperCase().indexOf(activeLetter) !== 0) return false;
        if (q && t.term.toLowerCase().indexOf(q) === -1 && t.definition.toLowerCase().indexOf(q) === -1) return false;
        return true;
      });
      var list = document.getElementById("glossary-list");
      if (!filtered.length) {
        list.innerHTML = '<p class="text-muted mb-0">No terms match.</p>';
        return;
      }
      list.innerHTML = filtered.map(function (t) {
        var bookmarks = IFLStore.get().bookmarks;
        var isBm = bookmarks.some(function (b) { return b.type === "glossary" && b.refId === t.term; });
        return '<div class="mb-3" style="padding-bottom:var(--sp-3);border-bottom:1px solid var(--color-border);">' +
          '<div class="flex items-center justify-between">' +
            '<strong>' + esc(t.term) + '</strong>' +
            '<button class="btn btn-sm ' + (isBm ? "btn-primary" : "btn-ghost") + '" data-bm="' + esc(t.term) + '">🔖</button>' +
          '</div>' +
          '<p class="text-sm mb-1">' + esc(t.definition) + '</p>' +
          (t.source ? '<small class="text-muted">Ch ' + t.source.chapter + (t.source.section ? " · §" + esc(t.source.section) : "") + (t.source.pages && t.source.pages.length ? " · p." + t.source.pages.join(",") : "") +
            (t.source.chapter ? ' · <a data-nav="#/chapter/' + t.source.chapter + '">View lesson →</a>' : "") + '</small>' : '<small class="text-muted">From the book\'s glossary</small>') +
        '</div>';
      }).join("");
      IFLDom.qsa("[data-bm]", list).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var term = btn.getAttribute("data-bm");
          var s = IFLStore.get();
          var existing = s.bookmarks.find(function (b) { return b.type === "glossary" && b.refId === term; });
          IFLStore.update(function (st) {
            if (existing) st.bookmarks = st.bookmarks.filter(function (b) { return b !== existing; });
            else st.bookmarks.push({ id: "bm-" + Date.now(), type: "glossary", refId: term, label: term, createdAt: Date.now() });
          });
          paint();
        });
      });
    }
    paint();

    IFLDom.qsa("[data-letter]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        IFLRouter.navigate("#/glossary" + IFLRouter.buildQuery({ letter: btn.getAttribute("data-letter") || undefined, q: query.q || undefined }));
      });
    });
    document.getElementById("glossary-search").addEventListener("input", function (e) {
      var val = e.target.value;
      clearTimeout(root._searchTimer);
      root._searchTimer = setTimeout(function () {
        IFLRouter.navigate("#/glossary" + IFLRouter.buildQuery({ q: val || undefined, letter: query.letter || undefined }));
      }, 250);
    });
  }

  IFLRouter.register("/glossary", render);
})();
