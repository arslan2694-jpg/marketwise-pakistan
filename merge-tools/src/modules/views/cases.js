
/* Case Study Lab: scenario → identify → choose concept → analyse → reveal → why → rule → takeaway.
   Two case formats live here side by side:
     • multiple-choice cases (questions[]) — the original textbook boxes and generated practice cases;
     • open-analysis cases (prompts + textbook-grounded answer) — from the companion set.
   Every case is labelled "Textbook case" (uses the book's own figures) or "Practice — generated for learning". */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var H2 = { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' };

  function badge(c) { return c.kind === 'textbook' ? h('span.badge.accent', 'Textbook case') : h('span.badge.gold', 'Practice — generated for learning'); }

  IFL.route('/cases', function (ctx) {
    return window.IFL_DATA.load(['cases']).then(function (r) {
      var cases = r.cases, f = ctx.query.kind || '';
      var done = IFL.store.state.casesDone || {};
      var nText = cases.filter(function (c) { return c.kind === 'textbook'; }).length;
      var seg = h('div.seg', { role: 'group', 'aria-label': 'Filter cases' }, [['', 'All (' + cases.length + ')'], ['textbook', 'Textbook (' + nText + ')'], ['practice', 'Practice (' + (cases.length - nText) + ')']].map(function (o) {
        return h('a.btn.sm' + (o[0] === f ? '.on' : ''), { href: '#/cases' + (o[0] ? '?kind=' + o[0] : ''), 'aria-current': o[0] === f ? 'true' : null }, o[1]);
      }));
      var list = cases.filter(function (c) { return !f || c.kind === f; });
      return h('div',
        C.pageHead({ eyebrow: 'Application', title: 'Case Study Lab', desc: 'Apply the book\'s rules to business situations. Textbook cases use the book\'s own figures; practice cases are generated for learning (some are grounded in the textbook\'s rules and cite the section) and are labelled. None of these are Shari’ah rulings.', actions: [seg] }),
        h('p.small.muted', Object.keys(done).length + ' of ' + cases.length + ' cases completed.'),
        h('div.grid.grid-2', list.map(function (c) {
          return h('a.card.card-link', { href: '#/case/' + c.id },
            h('div.row', badge(c), h('span.badge', c.src ? IFL.course.citeLabel(c.src) : IFL.course.sourceLabel(c.topic)), done[c.id] ? h('span.badge.ok', '✓ done') : null),
            h('h3', { style: { fontSize: 'var(--fs-md)', margin: '8px 0 4px' } }, c.title), c.concept ? h('div.small.muted', c.concept) : null, h('p.small.text-2', { style: { margin: 0 } }, IFL.trunc(c.scenario, 150)));
        })));
    });
  });

  IFL.route('/case/:id', function (ctx) {
    return window.IFL_DATA.load(['cases', 'comparisons']).then(function (r) {
      var c = r.cases.filter(function (x) { return x.id === ctx.params.id; })[0];
      if (!c) throw new Error('Case not found');
      IFL.progress.log('case', 'Case: ' + c.title, '/case/' + c.id);
      var modes = r.comparisons.modes.concat([{ id: 'sukuk', name: 'Sukuk', nature: 'certificates of undivided ownership in assets' }, { id: 'takaful', name: 'Takaful', nature: 'cooperative risk-sharing fund based on Tabarru‘' }]);
      var open = !!c.prompts;                           // open-analysis format
      var stage = 0, steps = h('div.stack'), chosen = null;
      function add(el) { steps.appendChild(el); el.scrollIntoView && setTimeout(function () { el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 30); }
      // Step 1: identify the problem
      var s1 = h('section.card', h('div.eyebrow', 'Step 1 · Identify the problem'),
        h('p', open ? c.prompts.problem : 'What does the business need, and what must the structure achieve? Write a sentence, then continue.'),
        h('textarea.input', { 'aria-label': 'Your analysis of the problem', placeholder: 'e.g. The client needs… The bank must…' }),
        h('div.row', { style: { marginTop: '10px' } }, h('button.btn.primary', { type: 'button', onclick: function () { if (stage > 0) return; stage = 1; this.disabled = true; c.mode ? step2() : (open ? stepPrompts() : step3()); } }, 'Continue')));
      function step2() {
        var opts = modes.map(function (m) { return h('button.chip', { type: 'button', 'aria-pressed': 'false', onclick: function () {
          if (chosen) return; chosen = m.id; this.setAttribute('aria-pressed', 'true');
          var right = m.id === c.mode;
          fb.appendChild(h('div.feedback.' + (right ? 'ok' : 'bad'), h('div.t', right ? '✓ That is the mode used in this case' : 'The case uses ' + (modes.filter(function (x) { return x.id === c.mode; })[0] || { name: c.mode }).name), right ? null : h('p.small', 'Compare: ' + m.name + ' — ' + m.nature + '.')));
          open ? stepPrompts() : step3();
        } }, m.name); });
        var fb = h('div');
        add(h('section.card', h('div.eyebrow', 'Step 2 · Choose the relevant concept / mode'), h('div.row', opts), fb));
      }
      /* open-analysis cases: reflect on the guiding prompts, then reveal */
      function stepPrompts() {
        var wrap = h('div.stack');
        (c.prompts.analysis || []).forEach(function (p, i) { wrap.appendChild(h('div', h('label', { for: c.id + '-p' + i }, h('strong', (i + 1) + '. '), p), h('textarea.input', { id: c.id + '-p' + i, 'aria-label': 'Your answer to prompt ' + (i + 1) }))); });
        wrap.appendChild(h('div.row', h('button.btn.primary', { type: 'button', onclick: function () { this.disabled = true; step4(); } }, 'Reveal the textbook-based answer')));
        add(h('section.card', h('div.eyebrow', 'Step 3 · Analyse'), (c.prompts.analysis || []).length ? wrap : h('div', h('p.muted', 'No guiding prompts for this case.'), wrap.lastChild)));
      }
      function step3() {
        var qwrap = h('div.stack'), done = 0;
        if (!c.questions.length) return step4();
        c.questions.forEach(function (q, i) {
          var qq = { id: c.id + '-q' + i, type: 'mcq', q: q.q, options: q.options, answer: q.answer, explanation: q.explanation, topic: c.topic };
          qwrap.appendChild(h('div.card.flat', C.question(qq, { showMeta: false, onAnswer: function () { done++; if (done === c.questions.length) step4(); } })));
        });
        add(h('section.card', h('div.eyebrow', 'Step 3 · Analyse'), qwrap));
      }
      function step4() {
        var t = IFL.course.topic(c.topic);
        add(h('section.card', h('div.eyebrow', 'Step 4 · Textbook-based answer'),
          c.answer ? h('div', h('h3', 'Answer'), h('p', c.answer)) : null,
          h('h3', 'Why?'), h('p', c.analysis),
          h('h3', 'Related rule / principle'), t ? h('p', h('a', { href: '#/topic/' + c.topic }, 'Chapter ' + t.chapter + ' §' + t.section + ' — ' + t.title)) : null,
          c.takeaways && c.takeaways.length ? h('div.callout.gold', h('div.t', 'Exam takeaway'), h('ul', c.takeaways.map(function (x) { return h('li', x); }))) : null,
          c.src ? h('div.source-foot', u.svg('source'), h('strong', 'Source: '), h('span', IFL.course.citeLabel(c.src))) : null,
          t ? C.sourceFoot(c.topic) : null,
          h('div.row', h('a.btn.primary', { href: '#/cases' }, 'More cases'), t ? h('a.btn', { href: '#/topic/' + c.topic }, 'Review the topic') : null)));
        IFL.progress.completeCase(c.id);
      }
      steps.appendChild(s1);
      return h('div',
        C.pageHead({ crumbs: [{ label: 'Case Study Lab', route: '/cases' }, { label: IFL.trunc(c.title, 40) }], eyebrow: c.kind === 'textbook' ? 'Textbook case' : 'Practice case — generated for learning', title: c.title,
          actions: [C.bookmarkBtn({ type: 'case', id: c.id, label: c.title, route: '/case/' + c.id }), C.noteBtn({ type: 'case', id: c.id, label: c.title, route: '/case/' + c.id })] }),
        h('section.card', h('h2', { style: H2 }, 'Scenario'), h('p', c.scenario), c.facts && c.facts.length ? h('ul.small', c.facts.map(function (f) { return h('li', f); })) : null,
          c.kind === 'practice' && c.basis ? h('p.small.muted', 'This scenario was written for practice; the answer applies rules stated in the textbook (source cited below).') : null,
          h('p.small.muted', c.disclaimer || 'Educational case based on the textbook; not a Shari’ah ruling or professional advice.')),
        steps);
    });
  });
})();
