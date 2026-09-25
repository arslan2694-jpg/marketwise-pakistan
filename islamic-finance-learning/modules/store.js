/* User-state store. Everything the student does is kept locally in localStorage under one key.
   Falls back to in-memory storage (with a warning) if localStorage is unavailable.
   Nothing here is ever sent over the network. */
(function () {
  var IFL = window.IFL;
  var KEY = 'ifl.v1';
  var VERSION = 1;

  function defaults() {
    return {
      version: VERSION,
      created: Date.now(),
      settings: { theme: 'system', level: 'mba', fontScale: 1, reduceMotion: false, dailyGoal: 30, name: '', examDate: '' },
      topics: {},          // topicId -> {visited, completed, time, views}
      chapters: {},        // n -> {visited}
      answers: {},         // questionId -> {n, correct, last, lastCorrect, topic}
      attempts: [],        // quiz attempts {id, ts, mode, label, score, total, chapter, items:[{q, ok}]}
      cards: {},           // flashcardId -> {reps, ease, interval, due, lapses, last, grade}
      reviews: [],         // {ts, card, grade}
      notes: [],           // {id, target:{type,id,label,route}, text, created, updated}
      bookmarks: [],       // {type, id, label, route, ts}
      activity: [],        // {ts, type, label, route}
      days: {},            // yyyy-mm-dd -> seconds studied
      timerSessions: [],   // {ts, minutes, kind}
      guided: {},          // planId -> {seg, item, remaining, updated, finished}
      exam: {},            // examItemId -> {ts, text, self}
      achievements: {},    // id -> ts
      last: {}             // {route, topic, chapter}
    };
  }

  var mem = null, persistent = true, listeners = [], state;

  function readRaw() {
    try { return localStorage.getItem(KEY); }
    catch (e) { persistent = false; return mem; }
  }
  function writeRaw(s) {
    try { localStorage.setItem(KEY, s); return true; }
    catch (e) {
      persistent = false; mem = s;
      if (!writeRaw.warned) { writeRaw.warned = true; IFL.u && IFL.u.toast('Saving is unavailable in this browser mode — progress will last only for this session.', 5000); }
      return false;
    }
  }
  function merge(base, saved) {
    Object.keys(saved || {}).forEach(function (k) {
      if (saved[k] && typeof saved[k] === 'object' && !Array.isArray(saved[k]) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) merge(base[k], saved[k]);
      else if (saved[k] !== undefined) base[k] = saved[k];
    });
    return base;
  }
  function load() {
    var raw = readRaw();
    if (!raw) return defaults();
    try {
      var s = JSON.parse(raw);
      if (!s || typeof s !== 'object') throw new Error('bad');
      return migrate(merge(defaults(), s));
    } catch (e) {
      console.warn('Stored study data was unreadable; starting fresh (a backup copy was kept).', e);
      try { localStorage.setItem(KEY + '.corrupt.' + Date.now(), raw); } catch (e2) { /* ignore */ }
      return defaults();
    }
  }
  function migrate(s) { s.version = VERSION; return s; }

  var saveTimer = null;
  function save(immediate) {
    clearTimeout(saveTimer);
    var run = function () { writeRaw(JSON.stringify(state)); };
    if (immediate) run(); else saveTimer = setTimeout(run, 150);
  }
  function emit(what) { listeners.forEach(function (fn) { try { fn(what); } catch (e) { console.error(e); } }); }

  state = load();
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
      return JSON.stringify({ app: 'islamic-finance-learning', exported: new Date().toISOString(), data: state }, null, 2);
    },
    importJSON: function (text) {
      var obj = JSON.parse(text);
      var data = obj && obj.data ? obj.data : obj;
      if (!data || typeof data !== 'object' || !data.settings || !('topics' in data)) throw new Error('This file does not look like an export from this app.');
      var next = migrate(merge(defaults(), data));
      ['attempts', 'reviews', 'notes', 'bookmarks', 'activity', 'timerSessions'].forEach(function (k) { if (!Array.isArray(next[k])) next[k] = []; });
      state = next; save(true); emit('import');
    },
    reset: function () {
      var keepSettings = state.settings;
      state = defaults(); state.settings = keepSettings; save(true); emit('reset');
    }
  };
})();
