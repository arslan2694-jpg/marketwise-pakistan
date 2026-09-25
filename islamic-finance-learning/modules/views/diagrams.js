/* Transaction diagrams: gallery and interactive viewer. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  IFL.route('/diagrams', function () {
    return window.IFL_DATA.load(['diagrams']).then(function (r) {
      return h('div',
        C.pageHead({ eyebrow: 'Visual learning', title: 'Transaction diagrams', desc: 'Step-by-step flows for each financing structure, derived from the procedures described in the textbook. Each step is clickable.' }),
        h('div.grid.grid-3', r.diagrams.map(function (d) {
          return h('a.card.card-link', { href: '#/diagram/' + d.id }, h('h3', { style: { fontSize: 'var(--fs-md)', margin: '0 0 6px' } }, u.svg('flow'), ' ', d.title), h('p.small.text-2', { style: { margin: 0 } }, IFL.trunc(d.summary, 130)), h('div.small.muted', { style: { marginTop: '8px' } }, d.steps.length + ' steps · ' + IFL.course.sourceLabel(d.topic)));
        })));
    });
  });
  IFL.route('/diagram/:id', function (ctx) {
    return window.IFL_DATA.load(['diagrams', 'concepts']).then(function (r) {
      var d = r.diagrams.filter(function (x) { return x.id === ctx.params.id; })[0];
      if (!d) throw new Error('Diagram not found');
      IFL.progress.log('diagram', 'Diagram: ' + d.title, '/diagram/' + d.id);
      var others = r.diagrams.filter(function (x) { return x.concept === d.concept && x.id !== d.id; });
      var concept = r.concepts.filter(function (c) { return c.id === d.concept; })[0];
      return h('div',
        C.pageHead({ crumbs: [{ label: 'Diagrams', route: '/diagrams' }, { label: d.title }], eyebrow: 'Transaction diagram', title: d.title,
          actions: [C.bookmarkBtn({ type: 'diagram', id: d.id, label: d.title, route: '/diagram/' + d.id }), C.noteBtn({ type: 'diagram', id: d.id, label: d.title, route: '/diagram/' + d.id })] }),
        h('div.card', C.diagram(d), C.sourceFoot(d.topic)),
        h('div.row', { style: { marginTop: '14px' } }, h('a.btn', { href: '#/topic/' + d.topic }, 'Read the source topic'), concept ? h('a.btn', { href: '#/concept/' + concept.id }, 'Concept: ' + concept.name) : null,
          others.map(function (o) { return h('a.btn', { href: '#/diagram/' + o.id }, o.title); })));
    });
  }, { wide: true });
})();
