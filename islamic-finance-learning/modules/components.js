/* Shared UI components: headers, progress, source footers, bookmarks/notes, question renderer,
   concept cards, comparison tables, data tables, debate blocks and interactive diagrams. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, P = function () { return IFL.progress; };
  var C = IFL.c = {};

  C.pageHead = function (o) {
    return h('div.page-head',
      h('div', o.crumbs ? C.crumbs(o.crumbs) : null, o.eyebrow ? h('div.eyebrow', o.eyebrow) : null, h('h1', o.title), o.desc ? h('p', o.desc) : null),
      o.actions ? h('div.row', o.actions) : null);
  };
  C.crumbs = function (list) {
    var out = h('nav.crumbs', { 'aria-label': 'Breadcrumb' });
    list.forEach(function (c, i) { if (i) out.appendChild(h('span', { 'aria-hidden': 'true' }, '/')); out.appendChild(c.route ? h('a', { href: '#' + c.route }, c.label) : h('span', c.label)); });
    return out;
  };
  C.bar = function (pct, cls) { return h('div.progress' + (cls ? '.' + cls : ''), { role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': pct + '% complete' }, h('span', { style: { width: Math.max(0, Math.min(100, pct)) + '%' } })); };
  C.ring = function (pct, size, label) {
    var r = h('div.ring', { role: 'img', 'aria-label': (label || 'Progress') + ': ' + pct + '%', style: { '--p': pct, '--size': (size || 92) + 'px' } }, h('span', pct + '%'));
    return r;
  };
  C.stat = function (v, l) { return h('div.stat', h('span.v', v), h('span.l', l)); };
  C.tier = function (t) { var L = { core: 'Core concept', supporting: 'Supporting concept', detailed: 'Detailed concept', revision: 'Revision concept' }; return t ? h('span.badge.tier-' + t, L[t] || t) : null; };
  C.empty = function (title, text, action) { return h('div.empty', h('h3', title), text ? h('p', text) : null, action || null); };
  C.icon = u.svg;

  /* ---------- Source footer + "View Source Context" ---------- */
  C.pagesLabel = function (p) { return p ? (p[0] === p[1] ? 'p. ' + p[0] : 'pp. ' + p[0] + '–' + p[1]) : ''; };
  C.sourceFoot = function (topicId, extra) {
    var t = IFL.course.topic(topicId); if (!t) return null;
    var ch = IFL.course.chapter(t.chapter);
    return h('div.source-foot',
      u.svg('source'), h('span', h('strong', 'Source: '), 'Understanding Islamic Finance (Ayub)'),
      h('span', 'Chapter ' + t.chapter), h('span', t.section === 'Appendix' ? 'Appendix' : 'Section ' + t.section),
      t.pages ? h('span', 'Textbook ' + C.pagesLabel(t.pages)) : null, extra || null,
      h('button.btn.sm.ghost', { type: 'button', onclick: function () { C.sourceContext(topicId); } }, 'View source context'));
  };
  C.sourceContext = function (topicId) {
    var t = IFL.course.topic(topicId), ch = IFL.course.chapter(t.chapter);
    var siblings = ch.topicObjs;
    var pdfPage = t.pages ? t.pages[0] + 28 : null;
    var body = h('div.stack',
      h('dl.kv', h('dt', 'Book'), h('dd', 'Muhammad Ayub, Understanding Islamic Finance (John Wiley & Sons)'),
        h('dt', 'Part'), h('dd', IFL.course.partTitle(ch.part)),
        h('dt', 'Chapter'), h('dd', ch.n + ' — ' + ch.title + ' (pp. ' + ch.pages[0] + '–' + ch.pages[1] + ')'),
        h('dt', 'Section'), h('dd', (t.section === 'Appendix' ? 'Appendix' : t.section) + ' — ' + t.title),
        t.pages ? h('dt', 'Textbook pages') : null, t.pages ? h('dd', C.pagesLabel(t.pages) + ' (PDF page ' + pdfPage + ')') : null),
      h('div', h('h3.small', 'Where this sits in the chapter'),
        h('ol.small', siblings.map(function (s) { return h('li', { style: s.id === t.id ? { fontWeight: 700 } : null }, h('a', { href: '#/topic/' + s.id }, '§' + s.section + ' ' + s.title)); }))),
      h('p.small.muted', 'The platform paraphrases the textbook and cites pages; it does not reproduce the book\'s text. If the PDF is present in the local textbook/ folder you can open it at this page.'),
      pdfPage ? h('a.btn', { href: 'textbook/Understanding-Islamic-Finance.pdf#page=' + pdfPage, target: '_blank', rel: 'noopener' }, u.svg('book'), 'Open textbook PDF at page ' + t.pages[0]) : null);
    u.modal({ title: 'Source context', body: body, wide: true });
  };

  /* ---------- Bookmarks & notes ---------- */
  C.bookmarkBtn = function (item, small) {
    var on = P().hasBookmark(item.type, item.id);
    var b = h('button.btn' + (small ? '.sm' : '') + (on ? '.on' : ''), { type: 'button', 'aria-pressed': String(on), title: on ? 'Remove bookmark' : 'Bookmark' }, u.svg('bookmark'), small ? null : (on ? 'Bookmarked' : 'Bookmark'));
    b.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var now = P().toggleBookmark(item);
      b.classList.toggle('on', now); b.setAttribute('aria-pressed', String(now));
      if (!small) b.lastChild.textContent = now ? 'Bookmarked' : 'Bookmark';
    });
    return b;
  };
  C.noteBtn = function (target, small) {
    var count = P().notesFor(target.type, target.id).length;
    var b = h('button.btn' + (small ? '.sm' : ''), { type: 'button', title: 'Notes' }, u.svg('note'), small ? (count ? String(count) : null) : ('Notes' + (count ? ' (' + count + ')' : '')));
    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); C.notesDialog(target); });
    return b;
  };
  C.notesDialog = function (target) {
    var list = h('div.stack');
    var ta = h('textarea.input', { 'aria-label': 'New note', placeholder: 'Write a note…' });
    var editing = null;
    function draw() {
      list.innerHTML = '';
      var notes = P().notesFor(target.type, target.id);
      if (!notes.length) list.appendChild(h('p.muted.small', 'No notes yet for this item.'));
      notes.forEach(function (n) {
        list.appendChild(h('div.card.flat', { style: { padding: '12px' } },
          h('div.small.muted', 'Updated ' + u.ago(n.updated)),
          h('p', { style: { whiteSpace: 'pre-wrap', marginTop: '4px' } }, n.text),
          h('div.row', h('button.btn.sm', { type: 'button', onclick: function () { editing = n.id; ta.value = n.text; ta.focus(); } }, u.svg('edit'), 'Edit'),
            h('button.btn.sm.danger', { type: 'button', onclick: function () { P().deleteNote(n.id); draw(); } }, u.svg('trash'), 'Delete'))));
      });
    }
    draw();
    u.modal({ title: 'Notes — ' + target.label, wide: true, body: h('div.stack', list, h('div.field', h('label', { for: 'note-ta' }, 'Add or edit a note'), ta)),
      actions: [{ label: 'Close' }, { label: 'Save note', primary: true, onClick: function () {
        var text = ta.value.trim(); if (!text) { u.toast('Write something first'); return false; }
        P().saveNote({ id: editing, target: target, text: text }); editing = null; ta.value = ''; draw(); u.toast('Note saved'); return false;
      } }] });
    ta.id = 'note-ta';
  };

  /* ---------- Tables, debates, examples ---------- */
  C.table = function (t) {
    if (!t) return null;
    return h('div.table-wrap', h('table', t.caption ? h('caption', t.caption) : null,
      t.head ? h('thead', h('tr', t.head.map(function (c) { return h('th', { scope: 'col' }, c); }))) : null,
      h('tbody', t.rows.map(function (r) { return h('tr', r.map(function (c, i) { return i === 0 && t.head && t.head.length === r.length ? h('th', { scope: 'row' }, c) : h('td', c); })); }))));
  };
  C.debate = function (d) {
    return h('div.debate',
      h('div.issue', h('div.k', 'Issue'), d.issue),
      h('div.crit', h('div.k', 'Argument / criticism'), d.criticism),
      h('div.resp', h('div.k', 'Author\'s discussion'), d.response),
      d.alternative && d.alternative !== '—' ? h('div.alt', h('div.k', 'Alternative view / way forward'), d.alternative) : null,
      h('div.take', h('div.k', 'Student takeaway'), d.takeaway));
  };
  C.example = function (e) {
    return h('div.example', h('div.h', e.kind === 'practice' ? h('span.badge.gold', 'Practice Example — generated for learning') : h('span.badge.accent', 'Textbook example'), e.title), h('div', e.text));
  };

  /* ---------- Concept (rapid revision) card ---------- */
  C.conceptCard = function (c, opts) {
    opts = opts || {};
    var src = c.topics.slice(0, 3).map(function (id) { return h('a.chip', { href: '#/topic/' + id }, IFL.course.sourceLabel(id)); });
    return h('article.card.rev-card', { 'aria-label': c.name },
      h('div.row.between', h('span.badge.accent', c.group), opts.noActions ? null : h('div.row', C.bookmarkBtn({ type: 'concept', id: c.id, label: c.name, route: '/concept/' + c.id }, true))),
      h('h2', c.name),
      h('p.one', c.oneLine),
      h('h4', 'Key points'), h('ol', c.points.map(function (p) { return h('li', p); })),
      h('div.callout.info', h('div.t', 'Important distinction'), h('p', c.distinction)),
      h('div.trig', h('strong', 'Exam trigger: '), c.trigger),
      h('div.source-foot', u.svg('source'), h('strong', 'Source:'), src));
  };

  /* ---------- Comparison table ---------- */
  C.compareTable = function (pair) {
    return h('div.table-wrap', h('table', h('caption', pair.title),
      h('thead', h('tr', h('th', { scope: 'col' }, 'Aspect'), pair.cols.map(function (c) { return h('th', { scope: 'col' }, c); }))),
      h('tbody', pair.rows.map(function (r) { return h('tr', h('th', { scope: 'row' }, r[0]), r.slice(1).map(function (x) { return h('td', x); })); }))));
  };

  /* ---------- Question renderer ----------
     C.question(q, {onAnswer(correct), compact, showMeta}) → element. */
  var SINGLE = { mcq: 1, definition: 1, identify: 1, comparison: 1, scenario: 1, application: 1 };
  var TYPE_LABEL = { mcq: 'Multiple choice', tf: 'True / False', multi: 'Multiple select', match: 'Matching', order: 'Ordering', definition: 'Definition', identify: 'Identify the concept', comparison: 'Comparison', scenario: 'Scenario', application: 'Application', short: 'Short answer' };
  var DIFF = { E: 'Easy', M: 'Medium', H: 'Hard' };
  C.typeLabel = function (t) { return TYPE_LABEL[t] || t; };
  C.question = function (q, opts) {
    opts = opts || {};
    var wrap = h('div.q-card');
    var answered = false;
    if (opts.showMeta !== false) wrap.appendChild(h('div.q-meta',
      h('span.badge.accent', TYPE_LABEL[q.type] || q.type), q.diff ? h('span.badge', DIFF[q.diff]) : null, q.level ? h('span.badge', q.level.charAt(0).toUpperCase() + q.level.slice(1)) : null,
      h('span.badge.info', IFL.course.sourceLabel(q.topic))));
    wrap.appendChild(h('div.q-text', { id: 'qt-' + q.id }, q.q));
    var area = h('div', { role: 'group', 'aria-labelledby': 'qt-' + q.id }); wrap.appendChild(area);
    var fb = h('div', { 'aria-live': 'polite' }); wrap.appendChild(fb);

    function finish(correct, userShort) {
      if (answered) return; answered = true;
      var t = IFL.course.topic(q.topic);
      fb.appendChild(h('div.feedback.' + (correct ? 'ok' : 'bad'),
        h('div.t', correct ? '✓ Correct' : '✗ Not quite'),
        !correct && q.type !== 'short' ? h('p', h('strong', 'Correct answer: '), correctText(q)) : null,
        q.explanation ? h('p', q.explanation) : null,
        q.obj ? h('p.small.muted', 'Learning objective: ' + q.obj) : null,
        h('div.row.small', h('span.muted', 'Source: ' + IFL.course.sourceLabel(q.topic)), t ? h('a.btn.sm', { href: '#/topic/' + q.topic }, correct ? 'Open topic' : 'Review topic') : null)));
      P().recordAnswer(q, correct);
      if (opts.onAnswer) opts.onAnswer(correct, q);
    }

    if (SINGLE[q.type]) {
      var btns = q.options.map(function (o, i) {
        return h('button.opt', { type: 'button', 'data-i': i, onclick: function () {
          if (answered) return;
          btns.forEach(function (b, j) { b.disabled = true; if (j === q.answer) b.classList.add('correct'); });
          if (i !== q.answer) btns[i].classList.add('incorrect');
          finish(i === q.answer);
        } }, h('span.key', String.fromCharCode(65 + i)), h('span', o));
      });
      btns.forEach(function (b) { area.appendChild(b); });
      wrap._keys = function (k) { var i = '1234567'.indexOf(k); if (i < 0) i = 'abcdefg'.indexOf(k.toLowerCase()); if (i > -1 && btns[i] && !answered) btns[i].click(); };
    } else if (q.type === 'tf') {
      var tb = [true, false].map(function (v) {
        return h('button.opt', { type: 'button', onclick: function () {
          if (answered) return;
          tb.forEach(function (b, j) { b.disabled = true; if ((j === 0) === q.answer) b.classList.add('correct'); });
          if (v !== q.answer) this.classList.add('incorrect');
          finish(v === q.answer);
        } }, h('span.key', v ? 'T' : 'F'), h('span', v ? 'True' : 'False'));
      });
      tb.forEach(function (b) { area.appendChild(b); });
      wrap._keys = function (k) { if (/^[t1]$/i.test(k)) tb[0].click(); if (/^[f2]$/i.test(k)) tb[1].click(); };
    } else if (q.type === 'multi') {
      var sel = {};
      var mb = q.options.map(function (o, i) {
        return h('button.opt', { type: 'button', 'aria-pressed': 'false', onclick: function () { if (answered) return; sel[i] = !sel[i]; this.setAttribute('aria-pressed', String(!!sel[i])); } }, h('span.key', '☐'), h('span', o));
      });
      mb.forEach(function (b) { area.appendChild(b); });
      area.appendChild(h('div.row', { style: { marginTop: '12px' } }, h('button.btn.primary', { type: 'button', onclick: function () {
        if (answered) return;
        var chosen = Object.keys(sel).filter(function (k) { return sel[k]; }).map(Number);
        if (!chosen.length) { u.toast('Select at least one option'); return; }
        var correctSet = q.answer.slice().sort().join(','), ok = chosen.sort().join(',') === correctSet;
        mb.forEach(function (b, j) { b.disabled = true; var isAns = q.answer.indexOf(j) > -1; if (isAns) b.classList.add('correct'); else if (sel[j]) b.classList.add('incorrect'); });
        this.disabled = true; finish(ok);
      } }, 'Check answer'), h('span.small.muted', 'Select all that apply')));
    } else if (q.type === 'match') {
      var rights = u.shuffle(q.pairs.map(function (p) { return p[1]; }), q.id.length * 7 + 3);
      var selects = q.pairs.map(function (p, i) {
        var s = h('select.input', { 'aria-label': 'Match for ' + p[0] }, h('option', { value: '' }, 'Choose…'), rights.map(function (r) { return h('option', { value: r }, r); }));
        return s;
      });
      area.appendChild(h('div.match-grid', q.pairs.map(function (p, i) { return [h('div', h('strong', p[0])), selects[i]]; })));
      area.appendChild(h('div.row', { style: { marginTop: '12px' } }, h('button.btn.primary', { type: 'button', onclick: function () {
        if (answered) return;
        if (selects.some(function (s) { return !s.value; })) { u.toast('Match every item first'); return; }
        var ok = true;
        selects.forEach(function (s, i) { var good = s.value === q.pairs[i][1]; if (!good) ok = false; s.disabled = true; s.style.borderColor = good ? 'var(--ok)' : 'var(--bad)'; });
        this.disabled = true; finish(ok);
      } }, 'Check matches')));
    } else if (q.type === 'order') {
      var cur = u.shuffle(q.items.map(function (x, i) { return i; }), q.id.length * 13 + 1);
      if (cur.every(function (v, i) { return v === i; })) cur.reverse();
      var ol = h('ol.order-list');
      function drawOrder() {
        ol.innerHTML = '';
        cur.forEach(function (idx, pos) {
          ol.appendChild(h('li', h('span.badge', String(pos + 1)), h('span.grow', q.items[idx]),
            h('button.btn.sm', { type: 'button', 'aria-label': 'Move up', disabled: pos === 0 || answered, onclick: function () { var t = cur[pos - 1]; cur[pos - 1] = cur[pos]; cur[pos] = t; drawOrder(); } }, '↑'),
            h('button.btn.sm', { type: 'button', 'aria-label': 'Move down', disabled: pos === cur.length - 1 || answered, onclick: function () { var t = cur[pos + 1]; cur[pos + 1] = cur[pos]; cur[pos] = t; drawOrder(); } }, '↓')));
        });
      }
      drawOrder(); area.appendChild(ol);
      area.appendChild(h('div.row', h('button.btn.primary', { type: 'button', onclick: function () {
        if (answered) return;
        var ok = cur.every(function (v, i) { return v === i; });
        Array.prototype.forEach.call(ol.children, function (li, i) { li.classList.add(cur[i] === i ? 'correct' : 'incorrect'); });
        this.disabled = true; answered = false; finish(ok); drawOrderFinal();
      } }, 'Check order')));
      function drawOrderFinal() { Array.prototype.forEach.call(ol.querySelectorAll('button'), function (b) { b.disabled = true; }); }
    } else if (q.type === 'short') {
      var ta = h('textarea.input', { 'aria-label': 'Your answer', placeholder: 'Write your answer, then reveal the model answer.' });
      area.appendChild(ta);
      var reveal = h('button.btn.primary', { type: 'button', style: { marginTop: '10px' }, onclick: function () {
        reveal.disabled = true;
        var text = u.norm(ta.value), kws = q.keywords || [];
        var hit = kws.filter(function (k) { return text.indexOf(u.norm(k)) > -1; });
        var box = h('div.feedback.ok', { style: { background: 'var(--info-soft)', borderColor: 'transparent' } },
          h('div.t', 'Model answer'), h('p', q.answer),
          kws.length ? h('p.small', h('strong', 'Key terms: '), kws.map(function (k) { var got = hit.indexOf(k) > -1; return h('span.badge.' + (got ? 'ok' : 'warn'), { style: { marginRight: '4px' } }, (got ? '✓ ' : '') + k); })) : null,
          ta.value.trim() ? h('p.small.muted', 'Your answer used ' + hit.length + ' of ' + kws.length + ' key terms.') : null,
          h('div.row', h('span.small', 'How did you do?'),
            h('button.btn.sm', { type: 'button', onclick: function () { self(true); } }, 'I had the key points'),
            h('button.btn.sm', { type: 'button', onclick: function () { self(false); } }, 'Not yet')));
        area.appendChild(box);
        function self(ok) { Array.prototype.forEach.call(box.querySelectorAll('button'), function (b) { b.disabled = true; }); finish(ok, ta.value); }
      } }, 'Reveal model answer');
      area.appendChild(reveal);
    } else {
      area.appendChild(h('p.muted', 'This question type is not supported.'));
    }
    return wrap;
  };
  function correctText(q) {
    if (SINGLE[q.type]) return q.options[q.answer];
    if (q.type === 'tf') return q.answer ? 'True' : 'False';
    if (q.type === 'multi') return q.answer.map(function (i) { return q.options[i]; }).join('; ');
    if (q.type === 'match') return q.pairs.map(function (p) { return p[0] + ' → ' + p[1]; }).join('; ');
    if (q.type === 'order') return q.items.map(function (x, i) { return (i + 1) + '. ' + x; }).join('  ');
    return q.answer;
  }
  /* Convert a topic's quickCheck into a question object. */
  C.quickCheckQuestion = function (t) {
    if (!t.quickCheck) return null;
    return { id: 'qc-' + t.id, type: 'mcq', q: t.quickCheck.q, options: t.quickCheck.options, answer: t.quickCheck.answer, explanation: t.quickCheck.explanation, topic: t.id, diff: 'E', level: 'recall', obj: 'Quick check: ' + t.title };
  };

  /* ---------- Interactive transaction diagram ---------- */
  C.diagram = function (d, opts) {
    opts = opts || {};
    var W = 760, H = 380, cur = 0;
    var pos = {}; d.parties.forEach(function (p) { pos[p.id] = { x: p.x / 100 * W, y: 40 + p.y / 60 * (H - 90) }; });
    var NS = 'http://www.w3.org/2000/svg';
    function el(tag, attrs, text) { var e = document.createElementNS(NS, tag); Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); }); if (text != null) e.textContent = text; return e; }
    var svgEl = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'diagram-svg', role: 'img', 'aria-label': d.title + ' — transaction diagram' });
    var defs = el('defs'); var mk = el('marker', { id: 'arr-' + d.id, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }); mk.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', fill: 'currentColor' })); defs.appendChild(mk); svgEl.appendChild(defs);
    var edgesG = el('g'), partiesG = el('g'); svgEl.appendChild(edgesG); svgEl.appendChild(partiesG);
    var BW = 150, BH = 44;
    // Edge geometry: parallel edges between the same pair are offset.
    var pairCount = {};
    var edges = d.steps.map(function (s, i) {
      var key = [s.from, s.to].sort().join('|'); pairCount[key] = (pairCount[key] || 0) + 1;
      return { s: s, i: i, key: key, k: pairCount[key] };
    });
    var totals = {}; edges.forEach(function (e) { totals[e.key] = pairCount[e.key]; });
    var edgeEls = edges.map(function (e) {
      var a = pos[e.s.from], b = pos[e.s.to], g = el('g', { class: 'edge kind-' + e.s.kind, tabindex: 0, role: 'button', 'aria-label': 'Step ' + (e.i + 1) + ': ' + e.s.label });
      var pathD, lx, ly;
      if (e.s.from === e.s.to) {
        var x = a.x, y = a.y - BH / 2; pathD = 'M' + (x - 20) + ',' + y + ' C' + (x - 50) + ',' + (y - 60) + ' ' + (x + 50) + ',' + (y - 60) + ' ' + (x + 20) + ',' + y;
        lx = x; ly = y - 58;
      } else {
        var n = totals[e.key], off = (e.k - (n + 1) / 2) * 30;
        var dir = e.s.from < e.s.to ? 1 : -1; // stable normal for the pair
        var dx = b.x - a.x, dy = b.y - a.y, len = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / len * dir, ny = dx / len * dir;
        var sx = a.x + dx / len * (BW / 2 - 4) * Math.min(1, Math.abs(dx) / len + 0.3), sy = a.y + dy / len * (BH / 2 + 2);
        var ex = b.x - dx / len * (BW / 2 - 4) * Math.min(1, Math.abs(dx) / len + 0.3), ey = b.y - dy / len * (BH / 2 + 2);
        var mx = (sx + ex) / 2 + nx * off, my = (sy + ey) / 2 + ny * off;
        pathD = 'M' + sx + ',' + sy + ' Q' + (2 * mx - (sx + ex) / 2) + ',' + (2 * my - (sy + ey) / 2) + ' ' + ex + ',' + ey;
        lx = mx; ly = my - 6;
      }
      g.appendChild(el('path', { d: pathD, 'marker-end': 'url(#arr-' + d.id + ')', style: 'color: currentColor' }));
      g.appendChild(el('circle', { cx: lx - 0, cy: ly - 12, r: 9, class: 'num' }));
      g.appendChild(el('text', { x: lx, y: ly - 8.5, 'text-anchor': 'middle', class: 'numt' }, String(e.i + 1)));
      var label = e.s.label.length > 34 ? e.s.label.slice(0, 32) + '…' : e.s.label;
      g.appendChild(el('text', { x: lx, y: ly + 10, 'text-anchor': 'middle', class: 'lbl' }, label));
      g.appendChild(el('title', {}, (e.i + 1) + '. ' + e.s.label));
      g.addEventListener('click', function () { setStep(e.i); });
      g.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); setStep(e.i); } });
      edgesG.appendChild(g); return g;
    });
    var partyEls = {};
    d.parties.forEach(function (p) {
      var c = pos[p.id], g = el('g', { class: 'party' });
      g.appendChild(el('rect', { x: c.x - BW / 2, y: c.y - BH / 2, width: BW, height: BH, rx: 10 }));
      var words = p.label.split(' '), line1 = p.label, line2 = '';
      if (p.label.length > 20) { var mid = Math.ceil(words.length / 2); line1 = words.slice(0, mid).join(' '); line2 = words.slice(mid).join(' '); }
      g.appendChild(el('text', { x: c.x, y: c.y + (line2 ? -3 : 4), 'text-anchor': 'middle' }, line1));
      if (line2) g.appendChild(el('text', { x: c.x, y: c.y + 12, 'text-anchor': 'middle' }, line2));
      partiesG.appendChild(g); partyEls[p.id] = g;
    });
    var detail = h('div.card.sunk', { 'aria-live': 'polite', style: { minHeight: '104px' } });
    var list = h('ol.step-list');
    var stepBtns = d.steps.map(function (s, i) {
      var b = h('button', { type: 'button', onclick: function () { setStep(i); } }, h('span.n', String(i + 1)), h('span', s.label));
      list.appendChild(h('li', b)); return b;
    });
    var KIND = { contract: 'Contract', promise: 'Promise', cash: 'Payment', goods: 'Goods / delivery', ownership: 'Ownership', agency: 'Agency', rent: 'Rent', risk: 'Risk' };
    function setStep(i) {
      cur = Math.max(0, Math.min(d.steps.length - 1, i));
      edgeEls.forEach(function (g, j) { g.setAttribute('class', 'edge kind-' + d.steps[j].kind + (j === cur ? ' active' : j < cur ? ' done' : ' future')); });
      Object.keys(partyEls).forEach(function (k) { partyEls[k].setAttribute('class', 'party' + (k === d.steps[cur].from || k === d.steps[cur].to ? ' active' : '')); });
      stepBtns.forEach(function (b, j) { if (j === cur) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
      var s = d.steps[cur];
      detail.innerHTML = '';
      u.append(detail, [h('div.row', h('span.badge.accent', 'Step ' + (cur + 1) + ' of ' + d.steps.length), h('span.badge', KIND[s.kind] || s.kind)), h('h4', { style: { margin: '8px 0 4px' } }, s.label), h('p', { style: { margin: 0 } }, s.detail)]);
      prev.disabled = cur === 0; next.disabled = cur === d.steps.length - 1;
    }
    var prev = h('button.btn', { type: 'button', onclick: function () { setStep(cur - 1); } }, u.svg('left'), 'Previous');
    var next = h('button.btn.primary', { type: 'button', onclick: function () { setStep(cur + 1); } }, 'Next step', u.svg('right'));
    var root = h('div.stack',
      opts.hideSummary ? null : h('p.text-2', d.summary),
      h('div.diagram-wrap', svgEl),
      h('div.row', prev, next, h('span.spacer'), h('span.small.muted', 'Click an arrow or a step to see the explanation.')),
      h('div.grid.grid-2', detail, h('div.card.flat', h('h4', 'All steps'), list)),
      opts.hideRules ? null : h('div.grid.grid-2',
        h('div.callout', h('div.t', 'Key Shari’ah rules'), h('ul', d.rules.map(function (r) { return h('li', r); }))),
        h('div.callout.bad', h('div.t', 'Pitfalls that invalidate or weaken the structure'), h('ul', d.pitfalls.map(function (r) { return h('li', r); })))));
    // Crop the canvas vertically to what was drawn, so single-row flows do not float in empty space.
    function fit() {
      if (!svgEl.isConnected) return;
      try {
        var lbls = svgEl.querySelectorAll('.lbl'); Array.prototype.forEach.call(lbls, function (l) { l.style.display = 'inline'; });
        var bb = svgEl.getBBox();
        Array.prototype.forEach.call(lbls, function (l) { l.style.display = ''; });
        var top = Math.max(0, bb.y - 20), bottom = Math.min(H, bb.y + bb.height + 20);
        if (bottom - top < 200) { var mid = (top + bottom) / 2; top = Math.max(0, mid - 100); bottom = Math.min(H, top + 200); }
        svgEl.setAttribute('viewBox', '0 ' + Math.round(top) + ' ' + W + ' ' + Math.round(bottom - top));
      } catch (e) { /* keep the default canvas */ }
    }
    setTimeout(function () { setStep(0); fit(); });
    return root;
  };
})();
