/* Learn: all chapters, parts, and the chapter page. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var DIFF_BADGE = { Foundational: 'ok', Intermediate: 'info', Advanced: 'gold' };

  function chapterCard(c) {
    var cp = IFL.progress.chapterProgress(c.n);
    return h('a.card.card-link.chapter-card', { href: '#/chapter/' + c.n },
      h('div.row.between', h('span.num', String(c.n)), h('span.badge.' + (DIFF_BADGE[c.difficulty] || ''), c.difficulty)),
      h('h3', c.title),
      h('div.meta', h('span', 'pp. ' + c.pages[0] + '–' + c.pages[1]), h('span', '· ~' + c.minutes + ' min'), h('span.spacer'), h('span.tabular', cp.done + '/' + cp.total)),
      C.bar(cp.pct, 'thin'));
  }

  function learn(ctx) {
    var partId = ctx.params.part;
    var parts = IFL.course.parts.filter(function (p) { return !partId || p.id === partId; });
    if (!parts.length) throw new Error('Unknown part');
    var o = IFL.progress.overall();
    return h('div',
      C.pageHead({ eyebrow: 'Learn', title: partId ? parts[0].title : 'All chapters', desc: partId ? null : 'The course follows the textbook\'s three parts and eighteen chapters. Topics correspond to the book\'s own sections.',
        actions: [h('div.seg', { role: 'group', 'aria-label': 'Filter by part' }, [h('a.btn.sm' + (!partId ? '.on' : ''), { href: '#/learn' }, 'All')].concat(IFL.course.parts.map(function (p) { return h('a.btn.sm' + (p.id === partId ? '.on' : ''), { href: '#/learn/' + p.id }, p.id.replace('part-', 'Part ').toUpperCase().replace('PART', 'Part')); })))] }),
      !partId ? h('div.card', { style: { marginBottom: '20px' } }, h('div.row.between', h('strong', 'Course completion'), h('span.tabular', o.done + ' / ' + o.total + ' topics')), C.bar(o.pct)) : null,
      parts.map(function (p) {
        var pp = IFL.progress.partProgress(p.id);
        return h('section', { style: { marginBottom: '28px' }, 'aria-labelledby': 'part-' + p.id },
          h('div.row.between', { style: { marginBottom: '12px' } }, h('h2#part-' + p.id, { style: { margin: 0 } }, p.title), h('span.small.muted.tabular', pp.done + '/' + pp.total + ' topics')),
          h('div.grid.grid-auto', p.chapters.map(function (n) { return chapterCard(IFL.course.chapter(n)); })));
      }));
  }
  IFL.route('/learn', learn);
  IFL.route('/learn/:part', learn);

  IFL.route('/chapter/:n', function (ctx) {
    var n = Number(ctx.params.n);
    var meta = IFL.course.chapter(n);
    if (!meta) throw new Error('Chapter ' + ctx.params.n + ' does not exist');
    return Promise.all([window.IFL_DATA.loadChapter(n), window.IFL_DATA.load(['concepts'])]).then(function (r) { var ch = r[0];
      IFL.progress.visitChapter(n);
      var tab = ctx.query.tab || 'overview';
      var cp = IFL.progress.chapterProgress(n);
      var firstOpen = ch.topics.filter(function (t) { return !IFL.progress.isComplete(t.id); })[0] || ch.topics[0];
      var anyVisited = cp.visited > 0;
      var head = h('header.card',
        C.crumbs([{ label: 'Learn', route: '/learn' }, { label: IFL.course.partTitle(ch.part).split(' — ')[0], route: '/learn/' + ch.part }, { label: 'Chapter ' + n }]),
        h('div.row', { style: { alignItems: 'flex-start', gap: '20px' } },
          h('div', { style: { flex: 1, minWidth: '260px' } },
            h('div.eyebrow', 'Chapter ' + n + ' · ' + IFL.course.partTitle(ch.part).split(' — ')[1]),
            h('h1', ch.title),
            h('div.row.small', h('span.badge.' + (DIFF_BADGE[ch.difficulty] || ''), ch.difficulty), h('span.badge', '~' + ch.minutes + ' min'), h('span.badge', 'Textbook pp. ' + ch.pages[0] + '–' + ch.pages[1]), h('span.badge', ch.topics.length + ' topics'))),
          h('div', { style: { textAlign: 'center' } }, C.ring(cp.pct, 96, 'Chapter completion'), h('div.small.muted', cp.done + '/' + cp.total + ' complete'))),
        h('div.row', { style: { marginTop: '14px' } },
          h('a.btn.primary', { href: '#/topic/' + firstOpen.id }, u.svg('play'), cp.pct === 100 ? 'Review chapter' : anyVisited ? 'Continue' : 'Start chapter'),
          h('a.btn', { href: '#/teach/' + firstOpen.id }, u.svg('teach'), 'Teach me'),
          h('a.btn', { href: '#/quiz/run?chapter=' + n }, u.svg('quiz'), 'Chapter quiz'),
          h('a.btn', { href: '#/flashcards/review?chapter=' + n }, u.svg('cards'), 'Flashcards'),
          C.bookmarkBtn({ type: 'chapter', id: String(n), label: 'Chapter ' + n + ': ' + ch.title, route: '/chapter/' + n }),
          C.noteBtn({ type: 'chapter', id: String(n), label: 'Chapter ' + n, route: '/chapter/' + n })));

      var tabs = [['overview', 'Overview'], ['topics', 'Topics'], ['aids', 'Study aids'], ['practice', 'Practice'], ['summary', 'Summary']];
      var tabBar = h('div.seg', { role: 'tablist', 'aria-label': 'Chapter sections', style: { margin: '18px 0' } }, tabs.map(function (t) {
        return h('button', { type: 'button', role: 'tab', 'aria-selected': String(t[0] === tab), 'aria-pressed': String(t[0] === tab), onclick: function () { IFL.go('/chapter/' + n + '?tab=' + t[0]); } }, t[1]);
      }));
      var body = ({ overview: overview, topics: topics, aids: aids, practice: practice, summary: summary })[tab] || overview;
      return h('div', head, tabBar, h('div', { role: 'tabpanel' }, body(ch)));
    });
  }, { wide: false });

  function overview(ch) {
    var concepts = {};
    ch.topics.forEach(function (t) { (t.concepts || []).forEach(function (k) { concepts[k] = (concepts[k] || 0) + 1; }); });
    var tags = Object.keys(concepts).sort(function (a, b) { return concepts[b] - concepts[a]; });
    return h('div.stack',
      h('div.grid.grid-2',
        h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Learning objectives'), h('ol', ch.objectives.map(function (o) { return h('li', o); }))),
        h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Why this chapter matters'), h('p', ch.why), h('h3.small.muted', 'Overview'), h('p.text-2', ch.overview))),
      h('section.card', h('div.card-title', h('h2', 'Concepts in this chapter'), h('a.btn.sm', { href: '#/concepts' }, 'Open concept map')),
        h('p.small.muted', 'Ordered by how many of the chapter\'s topics use each concept. Linked concepts have full revision cards.'),
        IFL.conceptChips(tags)),
      h('section.card', h('div.card-title', h('h2', 'Chapter map')), topicsList(ch, true)));
  }
  function topicsList(ch, compact) {
    return h('ul.topic-list', ch.topics.map(function (t) {
      var done = IFL.progress.isComplete(t.id), vis = IFL.progress.isVisited(t.id);
      var acc = IFL.progress.topicAccuracy(t.id);
      return h('li', h('a', { href: '#/topic/' + t.id },
        h('span.status-dot.' + (done ? 'done' : vis ? 'visited' : 'none'), { 'aria-label': done ? 'Completed' : vis ? 'Opened' : 'Not started', role: 'img' }),
        h('span.sec', t.section === 'Appendix' ? 'App.' : t.section),
        h('span', t.title, compact ? null : h('div.small.muted', t.intuition)),
        h('span.row', acc.pct != null ? h('span.badge.' + (acc.pct >= 70 ? 'ok' : 'warn'), acc.pct + '%') : null, C.tier(t.tier))));
    }));
  }
  function topics(ch) { return h('section.card', h('p.small.muted', 'A topic is marked complete only when you press “Mark complete” on its page.'), topicsList(ch, false)); }

  function aids(ch) {
    var defs = [], principles = [], conds = [], steps = [], examples = [], dist = [], conf = [], tables = [], debates = [], calcs = [];
    ch.topics.forEach(function (t) {
      (t.definitions || []).forEach(function (d) { defs.push([d, t]); });
      (t.principles || []).forEach(function (p) { principles.push([p, t]); });
      (t.conditions || []).forEach(function (p) { conds.push([p, t]); });
      if (t.steps && t.steps.length) steps.push(t);
      (t.examples || []).forEach(function (e) { examples.push([e, t]); });
      (t.distinctions || []).forEach(function (d) { dist.push([d, t]); });
      (t.confusions || []).forEach(function (d) { conf.push([d, t]); });
      if (t.table) tables.push(t);
      (t.debate || []).forEach(function (d) { debates.push([d, t]); });
      if (t.calc) calcs.push(t);
    });
    function src(t) { return h('a.small', { href: '#/topic/' + t.id }, '§' + t.section); }
    function block(title, content, count) { return count ? h('details.acc', { open: title === 'Important definitions' }, h('summary', title, h('span.badge', String(count))), h('div.acc-body', content)) : null; }
    return h('div',
      block('Important definitions', h('dl', defs.map(function (x) { return h('div.def', h('dt', x[0].term, ' ', src(x[1])), h('dd', x[0].meaning)); })), defs.length),
      block('Key principles', h('ul', principles.map(function (x) { return h('li', x[0], ' ', src(x[1])); })), principles.length),
      block('Rules and conditions', h('ul', conds.map(function (x) { return h('li', x[0], ' ', src(x[1])); })), conds.length),
      block('Step-by-step processes', steps.map(function (t) { return h('div', { style: { marginBottom: '14px' } }, h('h4', '§' + t.section + ' ' + t.title), h('ol.steps', t.steps.map(function (s) { return h('li', s); }))); }), steps.length),
      block('Tables from the chapter', tables.map(function (t) { return h('div', C.table(t.table), h('div.small', src(t))); }), tables.length),
      block('Examples', examples.map(function (x) { return h('div', C.example(x[0]), h('div.small', src(x[1]))); }), examples.length),
      block('Distinctions and comparisons', dist.map(function (x) { return h('div.callout.info', h('div.t', x[0].a + ' vs ' + x[0].b, ' ', src(x[1])), h('p', x[0].text)); }), dist.length),
      block('Common confusions', conf.map(function (x) { return h('div', { style: { marginBottom: '10px' } }, h('div.confusion', h('div.wrong', h('div.lbl', 'Misconception'), x[0].wrong), h('div.right', h('div.lbl', 'Correct view'), x[0].right)), h('div.small', src(x[1]))); }), conf.length),
      block('Arguments, criticism and responses', debates.map(function (x) { return h('div', C.debate(x[0]), h('div.small', src(x[1]))); }), debates.length),
      block('Calculations', calcs.map(function (t) { return h('div', { style: { marginBottom: '12px' } }, IFL.calc(t.calc.type, t.calc.note), h('div.small', src(t))); }), calcs.length),
      !(defs.length + principles.length + conds.length + steps.length + examples.length) ? C.empty('No study aids', 'This chapter has no extracted aids.') : null);
  }

  function practice(ch) {
    return h('div.stack',
      h('div.grid.grid-3',
        h('a.card.card-link', { href: '#/quiz/run?chapter=' + ch.number }, h('h3', u.svg('quiz'), ' Chapter quiz'), h('p.small.text-2', ch.questions.length + ' questions plus ' + ch.topics.filter(function (t) { return t.quickCheck; }).length + ' quick checks, mixed types.')),
        h('a.card.card-link', { href: '#/flashcards/review?chapter=' + ch.number }, h('h3', u.svg('cards'), ' Flashcards'), h('p.small.text-2', ch.flashcards.length + ' cards with spaced review.')),
        h('a.card.card-link', { href: '#/exam/trainer?chapter=' + ch.number }, h('h3', u.svg('exam'), ' Exam questions'), h('p.small.text-2', ch.exam.length + ' long, short, scenario and viva questions with answer structures.'))),
      h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Quick revision — exam-level summary of each topic'),
        h('div', ch.topics.map(function (t) { return h('div.def', h('dt', h('a', { href: '#/topic/' + t.id }, '§' + t.section + ' ' + t.title)), h('dd', t.exam)); }))),
      h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Exam questions in this chapter'),
        h('ul.list', ch.exam.map(function (e) { return h('li', h('span.badge', e.kind), ' ', e.q, ' ', h('a.small', { href: '#/exam/trainer?id=' + e.id }, 'Practise')); }))));
  }

  function summary(ch) {
    var key = 'chk-' + ch.number;
    var st = IFL.store.state.exam[key] || {};
    return h('div.stack',
      h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Chapter summary'), h('p', ch.summary),
        ch.summarySection ? h('p.small.muted', 'Based on the textbook\'s own Section ' + ch.summarySection + ' and the chapter content.') : null),
      h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Key takeaways'), h('ol', ch.takeaways.map(function (t) { return h('li', t); }))),
      h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Exam checklist'), h('p.small.muted', 'Tick what you can do confidently. Saved on this device.'),
        h('div.stack', ch.checklist.map(function (c, i) {
          var cb = h('input', { type: 'checkbox', id: key + '-' + i, checked: !!st[i] });
          cb.addEventListener('change', function () { IFL.store.update(function (s) { s.exam[key] = s.exam[key] || {}; s.exam[key][i] = cb.checked; }); });
          return h('label.check', { for: key + '-' + i }, cb, c);
        }))),
      h('div.row', h('a.btn.primary', { href: '#/quiz/run?chapter=' + ch.number }, 'Take the chapter quiz'), h('a.btn', { href: '#/chapter/' + ch.number + '/print' }, u.svg('download'), 'Printable revision sheet'), ch.number < 18 ? h('a.btn', { href: '#/chapter/' + (ch.number + 1) }, 'Next chapter', u.svg('right')) : null));
  }

  /* Concept chips: known concepts link to concept pages, others to search. */
  IFL.conceptChips = function (tags) {
    var known = (window.IFL_DATA.sets.concepts || []);
    var map = {}; known.forEach(function (c) { c.tags.forEach(function (t) { map[t] = map[t] || c; }); });
    var seen = {};
    return h('div.row', tags.map(function (k) {
      var c = map[k];
      if (c) { if (seen[c.id]) return null; seen[c.id] = 1; return h('a.chip', { href: '#/concept/' + c.id }, u.svg('star'), c.name); }
      return h('a.chip', { href: '#/search?q=' + encodeURIComponent(k.replace(/-/g, ' ')) }, k.replace(/-/g, ' '));
    }));
  };
})();
