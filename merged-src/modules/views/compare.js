/* Comparison Lab: textbook comparisons (contract vs contract, Islamic vs conventional) and a
   build-your-own matrix over every financing mode, using the attributes from both study sources. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var PRESETS = [
    ['All aspects', null],
    ['Ownership and risk', ['ownership', 'ownershipRiskTiming', 'nature']],
    ['Profit and return', ['return', 'returnType', 'returnTypeDetail', 'late']],
    ['Payment structure', ['payment', 'typicalTenor', 'tenor', 'liquidityTradability']],
    ['Risks and conditions', ['keyConditions', 'majorRisks', 'keyRule', 'pitfall']],
    ['Shari’ah basis', ['shariahBasis', 'subjectMatter', 'distinguishingFeature', 'category']]
  ];
  function cell(m, a) {
    var v = m.attributes && m.attributes[a.key] != null ? m.attributes[a.key] : m[a.key];
    if (v == null || v === '') return h('td.muted', '—');
    if (Array.isArray(v)) return h('td', h('ul', { style: { margin: 0, paddingLeft: '16px' } }, v.map(function (x) { return h('li', x); })));
    return h('td', String(v));
  }

  IFL.route('/compare', function (ctx) {
    var pairs = IFL.data.comparisons, aspectsAll = IFL.data.compareAspects, modes = IFL.data.modes;
    var sel = ctx.query.id && (IFL.data.get('comparison', ctx.query.id) || IFL.data.get('comparison', IFL.data.canonicalComparison(ctx.query.id))) || pairs[0];
    var tableBox = h('div');
    var listEl = h('div.stack', { role: 'list' });
    function showPair(p) {
      sel = p;
      Array.prototype.forEach.call(listEl.children, function (b) { b.classList.toggle('on', b.dataset.id === p.id); b.setAttribute('aria-pressed', String(b.dataset.id === p.id)); });
      tableBox.innerHTML = '';
      u.append(tableBox, [h('div.row.between', h('h2', { style: { margin: 0, fontSize: 'var(--fs-xl)' } }, p.title), h('div.row', C.bookmarkBtn({ type: 'comparison', id: p.id, label: p.title, route: '/compare?id=' + p.id }, true), C.noteBtn({ type: 'comparison', id: p.id, label: p.title, route: '/compare?id=' + p.id }, true))),
        p.summary ? h('p.text-2', p.summary) : null, C.compareTable(p),
        p.origin.length > 1 ? h('p.small.muted', 'Rows marked “(extended)” come from the second study source and add detail to the same dimension.') : null,
        p.topicId ? C.sourceFoot(p.topicId) : (p.source && p.source.chapters ? h('div.source-foot', u.svg('source'), h('strong', 'Source:'), 'Chapters ' + p.source.chapters.join(', ') + ' · sections ' + (p.source.sections || []).join(', ')) : null),
        C.relatedPanel('comparison', p.id, { skip: ['topic'], limit: 6 })]);
      IFL.progress.log('compare', 'Compared: ' + p.title, '/compare?id=' + p.id);
    }
    pairs.forEach(function (p) {
      listEl.appendChild(h('button.btn', { type: 'button', role: 'listitem', 'data-id': p.id, 'aria-pressed': 'false', style: { justifyContent: 'flex-start', whiteSpace: 'normal', height: 'auto', padding: '8px 12px', textAlign: 'left' }, onclick: function () { showPair(p); } }, p.title));
    });
    showPair(sel);

    /* Build-your-own */
    var picked = (ctx.query.modes ? ctx.query.modes.split(',') : ['murabaha', 'ijarah', 'musharakah']).filter(function (id) { return IFL.data.mode(id); });
    var aspects = aspectsAll.map(function (a) { return a.key; }), custom = h('div');
    var modeChips = h('div.row', modes.map(function (m) {
      var b = h('button.chip', { type: 'button', 'aria-pressed': String(picked.indexOf(m.id) > -1), onclick: function () {
        var i = picked.indexOf(m.id);
        if (i > -1) picked.splice(i, 1); else { if (picked.length >= 4) { u.toast('Compare up to four modes'); return; } picked.push(m.id); }
        b.setAttribute('aria-pressed', String(picked.indexOf(m.id) > -1)); drawCustom();
      } }, m.name);
      return b;
    }));
    var aspectChips = aspectsAll.map(function (a) {
      var b = h('button.chip', { type: 'button', 'aria-pressed': 'true', onclick: function () { var i = aspects.indexOf(a.key); if (i > -1) aspects.splice(i, 1); else aspects.push(a.key); syncChips(); drawCustom(); } }, a.label);
      b._k = a.key; return b;
    });
    function syncChips() { aspectChips.forEach(function (b) { b.setAttribute('aria-pressed', String(aspects.indexOf(b._k) > -1)); }); }
    var presetRow = h('div.row', PRESETS.map(function (p) { return h('button.btn.sm', { type: 'button', onclick: function () { aspects = p[1] ? p[1].slice() : aspectsAll.map(function (a) { return a.key; }); syncChips(); drawCustom(); } }, p[0]); }));
    function drawCustom() {
      custom.innerHTML = '';
      var ms = picked.map(function (id) { return IFL.data.mode(id); });
      if (ms.length < 2) { custom.appendChild(h('p.muted.small', 'Pick at least two modes.')); return; }
      var as = aspectsAll.filter(function (a) { return aspects.indexOf(a.key) > -1; });
      custom.appendChild(h('div.table-wrap', h('table', h('caption', 'Financing modes compared'), h('thead', h('tr', h('th', 'Aspect'), ms.map(function (m) { return h('th', h('a', { href: '#/mode/' + m.id }, m.name)); }))),
        h('tbody', as.map(function (a) { return h('tr', h('th', { scope: 'row' }, a.label), ms.map(function (m) { return cell(m, a); })); })))));
      custom.appendChild(h('p.small.muted', 'Rows combine the chapter summaries on each mode (Chapters 9–13, Box 14.1) and the structured mode profiles. A dash means the sources do not give that attribute for that mode. Click a mode for its full profile.'));
    }
    drawCustom();
    return h('div',
      C.pageHead({ eyebrow: 'Reference', title: 'Comparison Lab', desc: 'Textbook-supported comparisons — contract against contract, Islamic against conventional — plus a matrix to compare any financing modes side by side on ownership, return, payment, risk and Shari’ah basis.', actions: [h('a.btn', { href: '#/quiz/run?types=comparison,match&n=10&mode=compare' }, u.svg('quiz'), 'Comparison quiz'), h('a.btn', { href: '#/products/compare' }, u.svg('bank'), 'Compare products')] }),
      h('div.grid', { style: { gridTemplateColumns: 'minmax(220px, 300px) 1fr' }, class: 'cmp-grid' }, h('div.card', { style: { padding: '12px', alignSelf: 'start' } }, h('div.small.muted', { style: { marginBottom: '6px' } }, pairs.length + ' textbook comparisons'), listEl), h('div.card', tableBox)),
      h('section.card', { style: { marginTop: '20px' } }, h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Compare any financing modes'),
        h('div.small.muted', 'Modes (up to four)'), modeChips, h('div.small.muted', { style: { marginTop: '10px' } }, 'Focus'), presetRow, h('div.small.muted', { style: { marginTop: '10px' } }, 'Aspects'), h('div.row', aspectChips), h('div', { style: { marginTop: '14px' } }, custom)));
  }, { wide: true });
})();
