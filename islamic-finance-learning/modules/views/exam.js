/* Exam Preparation Center, Exam Answer Trainer and Rapid Revision Cards. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var KIND = { long: 'Long question', short: 'Short question', conceptual: 'Conceptual question', scenario: 'Scenario question', viva: 'Viva question', difference: 'Difference question' };

  function allExam() {
    return window.IFL_DATA.loadAllChapters().then(function (chs) {
      var ex = [], defs = [], diffs = [], mcq = [];
      chs.forEach(function (ch) {
        ch.exam.forEach(function (e) { ex.push(Object.assign({ chapter: ch.number }, e)); });
        ch.topics.forEach(function (t) {
          (t.definitions || []).forEach(function (d) { defs.push({ term: d.term, meaning: d.meaning, topic: t.id }); });
          (t.distinctions || []).forEach(function (d) { diffs.push(Object.assign({ topic: t.id }, d)); });
        });
        ch.questions.forEach(function (q) { if (q.type === 'mcq' || q.type === 'tf') mcq.push(q); });
      });
      return { exam: ex, defs: defs, diffs: diffs, mcq: mcq, chapters: chs };
    });
  }

  IFL.route('/exam', function (ctx) {
    return Promise.all([allExam(), window.IFL_DATA.load(['concepts', 'comparisons'])]).then(function (res) {
      var A = res[0], R = res[1], sec = ctx.query.s || 'overview', chF = ctx.query.chapter ? Number(ctx.query.chapter) : null;
      var tabs = [['overview', 'Overview'], ['definitions', 'Definitions'], ['short', 'Short'], ['long', 'Long'], ['conceptual', 'Conceptual'], ['difference', 'Difference'], ['scenario', 'Scenario'], ['mcq', 'MCQs'], ['viva', 'Viva'], ['rapid', 'Rapid revision'], ['core', 'Core concepts']];
      var bar = h('div.seg', { role: 'tablist', 'aria-label': 'Exam sections', style: { marginBottom: '16px' } }, tabs.map(function (t) { return h('button', { type: 'button', role: 'tab', 'aria-selected': String(t[0] === sec), 'aria-pressed': String(t[0] === sec), onclick: function () { IFL.go('/exam?s=' + t[0] + (chF ? '&chapter=' + chF : '')); } }, t[1]); }));
      var chSel = h('select.input', { 'aria-label': 'Filter by chapter', style: { maxWidth: '260px' } }, h('option', { value: '' }, 'All chapters'), IFL.course.chapters.map(function (c) { return h('option', { value: c.n, selected: c.n === chF }, 'Chapter ' + c.n + ' · ' + IFL.trunc(c.title, 30)); }));
      chSel.addEventListener('change', function () { IFL.go('/exam?s=' + sec + (chSel.value ? '&chapter=' + chSel.value : '')); });
      function inCh(tid) { if (!chF) return true; var m = IFL.course.topic(tid); return m && m.chapter === chF; }
      function examList(kind) {
        var items = A.exam.filter(function (e) { return e.kind === kind && (!chF || e.chapter === chF); });
        if (!items.length) return C.empty('No ' + (KIND[kind] || kind).toLowerCase() + 's for this filter');
        return h('div.stack', items.map(function (e) { return h('div.card', h('div.row.between', h('span.badge.accent', KIND[e.kind]), h('span.small.muted', IFL.course.sourceLabel(e.topic))), h('p', { style: { fontWeight: 600, margin: '8px 0' } }, e.q), h('a.btn.sm.primary', { href: '#/exam/trainer?id=' + e.id }, 'Practise with the answer trainer')); }));
      }
      var body;
      if (sec === 'overview') {
        var counts = {}; A.exam.forEach(function (e) { counts[e.kind] = (counts[e.kind] || 0) + 1; });
        body = h('div.stack',
          h('div.grid.grid-4', [['definitions', A.defs.length, 'Definitions'], ['short', counts.short || 0, 'Short questions'], ['long', counts.long || 0, 'Long questions'], ['conceptual', counts.conceptual || 0, 'Conceptual'], ['difference', A.diffs.length + R.comparisons.pairs.length + (counts.difference || 0), 'Difference questions'], ['scenario', counts.scenario || 0, 'Scenario questions'], ['mcq', A.mcq.length, 'MCQs'], ['viva', counts.viva || 0, 'Viva questions']].map(function (x) {
            return h('a.card.card-link', { href: '#/exam?s=' + x[0] }, C.stat(x[1], x[2]));
          })),
          h('div.grid.grid-3',
            h('a.card.card-link', { href: '#/exam/trainer' }, h('h3', u.svg('exam'), ' Exam answer trainer'), h('p.small.text-2', 'Attempt an answer first, then compare with the expected structure, key concepts and common mistakes.')),
            h('a.card.card-link', { href: '#/revision-cards' }, h('h3', u.svg('layers'), ' Rapid revision cards'), h('p.small.text-2', 'One-line definitions, three key points, a distinction and an exam trigger per concept.')),
            h('a.card.card-link', { href: '#/guided/revision90' }, h('h3', u.svg('clock'), ' 90-minute revision'), h('p.small.text-2', 'A guided pass through the whole syllabus with practice questions.'))),
          h('div.callout.info', h('div.t', 'About importance labels'), h('p', 'Topics are labelled as core, supporting, detailed or revision concepts — neutral categories describing their role in the chapter, not predictions of exam frequency.')));
      } else if (sec === 'definitions') {
        var ds = A.defs.filter(function (d) { return inCh(d.topic); });
        body = h('div.card', h('dl', ds.map(function (d) { return h('div.def', h('dt', d.term, ' ', h('a.small', { href: '#/topic/' + d.topic }, IFL.course.sourceLabel(d.topic))), h('dd', d.meaning)); })));
      } else if (sec === 'difference') {
        var dd = A.diffs.filter(function (d) { return inCh(d.topic); });
        var pp = R.comparisons.pairs.filter(function (p) { return inCh(p.topic); });
        var dx = A.exam.filter(function (e) { return e.kind === 'difference' && (!chF || e.chapter === chF); });
        body = h('div.stack', dx.length ? examList('difference') : null, h('div.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Difference questions — ask yourself “distinguish A from B”'),
          h('ul.list', dd.map(function (d) { return h('li', h('details', h('summary', h('strong', 'Distinguish ' + d.a + ' from ' + d.b)), h('p.small', { style: { marginTop: '6px' } }, d.text, ' ', h('a', { href: '#/topic/' + d.topic }, IFL.course.sourceLabel(d.topic))))); }))),
          pp.length ? h('div.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Comparison tables'), h('div.row', pp.map(function (p) { return h('a.chip', { href: '#/compare?id=' + p.id }, p.title); }))) : null);
      } else if (sec === 'mcq') {
        var items = A.mcq.filter(function (q) { return inCh(q.topic); });
        body = h('div.stack', h('div.row', h('a.btn.primary', { href: '#/quiz/run?types=mcq,tf&n=20' + (chF ? '&chapter=' + chF : '') }, 'Start a 20-question MCQ drill')), h('p.small.muted', items.length + ' MCQ and true/false questions available.'));
      } else if (sec === 'rapid') {
        body = h('div.stack', h('a.btn.primary', { href: '#/revision-cards' }, 'Open rapid revision cards'),
          h('div.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Exam-level summaries by chapter'),
            A.chapters.filter(function (c) { return !chF || c.number === chF; }).map(function (c) { return h('details.acc', h('summary', 'Chapter ' + c.number + ' · ' + c.title), h('div.acc-body', h('ol', c.takeaways.map(function (t) { return h('li', t); })))); })));
      } else if (sec === 'core') {
        var core = [];
        A.chapters.forEach(function (c) { c.topics.forEach(function (t) { if (t.tier === 'core' && (!chF || c.number === chF)) core.push({ t: t, c: c.number }); }); });
        body = h('div.card', h('p.small.muted', core.length + ' topics labelled “core concept” by their role in the chapter.'), h('div', core.map(function (x) { return h('div.def', h('dt', h('a', { href: '#/topic/' + x.t.id }, 'Ch ' + x.c + ' §' + x.t.section + ' ' + x.t.title)), h('dd', x.t.exam)); })));
      } else body = examList(sec);
      return h('div', C.pageHead({ eyebrow: 'Exam preparation', title: 'Exam Preparation Center', desc: 'Everything is drawn from the chapters: definitions, question banks with answer structures, differences, MCQs and revision summaries.', actions: [chSel] }), bar, body);
    });
  });

  /* ---------- Exam answer trainer ---------- */
  IFL.route('/exam/trainer', function (ctx) {
    return allExam().then(function (A) {
      var items = A.exam.filter(function (e) { return !ctx.query.chapter || e.chapter === Number(ctx.query.chapter); });
      var e = ctx.query.id ? A.exam.filter(function (x) { return x.id === ctx.query.id; })[0] : null;
      if (!e) {
        return h('div', C.pageHead({ eyebrow: 'Exam preparation', title: 'Exam answer trainer', desc: 'Choose a question, write your answer, then reveal the expected structure, key concepts, essential points and common mistakes.' }),
          h('div.card', h('ul.list', items.map(function (x) {
            var done = IFL.store.state.exam[x.id];
            return h('li', h('div.row', h('span.badge', KIND[x.kind] || x.kind), h('span.badge.info', 'Ch ' + x.chapter), done ? h('span.badge.ok', 'attempted') : null), h('a', { href: '#/exam/trainer?id=' + x.id, style: { display: 'block', marginTop: '4px' } }, x.q));
          }))));
      }
      var saved = IFL.store.state.exam[e.id] || {};
      var ta = h('textarea.input', { style: { minHeight: '220px' }, 'aria-label': 'Your answer', placeholder: 'Plan your answer: introduction, main points with textbook terms, examples, conclusion…' }, saved.text || '');
      var reveal = h('div');
      var wc = h('span.small.muted');
      function count() { var n = (ta.value.trim().match(/\S+/g) || []).length; wc.textContent = n + ' words'; }
      ta.addEventListener('input', u.debounce(function () { count(); IFL.store.update(function (s) { s.exam[e.id] = Object.assign(s.exam[e.id] || {}, { text: ta.value, ts: Date.now() }); }); }, 400));
      count();
      function show() {
        reveal.innerHTML = '';
        var text = u.norm(ta.value);
        var hits = e.keyConcepts.filter(function (k) { return text.indexOf(u.norm(k)) > -1; });
        u.append(reveal, [h('div.grid.grid-2',
          h('section.card', h('h3', 'Expected answer structure'), h('ol.steps', e.structure.map(function (s) { return h('li', s); }))),
          h('div.stack',
            h('section.card', h('h3', 'Key concepts'), h('div.row', e.keyConcepts.map(function (k) { var got = hits.indexOf(k) > -1; return h('span.badge.' + (got ? 'ok' : 'warn'), (got ? '✓ ' : '') + k); })), ta.value.trim() ? h('p.small.muted', { style: { marginTop: '6px' } }, 'You used ' + hits.length + ' of ' + e.keyConcepts.length + ' key concepts.') : null),
            h('section.card', h('h3', 'Essential points'), h('ul', e.points.map(function (p) { return h('li', p); }))),
            h('section.card', h('h3', 'Common mistakes'), h('ul', e.mistakes.map(function (p) { return h('li', p); }))))),
          h('div.card', { style: { marginTop: '16px' } }, h('h3', 'Relevant textbook source'), h('p', h('a', { href: '#/topic/' + e.topic }, 'Chapter ' + e.chapter + ' — ' + IFL.course.topic(e.topic).title + ' (' + IFL.course.sourceLabel(e.topic) + ')')),
            h('div.row', h('span.small', 'Rate your answer:'), ['Needs work', 'Adequate', 'Strong'].map(function (l, i) {
              return h('button.btn.sm' + (saved.self === i ? '.on' : ''), { type: 'button', onclick: function () { IFL.store.update(function (s) { s.exam[e.id] = Object.assign(s.exam[e.id] || {}, { self: i, ts: Date.now() }); }); u.toast('Saved'); } }, l);
            })))]);
        IFL.progress.log('exam', 'Exam answer: ' + IFL.trunc(e.q, 50), '/exam/trainer?id=' + e.id);
      }
      var idx = items.indexOf(e), nx = items[idx + 1];
      return h('div',
        C.pageHead({ crumbs: [{ label: 'Exam preparation', route: '/exam' }, { label: 'Answer trainer', route: '/exam/trainer' }], eyebrow: KIND[e.kind] + ' · Chapter ' + e.chapter, title: e.q,
          actions: [C.bookmarkBtn({ type: 'exam', id: e.id, label: IFL.trunc(e.q, 70), route: '/exam/trainer?id=' + e.id }), C.noteBtn({ type: 'exam', id: e.id, label: IFL.trunc(e.q, 60), route: '/exam/trainer?id=' + e.id })] }),
        h('div.card', h('div.row.between', h('label', { for: 'exam-ta' }, h('strong', 'Your answer')), wc), ta, h('div.row', { style: { marginTop: '10px' } }, h('button.btn.primary', { type: 'button', onclick: show }, 'Reveal expected answer'), h('span.small.muted', 'Your draft is saved automatically.'))),
        h('div', { style: { marginTop: '16px' } }, reveal),
        nx ? h('div.row', { style: { marginTop: '16px' } }, h('a.btn', { href: '#/exam/trainer?id=' + nx.id }, 'Next question', u.svg('right'))) : null);
    });
  });

  /* ---------- Rapid revision cards ---------- */
  IFL.route('/revision-cards', function (ctx) {
    return window.IFL_DATA.load(['concepts']).then(function (r) {
      var list = r.concepts, groups = {}; list.forEach(function (c) { groups[c.group] = 1; });
      var g = ctx.query.group || '';
      var cards = list.filter(function (c) { return !g || c.group === g; });
      var i = Math.max(0, Math.min(cards.length - 1, Number(ctx.query.i) || 0));
      var stage = h('div');
      var counter = h('span.small.muted.tabular');
      function draw() {
        stage.innerHTML = ''; stage.appendChild(C.conceptCard(cards[i]));
        counter.textContent = (i + 1) + ' / ' + cards.length;
        prevB.disabled = i === 0; nextB.disabled = i === cards.length - 1;
        history.replaceState(null, '', '#/revision-cards?i=' + i + (g ? '&group=' + encodeURIComponent(g) : ''));
      }
      var prevB = h('button.btn', { type: 'button', onclick: function () { if (i > 0) { i--; draw(); } } }, u.svg('left'), 'Previous');
      var nextB = h('button.btn.primary', { type: 'button', onclick: function () { if (i < cards.length - 1) { i++; draw(); } } }, 'Next', u.svg('right'));
      IFL.keys = function (k) { if (k === 'ArrowRight') { nextB.click(); return true; } if (k === 'ArrowLeft') { prevB.click(); return true; } };
      var groupSel = h('select.input', { 'aria-label': 'Filter by group', style: { maxWidth: '240px' } }, h('option', { value: '' }, 'All concepts (' + list.length + ')'), Object.keys(groups).map(function (x) { return h('option', { value: x, selected: x === g }, x); }));
      groupSel.addEventListener('change', function () { IFL.go('/revision-cards' + (groupSel.value ? '?group=' + encodeURIComponent(groupSel.value) : '')); });
      var jump = h('div.row', { style: { marginTop: '16px', justifyContent: 'center' } }, cards.map(function (c, k) { return h('button.chip', { type: 'button', onclick: function () { i = k; draw(); } }, c.name); }));
      draw();
      return h('div', C.pageHead({ eyebrow: 'Exam preparation', title: 'Rapid revision cards', desc: 'Concept · one-line definition · three key points · one distinction · exam trigger · source. Use ← → keys to move.', actions: [groupSel] }),
        h('div.row', { style: { justifyContent: 'center', marginBottom: '12px' } }, prevB, counter, nextB), stage, jump);
    });
  });
})();
