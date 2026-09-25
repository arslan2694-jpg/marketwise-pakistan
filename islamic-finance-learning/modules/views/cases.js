/* Case Study Lab: scenario → identify → choose concept → analyse → reveal → why → rule → takeaway. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;

  IFL.route('/cases', function () {
    return window.IFL_DATA.load(['cases']).then(function (r) {
      var cases = r.cases;
      return h('div',
        C.pageHead({ eyebrow: 'Application', title: 'Case Study Lab', desc: 'Apply the book\'s rules to business situations. Textbook cases use the book\'s own figures; practice cases are generated for learning and labelled. None of these are Shari’ah rulings.' }),
        h('div.grid.grid-2', cases.map(function (c) {
          return h('a.card.card-link', { href: '#/case/' + c.id },
            h('div.row', c.kind === 'textbook' ? h('span.badge.accent', 'Textbook case') : h('span.badge.gold', 'Practice — generated for learning'), h('span.badge', IFL.course.sourceLabel(c.topic))),
            h('h3', { style: { fontSize: 'var(--fs-md)', margin: '8px 0 4px' } }, c.title), h('p.small.text-2', { style: { margin: 0 } }, IFL.trunc(c.scenario, 150)));
        })));
    });
  });

  IFL.route('/case/:id', function (ctx) {
    return window.IFL_DATA.load(['cases', 'comparisons']).then(function (r) {
      var c = r.cases.filter(function (x) { return x.id === ctx.params.id; })[0];
      if (!c) throw new Error('Case not found');
      IFL.progress.log('case', 'Case: ' + c.title, '/case/' + c.id);
      var modes = r.comparisons.modes.concat([{ id: 'sukuk', name: 'Sukuk', nature: 'certificates of undivided ownership in assets' }, { id: 'takaful', name: 'Takaful', nature: 'cooperative risk-sharing fund based on Tabarru‘' }]);
      var stage = 0;
      var steps = h('div.stack');
      var chosen = null;
      function add(el) { steps.appendChild(el); el.scrollIntoView && setTimeout(function () { el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 30); }
      // Step 1: identify the problem
      var s1 = h('section.card', h('div.eyebrow', 'Step 1 · Identify the problem'), h('p', 'What does the business need, and what must the structure achieve? Write a sentence, then continue.'),
        h('textarea.input', { 'aria-label': 'Your analysis of the problem', placeholder: 'e.g. The client needs… The bank must…' }),
        h('div.row', { style: { marginTop: '10px' } }, h('button.btn.primary', { type: 'button', onclick: function () { if (stage > 0) return; stage = 1; this.disabled = true; step2(); } }, 'Continue')));
      function step2() {
        var opts = modes.map(function (m) { return h('button.chip', { type: 'button', 'aria-pressed': 'false', onclick: function () {
          if (chosen) return; chosen = m.id; this.setAttribute('aria-pressed', 'true');
          var right = m.id === c.mode;
          fb.appendChild(h('div.feedback.' + (right ? 'ok' : 'bad'), h('div.t', right ? '✓ That is the mode used in this case' : 'The case uses ' + (modes.filter(function (x) { return x.id === c.mode; })[0] || { name: c.mode }).name), right ? null : h('p.small', 'Compare: ' + m.name + ' — ' + m.nature + '.')));
          step3();
        } }, m.name); });
        var fb = h('div');
        add(h('section.card', h('div.eyebrow', 'Step 2 · Choose the relevant concept / mode'), h('div.row', opts), fb));
      }
      function step3() {
        var qwrap = h('div.stack');
        var done = 0;
        c.questions.forEach(function (q, i) {
          var qq = { id: c.id + '-q' + i, type: 'mcq', q: q.q, options: q.options, answer: q.answer, explanation: q.explanation, topic: c.topic };
          qwrap.appendChild(h('div.card.flat', C.question(qq, { showMeta: false, onAnswer: function () { done++; if (done === c.questions.length) step4(); } })));
        });
        add(h('section.card', h('div.eyebrow', 'Step 3 · Analyse'), qwrap));
      }
      function step4() {
        var t = IFL.course.topic(c.topic);
        add(h('section.card', h('div.eyebrow', 'Step 4 · Textbook-based answer'), h('h3', 'Why?'), h('p', c.analysis),
          h('h3', 'Related rule / principle'), h('p', h('a', { href: '#/topic/' + c.topic }, 'Chapter ' + t.chapter + ' §' + t.section + ' — ' + t.title)),
          h('div.callout.gold', h('div.t', 'Exam takeaway'), h('ul', c.takeaways.map(function (x) { return h('li', x); }))),
          C.sourceFoot(c.topic),
          h('div.row', h('a.btn.primary', { href: '#/cases' }, 'More cases'), h('a.btn', { href: '#/topic/' + c.topic }, 'Review the topic'))));
      }
      steps.appendChild(s1);
      return h('div',
        C.pageHead({ crumbs: [{ label: 'Case Study Lab', route: '/cases' }, { label: IFL.trunc(c.title, 40) }], eyebrow: c.kind === 'textbook' ? 'Textbook case' : 'Practice case — generated for learning', title: c.title,
          actions: [C.bookmarkBtn({ type: 'case', id: c.id, label: c.title, route: '/case/' + c.id }), C.noteBtn({ type: 'case', id: c.id, label: c.title, route: '/case/' + c.id })] }),
        h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Scenario'), h('p', c.scenario), h('ul.small', c.facts.map(function (f) { return h('li', f); })),
          h('p.small.muted', 'Educational case based on the textbook; not a Shari’ah ruling or professional advice.')),
        steps);
    });
  });
})();
