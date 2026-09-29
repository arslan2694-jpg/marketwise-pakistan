/* Application bootstrap: navigation, theme, search suggestions, streak, keyboard shortcuts and routing. */
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

  /* ---------- Navigation (Learn → Practise → Apply → Calculate → Exam → Study → Reference → Personal) ---------- */
  var NAV = [
    { label: null, items: [{ r: '/', t: 'Dashboard', i: 'home' }] },
    { label: 'Learn', items: [{ r: '/learn', t: 'Chapters and topics', i: 'book', sub: 'learn' }, { r: '/concepts', t: 'Concepts and map', i: 'map' }, { r: '/glossary', t: 'Glossary and acronyms', i: 'glossary' }] },
    { label: 'Practise', items: [{ r: '/quiz', t: 'Questions and quizzes', i: 'quiz' }, { r: '/practice', t: 'Adaptive practice and weak areas', i: 'target' }, { r: '/flashcards', t: 'Flashcards (spaced review)', i: 'cards' }, { r: '/mistakes', t: 'My mistakes', i: 'refresh' }] },
    { label: 'Apply', items: [{ r: '/modes', t: 'Financing modes', i: 'bank' }, { r: '/products', t: 'Products', i: 'layers' }, { r: '/diagrams', t: 'Transaction diagrams', i: 'flow' }, { r: '/cases', t: 'Case studies', i: 'case' }, { r: '/compare', t: 'Comparisons', i: 'compare' }, { r: '/finder', t: 'Which mode applies?', i: 'compass' }] },
    { label: 'Calculate', items: [{ r: '/numericals', t: 'Numericals trainer', i: 'sum' }, { r: '/tools', t: 'Calculators and checkers', i: 'calc' }] },
    { label: 'Exam', items: [{ r: '/exam', t: 'Exam preparation', i: 'exam' }, { r: '/exam/trainer', t: 'Answer trainer', i: 'edit' }, { r: '/revision-cards', t: 'Rapid revision cards', i: 'bolt' }, { r: '/mock', t: 'Timed mock exams', i: 'flame' }, { r: '/planner', t: 'Exam planner', i: 'calendar' }] },
    { label: 'Study', items: [{ r: '/guided/crash45', t: '45-minute study', i: 'bolt' }, { r: '/guided/revision90', t: '90-minute revision', i: 'clock' }, { r: '/guided/deep180', t: '3-hour deep study', i: 'teach' }, { r: '/timer', t: 'Study timer', i: 'clock' }] },
    { label: 'Reference', items: [{ r: '/search', t: 'Search everything', i: 'search' }, { r: '/sources', t: 'Sources and page map', i: 'source' }] },
    { label: 'Personal', items: [{ r: '/progress', t: 'Progress and history', i: 'chart' }, { r: '/bookmarks', t: 'Bookmarks', i: 'bookmark' }, { r: '/notes', t: 'My notes', i: 'note' }, { r: '/settings', t: 'Settings', i: 'settings' }] }
  ];
  var nav = document.getElementById('nav');
  var learnOpen = true;
  function buildNav() {
    nav.innerHTML = '';
    NAV.forEach(function (g) {
      var grp = h('div.nav-group', g.label ? h('div.nav-label', g.label) : null);
      g.items.forEach(function (it) {
        if (it.sub === 'learn') {
          var toggle = h('button.nav-toggle', { type: 'button', 'aria-expanded': String(learnOpen), 'aria-controls': 'nav-learn' }, u.svg('book'), 'Chapters and topics', h('span.chev', u.svg('chevron')));
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
  var ALSO = { '/learn': /^\/(chapter|topic|teach)\//, '/concepts': /^\/concept\//, '/modes': /^\/mode\//, '/products': /^\/product\//, '/diagrams': /^\/diagram\//, '/cases': /^\/case\//, '/quiz': /^\/quiz\//, '/mock': /^\/mock\//, '/flashcards': /^\/flashcards\// };
  function highlight(path) {
    var best = null, bestLen = -1;
    document.querySelectorAll('[data-route]').forEach(function (a) {
      var r = a.getAttribute('data-route'); a.removeAttribute('aria-current');
      var match = r === '/' ? path === '/' : path === r || path.indexOf(r + '/') === 0 || (ALSO[r] && ALSO[r].test(path));
      if (match && r.length > bestLen && a.closest('#nav')) { best = a; bestLen = r.length; }
      if (a.closest('.bottom-nav') && match) a.setAttribute('aria-current', 'page');
    });
    if (best) best.setAttribute('aria-current', 'page');
  }
  IFL.nav = { highlight: highlight, rebuild: buildNav };

  /* Mobile drawer + desktop collapse */
  var app = document.getElementById('app'), sidebar = document.getElementById('sidebar'), scrim = document.getElementById('scrim'), menuBtn = document.getElementById('menu-btn'), collapseBtn = document.getElementById('collapse-btn');
  function setDrawer(open) { sidebar.classList.toggle('open', open); scrim.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); if (open) { var f = sidebar.querySelector('a, button'); if (f) f.focus(); } }
  menuBtn.addEventListener('click', function () { setDrawer(!sidebar.classList.contains('open')); });
  scrim.addEventListener('click', function () { setDrawer(false); });
  sidebar.addEventListener('click', function (e) { if (e.target.closest('a')) setDrawer(false); });
  function setCollapsed(on) { app.classList.toggle('collapsed', on); collapseBtn.setAttribute('aria-expanded', String(!on)); collapseBtn.setAttribute('aria-label', on ? 'Show navigation' : 'Hide navigation'); try { localStorage.setItem('ifl.ui.collapsed', on ? '1' : '0'); } catch (e) { /* ignore */ } }
  try { if (localStorage.getItem('ifl.ui.collapsed') === '1') setCollapsed(true); } catch (e) { /* ignore */ }
  collapseBtn.addEventListener('click', function () { setCollapsed(!app.classList.contains('collapsed')); });

  /* ---------- Search box with live suggestions ---------- */
  var sf = document.getElementById('search-form'), si = document.getElementById('search-input'), box = document.getElementById('search-suggest');
  var sug = { items: [], active: -1 };
  function closeSuggest() { box.hidden = true; si.setAttribute('aria-expanded', 'false'); si.removeAttribute('aria-activedescendant'); sug.active = -1; }
  function setActive(i) {
    sug.active = i;
    Array.prototype.forEach.call(box.children, function (el, k) { el.setAttribute('aria-selected', String(k === i)); });
    if (i >= 0 && box.children[i]) si.setAttribute('aria-activedescendant', box.children[i].id); else si.removeAttribute('aria-activedescendant');
  }
  var showSuggest = u.debounce(function () {
    var q = si.value.trim();
    if (q.length < 2) { closeSuggest(); return; }
    IFL.searchIndex().then(function () {
      var res = IFL.searchQuery(q, 7);
      box.innerHTML = '';
      if (!res.length) { closeSuggest(); return; }
      res.forEach(function (r, i) { box.appendChild(h('a', { role: 'option', id: 'sg-' + i, href: '#' + r.d.route, 'aria-selected': 'false', onclick: closeSuggest }, h('span.badge', IFL.data.typeLabel(r.d.type)), h('span.sg-title', r.d.title))); });
      box.appendChild(h('a.sg-all', { role: 'option', id: 'sg-all', href: '#/search?q=' + encodeURIComponent(q), 'aria-selected': 'false', onclick: closeSuggest }, 'See all results for “' + q + '”'));
      box.hidden = false; si.setAttribute('aria-expanded', 'true'); sug.active = -1;
    });
  }, 120);
  si.addEventListener('input', showSuggest);
  si.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    var n = box.children.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((sug.active + 1) % n); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((sug.active - 1 + n) % n); }
    else if (e.key === 'Enter' && sug.active > -1) { e.preventDefault(); var t = box.children[sug.active]; closeSuggest(); location.hash = t.getAttribute('href'); }
    else if (e.key === 'Escape') closeSuggest();
  });
  document.addEventListener('click', function (e) { if (!sf.contains(e.target)) closeSuggest(); });
  sf.addEventListener('submit', function (e) { e.preventDefault(); closeSuggest(); var q = si.value.trim(); if (q) IFL.go('/search?q=' + encodeURIComponent(q)); });
  document.getElementById('timer-btn').addEventListener('click', function () { IFL.go('/timer'); });

  /* ---------- Streak pill ---------- */
  var streakEl = document.getElementById('streak-pill');
  function drawStreak() { var n = IFL.progress.streak(); streakEl.querySelector('.streak-text').textContent = n + '-day streak'; streakEl.setAttribute('aria-label', 'Study streak: ' + n + (n === 1 ? ' day' : ' days')); }

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

  /* Keep nav meters and streak fresh */
  IFL.store.on(u.debounce(function (what) { if (['complete', 'review', 'import', 'reset', 'chapter'].indexOf(what) > -1) buildNav(); if (['tick', 'complete', 'import', 'reset', 'attempt', 'review'].indexOf(what) > -1) drawStreak(); }, 400));
  var firstRender = true;   /* on the very first render keep focus at the top so the skip link is the first Tab stop; afterwards move focus to <main> on navigation */
  IFL.afterRender = function () { if (firstRender) { firstRender = false; return; } var m = document.getElementById('main'); if (m && document.activeElement === document.body) m.focus({ preventScroll: true }); };

  /* Errors: never crash silently */
  window.addEventListener('error', function (e) { console.error(e.error || e.message); });
  window.addEventListener('unhandledrejection', function (e) { console.error(e.reason); });

  /* This build is a single self-contained file: everything is inlined and works from file://. It deliberately
     ships no web-app manifest or service worker (there is no separate origin or start URL to install from). */
  IFL.applyTheme();
  buildNav();
  drawStreak();
  IFL.progress.checkAchievements();
  if (IFL.legacyImported && !IFL.store.state.legacy.noticeShown) {
    IFL.store.update(function (s) { s.legacy.noticeShown = true; });
    setTimeout(function () { u.toast('Your progress from the earlier applications was found and imported.', 6000); }, 600);
  }
  IFL.startRouter();
})();
