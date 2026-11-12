/* Learning games. Each one is built only from records that already exist in the canonical data —
   transaction-diagram steps, glossary definitions and financing-mode profiles — so nothing here adds
   or alters course content. Best results are kept under state.games. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;

  function games() { return IFL.store.state.games || {}; }
  function best(game, key) { return (games()[game] || {})[key] || null; }
  /* lowerIsBetter: fewer mistakes wins; otherwise a higher score wins */
  function record(game, key, score, lowerIsBetter) {
    IFL.store.update(function (s) {
      s.games = s.games || {}; var g = s.games[game] = s.games[game] || {}, r = g[key] = g[key] || { n: 0 };
      r.n++; r.ts = Date.now();
      if (r.best == null || (lowerIsBetter ? score < r.best : score > r.best)) r.best = score;
    }, 'game');
  }
  function played(game) { return Object.keys(games()[game] || {}).length; }
  function sameStep(a, b) { return a.label === b.label && a.from === b.from && a.to === b.to; }

  /* ---------------- hub ---------------- */
  IFL.route('/play', function () {
    var D = IFL.data, solved = Object.keys(games().build || {}).filter(function (k) { return games().build[k].best === 100; }).length;
    function card(route, icon, title, text, stat) {
      return h('a.card.card-link.play-card', { href: '#' + route }, h('span.play-ico', u.svg(icon)), h('h2', title), h('p.text-2', text), h('span.badge.accent', stat));
    }
    return h('div', C.pageHead({ eyebrow: 'Practise', title: 'Learn by doing', desc: 'Three short games built from the course’s own diagrams, glossary and financing-mode profiles. They train the things exams ask for: the order of a transaction, the exact meaning of a term, and how each instrument earns its return.' }),
      h('div.grid.grid-3',
        card('/play/build', 'flow', 'Build the deal', 'The steps of a transaction are shuffled. Put them back in the order they must happen — then watch the deal play out.', solved + ' of ' + D.diagrams.length + ' deals solved'),
        card('/play/match', 'cards', 'Term match', 'Pair six Arabic terms with their definitions. Fewer wrong guesses is better.', played('match') ? played('match') + ' categories played' : 'Not played yet'),
        card('/play/sort', 'layers', 'Sort the instruments', 'One financing mode at a time: decide how the financier earns, or which family of contracts it belongs to.', played('sort') ? 'Best ' + Math.max.apply(null, Object.keys(games().sort).map(function (k) { return games().sort[k].best; })) + '%' : 'Not played yet')),
      h('section.card', { style: { marginTop: 'var(--sp-4)' } }, h('div.card-title', h('h2', 'See it move')),
        h('div.grid.grid-3',
          h('a.btn', { href: '#/diagrams', style: { justifyContent: 'flex-start' } }, u.svg('play'), 'Animated transaction diagrams'),
          h('a.btn', { href: '#/tools', style: { justifyContent: 'flex-start' } }, u.svg('chart'), 'Calculators with sliders and charts'),
          h('a.btn', { href: '#/concepts', style: { justifyContent: 'flex-start' } }, u.svg('map'), 'Concept map'))));
  });

  /* ---------------- 1. Build the deal ---------------- */
  IFL.route('/play/build', function (ctx) {
    var D = IFL.data, id = ctx.query.id;
    if (!id) {
      /* picker: every diagram, with solved state */
      return h('div', C.pageHead({ crumbs: [{ label: 'Learn by doing', route: '/play' }, { label: 'Build the deal' }], eyebrow: 'Game', title: 'Build the deal', desc: 'Choose a transaction. Its steps will be shuffled; rebuild the sequence from first step to last.' }),
        h('div.grid.grid-3', D.diagrams.map(function (d) {
          var b = best('build', d.id);
          return h('a.card.card-link', { href: '#/play/build?id=' + d.id }, h('div.row.between', h('strong', d.title), b ? h('span.badge.' + (b.best === 100 ? 'ok' : 'gold'), b.best === 100 ? 'Solved' : 'Best ' + b.best + '%') : h('span.badge', d.steps.length + ' steps')), h('p.small.text-2', { style: { margin: '6px 0 0' } }, IFL.trunc(d.summary, 110)));
        })));
    }
    var d = D.diagram(id); if (!d) throw new Error('There is no diagram “' + id + '”');
    var pool = u.shuffle(d.steps.map(function (s, i) { return { s: s, i: i }; }));
    if (pool.every(function (p, k) { return p.i === k; }) && pool.length > 1) pool.push(pool.shift());
    var seq = [], checked = false, tries = 0;
    var seqEl = h('ol.build-seq', { 'aria-label': 'Your sequence' }), poolEl = h('div.build-pool', { 'aria-label': 'Steps still to place' }), foot = h('div.stack'), status = h('p.small.muted', { role: 'status' });
    function partyName(pid) { var p = d.parties.filter(function (x) { return x.id === pid; })[0]; return p ? p.label : pid; }
    function stepBody(p) { return [h('span.build-label', p.s.label), h('span.small.muted', p.s.from === p.s.to ? partyName(p.s.from) : partyName(p.s.from) + ' → ' + partyName(p.s.to))]; }
    function draw() {
      seqEl.innerHTML = ''; poolEl.innerHTML = '';
      for (var k = 0; k < d.steps.length; k++) {
        (function (k) {
          var p = seq[k], right = checked && p && sameStep(p.s, d.steps[k]);
          seqEl.appendChild(h('li.build-slot' + (p ? '.filled' : '') + (checked && p ? (right ? '.right' : '.wrong') : ''),
            h('span.build-n', String(k + 1)),
            p ? h('button.build-step', { type: 'button', disabled: p.locked, 'aria-label': 'Step ' + (k + 1) + ': ' + p.s.label + (p.locked ? ' (correct)' : '. Press to take it back'), onclick: function () { seq.splice(k, 1); pool.push(p); checked = false; draw(); } }, stepBody(p), checked ? h('span.build-mark', u.svg(right ? 'check' : 'x')) : null)
              : h('span.build-empty.muted', k === seq.length ? 'Choose the next step below' : '')));
        })(k);
      }
      pool.forEach(function (p, j) {
        poolEl.appendChild(h('button.build-step.pool', { type: 'button', onclick: function () { pool.splice(j, 1); seq.push(p); checked = false; draw(); var nb = poolEl.querySelector('button'); if (nb) nb.focus(); else checkBtn.focus(); } }, stepBody(p)));
      });
      if (!pool.length && !checked) poolEl.appendChild(h('p.small.muted', 'All steps placed — check your sequence.'));
      checkBtn.disabled = pool.length > 0 || checked;
      status.textContent = seq.length + ' of ' + d.steps.length + ' placed' + (tries ? ' · ' + tries + ' check' + (tries === 1 ? '' : 's') : '');
    }
    function check() {
      checked = true; tries++;
      var ok = 0, lead = true; seq.forEach(function (p, k) { if (sameStep(p.s, d.steps[k])) { ok++; if (lead) p.locked = true; } else lead = false; });
      var pct = Math.round(100 * ok / d.steps.length), score = tries === 1 ? pct : ok === d.steps.length ? Math.max(50, 100 - 15 * (tries - 1)) : pct;
      draw(); foot.innerHTML = '';
      if (ok === d.steps.length) {
        record('build', d.id, tries === 1 ? 100 : score);
        status.textContent = 'Correct sequence' + (tries === 1 ? ' on the first check.' : ' after ' + tries + ' checks.');
        var others = IFL.data.diagrams.filter(function (x) { return x.id !== d.id && !(best('build', x.id) && best('build', x.id).best === 100); }), nx = others[0];
        u.append(foot, [h('div.callout.ok', h('div.t', tries === 1 ? 'Perfect — every step in order first time.' : 'Solved in ' + tries + ' checks.'), h('p', { style: { margin: 0 } }, 'Now watch the transaction run. The shape on each arrow shows what moves: money, goods, a document, ownership or risk.')),
          h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, d.title), C.diagram(d)),
          h('div.row', nx ? h('a.btn.primary', { href: '#/play/build?id=' + nx.id }, 'Next deal: ' + IFL.trunc(nx.title, 40), u.svg('right')) : null, h('a.btn', { href: '#/play/build' }, 'All deals'), d.topicId ? h('a.btn', { href: '#/topic/' + d.topicId }, 'Open the lesson') : null)]);
      } else {
        record('build', d.id, pct);
        status.textContent = ok + ' of ' + d.steps.length + ' steps are in the right place.';
        var wrong = seq.filter(function (p, k) { return !sameStep(p.s, d.steps[k]); });
        u.append(foot, [h('div.callout.bad', h('div.t', ok + ' of ' + d.steps.length + ' in the right place'), h('p', { style: { margin: 0 } }, 'Ticked steps are in the right place; the correct opening run stays locked. Ask what must already be true before each remaining step can happen — who owns the asset, and who bears its risk?')),
          h('div.row', h('button.btn.primary', { type: 'button', onclick: function () { var keep = 0; while (keep < seq.length && sameStep(seq[keep].s, d.steps[keep])) keep++; var back = seq.slice(keep); back.forEach(function (p) { p.locked = false; }); pool = u.shuffle(back); seq = seq.slice(0, keep); checked = false; foot.innerHTML = ''; draw(); } }, u.svg('refresh'), 'Fix the ' + wrong.length + ' wrong step' + (wrong.length === 1 ? '' : 's')),
            h('button.btn', { type: 'button', onclick: function () { foot.innerHTML = ''; u.append(foot, [h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'The sequence, explained'), C.diagram(d)), h('a.btn', { href: '#/play/build?id=' + d.id + '&r=' + Date.now() }, u.svg('refresh'), 'Try again from the start')]); } }, 'Show me the answer'))]);
      }
    }
    var checkBtn = h('button.btn.primary', { type: 'button', onclick: check }, u.svg('check'), 'Check sequence');
    draw();
    return h('div', C.pageHead({ crumbs: [{ label: 'Learn by doing', route: '/play' }, { label: 'Build the deal', route: '/play/build' }, { label: d.title }], eyebrow: 'Build the deal', title: d.title, desc: d.summary }),
      h('div.build-grid',
        h('section.card', h('div.card-title', h('h2', 'Your sequence'), status), seqEl, h('div.row', { style: { marginTop: '12px' } }, checkBtn)),
        h('section.card', h('div.card-title', h('h2', 'Steps to place')), h('p.small.muted', 'Press a step to add it to the end of your sequence. Press a placed step to take it back.'), poolEl)),
      foot);
  });

  /* ---------------- 2. Term match ---------------- */
  IFL.route('/play/match', function (ctx) {
    var D = IFL.data, PAIRS = 6;
    var cats = {}; D.glossary.forEach(function (g) { if (g.definition && g.definition.length <= 170) (cats[g.category] = cats[g.category] || []).push(g); });
    var names = Object.keys(cats).filter(function (c) { return cats[c].length >= PAIRS; }).sort();
    var cat = ctx.query.cat && cats[ctx.query.cat] ? ctx.query.cat : '';
    var chips = h('div.row', { style: { margin: '0 0 14px' } }, h('a.chip', { href: '#/play/match', 'aria-pressed': String(!cat) }, 'Any category'), names.map(function (c) { return h('a.chip', { href: '#/play/match?cat=' + encodeURIComponent(c), 'aria-pressed': String(cat === c) }, c); }));
    var source = cat ? cats[cat] : [].concat.apply([], names.map(function (c) { return cats[c]; }));
    var picked = u.shuffle(source.slice()).slice(0, PAIRS), defs = u.shuffle(picked.slice());
    var sel = null, mistakes = 0, done = 0, t0 = Date.now(), key = cat || 'any';
    var status = h('p.small.muted', { role: 'status' }, 'Pick a term, then its definition.'), foot = h('div');
    var termBtns = {}, defBtns = {};
    function pickTerm(g) { if (termBtns[g.id].disabled) return; sel = g; Object.keys(termBtns).forEach(function (k) { termBtns[k].setAttribute('aria-pressed', String(k === g.id)); }); status.textContent = 'Now choose the definition of ' + g.term + '.'; }
    function pickDef(g) {
      if (!sel) { status.textContent = 'Pick a term on the left first.'; return; }
      if (sel.id === g.id) {
        [termBtns[g.id], defBtns[g.id]].forEach(function (b) { b.disabled = true; b.classList.add('matched'); b.setAttribute('aria-pressed', 'false'); });
        done++; sel = null; status.textContent = done + ' of ' + PAIRS + ' matched' + (mistakes ? ' · ' + mistakes + ' wrong guess' + (mistakes === 1 ? '' : 'es') : '') + '.';
        if (done === picked.length) finish();
      } else {
        mistakes++; var b = defBtns[g.id]; b.classList.add('miss'); setTimeout(function () { b.classList.remove('miss'); }, 500);
        status.textContent = 'Not that one — ' + mistakes + ' wrong guess' + (mistakes === 1 ? '' : 'es') + ' so far. Try another definition for ' + sel.term + '.';
      }
    }
    function finish() {
      var secs = Math.round((Date.now() - t0) / 1000), prev = best('match', key);
      record('match', key, mistakes, true);
      u.append(foot, [h('div.callout.ok', h('div.t', mistakes === 0 ? 'Flawless — six pairs, no wrong guesses.' : 'All six matched with ' + mistakes + ' wrong guess' + (mistakes === 1 ? '' : 'es') + '.'), h('p', { style: { margin: 0 } }, 'Time ' + u.fmtDuration(secs) + '.' + (prev && prev.best != null ? ' Previous best: ' + prev.best + ' wrong.' : ''))),
        h('div.row', h('a.btn.primary', { href: '#/play/match?' + (cat ? 'cat=' + encodeURIComponent(cat) + '&' : '') + 'r=' + Date.now() }, u.svg('refresh'), 'New round'), h('a.btn', { href: '#/glossary' }, 'Open the glossary'), h('a.btn', { href: '#/play' }, 'Other games'))]);
    }
    var left = h('div.match-col', { role: 'group', 'aria-label': 'Terms' }, picked.map(function (g) { return (termBtns[g.id] = h('button.match-item.term', { type: 'button', 'aria-pressed': 'false', onclick: function () { pickTerm(g); } }, g.term)); }));
    var right = h('div.match-col', { role: 'group', 'aria-label': 'Definitions' }, defs.map(function (g) { return (defBtns[g.id] = h('button.match-item', { type: 'button', onclick: function () { pickDef(g); } }, g.definition)); }));
    return h('div', C.pageHead({ crumbs: [{ label: 'Learn by doing', route: '/play' }, { label: 'Term match' }], eyebrow: 'Game', title: 'Term match', desc: 'Six terms from the book’s glossary and their definitions. Match them with as few wrong guesses as you can.' }),
      chips, h('section.card', status, h('div.match-grid', left, right)), foot);
  });

  /* ---------------- 3. Sort the instruments ---------------- */
  IFL.route('/play/sort', function (ctx) {
    var D = IFL.data, by = ctx.query.by === 'family' ? 'family' : 'return', field = by === 'family' ? 'category' : 'returnType';
    var counts = {}; D.modes.forEach(function (m) { counts[m[field]] = (counts[m[field]] || 0) + 1; });
    var buckets = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a] || (a < b ? -1 : 1); });
    if (by === 'family') buckets = buckets.slice(0, 6);
    var deck = u.shuffle(D.modes.filter(function (m) { return buckets.indexOf(m[field]) > -1; })).slice(0, 8);
    var i = 0, score = 0, stage = h('div', { 'aria-live': 'polite' });
    var seg = h('div.seg', { role: 'group', 'aria-label': 'What to sort by', style: { marginBottom: '14px' } },
      h('button', { type: 'button', 'aria-pressed': String(by === 'return'), onclick: function () { IFL.go('/play/sort?by=return'); } }, 'How the financier earns'),
      h('button', { type: 'button', 'aria-pressed': String(by === 'family'), onclick: function () { IFL.go('/play/sort?by=family'); } }, 'Contract family'));
    function round() {
      stage.innerHTML = '';
      if (i >= deck.length) {
        var pct = Math.round(100 * score / deck.length), prev = best('sort', by);
        record('sort', by, pct);
        u.append(stage, [h('section.card', h('div.row', { style: { gap: '20px' } }, C.ring(pct, 96, 'Score'), h('div', h('h2', { style: { margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-xl)' } }, score + ' of ' + deck.length + ' correct'), h('p.text-2', pct === 100 ? 'Every instrument placed correctly.' : 'Open the modes you missed, then try another round.'), prev && prev.best != null ? h('p.small.muted', 'Previous best: ' + prev.best + '%') : null)),
          h('div.row', { style: { marginTop: '12px' } }, h('a.btn.primary', { href: '#/play/sort?by=' + by + '&r=' + Date.now() }, u.svg('refresh'), 'New round'), h('a.btn', { href: '#/modes' }, 'Financing modes'), h('a.btn', { href: '#/compare' }, 'Comparison lab'), h('a.btn', { href: '#/play' }, 'Other games')))]);
        return;
      }
      var m = deck[i], answered = false;
      var hint = h('p.small.text-2', { hidden: true }, m.subjectMatter);
      var hintBtn = h('button.btn.sm', { type: 'button', onclick: function () { hint.hidden = false; hintBtn.disabled = true; } }, 'Hint: what is being financed?');
      var fb = h('div');
      var opts = h('div.sort-buckets', buckets.map(function (b) {
        var btn = h('button.sort-bucket', { type: 'button', onclick: function () {
          if (answered) return; answered = true;
          var ok = m[field] === b; if (ok) score++;
          Array.prototype.forEach.call(opts.children, function (x) { x.disabled = true; if (x.dataset.b === m[field]) x.classList.add('right'); });
          if (!ok) btn.classList.add('wrong');
          u.append(fb, [h('div.callout.' + (ok ? 'ok' : 'bad'), h('div.t', ok ? 'Correct — ' + m[field] : 'It is ' + m[field]), h('p', { style: { margin: 0 } }, by === 'return' ? m.returnTypeDetail : m.distinguishingFeature)),
            h('div.row', nextBtn, h('a.btn', { href: '#/mode/' + m.id }, 'Open ' + m.name))]);
          nextBtn.focus();
        } }, b);
        btn.dataset.b = b; return btn;
      }));
      var nextBtn = h('button.btn.primary', { type: 'button', onclick: function () { i++; round(); } }, i === deck.length - 1 ? 'See result' : 'Next instrument', u.svg('right'));
      u.append(stage, [h('section.card.sort-card', h('div.row.between.small.muted', h('span', 'Instrument ' + (i + 1) + ' of ' + deck.length), h('span.tabular', score + ' correct')), C.bar(Math.round(100 * i / deck.length), 'thin'),
        h('h2.sort-name', m.name), h('p.text-2', by === 'return' ? 'How does the financier earn on this instrument?' : 'Which family of contracts does it belong to?'), hintBtn, hint, opts, fb)]);
    }
    round();
    return h('div', C.pageHead({ crumbs: [{ label: 'Learn by doing', route: '/play' }, { label: 'Sort the instruments' }], eyebrow: 'Game', title: 'Sort the instruments', desc: 'Eight financing modes, one at a time. The classification and the explanation come from each mode’s own profile.' }), seg, stage);
  });
})();
