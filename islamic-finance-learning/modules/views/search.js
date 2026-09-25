/* Local full-text search across all course content. The index is built in memory on first use. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var index = null, building = null;
  var TYPE_LABEL = { chapter: 'Chapter', topic: 'Topic', definition: 'Definition', glossary: 'Glossary', flashcard: 'Flashcard', question: 'Question', comparison: 'Comparison', case: 'Case study', concept: 'Concept', diagram: 'Diagram' };

  function build() {
    if (index) return Promise.resolve(index);
    if (building) return building;
    building = Promise.all([window.IFL_DATA.loadAllChapters(), window.IFL_DATA.load(['glossary', 'concepts', 'comparisons', 'cases', 'diagrams'])]).then(function (r) {
      var chs = r[0], S = r[1], docs = [];
      function add(type, title, text, route, topic, extra) { docs.push({ type: type, title: title, text: text || '', route: route, topic: topic, nt: u.norm(title), nx: u.norm(text || ''), extra: extra }); }
      chs.forEach(function (ch) {
        add('chapter', 'Chapter ' + ch.number + ': ' + ch.title, ch.overview, '/chapter/' + ch.number, ch.topics[0].id);
        ch.topics.forEach(function (t) {
          add('topic', '§' + t.section + ' ' + t.title, [t.simple, t.exam, (t.keyPoints || []).join(' '), (t.academic || []).join(' ')].join(' '), '/topic/' + t.id, t.id);
          (t.definitions || []).forEach(function (d) { add('definition', d.term, d.meaning, '/topic/' + t.id, t.id); });
        });
        ch.flashcards.forEach(function (f) { add('flashcard', f.front, f.back, '/flashcards/review?topics=' + f.topic, f.topic); });
        ch.questions.forEach(function (q) { add('question', q.q, (q.explanation || '') + ' ' + (q.options || []).join(' '), '/quiz/run?retry=' + q.id, q.topic); });
      });
      S.glossary.forEach(function (g) { add('glossary', g.term, g.def, '/glossary?term=' + encodeURIComponent('g-' + u.norm(g.term.split(/\s*[\/(]/)[0]).replace(/[^a-z0-9 ]/g, ' ').replace(/\b(al|ul|bil|bi|wal|e)\b/g, ' ').replace(/\s+/g, ' ').trim().replace(/ /g, '-')), g.topic, { page: g.page }); });
      S.concepts.forEach(function (c) { add('concept', c.name, c.oneLine + ' ' + c.points.join(' ') + ' ' + c.distinction, '/concept/' + c.id, c.topics[0]); });
      S.comparisons.pairs.forEach(function (p) { add('comparison', p.title, p.rows.map(function (r) { return r.join(' '); }).join(' '), '/compare?id=' + p.id, p.topic); });
      S.cases.forEach(function (c) { add('case', c.title, c.scenario + ' ' + c.analysis, '/case/' + c.id, c.topic); });
      S.diagrams.forEach(function (d) { add('diagram', d.title, d.summary + ' ' + d.steps.map(function (s) { return s.label + ' ' + s.detail; }).join(' '), '/diagram/' + d.id, d.topic); });
      index = docs; return docs;
    });
    return building;
  }
  IFL.searchIndex = build;

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
        h('div.row', { style: { marginBottom: '12px' } }, h('a.chip', { href: '#/search?q=' + encodeURIComponent(q), 'aria-pressed': String(!type) }, 'All (' + res.length + ')'),
          Object.keys(TYPE_LABEL).filter(function (k) { return counts[k]; }).map(function (k) { return h('a.chip', { href: '#/search?q=' + encodeURIComponent(q) + '&type=' + k, 'aria-pressed': String(type === k) }, TYPE_LABEL[k] + ' (' + counts[k] + ')'); })),
        shown.length ? h('div.card', shown.map(function (r) {
          var d = r.d, m = d.topic ? IFL.course.topic(d.topic) : null;
          return h('div.result', h('div.row', h('span.badge', TYPE_LABEL[d.type]), h('a.t', { href: '#' + d.route, html: u.highlight(d.title, q) })),
            h('div.ctx', { html: u.highlight(snippet(d.text, q), q) }),
            h('div.src', m ? 'Chapter ' + m.chapter + ' · ' + (m.section === 'Appendix' ? 'Appendix' : 'Section ' + m.section) + ' · ' + m.title + (m.pages ? ' · ' + C.pagesLabel(m.pages) : '') : '', d.extra && d.extra.page ? ' · Book glossary p. ' + d.extra.page : ''));
        })) : h('div.card', C.empty('No results', 'Try a different spelling — e.g. “Ijara”, “Musharaka”, “Istisna” all work without diacritics.')));
    });
  });
})();
