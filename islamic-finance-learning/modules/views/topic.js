/* Topic lesson (three levels + "Explain again") and the guided "Teach me" mode. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var LEVELS = [['beginner', 'Beginner'], ['mba', 'MBA'], ['exam', 'Exam']];

  function loadTopic(id) {
    var meta = IFL.course.topic(id);
    if (!meta) return Promise.reject(new Error('Topic ' + id + ' not found'));
    return Promise.all([window.IFL_DATA.loadChapter(meta.chapter), window.IFL_DATA.load(['concepts'])]).then(function (r) {
      var ch = r[0], t = ch.topics.filter(function (x) { return x.id === id; })[0];
      if (!t) throw new Error('Topic data missing for ' + id);
      return { ch: ch, t: t, meta: meta };
    });
  }
  IFL.loadTopic = loadTopic;

  function sectionCard(title, content, opts) {
    if (!content || (Array.isArray(content) && !content.length)) return null;
    return h('section.card' + (opts && opts.cls ? '.' + opts.cls : ''), h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, title), content);
  }
  function list(items, ordered) { return items && items.length ? h(ordered ? 'ol' : 'ul', items.map(function (x) { return h('li', x); })) : null; }

  function levelBody(t, level) {
    if (level === 'beginner') return h('div', h('p', t.simple), t.keyPoints && t.keyPoints.length ? h('div.callout', h('div.t', 'Remember'), list(t.keyPoints)) : null);
    if (level === 'exam') return h('div', h('div.callout.gold', h('div.t', 'Exam answer'), h('p', t.exam)), t.keyPoints && t.keyPoints.length ? list(t.keyPoints) : null);
    return h('div', (t.academic || [t.simple]).map(function (p) { return h('p', p); }), t.keyPoints && t.keyPoints.length ? h('div.callout', h('div.t', 'Key points'), list(t.keyPoints)) : null);
  }
  function explainAgain(t, mode) {
    if (mode === 'simple') return h('div', h('p.intuition', t.intuition), h('p', t.simple));
    if (mode === 'example') {
      var ex = (t.examples || []).map(C.example);
      if (!ex.length && t.steps && t.steps.length) ex.push(h('div', h('p', 'The textbook describes this as a sequence of steps:'), h('ol.steps', t.steps.map(function (s) { return h('li', s); }))));
      if (!ex.length && t.subsections && t.subsections.length) ex.push(h('div', h('p', 'The section is organised into these parts:'), h('ul', t.subsections.map(function (s) { return h('li', h('strong', s.number + ' ' + s.title), s.points && s.points.length ? ': ' + s.points.join('; ') : ''); }))));
      return ex.length ? h('div', ex) : h('p.muted', 'The textbook does not give a worked example for this section. Try "Explain the difference" or the related topics instead.');
    }
    if (mode === 'difference') {
      var parts = [];
      (t.distinctions || []).forEach(function (d) { parts.push(h('div.callout.info', h('div.t', d.a + ' vs ' + d.b), h('p', d.text))); });
      (t.confusions || []).forEach(function (c) { parts.push(h('div.confusion', h('div.wrong', h('div.lbl', 'Misconception'), c.wrong), h('div.right', h('div.lbl', 'Correct view'), c.right))); });
      if (t.table && !parts.length) parts.push(C.table(t.table));
      return parts.length ? h('div.stack', parts) : h('p.muted', 'No explicit contrast is drawn in this section. See the Comparison Lab for related modes.');
    }
    return h('div', h('div.callout.gold', h('div.t', 'For the exam'), h('p', t.exam)), t.keyPoints ? list(t.keyPoints) : null, t.definitions && t.definitions.length ? h('dl', t.definitions.map(function (d) { return h('div.def', h('dt', d.term), h('dd', d.meaning)); })) : null);
  }

  IFL.route('/topic/:id', function (ctx) {
    return loadTopic(ctx.params.id).then(function (d) {
      var t = d.t, ch = d.ch, meta = d.meta;
      IFL.progress.visitTopic(t.id);
      var level = IFL.store.state.settings.level || 'mba';
      var levelPanel = h('div', levelBody(t, level));
      var levelSeg = h('div.seg', { role: 'group', 'aria-label': 'Explanation level' }, LEVELS.map(function (l) {
        return h('button', { type: 'button', 'aria-pressed': String(l[0] === level), onclick: function () {
          level = l[0]; IFL.store.update(function (s) { s.settings.level = level; });
          Array.prototype.forEach.call(levelSeg.children, function (b, i) { b.setAttribute('aria-pressed', String(LEVELS[i][0] === level)); });
          levelPanel.innerHTML = ''; levelPanel.appendChild(levelBody(t, level));
        } }, l[1]);
      }));
      var againPanel = h('div', { 'aria-live': 'polite' });
      var againBtns = [['simple', 'Explain simply'], ['example', 'Explain with example'], ['difference', 'Explain the difference'], ['exam', 'Explain for exam']].map(function (m) {
        return h('button.btn.sm', { type: 'button', onclick: function () { againBtns.forEach(function (b) { b.classList.remove('on'); }); this.classList.add('on'); againPanel.innerHTML = ''; againPanel.appendChild(h('div.card.sunk', { style: { marginTop: '10px' } }, explainAgain(t, m[0]))); } }, m[1]);
      });

      var done = IFL.progress.isComplete(t.id);
      var completeBtn = h('button.btn' + (done ? '.on' : '.primary'), { type: 'button', onclick: function () {
        done = !done; IFL.progress.setComplete(t.id, done);
        completeBtn.className = 'btn ' + (done ? 'on' : 'primary'); completeBtn.lastChild.textContent = done ? 'Completed' : 'Mark complete';
        if (done) u.toast('Topic marked complete');
        refreshAside();
      } }, u.svg('check'), done ? 'Completed' : 'Mark complete');

      var qc = C.quickCheckQuestion(t);
      var next = IFL.course.nextTopic(t.id), prev = IFL.course.prevTopic(t.id);
      var bmItem = { type: 'topic', id: t.id, label: '§' + t.section + ' ' + t.title, route: '/topic/' + t.id };

      var main = h('div.lesson-body.stack',
        h('header',
          C.crumbs([{ label: 'Learn', route: '/learn' }, { label: 'Chapter ' + ch.number, route: '/chapter/' + ch.number }, { label: '§' + t.section }]),
          h('div.eyebrow', 'Chapter ' + ch.number + ' · ' + (t.section === 'Appendix' ? 'Appendix' : 'Section ' + t.section)),
          h('h1', t.title),
          h('div.row.small', C.tier(t.tier), h('span.badge', 'Textbook ' + C.pagesLabel(t.pages)), IFL.progress.topicAccuracy(t.id).pct != null ? h('span.badge.info', 'Your accuracy ' + IFL.progress.topicAccuracy(t.id).pct + '%') : null),
          h('p.intuition', t.intuition),
          h('div.row', completeBtn, h('a.btn', { href: '#/teach/' + t.id }, u.svg('teach'), 'Teach me'), C.bookmarkBtn(bmItem), C.noteBtn(bmItem))),
        h('div.level-switch', h('div.row.between', levelSeg, h('span.small.muted', 'Beginner · MBA · Exam'))),
        h('section.card', levelPanel,
          h('div', { style: { marginTop: '14px' } }, h('div.small.muted', 'Explain again'), h('div.row', againBtns)), againPanel,
          C.sourceFoot(t.id)),
        t.definitions && t.definitions.length ? sectionCard('Definitions', h('dl', t.definitions.map(function (x) { return h('div.def', h('dt', x.term), h('dd', x.meaning)); }))) : null,
        sectionCard('Conditions', list(t.conditions)),
        sectionCard('Principles', list(t.principles)),
        t.steps && t.steps.length ? sectionCard('Step by step', h('ol.steps', t.steps.map(function (s) { return h('li', s); }))) : null,
        t.subsections && t.subsections.length ? sectionCard('Sub-sections covered', h('div', t.subsections.map(function (s) { return h('div.def', h('dt', s.number + ' ' + s.title + (s.page ? ' (p. ' + s.page + ')' : '')), s.points && s.points.length ? h('dd', s.points.join(' · ')) : null); }))) : null,
        t.table ? h('section', C.table(t.table)) : null,
        t.examples && t.examples.length ? sectionCard('Examples', h('div', t.examples.map(C.example))) : null,
        t.calc ? sectionCard('Calculation', IFL.calc(t.calc.type, t.calc.note)) : null,
        (function () { var extra = Object.keys(IFL.calcTypes || {}).filter(function (k) { return IFL.calcTypes[k].topic === t.id && (!t.calc || t.calc.type !== k); });
          return extra.length ? sectionCard(t.calc ? 'More interactive tools' : 'Interactive tool', h('div.stack', extra.map(function (k) { return IFL.calc(k); }))) : null; })(),
        t.distinctions && t.distinctions.length ? sectionCard('Important distinctions', h('div', t.distinctions.map(function (x) { return h('div.callout.info', h('div.t', x.a + ' vs ' + x.b), h('p', x.text)); }))) : null,
        t.confusions && t.confusions.length ? sectionCard('Common confusions', h('div.stack', t.confusions.map(function (x) { return h('div.confusion', h('div.wrong', h('div.lbl', 'Misconception'), x.wrong), h('div.right', h('div.lbl', 'Correct view'), x.right)); }))) : null,
        t.debate && t.debate.length ? sectionCard('Arguments and the author\'s discussion', h('div', t.debate.map(C.debate))) : null,
        qc ? sectionCard('Quick check', C.question(qc, { showMeta: false })) : null,
        h('nav.row.between', { 'aria-label': 'Topic navigation' },
          prev ? h('a.btn', { href: '#/topic/' + prev.id }, u.svg('left'), '§' + prev.section) : h('span'),
          h('a.btn', { href: '#/chapter/' + ch.number + '?tab=topics' }, 'Chapter ' + ch.number + ' topics'),
          next ? h('a.btn.primary', { href: '#/topic/' + next.id }, '§' + next.section + ' ' + IFL.trunc(next.title, 26), u.svg('right')) : h('span')));

      var aside = h('aside.lesson-aside', { 'aria-label': 'Chapter navigation' });
      function refreshAside() {
        aside.innerHTML = '';
        var cp = IFL.progress.chapterProgress(ch.number);
        aside.appendChild(h('div.card', { style: { padding: '14px' } },
          h('div.row.between.small', h('a', { href: '#/chapter/' + ch.number }, h('strong', 'Chapter ' + ch.number)), h('span.tabular.muted', cp.done + '/' + cp.total)), C.bar(cp.pct, 'thin'),
          h('ul.topic-list', { style: { marginTop: '8px', maxHeight: '48vh', overflowY: 'auto' } }, ch.topics.map(function (x) {
            var a = h('a', { href: '#/topic/' + x.id, style: { gridTemplateColumns: '16px 1fr', padding: '5px 6px', fontSize: 'var(--fs-sm)' }, 'aria-current': x.id === t.id ? 'page' : null },
              h('span.status-dot.' + (IFL.progress.isComplete(x.id) ? 'done' : IFL.progress.isVisited(x.id) ? 'visited' : 'none'), { style: { width: '12px', height: '12px' } }),
              h('span', { style: x.id === t.id ? { fontWeight: 700, color: 'var(--accent)' } : null }, x.section + ' ' + IFL.trunc(x.title, 34)));
            return h('li', a);
          }))));
        if (t.related && t.related.length) aside.appendChild(h('div.card', { style: { padding: '14px' } }, h('div.small', h('strong', 'Related topics')),
          h('ul.small', { style: { margin: '6px 0 0', paddingLeft: '16px' } }, t.related.map(function (r) { var m = IFL.course.topic(r); return m ? h('li', h('a', { href: '#/topic/' + r }, '§' + m.section + ' ' + IFL.trunc(m.title, 40))) : null; }))));
        if (t.concepts && t.concepts.length) aside.appendChild(h('div.card', { style: { padding: '14px' } }, h('div.small', h('strong', 'Concepts')), IFL.conceptChips(t.concepts)));
      }
      refreshAside();
      return h('div.lesson', main, aside);
    });
  }, { wide: true });

  /* ---------- Teach me ---------- */
  IFL.route('/teach/:id', function (ctx) {
    return loadTopic(ctx.params.id).then(function (d) {
      var t = d.t, ch = d.ch;
      IFL.progress.visitTopic(t.id);
      var firstDef = (t.definitions || [])[0];
      var qc = C.quickCheckQuestion(t);
      var steps = [
        { k: 'What is this concept trying to solve?', body: function () { return h('div', h('p.intuition', t.intuition), h('p', t.simple)); } },
        { k: 'Core definition', body: function () { return firstDef ? h('dl', (t.definitions || []).map(function (x) { return h('div.def', h('dt', x.term), h('dd', x.meaning)); })) : h('p', (t.academic || [t.simple])[0]); } },
        { k: 'Structure', body: function () {
          if (t.steps && t.steps.length) return h('ol.steps', t.steps.map(function (s) { return h('li', s); }));
          if (t.subsections && t.subsections.length) return h('ul', t.subsections.map(function (s) { return h('li', h('strong', s.number + ' ' + s.title), s.points && s.points.length ? ' — ' + s.points.join('; ') : ''); }));
          if (t.table) return C.table(t.table);
          return h('div', (t.academic || []).slice(0, 2).map(function (p) { return h('p', p); }));
        } },
        { k: 'Conditions and rules', body: function () { var items = (t.conditions || []).concat(t.principles || []).concat(t.keyPoints || []); return items.length ? list(items) : h('p', (t.academic || [t.simple]).slice(-1)[0]); } },
        { k: 'Example', body: function () { return explainAgain(t, 'example'); } },
        { k: 'What makes it different?', body: function () { return explainAgain(t, 'difference'); } },
        { k: 'Common mistake', body: function () {
          if (t.confusions && t.confusions.length) return h('div.stack', t.confusions.map(function (x) { return h('div.confusion', h('div.wrong', h('div.lbl', 'Mistake'), x.wrong), h('div.right', h('div.lbl', 'Correct'), x.right)); }));
          if (t.debate && t.debate.length) return h('div', t.debate.map(C.debate));
          return h('div.callout.warn', h('div.t', 'Watch out'), h('p', 'Do not reduce this topic to a slogan — examiners reward the conditions and distinctions. Re-read the key points:'), list(t.keyPoints || []));
        } },
        { k: 'Quick question', body: function () { return qc ? C.question(qc, { showMeta: false }) : h('p.muted', 'No quick question for this section.'); } },
        { k: 'Exam answer', body: function () { return h('div', h('div.callout.gold', h('div.t', 'Model exam point'), h('p', t.exam)), C.sourceFoot(t.id)); } }
      ];
      var i = 0;
      var stage = h('div', { 'aria-live': 'polite' });
      var track = h('div.seg-track', steps.map(function () { return h('span'); }));
      var prevB = h('button.btn', { type: 'button', onclick: function () { go(i - 1); } }, u.svg('left'), 'Back');
      var nextB = h('button.btn.primary', { type: 'button', onclick: function () { if (i < steps.length - 1) go(i + 1); else finish(); } }, 'Next', u.svg('right'));
      function go(k) {
        i = Math.max(0, Math.min(steps.length - 1, k));
        stage.innerHTML = '';
        stage.appendChild(h('section.card', h('div.eyebrow', 'Step ' + (i + 1) + ' of ' + steps.length), h('h2', steps[i].k), steps[i].body()));
        Array.prototype.forEach.call(track.children, function (s, j) { s.className = j < i ? 'done' : j === i ? 'cur' : ''; });
        prevB.disabled = i === 0; nextB.lastChild.previousSibling.textContent = i === steps.length - 1 ? 'Finish lesson' : 'Next';
      }
      function finish() {
        IFL.progress.setComplete(t.id, true);
        var nx = IFL.course.nextTopic(t.id);
        stage.innerHTML = '';
        stage.appendChild(h('section.card', h('h2', 'Lesson complete'), h('p', '§' + t.section + ' ' + t.title + ' is marked complete.'),
          h('div.row', nx ? h('a.btn.primary', { href: '#/teach/' + nx.id }, 'Next lesson: §' + nx.section) : null, h('a.btn', { href: '#/topic/' + t.id }, 'Open full topic page'), h('a.btn', { href: '#/chapter/' + ch.number }, 'Chapter ' + ch.number))));
      }
      go(0);
      return h('div',
        C.pageHead({ crumbs: [{ label: 'Chapter ' + ch.number, route: '/chapter/' + ch.number }, { label: '§' + t.section, route: '/topic/' + t.id }, { label: 'Teach me' }], eyebrow: 'Teach me · guided lesson', title: t.title, desc: 'A tutor-style walk-through of this section in nine short steps, using only the course\'s textbook-derived content.' }),
        track, h('div', { style: { height: '12px' } }), stage,
        h('div.row', { style: { marginTop: '14px' } }, prevB, nextB, h('span.spacer'), h('a.btn.ghost', { href: '#/topic/' + t.id }, 'Exit to topic page')));
    });
  });
})();
