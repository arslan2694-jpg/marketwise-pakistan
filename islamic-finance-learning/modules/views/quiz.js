/* Quiz engine: builder, runner, results and history. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var TYPES = ['mcq', 'tf', 'multi', 'match', 'order', 'definition', 'identify', 'comparison', 'scenario', 'application', 'short'];
  var LEVELS = ['recall', 'understanding', 'application', 'analysis'];

  /* All questions (chapter questions + topic quick checks) with chapter numbers attached. */
  function pool() {
    return window.IFL_DATA.loadAllChapters().then(function (chs) {
      var out = [];
      chs.forEach(function (ch) {
        ch.questions.forEach(function (q) { out.push(Object.assign({ chapter: ch.number }, q)); });
        ch.topics.forEach(function (t) { var qc = C.quickCheckQuestion(t); if (qc) { qc.chapter = ch.number; qc.quick = true; out.push(qc); } });
      });
      return out;
    });
  }
  IFL.questionPool = pool;
  function filterPool(all, f) {
    return all.filter(function (q) {
      if (f.chapters && f.chapters.length && f.chapters.indexOf(q.chapter) < 0) return false;
      if (f.types && f.types.length && f.types.indexOf(q.type) < 0) return false;
      if (f.diff && f.diff.length && f.diff.indexOf(q.diff) < 0) return false;
      if (f.levels && f.levels.length && f.levels.indexOf(q.level) < 0) return false;
      if (f.topics && f.topics.length && f.topics.indexOf(q.topic) < 0) return false;
      if (f.noQuick && q.quick) return false;
      return true;
    });
  }
  IFL.filterPool = filterPool;

  IFL.route('/quiz', function () {
    return pool().then(function (all) {
      var sel = { chapters: [], types: [], diff: [], levels: [] }, n = 10;
      var countEl = h('strong.tabular');
      function toggleChip(arr, v, label) {
        var b = h('button.chip', { type: 'button', 'aria-pressed': 'false', onclick: function () { var i = arr.indexOf(v); if (i > -1) arr.splice(i, 1); else arr.push(v); b.setAttribute('aria-pressed', String(arr.indexOf(v) > -1)); update(); } }, label);
        return b;
      }
      var nInput = h('input.input', { id: 'qn', type: 'number', min: 3, max: 60, value: n, style: { width: '90px' }, 'aria-label': 'Number of questions' });
      nInput.addEventListener('input', function () { n = Math.max(1, Math.min(60, Number(nInput.value) || 10)); });
      function update() { countEl.textContent = String(filterPool(all, sel).length); }
      function start() {
        var qs = [];
        if (sel.chapters.length) qs.push('chapters=' + sel.chapters.join(','));
        if (sel.types.length) qs.push('types=' + sel.types.join(','));
        if (sel.diff.length) qs.push('diff=' + sel.diff.join(','));
        if (sel.levels.length) qs.push('levels=' + sel.levels.join(','));
        qs.push('n=' + n);
        if (!filterPool(all, sel).length) { u.toast('No questions match these filters'); return; }
        IFL.go('/quiz/run?' + qs.join('&'));
      }
      update();
      var hist = IFL.store.state.attempts.slice(0, 12);
      return h('div',
        C.pageHead({ eyebrow: 'Practice', title: 'Quiz', desc: 'Every question has an answer, an explanation, a textbook source and a learning objective. Wrong answers point you back to the topic to review.' }),
        h('div.grid.grid-3',
          preset('Mixed 10', 'Ten questions from across the book.', '/quiz/run?n=10'),
          preset('Comparison questions', 'Test the distinctions examiners like.', '/quiz/run?types=comparison,match&n=10&mode=compare'),
          preset('Scenario & application', 'Apply rules to situations.', '/quiz/run?types=scenario,application&n=10'),
          preset('Hard questions', 'Analysis-level and difficult items.', '/quiz/run?diff=H&n=10'),
          preset('Short answers', 'Write, then compare with a model answer.', '/quiz/run?types=short&n=5'),
          preset('Adaptive practice', 'Targets your weak topics.', '/practice')),
        h('section.card', { style: { marginTop: '20px' } }, h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Build your own quiz'),
          h('div.stack',
            h('div', h('div.small.muted', 'Chapters'), h('div.row', IFL.course.chapters.map(function (c) { return toggleChip(sel.chapters, c.n, 'Ch ' + c.n); }))),
            h('div', h('div.small.muted', 'Question types'), h('div.row', TYPES.map(function (t) { return toggleChip(sel.types, t, C.typeLabel(t)); }))),
            h('div', h('div.small.muted', 'Difficulty'), h('div.row', [['E', 'Easy'], ['M', 'Medium'], ['H', 'Hard']].map(function (d) { return toggleChip(sel.diff, d[0], d[1]); }))),
            h('div', h('div.small.muted', 'Cognitive level'), h('div.row', LEVELS.map(function (l) { return toggleChip(sel.levels, l, l.charAt(0).toUpperCase() + l.slice(1)); }))),
            h('div.row', h('span.small', 'Matching questions: ', countEl), h('span.spacer'), h('label.small', { for: 'qn' }, 'Questions in quiz'), nInput, h('button.btn.primary', { type: 'button', onclick: start }, 'Start quiz')))),
        h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Chapter quizzes'),
          h('div.grid.grid-auto', IFL.course.chapters.map(function (c) {
            var best = IFL.store.state.attempts.filter(function (a) { return a.chapter === c.n; }).map(function (a) { return Math.round(100 * a.score / a.total); });
            return h('a.btn', { href: '#/quiz/run?chapter=' + c.n, style: { justifyContent: 'space-between' } }, 'Ch ' + c.n + ' · ' + IFL.trunc(c.title, 22), best.length ? h('span.badge.' + (Math.max.apply(null, best) >= 70 ? 'ok' : 'warn'), 'best ' + Math.max.apply(null, best) + '%') : null);
          }))),
        h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Recent attempts'),
          hist.length ? h('div.table-wrap', h('table', h('thead', h('tr', h('th', 'Quiz'), h('th', 'Score'), h('th', 'When'))),
            h('tbody', hist.map(function (a) { return h('tr', h('td', a.label), h('td.tabular', a.score + '/' + a.total + ' (' + Math.round(100 * a.score / a.total) + '%)'), h('td', u.ago(a.ts))); })))) : h('p.muted.small', 'No quizzes taken yet.')));
    });
  });
  function preset(t, d, r) { return h('a.card.card-link', { href: '#' + r }, h('h3', { style: { fontSize: 'var(--fs-md)', margin: 0 } }, t), h('p.small.text-2', { style: { margin: '6px 0 0' } }, d)); }

  function csv(v) { return v ? v.split(',').filter(Boolean) : []; }
  IFL.route('/quiz/run', function (ctx) {
    return pool().then(function (all) {
      var q = ctx.query;
      var f = { chapters: q.chapter ? [Number(q.chapter)] : csv(q.chapters).map(Number), types: csv(q.types || q.type), diff: csv(q.diff), levels: csv(q.levels), topics: csv(q.topics) };
      var items = filterPool(all, f);
      if (q.retry) { var ids = csv(q.retry); items = all.filter(function (x) { return ids.indexOf(x.id) > -1; }); }
      var n = Number(q.n) || (q.chapter ? Math.min(items.length, 16) : 10);
      items = q.chapter ? chapterSelection(items, n) : u.shuffle(items).slice(0, n);
      var label = q.retry ? 'Retry of missed questions' : q.chapter ? 'Chapter ' + q.chapter + ' quiz' : q.mode === 'compare' ? 'Comparison quiz' : f.types.length === 1 ? C.typeLabel(f.types[0]) + ' quiz' : 'Custom quiz';
      var head = C.pageHead({ crumbs: [{ label: 'Quiz', route: '/quiz' }, { label: label }], eyebrow: 'Quiz', title: label });
      if (!items.length) return h('div', head, C.empty('No questions match', 'Try different filters.', h('a.btn.primary', { href: '#/quiz' }, 'Quiz builder')));
      return h('div', head, runner(items, { label: label, chapter: q.chapter ? Number(q.chapter) : null, mode: q.mode || (q.chapter ? 'chapter' : 'custom') }));
    });
  });
  /* Chapter quiz: favour real questions over quick checks, mix types, keep book order. */
  function chapterSelection(items, n) {
    var main = items.filter(function (x) { return !x.quick; }), quick = u.shuffle(items.filter(function (x) { return x.quick; }));
    return main.concat(quick).slice(0, n);
  }

  /* Runner component (also used by adaptive practice and guided study). */
  function runner(items, opts) {
    opts = opts || {};
    var i = 0, results = [];
    var root = h('div');
    function draw() {
      root.innerHTML = '';
      if (i >= items.length) return finish();
      var q = items[i], answered = false;
      var nextBtn = h('button.btn.primary', { type: 'button', disabled: true, onclick: function () { i++; draw(); } }, i === items.length - 1 ? 'See results' : 'Next question', u.svg('right'));
      var el = C.question(q, { onAnswer: function (ok) { answered = true; results.push({ q: q.id, ok: ok, topic: q.topic }); nextBtn.disabled = false; setTimeout(function () { nextBtn.focus({ preventScroll: true }); }, 30); } });
      IFL.keys = function (k) { if (!answered && el._keys) { el._keys(k); return true; } if (answered && k === 'Enter') { nextBtn.click(); return true; } };
      u.append(root, [
        h('div.row.between', { style: { marginBottom: '8px' } }, h('span.small.muted.tabular', 'Question ' + (i + 1) + ' of ' + items.length), h('div.row', C.bookmarkBtn({ type: 'question', id: q.id, label: IFL.trunc(q.q, 70), route: '/quiz/run?retry=' + q.id }, true), C.noteBtn({ type: 'question', id: q.id, label: IFL.trunc(q.q, 60), route: '/quiz/run?retry=' + q.id }, true))),
        C.bar(Math.round(100 * i / items.length), 'thin'),
        h('div.card', { style: { marginTop: '14px' } }, el),
        h('div.row', { style: { marginTop: '14px' } }, nextBtn, h('span.spacer'), h('span.small.muted', 'Keys: A–D or 1–4 to answer · Enter for next'))]);
    }
    function finish() {
      IFL.keys = null;
      var score = results.filter(function (r) { return r.ok; }).length;
      IFL.progress.recordAttempt({ mode: opts.mode, label: opts.label, score: score, total: results.length, chapter: opts.chapter, items: results });
      var wrong = results.filter(function (r) { return !r.ok; });
      var weakTopics = {}; wrong.forEach(function (r) { weakTopics[r.topic] = (weakTopics[r.topic] || 0) + 1; });
      var pctv = u.pct(score, results.length);
      root.appendChild(h('div.stack',
        h('div.card', { style: { textAlign: 'center' } }, h('div.score-big', pctv + '%'), h('p', score + ' of ' + results.length + ' correct'),
          h('p.small.text-2', pctv >= 80 ? 'Strong result — move on or try harder questions.' : pctv >= 60 ? 'Good progress. Review the topics below to close the gaps.' : 'Review the topics below, then retry the missed questions.')),
        wrong.length ? h('div.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Topics to review'),
          h('ul.list', Object.keys(weakTopics).map(function (t) { var m = IFL.course.topic(t); return m ? h('li', h('a', { href: '#/topic/' + t }, 'Chapter ' + m.chapter + ' §' + m.section + ' ' + m.title), h('span.muted.small', ' — ' + weakTopics[t] + ' missed')) : null; }))) : null,
        h('div.row', wrong.length ? h('a.btn.primary', { href: '#/quiz/run?retry=' + wrong.map(function (r) { return r.q; }).join(',') }, 'Retry missed questions') : null,
          opts.onDone ? h('button.btn' + (wrong.length ? '' : '.primary'), { type: 'button', onclick: opts.onDone }, 'Continue') : h('a.btn', { href: '#/quiz' }, 'Back to quizzes'),
          h('a.btn', { href: '#/practice' }, 'Adaptive practice'))));
      if (opts.onFinish) opts.onFinish(score, results.length);
    }
    draw();
    return root;
  }
  IFL.quizRunner = runner;
})();
