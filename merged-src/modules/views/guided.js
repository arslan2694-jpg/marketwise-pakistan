
/* Guided study modes: 45-minute crash course, 90-minute revision, 3-hour deep study.
   Countdown, current section, completion track, previous / next / skip, pause / resume — saved locally. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var ORDER = ['crash45', 'revision90', 'deep180'];

  IFL.route('/guided', function () {
    return Promise.resolve({ studyPlans: IFL.data.plans }).then(function (r) {
      return h('div', C.pageHead({ eyebrow: 'Guided study', title: 'Guided study modes', desc: 'Timed, structured sessions built from the course content. Progress within a session is saved so you can pause and resume.' }),
        h('div.grid.grid-3', ORDER.map(function (id) {
          var p = r.studyPlans[id], g = IFL.store.state.guided[id];
          return h('a.card.card-link', { href: '#/guided/' + id }, h('h3', p.title), h('p.small.text-2', p.intro), h('div.small.muted', p.segments.length + ' sections · ' + p.minutes + ' min · ' + (p.roadmap || []).length + '-stage roadmap'),
            g ? h('div.small', { style: { marginTop: '6px' } }, g.finished ? h('span.badge.ok', 'Completed') : h('span.badge.gold', 'In progress — section ' + (g.seg + 1))) : null);
        })));
    });
  });

  IFL.route('/guided/:plan', function (ctx) {
    var pid = IFL.data.canonicalPlan(ctx.params.plan);
    var plan = pid && IFL.data.plans[pid];
    if (!plan) throw new Error('Unknown study plan');
    ctx.params.plan = pid;
    return Promise.resolve(player(ctx, plan, { concepts: IFL.data.concepts, diagrams: IFL.data.diagrams, comparisons: { pairs: IFL.data.comparisons } }));
  }, { wide: false });

  function findTopic(id) { return IFL.data.topic(id) || null; }

  function player(ctx, plan, R) {
    var id = ctx.params.plan;
    var saved = IFL.store.state.guided[id];
    var fresh = !saved || saved.finished || ctx.query.restart;
    var st = fresh ? { seg: 0, remaining: plan.minutes * 60, segRemaining: (plan.segments[0].end - plan.segments[0].start) * 60, paused: true, started: Date.now() } : Object.assign({}, saved, { paused: true });
    function persist() { IFL.store.update(function (s) { s.guided[id] = Object.assign({}, st, { updated: Date.now() }); }, 'guided'); }
    if (fresh) persist();
    var cdTotal = h('div.countdown', { 'aria-label': 'Time remaining' });
    var cdSeg = h('div.small.muted.tabular');
    var title = h('div', { style: { fontWeight: 700 } });
    var track = h('div.seg-track', plan.segments.map(function (s) { return h('span', { style: { '--w': s.end - s.start } }); }));
    var pauseB = h('button.btn.primary', { type: 'button', onclick: function () { st.paused = !st.paused; drawBar(); persist(); } });
    var prevB = h('button.btn', { type: 'button', 'aria-label': 'Previous section', onclick: function () { goto(st.seg - 1); } }, u.svg('left'), 'Previous');
    var nextB = h('button.btn', { type: 'button', 'aria-label': 'Next section', onclick: function () { goto(st.seg + 1); } }, 'Next', u.svg('right'));
    var skipB = h('button.btn.ghost', { type: 'button', title: 'Skip this section', onclick: function () { goto(st.seg + 1, true); } }, u.svg('skip'), 'Skip');
    var content = h('div.stack');
    var bar = h('div.guided-bar', h('div', cdTotal, cdSeg), h('div', title, track), h('div.row', prevB, pauseB, nextB, skipB));

    function drawBar() {
      cdTotal.textContent = u.clock(st.remaining);
      var seg = plan.segments[st.seg];
      cdSeg.textContent = 'Section ' + (st.seg + 1) + '/' + plan.segments.length + ' · ' + (st.segRemaining > 0 ? u.clock(st.segRemaining) + ' left in section' : 'section time used — move on when ready');
      title.textContent = seg.start + '–' + seg.end + ' min · ' + seg.title;
      Array.prototype.forEach.call(track.children, function (s, j) { s.className = j < st.seg ? 'done' : j === st.seg ? 'cur' : ''; });
      pauseB.innerHTML = ''; u.append(pauseB, [u.svg(st.paused ? 'play' : 'pause'), st.paused ? (st.remaining === plan.minutes * 60 ? 'Start' : 'Resume') : 'Pause']);
      prevB.disabled = st.seg === 0;
      nextB.lastChild.previousSibling.textContent = st.seg === plan.segments.length - 1 ? 'Finish' : 'Next';
    }
    function goto(k, skipped) {
      if (k >= plan.segments.length) return finish();
      st.seg = Math.max(0, k);
      var seg = plan.segments[st.seg];
      st.segRemaining = (seg.end - seg.start) * 60;
      persist(); drawBar(); drawContent();
      window.scrollTo(0, 0);
      if (skipped) u.toast('Section skipped');
    }
    function finish() {
      st.finished = true; st.paused = true; persist(); clearInterval(tick);
      IFL.progress.log('guided', plan.title + ' completed', '/guided/' + id);
      IFL.progress.checkAchievements();
      content.innerHTML = '';
      content.appendChild(h('section.card', { style: { textAlign: 'center' } }, h('h2', plan.title + ' complete'),
        h('p', 'You worked through all ' + plan.segments.length + ' sections' + (st.remaining > 0 ? ' with ' + u.clock(st.remaining) + ' to spare' : '') + '.'),
        h('div.row', { style: { justifyContent: 'center' } }, h('a.btn.primary', { href: '#/practice' }, 'Adaptive practice'), h('a.btn', { href: '#/' }, 'Dashboard'), h('a.btn', { href: '#/guided/' + id + '?restart=1' }, 'Restart'))));
      bar.style.display = 'none';
    }
    function item(it) {
      if (it.type === 'concept') { var c = R.concepts.filter(function (x) { return x.id === it.ref; })[0]; return c ? C.conceptCard(c) : null; }
      if (it.type === 'topic') {
        var t = findTopic(it.ref); if (!t) return null;
        var body = it.level === 'exam' ? h('div.callout.gold', h('div.t', 'Exam summary'), h('p', t.examExplanation)) : it.level === 'simple' ? h('p', t.simpleExplanation) : h('div', (t.academicExplanation || [t.simpleExplanation]).map(function (p) { return h('p', p); }));
        return h('section.card', h('div.eyebrow', IFL.course.sourceLabel(t.id)), h('h3', t.title), body, t.keyPoints && it.level !== 'exam' ? h('ul', t.keyPoints.map(function (k) { return h('li', k); })) : null, h('a.small', { href: '#/topic/' + t.id }, 'Open full lesson'));
      }
      if (it.type === 'diagram') { var d = R.diagrams.filter(function (x) { return x.id === it.ref; })[0]; return d ? h('section.card', h('h3', d.title), C.diagram(d, { hideRules: false })) : null; }
      if (it.type === 'compare') { var p = R.comparisons.pairs.filter(function (x) { return x.id === it.ref; })[0]; return p ? h('section', C.compareTable(p), p.topicId ? C.sourceFoot(p.topicId) : null) : null; }
      if (it.type === 'quiz') {
        var box = h('section.card', h('h3', 'Quick questions'));
        IFL.questionPool().then(function (all) {
          var qs = IFL.rankQuestions ? IFL.rankQuestions(all.filter(function (q) { return it.topics.indexOf(q.topicId) > -1; })).map(function (x) { return x.q; }) : all;
          var picked = [], seenTopic = {};
          qs.forEach(function (q) { if (picked.length < it.n && !seenTopic[q.topicId]) { picked.push(q); seenTopic[q.topicId] = 1; } });
          qs.forEach(function (q) { if (picked.length < it.n && picked.indexOf(q) < 0) picked.push(q); });
          box.appendChild(IFL.quizRunner(picked, { label: plan.title + ' — ' + plan.segments[st.seg].title, mode: 'guided' }));
        });
        return box;
      }
      if (it.type === 'flashcards') {
        var fbox = h('section.card', h('h3', 'Flashcards'));
        IFL.allCards().then(function (cards) { var deck = IFL.srs.order(cards.filter(function (c) { return it.topics.indexOf(c.topicId) > -1; })).slice(0, it.n); fbox.appendChild(IFL.flashSession(deck)); });
        return fbox;
      }
      return null;
    }
    function drawContent() {
      content.innerHTML = '';
      var seg = plan.segments[st.seg];
      content.appendChild(h('div', h('div.eyebrow', 'Section ' + (st.seg + 1) + ' · ' + (seg.end - seg.start) + ' minutes'), h('h2', seg.title)));
      seg.items.forEach(function (it) { var e = item(it); if (e) content.appendChild(e); });
      content.appendChild(h('div.row', h('button.btn.primary', { type: 'button', onclick: function () { goto(st.seg + 1); } }, st.seg === plan.segments.length - 1 ? 'Finish session' : 'Next section: ' + (plan.segments[st.seg + 1] || {}).title, u.svg('right'))));
    }
    var tick = setInterval(function () {
      if (st.paused || st.finished) return;
      st.remaining = Math.max(0, st.remaining - 1); st.segRemaining = Math.max(0, st.segRemaining - 1);
      if (st.segRemaining === 0 && !st._warned) { st._warned = st.seg; u.toast('Time for this section is up'); }
      if (st.remaining === 0) { st.paused = true; u.toast('Session time is over — finish at your own pace.'); }
      drawBar();
      if (st.remaining % 10 === 0) persist();
    }, 1000);
    ctx.onLeave(function () { clearInterval(tick); st.paused = true; persist(); });
    drawBar(); drawContent();
    var roadmap = plan.roadmap && plan.roadmap.length ? h('details.acc', h('summary', 'Study roadmap · ' + plan.roadmapTitle, h('span.badge', plan.roadmap.length + ' stages')),
      h('div.acc-body', h('p.small.muted', 'A time-boxed outline of the whole syllabus for this session length. The player below works through the same ground with lessons, diagrams, comparisons, flashcards and questions.'),
        h('ol.steps', plan.roadmap.map(function (r) {
          return h('li', h('strong', r.startMin + '–' + r.endMin + ' min · ' + r.label + ': '), r.summary, ' ',
            (r.chapters || []).map(function (n) { return h('a.chip', { href: '#/chapter/' + n }, 'Ch ' + n); }), r.comparisons ? h('a.chip', { href: '#/compare' }, 'Comparison lab') : null);
        })))) : null;
    return h('div', C.pageHead({ crumbs: [{ label: 'Guided study', route: '/guided' }, { label: plan.title }], eyebrow: 'Guided study', title: plan.title, desc: plan.intro }), roadmap, bar, content);
  }
})();

