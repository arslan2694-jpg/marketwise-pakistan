/* Exam-date planner: spreads the unfinished topics over the days left before the exam and
   keeps the final days for revision. It is recomputed from real progress every time, so it
   adapts when you get ahead or fall behind. Stored locally: settings.examDate only. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var H2 = { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' };
  var DAY = 864e5;

  function parseDate(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null; }
  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function fmt(d) { return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }); }

  /* Build the plan. Returns null when no valid future exam date is set. */
  function buildPlan() {
    var exam = parseDate(IFL.store.state.settings.examDate);
    if (!exam) return null;
    var t0 = today(), daysLeft = Math.round((exam - t0) / DAY);
    if (daysLeft < 0) return { past: true, exam: exam };
    var remaining = [];
    IFL.course.chapters.forEach(function (c) {
      var per = c.minutes / c.topics.length;
      c.topics.forEach(function (t) { if (!IFL.progress.isComplete(t[0])) remaining.push({ id: t[0], section: t[1], title: t[2], chapter: c.n, minutes: per }); });
    });
    var total = remaining.reduce(function (a, r) { return a + r.minutes; }, 0);
    // Study days are today … the day before the exam; keep about a fifth (1–3 days) for revision.
    var studyDays = daysLeft, revision = daysLeft >= 5 ? Math.min(3, Math.max(1, Math.round(daysLeft * 0.2))) : daysLeft >= 2 ? 1 : 0;
    var learnDays = Math.max(1, studyDays - revision);
    var perDay = total / learnDays, days = [], cum = 0;
    for (var d = 0; d < learnDays; d++) days.push({ date: new Date(t0.getTime() + d * DAY), kind: 'learn', topics: [], minutes: 0 });
    remaining.forEach(function (r) { // assign by the cumulative midpoint, so each day gets about perDay minutes in book order
      var idx = Math.min(learnDays - 1, Math.floor((cum + r.minutes / 2) / perDay)); cum += r.minutes;
      days[idx].topics.push(r); days[idx].minutes += r.minutes;
    });
    days = days.filter(function (x) { return x.topics.length; });
    days.forEach(function (x) { x.minutes = Math.round(x.minutes); });
    var firstRev = Math.max(days.length, studyDays - revision);
    for (var r = 0; r < revision; r++) days.push({ date: new Date(t0.getTime() + (firstRev + r) * DAY), kind: r === revision - 1 ? 'mock' : 'revise', topics: [], minutes: 0 });
    return { exam: exam, daysLeft: daysLeft, remaining: remaining.length, totalMinutes: Math.round(total), perDay: Math.round(perDay), days: days, revision: revision };
  }
  IFL.buildPlan = buildPlan;

  function chaptersOf(topics) {
    var m = {}; topics.forEach(function (t) { (m[t.chapter] = m[t.chapter] || []).push(t); });
    return Object.keys(m).map(function (k) { var ts = m[k]; return 'Ch ' + k + ' §' + ts[0].section + (ts.length > 1 ? '–' + ts[ts.length - 1].section : ''); }).join(', ');
  }

  function todayCard(plan) {
    var s = IFL.store.state, due = IFL.srs.dueCount();
    var mistakes = Object.keys(s.answers).filter(function (k) { return s.answers[k].lastCorrect === false; }).length;
    var d = plan.days[0];
    var items = [];
    if (d && d.kind === 'learn') d.topics.forEach(function (t) { items.push(h('li', h('a', { href: '#/topic/' + t.id }, 'Ch ' + t.chapter + ' §' + t.section + ' ' + IFL.trunc(t.title, 60)), h('span.muted.small', ' · ~' + Math.round(t.minutes) + ' min'))); });
    if (d && d.kind === 'revise') items.push(h('li', h('a', { href: '#/revision-cards' }, 'Rapid revision cards'), ' and ', h('a', { href: '#/exam' }, 'exam centre'), h('span.muted.small', ' · revision day')));
    if (d && d.kind === 'mock') items.push(h('li', h('a', { href: '#/mock/run?n=50&min=60&label=Full%20mock' }, 'Full timed mock exam'), h('span.muted.small', ' · last day before the exam')));
    if (due) items.push(h('li', h('a', { href: '#/flashcards/review' }, due + ' flashcard' + (due > 1 ? 's' : '') + ' due')));
    if (mistakes) items.push(h('li', h('a', { href: '#/mistakes' }, mistakes + ' open mistake' + (mistakes > 1 ? 's' : '') + ' to retry')));
    return h('section.card', h('h2', { style: H2 }, 'Today'), items.length ? h('ul.list', items) : h('p.muted', 'Nothing left for today. Everything is complete, so use the time for a mock exam.'));
  }

  IFL.route('/planner', function () {
    var st = IFL.store.state.settings;
    var input = h('input.input', { id: 'exam-date', type: 'date', value: st.examDate || '', min: u.dayKey(), style: { maxWidth: '200px' } });
    var save = h('button.btn.primary', { type: 'button', onclick: function () {
      if (input.value && !parseDate(input.value)) { u.toast('Choose a valid date'); return; }
      IFL.store.update(function (s) { s.settings.examDate = input.value || ''; });
      u.toast(input.value ? 'Exam date saved' : 'Exam date cleared'); IFL.refresh();
    } }, 'Save exam date');
    var clear = st.examDate ? h('button.btn', { type: 'button', onclick: function () { IFL.store.update(function (s) { s.settings.examDate = ''; }); IFL.refresh(); } }, 'Clear') : null;
    var head = C.pageHead({ eyebrow: 'Guided study', title: 'Exam planner', desc: 'Set your exam date. The planner spreads the topics you have not yet completed over the days left, in book order, and keeps the final days for revision and a mock exam. It recalculates from your real progress each time you open it.' });
    var form = h('section.card', h('div.row', h('label.small', { for: 'exam-date' }, 'Exam date'), input, save, clear));
    var plan = buildPlan();
    if (!plan) return h('div', head, form, C.empty('No exam date set', 'Choose the date of your exam above to get a day-by-day plan.'));
    if (plan.past) return h('div', head, form, C.empty('That date has passed', 'Set the date of your next exam.'));
    var goal = st.dailyGoal || 30, heavy = plan.perDay > goal * 1.5;
    var summary = h('div.grid.grid-4.stats-grid',
      h('div.card', C.stat(plan.daysLeft, plan.daysLeft === 1 ? 'day left' : 'days left')),
      h('div.card', C.stat(plan.remaining, 'topics to complete')),
      h('div.card', C.stat(u.fmtDuration(plan.totalMinutes * 60), 'estimated study')),
      h('div.card', C.stat(plan.remaining ? '~' + plan.perDay + ' min' : '—', 'per learning day')));
    var warn = !plan.remaining ? h('div.callout.info', h('div.t', 'All topics complete'), h('p', 'Every topic is marked complete. Spend the remaining days on revision cards, your mistakes and timed mocks.'))
      : heavy ? h('div.callout.bad', h('div.t', 'Tight schedule'), h('p', 'The plan needs about ' + plan.perDay + ' minutes a day, well above your daily goal of ' + goal + ' minutes. Consider the 45-minute crash course and rapid revision cards to prioritise core topics.')) : null;
    var table = h('div.table-wrap', h('table', h('thead', h('tr', h('th', 'Day'), h('th', 'Plan'), h('th', 'Time'))),
      h('tbody', plan.days.map(function (d, i) {
        var what = d.kind === 'learn' ? chaptersOf(d.topics) + ' (' + d.topics.length + ' topic' + (d.topics.length > 1 ? 's' : '') + ')' : d.kind === 'mock' ? 'Full timed mock exam, then review mistakes' : 'Revision: rapid revision cards, flashcards due, my mistakes';
        return h('tr' + (i === 0 ? '.current' : ''), h('td', i === 0 ? h('strong', 'Today') : fmt(d.date)), h('td', what), h('td.tabular', d.kind === 'learn' ? '~' + d.minutes + ' min' : '—'));
      }))));
    return h('div', head, form, summary, warn, h('div.grid.grid-2', todayCard(plan), h('section.card', h('h2', { style: H2 }, 'How the plan works'),
      h('ul.small', h('li', 'Minutes per topic are the chapter’s estimated study time divided by its topics.'), h('li', 'Topics you mark complete drop out, and the rest is spread again.'), h('li', 'The last ' + (plan.revision || 0) + ' day' + (plan.revision === 1 ? '' : 's') + ' are kept for revision and a mock exam.'), h('li', 'Nothing is sent anywhere; only the exam date is saved on this device.')))),
      h('section.card', h('h2', { style: H2 }, 'Day-by-day schedule'), table));
  });
})();
