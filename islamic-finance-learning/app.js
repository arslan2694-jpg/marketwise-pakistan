/* Application bootstrap: navigation, theme, keyboard shortcuts, offline support and routing. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h;

  /* ---------- Theme ---------- */
  var mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  IFL.applyTheme = function () {
    var s = IFL.store.state.settings, t = s.theme || 'system';
    if (t === 'system') t = mq && mq.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.setProperty('--font-scale', s.fontScale || 1);
    document.documentElement.classList.toggle('reduce-motion', !!s.reduceMotion);
    var mt = document.querySelector('meta[name="theme-color"]'); if (mt) mt.setAttribute('content', t === 'dark' ? '#111416' : '#1f5f5b');
    var tb = document.getElementById('theme-btn'); if (tb) tb.setAttribute('aria-label', 'Theme: ' + (s.theme || 'system') + ' (click to change)');
  };
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { if (IFL.store.state.settings.theme === 'system') IFL.applyTheme(); });
  document.getElementById('theme-btn').addEventListener('click', function () {
    var order = ['light', 'dark', 'system'], cur = IFL.store.state.settings.theme || 'system';
    var next = order[(order.indexOf(cur) + 1) % 3];
    IFL.store.update(function (s) { s.settings.theme = next; });
    IFL.applyTheme(); u.toast('Theme: ' + next.charAt(0).toUpperCase() + next.slice(1));
  });

  /* ---------- Navigation ---------- */
  var NAV = [
    { label: null, items: [{ r: '/', t: 'Dashboard', i: 'home' }] },
    { label: 'Learn', items: [{ r: '/learn', t: 'All chapters', i: 'book', sub: 'learn' }] },
    { label: 'Explore', items: [{ r: '/concepts', t: 'Concept map', i: 'map' }, { r: '/glossary', t: 'Glossary', i: 'glossary' }, { r: '/diagrams', t: 'Transaction diagrams', i: 'flow' }, { r: '/compare', t: 'Comparisons', i: 'compare' }, { r: '/finder', t: 'Which mode applies?', i: 'compass' }] },
    { label: 'Practise', items: [{ r: '/flashcards', t: 'Flashcards', i: 'cards' }, { r: '/quiz', t: 'Quiz', i: 'quiz' }, { r: '/practice', t: 'Adaptive practice', i: 'target' }, { r: '/mistakes', t: 'My mistakes', i: 'refresh' }, { r: '/cases', t: 'Case studies', i: 'case' }, { r: '/tools', t: 'Interactive tools', i: 'calc' }] },
    { label: 'Exam', items: [{ r: '/exam', t: 'Exam preparation', i: 'exam' }, { r: '/mock', t: 'Timed mock exam', i: 'flame' }, { r: '/exam/trainer', t: 'Answer trainer', i: 'edit' }, { r: '/revision-cards', t: 'Rapid revision cards', i: 'layers' }] },
    { label: 'Guided study', items: [{ r: '/planner', t: 'Exam planner', i: 'calendar' }, { r: '/guided/crash45', t: '45-minute crash course', i: 'bolt' }, { r: '/guided/revision90', t: '90-minute revision', i: 'clock' }, { r: '/guided/deep180', t: '3-hour deep study', i: 'teach' }] },
    { label: 'Personal', items: [{ r: '/bookmarks', t: 'Bookmarks', i: 'bookmark' }, { r: '/notes', t: 'My notes', i: 'note' }, { r: '/progress', t: 'My progress', i: 'chart' }, { r: '/timer', t: 'Study timer', i: 'clock' }, { r: '/settings', t: 'Settings', i: 'settings' }] }
  ];
  var nav = document.getElementById('nav');
  var learnOpen = true;
  function buildNav() {
    nav.innerHTML = '';
    NAV.forEach(function (g) {
      var grp = h('div.nav-group', g.label ? h('div.nav-label', g.label) : null);
      g.items.forEach(function (it) {
        if (it.sub === 'learn') {
          var toggle = h('button.nav-toggle', { type: 'button', 'aria-expanded': String(learnOpen), 'aria-controls': 'nav-learn' }, u.svg('book'), 'Chapters', h('span.chev', u.svg('chevron')));
          var sub = h('div.nav-sub#nav-learn', { hidden: !learnOpen },
            h('a.nav-link', { href: '#/learn', 'data-route': '/learn' }, 'All chapters', h('span.nav-meter', IFL.progress.overall().pct + '%')),
            IFL.course.parts.map(function (p) { var pp = IFL.progress.partProgress(p.id); return h('a.nav-link', { href: '#/learn/' + p.id, 'data-route': '/learn/' + p.id }, ({ 'part-i': 'Part I · Fundamentals', 'part-ii': 'Part II · Contracts', 'part-iii': 'Part III · Products' })[p.id] || p.title, h('span.nav-meter', pp.pct + '%')); }));
          toggle.addEventListener('click', function () { learnOpen = !learnOpen; toggle.setAttribute('aria-expanded', String(learnOpen)); sub.hidden = !learnOpen; });
          grp.appendChild(toggle); grp.appendChild(sub);
        } else grp.appendChild(h('a.nav-link', { href: '#' + it.r, 'data-route': it.r }, u.svg(it.i), it.t, it.r === '/flashcards' && IFL.srs.dueCount() ? h('span.nav-meter', IFL.srs.dueCount() + ' due') : null));
      });
      nav.appendChild(grp);
    });
    nav.appendChild(h('div.small.muted', { style: { padding: '12px', lineHeight: 1.4 } }, 'Source: Muhammad Ayub, Understanding Islamic Finance (Wiley). Educational use; not a source of Shari’ah rulings.'));
    highlight(currentPath());
  }
  function currentPath() { return ((location.hash || '#/').slice(1).split('?')[0]) || '/'; }
  function highlight(path) {
    var best = null, bestLen = -1;
    document.querySelectorAll('[data-route]').forEach(function (a) {
      var r = a.getAttribute('data-route'); a.removeAttribute('aria-current');
      var match = r === '/' ? path === '/' : path === r || path.indexOf(r + '/') === 0 || (r === '/learn' && /^\/(chapter|topic|teach)\//.test(path));
      if (match && r.length > bestLen && a.closest('#nav')) { best = a; bestLen = r.length; }
      if (a.closest('.bottom-nav') && match) a.setAttribute('aria-current', 'page');
    });
    if (best) best.setAttribute('aria-current', 'page');
  }
  IFL.nav = { highlight: highlight, rebuild: buildNav };

  /* Mobile drawer */
  var sidebar = document.getElementById('sidebar'), scrim = document.getElementById('scrim'), menuBtn = document.getElementById('menu-btn');
  function setDrawer(open) { sidebar.classList.toggle('open', open); scrim.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); if (open) { var f = sidebar.querySelector('a, button'); if (f) f.focus(); } }
  menuBtn.addEventListener('click', function () { setDrawer(!sidebar.classList.contains('open')); });
  scrim.addEventListener('click', function () { setDrawer(false); });
  sidebar.addEventListener('click', function (e) { if (e.target.closest('a')) setDrawer(false); });

  /* Search */
  var sf = document.getElementById('search-form'), si = document.getElementById('search-input');
  sf.addEventListener('submit', function (e) { e.preventDefault(); var q = si.value.trim(); if (q) IFL.go('/search?q=' + encodeURIComponent(q)); });
  document.getElementById('timer-btn').addEventListener('click', function () { IFL.go('/timer'); });

  /* Keyboard: "/" search, Escape closes drawer, view-specific handlers via IFL.keys */
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    var typing = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
    if (e.key === 'Escape' && sidebar.classList.contains('open')) { setDrawer(false); return; }
    if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
    if (document.querySelector('.modal-root .backdrop')) return;
    if (e.key === '/') { e.preventDefault(); si.focus(); si.select(); return; }
    if (IFL.keys) {
      if (e.key === ' ' && e.target.closest && e.target.closest('button, a') && !e.target.closest('.flash')) return;
      if (IFL.keys(e.key) === true) e.preventDefault();
    }
  });

  /* Keep nav meters fresh */
  IFL.store.on(u.debounce(function (what) { if (['complete', 'review', 'import', 'reset', 'chapter'].indexOf(what) > -1) buildNav(); }, 400));
  IFL.afterRender = function () { var m = document.getElementById('main'); if (m && document.activeElement === document.body) m.focus({ preventScroll: true }); };

  /* Errors: never crash silently */
  window.addEventListener('error', function (e) { console.error(e.error || e.message); });
  window.addEventListener('unhandledrejection', function (e) { console.error(e.reason); if (e.reason && /Could not load/.test(String(e.reason.message))) u.toast('Some content could not be loaded. Check that all files are present.'); });

  /* Offline: service worker when served over http(s) */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !window.IFL_STANDALONE) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('service-worker.js').catch(function (err) { console.warn('Service worker not registered', err); }); });
  }

  IFL.applyTheme();
  buildNav();
  IFL.progress.checkAchievements();
  IFL.startRouter();
})();
