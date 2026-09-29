
/* Application bootstrap: navigation, theme, keyboard shortcuts, offline support and routing. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h;

  function isMobile() { return window.matchMedia ? matchMedia('(max-width: 960px)').matches : false; }
  var syncMenuBtn = function () {};
  /* ---------- Theme ---------- */
  var mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  IFL.applyTheme = function () {
    var s = IFL.store.state.settings, t = s.theme || 'system';
    if (t === 'system') t = mq && mq.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.setProperty('--font-scale', s.fontScale || 1);
    document.documentElement.classList.toggle('reduce-motion', !!s.reduceMotion);
    document.documentElement.classList.toggle('sidebar-collapsed', !!s.sidebarCollapsed && !isMobile());
    syncMenuBtn();
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
    { label: 'Explore', items: [{ r: '/concepts', t: 'Concept map', i: 'map' }, { r: '/glossary', t: 'Glossary', i: 'glossary' }, { r: '/glossary', tab: 'acronyms', t: 'Acronyms', i: 'glossary' }, { r: '/diagrams', t: 'Transaction diagrams', i: 'flow' }, { r: '/compare', t: 'Comparisons & labs', i: 'compare' }, { r: '/finder', t: 'Which mode applies?', i: 'compass' }] },
    { label: 'Practise', items: [{ r: '/flashcards', t: 'Flashcards', i: 'cards' }, { r: '/quiz', t: 'Quiz & custom quiz', i: 'quiz' }, { r: '/practice', t: 'Adaptive practice', i: 'target' }, { r: '/mistakes', t: 'My mistakes', i: 'refresh' }, { r: '/cases', t: 'Case studies', i: 'case' }] },
    { label: 'Exam', items: [{ r: '/exam', t: 'Exam preparation', i: 'exam' }, { r: '/mock', t: 'Timed mock exam', i: 'flame' }, { r: '/exam/trainer', t: 'Answer trainer', i: 'edit' }, { r: '/revision-cards', t: 'Rapid revision cards', i: 'layers' }] },
    { label: 'Guided study', items: [{ r: '/planner', t: 'Exam planner', i: 'calendar' }, { r: '/guided/crash45', t: '45-minute crash course', i: 'bolt' }, { r: '/guided/revision90', t: '90-minute revision', i: 'clock' }, { r: '/guided/deep180', t: '3-hour deep study', i: 'teach' }, { r: '/guided/deep180-chapters', t: '3-hour chapter track', i: 'book' }] },
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
          var toggle = h('button.nav-toggle', { type: 'button', 'aria-expanded': String(learnOpen), 'aria-controls': 'nav-learn', title: 'Chapters' }, u.svg('book'), h('span.nav-text', 'Chapters'), h('span.chev', u.svg('chevron')));
          var sub = h('div.nav-sub#nav-learn', { hidden: !learnOpen },
            h('a.nav-link', { href: '#/learn', 'data-route': '/learn' }, 'All chapters', h('span.nav-meter', IFL.progress.overall().pct + '%')),
            IFL.course.parts.map(function (p) { var pp = IFL.progress.partProgress(p.id); return h('a.nav-link', { href: '#/learn/' + p.id, 'data-route': '/learn/' + p.id }, ({ 'part-i': 'Part I · Fundamentals', 'part-ii': 'Part II · Contracts', 'part-iii': 'Part III · Products' })[p.id] || p.title, h('span.nav-meter', pp.pct + '%')); }));
          toggle.addEventListener('click', function () { if (document.documentElement.classList.contains('sidebar-collapsed')) { IFL.go('/learn'); return; } learnOpen = !learnOpen; toggle.setAttribute('aria-expanded', String(learnOpen)); sub.hidden = !learnOpen; });
          grp.appendChild(toggle); grp.appendChild(sub);
        } else grp.appendChild(h('a.nav-link', { href: '#' + it.r + (it.tab ? '?tab=' + it.tab : ''), 'data-route': it.r, 'data-tab': it.tab || null, title: it.t }, u.svg(it.i), h('span.nav-text', it.t), it.r === '/flashcards' && IFL.srs.dueCount() ? h('span.nav-meter', IFL.srs.dueCount() + ' due') : null));
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
      var tabA = a.getAttribute('data-tab'), onAcr = /[?&]tab=acronyms/.test(location.hash);
      if (match && r === '/glossary') match = tabA ? onAcr : !onAcr;
      if (match && r.length > bestLen && a.closest('#nav')) { best = a; bestLen = r.length; }
      if (a.closest('.bottom-nav') && match) a.setAttribute('aria-current', 'page');
    });
    if (best) best.setAttribute('aria-current', 'page');
  }
  IFL.nav = { highlight: highlight, rebuild: buildNav };

  /* Mobile drawer */
  var sidebar = document.getElementById('sidebar'), scrim = document.getElementById('scrim'), menuBtn = document.getElementById('menu-btn');
  function setDrawer(open) { sidebar.classList.toggle('open', open); scrim.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); if (open) { var f = sidebar.querySelector('a, button'); if (f) f.focus(); } }
  syncMenuBtn = function () { menuBtn.setAttribute('aria-expanded', String(isMobile() ? sidebar.classList.contains('open') : !IFL.store.state.settings.sidebarCollapsed)); };
  menuBtn.addEventListener('click', function () {
    if (isMobile()) { setDrawer(!sidebar.classList.contains('open')); return; }
    IFL.store.update(function (st) { st.settings.sidebarCollapsed = !st.settings.sidebarCollapsed; }); IFL.applyTheme();
  });
  if (window.matchMedia) { var mm = matchMedia('(max-width: 960px)'); (mm.addEventListener ? mm.addEventListener.bind(mm, 'change') : mm.addListener.bind(mm))(function () { IFL.applyTheme(); }); }
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

  /* Streak pill in the top bar */
  var pill = document.getElementById('streak-pill'), pillN = document.getElementById('streak-n');
  function updateStreak() { var n = IFL.progress.streak(); if (pill) { pill.hidden = !n; if (pillN) pillN.textContent = String(n); } }
  IFL.store.on(u.debounce(function (what) { if (what === 'tick' || what === 'import' || what === 'reset') updateStreak(); }, 800));

  /* Keep nav meters fresh */
  IFL.store.on(u.debounce(function (what) { if (['complete', 'review', 'import', 'reset', 'chapter'].indexOf(what) > -1) buildNav(); }, 400));
  IFL.afterRender = function () { var m = document.getElementById('main'); if (m && document.activeElement === document.body) m.focus({ preventScroll: true }); };

  /* Heading levels: views are composed from cards whose titles are h3/h4; give any heading that would skip a level
     the correct aria-level (no visual change) so the outline is always h1 › h2 › h3 … */
  function fixHeadings() {
    var view = document.getElementById('view'); if (!view) return;
    var last = 1;
    Array.prototype.forEach.call(view.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]'), function (hd) {
      var lv = hd.getAttribute('role') === 'heading' ? Number(hd.getAttribute('aria-level')) || 2 : Number(hd.tagName.charAt(1));
      if (lv > last + 1) { lv = last + 1; hd.setAttribute('aria-level', String(lv)); if (hd.getAttribute('role') !== 'heading') hd.setAttribute('role', 'heading'); }
      last = lv;
    });
  }
  IFL.fixHeadings = fixHeadings;
  if (window.MutationObserver) { var hdTimer = null; new MutationObserver(function () { clearTimeout(hdTimer); hdTimer = setTimeout(fixHeadings, 60); }).observe(document.getElementById('view'), { childList: true, subtree: true }); }

  /* Errors: never crash silently */
  window.addEventListener('error', function (e) { console.error(e.error || e.message); });
  window.addEventListener('unhandledrejection', function (e) { console.error(e.reason); if (e.reason && /Could not load/.test(String(e.reason.message))) u.toast('Some content could not be loaded. Check that all files are present.'); });

  /* Offline: service worker when served over http(s) */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !window.IFL_STANDALONE) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('service-worker.js').catch(function (err) { console.warn('Service worker not registered', err); }); });
  }

  IFL.applyTheme();
  updateStreak();
  buildNav();
  IFL.progress.checkAchievements();
  IFL.startRouter();
})();

