/* Utilities: DOM building, escaping, formatting, toast and modal dialogs. */
(function () {
  var IFL = window.IFL = window.IFL || {};

  /* h('div.card#id', {attrs}, children...) — tiny hyperscript. Strings become text nodes. */
  function h(sel, attrs) {
    var m = /^([a-z0-9-]+)?((?:[.#][\w-]+)*)$/i.exec(sel) || [];
    var el = document.createElement(m[1] || 'div');
    (m[2] || '').replace(/([.#])([\w-]+)/g, function (_, t, v) { if (t === '.') el.classList.add(v); else el.id = v; });
    var kids = Array.prototype.slice.call(arguments, 2);
    if (attrs !== undefined && (attrs === null || typeof attrs !== 'object' || attrs.nodeType || Array.isArray(attrs))) { kids.unshift(attrs); attrs = null; }
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className += (el.className ? ' ' : '') + v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    });
    append(el, kids);
    return el;
  }
  function append(el, kids) {
    kids.forEach(function (c) {
      if (c == null || c === false) return;
      if (Array.isArray(c)) return append(el, c);
      el.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
    });
    return el;
  }
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }

  function svg(name) {
    var P = IFL.ICONS[name] || IFL.ICONS.dot;
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true');
    s.innerHTML = P;
    return s;
  }
  IFL.ICONS = {
    dot: '<circle cx="12" cy="12" r="3"/>',
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 5v16"/>',
    map: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7.5l3 8M16 7.5l-3 8M8.5 6h7"/>',
    glossary: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M9 9h6M9 13h4"/>',
    cards: '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v10"/>',
    quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17h.01"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    case: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    compare: '<path d="M12 3v18M5 7h4v10H5zM15 7h4v10h-4z"/>',
    flow: '<rect x="3" y="4" width="6" height="5" rx="1"/><rect x="15" y="4" width="6" height="5" rx="1"/><rect x="9" y="15" width="6" height="5" rx="1"/><path d="M9 6.5h6M6 9v3h12V9M12 12v3"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    exam: '<path d="M9 4h6l1 2h3v15H5V6h3z"/><path d="M9 13l2 2 4-4"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    clock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
    note: '<path d="M4 4h16v12l-4 4H4z"/><path d="M16 20v-4h4M8 9h8M8 13h5"/>',
    chart: '<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    play: '<path d="M7 4l13 8-13 8z"/>',
    pause: '<path d="M8 4v16M16 4v16"/>',
    skip: '<path d="M5 5l10 7-10 7zM19 5v14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9 18h6"/>',
    teach: '<path d="M3 8l9-4 9 4-9 4z"/><path d="M7 10v5c2.5 2 7.5 2 10 0v-5M21 8v6"/>',
    source: '<path d="M4 4h10l6 6v10H4z"/><path d="M14 4v6h6"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    edit: '<path d="M4 20h4l11-11-4-4L4 16z"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M4 20h16"/>',
    upload: '<path d="M12 20V9M7 14l5-5 5 5M4 4h16"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11v6M8 15h2M12 15h2M8 18h6"/>',
    scales: '<path d="M12 3v18M6 21h12M5 7h14M5 7l-3 7h6zM19 7l-3 7h6z"/>',
    flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 1.5 1 2 2 3 3 0-2 0-4 0-6z"/>'
  };

  function toast(msg, ms) {
    var root = document.getElementById('toast-root'); if (!root) return;
    var t = h('div.toast', msg); root.appendChild(t);
    setTimeout(function () { t.remove(); }, ms || 2600);
  }

  /* Modal dialog with focus trap. Returns {close}. */
  function modal(opts) {
    var root = document.getElementById('modal-root');
    var prev = document.activeElement;
    var close = function (val) { back.remove(); document.removeEventListener('keydown', onKey); if (prev && prev.focus) prev.focus(); if (opts.onClose) opts.onClose(val); };
    var body = h('div.body', opts.body);
    var foot = opts.actions ? h('footer', opts.actions.map(function (a) {
      return h('button.btn' + (a.primary ? '.primary' : '') + (a.danger ? '.danger.solid' : ''), { type: 'button', onclick: function () { var r = a.onClick ? a.onClick() : undefined; if (r !== false) close(a.value); } }, a.label);
    })) : null;
    var dlg = h('div.modal' + (opts.wide ? '.wide' : ''), { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'modal-title' },
      h('header', h('h2#modal-title', opts.title), h('button.icon-btn', { type: 'button', 'aria-label': 'Close dialog', onclick: function () { close(); } }, svg('x'))),
      body, foot);
    var back = h('div.backdrop', { onclick: function (e) { if (e.target === back) close(); } }, dlg);
    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        var f = dlg.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    }
    document.addEventListener('keydown', onKey);
    root.appendChild(back);
    var focusEl = dlg.querySelector('[autofocus]') || dlg.querySelector('input, textarea, select') || (foot && foot.querySelector('.primary')) || dlg.querySelector('button');
    if (focusEl) focusEl.focus();
    return { close: close, el: dlg };
  }
  function confirmDialog(title, text, okLabel, danger) {
    return new Promise(function (res) {
      modal({ title: title, body: h('p', text), onClose: function (v) { res(v === true); },
        actions: [{ label: 'Cancel', value: false }, { label: okLabel || 'Confirm', value: true, primary: !danger, danger: !!danger }] });
    });
  }

  function debounce(fn, ms) { var t; return function () { var a = arguments, self = this; clearTimeout(t); t = setTimeout(function () { fn.apply(self, a); }, ms); }; }
  function pct(a, b) { return b ? Math.round(100 * a / b) : 0; }
  function fmtDuration(sec) {
    sec = Math.round(sec || 0);
    if (sec < 60) return sec + 's';
    var m = Math.floor(sec / 60), hh = Math.floor(m / 60);
    return hh ? hh + 'h ' + (m % 60) + 'm' : m + 'm';
  }
  function clock(sec) { sec = Math.max(0, Math.round(sec)); var m = Math.floor(sec / 60), s = sec % 60; return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function ago(ts) {
    if (!ts) return '';
    var s = (Date.now() - ts) / 1000;
    if (s < 60) return 'just now';
    if (s < 3600) return Math.floor(s / 60) + ' min ago';
    if (s < 86400) return Math.floor(s / 3600) + ' h ago';
    if (s < 86400 * 7) return Math.floor(s / 86400) + ' d ago';
    return new Date(ts).toLocaleDateString();
  }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function shuffle(a, seed) {
    a = a.slice(); var r = seed == null ? Math.random : mulberry(seed);
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function norm(s) { return String(s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[‘’`´'ʿʾ]/g, '').toLowerCase(); }
  function highlight(text, q) {
    var t = esc(text); if (!q) return t;
    var words = norm(q).split(/\s+/).filter(function (w) { return w.length > 1; });
    if (!words.length) return t;
    var nt = norm(text), marks = [];
    words.forEach(function (w) { var i = 0; while ((i = nt.indexOf(w, i)) > -1) { marks.push([i, i + w.length]); i += w.length; } });
    if (!marks.length) return t;
    marks.sort(function (a, b) { return a[0] - b[0]; });
    var out = '', pos = 0;
    marks.forEach(function (m) { if (m[0] < pos) return; out += esc(text.slice(pos, m[0])) + '<mark>' + esc(text.slice(m[0], m[1])) + '</mark>'; pos = m[1]; });
    return out + esc(text.slice(pos));
  }
  function download(filename, text, type) {
    var blob = new Blob([text], { type: type || 'application/json' });
    var a = h('a', { href: URL.createObjectURL(blob), download: filename });
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  IFL.u = { h: h, append: append, esc: esc, svg: svg, toast: toast, modal: modal, confirm: confirmDialog, debounce: debounce, pct: pct, fmtDuration: fmtDuration, clock: clock, dayKey: dayKey, ago: ago, uid: uid, shuffle: shuffle, norm: norm, highlight: highlight, download: download };
})();
