/* "Which mode might apply?" — one educational decision tool with two pathways
   (by the client's need, or by the financing purpose) sharing one renderer and one result set. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  IFL.route('/finder', function (ctx) {
    var F = IFL.data.finder;
    var pw = F.pathways.filter(function (p) { return p.id === ctx.query.path; })[0] || F.pathways[0];
    var path = [], node = pw.start;
    var stage = h('div', { 'aria-live': 'polite' });
    function trail(list) { return list.length ? h('ol.small.muted', { style: { marginBottom: '12px' } }, list.map(function (p) { return h('li', p.q + ' → ', h('strong', p.a)); })) : null; }
    function restart() { path = []; node = pw.start; draw(); }
    function draw() {
      stage.innerHTML = '';
      if (path.length) stage.appendChild(trail(path));
      var n = pw.nodes[node];
      stage.appendChild(h('section.card', h('div.eyebrow', 'Question ' + (path.length + 1)), h('h2', { style: { fontSize: 'var(--fs-xl)' } }, n.q),
        h('div.stack', n.options.map(function (o) {
          return h('button.opt', { type: 'button', onclick: function () { path.push({ q: n.q, a: o.label, node: node }); if (o.next) { node = o.next; draw(); } else result(o.result); } }, h('span.key', '›'), h('span', o.label));
        }))));
      if (path.length) stage.appendChild(h('div.row', { style: { marginTop: '12px' } }, h('button.btn', { type: 'button', onclick: function () { var p = path.pop(); node = p.node; draw(); } }, u.svg('left'), 'Back'), h('button.btn.ghost', { type: 'button', onclick: restart }, 'Start over')));
    }
    function ul(items) { return items && items.length ? h('ul', items.map(function (c) { return h('li', c); })) : null; }
    function result(id) {
      var res = F.results[id];
      var modes = (res.modeIds || []).map(IFL.data.mode).filter(Boolean);
      var diagram = null; modes.forEach(function (m) { diagram = diagram || IFL.data.diagrams.filter(function (d) { return d.modeId === m.id; })[0]; });
      IFL.progress.log('finder', 'Mode finder: ' + res.title, '/finder');
      stage.innerHTML = '';
      stage.appendChild(trail(path));
      var topics = res.topicIds || [];
      stage.appendChild(h('section.card', h('div.eyebrow', 'A mode that may be relevant'), h('h2', res.title), h('p', res.why),
        res.structure ? h('div', h('h3', { style: { fontSize: 'var(--fs-md)' } }, 'Basic structure'), h('p', res.structure)) : null,
        modes.map(function (m) {
          var a = m.attributes || {};
          return h('dl.kv', h('dt', 'Mode'), h('dd', h('a', { href: '#/mode/' + m.id }, m.name)), a.nature ? [h('dt', 'Nature'), h('dd', a.nature)] : null, a.ownership ? [h('dt', 'Ownership / risk'), h('dd', a.ownership)] : [h('dt', 'Ownership, risk and timing'), h('dd', m.ownershipRiskTiming)],
            a.keyRule ? [h('dt', 'Key condition'), h('dd', a.keyRule)] : null, a.pitfall ? [h('dt', 'Common pitfall'), h('dd', a.pitfall)] : null);
        }),
        res.keyConditions && res.keyConditions.length ? h('div.callout', h('div.t', 'Key conditions'), ul(res.keyConditions)) : null,
        h('div.callout.warn', h('div.t', 'Key cautions and risks'), ul(res.cautions || res.risks)),
        topics.length ? h('div', h('div.small.muted', 'Related chapter sections'), h('div.row', topics.map(function (t) { return h('a.chip', { href: '#/topic/' + t }, IFL.course.sourceLabel(t)); }))) : (res.chapter ? h('div', h('a.chip', { href: '#/chapter/' + res.chapter }, 'Chapter ' + res.chapter)) : null),
        h('div.row', { style: { marginTop: '12px' } }, diagram ? h('a.btn.primary', { href: '#/diagram/' + diagram.id }, u.svg('flow'), 'See the transaction diagram') : null, modes.length ? h('a.btn', { href: '#/mode/' + modes[0].id }, u.svg('bank'), 'Full mode profile') : null, h('button.btn', { type: 'button', onclick: restart }, 'Try another scenario'))));
    }
    draw();
    var tabs = h('div.seg', { role: 'group', 'aria-label': 'Choose a pathway', style: { marginBottom: '14px' } }, F.pathways.map(function (p) { return h('a.btn.sm' + (p.id === pw.id ? '.on' : ''), { href: '#/finder?path=' + p.id, 'aria-current': p.id === pw.id ? 'true' : null }, p.title); }));
    return h('div',
      C.pageHead({ eyebrow: 'Educational tool', title: 'Which mode might apply?', desc: 'Answer a few questions about the financing need to see which of the book\'s modes are typically discussed for it. Two pathways — by the client\'s need, or by the financing purpose — lead to one shared set of results.' }),
      h('div.callout.warn', h('div.t', 'Disclaimer'), h('p', 'Educational tool based on Muhammad Ayub\'s textbook; not a Shari’ah ruling or professional advice. It summarises the textbook\'s discussion of when each mode is typically suitable; the right structure depends on the facts and on the bank\'s Shari’ah board.')),
      tabs, stage);
  });
})();
