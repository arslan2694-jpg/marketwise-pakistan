
/* Live search-as-you-type suggestions under the top-bar search box (combobox pattern).
   Arrow keys move through suggestions, Enter opens the highlighted one (or the full results page), Escape closes. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h;
  var form = document.getElementById('search-form'), input = document.getElementById('search-input');
  if (!form || !input) return;
  var panel = h('div.suggest#search-suggest', { role: 'listbox', 'aria-label': 'Search suggestions', hidden: true });
  form.appendChild(panel);
  input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list'); input.setAttribute('aria-expanded', 'false'); input.setAttribute('aria-controls', 'search-suggest');
  var items = [], active = -1, seq = 0, timer = null;

  function close() { panel.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); active = -1; }
  function setActive(i) {
    active = i;
    Array.prototype.forEach.call(panel.children, function (el, k) { el.setAttribute('aria-selected', String(k === i)); });
    if (i >= 0) { var el = panel.children[i]; input.setAttribute('aria-activedescendant', el.id); if (el.scrollIntoView) el.scrollIntoView({ block: 'nearest' }); } else input.removeAttribute('aria-activedescendant');
  }
  function open() { panel.hidden = false; input.setAttribute('aria-expanded', 'true'); }
  function render(q, res) {
    panel.innerHTML = ''; items = [];
    if (!res.items.length) panel.appendChild(h('div.small.muted', { style: { padding: '10px 12px' }, role: 'option', 'aria-disabled': 'true', id: 'sg-none' }, 'No matches for “' + q + '”. Try another spelling.'));
    res.items.forEach(function (d, i) {
      var a = h('a', { role: 'option', id: 'sg-' + i, href: '#' + d.route, 'aria-selected': 'false' }, h('span.row', h('span.badge', IFL.searchTypeLabel(d.type)), h('strong.small', { html: u.highlight(IFL.trunc(d.title, 70), q) })), d.text ? h('span.small.muted', { style: { display: 'block', marginTop: '2px' } }, IFL.trunc(d.text, 90)) : null);
      a.addEventListener('click', function () { close(); });
      panel.appendChild(a); items.push(a);
    });
    if (res.items.length) { var all = h('a', { role: 'option', id: 'sg-all', href: '#/search?q=' + encodeURIComponent(q), 'aria-selected': 'false' }, h('strong.small', 'See all ' + res.total + ' results →')); all.addEventListener('click', close); panel.appendChild(all); items.push(all); }
    open(); setActive(-1);
  }
  function query() {
    var q = input.value.trim(); clearTimeout(timer);
    if (q.length < 2) { close(); return; }
    var my = ++seq;
    timer = setTimeout(function () { IFL.searchDocs(q, 7).then(function (res) { if (my === seq && input.value.trim() === q) render(q, res); }); }, 150);
  }
  input.addEventListener('input', query);
  input.addEventListener('focus', function () { if (input.value.trim().length >= 2 && panel.children.length) open(); });
  input.addEventListener('keydown', function (e) {
    if (panel.hidden || !items.length) { if (e.key === 'Escape') close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((active + 1) % items.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active <= 0 ? items.length - 1 : active - 1); }
    else if (e.key === 'Enter' && active > -1) { e.preventDefault(); var a = items[active]; close(); location.hash = a.getAttribute('href').slice(1); input.blur(); }
    else if (e.key === 'Escape') { e.stopPropagation(); close(); }
    else if (e.key === 'Tab') close();
  });
  document.addEventListener('click', function (e) { if (!form.contains(e.target)) close(); });
  form.addEventListener('submit', close);
  setTimeout(function () { if (IFL.searchIndex) IFL.searchIndex(); }, 3500);   /* warm the index in the background so the first suggestions are instant */
  window.addEventListener('hashchange', close);
})();
