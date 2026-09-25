/* Bookmarks, notes and the detailed progress page. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var TYPES = { topic: 'Topics', chapter: 'Chapters', concept: 'Concepts', term: 'Glossary terms', question: 'Questions', flashcard: 'Flashcards', comparison: 'Comparisons', diagram: 'Diagrams', case: 'Cases', exam: 'Exam questions' };

  IFL.route('/bookmarks', function (ctx) {
    var type = ctx.query.type || '';
    var list = h('div.card');
    function draw() {
      var bms = IFL.store.state.bookmarks.filter(function (b) { return !type || b.type === type; });
      list.innerHTML = '';
      if (!bms.length) { list.appendChild(C.empty('No bookmarks' + (type ? ' of this type' : ''), 'Bookmark topics, definitions, concepts, questions, comparisons and diagrams with the bookmark button.')); return; }
      list.appendChild(h('ul.list', bms.map(function (b) {
        return h('li.row', h('span.badge', (TYPES[b.type] || b.type).replace(/s$/, '')), h('a', { href: '#' + b.route, style: { flex: 1 } }, b.label), h('span.small.muted', u.ago(b.ts)),
          h('button.btn.sm.ghost', { type: 'button', 'aria-label': 'Remove bookmark ' + b.label, onclick: function () { IFL.progress.toggleBookmark(b); draw(); } }, u.svg('x')));
      })));
    }
    draw();
    var counts = {}; IFL.store.state.bookmarks.forEach(function (b) { counts[b.type] = (counts[b.type] || 0) + 1; });
    return h('div', C.pageHead({ eyebrow: 'Personal', title: 'My bookmarks', desc: 'Saved on this device only.' }),
      h('div.row', { style: { marginBottom: '14px' } }, h('a.chip', { href: '#/bookmarks', 'aria-pressed': String(!type) }, 'All (' + IFL.store.state.bookmarks.length + ')'),
        Object.keys(TYPES).filter(function (k) { return counts[k]; }).map(function (k) { return h('a.chip', { href: '#/bookmarks?type=' + k, 'aria-pressed': String(type === k) }, TYPES[k] + ' (' + counts[k] + ')'); })),
      list);
  });

  IFL.route('/notes', function (ctx) {
    var q = ctx.query.q || '';
    var input = h('input.input', { type: 'search', placeholder: 'Search notes…', value: q, 'aria-label': 'Search notes' });
    var list = h('div.stack');
    function draw() {
      var nq = u.norm(q);
      var notes = IFL.store.state.notes.filter(function (n) { return !nq || u.norm(n.text + ' ' + n.target.label).indexOf(nq) > -1; });
      list.innerHTML = '';
      if (!notes.length) { list.appendChild(h('div.card', C.empty(q ? 'No matching notes' : 'No notes yet', 'Add notes from any chapter, topic, concept, flashcard or question using the Notes button.'))); return; }
      notes.forEach(function (n) {
        var body = h('p', { style: { whiteSpace: 'pre-wrap', margin: '6px 0' } }, n.text);
        list.appendChild(h('div.card',
          h('div.row.between', h('div.row', h('span.badge', (TYPES[n.target.type] || n.target.type).replace(/s$/, '')), h('a', { href: '#' + n.target.route }, n.target.label)), h('span.small.muted', 'Created ' + new Date(n.created).toLocaleString() + (n.updated !== n.created ? ' · edited ' + u.ago(n.updated) : ''))),
          body,
          h('div.row', h('button.btn.sm', { type: 'button', onclick: function () { C.notesDialog(n.target); } }, u.svg('edit'), 'Edit'),
            h('button.btn.sm.danger', { type: 'button', onclick: function () { u.confirm('Delete note?', 'This note will be permanently removed.', 'Delete', true).then(function (ok) { if (ok) { IFL.progress.deleteNote(n.id); draw(); } }); } }, u.svg('trash'), 'Delete'))));
      });
    }
    input.addEventListener('input', u.debounce(function () { q = input.value.trim(); draw(); }, 150));
    draw();
    return h('div', C.pageHead({ eyebrow: 'Personal', title: 'My notes', desc: 'All your notes with timestamps. Stored locally; include them in an export to back them up.' }), h('div', { style: { marginBottom: '14px' } }, input), list);
  });

  IFL.route('/progress', function () {
    var P = IFL.progress, s = IFL.store.state, o = P.overall();
    var days = P.lastDays(28), max = Math.max.apply(null, days.map(function (d) { return d.sec; }).concat([60]));
    var NS = 'http://www.w3.org/2000/svg';
    var chart = document.createElementNS(NS, 'svg'); chart.setAttribute('viewBox', '0 0 560 140'); chart.setAttribute('class', 'chart-svg'); chart.setAttribute('role', 'img'); chart.setAttribute('aria-label', 'Minutes studied per day, last 28 days'); chart.style.width = '100%'; chart.style.height = 'auto';
    days.forEach(function (d, i) {
      var hh = Math.round(110 * d.sec / max), r = document.createElementNS(NS, 'rect');
      r.setAttribute('x', 6 + i * 20); r.setAttribute('y', 120 - hh); r.setAttribute('width', 14); r.setAttribute('height', Math.max(1, hh)); r.setAttribute('rx', 3);
      r.setAttribute('fill', d.sec ? 'var(--accent)' : 'var(--border)');
      var t = document.createElementNS(NS, 'title'); t.textContent = d.key + ': ' + u.fmtDuration(d.sec); r.appendChild(t); chart.appendChild(r);
      if (i % 7 === 0) { var tx = document.createElementNS(NS, 'text'); tx.setAttribute('x', 6 + i * 20); tx.setAttribute('y', 136); tx.setAttribute('font-size', 10); tx.setAttribute('fill', 'var(--text-3)'); tx.textContent = d.key.slice(5); chart.appendChild(tx); }
    });
    var cardsReviewed = s.reviews.length, cardsLearned = Object.keys(s.cards).length;
    var ach = P.achievements.map(function (a) { var got = s.achievements[a.id]; return h('li.row', h('span.badge.' + (got ? 'ok' : ''), got ? '✓' : '○'), h('span', { style: { flex: 1, color: got ? 'var(--text)' : 'var(--text-3)' } }, a.title), got ? h('span.small.muted', new Date(got).toLocaleDateString()) : null); });
    return h('div', C.pageHead({ eyebrow: 'Personal', title: 'My progress', desc: 'A chapter counts as complete only when every topic in it is marked complete. Nothing here is estimated.' }),
      h('div.grid.grid-4', h('div.card', C.stat(o.pct + '%', 'Course complete')), h('div.card', C.stat(o.done + '/' + o.total, 'Topics complete')), h('div.card', C.stat(P.quizAverage() == null ? '—' : P.quizAverage() + '%', 'Quiz average')), h('div.card', C.stat(u.fmtDuration(P.studySeconds()), 'Study time'))),
      h('div.grid.grid-2', { style: { marginTop: '16px' } },
        h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Chapters'),
          h('div.stack', IFL.course.chapters.map(function (c) { var cp = P.chapterProgress(c.n); return h('div', h('div.row.between.small', h('a', { href: '#/chapter/' + c.n }, c.n + '. ' + IFL.trunc(c.title, 46)), h('span.tabular.muted', cp.done + '/' + cp.total)), C.bar(cp.pct, 'thin')); }))),
        h('div.stack',
          h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Study time — last 28 days'), chart, h('div.small.muted', 'Streak: ' + P.streak() + ' day(s). Time counts while the app is open and you are active.')),
          h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Practice'),
            h('dl.kv', h('dt', 'Quizzes taken'), h('dd', String(s.attempts.length)), h('dt', 'Questions answered'), h('dd', String(Object.keys(s.answers).reduce(function (a, k) { return a + s.answers[k].n; }, 0))),
              h('dt', 'Flashcard reviews'), h('dd', String(cardsReviewed)), h('dt', 'Cards in schedule'), h('dd', String(cardsLearned)), h('dt', 'Due now'), h('dd', String(IFL.srs.dueCount())),
              h('dt', 'Timer sessions'), h('dd', String(s.timerSessions.length)), h('dt', 'Notes / bookmarks'), h('dd', s.notes.length + ' / ' + s.bookmarks.length))),
          h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Achievements'), h('ul.list', ach)))),
      h('section.card', { style: { marginTop: '16px' } }, h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Quiz history'),
        s.attempts.length ? h('div.table-wrap', h('table', h('thead', h('tr', h('th', 'Quiz'), h('th', 'Score'), h('th', 'Date'))), h('tbody', s.attempts.slice(0, 40).map(function (a) { return h('tr', h('td', a.label), h('td.tabular', a.score + '/' + a.total), h('td', new Date(a.ts).toLocaleString())); })))) : h('p.muted.small', 'No quizzes yet.')));
  });
})();
