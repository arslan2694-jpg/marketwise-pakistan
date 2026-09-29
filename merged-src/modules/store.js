/* User-state store — ONE versioned record (APP_STATE_VERSION 3) under localStorage "ifl.v3".
   Legacy records from the two applications this platform combines ("ifl.v1" and "ifl_v1") are
   converted on first run by modules/migrate.js; they are left in place, never overwritten.
   Falls back to in-memory storage (with a warning) if localStorage is unavailable.
   Nothing here is ever sent over the network. */
(function () {
  var IFL = window.IFL;
  var M = IFL.migrate;
  var KEY = 'ifl.v3', LEGACY_A = 'ifl.v1', LEGACY_B = 'ifl_v1';
  var APP_STATE_VERSION = M.VERSION;
  IFL.APP_STATE_VERSION = APP_STATE_VERSION;

  var mem = null, persistent = true, listeners = [], state;

  function readKey(k) {
    try { return localStorage.getItem(k); }
    catch (e) { persistent = false; return k === KEY ? mem : null; }
  }
  function writeRaw(s) {
    try { localStorage.setItem(KEY, s); return true; }
    catch (e) {
      persistent = false; mem = s;
      if (!writeRaw.warned) { writeRaw.warned = true; IFL.u && IFL.u.toast('Saving is unavailable in this browser mode — progress will last only for this session.', 5000); }
      return false;
    }
  }
  function parse(raw) { try { var o = JSON.parse(raw); return o && typeof o === 'object' ? o : null; } catch (e) { return null; } }

  function load() {
    var raw = readKey(KEY);
    if (raw) {
      var s = parse(raw);
      if (s) return M.migrateStateV3ToLatest(s);
      console.warn('Stored study data was unreadable; a backup copy was kept.');
      try { localStorage.setItem(KEY + '.corrupt.' + Date.now(), raw); } catch (e2) { /* ignore */ }
    }
    /* first run of the unified app: bring over anything the earlier applications stored */
    var out = null, a = parse(readKey(LEGACY_A)), b = parse(readKey(LEGACY_B));
    try {
      if (a) out = M.migrateF1StateToV3(a);
      if (b) { var sb = M.migrateF2StateToV3(b, IFL.data); out = out ? M.mergeStates(out, sb) : sb; }
    } catch (e) { console.warn('Legacy study data could not be converted; starting fresh.', e); out = null; }
    return out || M.defaults();
  }

  var saveTimer = null;
  function save(immediate) {
    clearTimeout(saveTimer);
    var run = function () { writeRaw(JSON.stringify(state)); };
    if (immediate) run(); else saveTimer = setTimeout(run, 150);
  }
  function emit(what) { listeners.forEach(function (fn) { try { fn(what); } catch (e) { console.error(e); } }); }

  state = load();
  var imported = state.legacy && state.legacy.imported;
  IFL.legacyImported = imported && (imported.f1 || imported.f2) ? imported : null;
  save(true);
  window.addEventListener('beforeunload', function () { save(true); });
  window.addEventListener('pagehide', function () { save(true); });

  IFL.store = {
    get state() { return state; },
    persistent: function () { return persistent; },
    /* update(fn) mutates state inside fn, then saves and notifies. */
    update: function (fn, what) { fn(state); save(); emit(what || 'change'); },
    on: function (fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (f) { return f !== fn; }); }; },
    flush: function () { save(true); },
    exportJSON: function () {
      save(true);
      return JSON.stringify({ app: 'islamic-finance-mba-learning-system', version: APP_STATE_VERSION, exported: new Date().toISOString(), data: state }, null, 2);
    },
    /* Accepts an export from this app, or an export/raw record from either earlier application. mode: 'replace' | 'merge'. */
    importJSON: function (text, mode) {
      var obj = JSON.parse(text);
      var next = M.toV3(obj, IFL.data);
      state = mode === 'merge' ? M.mergeStates(state, next) : next;
      save(true); emit('import');
    },
    reset: function () {
      var keepSettings = state.settings;
      state = M.defaults(); state.settings = keepSettings; save(true); emit('reset');
    }
  };
})();
