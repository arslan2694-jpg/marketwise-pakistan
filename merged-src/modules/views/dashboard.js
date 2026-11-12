
/* Dashboard: real progress only — nothing is displayed that the student has not produced. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;

  IFL.route('/', function () {
    var P = IFL.progress, s = IFL.store.state, o = P.overall();
    var name = s.settings.name ? ', ' + s.settings.name : '';
    var started = o.visited > 0 || s.attempts.length > 0 || s.reviews.length > 0 || Object.keys(s.cards).length > 0;
    var recs = P.recommendations();
    var avg = P.quizAverage(), due = IFL.srs.dueCount(), weak = P.weakTopics(5);
    var cur = s.last && s.last.topic ? IFL.course.topic(s.last.topic) : null;

    var plan = IFL.todayPlan();
    var hero = h('section.card.hero', { 'aria-labelledby': 'dash-title' },
      h('div',
        h('div.eyebrow', 'Understanding Islamic Finance · Muhammad Ayub'),
        h('h1#dash-title', started ? 'Welcome back' + name : 'Welcome' + name),
        h('p.text-2', started ? 'Pick up where you left off, or work through today’s session. Everything here reflects your own study activity.' : 'A structured study platform for all 18 chapters of the textbook — lessons at three levels, diagrams, flashcards, quizzes, case studies and exam preparation. Your progress is saved only on this device.'),
        h('div.row', { style: { marginTop: '12px' } },
          cur ? h('a.btn.primary.lg', { href: '#/topic/' + cur.id }, u.svg('play'), 'Continue: §' + cur.section + ' ' + trunc(cur.title, 38)) : h('a.btn.primary.lg', { href: '#/chapter/1' }, u.svg('play'), 'Start Chapter 1'),
          h('a.btn.lg', { href: '#/guided/crash45' }, u.svg('bolt'), '45-minute crash course'))),
      h('div.hero-rings',
        h('div', C.ring(o.pct, 104, 'Course completion'), h('div.small.muted', o.done + ' / ' + o.total + ' topics')),
        h('div', C.ring(plan.goalPct, 104, 'Daily study goal'), h('div.small.muted', Math.floor(plan.seconds / 60) + ' / ' + plan.goalMin + ' min today'))));

    var todayCard = h('section.card.next-card', { 'aria-labelledby': 'today-title' },
      h('div.card-title', h('h2#today-title', 'Today’s session'), h('div.row', h('span.badge.' + (plan.next ? '' : 'accent'), plan.done + ' of ' + plan.total + ' done'), h('a.btn.sm', { href: '#/today' }, 'Open'))),
      IFL.todaySteps(plan, true));

    var extra = recs.filter(function (r) { return r.kind !== 'continue' && r.kind !== 'cards'; }).slice(0, 2);
    var nextCard = extra.length ? h('section.card', { 'aria-labelledby': 'next-title' },
      h('div.card-title', h('h2#next-title', 'Recommended next')),
      h('div.stack', extra.map(function (r, i) {
        return h('div.row', { style: { alignItems: 'flex-start', gap: '14px', paddingBottom: i < extra.length - 1 ? '12px' : 0, borderBottom: i < extra.length - 1 ? '1px solid var(--border)' : 0 } },
          h('span.badge', { style: { marginTop: '2px' } }, u.svg(r.icon)),
          h('div', { style: { flex: 1, minWidth: '200px' } }, h('div', { style: { fontWeight: 650 } }, r.title), h('div.why.small.text-2', r.why)),
          h('div.row', h('a.btn', { href: '#' + r.route }, r.action), r.extra ? h('a.btn', { href: '#' + r.extra.route }, r.extra.label) : null));
      }))) : null;

    /* Mastery map: one tile per chapter. Level blends completion with accuracy on answered questions. */
    var tstats = P.topicStats();
    var tiles = IFL.course.chapters.map(function (c) {
      var cp = P.chapterProgress(c.n), n = 0, ok = 0;
      c.topicObjs.forEach(function (t) { var r = tstats[t.id]; if (r) { n += r.n; ok += r.correct; } });
      var acc = n ? Math.round(100 * ok / n) : null;
      var score = acc == null ? cp.pct * 0.5 : cp.pct * 0.5 + acc * 0.5;
      var lvl = !cp.visited && !n ? 0 : score >= 85 ? 4 : score >= 60 ? 3 : score >= 30 ? 2 : 1;
      var label = ['Not started', 'Started', 'In progress', 'Solid', 'Mastered'][lvl];
      return h('a.mastery-tile', { href: '#/chapter/' + c.n, 'data-l': lvl, 'aria-label': 'Chapter ' + c.n + ': ' + c.title + '. ' + label + '. ' + cp.done + ' of ' + cp.total + ' topics complete' + (acc == null ? '' : ', accuracy ' + acc + '%') },
        h('span.mt-n', String(c.n)), h('span.mt-t', trunc(c.title, 34)),
        h('span.mt-m', cp.done + '/' + cp.total + (acc == null ? '' : ' · ' + acc + '%')), C.bar(cp.pct, 'thin'));
    });
    var masteryCard = h('section.card', { 'aria-labelledby': 'mastery-title' },
      h('div.card-title', h('h2#mastery-title', 'Mastery map'), h('div.mastery-legend.small.muted', { 'aria-hidden': 'true' }, 'Not started', [0, 1, 2, 3, 4].map(function (l) { return h('span', { 'data-l': l }); }), 'Mastered')),
      h('div.mastery-grid', tiles),
      h('p.small.muted', { style: { marginTop: '10px' } }, 'Each tile blends topic completion with your accuracy on that chapter’s questions. Open a tile to study the chapter.'));

    var stats = h('section.card.stat-strip', { 'aria-label': 'Study statistics' },
      strip('Chapters', o.chaptersDone + ' / 18', o.chaptersVisited + ' visited', '/learn'),
      strip('Quiz average', avg == null ? '—' : avg + '%', s.attempts.length + ' quiz' + (s.attempts.length === 1 ? '' : 'zes'), '/quiz'),
      strip('Flashcards', P.reviewCount(), due ? due + ' due now' : 'none due', '/flashcards'),
      strip('Streak', P.streak() + (P.streak() === 1 ? ' day' : ' days'), '≥ 1 min a day', '/progress'),
      strip('Study time', u.fmtDuration(P.studySeconds()), 'today ' + u.fmtDuration(s.days[u.dayKey()] || 0), '/progress'),
      strip('Saved', s.bookmarks.length + s.notes.length, s.bookmarks.length + ' bookmarks · ' + s.notes.length + ' notes', '/bookmarks'));

    var partsCard = h('section.card', h('div.card-title', h('h2', 'Progress by part'), h('a.btn.sm', { href: '#/progress' }, 'Details')),
      h('div.stack', IFL.course.parts.map(function (p) {
        var pp = P.partProgress(p.id);
        return h('div', h('div.row.between.small', h('a', { href: '#/learn/' + p.id }, p.title), h('span.tabular.muted', pp.done + '/' + pp.total)), C.bar(pp.pct));
      })));

    var weakCard = h('section.card', h('div.card-title', h('h2', 'Weak topics'), h('div.row', h('a.btn.sm', { href: '#/mistakes' }, 'Mistakes'), h('a.btn.sm', { href: '#/practice' }, 'Adaptive practice'))),
      weak.length ? h('div', weak.map(function (w) {
        return h('div.weak-row', h('a', { href: '#/topic/' + w.id }, '§' + w.topic.section + ' ' + trunc(w.topic.title, 44)), C.bar(w.pct, w.pct < 50 ? 'gold' : null), h('span.small.tabular', w.pct + '%'));
      })) : h('p.muted.small', s.attempts.length || Object.keys(s.answers).length ? 'No weak topics yet — accuracy is at least 70% wherever you have answered twice or more.' : 'Answer quiz questions and weak areas will appear here, based on your accuracy.'));

    var readiness = P.readiness();
    var readyCard = h('section.card', h('div.card-title', h('h2', 'Exam readiness')),
      h('p.small.muted', 'Combines topic completion with accuracy on the questions you have answered in each part.'),
      h('div.stack', readiness.map(function (r) {
        return h('div', h('div.row.between.small', h('span', r.title.split(' — ')[0]), h('span.tabular', r.score == null ? 'not yet measured' : r.score + '%')),
          C.bar(r.score || 0), h('div.small.muted', 'Completion ' + r.completion + '% · Accuracy ' + (r.accuracy == null ? '—' : r.accuracy + '%')));
      })));

    var days = P.lastDays(28);
    var heat = h('div.heat', { role: 'img', 'aria-label': 'Study activity over the last 28 days' }, days.map(function (d) { var l = d.sec >= 1800 ? 3 : d.sec >= 600 ? 2 : d.sec >= 60 ? 1 : 0; return h('span', { 'data-l': l, title: d.key + ': ' + u.fmtDuration(d.sec) }); }));
    var activity = s.activity.slice(0, 8);
    var actCard = h('section.card', h('div.card-title', h('h2', 'Recent activity')),
      h('div.small.muted', 'Last 28 days'), heat,
      activity.length ? h('ul.list', { style: { marginTop: '10px' } }, activity.map(function (a) { return h('li.small', h('a', { href: '#' + a.route }, a.label), h('span.muted', ' · ' + u.ago(a.ts))); })) : h('p.muted.small', { style: { marginTop: '10px' } }, 'Your activity will be listed here.'));

    var bm = s.bookmarks.slice(0, 5);
    var bmCard = h('section.card', h('div.card-title', h('h2', 'Bookmarked'), h('a.btn.sm', { href: '#/bookmarks' }, 'All')),
      bm.length ? h('ul.list', bm.map(function (b) { return h('li.small', h('span.badge', b.type), ' ', h('a', { href: '#' + b.route }, b.label)); })) : h('p.muted.small', 'Use the bookmark button on any topic, concept, question, comparison or diagram.'));

    var quick = h('section.card', h('div.card-title', h('h2', 'Study tools')),
      h('div.grid.grid-2', [
        ['#/revision-cards', 'layers', 'Rapid revision cards'], ['#/compare', 'compare', 'Comparison lab'], ['#/diagrams', 'flow', 'Transaction diagrams'], ['#/concepts', 'map', 'Concept map'],
        ['#/exam/trainer', 'exam', 'Exam answer trainer'], ['#/finder', 'compass', 'Which mode applies?'], ['#/cases', 'case', 'Case studies'], ['#/timer', 'clock', 'Study timer'],
        ['#/modes', 'bank', 'Financing modes'], ['#/products', 'bank', 'Islamic banking products'], ['#/numericals', 'sum', 'Numericals trainer'], ['#/glossary', 'glossary', 'Glossary and acronyms'], ['#/sources', 'source', 'Sources and page map'],
        ['#/mock', 'flame', 'Timed mock exam'], ['#/tools', 'calc', 'Interactive tools'], ['#/mistakes', 'refresh', 'My mistakes' + (function () { var n = Object.keys(s.answers).filter(function (k) { return s.answers[k].lastCorrect === false; }).length; return n ? ' (' + n + ')' : ''; })()]
      ].map(function (x) { return h('a.btn', { href: x[0], style: { justifyContent: 'flex-start' } }, u.svg(x[1]), x[2]); })));

    var xplan = IFL.buildPlan ? IFL.buildPlan() : null;
    var planCard = xplan && !xplan.past ? h('section.card', h('div.card-title', h('h2', 'Exam in ' + xplan.daysLeft + ' day' + (xplan.daysLeft === 1 ? '' : 's')), h('a.btn.sm', { href: '#/planner' }, 'Planner')),
      xplan.days[0] && xplan.days[0].kind === 'learn' ? h('p.small', 'Today: ' + xplan.days[0].topics.length + ' topic' + (xplan.days[0].topics.length > 1 ? 's' : '') + ' (~' + xplan.days[0].minutes + ' min), starting with ', h('a', { href: '#/topic/' + xplan.days[0].topics[0].id }, '§' + xplan.days[0].topics[0].section + ' ' + trunc(xplan.days[0].topics[0].title, 40)), '.')
        : h('p.small', xplan.remaining ? 'Revision period: rapid revision, mistakes and a mock exam.' : 'All topics complete — revise and take mock exams.'))
      : h('section.card', h('div.card-title', h('h2', 'Exam date'), h('a.btn.sm', { href: '#/planner' }, 'Set date')), h('p.small.muted', 'Set your exam date to get a day-by-day plan built from your progress.'));
    return h('div.stack', hero, todayCard, stats, masteryCard,
      h('div.grid.grid-2', nextCard, planCard),
      h('div.grid.grid-2', partsCard, weakCard),
      h('div.grid.grid-2', readyCard, actCard),
      h('div.grid.grid-2', bmCard, quick));
  });

  function strip(label, value, sub, route) { return h('a.strip-item', { href: '#' + route }, h('span.v', value), h('span.l', label), h('span.small.muted', sub)); }
  function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }
  IFL.trunc = trunc;
})();

