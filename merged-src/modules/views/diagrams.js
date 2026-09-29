
/* Transaction diagrams: gallery and interactive viewer. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  IFL.route('/diagrams', function () {
    return Promise.resolve({ diagrams: IFL.data.diagrams }).then(function (r) {
      return h('div',
        C.pageHead({ eyebrow: 'Visual learning', title: 'Transaction diagrams', desc: 'Step-by-step flows for each financing structure, derived from the procedures described in the textbook. Each step is clickable.' }),
        h('div.grid.grid-3', r.diagrams.map(function (d) {
          return h('a.card.card-link', { href: '#/diagram/' + d.id }, h('h3', { style: { fontSize: 'var(--fs-md)', margin: '0 0 6px' } }, u.svg('flow'), ' ', d.title), h('p.small.text-2', { style: { margin: 0 } }, IFL.trunc(d.summary, 130)), h('div.small.muted', { style: { marginTop: '8px' } }, d.steps.length + ' steps · ' + IFL.course.sourceLabel(d.topicId)));
        })));
    });
  });
  IFL.route('/diagram/:id', function (ctx) {
    return Promise.resolve({ diagrams: IFL.data.diagrams, concepts: IFL.data.concepts }).then(function (r) {
      var d = r.diagrams.filter(function (x) { return x.id === ctx.params.id; })[0];
      if (!d) throw new Error('Diagram not found');
      IFL.progress.log('diagram', 'Diagram: ' + d.title, '/diagram/' + d.id);
      var others = r.diagrams.filter(function (x) { return x.conceptId === d.conceptId && x.id !== d.id; });
      var concept = r.concepts.filter(function (c) { return c.id === d.conceptId; })[0];
      var mode = d.modeId ? IFL.data.mode(d.modeId) : null;
      var prods = (d.productIds || []).map(IFL.data.product).filter(Boolean);
      var nums = IFL.data.relatedIds('diagram', d.id, 'numerical');
      return h('div',
        C.pageHead({ crumbs: [{ label: 'Diagrams', route: '/diagrams' }, { label: d.title }], eyebrow: 'Transaction diagram', title: d.title,
          actions: [C.bookmarkBtn({ type: 'diagram', id: d.id, label: d.title, route: '/diagram/' + d.id }), C.noteBtn({ type: 'diagram', id: d.id, label: d.title, route: '/diagram/' + d.id })] }),
        h('div.card', C.diagram(d), C.sourceFoot(d.topicId)),
        (mode || prods.length) ? h('section.card', { style: { marginTop: '14px' } }, h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Where this structure is used'),
          mode ? h('p', h('strong', 'Financing mode: '), h('a', { href: '#/mode/' + mode.id }, mode.name)) : null,
          prods.length ? h('div', h('strong', 'Products: '), h('span.row', prods.map(function (p) { return h('a.chip', { href: '#/product/' + p.id }, p.name); }))) : null) : null,
        h('div.row', { style: { marginTop: '14px' } }, h('a.btn', { href: '#/topic/' + d.topicId }, 'Read the source topic'), concept ? h('a.btn', { href: '#/concept/' + concept.id }, 'Concept: ' + concept.name) : null,
          others.map(function (o) { return h('a.btn', { href: '#/diagram/' + o.id }, o.title); })));
    });
  }, { wide: true });
})();

