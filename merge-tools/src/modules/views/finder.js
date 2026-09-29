
/* "Which mode might apply?" — educational decision tools.
   Two interactive trees are offered side by side and share one result card:
     • Need-based finder   — starts from what the client needs (14 possible outcomes)
     • Question-by-question tree — starts from the financing purpose (14 possible outcomes, incl. two "caution" outcomes)
   When both trees describe the same mode, the result card merges what each says. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var F2_TO_F1 = { 'r-murabaha': 'murabaha', 'r-musawamah': 'musawamah', 'r-salam': 'salam', 'r-istisnaa': 'istisna', 'r-ijarah': 'ijarah', 'r-ijarah-mbt': 'imbt', 'r-musharakah': 'musharakah', 'r-mudarabah': 'mudarabah', 'r-diminishing-musharakah': 'dm', 'r-tawarruq': 'tawarruq', 'r-sukuk': 'sukuk' };
  var F1_TO_F2 = {}; Object.keys(F2_TO_F1).forEach(function (k) { F1_TO_F2[F2_TO_F1[k]] = k; });

  IFL.route('/finder', function (ctx) {
    return window.IFL_DATA.load(['modeFinder', 'decisionTree', 'diagrams', 'comparisons']).then(function (r) {
      var F = r.modeFinder, T = r.decisionTree, tool = ctx.query.tool === 'tree' ? 'tree' : 'need';
      var stage = h('div', { 'aria-live': 'polite' });
      var path = [], node = null;
      var toolBar = h('div.seg', { role: 'tablist', 'aria-label': 'Decision tool', style: { margin: '0 0 14px' } },
        [['need', 'Need-based finder'], ['tree', 'Question-by-question tree']].map(function (t) {
          return h('button', { type: 'button', role: 'tab', 'aria-selected': String(t[0] === tool), onclick: function () { IFL.go('/finder?tool=' + t[0]); } }, t[1]);
        }));

      function restart() { path = []; node = tool === 'tree' ? (ctx.query.node && T.questions[ctx.query.node] ? ctx.query.node : T.root) : F.start; if (tool === 'tree' && ctx.query.node && /^r-/.test(ctx.query.node) && T.results[ctx.query.node]) { node = null; return result(ctx.query.node); } draw(); }

      function crumbs() { return path.length ? h('ol.small.muted', { style: { marginBottom: '12px' } }, path.map(function (p) { return h('li', p.q + ' → ', h('strong', p.a)); })) : null; }
      function backRow() {
        return path.length ? h('div.row', { style: { marginTop: '12px' } }, h('button.btn', { type: 'button', onclick: function () { var p = path.pop(); node = p.node; draw(); } }, u.svg('left'), 'Back'), h('button.btn.ghost', { type: 'button', onclick: restart }, 'Start over')) : null;
      }
      function draw() {
        stage.innerHTML = '';
        var n, q, opts;
        if (tool === 'tree') { n = T.questions[node]; q = n.prompt; opts = n.options.map(function (o) { return { label: o.label, next: /^q-/.test(o.next) ? o.next : null, result: /^r-/.test(o.next) ? o.next : null }; }); }
        else { n = F.nodes[node]; q = n.q; opts = n.options; }
        u.append(stage, [crumbs(), h('section.card', h('div.eyebrow', 'Question ' + (path.length + 1)), h('h2', { style: { fontSize: 'var(--fs-xl)' } }, q),
          h('div.stack', opts.map(function (o) {
            return h('button.opt', { type: 'button', onclick: function () { path.push({ q: q, a: o.label, node: node }); if (o.next) { node = o.next; draw(); } else result(o.result); } }, h('span.key', '›'), h('span', o.label));
          }))), backRow()]);
      }

      function result(id) {
        var f1id = tool === 'tree' ? F2_TO_F1[id] : id, f2id = tool === 'tree' ? id : F1_TO_F2[id];
        var res1 = f1id ? F.results[f1id] : null, res2 = f2id ? T.results[f2id] : null;
        IFL.progress.countTool(tool === 'tree' ? 'decision' : 'finder');
        var d = f1id && r.diagrams.filter(function (x) { return x.id === f1id || x.concept === f1id; })[0];
        var mode = f1id && r.comparisons.modes.filter(function (m) { return m.id === f1id || (f1id === 'parallel-istisna' && m.id === 'istisna'); })[0];
        var title = res1 ? res1.title : (res2.modes || []).join(', ');
        var whys = []; [res1 && res1.why, res2 && res2.whyRelevant].forEach(function (w) { if (w && !whys.some(function (x) { return u.norm(x) === u.norm(w); })) whys.push(w); });
        var cautions = (res1 && res1.cautions) || [];
        stage.innerHTML = '';
        u.append(stage, [crumbs(), h('section.card', h('div.eyebrow', res2 && !res2.chapter ? 'Outcome' : 'A mode that may be relevant'), h('h2', title),
          whys.map(function (w) { return h('p', w); }),
          res2 && res2.basicStructure ? h('p', h('strong', 'Basic structure: '), res2.basicStructure) : null,
          mode ? h('dl.kv', h('dt', 'Basic structure'), h('dd', mode.nature), h('dt', 'Ownership / risk'), h('dd', mode.ownership), h('dt', 'Key condition'), h('dd', mode.keyRule), h('dt', 'Common pitfall'), h('dd', mode.pitfall)) : null,
          res2 && res2.keyConditions && res2.keyConditions.length ? h('div.callout', h('div.t', 'Key conditions'), h('ul', res2.keyConditions.map(function (c) { return h('li', c); }))) : null,
          cautions.length || (res2 && res2.majorRisks && res2.majorRisks.length) ? h('div.callout.warn', h('div.t', 'Key cautions and risks'), h('ul', cautions.concat((res2 && res2.majorRisks) || []).map(function (c) { return h('li', c); }))) : null,
          res1 && res1.topics && res1.topics.length ? h('div', h('div.small.muted', 'Related chapter sections'), h('div.row', res1.topics.map(function (t) { return h('a.chip', { href: '#/topic/' + t }, IFL.course.sourceLabel(t)); }))) : null,
          h('div.row', { style: { marginTop: '12px' } }, d ? h('a.btn.primary', { href: '#/diagram/' + d.id }, u.svg('flow'), 'See the transaction diagram') : null,
            res2 && res2.chapter ? h('a.btn', { href: '#/chapter/' + res2.chapter }, 'Read Chapter ' + res2.chapter) : null,
            h('button.btn', { type: 'button', onclick: restart }, 'Try another scenario')))]);
      }
      restart();
      var disclaimer = (tool === 'tree' ? T.disclaimer : 'Educational tool based on Muhammad Ayub\'s textbook; not a Shari’ah ruling or professional advice. ' + F.disclaimer.replace(/^Educational tool only\. /, ''));
      return h('div',
        C.pageHead({ eyebrow: 'Educational tool', title: 'Which mode might apply?', desc: 'Answer a few questions about the financing need to see which of the book\'s modes are typically discussed for it. Two routes lead to the same result cards.' }),
        h('div.callout.warn', h('div.t', 'Disclaimer'), h('p', disclaimer)), toolBar, stage);
    });
  });
})();
