/* Financing modes (contracts) — the structured reference layer. A financing MODE is the contract
   (Murabaha, Ijarah, Musharakah…); a PRODUCT is a real-world application built on one or more modes
   (see /products). Each mode page links to its products, transaction diagrams, cases, numericals,
   calculators, comparisons, questions and flashcards through the relationship graph. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var H2 = { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' };
  function ul(items) { return items && items.length ? h('ul', items.map(function (x) { return h('li', x); })) : null; }

  IFL.route('/modes', function (ctx) {
    var modes = IFL.data.modes, cat = ctx.query.cat || '', ret = ctx.query.ret || '', q = ctx.query.q || '';
    var cats = []; modes.forEach(function (m) { if (cats.indexOf(m.category) < 0) cats.push(m.category); });
    var rets = []; modes.forEach(function (m) { if (rets.indexOf(m.returnType) < 0) rets.push(m.returnType); });
    var search = h('input.input', { type: 'search', value: q, placeholder: 'Search modes…', 'aria-label': 'Search financing modes', style: { maxWidth: '260px' } });
    var body = h('div'), count = h('span.small.muted');
    var picked = [];
    var cmpBtn = h('button.btn.primary.sm', { type: 'button', disabled: true, onclick: function () { IFL.go('/compare?modes=' + picked.join(',')); } }, u.svg('compare'), 'Compare selected');
    function chips(list, get, set, label) {
      var cs = [''].concat(list).map(function (v) { var b = h('button.chip', { type: 'button', 'aria-pressed': String(get() === v), onclick: function () { set(v); cs.forEach(function (x) { x.setAttribute('aria-pressed', String(x._v === get())); }); draw(); } }, v || 'All'); b._v = v; return b; });
      return h('div', h('div.small.muted', { style: { margin: '8px 0 4px' } }, label), h('div.row', cs));
    }
    function draw() {
      var nq = u.norm(q);
      var list = modes.filter(function (m) { return (!cat || m.category === cat) && (!ret || m.returnType === ret) && (!nq || u.norm([m.name, m.category, m.shariahBasis, m.commonUse, m.distinguishingFeature].join(' ')).indexOf(nq) > -1); });
      count.textContent = list.length + ' of ' + modes.length + ' modes';
      body.innerHTML = '';
      if (!list.length) { body.appendChild(C.empty('No modes match', 'Change the filters.')); return; }
      body.appendChild(h('div.table-wrap', h('table.mode-table', h('caption', 'Financing modes at a glance'), h('thead', h('tr', h('th', { scope: 'col' }, 'Compare'), h('th', { scope: 'col' }, 'Mode'), h('th', { scope: 'col' }, 'Category'), h('th', { scope: 'col' }, 'Return'), h('th', { scope: 'col' }, 'Typical tenor'), h('th', { scope: 'col' }, 'Chapter'), h('th', { scope: 'col' }, 'Details'))),
        h('tbody', list.map(function (m) {
          var detail = h('tr', { hidden: true, id: 'md-' + m.id }, h('td', { colspan: 7 }, h('div.stack',
            h('p', h('strong', 'Shari’ah basis: '), m.shariahBasis), h('p', h('strong', 'Ownership, risk and timing: '), m.ownershipRiskTiming), h('p', h('strong', 'Common use: '), m.commonUse),
            h('div.grid.grid-2', h('div', h('strong', 'Key conditions'), ul(m.keyConditions)), h('div', h('strong', 'Major risks'), ul(m.majorRisks))),
            h('p', h('strong', 'Distinguishing feature: '), m.distinguishingFeature), h('a.btn.sm.primary', { href: '#/mode/' + m.id }, 'Open full mode page'))));
          var cb = h('input', { type: 'checkbox', 'aria-label': 'Select ' + m.name + ' for comparison', onchange: function () { var i = picked.indexOf(m.id); if (cb.checked) { if (picked.length >= 4) { cb.checked = false; u.toast('Compare up to four modes'); return; } picked.push(m.id); } else if (i > -1) picked.splice(i, 1); cmpBtn.disabled = picked.length < 2; } });
          cb.checked = picked.indexOf(m.id) > -1;
          var tog = h('button.btn.sm', { type: 'button', 'aria-expanded': 'false', 'aria-controls': 'md-' + m.id, onclick: function () { var open = detail.hidden; detail.hidden = !open; tog.setAttribute('aria-expanded', String(open)); tog.textContent = open ? 'Hide' : 'Show'; } }, 'Show');
          return [h('tr', h('td', cb), h('th', { scope: 'row' }, h('a', { href: '#/mode/' + m.id }, m.name)), h('td', m.category), h('td', h('span.badge.' + (m.returnType === 'Fixed' ? 'info' : 'gold'), m.returnType)), h('td.small', IFL.trunc(m.typicalTenor, 90)), h('td', h('a', { href: '#/chapter/' + m.chapter }, 'Ch ' + m.chapter)), h('td', tog)), detail];
        })))));
    }
    search.addEventListener('input', u.debounce(function () { q = search.value.trim(); draw(); }, 150));
    draw();
    var productsByMode = {}; IFL.data.products.forEach(function (p) { p.modeIds.forEach(function (m) { productsByMode[m] = (productsByMode[m] || 0) + 1; }); });
    return h('div',
      C.pageHead({ eyebrow: 'Apply', title: 'Financing modes', desc: modes.length + ' contracts and structures the book describes — from Murabaha and Salam to Sukuk, Takaful and Kafalah — with their Shari’ah basis, ownership and risk, return, tenor, conditions and risks. A mode is a contract; the products built on the modes are in the product catalogue.',
        actions: [h('a.btn', { href: '#/products' }, u.svg('bank'), 'Product catalogue (' + IFL.data.products.length + ')'), h('a.btn', { href: '#/finder' }, u.svg('compass'), 'Which mode applies?'), h('a.btn', { href: '#/compare' }, u.svg('compare'), 'Comparison lab')] }),
      h('section.card', h('div.row', search, cmpBtn, h('span.spacer'), count), chips(cats, function () { return cat; }, function (v) { cat = v; }, 'Category'), chips(rets, function () { return ret; }, function (v) { ret = v; }, 'Return type')),
      h('section.card', body),
      h('p.small.muted', 'Descriptions summarise the textbook’s discussion and are not Shari’ah rulings.'));
  });

  IFL.route('/mode/:id', function (ctx) {
    var m = IFL.data.mode(ctx.params.id) || IFL.data.mode((IFL.data.aliases.modes || {})[ctx.params.id]);
    if (!m) throw new Error('Financing mode not found');
    IFL.progress.log('mode', 'Mode: ' + m.name, '/mode/' + m.id);
    var a = m.attributes || {};
    var diagrams = IFL.data.diagrams.filter(function (d) { return d.modeId === m.id; });
    var prods = IFL.data.products.filter(function (p) { return p.modeIds.indexOf(m.id) > -1; });
    var cases = IFL.data.cases.filter(function (c) { return c.modeIds.indexOf(m.id) > -1; });
    var pairs = IFL.data.comparisons.filter(function (p) { var s = u.norm(p.title); return s.indexOf(u.norm(m.name.split(/[ (/']/)[0])) > -1; });
    var concept = m.conceptId ? IFL.data.get('concept', m.conceptId) : null;
    var topic = IFL.course.topic(m.topicId);
    var others = IFL.data.modes.filter(function (x) { return x.category === m.category && x.id !== m.id; });
    var kv = [['Shari’ah basis', m.shariahBasis], ['Subject matter', m.subjectMatter], ['Ownership, risk and timing', m.ownershipRiskTiming], ['Return', m.returnType + ' — ' + m.returnTypeDetail], ['Typical tenor', m.typicalTenor], ['Liquidity and tradability', m.liquidityTradability], ['Common use', m.commonUse]];
    var kvA = [['Nature of contract', a.nature], ['Ownership and asset risk (summary)', a.ownership], ['Return to financier (summary)', a.return], ['Payment / delivery timing', a.payment], ['Late payment (Box 14.1)', a.late], ['Tenor (Box 14.1)', a.tenor], ['Typical uses (summary)', a.uses], ['Key Shari’ah rule', a.keyRule], ['Common pitfall', a.pitfall]].filter(function (x) { return x[1]; });
    var rel = C.relatedPanel('mode', m.id, { skip: ['topic', 'mode'], limit: 8 });
    return h('div',
      C.pageHead({ crumbs: [{ label: 'Financing modes', route: '/modes' }, { label: m.name }], eyebrow: m.category, title: m.name, desc: m.distinguishingFeature,
        actions: [C.bookmarkBtn({ type: 'mode', id: m.id, label: m.name, route: '/mode/' + m.id }), C.noteBtn({ type: 'mode', id: m.id, label: m.name, route: '/mode/' + m.id }), h('a.btn', { href: '#/compare?modes=' + m.id }, u.svg('compare'), 'Compare')] }),
      h('div.stack',
        h('section.card', h('h2', { style: H2 }, 'Mode profile'), h('dl.kv', kv.map(function (x) { return [h('dt', x[0]), h('dd', x[1])]; })),
          h('div.row', { style: { marginTop: '8px' } }, concept ? h('a.chip', { href: '#/concept/' + concept.id }, u.svg('star'), 'Concept: ' + concept.name) : null, topic ? h('a.chip', { href: '#/topic/' + m.topicId }, IFL.course.sourceLabel(m.topicId)) : null, h('a.chip', { href: '#/chapter/' + m.chapter }, 'Chapter ' + m.chapter))),
        h('div.grid.grid-2', h('section.card', h('h2', { style: H2 }, 'Key conditions'), ul(m.keyConditions)), h('section.card', h('h2', { style: H2 }, 'Major risks'), ul(m.majorRisks))),
        kvA.length ? h('section.card', h('h2', { style: H2 }, 'Summary attributes (Chapters 9–13 and Box 14.1)'), h('dl.kv', kvA.map(function (x) { return [h('dt', x[0]), h('dd', x[1])]; }))) : null,
        diagrams.length ? h('section.card', h('h2', { style: H2 }, 'Transaction diagram' + (diagrams.length > 1 ? 's' : '')), diagrams.map(function (d, i) { return h('details.acc', { open: i === 0 }, h('summary', d.title, h('span.badge', d.steps.length + ' steps')), h('div.acc-body', C.diagram(d), C.sourceFoot(d.topicId))); })) : null,
        prods.length ? h('section.card', h('h2', { style: H2 }, 'Products built on ' + m.name + ' (' + prods.length + ')'), h('div.grid.grid-3', prods.map(function (p) { return h('a.card.card-link.flat', { href: '#/product/' + p.id }, h('span.badge', p.category), h('h3', { style: { fontSize: 'var(--fs-md)', margin: '6px 0 2px' } }, p.name), h('p.small.text-2', { style: { margin: 0 } }, IFL.trunc(p.need, 110))); }))) : null,
        cases.length ? h('section.card', h('h2', { style: H2 }, 'Case studies (' + cases.length + ')'), h('ul.list', cases.map(function (c) { return h('li', h('a', { href: '#/case/' + c.id }, c.title), ' ', h('span.small.muted', IFL.course.sourceLabel(c.topicId))); }))) : null,
        pairs.length ? h('section.card', h('h2', { style: H2 }, 'Comparisons'), h('div.row', pairs.map(function (p) { return h('a.chip', { href: '#/compare?id=' + p.id }, u.svg('compare'), p.title); }))) : null,
        rel,
        others.length ? h('section.card', h('h2', { style: H2 }, 'Other ' + m.category.toLowerCase() + ' modes'), h('div.row', others.map(function (o) { return h('a.chip', { href: '#/mode/' + o.id }, o.name); }))) : null,
        m.source ? h('div.source-foot', u.svg('source'), h('strong', 'Source: '), 'Understanding Islamic Finance (Ayub)', h('span', 'Chapter ' + m.source.chapter), m.source.section ? h('span', 'Section ' + m.source.section) : null, m.source.pages ? h('span', 'Textbook ' + C.pagesLabel([m.source.pages[0], m.source.pages[m.source.pages.length - 1]])) : null) : null));
  });
})();
