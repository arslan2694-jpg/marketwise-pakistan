/* Adaptive practice: prioritises weak topics, repeats missed questions, reduces mastered ones. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;

  /* Score each question: higher = more useful to ask now. Uses only the student's own history. */
  function rankQuestions(all) {
    var P = IFL.progress, stats = P.topicStats(), answers = IFL.store.state.answers;
    var mastered = {}; P.strongTopics().forEach(function (t) { mastered[t] = 1; });
    return all.map(function (q) {
      var a = answers[q.id], ts = stats[q.topic], s = 0;
      if (ts) s += (100 - ts.pct) / 10;                     // weak topic → up to +10
      if (a && a.lastCorrect === false) s += 8;             // missed last time
      if (!a) s += IFL.progress.isVisited(q.topic) || IFL.progress.isComplete(q.topic) ? 5 : 1.5; // unseen, prefer studied topics
      if (a && a.lastCorrect && a.correct >= 2) s -= 6;     // answered correctly repeatedly
      if (mastered[q.topic]) s -= 4;
      if (a && a.last) s -= Math.max(0, 3 - (Date.now() - a.last) / 36e5); // asked within last ~3h
      return { q: q, s: s + Math.random() * 0.8 };
    }).sort(function (x, y) { return y.s - x.s; });
  }

  IFL.route('/practice', function () {
    return IFL.questionPool().then(function (all) {
      var P = IFL.progress, weak = P.weakTopics(8), stats = P.topicStats(), answered = Object.keys(stats).length;
      var byChapter = {};
      Object.keys(stats).forEach(function (t) { var m = IFL.course.topic(t); if (!m) return; var c = byChapter[m.chapter] = byChapter[m.chapter] || { n: 0, c: 0 }; c.n += stats[t].n; c.c += stats[t].correct; });
      var ranked = rankQuestions(all);
      var head = C.pageHead({ eyebrow: 'Practice', title: 'Adaptive practice', desc: 'Built from your own answers: weak topics and missed questions come first, mastered material is asked less. No data leaves this device.' });
      var startBtn = h('a.btn.primary.lg', { href: '#/practice/run' }, u.svg('target'), 'Start personalised practice (10 questions)');
      if (!answered) return h('div', head, h('div.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'No answers yet'),
        h('p', 'Adaptive practice needs some history. Start with a personalised set — it will favour topics you have already studied — or take a chapter quiz.'),
        h('div.row', startBtn, h('a.btn', { href: '#/quiz' }, 'Quiz builder'))));
      var weakCard = h('div.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Your weakest areas'),
        weak.length ? h('div', weak.map(function (w) {
          return h('div', { style: { padding: '10px 0', borderBottom: '1px solid var(--border)' } },
            h('div.weak-row', h('a', { href: '#/topic/' + w.id }, 'Ch ' + w.topic.chapter + ' §' + w.topic.section + ' ' + IFL.trunc(w.topic.title, 46)), C.bar(w.pct, w.pct < 50 ? 'gold' : null), h('span.small.tabular', w.pct + '%')),
            h('div.row.small', h('span.muted', 'Recommended:'), h('a.btn.sm', { href: '#/topic/' + w.id }, '1 · Review topic'), h('a.btn.sm', { href: '#/practice/run?topics=' + w.id + '&n=5' }, '2 · 5 targeted questions'), h('a.btn.sm', { href: '#/flashcards/review?topics=' + w.id }, '3 · Flashcards')));
        })) : h('p.muted', 'No weak topics: accuracy is at least 70% everywhere you have answered twice or more.'));
      var chCard = h('div.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Accuracy by chapter'),
        h('div.stack', Object.keys(byChapter).sort(function (a, b) { return a - b; }).map(function (n) { var c = byChapter[n], p = u.pct(c.c, c.n); return h('div', h('div.row.between.small', h('a', { href: '#/chapter/' + n }, 'Chapter ' + n + ' · ' + IFL.trunc(IFL.course.chapter(n).title, 40)), h('span.tabular', p + '% of ' + c.n)), C.bar(p, p < 60 ? 'gold' : null)); })));
      var next = ranked.slice(0, 5).map(function (r) { return h('li.small', IFL.trunc(r.q.q, 90), h('span.muted', ' — ' + IFL.course.sourceLabel(r.q.topic))); });
      return h('div', head, h('div.row', { style: { marginBottom: '18px' } }, startBtn, h('span.small.muted', answered + ' topics with answer history · ' + P.strongTopics().length + ' mastered (≥85% over 3+ answers)')),
        h('div.grid.grid-2', weakCard, chCard),
        h('div.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Next questions in your personalised queue'), h('ol', next)));
    });
  });

  IFL.route('/practice/run', function (ctx) {
    return IFL.questionPool().then(function (all) {
      var topics = ctx.query.topics ? ctx.query.topics.split(',') : null;
      var pool = topics ? all.filter(function (q) { return topics.indexOf(q.topic) > -1; }) : all;
      var n = Number(ctx.query.n) || 10;
      var items = rankQuestions(pool).slice(0, n).map(function (r) { return r.q; });
      var label = topics ? 'Targeted practice: ' + topics.map(function (t) { var m = IFL.course.topic(t); return m ? '§' + m.section : t; }).join(', ') : 'Personalised practice';
      return h('div', C.pageHead({ crumbs: [{ label: 'Adaptive practice', route: '/practice' }, { label: 'Session' }], eyebrow: 'Adaptive practice', title: label }),
        items.length ? IFL.quizRunner(items, { label: label, mode: 'adaptive' }) : C.empty('No questions available', 'This topic has no questions yet.'));
    });
  });
  IFL.rankQuestions = rankQuestions;
})();
