/* Western Philosophy Study Companion — standalone single-file build.
   Vanilla JS SPA: hash-based routing, no framework, no network requests.
   DATA is injected as window.__WP_DATA__ by the build script. */
(function () {
  "use strict";

  var DATA = window.__WP_DATA__ || {};
  var structure = DATA.structure || { books: [] };
  var chapters = DATA.chapters || {};       // id -> chapter content
  var philosophers = DATA.philosophers || {}; // slug -> profile
  var concepts = DATA.concepts || {};
  var schools = DATA.schools || {};
  var glossary = DATA.glossary || [];
  var timeline = DATA.timeline || [];
  var graph = DATA.graph || [];

  // ---------------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------------
  function esc(s) {
    if (s === null || s === undefined) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function on(root, event, selector, handler) {
    root.addEventListener(event, function (e) {
      var el = e.target.closest(selector);
      if (el && root.contains(el)) handler(e, el);
    });
  }
  function flatChapters() {
    var out = [];
    (structure.books || []).forEach(function (book) {
      (book.parts || []).forEach(function (part) {
        (part.chapters || []).forEach(function (ch) {
          out.push({
            id: ch.id, roman: ch.roman, title: ch.title,
            start_page: ch.start_page, end_page: ch.end_page,
            book_id: book.id, book_title: book.title,
            part_id: part.id, part_title: part.title,
          });
        });
      });
    });
    out.sort(function (a, b) { return a.start_page - b.start_page; });
    return out;
  }
  var FLAT_CHAPTERS = flatChapters();
  function chapterRef(id) {
    for (var i = 0; i < FLAT_CHAPTERS.length; i++) if (FLAT_CHAPTERS[i].id === id) return FLAT_CHAPTERS[i];
    return null;
  }

  // ---------------------------------------------------------------------
  // Local-first progress store (mirrors the React app's lib/progress.ts)
  // ---------------------------------------------------------------------
  var STORAGE_KEY = "wp-progress-v1";
  var BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 35];

  function emptyProgress() {
    return {
      completedChapters: {}, completedLessons: {}, bookmarks: {}, notes: [],
      quizAttempts: [], flashcards: {}, readingSeconds: 0, streakDays: [],
      lastVisitedChapter: null, confidence: {},
    };
  }
  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyProgress();
      var parsed = JSON.parse(raw);
      var base = emptyProgress();
      for (var k in parsed) base[k] = parsed[k];
      return base;
    } catch (e) { return emptyProgress(); }
  }
  function saveProgress(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  function recordVisit(chapterId) {
    var s = loadProgress();
    s.lastVisitedChapter = chapterId;
    var today = new Date().toISOString().slice(0, 10);
    if (s.streakDays.indexOf(today) === -1) s.streakDays.push(today);
    saveProgress(s);
  }
  function markChapterComplete(chapterId, complete) {
    var s = loadProgress();
    s.completedChapters[chapterId] = complete;
    saveProgress(s);
    return s;
  }
  function toggleBookmark(chapterId) {
    var s = loadProgress();
    s.bookmarks[chapterId] = !s.bookmarks[chapterId];
    saveProgress(s);
    return s;
  }
  function addNote(chapterId, text) {
    var s = loadProgress();
    s.notes.push({ id: Date.now() + "-" + Math.random().toString(36).slice(2, 8), chapterId: chapterId, text: text, createdAt: Date.now() });
    saveProgress(s);
    return s;
  }
  function deleteNote(noteId) {
    var s = loadProgress();
    s.notes = s.notes.filter(function (n) { return n.id !== noteId; });
    saveProgress(s);
    return s;
  }
  function recordQuizAttempt(attempt) {
    var s = loadProgress();
    s.quizAttempts.push(attempt);
    saveProgress(s);
    return s;
  }
  function reviewFlashcard(cardKey, remembered) {
    var s = loadProgress();
    var prev = s.flashcards[cardKey] || { box: 0, dueAt: 0, lastReviewed: 0 };
    var nextBox = remembered ? Math.min(prev.box + 1, BOX_INTERVAL_DAYS.length - 1) : 0;
    var days = BOX_INTERVAL_DAYS[nextBox];
    s.flashcards[cardKey] = { box: nextBox, dueAt: Date.now() + days * 86400000, lastReviewed: Date.now() };
    saveProgress(s);
    return s;
  }
  function exportProgressJson() { return JSON.stringify(loadProgress(), null, 2); }
  function importProgressJson(json) {
    var parsed = JSON.parse(json);
    var base = emptyProgress();
    for (var k in parsed) base[k] = parsed[k];
    saveProgress(base);
  }
  function resetProgressStore() { saveProgress(emptyProgress()); }

  // ---------------------------------------------------------------------
  // Icons (subset of paths used in the React NavIcon component)
  // ---------------------------------------------------------------------
  var ICON_PATHS = {
    dashboard: "M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6ZM13 9h8V3h-8v6Z",
    book: "M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z M4 19.5V21.5 M4 4.5v13",
    timeline: "M3 12h18M3 12l4-4M3 12l4 4M21 6h-6M21 18h-6",
    graph: "M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 3a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.5 6.5l7 2M9 17l7-4",
    person: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0",
    concept: "M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
    school: "M12 3 2 8l10 5 10-5-10-5ZM6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5",
    glossary: "M5 4h11a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1-1-2Z M5 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2",
    cards: "M4 7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z M8 3.5 19 6l-1 10.5",
    quiz: "M9 9a3 3 0 1 1 4 2.8c-.7.3-1 .9-1 1.7v.5 M12 17.5h.01 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    essay: "M4 4h13l3 3v13H4V4Z M17 4v3h3 M8 10h8M8 14h8M8 18h5",
    notes: "M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z",
    progress: "M4 19V9M10 19V5M16 19v-7M22 19H2",
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35",
    sun: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z",
    moon: "M12 3v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4|circle:12,12,4",
  };
  function icon(name, size) {
    size = size || 16;
    var spec = ICON_PATHS[name] || ICON_PATHS.concept;
    var extra = "";
    var path = spec;
    if (spec.indexOf("|circle:") !== -1) {
      var parts = spec.split("|circle:");
      path = parts[0];
      var c = parts[1].split(",");
      extra = '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '"/>';
    }
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + extra + '<path d="' + path + '"/></svg>';
  }

  var NAV_GROUPS = [
    { title: "Study", items: [
      { label: "Dashboard", href: "#/dashboard", icon: "dashboard" },
      { label: "Library", href: "#/library", icon: "book" },
      { label: "Timeline", href: "#/timeline", icon: "timeline" },
      { label: "Knowledge Graph", href: "#/graph", icon: "graph" },
    ]},
    { title: "Reference", items: [
      { label: "Philosophers", href: "#/philosophers", icon: "person" },
      { label: "Concepts", href: "#/concepts", icon: "concept" },
      { label: "Schools", href: "#/schools", icon: "school" },
      { label: "Glossary", href: "#/glossary", icon: "glossary" },
    ]},
    { title: "Practice", items: [
      { label: "Flashcards", href: "#/flashcards", icon: "cards" },
      { label: "Quiz", href: "#/quiz", icon: "quiz" },
      { label: "Essay Practice", href: "#/essays", icon: "essay" },
    ]},
    { title: "You", items: [
      { label: "Notes & Bookmarks", href: "#/notes", icon: "notes" },
      { label: "Progress", href: "#/progress", icon: "progress" },
    ]},
  ];

  // ---------------------------------------------------------------------
  // Theme
  // ---------------------------------------------------------------------
  function getTheme() {
    var attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("wp-theme", t); } catch (e) {}
  }

  // ---------------------------------------------------------------------
  // Shell (sidebar + topbar) for all "/app" style routes
  // ---------------------------------------------------------------------
  function sidebarHtml(activeHref) {
    var groups = NAV_GROUPS.map(function (g) {
      var items = g.items.map(function (item) {
        var active = activeHref === item.href || (item.href !== "#/dashboard" && activeHref.indexOf(item.href) === 0);
        return '<a class="nav-item' + (active ? " active" : "") + '" href="' + item.href + '">' + icon(item.icon) + item.label + "</a>";
      }).join("");
      return '<div class="nav-group-title">' + esc(g.title) + '</div>' + items;
    }).join("");
    return (
      '<div class="sidebar-header"><div class="brand-badge">Φ</div><div><div class="sidebar-title">Western Philosophy</div><div class="sidebar-sub">Study Companion</div></div></div>' +
      '<nav class="sidebar-nav">' + groups + '</nav>' +
      '<div class="sidebar-footer"><a href="#/" class="muted-2">← Back to landing page</a></div>'
    );
  }

  function topbarHtml(crumbLabel) {
    var t = getTheme();
    return (
      '<button class="icon-btn mobile-menu-btn" data-action="toggle-mobile-nav" aria-label="Open navigation">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
      '</button>' +
      '<div class="topbar-crumb"><a href="#/dashboard">Study</a>' + (crumbLabel ? ' <span>/</span> <b>' + esc(crumbLabel) + '</b>' : '') + '</div>' +
      '<form class="search-box" data-action="topbar-search-form">' + icon("search", 14) +
        '<input type="text" name="q" placeholder="Search the course…" autocomplete="off" />' +
      '</form>' +
      '<button class="icon-btn" data-action="toggle-theme" title="Toggle theme">' + icon(t === "light" ? "sun" : "moon") + '</button>'
    );
  }

  function shell(route, crumbLabel, contentHtml) {
    return (
      '<div class="app-shell">' +
        '<aside class="sidebar" id="sidebar">' + sidebarHtml(route) + '</aside>' +
        '<div class="main">' +
          '<div class="topbar">' + topbarHtml(crumbLabel) + '</div>' +
          contentHtml +
        '</div>' +
      '</div>'
    );
  }

  // ---------------------------------------------------------------------
  // Landing page
  // ---------------------------------------------------------------------
  function renderLanding() {
    var totalChapters = FLAT_CHAPTERS.length;
    var totalParts = (structure.books || []).reduce(function (s, b) { return s + (b.parts || []).length; }, 0);
    var books = (structure.books || []).map(function (book) {
      var parts = (book.parts || []).map(function (p) {
        return '<div class="book-part-row"><span>' + esc(p.title) + '</span><span class="count">' + p.chapters.length + ' ch.</span></div>';
      }).join("");
      return (
        '<div class="book-card"><div class="book-eyebrow">Book ' + book.order + '</div><h3>' + esc(book.title) + '</h3>' + parts + '</div>'
      );
    }).join("");

    return (
      '<div>' +
        '<header class="landing-header"><div class="landing-header-inner">' +
          '<div class="brand-mark"><div class="brand-badge">Φ</div>Western Philosophy Study Companion</div>' +
          '<a class="btn" href="#/dashboard">Open the app →</a>' +
        '</div></header>' +
        '<section class="hero">' +
          '<div class="eyebrow">Based on Bertrand Russell’s 1945 masterwork</div>' +
          '<h1 class="serif">Master the History of Western Philosophy</h1>' +
          '<p>Study all ' + totalChapters + ' chapters of Russell’s <em>A History of Western Philosophy</em> in depth &mdash; every philosopher, argument, school and historical current &mdash; through structured lessons, an interactive timeline, a philosophy knowledge graph, spaced-repetition flashcards, and exam-style practice. Built as an original teaching companion to the book, with every claim traceable back to its page.</p>' +
          '<div class="cta-row">' +
            '<a class="btn btn-primary" href="#/library">Start Learning</a>' +
            '<a class="btn" href="#/dashboard">Continue Learning</a>' +
            '<a class="btn" href="#/philosophers">Explore Philosophers</a>' +
            '<a class="btn" href="#/timeline">Explore Timeline</a>' +
            '<a class="btn" href="#/quiz">Test Yourself</a>' +
            '<a class="btn" href="#/graph">Browse the Knowledge Graph</a>' +
          '</div>' +
        '</section>' +
        '<section class="books-section">' +
          '<div class="books-title serif">The course follows Russell’s own structure</div>' +
          '<div class="books-sub">Three books, ' + totalParts + ' parts, ' + totalChapters + ' chapters &mdash; nothing collapsed, nothing skipped.</div>' +
          '<div class="books-grid">' + books + '</div>' +
        '</section>' +
        '<footer class="landing-footer">An original study companion built for Russell’s <em>A History of Western Philosophy</em> (1945). Educational summaries and commentary only &mdash; not a substitute for the book.</footer>' +
      '</div>'
    );
  }

  // ---------------------------------------------------------------------
  // Dashboard
  // ---------------------------------------------------------------------
  function renderDashboard() {
    var p = loadProgress();
    var completedCount = Object.keys(p.completedChapters).filter(function (k) { return p.completedChapters[k]; }).length;
    var total = FLAT_CHAPTERS.length;
    var pct = total ? Math.round((completedCount / total) * 100) : 0;
    var next = null;
    for (var i = 0; i < FLAT_CHAPTERS.length; i++) { if (!p.completedChapters[FLAT_CHAPTERS[i].id]) { next = FLAT_CHAPTERS[i]; break; } }
    if (!next) next = FLAT_CHAPTERS[0];
    var last = p.lastVisitedChapter ? chapterRef(p.lastVisitedChapter) : null;

    var missed = {};
    p.quizAttempts.forEach(function (a) { (a.missedConcepts || []).forEach(function (c) { missed[c] = (missed[c] || 0) + 1; }); });
    var weak = Object.keys(missed).map(function (k) { return [k, missed[k]]; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 6);

    var recent = p.quizAttempts.slice().reverse().slice(0, 5);

    var html = '<div class="page page-wide">';
    html += '<h1 class="serif">Dashboard</h1><p class="page-sub">Your progress is stored locally in this browser &mdash; nothing leaves your device.</p>';
    html += '<div class="grid-4 mb-4">' +
      statCard("Course completion", pct + "%", completedCount + "/" + total + " chapters") +
      statCard("Study streak", String(p.streakDays.length), "days active") +
      statCard("Quizzes taken", String(p.quizAttempts.length), "attempts logged") +
      statCard("Notes", String(p.notes.length), "saved") +
      '</div>';
    html += '<div class="grid-2 mb-4">';
    html += '<div class="card"><h3 class="serif" style="margin:0 0 10px;font-size:16px;">Recommended next lesson</h3>';
    if (next) {
      html += '<a class="card" style="display:block;border-color:rgba(107,43,43,.3);background:var(--brand-soft);" href="#/library/' + esc(next.id) + '">' +
        '<div class="badge badge-accent" style="text-transform:none;">' + esc(next.book_title) + ' · ' + esc(next.part_title) + '</div>' +
        '<div class="serif" style="font-size:15px;margin-top:6px;">Ch. ' + esc(next.roman) + ' &mdash; ' + esc(next.title) + '</div></a>';
    } else { html += '<p class="muted-2 small">You’ve completed every chapter. Consider a review pass.</p>'; }
    if (last) html += '<p class="tiny muted-2 mt-3">Last visited: <a href="#/library/' + esc(last.id) + '">Ch. ' + esc(last.roman) + '. ' + esc(last.title) + '</a></p>';
    html += '</div>';
    html += '<div class="card"><h3 class="serif" style="margin:0 0 10px;font-size:16px;">Weak areas</h3>';
    if (weak.length === 0) html += '<p class="muted-2 small">Take a few quizzes and this will fill in with concepts to review.</p>';
    else html += weak.map(function (w) { return '<div class="list-row" style="border:none;padding:4px 0;"><span class="muted">' + esc(w[0]) + '</span><span class="badge" style="background:var(--bad-soft);color:var(--bad);">missed ×' + w[1] + '</span></div>'; }).join("");
    html += '</div></div>';
    html += '<div class="card"><h3 class="serif" style="margin:0 0 10px;font-size:16px;">Recent activity</h3>';
    if (recent.length === 0) html += '<p class="muted-2 small">No quiz attempts yet.</p>';
    else html += recent.map(function (a) { return '<div class="list-row"><span class="muted">' + esc(a.chapterId) + '</span><span class="muted-2 tiny">' + a.correct + '/' + a.total + ' · ' + new Date(a.timestamp).toLocaleDateString() + '</span></div>'; }).join("");
    html += '</div></div>';
    return shell("#/dashboard", "Dashboard", html);
  }
  function statCard(label, value, sub) {
    return '<div class="stat-card"><div class="stat-label">' + esc(label) + '</div><div class="stat-value serif">' + esc(value) + '</div><div class="stat-sub">' + esc(sub) + '</div></div>';
  }

  // ---------------------------------------------------------------------
  // Library
  // ---------------------------------------------------------------------
  function renderLibrary() {
    var html = '<div class="page page-wide">';
    html += '<h1 class="serif">Library</h1><p class="page-sub">The full course, in Russell’s own structure &mdash; ' + (structure.books || []).length + ' books, every part, every chapter.</p>';
    (structure.books || []).forEach(function (book) {
      html += '<div class="section" style="margin-top:32px;"><div class="flex-row mb-3" style="border-bottom:1px solid var(--line);padding-bottom:8px;">' +
        '<span class="badge badge-brand" style="text-transform:none;">Book ' + book.order + '</span><h2 class="serif" style="font-size:18px;margin:0;">' + esc(book.title) + '</h2></div>';
      (book.parts || []).forEach(function (part) {
        html += '<h3 style="margin:14px 0 8px;">Part ' + part.order + ' · ' + esc(part.title) + '</h3><div class="list-card mb-3">';
        part.chapters.forEach(function (ch) {
          var ready = !!chapters[ch.id];
          html += '<a class="list-row" href="#/library/' + esc(ch.id) + '">' +
            '<span class="flex-row" style="min-width:0;"><span class="muted-2 tiny" style="width:34px;font-family:monospace;">' + esc(ch.roman) + '</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + esc(ch.title) + '</span></span>' +
            '<span class="flex-row" style="flex-shrink:0;"><span class="tiny muted-2">pp. ' + ch.start_page + '–' + ch.end_page + '</span>' +
            (ready ? '<span class="badge badge-ok">ready</span>' : '<span class="badge badge-muted">coming soon</span>') + '</span></a>';
        });
        html += '</div>';
      });
      html += '</div>';
    });
    html += '</div>';
    return shell("#/library", "Library", html);
  }

  // ---------------------------------------------------------------------
  // Chapter reader
  // ---------------------------------------------------------------------
  var LESSONS = [
    ["context", "Lesson 1 — Context"], ["concepts", "Lesson 2 — Core Ideas"],
    ["philosophers", "Lesson 3 — Detailed Thinkers"], ["arguments", "Lesson 4 — Arguments"],
    ["connections", "Lesson 5 — Comparisons & Connections"], ["context2", "Lesson 6 — Historical & Social Connections"],
    ["russell", "Lesson 7 — Russell’s Interpretation"], ["critical", "Lesson 8 — Critical Review"],
    ["recall", "Lesson 9 — Active Recall"], ["quiz", "Lesson 10 — Quiz"],
    ["essay", "Lesson 11 — Essay & Discussion"], ["mastery", "Lesson 12 — Chapter Mastery"],
  ];

  function philosopherSlugFromName(name) {
    // best-effort: match against known philosopher slugs by normalized name
    var norm = String(name).toLowerCase().trim();
    for (var slug in philosophers) {
      if (philosophers[slug].name.toLowerCase() === norm) return slug;
    }
    return null;
  }

  function renderChapter(chapterId) {
    var ref = chapterRef(chapterId);
    if (!ref) return render404();
    var ch = chapters[chapterId];
    var idx = FLAT_CHAPTERS.indexOf(ref);
    var prev = idx > 0 ? FLAT_CHAPTERS[idx - 1] : null;
    var next = idx < FLAT_CHAPTERS.length - 1 ? FLAT_CHAPTERS[idx + 1] : null;
    recordVisit(chapterId);

    var crumbs = '<p class="crumbs"><a href="#/library">Library</a> / ' + esc(ref.book_title) + ' / ' + esc(ref.part_title) + '</p>';

    if (!ch) {
      var html = '<div class="page">' + crumbs +
        '<h1 class="serif">Ch. ' + esc(ref.roman) + ' &mdash; ' + esc(ref.title) + '</h1>' +
        '<p class="tiny muted-2">Pages ' + ref.start_page + '–' + ref.end_page + '</p>' +
        '<div class="empty-state mt-6"><p>Full structured lessons for this chapter haven’t been generated yet.</p></div></div>';
      return shell("#/library", ref.title, html);
    }

    var p = loadProgress();
    var complete = !!p.completedChapters[chapterId];
    var bookmarked = !!p.bookmarks[chapterId];

    var toc = LESSONS.map(function (l) { return '<a href="#' + l[0] + '-' + chapterId + '">' + l[1] + '</a>'; }).join("");

    var body = '<div class="page-narrow" style="padding:32px 24px 64px;flex:1;min-width:0;margin:0 auto;max-width:760px;">';
    body += crumbs;
    body += '<div class="flex-row" style="justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;">';
    body += '<div><div class="badge badge-brand" style="text-transform:none;">Chapter ' + esc(ch.roman) + '</div>' +
      '<h1 class="serif" style="font-size:28px;margin:4px 0 2px;">' + esc(ch.title) + '</h1>' +
      '<p class="tiny muted-2">Source: ' + esc(ref.book_title) + ' → ' + esc(ref.part_title) + ' → Chapter ' + esc(ch.roman) + ' → PDF pp. ' + ch.start_page + '–' + ch.end_page + '</p></div>';
    body += '<div class="flex-row">' +
      '<button class="btn btn-sm' + (bookmarked ? '' : '') + '" style="' + (bookmarked ? 'border-color:var(--brand);background:var(--brand-soft);color:var(--brand-strong);' : '') + '" data-action="toggle-bookmark" data-id="' + esc(chapterId) + '">' + (bookmarked ? '★ Bookmarked' : '☆ Bookmark') + '</button>' +
      '<button class="btn btn-sm' + (complete ? '' : ' btn-primary') + '" style="' + (complete ? 'background:var(--ok-soft);color:var(--ok);border-color:transparent;' : '') + '" data-action="toggle-complete" data-id="' + esc(chapterId) + '">' + (complete ? '✓ Completed' : 'Mark chapter complete') + '</button>' +
      '</div></div>';

    body += '<p class="prose mt-4">' + esc(ch.orientation) + '</p>';

    // Lesson 1: context
    body += '<div class="section" id="context-' + chapterId + '"><h2>' + LESSONS[0][1] + '</h2><span class="layer-label layer-context">Historical context</span>' +
      '<p class="prose mt-2">' + esc(ch.historical_background) + '</p>';
    if ((ch.philosophical_problems || []).length) {
      body += '<h3 class="mt-3">Philosophical problems this chapter addresses</h3><ul>' +
        ch.philosophical_problems.map(function (x) { return '<li class="muted" style="font-size:14.5px;">' + esc(x) + '</li>'; }).join("") + '</ul>';
    }
    body += '</div>';

    // Lesson 2: concepts
    body += '<div class="section" id="concepts-' + chapterId + '"><h2>' + LESSONS[1][1] + '</h2><span class="layer-label layer-explanation">Explanation</span><div class="mt-3">';
    (ch.core_concepts || []).forEach(function (c) {
      body += '<div class="concept-card' + (c.is_major ? ' major' : '') + '">' +
        '<h3>' + esc(c.name) + '</h3>' + (c.is_major ? '<span class="badge badge-brand major-tag">major concept</span>' : '') +
        '<p class="muted mt-2" style="font-size:14px;">' + esc(c.plain_explanation) + '</p>' +
        '<p class="tiny muted-2 mt-2"><b class="muted">Precise definition: </b>' + esc(c.precise_definition) + '</p>';
      if (c.why_it_mattered) body += '<p class="tiny muted-2 mt-2"><b class="muted">Why it mattered: </b>' + esc(c.why_it_mattered) + '</p>';
      if ((c.objections || []).length) body += '<p class="tiny muted-2 mt-2"><b class="muted">Objections: </b>' + esc(c.objections.join("; ")) + '</p>';
      if (c.influence_on_later_thinkers) body += '<p class="tiny muted-2 mt-2"><b class="muted">Later influence: </b>' + esc(c.influence_on_later_thinkers) + '</p>';
      body += '</div>';
    });
    body += '</div>';
    if ((ch.key_distinctions || []).length) {
      body += '<h3 class="mt-3">Key distinctions</h3><div>' + ch.key_distinctions.map(function (d) { return '<span class="pill">' + esc(d) + '</span>'; }).join("") + '</div>';
    }
    body += '</div>';

    // Lesson 3: philosophers
    body += '<div class="section" id="philosophers-' + chapterId + '"><h2>' + LESSONS[2][1] + '</h2>';
    if (!(ch.philosophers_discussed || []).length) body += '<p class="muted-2 small">No specific philosophers indexed for this chapter.</p>';
    else {
      body += '<div class="grid-2">';
      ch.philosophers_discussed.forEach(function (ph) {
        var slug = philosopherSlugFromName(ph.name);
        var href = slug ? '#/philosophers/' + slug : '#/philosophers';
        body += '<a class="phil-mini-card" href="' + href + '"><span class="name">' + esc(ph.name) + '</span>' +
          (ph.is_primary_subject ? ' <span class="badge badge-accent">primary subject</span>' : '') +
          '<p>' + esc(ph.role_in_chapter) + '</p></a>';
      });
      body += '</div>';
    }
    body += '</div>';

    // Lesson 4: arguments
    body += '<div class="section" id="arguments-' + chapterId + '"><h2>' + LESSONS[3][1] + '</h2>';
    if (!(ch.arguments || []).length) body += '<p class="muted-2 small">No formally reconstructed arguments in this chapter.</p>';
    else ch.arguments.forEach(function (a) {
      body += '<div class="arg-card"><h3>' + esc(a.title) + ' <span class="muted-2" style="font-family:var(--font-sans);font-size:12.5px;">&mdash; ' + esc(a.philosopher) + '</span></h3>' +
        '<ol>' + a.premises.map(function (pr) { return '<li>' + esc(pr) + '</li>'; }).join("") + '</ol>' +
        '<p class="conclusion"><b>Therefore: </b>' + esc(a.conclusion) + '</p>' +
        '<p class="tiny muted-2">' + esc(a.explanation) + '</p>' +
        ((a.objections || []).length ? '<p class="tiny muted-2 mt-2"><b class="muted">Objections: </b>' + esc(a.objections.join("; ")) + '</p>' : '') +
        '</div>';
    });
    body += '</div>';

    // Lesson 5: connections
    body += '<div class="section" id="connections-' + chapterId + '"><h2>' + LESSONS[4][1] + '</h2><div class="grid-2">' +
      '<div><h3>← Earlier philosophers</h3><p class="muted" style="font-size:14px;">' + esc(ch.connections_to_earlier_philosophers || "Not explicitly discussed in this chapter.") + '</p></div>' +
      '<div><h3>Later philosophers →</h3><p class="muted" style="font-size:14px;">' + esc(ch.connections_to_later_philosophers || "Not explicitly discussed in this chapter.") + '</p></div>' +
      '</div></div>';

    // Lesson 6: historical/social
    body += '<div class="section" id="context2-' + chapterId + '"><h2>' + LESSONS[5][1] + '</h2>' +
      '<h3>Political & social context</h3><p class="muted" style="font-size:14px;">' + esc(ch.political_social_context || "—") + '</p>';
    if (ch.religion_science_culture_context) body += '<h3 class="mt-3">Religion, science & culture</h3><p class="muted" style="font-size:14px;">' + esc(ch.religion_science_culture_context) + '</p>';
    body += '</div>';

    // Lesson 7: russell
    body += '<div class="section" id="russell-' + chapterId + '"><h2>' + LESSONS[6][1] + '</h2><span class="layer-label layer-russell">Russell’s presentation</span>' +
      '<p class="prose mt-2">' + esc(ch.russell_presentation) + '</p></div>';

    // Lesson 8: critical (optional)
    if (ch.critical_context) {
      body += '<div class="section" id="critical-' + chapterId + '"><h2>' + LESSONS[7][1] + '</h2><span class="layer-label layer-critical">Interpretive issue</span>' +
        '<p class="prose mt-2">' + esc(ch.critical_context) + '</p></div>';
    }

    // Lesson 9: active recall
    body += '<div class="section" id="recall-' + chapterId + '"><h2>' + LESSONS[8][1] + '</h2>';
    (ch.questions || []).forEach(function (q) {
      body += '<details class="qa-item"><summary>' + esc(q.prompt) + '</summary><div class="answer"><b class="muted">Answer: </b>' + esc(q.answer) + '<p class="tiny muted-2 mt-2">' + esc(q.explanation) + '</p></div></details>';
    });
    body += '</div>';

    // Lesson 10: quiz
    body += '<div class="section" id="quiz-' + chapterId + '"><h2>' + LESSONS[9][1] + '</h2>' +
      '<div data-quiz-widget data-chapter-id="' + esc(chapterId) + '"></div></div>';

    // Lesson 11: essays
    if ((ch.essay_prompts || []).length) {
      body += '<div class="section" id="essay-' + chapterId + '"><h2>' + LESSONS[10][1] + '</h2>';
      ch.essay_prompts.forEach(function (e, i) {
        var id = chapterId + "-essay-" + i;
        body += '<div class="essay-card"><span class="badge badge-accent" style="text-transform:none;">' + esc(e.task_type) + '</span>' +
          '<p class="prompt">' + esc(e.prompt) + '</p>' +
          '<textarea data-action="essay-draft-input" data-id="' + esc(id) + '" placeholder="Draft your response here…">' + esc(getEssayDraft(id)) + '</textarea>' +
          '<div class="mt-2"><b class="tiny muted">Rubric: </b>' +
          e.rubric.map(function (r, ri) { return '<div class="rubric-item"><input type="checkbox" data-essay-check="' + id + '-' + ri + '"/> ' + esc(r) + '</div>'; }).join("") +
          '</div></div>';
      });
      body += '</div>';
    }

    // Lesson 12: mastery
    body += '<div class="section" id="mastery-' + chapterId + '"><h2>' + LESSONS[11][1] + '</h2><ul>' +
      (ch.key_takeaways || []).map(function (k) { return '<li class="muted" style="font-size:14.5px;">' + esc(k) + '</li>'; }).join("") + '</ul>';
    if ((ch.flashcards || []).length) {
      body += '<h3 class="mt-4">Flashcards for this chapter</h3><div data-flashcard-widget data-scope="chapter" data-chapter-id="' + esc(chapterId) + '"></div>';
    }
    if ((ch.glossary_terms || []).length) {
      body += '<h3 class="mt-4">Glossary</h3><dl>' + ch.glossary_terms.map(function (g) {
        return '<div class="glossary-def"><dt>' + esc(g.term) + '</dt><dd>' + esc(g.beginner_explanation) + '</dd><dd class="tiny">' + esc(g.academic_explanation) + '</dd></div>';
      }).join("") + '</dl>';
    }
    body += '<h3 class="mt-4">Your notes</h3><div data-notes-widget data-chapter-id="' + esc(chapterId) + '"></div>';
    body += '</div>';

    body += '<div class="nav-prevnext">' +
      (prev ? '<a href="#/library/' + esc(prev.id) + '">← Ch. ' + esc(prev.roman) + '. ' + esc(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a href="#/library/' + esc(next.id) + '">Ch. ' + esc(next.roman) + '. ' + esc(next.title) + ' →</a>' : '<span></span>') +
      '</div>';
    body += '</div>';

    var full = '<div class="reader-layout">' + body +
      '<aside class="reader-toc"><div class="reader-toc-title">On this page</div>' + toc + '</aside></div>';

    return shell("#/library", ch.title, full);
  }

  function render404() {
    return shell("#/library", "Not found", '<div class="page"><div class="empty-state"><h2>Not found</h2><p>That page doesn’t exist.</p><a class="btn btn-primary" href="#/library">Back to Library</a></div></div>');
  }

  // ---------------------------------------------------------------------
  // Philosophers
  // ---------------------------------------------------------------------
  function renderPhilosophersList() {
    var byEra = {};
    var order = [];
    Object.keys(philosophers).sort(function (a, b) { return philosophers[a].name.localeCompare(philosophers[b].name); }).forEach(function (slug) {
      var p = philosophers[slug];
      if (!byEra[p.era]) { byEra[p.era] = []; order.push(p.era); }
      byEra[p.era].push(p);
    });
    var html = '<div class="page page-wide"><h1 class="serif">Philosophers</h1><p class="page-sub">A dedicated profile for every major philosopher discussed in the book.</p>';
    order.forEach(function (era) {
      html += '<div class="section"><h2 style="font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-3);">' + esc(era || "Other") + '</h2><div class="grid-3">';
      byEra[era].forEach(function (p) {
        html += '<a class="card" href="#/philosophers/' + esc(p.slug) + '"><div class="serif" style="font-size:15.5px;font-weight:600;">' + esc(p.name) + '</div>' +
          '<div class="tiny muted-2">' + esc(p.dates) + '</div><div class="small muted mt-2">' + esc(p.school) + '</div></a>';
      });
      html += '</div></div>';
    });
    if (order.length === 0) html += emptyState("Philosopher profiles are being built", "Profiles are consolidated from chapter content.", "#/library", "Browse the Library");
    html += '</div>';
    return shell("#/philosophers", "Philosophers", html);
  }
  function emptyState(title, body, href, cta) {
    return '<div class="empty-state"><h2>' + esc(title) + '</h2><p>' + esc(body) + '</p><a class="btn btn-primary" href="' + href + '">' + esc(cta) + '</a></div>';
  }
  function renderPhilosopher(slug) {
    var p = philosophers[slug];
    if (!p) return render404();
    var html = '<div class="page"><p class="crumbs"><a href="#/philosophers">Philosophers</a></p>' +
      '<h1 class="serif">' + esc(p.name) + '</h1><p class="page-sub">' + esc(p.dates) + ' · ' + esc(p.geography) + '</p>';
    html += '<div class="mb-4">' + (p.major_ideas || []).map(function (i) { return '<span class="pill">' + esc(i) + '</span>'; }).join("") + '</div>';
    [["Biography", p.biography], ["Central doctrines", p.central_doctrines], ["Metaphysics", p.metaphysics], ["Epistemology", p.epistemology],
     ["Ethics", p.ethics], ["Politics", p.politics], ["Philosophy of science", p.philosophy_of_science], ["Religion & theology", p.religion_theology]]
      .forEach(function (pair) { if (pair[1]) html += '<div class="field-block"><h3>' + pair[0] + '</h3><p>' + esc(pair[1]) + '</p></div>'; });

    if ((p.notable_quotations || []).length) {
      html += '<h3 class="mt-4">Notable quotations</h3>';
      p.notable_quotations.forEach(function (q) {
        html += '<blockquote style="border-left:2px solid var(--brand);padding-left:12px;font-size:14px;font-style:italic;color:var(--ink-2);">“' + esc(q.text) + '”' +
          '<footer class="tiny muted-2" style="font-style:normal;margin-top:4px;">' + esc(q.attribution) + (q.is_paraphrase ? " (paraphrase)" : "") + '</footer></blockquote>';
      });
    }
    html += '<div class="grid-2 mt-4">';
    if ((p.predecessors || []).length) html += '<div><h3>Predecessors</h3>' + p.predecessors.map(function (s) { return philosophers[s] ? '<a class="pill" href="#/philosophers/' + esc(s) + '">' + esc(philosophers[s].name) + '</a>' : ''; }).join("") + '</div>';
    if ((p.successors || []).length) html += '<div><h3>Successors</h3>' + p.successors.map(function (s) { return philosophers[s] ? '<a class="pill" href="#/philosophers/' + esc(s) + '">' + esc(philosophers[s].name) + '</a>' : ''; }).join("") + '</div>';
    html += '</div>';
    if (p.russell_view) html += '<div class="mt-4"><span class="layer-label layer-russell">Russell’s presentation</span><p class="prose mt-2">' + esc(p.russell_view) + '</p></div>';
    if (p.why_this_matters) html += '<div class="mt-3"><span class="layer-label layer-explanation">Explanation</span><p class="prose mt-2">' + esc(p.why_this_matters) + '</p></div>';
    if ((p.appears_in_chapters || []).length) {
      html += '<div class="section" style="border-top:1px solid var(--line);padding-top:16px;"><h3>Appears in these chapters</h3><ul style="list-style:none;padding:0;">' +
        p.appears_in_chapters.map(function (a) { return '<li class="mb-2"><a href="#/library/' + esc(a.chapter_id) + '" class="small">' + esc(a.chapter_id) + '</a> <span class="tiny muted-2">&mdash; ' + esc(a.role) + '</span></li>'; }).join("") + '</ul></div>';
    }
    html += '</div>';
    return shell("#/philosophers", p.name, html);
  }

  // ---------------------------------------------------------------------
  // Concepts
  // ---------------------------------------------------------------------
  function renderConceptsList() {
    var slugs = Object.keys(concepts).sort(function (a, b) { return concepts[a].name.localeCompare(concepts[b].name); });
    var html = '<div class="page page-wide"><h1 class="serif">Concepts</h1><p class="page-sub">Every major philosophical concept discussed in the book, with plain-language and precise definitions.</p>';
    if (!slugs.length) html += emptyState("The concept index is being built", "Concepts are consolidated from chapter content.", "#/library", "Browse the Library");
    else {
      html += '<div class="grid-2">' + slugs.map(function (s) {
        var c = concepts[s];
        return '<a class="card" href="#/concepts/' + esc(s) + '"><div class="serif" style="font-size:15px;font-weight:600;">' + esc(c.name) + '</div><div class="tiny muted mt-2" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + esc(c.plain_explanation) + '</div></a>';
      }).join("") + '</div>';
    }
    html += '</div>';
    return shell("#/concepts", "Concepts", html);
  }
  function renderConcept(slug) {
    var c = concepts[slug];
    if (!c) return render404();
    var html = '<div class="page"><p class="crumbs"><a href="#/concepts">Concepts</a></p><h1 class="serif">' + esc(c.name) + '</h1>';
    html += '<div class="field-block"><h3>Plain-language explanation</h3><p>' + esc(c.plain_explanation) + '</p></div>';
    html += '<div class="field-block"><h3>Precise definition</h3><p>' + esc(c.precise_definition) + '</p></div>';
    if (c.historical_origin) html += '<div class="field-block"><h3>Historical origin</h3><p>' + esc(c.historical_origin) + '</p></div>';
    if (c.why_it_mattered) html += '<div class="field-block"><h3>Why it mattered</h3><p>' + esc(c.why_it_mattered) + '</p></div>';
    if ((c.competing_positions || []).length) html += '<div class="field-block"><h3>Competing positions</h3><ul>' + c.competing_positions.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div>';
    if ((c.objections || []).length) html += '<div class="field-block"><h3>Objections</h3><ul>' + c.objections.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div>';
    if ((c.evolution || []).length) {
      html += '<div class="field-block"><h3>How this concept evolved</h3><ol style="border-left:2px solid var(--line);padding-left:14px;list-style:none;">' +
        c.evolution.map(function (e) { return '<li class="mb-2"><div style="font-weight:600;font-size:13.5px;">' + esc(e.philosopher) + '</div><div class="small muted">' + esc(e.treatment) + '</div></li>'; }).join("") + '</ol></div>';
    }
    if ((c.appears_in_chapters || []).length) {
      html += '<div class="section" style="border-top:1px solid var(--line);padding-top:16px;"><h3>Appears in</h3><ul style="list-style:none;padding:0;">' +
        c.appears_in_chapters.map(function (id) { return '<li class="mb-2"><a href="#/library/' + esc(id) + '" class="small">' + esc(id) + '</a></li>'; }).join("") + '</ul></div>';
    }
    html += '</div>';
    return shell("#/concepts", c.name, html);
  }

  // ---------------------------------------------------------------------
  // Schools
  // ---------------------------------------------------------------------
  function renderSchoolsList() {
    var slugs = Object.keys(schools).sort(function (a, b) { return schools[a].name.localeCompare(schools[b].name); });
    var html = '<div class="page page-wide"><h1 class="serif">Schools of Thought</h1><p class="page-sub">Traditions and movements that group philosophers by shared doctrine.</p>';
    if (!slugs.length) html += emptyState("School profiles are being built", "Schools are consolidated from chapter content.", "#/library", "Browse the Library");
    else html += '<div class="grid-2">' + slugs.map(function (s) {
      var sc = schools[s];
      return '<a class="card" href="#/schools/' + esc(s) + '"><div class="serif" style="font-size:15.5px;font-weight:600;">' + esc(sc.name) + '</div><div class="tiny muted-2">' + esc(sc.period) + '</div><div class="small muted mt-2">' + sc.philosophers.length + ' philosophers</div></a>';
    }).join("") + '</div>';
    html += '</div>';
    return shell("#/schools", "Schools", html);
  }
  function renderSchool(slug) {
    var s = schools[slug];
    if (!s) return render404();
    var html = '<div class="page"><p class="crumbs"><a href="#/schools">Schools</a></p><h1 class="serif">' + esc(s.name) + '</h1><p class="page-sub">' + esc(s.period) + '</p>';
    if ((s.doctrines || []).length) html += '<div class="field-block"><h3>Doctrines</h3><ul>' + s.doctrines.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join("") + '</ul></div>';
    if ((s.philosophers || []).length) {
      html += '<div class="field-block"><h3>Philosophers</h3>' + s.philosophers.map(function (p) { return philosophers[p] ? '<a class="pill" href="#/philosophers/' + esc(p) + '">' + esc(philosophers[p].name) + '</a>' : ''; }).join("") + '</div>';
    }
    if ((s.appears_in_chapters || []).length) {
      html += '<div class="section" style="border-top:1px solid var(--line);padding-top:16px;"><h3>Chapters</h3><ul style="list-style:none;padding:0;">' +
        s.appears_in_chapters.map(function (id) { return '<li class="mb-2"><a href="#/library/' + esc(id) + '" class="small">' + esc(id) + '</a></li>'; }).join("") + '</ul></div>';
    }
    html += '</div>';
    return shell("#/schools", s.name, html);
  }

  // ---------------------------------------------------------------------
  // Timeline
  // ---------------------------------------------------------------------
  var TL_CATS = ["philosophy", "politics", "religion", "science", "culture"];
  var timelineActiveCats = TL_CATS.slice();
  var timelineSelectedId = null;

  function renderTimeline() {
    var html = '<div class="page"><h1 class="serif">Timeline</h1><p class="page-sub">Philosophers, empires, wars, and intellectual transitions across the full historical span of the book.</p>';
    if (!timeline.length) html += emptyState("The timeline is being built", "Timeline events are derived from chapter content.", "#/library", "Browse the Library");
    else {
      html += '<div id="timeline-widget"></div>';
    }
    html += '</div>';
    return shell("#/timeline", "Timeline", html);
  }
  function renderTimelineWidget() {
    var el = $("#timeline-widget");
    if (!el) return;
    var filters = TL_CATS.map(function (c) {
      var active = timelineActiveCats.indexOf(c) !== -1;
      return '<button class="filter-chip' + (active ? " active-" + c : "") + '" data-action="toggle-tl-cat" data-cat="' + c + '">' + c + '</button>';
    }).join("");
    var filtered = timeline.filter(function (e) { return e.category.some(function (c) { return timelineActiveCats.indexOf(c) !== -1; }); });
    var items = filtered.map(function (e) {
      var cats = e.category.map(function (c) { return '<span class="timeline-cat cat-' + c + '">' + c + '</span>'; }).join("");
      var selected = timelineSelectedId === e.id;
      var detail = selected ? '<div class="timeline-detail">' + esc(e.description) +
        (e.related_chapters.length ? '<div class="mt-2">' + e.related_chapters.map(function (c) { return '<a class="pill" href="#/library/' + esc(c) + '">' + esc(c) + '</a>'; }).join("") + '</div>' : '') + '</div>' : '';
      return '<div class="timeline-item"><button data-action="select-timeline-event" data-id="' + esc(e.id) + '" style="background:none;border:none;text-align:left;padding:0;">' +
        '<div><span class="timeline-date">' + esc(e.date) + '</span>' + cats + '</div>' +
        '<div class="timeline-name">' + esc(e.name) + '</div></button>' + detail + '</div>';
    }).join("");
    el.innerHTML = '<div class="timeline-filters">' + filters + '</div>' + (filtered.length ? '<div class="timeline-track">' + items + '</div>' : '<p class="muted-2 small">No events match the selected filters.</p>');
  }

  // ---------------------------------------------------------------------
  // Knowledge graph
  // ---------------------------------------------------------------------
  var REL_TYPES = ["influenced", "criticized", "rejected", "developed", "anticipated", "responded_to", "borrowed_from", "opposed", "continued", "transformed", "historically_contextualized_by"];
  var graphActiveRels = REL_TYPES.slice();
  var graphSelectedNode = null;
  var graphSim = null; // { nodes, raf }

  function renderGraph() {
    var html = '<div class="page page-wide"><h1 class="serif">Philosophy Knowledge Graph</h1>' +
      '<p class="page-sub">How philosophers, schools, and concepts influenced, criticized, and responded to one another. Filter by relationship type; click a node to inspect it.</p>';
    if (!graph.length) html += emptyState("The knowledge graph is being built", "Relationships are derived from chapter content and philosopher profiles.", "#/library", "Browse the Library");
    else html += '<div id="graph-widget"></div>';
    html += '</div>';
    return shell("#/graph", "Knowledge Graph", html);
  }

  function stopGraphSim() {
    if (graphSim && graphSim.raf) cancelAnimationFrame(graphSim.raf);
    graphSim = null;
  }

  function renderGraphWidget() {
    var el = $("#graph-widget");
    if (!el) return;
    stopGraphSim();

    var filters = REL_TYPES.map(function (r) {
      var active = graphActiveRels.indexOf(r) !== -1;
      return '<button class="filter-chip" style="' + (active ? "border-color:var(--brand);background:var(--brand-soft);color:var(--brand-strong);" : "") + '" data-action="toggle-graph-rel" data-rel="' + r + '">' + r.replace(/_/g, " ") + '</button>';
    }).join("");

    var filtered = graph.filter(function (r) { return graphActiveRels.indexOf(r.relationship) !== -1; });
    var nodeIds = {};
    filtered.forEach(function (r) { nodeIds[r.from] = r.from_type; nodeIds[r.to] = r.to_type; });
    var ids = Object.keys(nodeIds);

    var W = 720, H = 460;
    var nodes = ids.map(function (id) { return { id: id, type: nodeIds[id], x: W / 2 + (Math.random() - 0.5) * 200, y: H / 2 + (Math.random() - 0.5) * 200, vx: 0, vy: 0 }; });

    var sidePanel = renderGraphSidePanel(filtered);

    el.innerHTML = '<div class="timeline-filters mb-3">' + filters + '</div>' +
      '<div class="graph-layout">' +
        '<div class="graph-canvas-wrap"><svg id="graph-svg" viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:420px;"></svg></div>' +
        '<div class="graph-side" id="graph-side">' + sidePanel + '</div>' +
      '</div>';

    var svg = $("#graph-svg");
    var ns = "http://www.w3.org/2000/svg";
    var typeColor = { philosopher: "#6b2b2b", school: "#1f3a5f", concept: "#2f6f4f" };

    function draw() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      filtered.forEach(function (r) {
        var a = nodes.filter(function (n) { return n.id === r.from; })[0];
        var b = nodes.filter(function (n) { return n.id === r.to; })[0];
        if (!a || !b) return;
        var line = document.createElementNS(ns, "line");
        line.setAttribute("x1", a.x); line.setAttribute("y1", a.y);
        line.setAttribute("x2", b.x); line.setAttribute("y2", b.y);
        line.setAttribute("stroke", "var(--line-strong)"); line.setAttribute("stroke-opacity", graphSelectedNode && (r.from !== graphSelectedNode && r.to !== graphSelectedNode) ? "0.12" : "0.55");
        svg.appendChild(line);
      });
      nodes.forEach(function (n) {
        var g = document.createElementNS(ns, "g");
        g.setAttribute("data-action", "select-graph-node");
        g.setAttribute("data-id", n.id);
        g.style.cursor = "pointer";
        var c = document.createElementNS(ns, "circle");
        c.setAttribute("cx", n.x); c.setAttribute("cy", n.y);
        c.setAttribute("r", graphSelectedNode === n.id ? 8 : 5.5);
        c.setAttribute("fill", typeColor[n.type] || "#6b2b2b");
        c.setAttribute("opacity", graphSelectedNode && graphSelectedNode !== n.id ? "0.35" : "1");
        var t = document.createElementNS(ns, "text");
        t.setAttribute("x", n.x + 8); t.setAttribute("y", n.y + 3);
        t.setAttribute("class", "graph-node-label");
        t.textContent = n.id.replace(/-/g, " ");
        g.appendChild(c); g.appendChild(t);
        svg.appendChild(g);
      });
    }

    var frame = 0;
    function tick() {
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          var distSq = Math.max(dx * dx + dy * dy, 1);
          var force = 1800 / distSq, dist = Math.sqrt(distSq);
          var fx = (dx / dist) * force, fy = (dy / dist) * force;
          nodes[i].vx += fx; nodes[i].vy += fy; nodes[j].vx -= fx; nodes[j].vy -= fy;
        }
      }
      filtered.forEach(function (r) {
        var a = nodes.filter(function (n) { return n.id === r.from; })[0];
        var b = nodes.filter(function (n) { return n.id === r.to; })[0];
        if (!a || !b) return;
        var dx = b.x - a.x, dy = b.y - a.y, dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        var force = (dist - 110) * 0.01;
        a.vx += (dx / dist) * force; a.vy += (dy / dist) * force; b.vx -= (dx / dist) * force; b.vy -= (dy / dist) * force;
      });
      nodes.forEach(function (n) {
        n.vx += (W / 2 - n.x) * 0.001; n.vy += (H / 2 - n.y) * 0.001;
        n.vx *= 0.85; n.vy *= 0.85; n.x += n.vx; n.y += n.vy;
        n.x = Math.min(Math.max(n.x, 20), W - 20); n.y = Math.min(Math.max(n.y, 20), H - 20);
      });
      draw();
      frame++;
      if (frame < 220) graphSim.raf = requestAnimationFrame(tick);
    }
    graphSim = { nodes: nodes, raf: null };
    graphSim.raf = requestAnimationFrame(tick);
  }

  function renderGraphSidePanel(filtered) {
    if (!graphSelectedNode) return '<h3>Click a node</h3><p class="tiny muted-2">Select a node to see its relationships, or use the filters above to trace a particular kind of influence across the book.</p>';
    var edges = filtered.filter(function (r) { return r.from === graphSelectedNode || r.to === graphSelectedNode; });
    var html = '<h3>' + esc(graphSelectedNode.replace(/-/g, " ")) + '</h3><ul style="list-style:none;padding:0;">';
    edges.forEach(function (e) {
      html += '<li><b>' + esc(e.from.replace(/-/g, " ")) + '</b> <span class="rel">' + esc(e.relationship.replace(/_/g, " ")) + '</span> <b>' + esc(e.to.replace(/-/g, " ")) + '</b>' +
        '<div class="tiny muted-2 mt-2">' + esc(e.explanation) + '</div>' +
        '<a href="#/library/' + esc(e.source_chapter) + '">source: ' + esc(e.source_chapter) + '</a></li>';
    });
    html += '</ul>';
    return html;
  }

  // ---------------------------------------------------------------------
  // Glossary
  // ---------------------------------------------------------------------
  var glossaryQuery = "", glossaryAcademic = false;
  function renderGlossary() {
    var html = '<div class="page"><h1 class="serif">Glossary</h1><p class="page-sub">Every technical term, with a beginner explanation and an academic one.</p>';
    if (!glossary.length) html += emptyState("The glossary is being built", "Glossary terms are collected from every chapter’s lesson content.", "#/library", "Browse the Library");
    else html += '<div id="glossary-widget"></div>';
    html += '</div>';
    return shell("#/glossary", "Glossary", html);
  }
  function renderGlossaryWidget(preserveFocus) {
    var el = $("#glossary-widget");
    if (!el) return;
    var q = glossaryQuery.trim().toLowerCase();
    var filtered = !q ? glossary : glossary.filter(function (e) {
      return e.term.toLowerCase().indexOf(q) !== -1 || e.beginner_explanation.toLowerCase().indexOf(q) !== -1 || e.academic_explanation.toLowerCase().indexOf(q) !== -1;
    });
    var list = filtered.map(function (e) {
      return '<div style="padding:12px 16px;border-top:1px solid var(--line);"><dt class="serif" style="font-weight:600;font-size:15px;">' + esc(e.term) + '</dt>' +
        '<dd style="margin:4px 0 0;font-size:13.5px;color:var(--ink-2);">' + esc(glossaryAcademic ? e.academic_explanation : e.beginner_explanation) + '</dd>' +
        (e.appears_in_chapters.length ? '<dd class="mt-2">' + e.appears_in_chapters.slice(0, 5).map(function (c) { return '<a class="pill" style="font-size:11px;padding:2px 8px;" href="#/library/' + esc(c) + '">' + esc(c) + '</a>'; }).join("") + '</dd>' : '') + '</div>';
    }).join("");
    el.innerHTML =
      '<div class="flex-row mb-3" style="flex-wrap:wrap;">' +
        '<input class="text-input" id="glossary-search" style="flex:1;min-width:200px;" placeholder="Search terms…" value="' + esc(glossaryQuery) + '" />' +
        '<label class="flex-row small"><input type="checkbox" id="glossary-academic" ' + (glossaryAcademic ? "checked" : "") + ' /> Academic explanations</label>' +
      '</div>' +
      '<dl class="list-card">' + (list || '<p class="muted-2 small" style="padding:12px;">No matches.</p>') + '</dl>';
    var input = $("#glossary-search");
    if (input && preserveFocus) { input.focus(); input.selectionStart = input.selectionEnd = input.value.length; }
  }

  // ---------------------------------------------------------------------
  // Flashcards
  // ---------------------------------------------------------------------
  function allFlashcards() {
    var out = [];
    Object.keys(chapters).forEach(function (cid) {
      var ch = chapters[cid];
      (ch.flashcards || []).forEach(function (f, i) {
        out.push({ front: f.front, back: f.back, category: f.category, key: cid + "-" + i, chapterTitle: "Ch. " + ch.roman + ". " + ch.title });
      });
    });
    return out;
  }
  var flashcardMode = "due";
  var flashcardFlipped = false;
  var flashcardIndex = 0;

  function renderFlashcards() {
    var html = '<div class="page-narrow" style="padding:32px 24px 64px;margin:0 auto;"><h1 class="serif text-center">Flashcards</h1>' +
      '<p class="page-sub text-center">Spaced repetition across the whole course. Cards you know move further out; cards you miss come back tomorrow.</p>';
    if (!allFlashcards().length) html += emptyState("No flashcards yet", "Flashcards are generated per chapter.", "#/library", "Browse the Library");
    else html += '<div id="flashcards-widget"></div>';
    html += '</div>';
    return shell("#/flashcards", "Flashcards", html);
  }
  function computeDue(cards) {
    var s = loadProgress(); var now = Date.now();
    return cards.filter(function (c) { var st = s.flashcards[c.key]; return !st || st.dueAt <= now; });
  }
  function renderFlashcardsWidget() {
    var el = $("#flashcards-widget");
    if (!el) return;
    var all = allFlashcards();
    var due = computeDue(all);
    var cards = flashcardMode === "due" ? due : all;
    flashcardIndex = flashcardIndex % Math.max(cards.length, 1);
    var card = cards[flashcardIndex];
    el.innerHTML =
      '<div class="text-center mb-4"><button class="btn btn-sm" style="' + (flashcardMode === "due" ? "background:var(--brand);color:#fff;" : "") + '" data-action="fc-mode" data-mode="due">Due today (' + due.length + ')</button> ' +
      '<button class="btn btn-sm" style="' + (flashcardMode === "all" ? "background:var(--brand);color:#fff;" : "") + '" data-action="fc-mode" data-mode="all">All cards (' + all.length + ')</button></div>' +
      renderFlashcardCard(cards, card);
  }
  function renderFlashcardCard(cards, card) {
    if (!cards.length) return '<div class="card text-center" style="background:var(--surface-2);padding:24px;">All caught up &mdash; no cards due right now. Nice work.</div>';
    var wrap = '<div class="flashcard-wrap"><div class="flashcard-meta"><span>' + cards.length + ' card' + (cards.length === 1 ? "" : "s") + ' remaining</span><span class="badge badge-muted">' + esc(card.category) + '</span></div>' +
      '<button class="flashcard" data-action="flip-flashcard"><p>' + esc(flashcardFlipped ? card.back : card.front) + '</p></button>';
    if (card.chapterTitle) wrap += '<p class="tiny muted-2 text-center mt-2">' + esc(card.chapterTitle) + '</p>';
    wrap += '<p class="flashcard-hint">' + (flashcardFlipped ? "" : "Click the card to reveal the answer") + '</p>';
    if (flashcardFlipped) wrap += '<div class="flashcard-actions"><button class="btn btn-danger" data-action="fc-review" data-key="' + esc(card.key) + '" data-remembered="0">Didn’t know it</button>' +
      '<button class="btn" style="border-color:var(--ok);color:var(--ok);" data-action="fc-review" data-key="' + esc(card.key) + '" data-remembered="1">Knew it</button></div>';
    wrap += '</div>';
    return wrap;
  }
  function getEssayDraft(id) {
    try { var d = JSON.parse(localStorage.getItem("wp-essay-drafts-v1") || "{}"); return d[id] || ""; } catch (e) { return ""; }
  }
  function saveEssayDraft(id, text) {
    try { var d = JSON.parse(localStorage.getItem("wp-essay-drafts-v1") || "{}"); d[id] = text; localStorage.setItem("wp-essay-drafts-v1", JSON.stringify(d)); } catch (e) {}
  }

  // ---------------------------------------------------------------------
  // Quiz
  // ---------------------------------------------------------------------
  var quizChapterSel = "mixed", quizDifficulty = "all", quizAnswers = {}, quizSubmitted = false, quizPool = [];

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function buildQuizPool() {
    var source;
    if (quizChapterSel === "mixed") {
      var all = [];
      Object.keys(chapters).forEach(function (cid) { chapters[cid].quiz.forEach(function (q) { all.push(q); }); });
      source = shuffle(all).slice(0, 15);
    } else {
      source = (chapters[quizChapterSel] ? chapters[quizChapterSel].quiz : []).slice();
    }
    if (quizDifficulty !== "all") source = source.filter(function (q) { return q.difficulty === quizDifficulty; });
    return source;
  }
  function renderQuiz() {
    var html = '<div class="page-narrow" style="padding:32px 24px 64px;margin:0 auto;"><h1 class="serif">Exam Mode</h1><p class="page-sub">Practice by chapter, or take a mixed quiz drawn from every chapter.</p>';
    var anyQuiz = Object.keys(chapters).some(function (c) { return (chapters[c].quiz || []).length; });
    if (!anyQuiz) html += emptyState("No quizzes yet", "Quiz questions are generated per chapter.", "#/library", "Browse the Library");
    else html += '<div id="quiz-page-widget"></div>';
    html += '</div>';
    return shell("#/quiz", "Quiz", html);
  }
  function renderQuizPageWidget() {
    var el = $("#quiz-page-widget");
    if (!el) return;
    var options = '<option value="mixed">Mixed (random 15, all chapters)</option>' +
      FLAT_CHAPTERS.filter(function (c) { return chapters[c.id]; }).map(function (c) {
        return '<option value="' + esc(c.id) + '"' + (quizChapterSel === c.id ? " selected" : "") + '>Ch. ' + esc(c.roman) + '. ' + esc(c.title) + '</option>';
      }).join("");
    var diffs = ["all", "beginner", "intermediate", "advanced", "university", "expert"];
    var diffOptions = diffs.map(function (d) { return '<option value="' + d + '"' + (quizDifficulty === d ? " selected" : "") + '>' + (d === "all" ? "All difficulties" : d) + '</option>'; }).join("");
    el.innerHTML =
      '<div class="quiz-controls">' +
        '<select class="quiz-select" id="quiz-chapter-select"><option value="mixed"' + (quizChapterSel === "mixed" ? " selected" : "") + '>Mixed (random 15, all chapters)</option>' + options.replace('<option value="mixed">Mixed (random 15, all chapters)</option>', '') + '</select>' +
        '<select class="quiz-select" id="quiz-difficulty-select">' + diffOptions + '</select>' +
      '</div><div id="quiz-runner"></div>';
    quizPool = buildQuizPool();
    quizAnswers = {}; quizSubmitted = false;
    renderQuizRunner();
  }
  function scoreQuiz() {
    var correct = 0, missed = [];
    quizPool.forEach(function (q, i) {
      var given = quizAnswers[i];
      var isMC = q.type === "multiple_choice" || q.type === "identify_philosopher" || q.type === "identify_school";
      var right = isMC ? given === String(q.correct_index) : (given || "").trim().toLowerCase() === (q.correct_answer || "").trim().toLowerCase();
      if (right) correct++; else if (q.related_concept) missed.push(q.related_concept);
    });
    return { correct: correct, missed: missed };
  }
  function renderQuizRunner() {
    var runner = $("#quiz-runner");
    if (!runner) return;
    if (!quizPool.length) { runner.innerHTML = '<p class="muted-2 small">No quiz questions available yet.</p>'; return; }
    var html = "";
    var result = quizSubmitted ? scoreQuiz() : null;
    if (quizSubmitted) html += '<div class="quiz-score">Score: ' + result.correct + ' / ' + quizPool.length + ' (' + Math.round((result.correct / quizPool.length) * 100) + '%)</div>';
    quizPool.forEach(function (q, i) {
      var isMC = q.type === "multiple_choice" || q.type === "identify_philosopher" || q.type === "identify_school";
      html += '<div class="quiz-q"><div class="quiz-meta"><span>' + esc(q.difficulty) + '</span><span>' + esc(q.type.replace(/_/g, " ")) + '</span>' + (q.source_page ? '<span>p.' + q.source_page + '</span>' : '') + '</div>';
      html += '<p style="font-size:14px;margin:0 0 10px;">' + esc(q.prompt) + '</p>';
      if (isMC && q.options) {
        q.options.forEach(function (opt, oi) {
          var chosen = quizAnswers[i] === String(oi);
          var cls = "";
          if (quizSubmitted && oi === q.correct_index) cls = "correct";
          else if (quizSubmitted && chosen && oi !== q.correct_index) cls = "wrong";
          else if (chosen) cls = "selected";
          html += '<button class="quiz-opt ' + cls + '" ' + (quizSubmitted ? "disabled" : "") + ' data-action="quiz-answer" data-i="' + i + '" data-val="' + oi + '">' + esc(opt) + '</button>';
        });
      } else {
        html += '<input class="text-input" data-action="quiz-text-answer" data-i="' + i + '" ' + (quizSubmitted ? "disabled" : "") + ' value="' + esc(quizAnswers[i] || "") + '" placeholder="Your answer…"/>';
      }
      if (quizSubmitted) {
        html += '<div class="quiz-explain"><b class="muted">Explanation: </b>' + esc(q.explanation) + (!isMC && q.correct_answer ? ' <b class="muted">Model answer:</b> ' + esc(q.correct_answer) : '') + '</div>';
      }
      html += '</div>';
    });
    html += quizSubmitted ? '<button class="btn" data-action="quiz-retake">Retake</button>' : '<button class="btn btn-primary" data-action="quiz-submit">Submit answers</button>';
    runner.innerHTML = html;
  }

  // ---------------------------------------------------------------------
  // Essays
  // ---------------------------------------------------------------------
  function renderEssays() {
    var items = [];
    Object.keys(chapters).forEach(function (cid) {
      var ch = chapters[cid];
      (ch.essay_prompts || []).forEach(function (e) { items.push({ chapterId: cid, chapterTitle: "Ch. " + ch.roman + ". " + ch.title, taskType: e.task_type, prompt: e.prompt, rubric: e.rubric }); });
    });
    var html = '<div class="page-narrow" style="padding:32px 24px 64px;margin:0 auto;"><h1 class="serif">Essay Practice</h1><p class="page-sub">Prompts drawn from the actual chapter content. Drafts save automatically in this browser; rubrics are for self-assessment.</p>';
    if (!items.length) html += emptyState("No essay prompts yet", "Essay prompts are generated per chapter.", "#/library", "Browse the Library");
    else {
      items.forEach(function (item, i) {
        var id = item.chapterId + "-" + i;
        html += '<details class="essay-card"><summary><span class="badge badge-accent" style="text-transform:none;">' + esc(item.taskType) + '</span> <span class="tiny muted-2">' + esc(item.chapterTitle) + '</span>' +
          '<p class="prompt">' + esc(item.prompt) + '</p></summary>' +
          '<textarea data-action="essay-draft-input" data-id="' + esc(id) + '" placeholder="Draft your response here…">' + esc(getEssayDraft(id)) + '</textarea>' +
          '<div class="mt-2"><b class="tiny muted">Self-assessment rubric</b>' +
          item.rubric.map(function (r) { return '<div class="rubric-item"><input type="checkbox"/> ' + esc(r) + '</div>'; }).join("") + '</div></details>';
      });
    }
    html += '</div>';
    return shell("#/essays", "Essay Practice", html);
  }

  // ---------------------------------------------------------------------
  // Notes & bookmarks
  // ---------------------------------------------------------------------
  function renderNotesPage() {
    var html = '<div class="page"><h1 class="serif">Notes & Bookmarks</h1><p class="page-sub">Everything you’ve saved while reading, stored locally in this browser.</p><div id="notes-page-widget"></div></div>';
    return shell("#/notes", "Notes & Bookmarks", html);
  }
  function renderNotesPageWidget() {
    var el = $("#notes-page-widget");
    if (!el) return;
    var p = loadProgress();
    var bookmarked = Object.keys(p.bookmarks).filter(function (k) { return p.bookmarks[k]; });
    var html = '<div class="section" style="margin-top:0;"><h2>Bookmarked chapters</h2>';
    if (!bookmarked.length) html += '<p class="muted-2 small">No bookmarks yet.</p>';
    else html += '<div class="grid-2">' + bookmarked.map(function (id) {
      var ref = chapterRef(id);
      return '<a class="card" href="#/library/' + esc(id) + '">★ ' + esc(ref ? "Ch. " + ref.roman + ". " + ref.title : id) + '</a>';
    }).join("") + '</div>';
    html += '</div><div class="section"><h2>All notes</h2>';
    if (!p.notes.length) html += '<p class="muted-2 small">No notes yet. Add some from any chapter page.</p>';
    else html += p.notes.slice().reverse().map(function (n) {
      var ref = chapterRef(n.chapterId);
      return '<div class="note-row"><div><p style="margin:0;font-size:14px;">' + esc(n.text) + '</p>' +
        '<a href="#/library/' + esc(n.chapterId) + '" class="tiny muted-2">' + esc(ref ? "Ch. " + ref.roman + ". " + ref.title : n.chapterId) + ' · ' + new Date(n.createdAt).toLocaleDateString() + '</a></div>' +
        '<button class="note-remove" data-action="delete-note" data-id="' + esc(n.id) + '">remove</button></div>';
    }).join("");
    html += '</div>';
    el.innerHTML = html;
  }

  // ---------------------------------------------------------------------
  // Progress page
  // ---------------------------------------------------------------------
  function renderProgressPage() {
    var html = '<div class="page"><h1 class="serif">Progress</h1><p class="page-sub">A closer look at how your study is going.</p><div id="progress-page-widget"></div></div>';
    return shell("#/progress", "Progress", html);
  }
  function renderProgressPageWidget() {
    var el = $("#progress-page-widget");
    if (!el) return;
    var p = loadProgress();
    var byPart = {};
    var order = [];
    FLAT_CHAPTERS.forEach(function (c) {
      if (!byPart[c.part_id]) { byPart[c.part_id] = { total: 0, done: 0, title: c.book_title + " — " + c.part_title }; order.push(c.part_id); }
      byPart[c.part_id].total++;
      if (p.completedChapters[c.id]) byPart[c.part_id].done++;
    });
    var bars = order.map(function (pid) {
      var b = byPart[pid];
      return '<div class="mb-3"><div class="flex-row" style="justify-content:space-between;font-size:12.5px;color:var(--ink-2);margin-bottom:4px;"><span>' + esc(b.title) + '</span><span>' + b.done + '/' + b.total + '</span></div>' +
        '<div class="progress-bar-track"><div class="progress-bar-fill" style="width:' + (b.done / b.total * 100) + '%;"></div></div></div>';
    }).join("");
    var avgScore = p.quizAttempts.length ? Math.round(p.quizAttempts.reduce(function (s, a) { return s + a.score; }, 0) / p.quizAttempts.length * 100) : null;
    var html = '<div class="section" style="margin-top:0;"><h2>Completion by part</h2>' + bars + '</div>';
    html += '<div class="grid-3 mt-4 mb-4">' +
      statCard("Avg. quiz score", avgScore !== null ? avgScore + "%" : "—", "") +
      statCard("Flashcards tracked", String(Object.keys(p.flashcards).length), "") +
      statCard("Active days", String(p.streakDays.length), "") + '</div>';
    html += '<div class="card"><h3 class="serif" style="font-size:16px;margin:0 0 8px;">Your data</h3>' +
      '<p class="small muted mb-3">All progress lives only in this browser’s local storage. Export it to back it up or move it to another device.</p>' +
      '<div class="flex-row" style="flex-wrap:wrap;">' +
      '<button class="btn btn-sm" data-action="export-progress">Export progress</button>' +
      '<button class="btn btn-sm" data-action="import-progress-trigger">Import progress</button>' +
      '<input type="file" id="import-progress-file" accept="application/json" class="hidden"/>' +
      '<button class="btn btn-sm btn-danger" data-action="reset-progress">Reset progress</button>' +
      '</div></div>';
    el.innerHTML = html;
  }

  // ---------------------------------------------------------------------
  // Search
  // ---------------------------------------------------------------------
  function searchIndex() {
    var docs = [];
    Object.keys(chapters).forEach(function (cid) { var ch = chapters[cid]; docs.push({ type: "chapter", id: cid, title: "Ch. " + ch.roman + ". " + ch.title, snippet: ch.orientation, href: "#/library/" + cid }); });
    Object.keys(philosophers).forEach(function (s) { var p = philosophers[s]; docs.push({ type: "philosopher", id: s, title: p.name, snippet: p.biography || p.central_doctrines, href: "#/philosophers/" + s }); });
    Object.keys(concepts).forEach(function (s) { var c = concepts[s]; docs.push({ type: "concept", id: s, title: c.name, snippet: c.plain_explanation, href: "#/concepts/" + s }); });
    Object.keys(schools).forEach(function (s) { var sc = schools[s]; docs.push({ type: "school", id: s, title: sc.name, snippet: (sc.doctrines || []).join("; "), href: "#/schools/" + s }); });
    glossary.forEach(function (g) { docs.push({ type: "glossary", id: g.slug, title: g.term, snippet: g.beginner_explanation, href: "#/glossary" }); });
    timeline.forEach(function (e) { docs.push({ type: "event", id: e.id, title: e.name, snippet: e.description, href: "#/timeline" }); });
    return docs;
  }
  var TYPE_LABEL = { chapter: "Chapter", philosopher: "Philosopher", concept: "Concept", school: "School", glossary: "Glossary", event: "Timeline" };
  var SEARCH_DOCS = null;
  var searchQuery = "";
  function renderSearch(initialQuery) {
    searchQuery = initialQuery || "";
    var html = '<div class="page-narrow" style="padding:32px 24px 64px;margin:0 auto;"><h1 class="serif mb-4">Search</h1><div id="search-widget"></div></div>';
    return shell("#/search", "Search", html);
  }
  function renderSearchWidget(preserveFocus) {
    var el = $("#search-widget");
    if (!el) return;
    if (!SEARCH_DOCS) SEARCH_DOCS = searchIndex();
    var q = searchQuery.trim().toLowerCase();
    var results = !q ? [] : SEARCH_DOCS.filter(function (d) { return d.title.toLowerCase().indexOf(q) !== -1 || d.snippet.toLowerCase().indexOf(q) !== -1; }).slice(0, 60);
    el.innerHTML =
      '<input class="text-input" id="search-input" style="font-size:15px;padding:12px 16px;" autofocus placeholder="Search chapters, philosophers, concepts, schools, glossary, timeline…" value="' + esc(searchQuery) + '"/>' +
      '<p class="tiny muted-2 mt-2 mb-3">' + (searchQuery ? results.length + " results" : "Start typing to search the whole course.") + '</p>' +
      results.map(function (r) {
        return '<a class="card mb-2" style="display:block;" href="' + r.href + '"><span class="badge badge-muted" style="text-transform:none;">' + TYPE_LABEL[r.type] + '</span> <span class="serif" style="font-weight:600;font-size:14.5px;">' + esc(r.title) + '</span>' +
          '<p class="tiny muted mt-2" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + esc(r.snippet) + '</p></a>';
      }).join("");
    var input = $("#search-input");
    if (input && preserveFocus) { input.focus(); input.selectionStart = input.selectionEnd = input.value.length; }
  }

  // ---------------------------------------------------------------------
  // Router
  // ---------------------------------------------------------------------
  function parseRoute() {
    var hash = location.hash || "#/";
    var path = hash.replace(/^#/, "");
    var parts = path.split("/").filter(Boolean);
    return parts;
  }
  function render() {
    var parts = parseRoute();
    var root = parts[0];
    var app = $("#app");
    stopGraphSim();

    if (!root) { app.innerHTML = renderLanding(); window.scrollTo(0, 0); return; }

    switch (root) {
      case "dashboard": app.innerHTML = renderDashboard(); break;
      case "library":
        if (parts[1]) app.innerHTML = renderChapter(parts.slice(1).join("/"));
        else app.innerHTML = renderLibrary();
        break;
      case "philosophers":
        if (parts[1]) app.innerHTML = renderPhilosopher(parts[1]); else app.innerHTML = renderPhilosophersList();
        break;
      case "concepts":
        if (parts[1]) app.innerHTML = renderConcept(parts[1]); else app.innerHTML = renderConceptsList();
        break;
      case "schools":
        if (parts[1]) app.innerHTML = renderSchool(parts[1]); else app.innerHTML = renderSchoolsList();
        break;
      case "timeline": app.innerHTML = renderTimeline(); break;
      case "graph": app.innerHTML = renderGraph(); break;
      case "glossary": app.innerHTML = renderGlossary(); break;
      case "flashcards": app.innerHTML = renderFlashcards(); break;
      case "quiz": app.innerHTML = renderQuiz(); break;
      case "essays": app.innerHTML = renderEssays(); break;
      case "notes": app.innerHTML = renderNotesPage(); break;
      case "progress": app.innerHTML = renderProgressPage(); break;
      case "search": app.innerHTML = renderSearch(decodeURIComponent(parts[1] || "")); break;
      default: app.innerHTML = render404();
    }
    window.scrollTo(0, 0);
    afterRender(root);
  }

  function afterRender(root) {
    // wire up widgets that need JS-driven rendering after mount
    $all("[data-quiz-widget]").forEach(function (elm) {
      var cid = elm.getAttribute("data-chapter-id");
      quizPool = (chapters[cid] && chapters[cid].quiz) || [];
      quizAnswers = {}; quizSubmitted = false;
      elm.id = "inline-quiz-" + cid;
      elm.innerHTML = '<div id="quiz-runner"></div>';
      renderQuizRunnerInto(elm, cid);
    });
    $all("[data-flashcard-widget]").forEach(function (elm) {
      var cid = elm.getAttribute("data-chapter-id");
      var cards = ((chapters[cid] && chapters[cid].flashcards) || []).map(function (f, i) { return { front: f.front, back: f.back, category: f.category, key: cid + "-" + i }; });
      flashcardFlipped = false; flashcardIndex = 0;
      elm.innerHTML = renderFlashcardCard(cards, cards[0]);
      elm.setAttribute("data-cards", JSON.stringify(cards));
    });
    $all("[data-notes-widget]").forEach(function (elm) {
      var cid = elm.getAttribute("data-chapter-id");
      renderChapterNotesInto(elm, cid);
    });
    if (root === "timeline") renderTimelineWidget();
    if (root === "graph") renderGraphWidget();
    if (root === "glossary") renderGlossaryWidget(false);
    if (root === "flashcards") renderFlashcardsWidget();
    if (root === "quiz") renderQuizPageWidget();
    if (root === "search") renderSearchWidget(false);
    if (root === "notes") renderNotesPageWidget();
    if (root === "progress") renderProgressPageWidget();
  }

  // per-chapter inline quiz needs its own pool reference distinct from the /quiz page's
  var inlineQuizState = {}; // chapterId -> { answers, submitted }
  function renderQuizRunnerInto(container, chapterId) {
    if (!inlineQuizState[chapterId]) inlineQuizState[chapterId] = { answers: {}, submitted: false };
    var state = inlineQuizState[chapterId];
    var pool = (chapters[chapterId] && chapters[chapterId].quiz) || [];
    var runner = $("#quiz-runner", container);
    if (!pool.length) { runner.innerHTML = '<p class="muted-2 small">No quiz questions available yet.</p>'; return; }
    var html = "";
    if (state.submitted) {
      var correct = 0;
      pool.forEach(function (q, i) {
        var given = state.answers[i];
        var isMC = q.type === "multiple_choice" || q.type === "identify_philosopher" || q.type === "identify_school";
        var right = isMC ? given === String(q.correct_index) : (given || "").trim().toLowerCase() === (q.correct_answer || "").trim().toLowerCase();
        if (right) correct++;
      });
      html += '<div class="quiz-score">Score: ' + correct + ' / ' + pool.length + ' (' + Math.round((correct / pool.length) * 100) + '%)</div>';
    }
    pool.forEach(function (q, i) {
      var isMC = q.type === "multiple_choice" || q.type === "identify_philosopher" || q.type === "identify_school";
      html += '<div class="quiz-q"><div class="quiz-meta"><span>' + esc(q.difficulty) + '</span><span>' + esc(q.type.replace(/_/g, " ")) + '</span>' + (q.source_page ? '<span>p.' + q.source_page + '</span>' : '') + '</div>';
      html += '<p style="font-size:14px;margin:0 0 10px;">' + esc(q.prompt) + '</p>';
      if (isMC && q.options) {
        q.options.forEach(function (opt, oi) {
          var chosen = state.answers[i] === String(oi);
          var cls = "";
          if (state.submitted && oi === q.correct_index) cls = "correct";
          else if (state.submitted && chosen && oi !== q.correct_index) cls = "wrong";
          else if (chosen) cls = "selected";
          html += '<button class="quiz-opt ' + cls + '" ' + (state.submitted ? "disabled" : "") + ' data-action="inline-quiz-answer" data-chapter="' + esc(chapterId) + '" data-i="' + i + '" data-val="' + oi + '">' + esc(opt) + '</button>';
        });
      } else {
        html += '<input class="text-input" data-action="inline-quiz-text" data-chapter="' + esc(chapterId) + '" data-i="' + i + '" ' + (state.submitted ? "disabled" : "") + ' value="' + esc(state.answers[i] || "") + '" placeholder="Your answer…"/>';
      }
      if (state.submitted) html += '<div class="quiz-explain"><b class="muted">Explanation: </b>' + esc(q.explanation) + (!isMC && q.correct_answer ? ' <b class="muted">Model answer:</b> ' + esc(q.correct_answer) : '') + '</div>';
      html += '</div>';
    });
    html += state.submitted ? '<button class="btn" data-action="inline-quiz-retake" data-chapter="' + esc(chapterId) + '">Retake</button>' : '<button class="btn btn-primary" data-action="inline-quiz-submit" data-chapter="' + esc(chapterId) + '">Submit answers</button>';
    runner.innerHTML = html;
  }
  function renderChapterNotesInto(container, chapterId) {
    var p = loadProgress();
    var notes = p.notes.filter(function (n) { return n.chapterId === chapterId; });
    var html = '<div class="flex-row mb-3"><input class="text-input" id="note-input-' + esc(chapterId) + '" placeholder="Add a note on this chapter…"/>' +
      '<button class="btn btn-sm btn-primary" data-action="add-note" data-chapter="' + esc(chapterId) + '">Add</button></div>';
    if (!notes.length) html += '<p class="muted-2 small">No notes yet for this chapter.</p>';
    else html += notes.map(function (n) { return '<div class="note-row"><span style="font-size:13.5px;">' + esc(n.text) + '</span><button class="note-remove" data-action="delete-note-inline" data-id="' + esc(n.id) + '" data-chapter="' + esc(chapterId) + '">remove</button></div>'; }).join("");
    container.innerHTML = html;
  }

  // ---------------------------------------------------------------------
  // Event delegation
  // ---------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    var app = $("#app");

    on(document, "click", "[data-action]", function (e, el) {
      var action = el.getAttribute("data-action");
      switch (action) {
        case "toggle-mobile-nav": {
          var sb = $("#sidebar");
          if (sb) sb.classList.toggle("mobile-open");
          break;
        }
        case "toggle-theme": {
          setTheme(getTheme() === "light" ? "dark" : "light");
          render();
          break;
        }
        case "toggle-bookmark": {
          e.preventDefault();
          toggleBookmark(el.getAttribute("data-id"));
          render();
          break;
        }
        case "toggle-complete": {
          e.preventDefault();
          var id = el.getAttribute("data-id");
          var p = loadProgress();
          markChapterComplete(id, !p.completedChapters[id]);
          render();
          break;
        }
        case "add-note": {
          var cid = el.getAttribute("data-chapter");
          var input = $("#note-input-" + cid);
          if (input && input.value.trim()) {
            addNote(cid, input.value.trim());
            renderChapterNotesInto(el.closest("[data-notes-widget]"), cid);
          }
          break;
        }
        case "delete-note-inline": {
          deleteNote(el.getAttribute("data-id"));
          renderChapterNotesInto(el.closest("[data-notes-widget]"), el.getAttribute("data-chapter"));
          break;
        }
        case "delete-note": {
          deleteNote(el.getAttribute("data-id"));
          renderNotesPageWidget();
          break;
        }
        case "flip-flashcard": {
          flashcardFlipped = !flashcardFlipped;
          var widget = el.closest("[data-flashcard-widget]");
          if (widget) {
            var cards = JSON.parse(widget.getAttribute("data-cards"));
            widget.innerHTML = renderFlashcardCard(cards, cards[flashcardIndex % Math.max(cards.length, 1)]);
          } else renderFlashcardsWidget();
          break;
        }
        case "fc-review": {
          reviewFlashcard(el.getAttribute("data-key"), el.getAttribute("data-remembered") === "1");
          flashcardFlipped = false;
          var w2 = el.closest("[data-flashcard-widget]");
          if (w2) {
            var cards2 = JSON.parse(w2.getAttribute("data-cards")).filter(function (c) { return c.key !== el.getAttribute("data-key"); });
            w2.setAttribute("data-cards", JSON.stringify(cards2));
            flashcardIndex = 0;
            w2.innerHTML = renderFlashcardCard(cards2, cards2[0]);
          } else { flashcardIndex = 0; renderFlashcardsWidget(); }
          break;
        }
        case "fc-mode": {
          flashcardMode = el.getAttribute("data-mode"); flashcardFlipped = false; flashcardIndex = 0;
          renderFlashcardsWidget();
          break;
        }
        case "toggle-tl-cat": {
          var cat = el.getAttribute("data-cat");
          var idx = timelineActiveCats.indexOf(cat);
          if (idx === -1) timelineActiveCats.push(cat); else timelineActiveCats.splice(idx, 1);
          renderTimelineWidget();
          break;
        }
        case "select-timeline-event": {
          var eid = el.getAttribute("data-id");
          timelineSelectedId = timelineSelectedId === eid ? null : eid;
          renderTimelineWidget();
          break;
        }
        case "toggle-graph-rel": {
          var rel = el.getAttribute("data-rel");
          var ri = graphActiveRels.indexOf(rel);
          if (ri === -1) graphActiveRels.push(rel); else graphActiveRels.splice(ri, 1);
          renderGraphWidget();
          break;
        }
        case "select-graph-node": {
          var nid = el.getAttribute("data-id");
          graphSelectedNode = graphSelectedNode === nid ? null : nid;
          var side = $("#graph-side");
          if (side) side.innerHTML = renderGraphSidePanel(graph.filter(function (r) { return graphActiveRels.indexOf(r.relationship) !== -1; }));
          break;
        }
        case "quiz-answer": {
          quizAnswers[el.getAttribute("data-i")] = el.getAttribute("data-val");
          renderQuizRunner();
          break;
        }
        case "quiz-submit": {
          quizSubmitted = true;
          var res = scoreQuiz();
          recordQuizAttempt({ chapterId: quizChapterSel, timestamp: Date.now(), score: res.correct / quizPool.length, total: quizPool.length, correct: res.correct, missedConcepts: res.missed });
          renderQuizRunner();
          break;
        }
        case "quiz-retake": {
          quizAnswers = {}; quizSubmitted = false; quizPool = buildQuizPool();
          renderQuizRunner();
          break;
        }
        case "inline-quiz-answer": {
          var ch1 = el.getAttribute("data-chapter");
          inlineQuizState[ch1].answers[el.getAttribute("data-i")] = el.getAttribute("data-val");
          renderQuizRunnerInto(el.closest("[data-quiz-widget]"), ch1);
          break;
        }
        case "inline-quiz-submit": {
          var ch2 = el.getAttribute("data-chapter");
          inlineQuizState[ch2].submitted = true;
          var pool2 = chapters[ch2].quiz;
          var correct2 = 0, missed2 = [];
          pool2.forEach(function (q, i) {
            var given = inlineQuizState[ch2].answers[i];
            var isMC = q.type === "multiple_choice" || q.type === "identify_philosopher" || q.type === "identify_school";
            var right = isMC ? given === String(q.correct_index) : (given || "").trim().toLowerCase() === (q.correct_answer || "").trim().toLowerCase();
            if (right) correct2++; else if (q.related_concept) missed2.push(q.related_concept);
          });
          recordQuizAttempt({ chapterId: ch2, timestamp: Date.now(), score: correct2 / pool2.length, total: pool2.length, correct: correct2, missedConcepts: missed2 });
          renderQuizRunnerInto(el.closest("[data-quiz-widget]"), ch2);
          break;
        }
        case "inline-quiz-retake": {
          var ch3 = el.getAttribute("data-chapter");
          inlineQuizState[ch3] = { answers: {}, submitted: false };
          renderQuizRunnerInto(el.closest("[data-quiz-widget]"), ch3);
          break;
        }
        case "export-progress": {
          var blob = new Blob([exportProgressJson()], { type: "application/json" });
          var url = URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url; a.download = "western-philosophy-progress.json"; a.click();
          URL.revokeObjectURL(url);
          break;
        }
        case "import-progress-trigger": {
          var fileInput = $("#import-progress-file");
          if (fileInput) fileInput.click();
          break;
        }
        case "reset-progress": {
          if (confirm("Reset all local progress? This cannot be undone.")) { resetProgressStore(); renderProgressPageWidget(); }
          break;
        }
      }
    });

    on(document, "change", "#import-progress-file", function (e, el) {
      var file = el.files && el.files[0];
      if (!file) return;
      file.text().then(function (text) {
        try { importProgressJson(text); renderProgressPageWidget(); }
        catch (err) { alert("That file doesn't look like a valid progress export."); }
      });
    });

    on(document, "input", "#glossary-search", function (e, el) { glossaryQuery = el.value; renderGlossaryWidget(true); });
    on(document, "change", "#glossary-academic", function (e, el) { glossaryAcademic = el.checked; renderGlossaryWidget(false); });
    on(document, "input", "#search-input", function (e, el) { searchQuery = el.value; renderSearchWidget(true); });
    on(document, "input", "#quiz-text-answer, [data-action='quiz-text-answer']", function (e, el) {
      quizAnswers[el.getAttribute("data-i")] = el.value;
    });
    on(document, "input", "[data-action='inline-quiz-text']", function (e, el) {
      inlineQuizState[el.getAttribute("data-chapter")].answers[el.getAttribute("data-i")] = el.value;
    });
    on(document, "input", "[data-action='essay-draft-input']", function (e, el) { saveEssayDraft(el.getAttribute("data-id"), el.value); });
    on(document, "change", "#quiz-chapter-select", function (e, el) { quizChapterSel = el.value; quizPool = buildQuizPool(); quizAnswers = {}; quizSubmitted = false; renderQuizRunner(); });
    on(document, "change", "#quiz-difficulty-select", function (e, el) { quizDifficulty = el.value; quizPool = buildQuizPool(); quizAnswers = {}; quizSubmitted = false; renderQuizRunner(); });

    on(document, "submit", "[data-action='topbar-search-form']", function (e, el) {
      e.preventDefault();
      var q = new FormData(el).get("q");
      if (q) location.hash = "#/search/" + encodeURIComponent(q);
    });
    on(document, "keydown", "#note-input-" + "", function () {}); // placeholder (Enter handled below generically)
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target && e.target.id && e.target.id.indexOf("note-input-") === 0) {
        var cid = e.target.id.replace("note-input-", "");
        var btn = document.querySelector('[data-action="add-note"][data-chapter="' + cid + '"]');
        if (btn) btn.click();
      }
    });

    window.addEventListener("hashchange", render);
    render();
  });
})();
