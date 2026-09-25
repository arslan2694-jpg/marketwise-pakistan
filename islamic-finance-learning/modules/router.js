/* Minimal hash-based router. Works under file:// (no server needed).
 * Routes are registered as ("/pattern/:param", handler(params, query)).
 * The matched handler must render into IFLRouter.outlet(). */
(function (global) {
  "use strict";

  var routes = [];
  var notFoundHandler = function (root) {
    root.innerHTML = '<div class="empty-state"><h3>Page not found</h3><p>That link does not match anything in the app.</p><button class="btn btn-primary" data-nav="#/dashboard">Go to Dashboard</button></div>';
  };
  var outletEl = null;
  var beforeEachHooks = [];
  var currentPath = null;

  function outlet() { return outletEl; }

  function compile(pattern) {
    var paramNames = [];
    var regexStr = pattern
      .replace(/\/+$/, "")
      .split("/")
      .map(function (seg) {
        if (seg.indexOf(":") === 0) {
          paramNames.push(seg.slice(1));
          return "([^/]+)";
        }
        return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join("/");
    return { regex: new RegExp("^" + regexStr + "$"), paramNames: paramNames };
  }

  function register(pattern, handler) {
    routes.push({ pattern: pattern, compiled: compile(pattern), handler: handler });
  }

  function parseHash() {
    var raw = global.location.hash.replace(/^#/, "") || "/dashboard";
    var qIndex = raw.indexOf("?");
    var path = qIndex >= 0 ? raw.slice(0, qIndex) : raw;
    var queryStr = qIndex >= 0 ? raw.slice(qIndex + 1) : "";
    path = path.replace(/\/+$/, "") || "/";
    var query = {};
    queryStr.split("&").forEach(function (pair) {
      if (!pair) return;
      var kv = pair.split("=");
      query[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
    });
    return { path: path, query: query };
  }

  function navigate(hash) {
    if (global.location.hash === hash) {
      resolve();
    } else {
      global.location.hash = hash;
    }
  }

  function buildQuery(obj) {
    var parts = [];
    for (var k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k) && obj[k] !== undefined && obj[k] !== null) {
        parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]));
      }
    }
    return parts.length ? "?" + parts.join("&") : "";
  }

  function resolve() {
    var parsed = parseHash();
    currentPath = parsed.path;
    for (var i = 0; i < routes.length; i++) {
      var m = parsed.path.match(routes[i].compiled.regex);
      if (m) {
        var params = {};
        routes[i].compiled.paramNames.forEach(function (name, idx) {
          params[name] = decodeURIComponent(m[idx + 1]);
        });
        try {
          beforeEachHooks.forEach(function (fn) { fn(parsed.path, params, parsed.query); });
          outletEl.setAttribute("tabindex", "-1");
          routes[i].handler(params, parsed.query);
          outletEl.scrollTop = 0;
          global.scrollTo(0, 0);
          outletEl.focus({ preventScroll: true });
        } catch (err) {
          console.error("[router] handler error for", parsed.path, err);
          outletEl.innerHTML = '<div class="empty-state"><h3>Something went wrong rendering this page</h3><p class="text-sm">' +
            (err && err.message ? String(err.message).replace(/</g, "&lt;") : "Unknown error") +
            '</p><button class="btn btn-primary" data-nav="#/dashboard">Go to Dashboard</button></div>';
        }
        return;
      }
    }
    try {
      notFoundHandler(outletEl);
    } catch (e) { console.error(e); }
  }

  function beforeEach(fn) { beforeEachHooks.push(fn); }

  function init(el) {
    outletEl = el;
    global.addEventListener("hashchange", resolve);
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest && e.target.closest("[data-nav]");
      if (trigger) {
        e.preventDefault();
        navigate(trigger.getAttribute("data-nav"));
      }
    });
    resolve();
  }

  global.IFLRouter = {
    register: register,
    navigate: navigate,
    init: init,
    outlet: outlet,
    buildQuery: buildQuery,
    beforeEach: beforeEach,
    current: function () { return currentPath; }
  };
})(window);
