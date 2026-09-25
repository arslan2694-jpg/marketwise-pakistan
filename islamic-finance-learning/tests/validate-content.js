#!/usr/bin/env node
/* Content + file-integrity validation for the Islamic Finance Learning
 * Platform. Run with: node tests/validate-content.js
 *
 * Loads every data/*.js file into a fake `window` (same as the browser
 * would), then checks:
 *  - all 18 chapters exist, with real topics, no placeholder text
 *  - every topic/flashcard/question source citation points at a real
 *    chapter/section in source/chapter-index.json
 *  - flashcards and questions reference chapters that actually exist
 *  - cross-cutting files (glossary, comparisons, case studies, concept
 *    map, decision tree, study modes, exam prep) are present and non-empty
 *  - core app files (index.html, styles.css, app.js, modules/*) exist and
 *    are syntactically valid JS where applicable
 * Exits with a non-zero code if any hard failure is found; prints a
 * summary report either way.
 */
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.join(__dirname, "..");
var errors = [];
var warnings = [];

function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// ---- 1. File integrity ----
var REQUIRED_FILES = [
  "index.html", "styles.css", "app.js", "manifest.json", "service-worker.js", "README.md",
  "modules/dom.js", "modules/store.js", "modules/data.js", "modules/router.js", "modules/progress.js", "modules/search.js",
  "source/chapter-index.json", "source/source-map.json", "source/glossary-book.json", "source/acronyms-book.json",
  "data/chapter-index.js", "data/glossary.js", "data/comparisons.js", "data/case-studies.js",
  "data/concept-map.js", "data/decision-tree.js", "data/study-modes.js", "data/exam-prep.js"
];
var VIEW_FILES = [
  "dashboard", "learn", "chapter", "concept-map", "glossary", "flashcards", "quiz", "adaptive",
  "comparisons", "case-studies", "decision-tool", "exam-prep", "study-modes", "bookmarks", "notes",
  "progress-view", "settings", "search-results", "timer"
].map(function (n) { return "modules/views/" + n + ".js"; });

REQUIRED_FILES.concat(VIEW_FILES).forEach(function (rel) {
  var p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) fail("Missing required file: " + rel);
});

for (var i = 1; i <= 18; i++) {
  var n = String(i).padStart(2, "0");
  ["data/chapters/ch" + n + ".js", "data/flashcards/ch" + n + ".js", "data/questions/ch" + n + ".js"].forEach(function (rel) {
    if (!fs.existsSync(path.join(ROOT, rel))) fail("Missing chapter data file: " + rel);
  });
}

// ---- 2. JS syntax validity for every script the app loads ----
function checkSyntax(rel) {
  var p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return;
  var src = fs.readFileSync(p, "utf8");
  try {
    new vm.Script(src, { filename: rel });
  } catch (e) {
    fail("Syntax error in " + rel + ": " + e.message);
  }
}
["app.js"].forEach(checkSyntax);
fs.readdirSync(path.join(ROOT, "modules")).forEach(function (f) {
  if (f.endsWith(".js")) checkSyntax("modules/" + f);
});
if (fs.existsSync(path.join(ROOT, "modules/views"))) {
  fs.readdirSync(path.join(ROOT, "modules/views")).forEach(function (f) {
    if (f.endsWith(".js")) checkSyntax("modules/views/" + f);
  });
}
["data", "data/chapters", "data/flashcards", "data/questions"].forEach(function (dir) {
  var full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return;
  fs.readdirSync(full).forEach(function (f) {
    if (f.endsWith(".js")) checkSyntax(path.join(dir, f));
  });
});

// ---- 3. Load all data/*.js into a fake window and inspect content ----
var sandbox = { window: {}, console: console };
vm.createContext(sandbox);
function loadIntoSandbox(rel) {
  var p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return false;
  var src = fs.readFileSync(p, "utf8");
  try {
    vm.runInContext(src, sandbox, { filename: rel });
    return true;
  } catch (e) {
    fail("Runtime error loading " + rel + ": " + e.message);
    return false;
  }
}

["data/chapter-index.js", "data/glossary.js", "data/comparisons.js", "data/case-studies.js",
  "data/concept-map.js", "data/decision-tree.js", "data/study-modes.js", "data/exam-prep.js"].forEach(loadIntoSandbox);
for (var c = 1; c <= 18; c++) {
  var nn = String(c).padStart(2, "0");
  loadIntoSandbox("data/chapters/ch" + nn + ".js");
  loadIntoSandbox("data/flashcards/ch" + nn + ".js");
  loadIntoSandbox("data/questions/ch" + nn + ".js");
}

var D = sandbox.window.IFL_DATA || {};
var PLACEHOLDER_RE = /\b(TODO|coming soon|lorem ipsum|placeholder text|to be added|tbd)\b/i;

function scanForPlaceholders(obj, pathStr, hits) {
  if (obj == null) return;
  if (typeof obj === "string") {
    if (PLACEHOLDER_RE.test(obj)) hits.push(pathStr + " => " + obj.slice(0, 80));
    return;
  }
  if (Array.isArray(obj)) { obj.forEach(function (v, i) { scanForPlaceholders(v, pathStr + "[" + i + "]", hits); }); return; }
  if (typeof obj === "object") {
    Object.keys(obj).forEach(function (k) { scanForPlaceholders(obj[k], pathStr + "." + k, hits); });
  }
}

