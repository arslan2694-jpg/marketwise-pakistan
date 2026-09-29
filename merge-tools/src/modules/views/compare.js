
/* Comparison Lab: textbook comparisons + build-your-own mode comparison. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;

  function labSource(p) {
    var sr = p.source || {}, parts = [];
    if ((sr.chapters || []).length) parts.push('Ch ' + sr.chapters.join(', '));
    if ((sr.sections || []).length) parts.push('§' + sr.sections.join(', §'));
    if ((sr.pages || []).length) parts.push('p. ' + sr.pages.join(', '));
    return parts.length ? h('div.source-foot', u.svg('source'), h('strong', 'Source: '), h('span', parts.join(' · '))) : null;
  }
  IFL.route('/compare', function (ctx) {
    return window.IFL_DATA.load(['comparisons']).then(function (r) {
      var cmp = r.comparisons, pairs = cmp.pairs;
      var sel = ctx.query.id && pairs.filter(function (p) { return p.id === ctx.query.id || (p.aliases || []).indexOf(ctx.query.id) > -1; })[0] || pairs[0];
      var tableBox = h('div');
      var listEl = h('div.stack');
      function showPair(p) {
        sel = p;
        Array.prototype.forEach.call(listEl.querySelectorAll('button[data-id]'), function (b) { b.classList.toggle('on', b.dataset.id === p.id); b.setAttribute('aria-pressed', String(b.dataset.id === p.id)); });
        tableBox.innerHTML = '';
        u.append(tableBox, [h('div.row.between', h('h2', { style: { margin: 0, fontSize: 'var(--fs-xl)' } }, p.title), h('div.row', p.lab ? h('span.badge.accent', 'Comparison lab') : null, C.bookmarkBtn({ type: 'comparison', id: p.id, label: p.title, route: '/compare?id=' + p.id }, true), C.noteBtn({ type: 'comparison', id: p.id, label: p.title, route: '/compare?id=' + p.id }, true))),
          p.summary ? h('p.text-2', p.summary) : null,
          C.compareTable(p), p.lab ? labSource(p) : null, p.topic ? C.sourceFoot(p.topic) : null]);
        IFL.progress.log('compare', 'Compared: ' + p.title, '/compare?id=' + p.id);
      }
      function pairBtn(p) { return h('button.btn', { type: 'button', 'data-id': p.id, 'aria-pressed': 'false', style: { justifyContent: 'flex-start', whiteSpace: 'normal', height: 'auto', padding: '8px 12px', textAlign: 'left' }, onclick: function () { showPair(p); } }, p.title); }
      var textPairs = pairs.filter(function (p) { return !p.lab; }), labPairs = pairs.filter(function (p) { return p.lab; });
      listEl.appendChild(h('div.small.muted', { style: { margin: '2px 0' } }, textPairs.length + ' textbook comparisons'));
      textPairs.forEach(function (p) { listEl.appendChild(pairBtn(p)); });
      if (labPairs.length) {
        listEl.appendChild(h('div.small.muted', { style: { margin: '10px 0 2px' } }, labPairs.length + ' comparison labs (dimension-by-dimension)'));
        labPairs.forEach(function (p) { listEl.appendChild(pairBtn(p)); });
      }
      showPair(sel);

      // Build-your-own
      var picked = ['murabaha', 'ijarah', 'musharakah'], aspects = cmp.aspects.map(function (a) { return a.key; });
      var custom = h('div');
      var modeChips = h('div.row', cmp.modes.map(function (m) {
        var b = h('button.chip', { type: 'button', 'aria-pressed': String(picked.indexOf(m.id) > -1), onclick: function () {
          var i = picked.indexOf(m.id);
          if (i > -1) picked.splice(i, 1); else { if (picked.length >= 4) { u.toast('Compare up to four modes'); return; } picked.push(m.id); }
          b.setAttribute('aria-pressed', String(picked.indexOf(m.id) > -1)); drawCustom();
        } }, m.name);
        return b;
      }));
      var aspectChips = h('div.row', cmp.aspects.map(function (a) {
        var b = h('button.chip', { type: 'button', 'aria-pressed': 'true', onclick: function () { var i = aspects.indexOf(a.key); if (i > -1) aspects.splice(i, 1); else aspects.push(a.key); b.setAttribute('aria-pressed', String(aspects.indexOf(a.key) > -1)); drawCustom(); } }, a.label);
        return b;
      }));
      function drawCustom() {
        custom.innerHTML = '';
        var ms = picked.map(function (id) { return cmp.modes.filter(function (m) { return m.id === id; })[0]; });
        if (ms.length < 2) { custom.appendChild(h('p.muted.small', 'Pick at least two modes.')); return; }
        var as = cmp.aspects.filter(function (a) { return aspects.indexOf(a.key) > -1; });
        custom.appendChild(h('div.table-wrap', h('table', h('thead', h('tr', h('th', 'Aspect'), ms.map(function (m) { return h('th', h('a', { href: '#/topic/' + m.topic }, m.name)); }))),
          h('tbody', as.map(function (a) { return h('tr', h('th', { scope: 'row' }, a.label), ms.map(function (m) { return h('td', m[a.key]); })); })))));
        custom.appendChild(h('p.small.muted', 'Rows summarise the chapters on each mode (Chapters 9–13) and Box 14.1. Click a mode for its source topic.'));
      }
      drawCustom();
      return h('div',
        C.pageHead({ eyebrow: 'Reference', title: 'Comparison Lab', desc: 'Textbook-supported comparisons with the dimensions the book itself uses, plus a matrix to compare any financing modes side by side.', actions: [h('a.btn', { href: '#/quiz/run?types=comparison,match&n=10&mode=compare' }, u.svg('quiz'), 'Comparison quiz')] }),
        h('div.grid', { style: { gridTemplateColumns: 'minmax(220px, 300px) 1fr' }, class: 'cmp-grid' }, h('div.card', { style: { padding: '12px', alignSelf: 'start' } }, h('div.small.muted', { style: { marginBottom: '6px' } }, pairs.length + ' comparisons in total'), listEl), h('div.card', tableBox)),
        h('section.card', { style: { marginTop: '20px' } }, h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Compare any financing modes'),
          h('div.small.muted', 'Modes (up to four)'), modeChips, h('div.small.muted', { style: { marginTop: '10px' } }, 'Aspects'), aspectChips, h('div', { style: { marginTop: '14px' } }, custom)));
    });
  }, { wide: true });
})();

