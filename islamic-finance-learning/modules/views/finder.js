/* "Which mode might apply?" — educational decision tree. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  IFL.route('/finder', function () {
    return window.IFL_DATA.load(['modeFinder', 'diagrams', 'comparisons']).then(function (r) {
      var F = r.modeFinder, path = [], node = F.start;
      var stage = h('div', { 'aria-live': 'polite' });
      function draw() {
        stage.innerHTML = '';
        if (path.length) stage.appendChild(h('ol.small.muted', { style: { marginBottom: '12px' } }, path.map(function (p) { return h('li', p.q + ' → ', h('strong', p.a)); })));
        var n = F.nodes[node];
        stage.appendChild(h('section.card', h('div.eyebrow', 'Question ' + (path.length + 1)), h('h2', { style: { fontSize: 'var(--fs-xl)' } }, n.q),
          h('div.stack', n.options.map(function (o) {
            return h('button.opt', { type: 'button', onclick: function () { path.push({ q: n.q, a: o.label, node: node }); if (o.next) { node = o.next; draw(); } else result(o.result); } }, h('span.key', '›'), h('span', o.label));
          }))));
        if (path.length) stage.appendChild(h('div.row', { style: { marginTop: '12px' } }, h('button.btn', { type: 'button', onclick: function () { var p = path.pop(); node = p.node; draw(); } }, u.svg('left'), 'Back'), h('button.btn.ghost', { type: 'button', onclick: function () { path = []; node = F.start; draw(); } }, 'Start over')));
      }
      function result(id) {
        var res = F.results[id], d = r.diagrams.filter(function (x) { return x.id === id || (x.concept === id); })[0];
        var mode = r.comparisons.modes.filter(function (m) { return m.id === id || (id === 'parallel-istisna' && m.id === 'istisna'); })[0];
        stage.innerHTML = '';
        stage.appendChild(h('ol.small.muted', path.map(function (p) { return h('li', p.q + ' → ', h('strong', p.a)); })));
        stage.appendChild(h('section.card', h('div.eyebrow', 'A mode that may be relevant'), h('h2', res.title), h('p', res.why),
          mode ? h('dl.kv', h('dt', 'Basic structure'), h('dd', mode.nature), h('dt', 'Ownership / risk'), h('dd', mode.ownership), h('dt', 'Key condition'), h('dd', mode.keyRule), h('dt', 'Common pitfall'), h('dd', mode.pitfall)) : null,
          h('div.callout.warn', h('div.t', 'Key cautions and risks'), h('ul', res.cautions.map(function (c) { return h('li', c); }))),
          h('div', h('div.small.muted', 'Related chapter sections'), h('div.row', res.topics.map(function (t) { return h('a.chip', { href: '#/topic/' + t }, IFL.course.sourceLabel(t)); }))),
          h('div.row', { style: { marginTop: '12px' } }, d ? h('a.btn.primary', { href: '#/diagram/' + d.id }, u.svg('flow'), 'See the transaction diagram') : null, h('button.btn', { type: 'button', onclick: function () { path = []; node = F.start; draw(); } }, 'Try another scenario'))));
      }
      draw();
      return h('div',
        C.pageHead({ eyebrow: 'Educational tool', title: 'Which mode might apply?', desc: 'Answer a few questions about the financing need to see which of the book\'s modes are typically discussed for it.' }),
        h('div.callout.warn', h('div.t', 'Disclaimer'), h('p', 'Educational tool based on Muhammad Ayub\'s textbook; not a Shari’ah ruling or professional advice. ' + F.disclaimer.replace(/^Educational tool only\. /, ''))),
        stage);
    });
  });
})();
