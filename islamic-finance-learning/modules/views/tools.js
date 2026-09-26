/* Interactive tools hub: every calculator and rule checker in one place, grouped by area,
   each linked to the lesson it belongs to, plus the other interactive study tools. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var H2 = { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' };
  var GROUPS = [
    { t: 'Riba and exchange', d: 'Test exchanges of money and Ribawi goods and currency debts.', k: ['exchange-rule', 'fx-settlement'] },
    { t: 'Sales: Murabaha, Tawarruq, Salam, Istisna‘a', d: 'Price sales, check structures and work through the book’s boxes.', k: ['murabaha-check', 'tawarruq-check', 'credit-price', 'promise-breach', 'salam-profit', 'parallel-istisna'] },
    { t: 'Leasing', d: 'Ijarah settlements and floating rent with floor and cap.', k: ['ijarah-case', 'floating-rent'] },
    { t: 'Partnership and deposits', d: 'Profit and loss sharing, pools and Diminishing Musharakah.', k: ['musharakah-pl', 'sleeping-partner', 'mudarabah-offset', 'mudarabah-mixed', 'pool-weightage', 'dm-schedule', 'sitara-tfc'] },
    { t: 'Capital markets', d: 'Tradability of Sukuk and shares, equity screening and purification.', k: ['sukuk-trade', 'equity-screen', 'purification'] },
    { t: 'Services, default and Takaful', d: 'Ju‘alah rewards, late payment and Takaful funds.', k: ['jualah-reward', 'late-payment', 'takaful-waqf'] }
  ];

  IFL.route('/tools', function (ctx) {
    return window.IFL_DATA.loadAllChapters().then(function (chs) {
      var T = IFL.calcTypes || {}, home = {};
      chs.forEach(function (ch) { ch.topics.forEach(function (t) { if (t.calc && !home[t.calc.type]) home[t.calc.type] = t.id; }); });
      Object.keys(T).forEach(function (k) { if (!home[k] && T[k].topic) home[k] = T[k].topic; });
      var listed = {}; GROUPS.forEach(function (g) { g.k.forEach(function (k) { listed[k] = 1; }); });
      var other = Object.keys(T).filter(function (k) { return !listed[k]; });
      var groups = GROUPS.concat(other.length ? [{ t: 'Other tools', d: '', k: other }] : []);
      var open = ctx.query.tool || '';
      var panel = h('div');
      function show(k) {
        panel.innerHTML = '';
        if (!T[k]) return;
        var tid = home[k];
        panel.appendChild(h('section.card', { id: 'tool-panel' },
          h('div.row.between', h('div.eyebrow', 'Interactive tool'), tid ? h('a.btn.sm', { href: '#/topic/' + tid }, 'Open the lesson: ' + IFL.course.sourceLabel(tid)) : null),
          IFL.calc(k)));
        setTimeout(function () { var el = document.getElementById('tool-panel'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 30);
      }
      var total = Object.keys(T).length;
      var body = h('div.stack', groups.map(function (g) {
        return h('section.card', h('h2', { style: H2 }, g.t), g.d ? h('p.small.muted', g.d) : null,
          h('div.grid.grid-3', g.k.filter(function (k) { return T[k]; }).map(function (k) {
            var c = T[k], kind = c.kind === 'checker' ? 'Rule checker' : c.textbook ? 'Textbook figures' : 'Practice calculator';
            return h('button.card.card-link.tool-card', { type: 'button', onclick: function () { show(k); } },
              h('span.badge.' + (c.kind === 'checker' ? 'info' : c.textbook ? 'accent' : 'gold'), kind),
              h('h3', { style: { fontSize: 'var(--fs-md)', margin: '8px 0 4px' } }, c.title),
              h('p.small.text-2', { style: { margin: 0 } }, c.source));
          })));
      }));
      var more = h('section.card', h('h2', { style: H2 }, 'More interactive study tools'),
        h('div.grid.grid-3', [
          ['#/finder', 'compass', 'Which mode applies?', 'Decision tree from a client’s need to a financing mode.'],
          ['#/compare', 'compare', 'Comparison lab', 'Any mode against any other, plus 25 curated comparisons.'],
          ['#/diagrams', 'flow', 'Transaction diagrams', 'Step through who pays, owns and bears risk.'],
          ['#/concepts', 'map', 'Concept map', 'How the ideas connect, with relationship graphs.'],
          ['#/cases', 'case', 'Case study lab', 'Textbook and practice cases with questions.'],
          ['#/mock', 'flame', 'Timed mock exam', 'Exam conditions with a full review.']
        ].map(function (x) { return h('a.card.card-link', { href: x[0] }, h('h3', { style: { fontSize: 'var(--fs-md)', margin: 0 } }, u.svg(x[1]), ' ', x[2]), h('p.small.text-2', { style: { margin: '6px 0 0' } }, x[3])); })));
      var node = h('div', C.pageHead({ eyebrow: 'Practise', title: 'Interactive tools', desc: total + ' calculators and rule checkers. Textbook calculators reproduce the book’s own figures until you change an input; practice calculators and checkers apply the book’s rules to your own figures and are labelled as such. None of them is a Fatwa.' }),
        panel, body, more);
      if (open) setTimeout(function () { show(open); });
      return node;
    });
  });
})();
