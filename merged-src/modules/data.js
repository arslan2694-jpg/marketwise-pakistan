/* Canonical data access layer: ONE set of indexes over every content type, alias resolution for
   records merged from the two source applications, and the explicit relationship graph.
   Views and engines go through IFL.data instead of touching IFL_DATA directly. */
(function () {
  var IFL = window.IFL = window.IFL || {}, D = window.IFL_DATA, S = D.sets;
  var idx = {}, list = {}, adj = {}, extra = [];

  function index(type, arr, key) {
    list[type] = arr; idx[type] = {};
    arr.forEach(function (r) { idx[type][r[key || 'id']] = r; });
  }
  var chapterNums = Object.keys(D.chapters).map(Number).sort(function (a, b) { return a - b; });
  var topics = [], questions = [], flashcards = [], exam = [];
  chapterNums.forEach(function (n) {
    var c = D.chapters[n];
    c.topics.forEach(function (t) { t.chapter = n; topics.push(t); });
    c.questions.forEach(function (q) { questions.push(q); });
    c.flashcards.forEach(function (f) { flashcards.push(f); });
    c.exam.forEach(function (e) { exam.push(e); });
  });
  index('topic', topics); index('question', questions); index('flashcard', flashcards); index('exam', exam);
  index('glossary', S.glossary); index('acronym', S.acronyms); index('concept', S.concepts); index('mode', S.modes); index('product', S.products);
  index('case', S.cases); index('diagram', S.diagrams); index('comparison', S.comparisons.pairs);
  idx.chapter = D.chapters; idx.finderResult = S.modeFinder.results;
  var conceptByTag = {}; S.concepts.forEach(function (c) { (c.tags || []).forEach(function (t) { conceptByTag[t] = conceptByTag[t] || c; }); conceptByTag[c.id] = conceptByTag[c.id] || c; });

  /* ---------- relationship graph: stored triples + relations implied by record fields ---------- */
  function link(ft, fid, tt, tid) {
    if (!fid || !tid) return;
    (adj[ft + ':' + fid] = adj[ft + ':' + fid] || {})[tt] = (adj[ft + ':' + fid] || {})[tt] || [];
    var a = adj[ft + ':' + fid][tt]; if (a.indexOf(tid) < 0) a.push(tid);
    (adj[tt + ':' + tid] = adj[tt + ':' + tid] || {})[ft] = (adj[tt + ':' + tid] || {})[ft] || [];
    var b = adj[tt + ':' + tid][ft]; if (b.indexOf(fid) < 0) b.push(fid);
  }
  S.graph.forEach(function (e) { link(e[0], e[1], e[3], e[4]); });
  questions.forEach(function (q) { link('question', q.id, 'topic', q.topicId); });
  flashcards.forEach(function (f) { link('flashcard', f.id, 'topic', f.topicId); });
  exam.forEach(function (e) { link('exam', e.id, 'topic', e.topicId); });
  S.glossary.forEach(function (g) { link('glossary', g.id, 'topic', g.topicId); });
  topics.forEach(function (t) { link('chapter', String(t.chapter), 'topic', t.id); });
  /* questions/flashcards/cases inherit the modes of their topic's concepts so a Mode page can list them */
  S.modes.forEach(function (m) { if (m.conceptId) link('mode', m.id, 'concept', m.conceptId); });

  /* A second-source section may span several canonical topics; its notes hang on the first (primary) one.
     coveredBy(topicId) tells the other topics where to find them. */
  var covered = {};
  topics.forEach(function (t) { (t.supplements || []).forEach(function (sp) { (sp.covers || []).forEach(function (c) { if (c !== t.id) (covered[c] = covered[c] || []).push({ primary: t.id, supplement: sp }); }); }); });

  var routes = {
    topic: function (id) { return '/topic/' + id; }, chapter: function (id) { return '/chapter/' + id; }, concept: function (id) { return '/concept/' + id; },
    question: function (id) { return '/quiz/run?retry=' + id; }, flashcard: function (id) { var f = idx.flashcard[id]; return '/flashcards/review?topics=' + (f ? f.topicId : ''); },
    case: function (id) { return '/case/' + id; }, comparison: function (id) { return '/compare?id=' + id; }, diagram: function (id) { return '/diagram/' + id; },
    product: function (id) { return '/product/' + id; }, mode: function (id) { return '/mode/' + id; }, glossary: function (id) { return '/glossary?term=' + encodeURIComponent(id); },
    term: function (id) { return '/glossary?term=' + encodeURIComponent(id); }, acronym: function (id) { return '/glossary?tab=acronyms&q=' + encodeURIComponent(id); },
    exam: function (id) { return '/exam/trainer?id=' + id; }, numerical: function (id) { return '/numericals?p=' + id; }, calculator: function (id) { return '/tools?tool=' + id; },
    finderResult: function () { return '/finder'; }
  };
  var TYPE_LABEL = { chapter: 'Chapter', topic: 'Topic', definition: 'Definition', glossary: 'Glossary', acronym: 'Acronym', flashcard: 'Flashcard', question: 'Question', comparison: 'Comparison', case: 'Case study', concept: 'Concept', diagram: 'Transaction diagram', mode: 'Financing mode', product: 'Product', numerical: 'Numerical', calculator: 'Calculator', exam: 'Exam prompt', source: 'Source' };

  var A = S.aliases;
  IFL.data = {
    sets: S, typeLabel: function (t) { return TYPE_LABEL[t] || t; }, typeLabels: TYPE_LABEL,
    get: function (type, id) { return (idx[type] || {})[id] || null; },
    all: function (type) { return list[type] || []; },
    topic: function (id) { return idx.topic[id]; }, topics: topics, chapter: function (n) { return D.chapters[n]; }, chapterNums: chapterNums,
    question: function (id) { return idx.question[id]; }, questions: questions, flashcard: function (id) { return idx.flashcard[id]; }, flashcards: flashcards,
    exam: exam, glossary: S.glossary, acronyms: S.acronyms, concepts: S.concepts, conceptEdges: S.conceptEdges, conceptByTag: function (t) { return conceptByTag[t]; },
    modes: S.modes, mode: function (id) { return idx.mode[id]; }, products: S.products, product: function (id) { return idx.product[id]; },
    cases: S.cases, caseStudy: function (id) { return idx.case[id]; }, diagrams: S.diagrams, diagram: function (id) { return idx.diagram[id]; },
    comparisons: S.comparisons.pairs, compareAspects: S.comparisons.aspects, finder: S.modeFinder, plans: S.studyPlans, bookIndex: S.bookIndex, aliases: A,
    route: function (type, id) { return routes[type] ? routes[type](id) : '/'; },
    /* Map an id from either source application (or a previously stored id) to the canonical id(s). */
    coveredBy: function (id) { return covered[id] || []; },
    canonicalTopics: function (id) { if (idx.topic[id]) return [id]; return (A.topics[id] || []).slice(); },
    canonicalQuestion: function (id) { return idx.question[id] ? id : (A.questions[id] || null); },
    canonicalFlashcard: function (id) { return idx.flashcard[id] ? id : (A.flashcards[id] || null); },
    canonicalConcept: function (id) { return idx.concept[id] ? id : (A.concepts[id] || null); },
    canonicalComparison: function (id) { return idx.comparison[id] ? id : (A.comparisons[id] || null); },
    canonicalPlan: function (id) { return S.studyPlans[id] ? id : (A.studyPlans[id] || null); },
    /* Relationship graph: everything linked to a record, grouped by type. */
    addRelation: function (ft, fid, tt, tid) { link(ft, fid, tt, tid); },
    related: function (type, id) { return adj[type + ':' + id] || {}; },
    relatedIds: function (type, id, target) { return (adj[type + ':' + id] || {})[target] || []; },
    relatedCount: function (type, id) { var r = adj[type + ':' + id] || {}, n = 0; Object.keys(r).forEach(function (k) { n += r[k].length; }); return n; },
    /* Concepts, modes etc. that share a topic with the record (used for "you may also need" lists). */
    viaTopics: function (type, id, target) {
      var out = [], seen = {};
      IFL.data.relatedIds(type, id, 'topic').forEach(function (t) { IFL.data.relatedIds('topic', t, target).forEach(function (x) { if (!seen[x]) { seen[x] = 1; out.push(x); } }); });
      return out;
    },
    labelOf: function (type, id) {
      var r = idx[type] && idx[type][id]; if (!r) return String(id);
      return r.title || r.name || r.term || r.acronym || r.front || r.prompt || String(id);
    }
  };
})();
