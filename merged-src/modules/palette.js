/* Command palette (Ctrl/Cmd + K): jump to any page, chapter or study action, or search all content,
   without leaving the keyboard. It reuses the one search index — there is no second search system. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h;
  var openState = null;

  function commands() {
    var s = IFL.store.state, out = [], plan = IFL.todayPlan ? IFL.todayPlan() : null;
    function add(group, title, route, icon, hint, run) { out.push({ group: group, title: title, route: route, icon: icon, hint: hint || '', run: run, n: u.norm(title + ' ' + (hint || '')) }); }
    if (plan && plan.next) add('Suggested', 'Today: ' + plan.next.title, plan.next.route, plan.next.icon, 'next step of today’s session');
    if (s.last && s.last.topic && IFL.course.topic(s.last.topic)) { var t = IFL.course.topic(s.last.topic); add('Suggested', 'Continue §' + t.section + ' ' + t.title, '/topic/' + t.id, 'play', 'where you left off'); }
    var due = IFL.srs.dueCount(); if (due) add('Suggested', 'Review ' + due + ' due flashcards', '/flashcards/review?scope=due', 'cards');
    add('Suggested', 'Today’s session', '/today', 'calendar', 'daily plan');
    (IFL.navItems || []).forEach(function (it) { if (it.r !== '/today') add('Go to', it.t, it.r, it.i, it.group); });
    add('Go to', 'Achievements and history', '/progress', 'trophy');
    IFL.course.chapters.forEach(function (c) { add('Chapters', 'Chapter ' + c.n + ': ' + c.title, '/chapter/' + c.n, 'book'); });
    add('Actions', 'Quick quiz — 10 mixed questions', '/quiz/run?n=10', 'quiz');
    add('Actions', 'Personalised practice — 10 questions', '/practice/run?n=10', 'target');
    add('Actions', 'Retry my mistakes', '/mistakes', 'refresh');
    add('Actions', 'Switch theme (light / dark / system)', null, 'settings', 'appearance', function () { document.getElementById('theme-btn').click(); });
    add('Actions', 'Show or hide the navigation sidebar', null, 'layers', 'layout', function () { document.getElementById('collapse-btn').click(); });
    return out;
  }

  function open() {
    if (openState) return;
    var root = document.getElementById('modal-root'), prev = document.activeElement;
    var cmds = commands(), items = [], active = 0;
    var input = h('input.palette-input', { type: 'text', role: 'combobox', 'aria-expanded': 'true', 'aria-controls': 'palette-list', 'aria-autocomplete': 'list', 'aria-label': 'Jump to a page or search', placeholder: 'Jump to a page, chapter or action — or search everything…', autocomplete: 'off', spellcheck: 'false' });
    var list = h('div.palette-list#palette-list', { role: 'listbox', 'aria-label': 'Results' });
    var dlg = h('div.palette', { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Command palette' },
      h('div.palette-head', u.svg('search'), input, h('kbd', 'Esc')),
      list,
      h('div.palette-foot.small.muted', h('span', h('kbd', '↑'), h('kbd', '↓'), ' move'), h('span', h('kbd', 'Enter'), ' open'), h('span', h('kbd', 'Ctrl'), '+', h('kbd', 'K'), ' toggle')));
    var back = h('div.backdrop.palette-backdrop', { onclick: function (e) { if (e.target === back) close(); } }, dlg);

    function close() { back.remove(); document.removeEventListener('keydown', onKey, true); openState = null; if (prev && prev.focus && document.contains(prev)) prev.focus(); }
    function go(it) {
      close();
      if (it.run) it.run(); else if (it.route) IFL.go(it.route);
    }
    function setActive(i, scroll) {
      active = i;
      Array.prototype.forEach.call(list.querySelectorAll('[role="option"]'), function (el, k) { el.setAttribute('aria-selected', String(k === i)); if (k === i && scroll) el.scrollIntoView({ block: 'nearest' }); });
      if (items[i]) input.setAttribute('aria-activedescendant', 'pal-' + i); else input.removeAttribute('aria-activedescendant');
    }
    function draw() {
      var q = input.value.trim(), nq = u.norm(q), terms = nq.split(/\s+/).filter(Boolean);
      items = [];
      var matched = !terms.length ? cmds.filter(function (c) { return c.group === 'Suggested' || c.group === 'Go to'; })
        : cmds.filter(function (c) { return terms.every(function (t) { return c.n.indexOf(t) > -1; }); })
          .sort(function (a, b) { return (a.n.indexOf(terms[0]) === 0 ? 0 : 1) - (b.n.indexOf(terms[0]) === 0 ? 0 : 1); }).slice(0, 8);
      matched.forEach(function (c) { items.push(c); });
      if (q.length >= 2) {
        IFL.searchQuery(q, 8).forEach(function (r) { items.push({ group: 'Content', title: r.d.title, route: r.d.route, badge: IFL.data.typeLabel(r.d.type) }); });
        items.push({ group: 'Content', title: 'See all results for “' + q + '”', route: '/search?q=' + encodeURIComponent(q), icon: 'search' });
      }
      list.innerHTML = '';
      var group = null;
      items.forEach(function (it, i) {
        if (it.group !== group) { group = it.group; list.appendChild(h('div.palette-group', { role: 'presentation' }, group)); }
        list.appendChild(h('div.palette-item', { role: 'option', id: 'pal-' + i, 'aria-selected': 'false', onclick: function () { go(it); }, onmousemove: function () { if (active !== i) setActive(i, false); } },
          it.badge ? h('span.badge', it.badge) : u.svg(it.icon || 'dot'), h('span.palette-title', it.title), it.hint ? h('span.small.muted', it.hint) : null));
      });
      if (!items.length) list.appendChild(h('div.palette-empty.muted', 'Nothing matches. Try a term such as “Murabaha”, “Riba” or “Sukuk”.'));
      setActive(0, false); list.scrollTop = 0;
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (items.length) setActive((active + 1) % items.length, true); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (items.length) setActive((active - 1 + items.length) % items.length, true); }
      else if (e.key === 'Enter') { e.preventDefault(); if (items[active]) go(items[active]); }
      else if (e.key === 'Tab') { e.preventDefault(); input.focus(); }
    }
    input.addEventListener('input', u.debounce(draw, 60));
    document.addEventListener('keydown', onKey, true);
    root.appendChild(back);
    openState = { close: close };
    IFL.searchIndex().then(function () { if (openState) { draw(); input.focus(); } });
  }

  IFL.palette = { open: open, close: function () { if (openState) openState.close(); }, isOpen: function () { return !!openState; } };
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); if (openState) openState.close(); else open(); }
  });
  var btn = document.getElementById('palette-btn');
  if (btn) btn.addEventListener('click', open);
})();
