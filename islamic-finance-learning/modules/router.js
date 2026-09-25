/* Hash router: #/path/segments?query. Views register with IFL.route(pattern, handler). */
(function () {
  var IFL = window.IFL, u = IFL.u;
  var routes = [];
  IFL.route = function (pattern, handler, opts) {
    var keys = [];
    var re = new RegExp('^' + pattern.replace(/\//g, '\\/').replace(/:(\w+)/g, function (_, k) { keys.push(k); return '([^/?]+)'; }) + '$');
    routes.push({ re: re, keys: keys, handler: handler, opts: opts || {} });
  };
  function parse() {
    var raw = (location.hash || '#/').slice(1) || '/';
    var qi = raw.indexOf('?');
    var path = qi > -1 ? raw.slice(0, qi) : raw;
    var query = {};
    if (qi > -1) raw.slice(qi + 1).split('&').forEach(function (p) { if (!p) return; var kv = p.split('='); query[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' ')); });
    return { path: path, query: query, raw: raw };
  }
  var token = 0, cleanup = null;
  function render() {
    var r = parse(), view = document.getElementById('view');
    var match = null, params = {};
    for (var i = 0; i < routes.length; i++) {
      var m = routes[i].re.exec(r.path);
      if (m) { match = routes[i]; match.keys.forEach(function (k, j) { params[k] = decodeURIComponent(m[j + 1]); }); break; }
    }
    if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
    IFL.keys = null;
    var my = ++token;
    view.className = 'view' + (match && match.opts.wide ? ' wide' : '');
    IFL.nav && IFL.nav.highlight(r.path);
    if (!match) { view.innerHTML = ''; view.appendChild(notFound(r.path)); return; }
    var ctx = {
      params: params, query: r.query, path: r.path,
      alive: function () { return my === token; },
      onLeave: function (fn) { cleanup = fn; }
    };
    view.innerHTML = '';
    view.appendChild(u.h('div.loading', { role: 'status' }, u.h('span.spinner'), 'Loading…'));
    Promise.resolve().then(function () { return match.handler(ctx); }).then(function (node) {
      if (!ctx.alive()) return;
      view.innerHTML = '';
      if (node) view.appendChild(node);
      if (!ctx.query._keepScroll) window.scrollTo(0, 0);
      var h1 = view.querySelector('h1');
      document.title = (h1 ? h1.textContent + ' — ' : '') + 'Islamic Finance Learning';
      if (IFL.afterRender) IFL.afterRender(ctx);
    }).catch(function (err) {
      console.error(err);
      if (!ctx.alive()) return;
      view.innerHTML = '';
      view.appendChild(u.h('div.card', u.h('h2', 'Something went wrong'), u.h('p.text-2', 'This page could not be displayed. ' + (err && err.message ? '(' + err.message + ')' : '')), u.h('p', u.h('a.btn', { href: '#/' }, 'Back to dashboard'))));
    });
  }
  function notFound(path) {
    return u.h('div.card.empty', u.h('h2', 'Page not found'), u.h('p', 'There is no page at ' + path + '.'), u.h('a.btn.primary', { href: '#/' }, 'Go to dashboard'));
  }
  IFL.go = function (path) { if (('#' + path) === location.hash) render(); else location.hash = path; };
  IFL.refresh = render;
  IFL.startRouter = function () { window.addEventListener('hashchange', render); render(); };
})();
