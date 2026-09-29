/* ONE global search over every content type: chapters, sections, topics (with extended notes),
   definitions, glossary, acronyms, concepts, financing modes, products, transaction diagrams,
   flashcards, questions, exam prompts, case studies, numericals, calculators, comparisons and
   book sections. The index is built in memory on first use. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var index = null;
  var ORDER = ['mode', 'concept', 'topic', 'definition', 'glossary', 'acronym', 'product', 'diagram', 'case', 'numerical', 'calculator', 'comparison', 'question', 'flashcard', 'exam', 'chapter', 'source'];
  var BOOST = { mode: 3, concept: 2.5, glossary: 2, definition: 1.5, acronym: 2, topic: 1, product: 1, diagram: 1, case: 0.5, comparison: 0.5 };

  function build() {
    if (index) return index;
    var D = IFL.data, docs = [];
    function add(type, title, text, route, topic, extra) { docs.push({ type: type, title: title, text: text || '', route: route, topic: topic, nt: u.norm(title), nx: u.norm(text || ''), extra: extra }); }
    D.chapterNums.forEach(function (n) {
      var ch = D.chapter(n);
      add('chapter', 'Chapter ' + n + ': ' + ch.title, [ch.overview, ch.why, ch.whyExpanded, ch.summary, ch.summaryExpanded, ch.learningObjectives.map(function (o) { return o.text; }).join(' '), ch.takeaways.join(' ')].join(' '), '/chapter/' + n, ch.topics[0].id);
      ch.topics.forEach(function (t) {
        var sup = (t.supplements || []).map(function (s) { return [s.title, s.overview, s.simpleExplanation, s.academicExplanation, s.examExplanation, (s.keyPoints || []).join(' '), (s.conditions || []).join(' '), (s.principles || []).join(' '), (s.processSteps || []).join(' '), (s.relatedConcepts || []).join(' ')].join(' '); }).join(' ');
        add('topic', '§' + t.section + ' ' + t.title, [t.simpleExplanation, t.examExplanation, (t.keyPoints || []).join(' '), (t.academicExplanation || []).join(' '), (t.conditions || []).join(' '), sup].join(' '), '/topic/' + t.id, t.id);
        (t.definitions || []).forEach(function (d) { add('definition', d.term, d.definition, '/topic/' + t.id, t.id); });
        (t.supplements || []).forEach(function (s) { (s.definitions || []).forEach(function (d) { add('definition', d.term, d.definition, '/topic/' + t.id, t.id, { ext: true }); }); });
      });
    });
    D.flashcards.forEach(function (f) { add('flashcard', f.front, f.back, '/flashcards/review?topics=' + f.topicId, f.topicId); });
    D.questions.forEach(function (q) { add('question', q.prompt, (q.explanation || '') + ' ' + (q.options || []).join(' ') + ' ' + (typeof q.correctAnswer === 'string' ? q.correctAnswer : ''), '/quiz/run?retry=' + q.id, q.topicId); });
    D.exam.forEach(function (e) { add('exam', e.prompt, [(e.expectedStructure || []).join(' '), (e.keyConcepts || []).join(' '), (e.essentialPoints || []).join(' ')].join(' '), '/exam/trainer?id=' + e.id, e.topicId); });
    D.glossary.forEach(function (g) { add('glossary', g.term, [g.definition, g.extendedDefinition, (g.aliases || []).join(' '), (g.relatedTerms || []).join(' ')].join(' '), '/glossary?term=' + encodeURIComponent(g.id), g.topicId, { page: g.glossaryPage }); });
    D.acronyms.forEach(function (a) { add('acronym', a.acronym, a.expansion, '/glossary?tab=acronyms&q=' + encodeURIComponent(a.acronym), null); });
    D.concepts.forEach(function (c) { add('concept', c.name, [c.oneLine, (c.points || []).join(' '), c.distinction, (c.altNames || []).join(' '), (c.aliases || []).join(' ')].join(' '), '/concept/' + c.id, (c.topicIds || [])[0]); });
    D.modes.forEach(function (m) { add('mode', m.name, [m.category, m.shariahBasis, m.subjectMatter, m.ownershipRiskTiming, m.commonUse, m.distinguishingFeature, (m.keyConditions || []).join(' '), (m.majorRisks || []).join(' ')].join(' '), '/mode/' + m.id, m.topicId); });
    D.products.forEach(function (p) { add('product', p.name, [p.need, p.category, p.how.join(' '), p.controls.join(' '), p.conventional.name, p.contracts.map(function (c) { return D.get('concept', c) ? D.get('concept', c).name : c; }).join(' ')].join(' '), '/product/' + p.id, p.topicIds[0]); });
    D.diagrams.forEach(function (d) { add('diagram', d.title, d.summary + ' ' + d.steps.map(function (s) { return s.label + ' ' + s.detail; }).join(' ') + ' ' + d.rules.join(' ') + ' ' + d.pitfalls.join(' '), '/diagram/' + d.id, d.topicId); });
    D.comparisons.forEach(function (p) { add('comparison', p.title, [p.summary, p.rows.map(function (r) { return r.join(' '); }).join(' ')].join(' '), '/compare?id=' + p.id, p.topicId); });
    D.cases.forEach(function (c) { add('case', c.title, [c.scenario, c.analysis, c.answer, c.explanation, c.conceptLabel, (c.takeaways || []).join(' '), c.examTakeaway].join(' '), '/case/' + c.id, c.topicId); });
    Object.keys(IFL.numericalDefs || {}).forEach(function (id) { var g = IFL.numericalDefs[id]; add('numerical', g.title, g.cat + ' ' + g.source, '/numericals?p=' + id, g.topic); });
    Object.keys(IFL.calcTypes || {}).forEach(function (id) { var c = IFL.calcTypes[id]; add('calculator', c.title, c.source + ' ' + (c.formula || ''), '/tools?tool=' + id, c.topic); });
    var bi = D.bookIndex;
    bi.chapters.forEach(function (c) {
      c.sections.forEach(function (s) { add('source', 'Section ' + s.sectionNumber + ' ' + s.title, 'Chapter ' + c.chapterNumber + ' ' + c.title + ' printed page ' + s.page, '/sources?chapter=' + c.chapterNumber, null, { page: s.page }); });
    });
    index = docs; return docs;
  }
  IFL.searchIndex = function () { return Promise.resolve(build()); };
  IFL.searchTypes = ORDER;

  function search(docs, q) {
    var terms = u.norm(q).split(/\s+/).filter(function (w) { return w.length > 1; });
    if (!terms.length) return [];
    var phrase = u.norm(q).trim();
    var out = [];
    docs.forEach(function (d) {
      var s = 0, all = true;
      terms.forEach(function (t) {
        var inT = d.nt.indexOf(t) > -1, inX = d.nx.indexOf(t) > -1;
        if (!inT && !inX) all = false;
        if (inT) s += 6; if (inX) s += 1 + Math.min(3, d.nx.split(t).length - 1) * 0.5;
      });
      if (!all) return;
      if (d.nt.indexOf(phrase) > -1) s += 8;
      if (d.nt === phrase || d.nt.replace(/^§[\d.a-z]+ /, '') === phrase) s += 10;
      s += BOOST[d.type] || 0;
      out.push({ d: d, s: s });
    });
    return out.sort(function (a, b) { return b.s - a.s; });
  }
  IFL.searchQuery = function (q, limit) { var r = search(build(), q); return limit ? r.slice(0, limit) : r; };
  function snippet(text, q) {
    var nt = u.norm(text), t = u.norm(q).split(/\s+/)[0] || '', i = t ? nt.indexOf(t) : -1;
    var start = Math.max(0, i - 70), s = text.slice(start, start + 220);
    return (start > 0 ? '…' : '') + s + (start + 220 < text.length ? '…' : '');
  }

  /* An exact match on a concept or financing mode opens an "explore" card: every connected content type in one place. */
  function hubFor(q) {
    var nq = u.norm(q).trim(); if (!nq) return null;
    var D = IFL.data, hit = null;
    D.modes.forEach(function (m) { if (!hit && u.norm(m.name) === nq) hit = { type: 'mode', id: m.id, name: m.name }; });
    if (!hit) D.concepts.forEach(function (c) { if (!hit && (u.norm(c.name) === nq || (c.tags || []).some(function (t) { return u.norm(t) === nq; }) || (c.altNames || []).some(function (t) { return u.norm(t) === nq; }))) hit = { type: 'concept', id: c.id, name: c.name }; });
    return hit;
  }

  IFL.route('/search', function (ctx) {
    var q = ctx.query.q || '', type = ctx.query.type || '';
    var inp = document.getElementById('search-input'); if (inp && inp.value !== q) inp.value = q;
    return IFL.searchIndex().then(function (docs) {
      var t0 = performance.now(), res = search(docs, q), ms = Math.round(performance.now() - t0);
      var counts = {}; res.forEach(function (r) { counts[r.d.type] = (counts[r.d.type] || 0) + 1; });
      var shown = res.filter(function (r) { return !type || r.d.type === type; }).slice(0, 100);
      var head = C.pageHead({ eyebrow: 'Search', title: q ? 'Results for “' + q + '”' : 'Search', desc: q ? res.length + ' results in ' + ms + ' ms across ' + Object.keys(counts).length + ' content types.' : 'Type in the search box above (shortcut: /). One search covers chapters, topics, definitions, glossary, acronyms, concepts, financing modes, products, diagrams, cases, numericals, calculators, comparisons, questions, flashcards and exam material.' });
      if (!q) return h('div', head);
      var hit = hubFor(q), hub = null;
      if (hit) {
        var p = C.relatedPanel(hit.type, hit.id, { limit: 12 });
        hub = h('section.card', h('div.row.between', h('div', h('div.eyebrow', hit.type === 'mode' ? 'Financing mode' : 'Concept'), h('h2', { style: { margin: 0 } }, hit.name)), h('a.btn.primary', { href: '#' + IFL.data.route(hit.type, hit.id) }, 'Open ' + hit.name)), p ? p : null);
      }
      return h('div', head, hub,
        h('div.row', { style: { margin: '12px 0' } }, h('a.chip', { href: '#/search?q=' + encodeURIComponent(q), 'aria-pressed': String(!type) }, 'All (' + res.length + ')'),
          ORDER.filter(function (k) { return counts[k]; }).map(function (k) { return h('a.chip', { href: '#/search?q=' + encodeURIComponent(q) + '&type=' + k, 'aria-pressed': String(type === k) }, IFL.data.typeLabel(k) + ' (' + counts[k] + ')'); })),
        shown.length ? h('div.card', shown.map(function (r) {
          var d = r.d, m = d.topic ? IFL.course.topic(d.topic) : null;
          return h('div.result', h('div.row', h('span.badge', IFL.data.typeLabel(d.type)), d.extra && d.extra.ext ? h('span.badge', 'extended notes') : null, h('a.t', { href: '#' + d.route, html: u.highlight(d.title, q) })),
            h('div.ctx', { html: u.highlight(snippet(d.text, q), q) }),
            h('div.src', m ? 'Chapter ' + m.chapter + ' · ' + (m.section === 'Appendix' ? 'Appendix' : 'Section ' + m.section) + ' · ' + m.title + (m.pages ? ' · ' + C.pagesLabel(m.pages) : '') : '', d.extra && d.extra.page && d.type === 'glossary' ? ' · Book glossary p. ' + d.extra.page : d.extra && d.extra.page ? ' · printed p. ' + d.extra.page : ''));
        })) : h('div.card', C.empty('No results', 'Try a different spelling — e.g. “Ijara”, “Musharaka”, “Istisna” all work without diacritics.')));
    });
  });
})();
