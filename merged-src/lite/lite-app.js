/* Practice Lab bootstrap: a small companion app made of the transaction diagrams, the learning games,
   the numericals trainer and the calculators of the full learning system. It reuses those modules
   unchanged; this file only adds the shell (sections, theme, home page, calculators page). */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  IFL.trunc = IFL.trunc || function (s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; };

  /* ---------- theme ---------- */
  var mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  IFL.applyTheme = function () {
    var s = IFL.store.state.settings, t = s.theme || 'system';
    if (t === 'system') t = mq && mq.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.classList.toggle('reduce-motion', !!s.reduceMotion);
    var mt = document.querySelector('meta[name="theme-color"]'); if (mt) mt.setAttribute('content', t === 'dark' ? '#111416' : '#1f5f5b');
    document.getElementById('theme-btn').setAttribute('aria-label', 'Theme: ' + (s.theme || 'system') + ' (click to change)');
  };
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { if (IFL.store.state.settings.theme === 'system') IFL.applyTheme(); });
  document.getElementById('theme-btn').addEventListener('click', function () {
    var order = ['light', 'dark', 'system'], next = order[(order.indexOf(IFL.store.state.settings.theme || 'system') + 1) % 3];
    IFL.store.update(function (s) { s.settings.theme = next; }); IFL.applyTheme(); u.toast('Theme: ' + next.charAt(0).toUpperCase() + next.slice(1));
  });

  /* ---------- sections ---------- */
  var NAV = [{ r: '/', t: 'Home', i: 'home' }, { r: '/diagrams', t: 'Diagrams', i: 'flow' }, { r: '/play', t: 'Games', i: 'play' }, { r: '/numericals', t: 'Numericals', i: 'sum' }, { r: '/tools', t: 'Calculators', i: 'calc' }];
  var nav = document.getElementById('nav');
  NAV.forEach(function (it) { nav.appendChild(h('a', { href: '#' + it.r, 'data-route': it.r, 'aria-label': it.t, title: it.t }, u.svg(it.i), h('span', it.t))); });
  var ALSO = { '/diagrams': /^\/diagram\//, '/play': /^\/play\// };
  function highlight(path) {
    Array.prototype.forEach.call(nav.children, function (a) {
      var r = a.getAttribute('data-route'), on = r === '/' ? path === '/' : path === r || (ALSO[r] && ALSO[r].test(path));
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }
  IFL.nav = { highlight: highlight, rebuild: function () {} };

  /* ---------- links to pages that exist only in the full system become plain text ---------- */
  var LOCAL = /^#\/($|\?|diagrams|diagram\/|play|numericals|tools)/;
  function unlink(root) {
    Array.prototype.forEach.call(root.querySelectorAll('a[href^="#/"]'), function (a) {
      if (LOCAL.test(a.getAttribute('href'))) return;
      if (a.classList.contains('btn') || a.classList.contains('card-link') || a.classList.contains('chip')) { a.remove(); return; }
      var s = document.createElement('span'); s.className = 'unlinked'; while (a.firstChild) s.appendChild(a.firstChild); a.parentNode.replaceChild(s, a);
    });
  }
  var view = document.getElementById('view');
  new window.MutationObserver(function () { unlink(view); }).observe(view, { childList: true, subtree: true });
  new window.MutationObserver(function () { unlink(document.getElementById('modal-root')); }).observe(document.getElementById('modal-root'), { childList: true, subtree: true });

  /* ---------- home ---------- */
  IFL.route('/', function () {
    var D = IFL.data, g = IFL.store.state.games || {}, ans = IFL.store.state.answers || {};
    var solved = Object.keys(g.build || {}).filter(function (k) { return g.build[k].best === 100; }).length;
    var nums = (IFL.numericals || []).length, numDone = Object.keys(ans).filter(function (k) { return /^num-/.test(k) && ans[k].correct > 0; }).length;
    var calcN = Object.keys(IFL.calcTypes).length, calcUsed = Object.keys(IFL.store.state.calcs || {}).length;
    function tile(route, icon, title, text, stat) { return h('a.card.card-link.play-card', { href: '#' + route }, h('span.play-ico', u.svg(icon)), h('h2', title), h('p.text-2', text), h('span.badge.accent', stat)); }
    var next = D.diagrams.filter(function (d) { return !(g.build && g.build[d.id] && g.build[d.id].best === 100); })[0];
    return h('div.stack',
      h('section.card.lab-hero',
        h('div.eyebrow', 'Understanding Islamic Finance · Muhammad Ayub'),
        h('h1', 'Practice Lab'),
        h('p.text-2', { style: { maxWidth: '62ch' } }, 'See how each Islamic financing structure works, rebuild it yourself, and work the numbers. Everything runs offline in this one file; your scores are saved only on this device.'),
        h('div.row', { style: { marginTop: '12px' } },
          h('a.btn.primary.lg', { href: '#/diagram/' + D.diagrams[0].id }, u.svg('play'), 'Watch: ' + D.diagrams[0].title),
          next ? h('a.btn.lg', { href: '#/play/build?id=' + next.id }, u.svg('flow'), 'Build a deal') : null)),
      h('div.lab-tiles',
        tile('/diagrams', 'flow', 'Transaction diagrams', 'Press Play and watch money, goods, ownership and risk move between the parties, step by step.', D.diagrams.length + ' animated structures'),
        tile('/play', 'play', 'Games', 'Build the deal, match terms to definitions, and sort the instruments by how they earn.', solved + ' of ' + D.diagrams.length + ' deals solved'),
        tile('/numericals', 'sum', 'Numericals trainer', 'Worked problems with the book’s figures, plus fresh practice figures each time.', numDone + ' of ' + nums + ' problem types solved'),
        tile('/tools', 'calc', 'Calculators', 'Drag the sliders and watch the charts: pricing, profit sharing, rent schedules, Sukuk and more.', calcUsed + ' of ' + calcN + ' tried')),
      h('p.small.muted', 'Based on Muhammad Ayub, Understanding Islamic Finance (Wiley). Educational use; not a source of Shari’ah rulings. This is the practice part of the full MBA learning system, which also holds the lessons, glossary, cases, questions and flashcards.'));
  });

  /* ---------- calculators (same components as the full system's tools page) ---------- */
  var GROUPS = [
    { t: 'Riba, loans and exchange', k: ['exchange-rule', 'fx-settlement', 'qard-vs-interest'] },
    { t: 'Sales: Murabaha, Tawarruq, Salam, Istisna‘a', k: ['murabaha-check', 'tawarruq-check', 'credit-price', 'promise-breach', 'salam-profit', 'salam-discount', 'parallel-istisna'] },
    { t: 'Leasing', k: ['ijarah-case', 'floating-rent'] },
    { t: 'Partnership and deposits', k: ['musharakah-pl', 'mudarabah-offset', 'mudarabah-mixed', 'pool-weightage', 'dm-schedule', 'sitara-tfc'] },
    { t: 'Capital markets', k: ['sukuk-distribution', 'sukuk-trade', 'equity-screen', 'purification'] },
    { t: 'Services, default and Takaful', k: ['jualah-reward', 'late-payment', 'takaful-waqf'] }
  ];
  IFL.route('/tools', function (ctx) {
    var T = IFL.calcTypes, listed = {}; GROUPS.forEach(function (g) { g.k.forEach(function (k) { listed[k] = 1; }); });
    var other = Object.keys(T).filter(function (k) { return !listed[k]; });
    var groups = GROUPS.concat(other.length ? [{ t: 'Other tools', k: other }] : []);
    var open = ctx.query.tool || ctx.query.calc || ''; if (open === 'sleeping-partner') open = 'musharakah-pl';
    var panel = h('div');
    if (T[open]) panel.appendChild(h('section.card', { id: 'tool-panel' }, h('div.eyebrow', 'Interactive tool'), IFL.calc(open)));
    var body = h('div.stack', groups.map(function (g) {
      return h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, g.t),
        h('div.grid.grid-3', g.k.filter(function (k) { return T[k]; }).map(function (k) {
          var c = T[k], kind = c.kind === 'checker' ? 'Rule checker' : c.textbook ? 'Textbook figures' : 'Practice calculator';
          return h('a.card.card-link.tool-card' + (k === open ? '.sel' : ''), { href: '#/tools?tool=' + k },
            h('div.row', h('span.badge.' + (c.kind === 'checker' ? 'info' : c.textbook ? 'accent' : 'gold'), kind), IFL.calcHasChart(k) ? h('span.badge', 'Chart') : null),
            h('h3', { style: { fontSize: 'var(--fs-md)', margin: '8px 0 4px' } }, c.title), h('p.small.text-2', { style: { margin: 0 } }, c.source));
        })));
    }));
    return h('div', C.pageHead({ eyebrow: 'Calculate', title: 'Calculators and rule checkers', desc: Object.keys(T).length + ' tools. Textbook calculators reproduce the book’s own figures until you change an input; practice calculators and checkers apply the book’s rules to your own figures. None of them is a Fatwa.' }), panel, body);
  });

  /* ---------- keyboard + lifecycle ---------- */
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.ctrlKey || e.metaKey || e.altKey) return;
    if (IFL.keys && IFL.keys(e.key) === true) e.preventDefault();
  });
  var first = true;
  IFL.afterRender = function () { if (first) { first = false; return; } var m = document.getElementById('main'); if (m && document.activeElement === document.body) m.focus({ preventScroll: true }); };
  window.addEventListener('error', function (e) { console.error(e.error || e.message); });
  IFL.applyTheme();
  IFL.startRouter();
})();
