/* Timed mock exam, mistakes review and printable chapter summaries. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var H2 = { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' };
  var PARTS = { 'part-i': 'Part I · Fundamentals', 'part-ii': 'Part II · Contracts', 'part-iii': 'Part III · Products' };

  /* ---------- Mock exam ---------- */
  /* Spread questions across the chosen chapters (round-robin), mixing difficulties.
     Short-answer and quick-check items are excluded because they cannot be marked silently. */
  function pickMock(all, chapters, n) {
    var usable = all.filter(function (q) { return !q.quick && q.type !== 'short' && (!chapters.length || chapters.indexOf(q.chapter) > -1); });
    var by = {};
    usable.forEach(function (q) { (by[q.chapter] = by[q.chapter] || []).push(q); });
    var keys = Object.keys(by).map(Number).sort(function (a, b) { return a - b; });
    keys.forEach(function (k) { by[k] = u.shuffle(by[k]); });
    var out = [], i = 0;
    while (out.length < n && keys.some(function (k) { return by[k].length; })) {
      var k = keys[i++ % keys.length];
      if (by[k].length) out.push(by[k].pop());
    }
    return u.shuffle(out);
  }
  IFL.pickMock = pickMock;

  IFL.route('/mock', function () {
    return IFL.questionPool().then(function (all) {
      var sel = [], n = 30, min = 40;
      var chips = h('div.row', IFL.course.chapters.map(function (c) {
        var b = h('button.chip', { type: 'button', 'aria-pressed': 'false', onclick: function () { var i = sel.indexOf(c.n); if (i > -1) sel.splice(i, 1); else sel.push(c.n); b.setAttribute('aria-pressed', String(sel.indexOf(c.n) > -1)); } }, 'Ch ' + c.n);
        return b;
      }));
      var nIn = h('input.input', { id: 'mock-n', type: 'number', min: 5, max: 100, value: n, style: { width: '90px' } });
      var mIn = h('input.input', { id: 'mock-min', type: 'number', min: 5, max: 180, value: min, style: { width: '90px' } });
      function start() {
        var nn = Math.max(5, Math.min(100, Number(nIn.value) || 30)), mm = Math.max(5, Math.min(180, Number(mIn.value) || 40));
        IFL.go('/mock/run?n=' + nn + '&min=' + mm + (sel.length ? '&chapters=' + sel.sort(function (a, b) { return a - b; }).join(',') : ''));
      }
      var past = IFL.store.state.attempts.filter(function (a) { return a.mode === 'mock'; }).slice(0, 10);
      function preset(t, d, r) { return h('a.card.card-link', { href: '#' + r }, h('h3', { style: { fontSize: 'var(--fs-md)', margin: 0 } }, t), h('p.small.text-2', { style: { margin: '6px 0 0' } }, d)); }
      var partPresets = IFL.course.parts.map(function (p) { return preset(PARTS[p.id] || p.title, '20 questions · 25 minutes · chapters ' + p.chapters[0] + '–' + p.chapters[p.chapters.length - 1] + '.', '/mock/run?n=20&min=25&chapters=' + p.chapters.join(',') + '&label=' + encodeURIComponent((PARTS[p.id] || p.title) + ' mock')); });
      return h('div',
        C.pageHead({ eyebrow: 'Exam', title: 'Timed mock exam', desc: 'Answers are recorded silently and nothing is revealed until you finish or time runs out, as in a real exam. Afterwards you get a full review with explanations, sources and a chapter breakdown.' }),
        h('div.grid.grid-3',
          preset('Short mock', '20 questions · 25 minutes · all chapters.', '/mock/run?n=20&min=25&label=Short%20mock'),
          preset('Full mock', '50 questions · 60 minutes · all chapters.', '/mock/run?n=50&min=60&label=Full%20mock'),
          preset('Hard mock', '20 analysis and application questions · 30 minutes.', '/mock/run?n=20&min=30&hard=1&label=Hard%20mock')),
        h('div.grid.grid-3', { style: { marginTop: '14px' } }, partPresets),
        h('section.card', { style: { marginTop: '20px' } }, h('h2', { style: H2 }, 'Custom mock'),
          h('div.stack', h('div', h('div.small.muted', 'Chapters (leave empty for all)'), chips),
            h('div.row', h('label.small', { for: 'mock-n' }, 'Questions'), nIn, h('label.small', { for: 'mock-min' }, 'Minutes'), mIn, h('span.spacer'), h('button.btn.primary', { type: 'button', onclick: start }, 'Start mock exam')))),
        h('section.card', h('h2', { style: H2 }, 'Previous mocks'),
          past.length ? h('div.table-wrap', h('table', h('thead', h('tr', h('th', 'Mock'), h('th', 'Score'), h('th', 'Time used'), h('th', 'When'))),
            h('tbody', past.map(function (a) { return h('tr', h('td', a.label), h('td.tabular', a.score + '/' + a.total + ' (' + u.pct(a.score, a.total) + '%)'), h('td.tabular', a.seconds != null ? u.clock(a.seconds) : '—'), h('td', u.ago(a.ts))); })))) : h('p.muted.small', 'No mock exams taken yet.')));
    });
  });

  IFL.route('/mock/run', function (ctx) {
    return IFL.questionPool().then(function (all) {
      var q = ctx.query;
      var chapters = q.chapters ? q.chapters.split(',').map(Number) : [];
      var n = Math.max(1, Math.min(100, Number(q.n) || 30)), limit = Math.max(1, Number(q.min) || 40) * 60;
      var source = q.hard ? all.filter(function (x) { return x.diff === 'H' || x.level === 'analysis' || x.level === 'application'; }) : all;
      var items = pickMock(source, chapters, n);
      var label = q.label || ('Mock exam · ' + items.length + ' questions');
      var head = C.pageHead({ crumbs: [{ label: 'Mock exam', route: '/mock' }, { label: label }], eyebrow: 'Timed mock exam', title: label });
      if (!items.length) return h('div', head, C.empty('No questions available', 'Choose different chapters.', h('a.btn.primary', { href: '#/mock' }, 'Back')));

      var results = {}, order = items.map(function (x, i) { return i; }), pos = 0, secondPass = false, started = Date.now(), done = false;
      var clockEl = h('span.badge.tabular', { role: 'timer', 'aria-live': 'off' }), root = h('div');
      function left() { return Math.max(0, limit - Math.floor((Date.now() - started) / 1000)); }
      function tick() {
        if (done) return;
        var l = left();
        clockEl.textContent = '⏱ ' + u.clock(l) + ' left';
        clockEl.className = 'badge tabular' + (l <= 60 ? ' bad' : l <= 300 ? ' warn' : '');
        if (l <= 0) { u.toast('Time is up — the exam has been submitted'); finish(); }
      }
      var timerId = setInterval(tick, 1000);
      ctx.onLeave(function () { clearInterval(timerId); IFL.keys = null; });

      function draw() {
        root.innerHTML = '';
        if (pos >= order.length) {
          var skipped = items.map(function (x, i) { return i; }).filter(function (i) { return !results[items[i].id]; });
          if (skipped.length && !secondPass && left() > 0) {
            secondPass = true; order = skipped; pos = 0;
            u.toast(skipped.length + ' skipped question' + (skipped.length > 1 ? 's' : '') + ' — answer them now or submit');
          } else return finish();
        }
        var idx = order[pos], item = items[idx], answered = !!results[item.id];
        var answeredCount = Object.keys(results).length;
        var nextBtn = h('button.btn.primary', { type: 'button', onclick: function () { pos++; draw(); } }, answered ? 'Next' : 'Skip for now', u.svg('right'));
        var status = h('span.small.muted.tabular');
        function setStatus() { status.textContent = (secondPass ? 'Skipped question ' + (pos + 1) + ' of ' + order.length : 'Question ' + (idx + 1) + ' of ' + items.length) + ' · ' + Object.keys(results).length + ' answered'; }
        setStatus();
        var el = C.question(item, { defer: true, showMeta: false, onAnswer: function (ok) { results[item.id] = { ok: ok }; setStatus(); nextBtn.textContent = ''; u.append(nextBtn, ['Next', u.svg('right')]); setTimeout(function () { nextBtn.focus({ preventScroll: true }); }, 20); } });
        IFL.keys = function (k) { if (!results[item.id] && el._keys) { el._keys(k); return true; } if (k === 'Enter') { nextBtn.click(); return true; } };
        u.append(root, [
          h('div.row.between.mock-bar', status, clockEl),
          C.bar(u.pct(answeredCount, items.length), 'thin'),
          h('div.card', { style: { marginTop: '14px' } }, el),
          h('div.row', { style: { marginTop: '14px' } }, nextBtn, h('span.spacer'),
            h('button.btn', { type: 'button', onclick: function () { u.confirm('Submit the exam?', 'Unanswered questions will count as wrong.', 'Submit').then(function (yes) { if (yes) finish(); }); } }, 'Submit exam'))]);
        tick();
      }
      function finish() {
        if (done) return; done = true;
        clearInterval(timerId); IFL.keys = null;
        var seconds = Math.min(limit, Math.round((Date.now() - started) / 1000));
        var rows = items.map(function (x) { var r = results[x.id]; return { q: x, ok: !!(r && r.ok), skipped: !r }; });
        var score = rows.filter(function (r) { return r.ok; }).length;
        IFL.progress.recordAttempt({ mode: 'mock', label: label, score: score, total: items.length, seconds: seconds, items: rows.map(function (r) { return { q: r.q.id, ok: r.ok, topic: r.q.topic }; }) });
        root.innerHTML = '';
        root.appendChild(review(rows, score, seconds, limit));
        window.scrollTo(0, 0);
      }
      draw();
      return h('div', head, root);
    });
  }, { wide: false });

  function review(rows, score, seconds, limit) {
    var byCh = {}, byLevel = {};
    rows.forEach(function (r) {
      var c = byCh[r.q.chapter] = byCh[r.q.chapter] || { n: 0, ok: 0 }; c.n++; if (r.ok) c.ok++;
      var l = byLevel[r.q.level || 'other'] = byLevel[r.q.level || 'other'] || { n: 0, ok: 0 }; l.n++; if (r.ok) l.ok++;
    });
    var pctv = u.pct(score, rows.length), skipped = rows.filter(function (r) { return r.skipped; }).length;
    var wrong = rows.filter(function (r) { return !r.ok; });
    var filter = 'wrong', list = h('div.stack');
    function drawList() {
      list.innerHTML = '';
      rows.filter(function (r) { return filter === 'all' || !r.ok; }).forEach(function (r, i) {
        var t = IFL.course.topic(r.q.topic);
        list.appendChild(h('div.card.review-item',
          h('div.row.small', h('span.badge.' + (r.ok ? 'ok' : r.skipped ? 'warn' : 'bad'), r.ok ? '✓ Correct' : r.skipped ? 'Not answered' : '✗ Wrong'), h('span.badge', C.typeLabel(r.q.type)), h('span.badge.info', IFL.course.sourceLabel(r.q.topic))),
          h('p', { style: { fontWeight: 600, margin: '8px 0' } }, r.q.q),
          h('p.small', h('strong', 'Correct answer: '), C.correctText(r.q)),
          r.q.explanation ? h('p.small.text-2', r.q.explanation) : null,
          t ? h('a.btn.sm', { href: '#/topic/' + r.q.topic }, 'Review §' + t.section + ' ' + IFL.trunc(t.title, 40)) : null));
      });
      if (!list.children.length) list.appendChild(h('p.muted', 'No wrong answers to review. Excellent.'));
    }
    drawList();
    var seg = h('div.seg', { role: 'group', 'aria-label': 'Review filter' }, [['wrong', 'Wrong & unanswered (' + wrong.length + ')'], ['all', 'All questions (' + rows.length + ')']].map(function (o) {
      var b = h('button', { type: 'button', 'aria-pressed': String(o[0] === filter), onclick: function () { filter = o[0]; Array.prototype.forEach.call(seg.children, function (x) { x.setAttribute('aria-pressed', 'false'); }); b.setAttribute('aria-pressed', 'true'); drawList(); } }, o[1]);
      return b;
    }));
    return h('div.stack',
      h('div.card', { style: { textAlign: 'center' } }, h('div.score-big', pctv + '%'), h('p', score + ' of ' + rows.length + ' correct' + (skipped ? ' · ' + skipped + ' not answered' : '')),
        h('p.small.text-2', 'Time used ' + u.clock(seconds) + ' of ' + u.clock(limit) + '. ' + (pctv >= 80 ? 'Exam-ready on this material.' : pctv >= 60 ? 'A pass, with gaps to close — see the chapter breakdown.' : 'Focus on the weakest chapters below, then take another mock.'))),
      h('div.grid.grid-2',
        h('div.card', h('h2', { style: H2 }, 'By chapter'), h('div.stack', Object.keys(byCh).sort(function (a, b) { return a - b; }).map(function (k) { var c = byCh[k], p = u.pct(c.ok, c.n); return h('div', h('div.row.between.small', h('a', { href: '#/chapter/' + k }, 'Ch ' + k + ' · ' + IFL.trunc(IFL.course.chapter(Number(k)).title, 34)), h('span.tabular', c.ok + '/' + c.n)), C.bar(p, p < 60 ? 'gold' : null)); }))),
        h('div.card', h('h2', { style: H2 }, 'By cognitive level'), h('div.stack', ['recall', 'understanding', 'application', 'analysis'].filter(function (l) { return byLevel[l]; }).map(function (l) { var c = byLevel[l], p = u.pct(c.ok, c.n); return h('div', h('div.row.between.small', h('span', l.charAt(0).toUpperCase() + l.slice(1)), h('span.tabular', c.ok + '/' + c.n)), C.bar(p, p < 60 ? 'gold' : null)); })))),
      h('div.row', wrong.length ? h('a.btn.primary', { href: '#/quiz/run?retry=' + wrong.slice(0, 60).map(function (r) { return r.q.id; }).join(',') }, 'Practise the missed questions') : null, h('a.btn', { href: '#/mock' }, 'Another mock'), h('a.btn', { href: '#/mistakes' }, 'All my mistakes')),
      h('section', h('div.row.between', h('h2', { style: H2 }, 'Answer review'), seg), list));
  }

  /* ---------- Mistakes review ---------- */
  IFL.route('/mistakes', function () {
    return IFL.questionPool().then(function (all) {
      var answers = IFL.store.state.answers, byId = {};
      all.forEach(function (q) { byId[q.id] = q; });
      var missed = Object.keys(answers).filter(function (id) { return answers[id].lastCorrect === false && byId[id]; }).map(function (id) { return byId[id]; })
        .sort(function (a, b) { return (answers[b.id].last || 0) - (answers[a.id].last || 0); });
      var head = C.pageHead({ eyebrow: 'Practice', title: 'My mistakes', desc: 'Every question whose most recent answer was wrong, newest first. Answer it correctly and it leaves this list. Nothing leaves your device.' });
      if (!missed.length) return h('div', head, C.empty('No open mistakes', Object.keys(answers).length ? 'Every question you have answered was correct on your latest try.' : 'Answer some questions first — mistakes will collect here.', h('a.btn.primary', { href: '#/quiz' }, 'Take a quiz')));
      var groups = {};
      missed.forEach(function (q) { (groups[q.chapter] = groups[q.chapter] || []).push(q); });
      function ids(list) { return list.slice(0, 60).map(function (q) { return q.id; }).join(','); }
      return h('div', head,
        h('div.row', { style: { marginBottom: '16px' } }, h('a.btn.primary.lg', { href: '#/quiz/run?retry=' + ids(u.shuffle(missed)) }, u.svg('refresh'), 'Retry ' + Math.min(60, missed.length) + ' mistake' + (missed.length > 1 ? 's' : '')), h('span.small.muted', missed.length + ' open across ' + Object.keys(groups).length + ' chapter' + (Object.keys(groups).length > 1 ? 's' : ''))),
        Object.keys(groups).sort(function (a, b) { return a - b; }).map(function (k) {
          var list = groups[k];
          return h('section.card',
            h('div.row.between', h('h2', { style: H2 }, 'Chapter ' + k + ' · ' + IFL.course.chapter(Number(k)).title), h('a.btn.sm', { href: '#/quiz/run?retry=' + ids(list) }, 'Retry these ' + list.length)),
            h('ul.list', list.map(function (q) {
              var a = answers[q.id], t = IFL.course.topic(q.topic);
              return h('li', h('div', IFL.trunc(q.q, 140)), h('div.small.muted', (t ? h('a', { href: '#/topic/' + q.topic }, '§' + t.section + ' ' + IFL.trunc(t.title, 40)) : ''), ' · answered ' + a.n + '×, correct ' + a.correct + '× · ' + u.ago(a.last)));
            })));
        }));
    });
  });

  /* ---------- Printable chapter summary ---------- */
  IFL.route('/chapter/:n/print', function (ctx) {
    var n = Number(ctx.params.n);
    if (!IFL.course.chapter(n)) throw new Error('Chapter ' + ctx.params.n + ' does not exist');
    return window.IFL_DATA.loadChapter(n).then(function (ch) {
      function pages(p) { return C.pagesLabel(p); }
      return h('div.print-sheet',
        h('div.row.no-print', { style: { marginBottom: '14px' } }, h('a.btn', { href: '#/chapter/' + n + '?tab=summary' }, u.svg('left'), 'Back to chapter'), h('button.btn.primary', { type: 'button', onclick: function () { window.print(); } }, u.svg('download'), 'Print or save as PDF'), h('span.small.muted', 'Use your browser’s print dialog; choose “Save as PDF” to keep a copy.')),
        h('header', h('div.eyebrow', 'Chapter ' + n + ' revision sheet · textbook ' + pages(ch.pages)), h('h1', ch.title), h('p', ch.summary)),
        ch.objectives && ch.objectives.length ? h('section', h('h2', 'Learning objectives'), h('ul', ch.objectives.map(function (o) { return h('li', o); }))) : null,
        h('section', h('h2', 'Key takeaways'), h('ol', ch.takeaways.map(function (t) { return h('li', t); }))),
        h('section', h('h2', 'Topic by topic'), ch.topics.map(function (t) {
          return h('article.print-topic',
            h('h3', '§' + t.section + ' ' + t.title, h('span.muted', ' · ' + pages(t.pages))),
            t.simple ? h('p', t.simple) : null,
            t.keyPoints && t.keyPoints.length ? h('ul', t.keyPoints.map(function (k) { return h('li', k); })) : null,
            t.definitions && t.definitions.length ? h('dl', t.definitions.map(function (d) { return [h('dt', d.term), h('dd', d.meaning)]; })) : null,
            t.confusions && t.confusions.length ? h('div', t.confusions.map(function (c) { return h('p.small', h('strong', 'Avoid: '), c.wrong, ' ', h('strong', 'Instead: '), c.right); })) : null);
        })),
        ch.checklist && ch.checklist.length ? h('section', h('h2', 'Exam checklist'), h('ul.print-check', ch.checklist.map(function (c) { return h('li', '☐ ', c); }))) : null,
        h('p.small.muted', 'Study summary based on Muhammad Ayub, Understanding Islamic Finance. Page references are to the printed textbook.'));
    });
  });
})();
