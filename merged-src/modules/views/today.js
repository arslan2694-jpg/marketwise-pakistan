/* Today: one daily session assembled from the student's own state — review what is due, learn the next
   topics, practise the weakest material, apply it once. Every step is derived from the single progress
   model (nothing is stored separately), so it stays correct after imports, resets and migrations. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var PRACTICE_TARGET = 10;

  function startOfDay() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime(); }
  function count(obj, test) { var n = 0; Object.keys(obj || {}).forEach(function (k) { if (test(obj[k])) n++; }); return n; }

  /* Next unfinished topics in book order, starting from the chapter the student was last in. */
  function nextTopics(k) {
    var ids = IFL.course.allTopicIds, s = IFL.store.state, out = [], start = 0;
    if (s.last && s.last.chapter) { for (var i = 0; i < ids.length; i++) { if (IFL.course.topic(ids[i]).chapter === s.last.chapter) { start = i; break; } } }
    for (var j = 0; j < ids.length && out.length < k; j++) { var id = ids[(start + j) % ids.length]; if (!IFL.progress.isComplete(id)) out.push(IFL.course.topic(id)); }
    return out;
  }

  IFL.todayPlan = function () {
    var s = IFL.store.state, P = IFL.progress, D = IFL.data, sod = startOfDay();
    var goal = Number(s.settings.dailyGoal) || 30;
    var seconds = s.days[u.dayKey()] || 0;
    var reviewsToday = s.reviews.filter(function (r) { return r.ts >= sod; }).length;
    var topicsToday = count(s.topics, function (t) { return t.completed && t.completed >= sod; });
    var answersToday = count(s.answers, function (a) { return a.last && a.last >= sod; });
    var appliedToday = count(s.cases, function (c) { return c.ts >= sod; }) + count(s.numericals, function (c) { return c.last >= sod; }) + count(s.calcs, function (c) { return c.last >= sod; });
    var steps = [];

    /* 1 — Review */
    var due = IFL.srs.dueCount(), scheduled = Object.keys(s.cards).length;
    var lastCh = (s.last && s.last.chapter) || 1;
    if (due > 0) steps.push({ id: 'review', icon: 'cards', title: 'Review ' + due + ' due flashcard' + (due === 1 ? '' : 's'), detail: 'Spaced review first: these cards are scheduled for today or earlier.', route: '/flashcards/review?scope=due', action: 'Review', done: false, progress: reviewsToday ? reviewsToday + ' reviewed today' : null });
    else if (reviewsToday > 0) steps.push({ id: 'review', icon: 'cards', title: 'Flashcard review', detail: 'Nothing else is due. ' + reviewsToday + ' card' + (reviewsToday === 1 ? '' : 's') + ' reviewed today.', route: '/flashcards', action: 'Open decks', done: true });
    else steps.push({ id: 'review', icon: 'cards', title: scheduled ? 'Add new flashcards from Chapter ' + lastCh : 'Start your flashcard schedule', detail: scheduled ? 'No cards are due today — introduce a few new ones so tomorrow has something to review.' : 'Grade ten cards from Chapter ' + lastCh + ' and the scheduler will bring them back at the right time.', route: '/flashcards/review?chapter=' + lastCh + '&scope=new&n=10', action: 'Start', done: false });

    /* 2 — Learn */
    var target = Math.max(1, Math.round(goal / 15)), upcoming = nextTopics(Math.max(1, target - topicsToday));
    var total = IFL.progress.overall();
    if (total.done >= total.total) steps.push({ id: 'learn', icon: 'book', title: 'All 311 topics complete', detail: 'Use the time for a mock exam or rapid revision.', route: '/mock', action: 'Mock exam', done: true });
    else if (topicsToday >= target) steps.push({ id: 'learn', icon: 'book', title: 'Learn new topics', detail: topicsToday + ' topic' + (topicsToday === 1 ? '' : 's') + ' completed today (goal ' + target + ').' + (upcoming[0] ? ' Next up: §' + upcoming[0].section + ' ' + upcoming[0].title + '.' : ''), route: upcoming[0] ? '/topic/' + upcoming[0].id : '/learn', action: 'Keep going', done: true });
    else steps.push({ id: 'learn', icon: 'book', title: 'Learn ' + (target - topicsToday) + ' topic' + (target - topicsToday === 1 ? '' : 's'), detail: 'Next: ' + upcoming.map(function (t) { return '§' + t.section + ' ' + IFL.trunc(t.title, 46); }).join(' · '), route: '/topic/' + upcoming[0].id, action: topicsToday ? 'Continue' : 'Start', done: false, progress: topicsToday + ' of ' + target + ' completed today', topics: upcoming });

    /* 3 — Practise */
    var weak = P.weakTopics(3), missed = Object.keys(s.answers).filter(function (k) { return s.answers[k].lastCorrect === false && D.question(k); });
    var pr;
    if (weak.length) pr = { title: 'Practise your weakest topics', detail: weak.map(function (w) { return '§' + w.topic.section + ' (' + w.pct + '%)'; }).join(' · ') + ' — accuracy below 70%.', route: '/practice/run?topics=' + weak.map(function (w) { return w.id; }).join(',') + '&n=' + PRACTICE_TARGET };
    else if (missed.length) pr = { title: 'Retry ' + Math.min(missed.length, PRACTICE_TARGET) + ' missed question' + (missed.length === 1 ? '' : 's'), detail: 'Questions whose most recent answer was wrong.', route: '/quiz/run?retry=' + missed.slice(0, PRACTICE_TARGET).join(',') };
    else pr = { title: 'Answer ' + PRACTICE_TARGET + ' practice questions', detail: 'A personalised set: unseen questions from topics you have studied come first.', route: '/practice/run?n=' + PRACTICE_TARGET };
    pr.id = 'practise'; pr.icon = 'target'; pr.action = answersToday ? 'Continue' : 'Start'; pr.done = answersToday >= PRACTICE_TARGET;
    pr.progress = answersToday + ' of ' + PRACTICE_TARGET + ' questions answered today';
    if (pr.done) { pr.detail = answersToday + ' questions answered today.'; pr.action = 'More practice'; pr.route = '/practice'; }
    steps.push(pr);

    /* 4 — Apply */
    var open = D.cases.filter(function (c) { return !s.cases[c.id]; });
    var near = open.filter(function (c) { return IFL.progress.chapterProgress(c.chapter).visited > 0; })[0] || open[0];
    if (appliedToday) steps.push({ id: 'apply', icon: 'case', title: 'Apply it', detail: 'Done — you worked a case, numerical or calculator today.', route: '/cases', action: 'More cases', done: true });
    else if (near) steps.push({ id: 'apply', icon: 'case', title: 'Work one case study', detail: near.title + ' (Chapter ' + near.chapter + ').', route: '/case/' + near.id, action: 'Open case', done: false });
    else steps.push({ id: 'apply', icon: 'sum', title: 'Solve one numerical', detail: 'Every case study is worked — keep the calculations sharp.', route: '/numericals', action: 'Open trainer', done: false });

    var doneN = steps.filter(function (x) { return x.done; }).length;
    return { steps: steps, done: doneN, total: steps.length, next: steps.filter(function (x) { return !x.done; })[0] || null,
      goalMin: goal, seconds: seconds, goalPct: Math.min(100, Math.round(100 * seconds / (goal * 60))) };
  };

  /* Shared renderer (dashboard card and /today page). */
  IFL.todaySteps = function (plan, compact) {
    return h('ol.today-steps', plan.steps.map(function (st, i) {
      var isNext = plan.next === st;
      return h('li.today-step' + (st.done ? '.done' : '') + (isNext ? '.next' : ''),
        h('span.today-mark', { 'aria-hidden': 'true' }, st.done ? u.svg('check') : String(i + 1)),
        h('div.today-text',
          h('div.today-title', st.title, st.done ? h('span.sr-only', ' (done)') : null),
          compact && !isNext ? null : h('div.small.text-2', st.detail),
          st.progress && !st.done ? h('div.small.muted', st.progress) : null),
        h('a.btn' + (isNext ? '.primary' : '.sm'), { href: '#' + st.route, 'aria-label': st.action + ': ' + st.title }, st.action));
    }));
  };

  IFL.route('/today', function () {
    var plan = IFL.todayPlan(), s = IFL.store.state;
    var allDone = !plan.next;
    var head = h('header.card.today-head',
      h('div',
        h('div.eyebrow', new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })),
        h('h1', 'Today’s session'),
        h('p.text-2', allDone ? 'All four steps are done. Anything further today is a bonus — the schedule will have fresh work for you tomorrow.'
          : 'Four short steps, in the order that makes them stick: review, learn, practise, apply. Each one is chosen from your own progress.'),
        h('div.row', { style: { marginTop: '10px' } },
          plan.next ? h('a.btn.primary.lg', { href: '#' + plan.next.route }, u.svg('play'), 'Step ' + (plan.steps.indexOf(plan.next) + 1) + ': ' + plan.next.action) : h('a.btn.primary.lg', { href: '#/revision-cards' }, u.svg('bolt'), 'Rapid revision'),
          h('a.btn.lg', { href: '#/timer' }, u.svg('clock'), 'Study timer'))),
      h('div.today-goal', C.ring(plan.goalPct, 112, 'Daily study goal'),
        h('div.small.muted', u.fmtDuration(plan.seconds) + ' of ' + plan.goalMin + ' min'),
        h('a.small', { href: '#/settings' }, 'Change goal')));
    var streak = IFL.progress.streak();
    var body = h('section.card', h('div.card-title', h('h2', plan.done + ' of ' + plan.total + ' steps done'), h('span.badge.' + (streak ? 'accent' : ''), streak + '-day streak')),
      IFL.todaySteps(plan, false));
    var days = IFL.progress.lastDays(7);
    var week = h('section.card', h('div.card-title', h('h2', 'This week')),
      h('div.week-bars', { role: 'img', 'aria-label': 'Minutes studied on each of the last seven days' }, days.map(function (d) {
        var m = Math.round(d.sec / 60), pct = Math.min(100, Math.round(100 * d.sec / (plan.goalMin * 60)));
        return h('div.week-day', h('div.week-col', h('span' + (pct >= 100 ? '.full' : ''), { style: { height: Math.max(pct, d.sec ? 6 : 0) + '%' } })), h('div.small.tabular', m + 'm'), h('div.small.muted', new Date(d.key + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short' })));
      })),
      h('p.small.muted', { style: { marginTop: '8px' } }, 'Bars fill to your daily goal of ' + plan.goalMin + ' minutes. Time counts while the app is open and you are active.'));
    var recs = IFL.progress.recommendations().slice(0, 3);
    var more = recs.length ? h('section.card', h('div.card-title', h('h2', 'Also worth doing')), h('ul.list', recs.map(function (r) { return h('li', h('a', { href: '#' + r.route }, r.title), h('div.small.muted', r.why)); }))) : null;
    void s;
    return h('div.stack', head, body, h('div.grid.grid-2', week, more));
  });
})();
