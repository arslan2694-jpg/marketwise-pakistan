/* Persistence layer: single localStorage record, versioned, with safe
 * defaults, sanitized import, and a tiny pub/sub so UI can react to changes.
 * No external services are ever contacted — all study data stays local. */
(function (global) {
  "use strict";

  var STORAGE_KEY = "ifl_v1";
  var listeners = [];

  function defaultState() {
    return {
      version: 1,
      createdAt: Date.now(),
      settings: {
        theme: "system",          // "light" | "dark" | "system"
        explanationLevel: "beginner", // "beginner" | "mba" | "exam"
        reducedMotion: false
      },
      progress: {
        topicsCompleted: {},      // { "ch9-t1": timestamp }
        chapterOpened: {},        // { "9": timestamp }
        chapterCompleted: {},     // { "9": timestamp } (all topics done + chapter quiz passed once)
        quizAttempts: [],         // [{ id, chapter, scorePct, total, correct, ts, missed: [qid,...] }]
        flashcardReviews: {},     // { cardId: { box, dueAt, reps, lapses, lastRating, lastReviewed } }
        flashcardsReviewedCount: 0,
        studySeconds: 0,
        sessionsCompleted: 0,
        lastStudyDate: null,      // "YYYY-MM-DD"
        streakDays: 0,
        bestStreakDays: 0,
        questionHistory: {},      // { qid: { attempts, correct, lastCorrect, lastTs } }
        visitedChapters: {},      // { "9": true }
        crashCourseProgress: {},  // { "45min": { stepIndex, completedAt } }
        caseStudiesCompleted: {}, // { caseId: timestamp }
        decisionToolUses: 0
      },
      notes: [],       // [{ id, scope: "chapter"|"section"|"concept"|"flashcard"|"question", refId, text, createdAt, updatedAt }]
      bookmarks: [],   // [{ id, type: "topic"|"definition"|"concept"|"question"|"comparison"|"diagram"|"glossary", refId, label, createdAt }]
      achievements: {} // { achievementId: timestamp }
    };
  }

  function deepMerge(base, incoming) {
    if (Array.isArray(base)) return Array.isArray(incoming) ? incoming : base;
    if (base && typeof base === "object") {
      var out = {};
      for (var k in base) {
        if (!Object.prototype.hasOwnProperty.call(base, k)) continue;
        if (k === "__proto__" || k === "constructor" || k === "prototype") continue;
        if (incoming && Object.prototype.hasOwnProperty.call(incoming, k)) {
          out[k] = deepMerge(base[k], incoming[k]);
        } else {
          out[k] = base[k];
        }
      }
      return out;
    }
    return (incoming === undefined) ? base : incoming;
  }

  function sanitizeForStorage(candidate) {
    // Rebuild field-by-field against the default shape; never trust raw
    // structure from localStorage or an imported file.
    var safe = deepMerge(defaultState(), candidate || {});
    // Clamp / bound collections so corrupted or malicious import data can't
    // bloat storage or break rendering.
    if (Array.isArray(safe.notes)) safe.notes = safe.notes.slice(0, 3000).map(function (n) {
      return {
        id: String(n && n.id || ("note-" + Math.random().toString(36).slice(2))),
        scope: String(n && n.scope || "chapter").slice(0, 30),
        refId: String(n && n.refId || "").slice(0, 100),
        text: String(n && n.text || "").slice(0, 20000),
        createdAt: Number(n && n.createdAt) || Date.now(),
        updatedAt: Number(n && n.updatedAt) || Date.now()
      };
    });
    if (Array.isArray(safe.bookmarks)) safe.bookmarks = safe.bookmarks.slice(0, 3000).map(function (b) {
      return {
        id: String(b && b.id || ("bm-" + Math.random().toString(36).slice(2))),
        type: String(b && b.type || "topic").slice(0, 30),
        refId: String(b && b.refId || "").slice(0, 100),
        label: String(b && b.label || "").slice(0, 300),
        createdAt: Number(b && b.createdAt) || Date.now()
      };
    });
    if (Array.isArray(safe.progress.quizAttempts)) {
      safe.progress.quizAttempts = safe.progress.quizAttempts.slice(-2000);
    }
    return safe;
  }

  var state = load();

  function load() {
    try {
      var raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      return sanitizeForStorage(parsed);
    } catch (e) {
      console.warn("[store] failed to load, using defaults:", e);
      return defaultState();
    }
  }

  function persist() {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("[store] failed to persist (storage full or unavailable):", e);
    }
    listeners.forEach(function (fn) {
      try { fn(state); } catch (e) { console.error(e); }
    });
  }

  function get() { return state; }

  function update(mutator) {
    try {
      mutator(state);
    } catch (e) {
      console.error("[store] mutator threw, state left unchanged for this call:", e);
      return state;
    }
    persist();
    return state;
  }

  function subscribe(fn) {
    listeners.push(fn);
    return function unsubscribe() {
      listeners = listeners.filter(function (l) { return l !== fn; });
    };
  }

  function resetAll() {
    state = defaultState();
    persist();
  }

  function exportJSON() {
    return JSON.stringify(state, null, 2);
  }

  function importJSON(jsonText) {
    if (typeof jsonText !== "string" || jsonText.length > 8 * 1024 * 1024) {
      throw new Error("Import file is missing or exceeds the 8MB size limit.");
    }
    var parsed = JSON.parse(jsonText);
    state = sanitizeForStorage(parsed);
    persist();
  }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function touchStreak() {
    var today = todayStr();
    update(function (s) {
      if (s.progress.lastStudyDate === today) return;
      var yesterday = new Date(Date.now() - 86400000);
      var yStr = yesterday.getFullYear() + "-" + String(yesterday.getMonth() + 1).padStart(2, "0") + "-" + String(yesterday.getDate()).padStart(2, "0");
      if (s.progress.lastStudyDate === yStr) {
        s.progress.streakDays += 1;
      } else {
        s.progress.streakDays = 1;
      }
      s.progress.lastStudyDate = today;
      if (s.progress.streakDays > s.progress.bestStreakDays) s.progress.bestStreakDays = s.progress.streakDays;
    });
  }

  global.IFLStore = {
    get: get,
    update: update,
    subscribe: subscribe,
    resetAll: resetAll,
    exportJSON: exportJSON,
    importJSON: importJSON,
    touchStreak: touchStreak,
    todayStr: todayStr
  };
})(window);
