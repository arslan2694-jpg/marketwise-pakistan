
/* Local full-text search across all course content. The index is built in memory on first use. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var index = null, building = null;
  var TYPE_LABEL = { chapter: 'Chapter', topic: 'Topic', companion: 'Companion notes', glossary: 'Glossary', acronym: 'Acronym', flashcard: 'Flashcard', question: 'Question', exam: 'Exam question', comparison: 'Comparison', case: 'Case study', concept: 'Concept', diagram: 'Diagram', calculation: 'Calculation', decision: 'Decision tool', plan: 'Study plan' };

  function build() {
    if (index) return Promise.resolve(index);
    if (building) return building;
    building = Promise.all([window.IFL_DATA.loadAllChapters(), window.IFL_DATA.load(['glossary', 'acronyms', 'concepts', 'conceptGraph', 'comparisons', 'cases', 'diagrams', 'modeFinder', 'decisionTree', 'studyPlans']), IFL.glossaryIndex()]).then(function (r) {
      var chs = r[0], S = r[1], gloss = r[2], docs = [];
      function add(type, title, text, route, topic, extra) { docs.push({ type: type, title: title, text: text || '', route: route, topic: topic, nt: u.fold(title), nx: u.fold(text || ''), extra: extra }); }
      chs.forEach(function (ch) {
        add('chapter', 'Chapter ' + ch.number + ': ' + ch.title, [ch.overview, ch.companion && ch.companion.summary, ch.companion && ch.companion.why].join(' '), '/chapter/' + ch.number, ch.topics[0].id);
        ch.topics.forEach(function (t) {
          add('topic', '§' + t.section + ' ' + t.title, [t.simple, t.exam, (t.keyPoints || []).join(' '), (t.academic || []).join(' ')].join(' '), '/topic/' + t.id, t.id);
          (t.companions || []).forEach(function (c) {
            add('companion', '§' + t.section + ' ' + c.title, [c.overview, c.simple, c.academic, c.exam, (c.keyPoints || []).join(' '), (c.conditions || []).join(' '), (c.principles || []).join(' '), (c.steps || []).join(' '), (c.distinctions || []).join(' '), (c.confusions || []).join(' '), (c.related || []).join(' ')].join(' '), '/topic/' + t.id, t.id);
          });
          if (t.calc) add('calculation', 'Calculation — §' + t.section + ' ' + t.title, (t.calc.note || '') + ' ' + t.calc.type + ' calculator worked example', '/topic/' + t.id, t.id);
        });
        ch.flashcards.forEach(function (f) { add('flashcard', f.front, f.back, '/flashcards/review?topics=' + f.topic, f.topic); });
        ch.questions.forEach(function (q) { add('question', q.q, (q.explanation || '') + ' ' + (q.options || []).join(' ') + ' ' + (q.topicLabel || ''), '/quiz/run?retry=' + q.id, q.topic); });
        ch.exam.forEach(function (e) { add('exam', e.q, (e.keyConcepts || []).join(' ') + ' ' + (e.points || []).join(' '), '/exam/trainer?id=' + e.id, e.topic); });
      });
      /* canonical glossary: chapter and companion definitions are folded into their term, so aliases never produce duplicates */
      gloss.forEach(function (g) {
        add('glossary', g.term, [g.altList.join(' '), g.simple, g.more2.map(function (m) { return m.def; }).join(' '), g.more.map(function (m) { return m.def; }).join(' '), g.academic.map(function (a) { return a.meaning; }).join(' ')].join(' '), '/glossary?term=' + encodeURIComponent(g.id), g.topics[0], { page: g.page });
      });
      S.acronyms.forEach(function (a) { add('acronym', a.acronym + ' — ' + a.expansion, a.expansion, '/glossary?tab=acronyms&q=' + encodeURIComponent(a.acronym), null); });
      S.concepts.forEach(function (c) { add('concept', c.name, c.oneLine + ' ' + c.points.join(' ') + ' ' + c.distinction, '/concept/' + c.id, c.topics[0]); });
      S.conceptGraph.nodes.filter(function (n) { return !n.concept; }).forEach(function (n) { add('concept', n.label, 'Concept-map node (' + n.group + ')', '/concepts?focus=' + n.id, n.topic); });
      S.comparisons.pairs.forEach(function (p) { add('comparison', p.title, (p.summary || '') + ' ' + p.rows.map(function (r) { return r.join(' '); }).join(' '), '/compare?id=' + p.id, p.topic); });
      S.cases.forEach(function (c) { add('case', c.title, [c.scenario, c.analysis, c.answer, c.concept].join(' '), '/case/' + c.id, c.topic); });
      S.diagrams.forEach(function (d) { add('diagram', d.title, d.summary + ' ' + d.steps.map(function (s) { return s.label + ' ' + s.detail; }).join(' '), '/diagram/' + d.id, d.topic); });
      Object.keys(S.modeFinder.nodes).forEach(function (k) { var n = S.modeFinder.nodes[k]; add('decision', n.q, n.options.map(function (o) { return o.label; }).join(' '), '/finder', null); });
      Object.keys(S.modeFinder.results).forEach(function (k) { var x = S.modeFinder.results[k]; add('decision', x.title, x.why + ' ' + (x.cautions || []).join(' '), '/finder', (x.topics || [])[0]); });
      Object.keys(S.decisionTree.questions).forEach(function (k) { var n = S.decisionTree.questions[k]; add('decision', n.prompt, n.options.map(function (o) { return o.label; }).join(' '), '/finder?tool=tree&node=' + k, null); });
      Object.keys(S.decisionTree.results).forEach(function (k) { var x = S.decisionTree.results[k]; add('decision', (x.modes || []).join(', '), [x.whyRelevant, x.basicStructure, (x.keyConditions || []).join(' '), (x.majorRisks || []).join(' ')].join(' '), '/finder?tool=tree&node=' + k, null); });
      Object.keys(S.studyPlans).forEach(function (k) { var p = S.studyPlans[k]; add('plan', p.title, p.intro + ' ' + p.segments.map(function (sg) { return sg.title + ' ' + (sg.overview || ''); }).join(' '), '/guided/' + k, null); });
      index = docs; return docs;
    });
    return building;
  }
  IFL.searchIndex = build;
  /* Ranked results for a query (used by the results page and the live dropdown). */
  IFL.searchDocs = function (q, limit) { return build().then(function (docs) { var r = search(docs, q); return { total: r.length, items: r.slice(0, limit || 8).map(function (x) { return x.d; }) }; }); };
  IFL.searchTypeLabel = function (t) { return TYPE_LABEL[t] || t; };

  function search(docs, q) {
    var terms = u.fold(q).split(/\s+/).filter(function (w) { return w.length > 1; });
    if (!terms.length) return [];
    var phrase = u.fold(q).trim();
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
      if (d.type === 'glossary' || d.type === 'definition' || d.type === 'concept') s += 1.5;
      out.push({ d: d, s: s });
    });
    return out.sort(function (a, b) { return b.s - a.s; });
  }
  function snippet(text, q) {
    var nt = u.norm(text), t = u.norm(q).split(/\s+/)[0] || '', i = t ? nt.indexOf(t) : -1;
    var start = Math.max(0, i - 70), s = text.slice(start, start + 220);
    return (start > 0 ? '…' : '') + s + (start + 220 < text.length ? '…' : '');
  }
  IFL.route('/search', function (ctx) {
    var q = ctx.query.q || '', type = ctx.query.type || '';
    var inp = document.getElementById('search-input'); if (inp && inp.value !== q) inp.value = q;
    return build().then(function (docs) {
      var t0 = performance.now(), res = search(docs, q), ms = Math.round(performance.now() - t0);
      var counts = {}; res.forEach(function (r) { counts[r.d.type] = (counts[r.d.type] || 0) + 1; });
      var shown = res.filter(function (r) { return !type || r.d.type === type; }).slice(0, 80);
      var head = C.pageHead({ eyebrow: 'Search', title: q ? 'Results for “' + q + '”' : 'Search', desc: q ? res.length + ' results in ' + ms + ' ms — searched chapters, topics, definitions, glossary, flashcards, questions, comparisons, cases, concepts and diagrams.' : 'Type in the search box above (shortcut: /).' });
      if (!q) return h('div', head);
      return h('div', head,
        h('div.row', { style: { marginBottom: '12px' } }, h('a.chip', { href: '#/search?q=' + encodeURIComponent(q), 'aria-current': (!type) ? 'true' : null }, 'All (' + res.length + ')'),
          Object.keys(TYPE_LABEL).filter(function (k) { return counts[k]; }).map(function (k) { return h('a.chip', { href: '#/search?q=' + encodeURIComponent(q) + '&type=' + k, 'aria-current': (type === k) ? 'true' : null }, TYPE_LABEL[k] + ' (' + counts[k] + ')'); })),
        shown.length ? h('div.card', shown.map(function (r) {
          var d = r.d, m = d.topic ? IFL.course.topic(d.topic) : null;
          return h('div.result', h('div.row', h('span.badge', TYPE_LABEL[d.type]), h('a.t', { href: '#' + d.route, html: u.highlight(d.title, q) })),
            h('div.ctx', { html: u.highlight(snippet(d.text, q), q) }),
            h('div.src', m ? 'Chapter ' + m.chapter + ' · ' + (m.section === 'Appendix' ? 'Appendix' : 'Section ' + m.section) + ' · ' + m.title + (m.pages ? ' · ' + C.pagesLabel(m.pages) : '') : '', d.extra && d.extra.page ? ' · Book glossary p. ' + d.extra.page : ''));
        })) : h('div.card', C.empty('No results', 'Try a different spelling — e.g. “Ijara”, “Musharaka”, “Istisna” all work without diacritics.')));
    });
  });
})();