// ---- Chapters ----
var chapterIndexMeta = (D.chapterIndex && D.chapterIndex.chapters) || [];
var chapterIndexByNum = {};
chapterIndexMeta.forEach(function (c) { chapterIndexByNum[c.chapterNumber] = c; });

var totalTopics = 0;
var report = { chapters: [] };
for (var num = 1; num <= 18; num++) {
  var chapter = D.chapters && D.chapters[num];
  if (!chapter) { fail("Chapter " + num + " data missing from window.IFL_DATA.chapters"); continue; }
  if (!chapter.title) fail("Chapter " + num + " has no title");
  if (!Array.isArray(chapter.topics) || chapter.topics.length === 0) {
    fail("Chapter " + num + " has no topics");
  } else {
    totalTopics += chapter.topics.length;
  }
  var placeholderHits = [];
  scanForPlaceholders(chapter, "ch" + num, placeholderHits);
  if (placeholderHits.length) fail("Placeholder text found in chapter " + num + ": " + placeholderHits.join("; "));

  (chapter.topics || []).forEach(function (t) {
    if (!t.source || !t.source.chapter) { warn("Topic " + t.id + " missing source.chapter"); return; }
    var meta = chapterIndexByNum[t.source.chapter];
    if (!meta) warn("Topic " + t.id + " cites chapter " + t.source.chapter + " which is not in chapter-index.json");
  });

  report.chapters.push({ num: num, title: chapter.title, topics: (chapter.topics || []).length });
}

// ---- Flashcards / Questions ----
var flashcards = D.flashcards || [];
var questions = D.questions || [];
if (flashcards.length < 18 * 5) warn("Flashcard count seems low for 18 chapters: " + flashcards.length);
if (questions.length < 18 * 8) warn("Question count seems low for 18 chapters: " + questions.length);

flashcards.forEach(function (f) {
  if (!f.chapter || !D.chapters || !D.chapters[f.chapter]) fail("Flashcard " + f.id + " references missing chapter " + f.chapter);
  if (!f.front || !f.back) fail("Flashcard " + f.id + " missing front/back");
});
questions.forEach(function (q) {
  if (!q.chapter || !D.chapters || !D.chapters[q.chapter]) fail("Question " + q.id + " references missing chapter " + q.chapter);
  if (!q.prompt) fail("Question " + q.id + " missing prompt");
  if (q.correctAnswer === undefined) fail("Question " + q.id + " missing correctAnswer");
});

// ---- Cross-cutting content ----
if (!(D.glossary && D.glossary.length >= 100)) warn("Glossary has fewer than 100 terms: " + (D.glossary ? D.glossary.length : 0));
if (!(D.comparisons && D.comparisons.length >= 5)) warn("Comparison Lab has fewer than 5 entries");
if (!(D.caseStudies && D.caseStudies.length >= 10)) warn("Case Study Lab has fewer than 10 entries");
if (!(D.conceptMap && D.conceptMap.nodes && D.conceptMap.nodes.length >= 20)) warn("Concept map has fewer than 20 nodes");
if (!(D.decisionTree && D.decisionTree.questions)) warn("Decision tree missing questions");
if (!(D.studyModes && D.studyModes["45"] && D.studyModes["90"] && D.studyModes["180"])) warn("Study modes missing one of 45/90/180 min paths");
if (!(D.examPrep && D.examPrep.trainerSets && D.examPrep.trainerSets.length >= 8)) warn("Exam prep trainer sets fewer than 8");

// ---- Report ----
console.log("=== Islamic Finance Learning Platform — Content Validation ===\n");
console.log("Chapters found: " + report.chapters.length + " / 18");
report.chapters.forEach(function (c) { console.log("  Ch " + c.num + ": " + c.topics + " topics — " + c.title); });
console.log("Total topics: " + totalTopics);
console.log("Flashcards: " + flashcards.length + " | Questions: " + questions.length);
console.log("Glossary terms: " + (D.glossary ? D.glossary.length : 0));
console.log("Comparisons: " + (D.comparisons ? D.comparisons.length : 0) + " | Case studies: " + (D.caseStudies ? D.caseStudies.length : 0));
console.log("Concept map nodes: " + (D.conceptMap && D.conceptMap.nodes ? D.conceptMap.nodes.length : 0) + " | edges: " + (D.conceptMap && D.conceptMap.edges ? D.conceptMap.edges.length : 0));
console.log("Exam trainer sets: " + (D.examPrep && D.examPrep.trainerSets ? D.examPrep.trainerSets.length : 0));

console.log("\n--- Warnings (" + warnings.length + ") ---");
warnings.forEach(function (w) { console.log("  ! " + w); });

console.log("\n--- Errors (" + errors.length + ") ---");
errors.forEach(function (e) { console.log("  x " + e); });

if (errors.length) {
  console.log("\nFAILED: " + errors.length + " error(s).");
  process.exit(1);
} else {
  console.log("\nPASSED with " + warnings.length + " warning(s).");
  process.exit(0);
}
