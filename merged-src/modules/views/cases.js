/* Case Study Lab: scenario → identify → choose concept/mode → analyse → reveal → why → rule → takeaway.
   One canonical case schema serves both kinds of case: cases with worked multiple-choice questions and
   cases with written analysis prompts and a textbook answer. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var KIND = { textbook: ['accent', 'Textbook case'], practice: ['gold', 'Practice — generated for learning'], scenario: ['info', 'Educational scenario'] };
  function kindBadge(c) { var k = KIND[c.kind] || KIND.scenario; return h('span.badge.' + k[0], k[1]); }

  IFL.route('/cases', function (ctx) {
    var cases = IFL.data.cases, q = ctx.query.q || '', kind = ctx.query.kind || '', ch = ctx.query.chapter || '', mode = ctx.query.mode || '';
    var done = IFL.store.state.cases || {};
    var input = h('input.input', { type: 'search', value: q, placeholder: 'Search cases…', 'aria-label': 'Search cases', style: { maxWidth: '280px' } });
    var kindSel = h('select.input', { 'aria-label': 'Kind of case', style: { maxWidth: '220px' } }, h('option', { value: '' }, 'All kinds'), Object.keys(KIND).map(function (k) { return h('option', { value: k, selected: k === kind }, KIND[k][1]); }));
    var chSel = h('select.input', { 'aria-label': 'Chapter', style: { maxWidth: '220px' } }, h('option', { value: '' }, 'All chapters'), IFL.course.chapters.map(function (c) { return h('option', { value: c.n, selected: String(c.n) === ch }, 'Chapter ' + c.n); }));
    var modeSel = h('select.input', { 'aria-label': 'Financing mode', style: { maxWidth: '220px' } }, h('option', { value: '' }, 'All modes'), IFL.data.modes.map(function (m) { return h('option', { value: m.id, selected: m.id === mode }, m.name); }));
    var grid = h('div.grid.grid-2'), count = h('span.small.muted');
    function draw() {
      var nq = u.norm(q);
      var list = cases.filter(function (c) {
        if (kind && c.kind !== kind) return false;
        if (ch && String(c.chapter) !== ch) return false;
        if (mode && c.modeIds.indexOf(mode) < 0) return false;
        return !nq || u.norm(c.title + ' ' + c.scenario + ' ' + (c.conceptLabel || '')).indexOf(nq) > -1;
      });
      count.textContent = list.length + ' of ' + cases.length + ' cases';
      grid.innerHTML = '';
      if (!list.length) grid.appendChild(C.empty('No cases match', 'Change the filters.'));
      list.forEach(function (c) {
        grid.appendChild(h('a.card.card-link', { href: '#/case/' + c.id },
          h('div.row', kindBadge(c), h('span.badge', IFL.course.sourceLabel(c.topicId)), done[c.id] ? h('span.badge.ok', '✓ worked') : null),
          h('h3', { style: { fontSize: 'var(--fs-md)', margin: '8px 0 4px' } }, c.title), c.conceptLabel ? h('div.small.muted', c.conceptLabel) : null,
          h('p.small.text-2', { style: { margin: '4px 0 0' } }, IFL.trunc(c.scenario, 150)),
          c.modeIds.length ? h('div.row', { style: { marginTop: '6px' } }, c.modeIds.map(function (m) { return h('span.chip.static', IFL.data.mode(m).name); })) : null));
      });
    }
    input.addEventListener('input', u.debounce(function () { q = input.value.trim(); draw(); }, 150));
    [kindSel, chSel, modeSel].forEach(function (s) { s.addEventListener('change', function () { kind = kindSel.value; ch = chSel.value; mode = modeSel.value; draw(); }); });
    draw();
    return h('div',
      C.pageHead({ eyebrow: 'Application', title: 'Case Study Lab', desc: 'Apply the book\'s rules to business situations. Textbook cases use the book\'s own figures; practice cases and educational scenarios are generated for learning to apply the textbook\'s framework, and are labelled. None of these are Shari’ah rulings.' }),
      h('section.card', h('div.row', input, kindSel, chSel, modeSel, h('span.spacer'), count)), grid);
  });

  IFL.route('/case/:id', function (ctx) {
    var c = IFL.data.caseStudy(ctx.params.id);
    if (!c) throw new Error('Case not found');
    IFL.progress.log('case', 'Case: ' + c.title, '/case/' + c.id);
    var modes = IFL.data.modes;
    var t = IFL.course.topic(c.topicId);
    var stage = 0, chosen = null, closed = false;
    var steps = h('div.stack');
    function add(el) { steps.appendChild(el); el.scrollIntoView && setTimeout(function () { el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 30); }
    var hasMcq = c.questions && c.questions.length;
    var s1 = h('section.card', h('div.eyebrow', 'Step 1 · Identify the problem'), h('p', c.problem || 'What does the business need, and what must the structure achieve? Write a sentence, then continue.'),
      h('textarea.input', { 'aria-label': 'Your analysis of the problem', placeholder: 'e.g. The client needs… The bank must…' }),
      h('div.row', { style: { marginTop: '10px' } }, h('button.btn.primary', { type: 'button', onclick: function () { if (stage > 0) return; stage = 1; this.disabled = true; step2(); } }, 'Continue')));
    function step2() {
      if (!c.modeIds.length) return step3();
      var opts = modes.map(function (m) { return h('button.chip', { type: 'button', 'aria-pressed': 'false', onclick: function () {
        if (chosen) return; chosen = m.id; this.setAttribute('aria-pressed', 'true');
        var right = c.modeIds.indexOf(m.id) > -1;
        fb.appendChild(h('div.feedback.' + (right ? 'ok' : 'bad'), h('div.t', right ? '✓ That is a mode this case turns on' : 'The case turns on ' + c.modeIds.map(function (x) { return IFL.data.mode(x).name; }).join(' / ')),
          right ? null : h('p.small', 'Compare: ', h('a', { href: '#/mode/' + m.id }, m.name), ' — ' + (m.attributes ? m.attributes.nature : m.distinguishingFeature) + '.')));
        step3();
      } }, m.name); });
      var fb = h('div');
      add(h('section.card', h('div.eyebrow', 'Step 2 · Choose the relevant concept / mode'), h('div.row', opts), fb));
    }
    function step3() {
      var body;
      if (hasMcq) {
        var qwrap = h('div.stack'), done = 0;
        c.questions.forEach(function (q, i) {
          var qq = { id: c.id + '-q' + i, type: 'mcq', prompt: q.prompt, options: q.options, correctAnswer: q.correctAnswer, explanation: q.explanation, topicId: c.topicId, chapter: c.chapter };
          qwrap.appendChild(h('div.card.flat', C.question(qq, { showMeta: false, onAnswer: function () { done++; if (done === c.questions.length) step4(); } })));
        });
        body = qwrap;
      } else {
        body = h('div.stack', h('ul', (c.prompts || []).map(function (p) { return h('li', p); })),
          h('textarea.input', { 'aria-label': 'Your analysis', placeholder: 'Write your analysis of the prompts above, then reveal the textbook-based answer.' }),
          h('div.row', h('button.btn.primary', { type: 'button', onclick: function () { this.disabled = true; step4(); } }, 'Reveal the textbook-based answer')));
      }
      add(h('section.card', h('div.eyebrow', 'Step 3 · Analyse'), body));
    }
    function step4() {
      if (closed) return; closed = true;
      IFL.progress.markCase(c.id);
      var takes = c.takeaways && c.takeaways.length ? c.takeaways : c.examTakeaway ? [c.examTakeaway] : [];
      add(h('section.card', h('div.eyebrow', 'Step 4 · Textbook-based answer'),
        c.answer ? h('div', h('h3', 'Answer'), h('p', c.answer)) : null,
        h('h3', 'Why?'), h('p', c.explanation || c.analysis),
        c.explanation && c.analysis ? h('p', c.analysis) : null,
        t ? [h('h3', 'Related rule / principle'), h('p', h('a', { href: '#/topic/' + c.topicId }, 'Chapter ' + t.chapter + ' §' + t.section + ' — ' + t.title))] : null,
        takes.length ? h('div.callout.gold', h('div.t', 'Exam takeaway'), h('ul', takes.map(function (x) { return h('li', x); }))) : null,
        C.sourceFoot(c.topicId),
        h('div.row', h('a.btn.primary', { href: '#/cases' }, 'More cases'), h('a.btn', { href: '#/topic/' + c.topicId }, 'Review the topic'))));
    }
    steps.appendChild(s1);
    var rel = C.relatedPanel('case', c.id, { skip: ['topic'], limit: 6 });
    return h('div',
      C.pageHead({ crumbs: [{ label: 'Case Study Lab', route: '/cases' }, { label: IFL.trunc(c.title, 40) }], eyebrow: (KIND[c.kind] || KIND.scenario)[1], title: c.title,
        actions: [C.bookmarkBtn({ type: 'case', id: c.id, label: c.title, route: '/case/' + c.id }), C.noteBtn({ type: 'case', id: c.id, label: c.title, route: '/case/' + c.id })] }),
      h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Scenario'), h('p', c.scenario), c.facts && c.facts.length ? h('ul.small', c.facts.map(function (f) { return h('li', f); })) : null,
        c.conceptLabel ? h('p.small.muted', 'Concept: ' + c.conceptLabel) : null,
        h('p.small.muted', c.disclaimer || 'Educational case based on the textbook; not a Shari’ah ruling or professional advice.')),
      steps, rel);
  });
})();
