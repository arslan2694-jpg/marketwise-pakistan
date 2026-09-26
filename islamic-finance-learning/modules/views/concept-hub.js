/* Concept Hub: a dedicated aggregation page for a major cross-cutting
 * concept (Riba, Murabaha, Sukuk, ...), pulling together everything the
 * app knows about it — definition, every topic that discusses it across
 * chapters, flashcards, questions, comparisons, and case studies — matched
 * by name against existing data (no new data files needed; concepts are
 * the Concept Map's own node list, which is curated and grows with the
 * book's content). */
(function () {
  "use strict";
  var esc = IFLDom.esc, fmt = IFLDom.formatText;

  // Strip a parenthetical qualifier ("Riba (Interest)" -> "Riba") and
  // normalize for loose matching.
  function coreName(label) {
    return label.replace(/\s*\([^)]*\)\s*$/, "").trim();
  }
  function norm(s) { return String(s || "").toLowerCase(); }
  function mentions(haystack, needle) {
    if (!haystack || !needle) return false;
    return norm(haystack).indexOf(norm(needle)) !== -1;
  }

  function findNode(nodeId) {
    var map = IFLData.conceptMap();
    return (map.nodes || []).find(function (n) { return n.id === nodeId; });
  }

  function gatherForConcept(node) {
    var name = coreName(node.label);
    var glossaryTerms = IFLData.glossaryTerms().filter(function (g) { return mentions(coreName(g.term), name) || mentions(name, coreName(g.term)); });

    var topics = [];
    IFLData.allChapters().forEach(function (c) {
      (c.topics || []).forEach(function (t) {
        var hit = mentions(t.title, name) ||
          (t.relatedConcepts || []).some(function (rc) { return mentions(rc, name); }) ||
          (t.definitions || []).some(function (d) { return mentions(coreName(d.term), name); });
        if (hit) topics.push({ topic: t, chapter: c });
      });
    });

    var flashcards = IFLData.allFlashcards().filter(function (f) { return mentions(f.front, name) || mentions(f.back, name); }).slice(0, 12);
    var questions = IFLData.allQuestions().filter(function (q) { return mentions(q.topic, name) || mentions(q.prompt, name); }).slice(0, 10);
    var comparisons = IFLData.comparisons().filter(function (c) { return mentions(c.title, name) || mentions(c.itemALabel, name) || mentions(c.itemBLabel, name); });
    var caseStudies = IFLData.caseStudies().filter(function (c) { return mentions(c.concept, name) || mentions(c.title, name); });

    return { name: name, glossaryTerms: glossaryTerms, topics: topics, flashcards: flashcards, questions: questions, comparisons: comparisons, caseStudies: caseStudies };
  }

  function render(params) {
    var root = IFLRouter.outlet();
    var node = findNode(params.nodeId);
    if (!node) {
      root.innerHTML = '<div class="empty-state"><h3>Concept not found</h3><button class="btn btn-primary" data-nav="#/concept-map">Back to Concept Map</button></div>';
      return;
    }
    var data = gatherForConcept(node);
    var s = IFLStore.get();
    var isBm = s.bookmarks.some(function (b) { return b.type === "concept" && b.refId === node.id; });

    root.innerHTML =
      '<nav class="text-sm text-muted mb-3"><a data-nav="#/concept-map">Concept Map</a> › ' + esc(node.label) + '</nav>' +
      '<div class="section-header">' +
        '<div><span class="pill pill-brand mb-2" style="display:inline-block;">Concept Hub</span><h1 class="mb-0">' + esc(node.label) + '</h1></div>' +
        '<button class="btn btn-sm ' + (isBm ? "btn-primary" : "btn-outline") + '" id="concept-bm-btn">' + (isBm ? "🔖 Bookmarked" : "🔖 Bookmark") + '</button>' +
      '</div>' +

      (data.glossaryTerms.length ?
        '<div class="card mb-4"><h3>Definition</h3>' + data.glossaryTerms.map(function (g) {
          return '<div class="mb-2"><strong>' + esc(g.term) + '</strong><p class="text-sm mb-0">' + esc(g.definition) + '</p></div>';
        }).join("") + '</div>' : "") +

      '<div class="card mb-4">' +
        '<div class="section-header mb-2"><h3 class="mb-0">Where This Appears (' + data.topics.length + ')</h3></div>' +
        (data.topics.length ? data.topics.map(function (row) {
          return '<button class="card card-clickable card-row mb-2" data-nav="#/chapter/' + row.chapter.chapterNumber + '/topic/' + row.topic.id + '">' +
            '<span><span class="pill pill-brand" style="margin-right:8px;">Ch ' + row.chapter.chapterNumber + '</span>' + esc(row.topic.title) + '</span>' +
            '<span class="text-muted">→</span></button>';
        }).join("") : '<p class="text-muted mb-0">No directly matching topics found — try the Glossary or Search.</p>') +
      '</div>' +

      '<div class="grid-2 mb-4">' +
        '<div class="card">' +
          '<div class="section-header mb-2"><h3 class="mb-0">Flashcards (' + data.flashcards.length + ')</h3>' + (data.flashcards.length ? '<a data-nav="#/flashcards" class="text-sm">Review all →</a>' : "") + '</div>' +
          (data.flashcards.length ? data.flashcards.map(function (f) {
            return '<div class="text-sm mb-2" style="padding-bottom:var(--sp-2);border-bottom:1px solid var(--color-border);">' + esc(f.front) + '</div>';
          }).join("") : '<p class="text-muted mb-0">None matched directly.</p>') +
        '</div>' +
        '<div class="card">' +
          '<div class="section-header mb-2"><h3 class="mb-0">Quiz Questions (' + data.questions.length + ')</h3>' + (data.questions.length ? '<a data-nav="#/quiz" class="text-sm">Practice →</a> ' : "") + '</div>' +
          (data.questions.length ? data.questions.map(function (q) {
            return '<div class="text-sm mb-2" style="padding-bottom:var(--sp-2);border-bottom:1px solid var(--color-border);">' + esc(q.prompt.slice(0, 90)) + (q.prompt.length > 90 ? "…" : "") + '</div>';
          }).join("") : '<p class="text-muted mb-0">None matched directly.</p>') +
        '</div>' +
      '</div>' +

      (data.comparisons.length ?
        '<div class="card mb-4"><h3>Related Comparisons</h3><div class="badge-row">' +
          data.comparisons.map(function (c) { return '<a class="pill pill-brand" data-nav="#/comparisons/' + esc(c.id) + '">' + esc(c.title) + '</a>'; }).join("") +
        '</div></div>' : "") +

      (data.caseStudies.length ?
        '<div class="card mb-4"><h3>Related Case Studies</h3><div class="badge-row">' +
          data.caseStudies.map(function (c) { return '<a class="pill" data-nav="#/case-studies/' + esc(c.id) + '">' + esc(c.title) + '</a>'; }).join("") +
        '</div></div>' : "") +

      '<button class="btn btn-outline btn-sm" data-nav="#/concept-map">← Back to full Concept Map</button>';

    document.getElementById("concept-bm-btn").addEventListener("click", function () {
      var st = IFLStore.get();
      var existing = st.bookmarks.find(function (b) { return b.type === "concept" && b.refId === node.id; });
      IFLStore.update(function (state) {
        if (existing) state.bookmarks = state.bookmarks.filter(function (b) { return b !== existing; });
        else state.bookmarks.push({ id: "bm-" + Date.now(), type: "concept", refId: node.id, label: node.label, createdAt: Date.now() });
      });
      render(params);
    });
  }

  IFLRouter.register("/concept/:nodeId", render);
})();
