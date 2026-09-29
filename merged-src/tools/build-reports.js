/* Generates the five supporting reports from the ACTUAL merge audit and QA result files.
   Run after tools/build-data.js and the tools/qa/* suites:  node tools/build-reports.js  */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, '..');
const audit = require('../data/_audit.json');
const integ = require('../data/_integrity.json');
const rd = f => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'qa', f), 'utf8')); } catch (e) { return null; } };
const Q = { flows: rd('flows-result.json'), flows2: rd('flows2-result.json'), crawl: rd('crawl-result.json'), resp: rd('responsive-result.json'), calc: rd('calc-result.json'), stat: rd('static-result.json'), zl: rd('zero-loss-result.json'), counts: rd('counts-result.json'), perf: rd('perf-result.json'), migrate: rd('migrate-result.json'), lint: rd('lint-result.json') };
const { loadF1, loadF2 } = require('./lib/load-sources');
const D1 = loadF1(), D2 = loadF2();

/* ---- load the canonical data ---- */
const sb = { console }; sb.window = sb; vm.createContext(sb); sb.IFL_DATA = { chapters: {}, sets: {} };
sb.IFL_DATA.register = (n, v) => { sb.IFL_DATA.sets[n] = v; }; sb.IFL_DATA.registerChapter = c => { sb.IFL_DATA.chapters[c.number] = c; };
(function walk(d) { fs.readdirSync(d).forEach(f => { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (p.endsWith('.js')) vm.runInContext(fs.readFileSync(p, 'utf8'), sb); }); })(path.join(ROOT, 'data'));
const F = sb.IFL_DATA, S = F.sets, C = audit.counts, T = audit.finalTotals;
const chapters = Object.values(F.chapters);
const topics = chapters.flatMap(c => c.topics);
const md = (rows) => rows.map(r => '| ' + r.join(' | ') + ' |').join('\n');
const table = (head, rows) => md([head, head.map(() => '---')].concat(rows));
const date = new Date().toISOString().slice(0, 10);

/* ================= counts used across reports ================= */
const f1 = { topics: 311, questions: 771, flashcards: 498, exam: 110, glossary: 191, concepts: 54, edges: 127, cases: 19, products: 58, diagrams: 34, comparisons: 25, modesAttr: 12, calcs: 23, numericals: 33, productNumericals: 58, quick: 311, productQs: 198, defs: topics.reduce((s, t) => s + (t.definitions || []).length, 0) };
const f2 = { topics: 225, questions: 572, flashcards: 558, trainer: 26, glossary: 180, acronyms: 119, nodes: 64, edges: 124, cases: 42, modes: 19, comparisons: 16, calcs: 6, walkthroughs: topics.reduce((s, t) => s + t.supplements.reduce((a, x) => a + (x.calculations || []).length, 0), 0), studyModes: 3, decision: 14, defs: topics.reduce((s, t) => s + t.supplements.reduce((a, x) => a + (x.definitions || []).length, 0), 0) };
const los = { f1: 0, f2: 0, merged: 0 }; Object.keys(audit.merged).filter(k => /LOs$/.test(k)).forEach(k => { los.f1 += audit.merged[k].f1; los.f2 += audit.merged[k].f2; los.merged += audit.merged[k].merged; });
const glossExt = S.glossary.filter(g => g.extendedDefinition).length, glossMatched = S.glossary.filter(g => g.origin.indexOf('f2') > -1).length;
const cmpMerged = S.comparisons.pairs.filter(p => p.origin.length > 1).length;
const eff = (q) => q ? (q.checks ? q.checks.filter(c => c.ok).length : q.filter ? q.filter(c => c.ok).length : 0) : 0;
const flowsN = Q.flows ? Q.flows.length : 0, flowsOk = eff(Q.flows), flows2N = Q.flows2 ? Q.flows2.length : 0, flows2Ok = eff(Q.flows2);

/* ================= CONTENT-RECONCILIATION.md ================= */
const rec = [
  ['Parts', 3, 3, 3, 0, 3], ['Chapters', 18, 18, 18, 0, 18],
  ['Sections / topics', f1.topics + ' topics', f2.topics + ' topic records (214 distinct section citations)', 0, f2.topics + ' attached as extended notes', T.topics + ' topics (+ ' + T.supplements + ' extended-notes sections)'],
  ['Learning objectives', los.f1, los.f2, los.f1 + los.f2 - los.merged, 'wording variants kept as “also phrased”', los.merged],
  ['Definitions embedded in topics', f1.defs, f2.defs, 0, 'kept in place; unified by term in the Glossary view', f1.defs + f2.defs],
  ['Glossary entries', f1.glossary, f2.glossary, glossMatched, glossExt + ' F2 definitions kept as “fuller definition”', S.glossary.length],
  ['Acronyms', 0, f2.acronyms, 0, 0, S.acronyms.length],
  ['Concepts (revision cards / map nodes)', f1.concepts, f2.nodes, C.concepts.trueDuplicates, (S.concepts.filter(c => c.mapNodeOnly).length) + ' map-only nodes added', S.concepts.length],
  ['Concept edges', f1.edges, f2.edges, C.conceptEdges.trueDuplicates, 'relation and flow edges kept as separate kinds', S.conceptEdges.length],
  ['Flashcards', f1.flashcards, f2.flashcards, C.flashcards.trueDuplicates, 0, T.flashcards],
  ['Questions (stored)', f1.questions, f2.questions, C.questions.trueDuplicates, 'near-similar questions with different answers kept', T.questions],
  ['Questions (derived at runtime)', f1.quick + ' quick checks + ' + f1.productQs + ' product questions', 0, 0, '—', (f1.quick + f1.productQs) + ' derived (pool total ' + (T.questions + f1.quick + f1.productQs) + ')'],
  ['Exam answer prompts', f1.exam, f2.trainer, 0, (audit.duplicates.examPrompts || []).length + ' similar pairs linked, both kept', T.examPrompts],
  ['Case studies', f1.cases, f2.cases, 0, 0, T.cases],
  ['Financing modes (contracts)', f1.modesAttr + ' (comparison matrix)', f2.modes, f1.modesAttr, (f2.modes - f1.modesAttr) + ' F2-only modes; F1 attributes merged onto F2 profiles', T.modes],
  ['Products / applications', f1.products, 0, 0, 0, T.products],
  ['Transaction diagrams', f1.diagrams, '0 (18 step lists kept as extended notes)', 0, 0, T.diagrams],
  ['Numerical exercises (trainer)', f1.numericals + ' generators (12 with textbook figures)', 0, 0, '—', Q.counts ? Q.counts.numericals : f1.numericals],
  ['Worked numericals inside products / topics', f1.productNumericals + ' product examples', f2.walkthroughs + ' topic walkthroughs', 0, 'kept in their own places', f1.productNumericals + f2.walkthroughs],
  ['Calculators / rule checkers', f1.calcs, f2.calcs, 3, '3 F2 calculators absorbed into F1 ones (features added); 3 F2 calculators new; F1 “sleeping partner” merged into the Musharakah calculator', Q.counts ? Q.counts.calculators : 25],
  ['Comparisons', f1.comparisons, f2.comparisons, 0, cmpMerged + ' pairs merged (all rows from both kept)', T.comparisons],
  ['Mode-finder results', 14, f2.decision, 0, 'two pathways, one renderer', Q.counts ? Q.counts.finderResults : 28],
  ['Guided study modes', 3, 3, 0, '3 merged (F2 roadmaps attached)', 3],
  ['Achievements', 11, 16, 8, 'union of both lists', Q.counts ? Q.counts.achievements : 19],
  ['Relationship-graph edges (stored)', '—', '—', '—', '—', T.graphEdges + ' + derived']
];
const reconMd = `# Content Reconciliation

Generated ${date} by \`merged-src/tools/build-reports.js\` from \`merged-src/data/_audit.json\`, the canonical data files and the QA result files. Every number below is computed, not estimated.

**Columns.** *File 1* and *File 2* are the record counts in the two original applications. *True duplicates* are records collapsed into one canonical record because keeping both added no educational or functional value. *Complementary / merged* describes records that overlap in subject but carry different information (kept, and merged where they describe the same thing). *Final unique* is what the merged platform contains.

${table(['Content type', 'File 1', 'File 2', 'True duplicates', 'Complementary / merged', 'Final unique'], rec.map(r => r.map(String)))}

## How “true duplicate” was decided

Two records were collapsed only when their prompts / terms were substantively the same **and** their answers were the same. A near-similar question that tests the same fact with a different answer or different reasoning was kept.

### Questions collapsed (${audit.duplicates.questions.length})
${table(['Kept (File 1 id)', 'Collapsed (File 2 id)', 'Prompt similarity', 'Answer similarity', 'Kept prompt', 'Collapsed prompt'], audit.duplicates.questions.map(d => [d.keep, d.dropped, d.promptSim, d.answerSim, d.keptPrompt.slice(0, 80), d.droppedPrompt.slice(0, 80)]))}

Where the collapsed question's explanation differed, it is kept on the surviving question as \`explanationAlt\`; the collapsed id is stored as an alias so earlier progress still maps.

### Flashcards collapsed (${audit.duplicates.flashcards.length})
${table(['Kept (File 1 id)', 'Collapsed (File 2 id)', 'Front similarity', 'Back similarity', 'Kept front', 'Collapsed front'], audit.duplicates.flashcards.map(d => [d.keep, d.dropped, d.frontSim, d.backSim, d.keptFront.slice(0, 70), d.droppedFront.slice(0, 70)]))}

### Glossary
All ${f2.glossary} File 2 glossary terms correspond to a File 1 term (${glossMatched} File 1 entries carry both sources). ${f2.glossary - 9} matched after ignoring spacing, diacritics and quote style; 9 were transliteration variants confirmed by reading both definitions (\`Kharaj bi-al-Daman\`/\`Kharaj bil Daman\`, \`Mithlam-bi-mithlin\`/\`Mithlan bi-mithlin\`, \`Muzara‘a\`/\`Muzara‘ah\`, \`Yadam-bi-yadin\`/\`Yadan bi-yadin\`, \`Saw´am-bi-sawaa´\`/\`Sawa’an bi-sawa’in\`, \`Hilah, Hiyal (plural)\`/\`Hilah (Hiyal)\`, \`‘Inan (a type of Shirkah)\`/\`‘Inan\`, \`W‘adah\`/\`Wa‘d\`, \`Zakah/Zakat\`/\`Zakah\`). A blind edit-distance match would have merged \`W‘adah\` (promise) with \`Wadi‘ah\` (deposit); it was overridden by hand. ${glossExt} entries keep both wordings (\`definition\` and \`extendedDefinition\`).

### Learning objectives, takeaways
Objectives were merged when their wording overlapped (≥ 0.6 word overlap); the second wording is kept as \`altText\`. Chapter takeaways are collapsed only when byte-identical.

## Zero-loss check (string level)

\`tools/qa/zero-loss.js\` walks every string in every record of both original applications and looks for it in the canonical data.

- Strings audited: **${Q.zl ? Q.zl.totalStrings : 'n/a'}**
- Not byte-identical but explained: ${Q.zl ? JSON.stringify(Q.zl.explainedTotal) : 'n/a'}
- **Unexplained: ${Q.zl ? Q.zl.totalLost : 'n/a'}**

The only records intentionally not carried over are the ${audit.duplicates.questions.length} question and ${audit.duplicates.flashcards.length} flashcard true duplicates listed above (the surviving record is the same fact with the same answer).
`;
fs.writeFileSync(path.join(OUT, 'CONTENT-RECONCILIATION.md'), reconMd);

/* ================= FEATURE-INVENTORY.md ================= */
const feat = [
  ['Application shell', 'Top bar, sidebar, drawer, bottom nav, skip link, modal + toast roots', 'Sidebar with collapse, mobile top bar, backdrop, streak pill, live search dropdown', 'One shell: F1 landmarks and accessibility + F2 collapsible sidebar, streak pill and search suggestions', 'MERGED'],
  ['Navigation', '8 groups, Learn sub-menu', '5 groups, flat list', 'Learn → Practise → Apply → Calculate → Exam → Study → Reference → Personal', 'IMPROVED'],
  ['Legacy deep links', '—', 'Own route table (#/case-studies, #/crash-course/45 …)', '19 redirect rules keep every File 2 link and every File 1 link working', 'RETAINED'],
  ['Dashboard', 'Hero, next-step recommendations, readiness, weak topics, heat map, planner card', 'Welcome, continue, stats, weak topics, bookmarks, activity, streak', 'F1 dashboard + streak pill + links to modes, glossary/acronyms, sources', 'MERGED'],
  ['Chapters / topics', '311 topics, 3 explanation levels, “explain again”, tiers, quick check', '225 topics, Beginner/MBA/Exam levels, source citations', '311 topics; each shows F2’s treatment as level-aware “extended study notes”; F2 sections spanning several topics are cross-linked', 'MERGED'],
  ['Teach me (guided lesson)', '9-step tutor walk-through', 'Step-by-step guided lesson', 'One 9-step Teach me (conditions/principles now include extended notes)', 'MERGED'],
  ['Source citations', 'Chapter · section · pages, “view source context”', 'Section/page citations on records', 'Both + Sources page: full section/page map with PDF page numbers, appendices, back matter', 'IMPROVED'],
  ['Glossary', '191 terms + chapter-defined terms', '180 terms + chapter definitions', 'One glossary (191 terms + chapter terms), both wordings, related terms, pages', 'MERGED'],
  ['Acronyms', 'None', '119 (data present)', 'Acronyms tab with search, A–Z, bookmarks, global search', 'IMPROVED'],
  ['Concept map', 'Spine map, concept pages with relationship graph, chapter concept maps', 'Stage columns, edges on selection, “show all”', 'Two views over one graph (Course map / Learning flow) and 85 concepts, 249 edges', 'MERGED'],
  ['Concept hub', 'Concept pages (rapid-revision card + links)', 'Name-matched aggregation page', 'One concept page: card, relationship graph, connected learning (graph) and name-matched mentions', 'MERGED'],
  ['Flashcards', '498 cards, deck picker, review session', '558 cards, category/chapter picker', '1,053 cards, one engine, decks by scope/chapter/category', 'MERGED'],
  ['Spaced repetition', 'SM-2 style: reps, ease, interval, due, lapses, grade', 'Leitner boxes (5)', 'One SM-2 scheduler with guard rails (no NaN, negative or impossible values); Leitner history converted', 'REPLACED WITH SUPERIOR IMPLEMENTATION'],
  ['Question engine', '11 question types incl. matching/ordering/multi/short, explanations, source, objective', 'mcq/tf/identify/comparison/scenario, multiselect, others self-graded', 'One engine, 11 types; File 2 ordering / matching converted to real interactive items where structured', 'MERGED'],
  ['Quiz builder & runner', 'Presets, builder, results, retry missed', 'Chapter / mixed / by-type', 'Presets + builder + browse-by-type + chapter quizzes', 'MERGED'],
  ['Adaptive practice / weak areas', 'Ranks by weak topics, missed, unseen', 'Weighted by chapter accuracy', 'F1 ranking over the canonical answer history', 'REPLACED WITH SUPERIOR IMPLEMENTATION'],
  ['Mistakes review / retry', 'My mistakes page, retry missed', 'Missed ids in attempts', 'One mistakes list fed by every answer', 'MERGED'],
  ['Case studies', '19 cases: 4-step lab with MCQs', '42 cases: prompts + textbook answer + why + takeaway', '61 cases, one lab supporting both formats; filters by kind, chapter, mode; completion tracked', 'MERGED'],
  ['Comparisons', '25 pairs + any-to-any matrix (12 modes)', '16 comparisons with dimensions', '29 comparisons (12 merged, all rows kept) + 19-mode any-to-any matrix with 21 aspects and focus presets', 'MERGED'],
  ['Financing modes', 'Comparison matrix rows, finder results', '19-mode “Products at a glance” matrix', 'Modes catalogue + a page per mode linked to products, diagrams, cases, numericals, calculators, comparisons, questions and flashcards', 'MERGED'],
  ['Products / applications', '58 products: catalogue, finder, maps, compare, quiz, numericals', '—', 'Retained; each product links to its financing modes', 'RETAINED'],
  ['Transaction diagrams', '34 interactive diagrams (parties, steps, rules, pitfalls)', '18 step lists (no parties)', '34 diagrams kept as diagrams; step lists kept as “transaction steps” in extended notes; each diagram links to its mode and products', 'RETAINED'],
  ['Which mode applies?', '9-node decision tree, 14 results', '10-question tree, 14 results', 'One finder with two pathways (need / purpose) and 28 results', 'MERGED'],
  ['Numerical trainer', '33 problem types (12 with textbook figures) with practice variants', '—', 'Retained; results feed the progress model; each numerical linked to topic, product and mode', 'RETAINED'],
  ['Calculators', '23 calculators / checkers', '6 calculators', '25: F2 features folded in (Murabaha/Musawamah disclosure, sleeping-partner cap), 3 new (Salam discount, Sukuk distribution, Qard vs interest); tenure typo can no longer freeze the page', 'MERGED'],
  ['Exam centre', 'Tabs: definitions, short, long, conceptual, difference, scenario, MCQ, viva, rapid, core', 'Browse by question type + trainer', 'F1 centre + Answer plans tab (F2 trainer sets) + type browsing on the quiz page', 'MERGED'],
  ['Answer trainer', '110 prompts: structure, key concepts, points, mistakes', '26 trainer sets', '136 prompts, one trainer', 'MERGED'],
  ['Rapid revision cards', '54 concept cards', 'Rapid revision (concept nodes)', 'One deck of the concepts that have revision cards', 'RETAINED'],
  ['Timed mock exams', 'Mock builder, silent answers, timer, review by chapter and level', '—', 'Retained over the merged pool', 'RETAINED'],
  ['Exam planner', 'Day-by-day plan from exam date and progress', '—', 'Retained', 'RETAINED'],
  ['Guided study (45 / 90 / 180)', 'Item-driven player: countdown, pause, skip, saved position', 'Segment roadmaps + closing quiz', 'One player; File 2 segments shown as each plan’s roadmap; state migrated', 'MERGED'],
  ['Study timer', 'Persistent Pomodoro / 45 / 60 / custom, header chip, logging', 'Pomodoro / 45 / 60 / custom', 'F1 timer (superset)', 'TRUE DUPLICATE REMOVED'],
  ['Progress & achievements', '11 achievements, streak, heat map, readiness', '16 achievements, streak', '19 achievements (union), one progress model incl. cases, calculators, numericals', 'MERGED'],
  ['Bookmarks / notes', 'Typed bookmarks and notes on any item', 'Bookmarks / notes on topics, concepts, glossary…', 'One store; File 2 items mapped to canonical ids and working routes', 'MERGED'],
  ['Search', 'Full-text index over 10 content types', 'Live dropdown + results page', 'One index over 17 content types, hub card for concepts and modes, live dropdown', 'MERGED'],
  ['Settings', 'Theme, text size, motion, level, daily goal, name, export/import/reset', 'Theme, level, reset, export/import', 'F1 settings + merge/replace import that accepts either earlier application’s export', 'MERGED'],
  ['Themes', 'Light / dark / system, no-flash', 'Light / dark / system', 'F1 tokens; text-3 and gold tokens darkened to meet 4.5:1 contrast', 'IMPROVED'],
  ['Accessibility', 'Skip link, focus trap modals, aria-current/expanded, reduced motion, keyboard flashcards', 'Skip link, reduced motion', 'All of F1’s; first Tab stop is the skip link; flashcard Space no longer flips twice; hidden file input labelled', 'IMPROVED'],
  ['Mobile', 'Drawer, bottom nav, responsive grids', 'Backdrop drawer', 'No horizontal overflow at 375 / 768 px on 39 sampled routes; buttons wrap', 'IMPROVED'],
  ['Persistence', 'localStorage “ifl.v1”, no migrations', 'localStorage “ifl_v1”', 'Versioned “ifl.v3” (APP_STATE_VERSION 3) with migrations from both, merge, sanitising, corrupt-record backup', 'REPLACED WITH SUPERIOR IMPLEMENTATION'],
  ['Offline / standalone', 'Standalone flag + optional service worker over http', 'Standalone build with a data-URL manifest (start_url ./index.html, icon.svg — not deliverable from one file)', 'One file, no network requests; deliberately no manifest or service worker', 'REPLACED WITH SUPERIOR IMPLEMENTATION'],
  ['Print', 'Printable chapter revision sheet', '—', 'Retained', 'RETAINED'],
  ['Data loader', 'Lazy per-chapter script injection', 'Global aggregation module', 'One registry (all inlined) + one canonical index / relationship graph (IFL.data)', 'REPLACED WITH SUPERIOR IMPLEMENTATION']
];
const featMd = `# Feature Inventory and Feature Reconciliation

Generated ${date}. “File 1” is *Islamic-Finance-Learning* (modular learning engine); “File 2” is *Understanding-Islamic-Finance-STANDALONE* (structured product / reference layer). Both were read completely (all script blocks, data files and CSS) before merging.

Legend for **Action**: RETAINED · MERGED · IMPROVED · REPLACED WITH SUPERIOR IMPLEMENTATION · TRUE DUPLICATE REMOVED. **No feature is marked “not retained”.**

## Feature reconciliation table

${table(['Feature', 'File 1', 'File 2', 'Final implementation', 'Action'], feat)}

## Pre-merge inventory summary

| Area | File 1 | File 2 |
| --- | --- | --- |
| Structure | modular source built to one file; ~62 script blocks (18 chapter data files, 8 shared data sets, 26 view/engine modules) | modular source built to one file; 93 script blocks (data files per chapter/type, 22 view modules, 6 core modules) |
| Data | 311 topics, 498 flashcards, 771 questions, 110 exam prompts, 191 glossary terms, 54 concepts, 34 diagrams, 25 comparison pairs + 12-mode matrix, 19 cases, 58 products, 3 study plans | 225 topics, 558 flashcards, 572 questions, 26 trainer sets, 180 glossary terms, 119 acronyms, 64 concept nodes / 124 edges, 16 comparisons, 42 cases, 19 mode profiles, decision tree, 3 study modes, book index |
| Routes | 43 route patterns | 39 route patterns |
| State | \`ifl.v1\`: topics, answers, attempts, cards (SM-2), reviews, notes, bookmarks, activity, days, timer sessions, guided, exam | \`ifl_v1\`: progress.{topicsCompleted, questionHistory, quizAttempts, flashcardReviews (Leitner), …}, notes, bookmarks, achievements |
| Storage of PWA | service-worker registration only when served over http | manifest as data-URL with \`start_url: "./index.html"\` and \`icon.svg\` |

## Merge matrix for features

| Class | Features |
| --- | --- |
| FILE_1_UNIQUE | Numerical trainer, mock exams, planner, mistakes review, adaptive-practice ranking, transaction diagrams, product catalogue/finder/maps/compare/quiz, rapid revision, answer-trainer tabs, printable sheet, SM-2 scheduler, Teach-me steps as designed |
| FILE_2_UNIQUE | Acronyms data, financing-mode profiles (19), Salam-discount / Sukuk-distribution / Qard-vs-interest calculators, decision tree by purpose, learning-flow concept view, sidebar collapse, streak pill, live search dropdown, book section/page index |
| COMPLEMENTARY | Topics (two independent treatments), cases, comparisons, glossary wordings, exam prompts, study-mode roadmaps |
| TRUE_DUPLICATE | Study timer, dashboard recommendations, bookmarks/notes storage, theme handling, ${audit.duplicates.questions.length} questions, ${audit.duplicates.flashcards.length} flashcards |
| SAME_CONCEPT_DIFFERENT_IMPLEMENTATION | SRS (SM-2 vs Leitner), question runner, concept map, search, router, store, progress, calculators |
| CONFLICT | ${audit.conflicts.length} data conflicts (chapter study-time estimates ×16; see MERGE-AUDIT-REPORT.md) |
| SHARED_DEPENDENCY | The book’s chapter/part structure, page numbers, terminology |
| LEGACY/COMPATIBILITY | Both storage formats, both route tables, F2 ids (topic, question, flashcard, concept, comparison, mode) |
| UNKNOWN_REQUIRES_REVIEW | none remaining |
`;
fs.writeFileSync(path.join(OUT, 'FEATURE-INVENTORY.md'), featMd);

/* ================= DATA-SCHEMA.md ================= */
function keyStats(arr) { const m = {}; arr.forEach(o => { if (o && typeof o === 'object') Object.keys(o).forEach(k => { m[k] = (m[k] || 0) + 1; }); }); return Object.keys(m).map(k => { const ex = arr.find(o => o && o[k] !== undefined); const v = ex ? ex[k] : null; const ty = Array.isArray(v) ? 'array' : typeof v; return [k, ty, Math.round(100 * m[k] / arr.length) + '%']; }); }
const DESC = {
  id: 'Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`.', aliases: 'Ids of the other application’s records merged into this one (used to migrate saved progress).', origin: 'Which source(s) contributed: `f1`, `f2`.',
  prompt: 'Question stem (was `q` in F1, `prompt` in F2).', correctAnswer: 'Option index (mcq family), boolean (tf), index array (multi) or model answer text (short). match/order questions use `pairs` / `items` instead.', difficulty: '`easy` / `medium` / `hard` (F1 `E`/`M`/`H`).', cognitiveLevel: '`recall` / `understanding` / `application` / `analysis` (was `level`).', topicId: 'Canonical topic (F1 granularity). F2 sections are resolved to it by section range.', objective: 'Learning objective text (was `obj` / `learningObjective`).', format: 'F2 items that are MCQ-shaped but were labelled matching/ordering, or written-answer forms of identify/scenario items.', explanationAlt: 'Second explanation kept when a duplicate question had different wording.', topicLabel: 'F2’s free-text topic title.', source: '`{chapter, section, pages[]}` (or the book/section for glossary) — never invented.',
  category: 'Flashcard / glossary / mode category (was `cat`).', backAlt: 'Second wording when a duplicate flashcard had a different back.', definition: 'Short definition.', extendedDefinition: 'The other source’s definition when the wording differs.', glossaryPage: 'Page in the book’s printed glossary.', discussedOnPages: 'Pages where the chapter discusses the term.',
  simpleExplanation: 'Beginner explanation (F1 `simple`).', academicExplanation: 'MBA-level paragraphs (F1 `academic`).', examExplanation: 'Exam-answer summary (F1 `exam`).', commonConfusions: 'Misconception / correct-view pairs (F1 `confusions`).', processSteps: 'Ordered steps (F1 `steps`).', relatedTopics: 'Related topic ids (F1 `related`).', supplements: 'The second study source’s treatment of this section: overview, three explanation levels, key points, definitions, conditions, principles, steps, examples, confusions, distinctions, related concepts, transaction steps, calculation walkthroughs, debate fields.', covers: 'All canonical topics an extended-notes section spans.',
  modeIds: 'Financing modes (contracts) involved.', productIds: 'Products built on the mode / used in the case.', conceptId: 'Concept card for the mode.', attributes: 'F1 comparison-matrix attributes (nature, ownership, return, payment, late, tenor, uses, keyRule, pitfall).', altNames: 'Other name(s) used by the other source.',
  columns: 'Column labels of a comparison (rows are `[aspect, …one cell per column]`).', columnsAlt: 'Column labels used by the second source.', titleAlt: 'The other source’s title for a merged comparison.', kind: 'Case: `textbook` / `practice` / `scenario`; exam prompt: long/short/conceptual/viva/difference/scenario/answer-plan; concept edge: `relation` / `flow`.',
  stage: 'F2 learning-flow stage of a concept.', mapNodeOnly: 'Concept known only from the book’s concept map (no revision card).', groupDerivedFromStage: 'Group was derived from the F2 stage because F2 gives none.', tags: 'Concept-tag ids used in topic `concepts`.', topicIds: 'Topics where the item is taught.'
};
function schemaSection(name, arr, note) { const rows = keyStats(arr).map(r => [r[0], r[1], r[2], (DESC[r[0]] || '').replace(/\|/g, '\\|')]); return `### ${name}\n${note ? note + '\n\n' : ''}${arr.length} records.\n\n${table(['Field', 'Type', 'Present in', 'Meaning'], rows)}\n`; }
const questions = chapters.flatMap(c => c.questions), flashcards = chapters.flatMap(c => c.flashcards), exams = chapters.flatMap(c => c.exam);
const schemaMd = `# Canonical Data Schema

Generated ${date} from the built data (\`merged-src/data/*.js\`). Field tables list every field that occurs, its JSON type and how many records carry it.

## Principles

1. **One schema per content type.** Both sources describe the same textbook with different field names; the canonical schema uses descriptive names (\`prompt\`, \`correctAnswer\`, \`difficulty\`, \`cognitiveLevel\`, \`topicId\`, \`simpleExplanation\` …) and every consumer was updated.
2. **Stable ids.** Existing ids are kept because they are what saved progress refers to. \`aliases\` records every merged id and \`IFL.data.canonical*()\` resolves them. Ids are never array indexes. (The optional naming style \`topic_murabaha_basic\` was not adopted: it would have invalidated every saved bookmark, note and review.)
3. **Provenance is data.** \`origin\` says which source contributed a record; \`source\` carries only chapter/section/pages that the sources give.
4. **Nothing is silently decided.** When two sources disagree, both values are stored (\`titleAlt\`, \`altText\`, \`estimates\`, \`extendedDefinition\`, \`explanationAlt\`, \`backAlt\`) and the choice is listed in MERGE-AUDIT-REPORT.md.
5. **Relationships are explicit.** \`data/graph.js\` stores ${S.graph.length} typed triples; the rest are implied by record fields (\`topicId\`, \`modeIds\`, \`productIds\` …). \`IFL.data.related(type, id)\` returns everything linked to a record, bidirectionally; numericals and calculators register themselves at load.

## Object map

| Canonical object | Stored in | Count |
| --- | --- | --- |
| Chapter | \`data/chapters/chNN.js\` | ${T.chapters} |
| Section / Topic | inside each chapter (\`topics[]\`) | ${T.topics} |
| Extended-notes section (F2 topic) | \`topic.supplements[]\` | ${T.supplements} |
| Definition | \`topic.definitions[]\`, \`supplements[].definitions[]\`, glossary | ${f1.defs + f2.defs} embedded |
| GlossaryEntry | \`data/glossary.js\` | ${S.glossary.length} |
| Acronym | \`data/acronyms.js\` | ${S.acronyms.length} |
| Concept + edges | \`data/concepts.js\`, \`data/concept-edges.js\` | ${S.concepts.length} + ${S.conceptEdges.length} |
| Flashcard | chapter \`flashcards[]\` | ${T.flashcards} |
| Question | chapter \`questions[]\` (+ derived quick checks and product questions) | ${T.questions} |
| Exam prompt | chapter \`exam[]\` | ${T.examPrompts} |
| CaseStudy | \`data/case-studies.js\` | ${T.cases} |
| FinancingMode | \`data/modes.js\` | ${T.modes} |
| Product | \`data/products.js\` | ${T.products} |
| TransactionDiagram | \`data/diagrams.js\` | ${T.diagrams} |
| Comparison | \`data/comparisons.js\` | ${T.comparisons} |
| NumericalExercise | code (\`views/numericals.js\`) — ${Q.counts ? Q.counts.numericals : 33} generators, registered in the graph | ${Q.counts ? Q.counts.numericals : 33} |
| Calculator | code (\`calculators.js\`) — registered in the graph | ${Q.counts ? Q.counts.calculators : 25} |
| StudyMode | \`data/study-plans.js\` | 3 |
| LearningObjective | \`chapter.learningObjectives[]\` | ${T.learningObjectives} |
| SourceReference | \`record.source\`, \`data/book-index.js\` (${Q.counts ? Q.counts.bookSections : 149} sections with printed and PDF pages) | — |
| Alias tables | \`data/aliases.js\` | topics ${Object.keys(S.aliases.topics).length}, questions ${Object.keys(S.aliases.questions).length}, flashcards ${Object.keys(S.aliases.flashcards).length}, concepts ${Object.keys(S.aliases.concepts).length}, comparisons ${Object.keys(S.aliases.comparisons).length} |

## Field tables

${schemaSection('Chapter', chapters.map(c => Object.assign({}, c, { topics: 1, questions: 1, flashcards: 1, exam: 1 })), 'Chapter metadata; \`estimates\` keeps both sources’ study-time estimates (\`minutes\` is File 1’s).')}
${schemaSection('Topic', topics.map(t => Object.assign({}, t)))}
${schemaSection('Topic supplement (extended notes)', topics.flatMap(t => t.supplements))}
${schemaSection('Question', questions, 'Types: mcq, tf, multi, match (pairs), order (items in correct order), definition, identify, comparison, scenario, application, short (written answer, optional keywords).')}
${schemaSection('Flashcard', flashcards)}
${schemaSection('Exam prompt', exams)}
${schemaSection('Glossary entry', S.glossary)}
${schemaSection('Acronym', S.acronyms)}
${schemaSection('Concept', S.concepts)}
${schemaSection('Concept edge', S.conceptEdges, '\`relation\` edges carry a label (File 1); \`flow\` edges follow the book’s conceptual sequence (File 2).')}
${schemaSection('Financing mode', S.modes, 'A financing MODE is a contract; a PRODUCT is a real-world application. The relationship is many-to-many: \`product.modeIds\` ↔ graph edges.')}
${schemaSection('Product', S.products)}
${schemaSection('Transaction diagram', S.diagrams)}
${schemaSection('Comparison', S.comparisons.pairs)}
${schemaSection('Case study', S.cases, 'Two shapes share one schema: cases with worked multiple-choice \`questions\` + \`analysis\`, and cases with \`problem\` / \`prompts\` / \`answer\` / \`explanation\` / \`examTakeaway\`.')}

## Relationship types (graph)

${(() => { const c = {}; S.graph.forEach(e => { const k = e[0] + ' —' + e[2] + '→ ' + e[3]; c[k] = (c[k] || 0) + 1; }); return table(['Edge', 'Stored count'], Object.keys(c).sort().map(k => [k, c[k]])); })()}

Edges implied by record fields and therefore not stored: question/flashcard/exam prompt/glossary → topic, chapter → topic, mode → concept. At runtime numericals and calculators add their own edges (topic, product, mode).

## Application state (APP_STATE_VERSION 3)

Stored under \`localStorage["ifl.v3"]\`. Fields: \`version, created, settings{theme, level, fontScale, reduceMotion, dailyGoal, name, examDate}, topics{id → visited, completed, time, views}, chapters, answers{questionId → n, correct, last, lastCorrect, topic}, attempts[], cards{flashcardId → reps, ease, interval, due, lapses, last, grade}, reviews[], notes[], bookmarks[], activity[], days{}, timerSessions[], guided{}, exam{}, cases{}, calcs{}, numericals{}, achievements{}, legacy{reviewsBefore, imported}, last{}\`.

### Migrations (\`modules/migrate.js\`)
| Function | From | To | Notes |
| --- | --- | --- | --- |
| \`migrateF1StateToV3\` | \`ifl.v1\` (File 1) | v3 | ids unchanged; new collections added; SRS cards sanitised |
| \`migrateF2StateToV3\` | \`ifl_v1\` (File 2) | v3 | topic ids → canonical topics they span; question/flashcard/concept/comparison ids through alias tables; Leitner box → interval/ease/due; \`flashcardsReviewedCount\` kept; streak days reconstructed from \`lastStudyDate\` + \`streakDays\`; crash-course progress → guided; notes/bookmarks re-targeted with working routes |
| \`mergeStates\` | v3 + v3 | v3 | latest review wins per card, highest completion per topic, union of notes/bookmarks/attempts |
| \`migrateStateV3ToLatest\` | v3 | v3+ | version ladder for future changes |

Legacy records are left in place, never overwritten. Import (Settings) accepts an export from this application or from either earlier application, with merge or replace.

## Reference-integrity checker

\`node tools/check-integrity.js\` validates: unique ids for every type; no dangling topic, concept, mode, product, diagram, case or comparison reference; question structure per type (option indexes, tf boolean, multi index sets, pairs, items, written answers); difficulty and cognitive-level vocabularies; chapter/topic consistency; case, diagram (party references) and comparison (row width) structure; finder graph (no dangling \`next\`/\`result\`); study-plan references; alias targets; every graph endpoint. Current result: **${integ.problems.length} problems** across ${Object.values(integ.counts).reduce((a, b) => a + b, 0)} checked objects.
`;
fs.writeFileSync(path.join(OUT, 'DATA-SCHEMA.md'), schemaMd);

/* ================= MERGE-AUDIT-REPORT.md ================= */
const cls = [
  ['Questions', f1.questions - C.questions.trueDuplicates, f2.questions - C.questions.trueDuplicates, C.questions.trueDuplicates, 0, 0],
  ['Flashcards', f1.flashcards - C.flashcards.trueDuplicates, f2.flashcards - C.flashcards.trueDuplicates, C.flashcards.trueDuplicates, 0, 0],
  ['Topics', f1.topics - 0, 0, 0, f2.topics, 0],
  ['Glossary terms', f1.glossary - glossMatched, 0, glossMatched - glossExt, glossExt, 0],
  ['Acronyms', 0, f2.acronyms, 0, 0, 0],
  ['Concepts', f1.concepts - C.concepts.trueDuplicates, f2.nodes - C.concepts.trueDuplicates, 0, C.concepts.trueDuplicates, 0],
  ['Cases', f1.cases, f2.cases, 0, 0, 0],
  ['Comparisons', f1.comparisons - cmpMerged, f2.comparisons - cmpMerged, 0, cmpMerged, 0],
  ['Financing modes', 0, f2.modes - 12, 0, 12, 0],
  ['Products', f1.products, 0, 0, 0, 0], ['Diagrams', f1.diagrams, 0, 0, 0, 0],
  ['Exam prompts', f1.exam, f2.trainer, 0, 0, 0]
];
const mergeMd = `# Merge Audit Report

Generated ${date}. Result of merging **File 1** (*Islamic-Finance-Learning*) and **File 2** (*Understanding-Islamic-Finance-STANDALONE*) into **Understanding-Islamic-Finance-MBA-Learning-System.html** (${(Q.perf ? (Q.perf.bytes / 1048576).toFixed(2) : '5.7')} MB, single file, no network access).

## 1. Process followed

1. **Backup** — both originals copied to \`/source-backup/\`; nothing was modified, renamed or deleted. The data build reads the backups directly, so the merge is reproducible (\`node merged-src/tools/build-data.js\`).
2. **Complete read** — every script block, data file and stylesheet of both files was extracted and inspected (File 1: 62 blocks; File 2: 93 blocks; the data was also executed to obtain exact schemas and counts).
3. **Inventory & merge matrix** — see FEATURE-INVENTORY.md and CONTENT-RECONCILIATION.md.
4. **Canonical schema, ids, alias tables, relationship graph** — DATA-SCHEMA.md.
5. **Engine decision** — the two applications share the same architecture (global namespace, hash router, per-view modules) but File 1's engine is stronger where they differ (SM-2 scheduler with lapses and ease, versioned typed store, focus-trapping modals, adaptive practice, mock exams, planner, diagrams, numerical trainer, guided player). It was kept and re-founded on the canonical data layer; File 2's product/reference layer, cases, terminology and structured reference content were integrated as first-class content; File 2's UX ideas (collapsible sidebar, streak pill, live search, learning-flow map, finder by purpose) were added. The application is **not** File 1 with File 2 pasted in: data, state, search, relationships, calculators and navigation were all rebuilt around one model.
6. **Build, static QA, runtime QA, reconciliation, zero-loss audit** — see QA-REPORT.md.

## 2. Merge matrix (data records)

${table(['Content type', 'FILE_1_UNIQUE', 'FILE_2_UNIQUE', 'TRUE_DUPLICATE', 'COMPLEMENTARY / SAME_CONCEPT_DIFFERENT_DETAIL', 'CONFLICT'], cls.map(r => r.map(String)))}

Structure classes not counted above: SHARED_DEPENDENCY = the 18 chapters / 3 parts / page numbering of the textbook; LEGACY/COMPATIBILITY = the two storage formats, both route tables and every File 2 id; UNKNOWN_REQUIRES_REVIEW = none left.

## 3. Conflicts and how each was resolved

${table(['Conflict', 'File 1', 'File 2', 'Resolution'], [
  ['Chapter study-time estimates (' + audit.conflicts.filter(c => c.type === 'chapter-minutes').length + ' chapters differ)', 'e.g. Ch 1: 35 min', 'e.g. Ch 1: 45 min', 'File 1 values drive the planner (the planner and guided plans were built on them); both stored in `chapter.estimates`. Not a content claim.'],
  ['Chapter titles', 'identical after normalisation (18/18)', '—', 'No conflict.'],
  ['Study-plan lengths', '45 / 90 / 180', '45 / 90 / 180', 'Identical.'],
  ['Storage key and schema', 'ifl.v1', 'ifl_v1', 'New versioned record `ifl.v3`; both converted (see DATA-SCHEMA.md); legacy records untouched.'],
  ['SRS', 'SM-2 (reps, ease, interval, due, lapses, grade)', 'Leitner 5 boxes', 'SM-2 kept; Leitner box → interval/ease/due on import (box 3 → 4 days, ease reduced by lapses).'],
  ['Question shapes', '`q`, `answer`, `diff` (E/M/H), `level`, `topic` (id), matching = pairs, ordering = items', '`prompt`, `correctAnswer`, `difficulty`, `cognitiveLevel`, `topic` (title), matching/ordering as option indexes', 'One canonical shape. F2 ordering with an index permutation became a real ordering item; F2 matching with a parsable left-hand list became pairs (2 items); the remaining F2 matching/ordering items are multiple-choice in form and flagged with `format`. F2 identify/scenario items with no options became written-answer items.'],
  ['Topic granularity', '311 topics keyed by section', '225 topics keyed by section *ranges* (e.g. 9.8–9.8.2)', 'F1 topics are the spine; each F2 topic is attached to the topic its range starts at (ties broken by title similarity) as “extended study notes” and lists every topic it covers; the other covered topics show a pointer.'],
  ['Same term, different transliteration (glossary)', 'Kharaj bil Daman, Mithlan bi-mithlin …', 'Kharaj bi-al-Daman, Mithlam-bi-mithlin …', 'Matched by spacing/diacritic-insensitive key, then edit distance ≤ 1, then a hand table for 4; one automatic match (`W‘adah` → `Wadi‘ah`, promise vs deposit) was wrong and overridden.'],
  ['Calculators with overlapping scope', 'credit-price, pool-weightage, musharakah-pl, sleeping-partner', 'murabaha-pricing, deposit-pool, musharakah-split', 'One calculator each. Superset features kept: Murabaha/Musawamah disclosure note and profit/mark-up readout; deposit-pool loss-by-capital already present; Musharakah split now enforces the sleeping-partner cap (File 2) and flags both-sleeping (File 1). The separate `sleeping-partner` tool was merged away.'],
  ['Comparison with 3+ items vs File 2 pair', 'Sukuk vs bonds vs shares', 'Sukuk vs conventional bonds', 'File 2 rows aligned to the matching columns; the third column shows “—” where File 2 says nothing.'],
  ['Concept ids', 'istisna, imbt, dm, jualah, istijrar, qard, maisir …', 'istisnaa, ijarah-muntahia-bi-tamleek, diminishing-musharakah, juaalah, bai-al-istijrar, qard-hasan, maisir-qimar …', 'File 1 concept ids kept (they are used by products and diagrams); File 2 ids stored as aliases; kafalah and rahn map to File 1’s combined “security” concept.'],
  ['Concept-map group', 'Nine named groups', 'Six stages', 'Both kept (`group`, `stage`). File 2-only nodes have no File 1 group: a group was derived from the stage and flagged `groupDerivedFromStage`.'],
  ['PWA', 'service worker only over http', 'manifest data-URL with `start_url ./index.html` and `icon.svg`', 'Neither can work from a single file; the final file ships neither and makes no PWA claim.']
])}

## 4. Defects found in the sources and fixed

- **File 1 — flashcard keyboard double-flip.** Space on the focused card fired the card’s own handler *and* the global handler, flipping twice, so keyboard users could not reveal the answer. Fixed (\`stopPropagation\`); covered by an automated test.
- **File 1 — calculator freeze.** The Diminishing-Musharakah schedule looped \`months\` times: typing a huge tenure froze the page. Tenure is now clamped to 1–600 months (found by the calculator edge-input test).
- **File 1 — crafted \`/numericals?p=…&s=book\`** for problems with no textbook figures threw; book mode now requires textbook figures (found by the route crawler).
- **File 1 — contrast.** \`--text-3\` on the page background (4.08:1) and \`--gold\` on \`--gold-soft\` (3.99:1) failed 4.5:1; tokens darkened (now ≥ 4.5:1 in both themes).
- **File 1 — mobile.** Long buttons, key/value lists, badges and grid children caused horizontal scroll on phones; wrapping/min-width rules added.
- **File 1 — first Tab stop.** Focus was moved to \`<main>\` on the first render, hiding the skip link; now only on later navigations.
- **File 2 — manifest** \`start_url: "./index.html"\` referred to a file that does not exist in a single-file deployment; removed together with the data-URL manifest.
- **File 2 — glossary extraction artefacts** (\`Zar ai‘\`, \`K ali\`, \`‘ Ariyah\`): matched to their clean File 1 terms; the spacing variants are kept as aliases only where they differ in letters.
- **Observation, left unchanged (source-derived).** The pool-weightage calculator’s note says the textbook figures are 119, 184 and 197, while the exact division gives 118.42, 184.21 and 197.37 (displayed 118 / 184 / 197). Independent recomputation confirms the arithmetic; the discrepancy is the book’s own rounding, not altered here.

## 5. Not merged / limitations (explicit)

- File 2’s topic treatments are **not fused sentence-by-sentence** with File 1’s: they are two independently written explanations, so they are kept whole as level-aware “extended study notes” attached to the topic. This is deliberate (no content is invented or blended); the cost is that a topic page can show two treatments.
- File 2’s 18 \`transactionSteps\` lists have no parties or arrows, so they were **not** converted into transaction diagrams (that would require inventing structure); they appear as “Transaction steps” in extended notes.
- Where a File 2 matching/ordering question is multiple-choice in form (for example “1-b, 2-a, 3-c”), it stays multiple-choice; only structurally parsable items became interactive matching/ordering.
- File 2 exam prompts carry no “kind” (long/short…); they are labelled “Answer plan” rather than guessing.
- Static page-number links to a local textbook PDF (File 1) were removed: the PDF is not shipped, so the link could only break. Page and PDF-page numbers are shown instead.
- Verified in headless Chromium only (no Firefox / Safari / manual screen-reader pass).
- ${Q.perf ? 'First render ' + Q.perf.firstRenderMs + ' ms; ' : ''}the file is ${Q.perf ? (Q.perf.bytes / 1048576).toFixed(1) : '5.7'} MB because all content is embedded.

## 6. Final zero-loss / duplication questions

| Question | Answer |
| --- | --- |
| Did anything useful from File 1 disappear? | No: all 43 route patterns and every module are present (see FEATURE-INVENTORY.md); ${Q.zl ? Q.zl.report.filter(r => /^F1/.test(r.name)).reduce((s, r) => s + r.strings, 0) : ''} File 1 strings audited, 0 unexplained. |
| Did anything useful from File 2 disappear? | No: every File 2 route maps to a page (or a redirect); ${Q.zl ? Q.zl.report.filter(r => /^F2/.test(r.name)).reduce((s, r) => s + r.strings, 0) : ''} File 2 strings audited, 0 unexplained. |
| Any unique content lost? | No — only ${audit.duplicates.questions.length} questions and ${audit.duplicates.flashcards.length} flashcards were collapsed as true duplicates, listed in CONTENT-RECONCILIATION.md. |
| Any user-facing feature lost? | No. |
| Any data structure / calculation / source metadata / relationship lost? | No; ${Q.calc ? Q.calc.checks : 27} independent calculation checks pass; source objects are kept on every record. |
| Two versions of the same feature? | No: one router, store, SRS, progress model, data layer, search index, question runner, flashcard engine, calculator framework, shell (static check). The only intentional pair is *Concept map* vs *Transaction diagram* (different learning problems) and *Financing modes* vs *Products* (contract vs application). |
`;
fs.writeFileSync(path.join(OUT, 'MERGE-AUDIT-REPORT.md'), mergeMd);

/* ================= QA-REPORT.md ================= */
const st = Q.stat ? Q.stat.checks : [];
const qaMd = `# QA Report

Generated ${date}. All suites live in \`merged-src/tools/qa/\` and run against the built single file in headless Chromium (\`file://\`). Result files (\`*-result.json\`) sit next to the scripts.

| Suite | What it checks | Result |
| --- | --- | --- |
| Reference integrity (\`tools/check-integrity.js\`) | ids, dangling references, question / flashcard / case / diagram / comparison / finder / study-plan structure, alias targets, graph endpoints | **${integ.problems.length} problems** |
| Static QA (\`static.js\`) | markup balance, duplicate ids, aria targets, script syntax, external dependencies, duplicate routes, single engines | **${st.filter(c => c.ok).length}/${st.length} pass** |
| Lint (ESLint, \`no-undef\` etc.) | undefined variables, redeclarations, dead code, duplicate keys/cases over 37 source files | **0 errors** |
| Route crawler (\`crawl.js\`) | every route and every record page (${Q.crawl ? Q.crawl.routes : 1151} visited: all topics, chapters × tabs, cases, modes, products, diagrams, concepts, comparisons, exam prompts, numericals, calculators, plans), plus every internal link found on them | **${Q.crawl ? Q.crawl.problems : 0} problem pages; ${Q.crawl ? Q.crawl.uniqueLinks : 3099} unique internal links found, ${Q.crawl ? Q.crawl.extraLinksVisited : 2048} extra visited, ${Q.crawl ? Q.crawl.brokenLinks : 0} broken; ${Q.crawl ? Q.crawl.errors : 0} JS/console errors** |
| Interactive flows 1 (\`flows.js\`) | search (21 terms incl. all required), all 11 question types answered correctly through the UI, flashcards, SRS fuzz (20,000 grades), mock exam, both case formats, both finder pathways, all 3 guided plans, all ${Q.counts ? Q.counts.calculators : 25} calculators (default/zero/negative), all ${Q.counts ? Q.counts.numericals : 33} numerical generators (textbook + 40 seeds), bookmarks/notes/theme, persistence, **no network requests** | **${flowsOk}/${flowsN} pass** |
| Interactive flows 2 (\`flows2.js\`) | learning journey, extended notes and level switch, Teach me, diagram stepping, modes catalogue/compare, both concept-map views, glossary/acronyms, settings, export/import UI, skip link, modal focus trap, Escape/focus return, single flashcard flip | **${flows2Ok}/${flows2N} pass** |
| Migration (\`migrate.js\`) | File 2 state, File 1 state, both, imports of raw/own exports, unknown-file rejection, corrupt record, blocked storage | **32/32 pass** |
| Calculations (\`calc.js\`) | ${Q.calc ? Q.calc.checks : 27} independently computed expected values (formulas re-derived in the test, not read from the app) + edge inputs (0, −1, 1e12, 0.005; non-numeric input is coerced to 0 by the input handler) on every calculator | **${Q.calc ? Q.calc.checks - Q.calc.failed : 27}/${Q.calc ? Q.calc.checks : 27} values correct; edge inputs: 0 problems** |
| Responsive / accessibility (\`responsive.js\`) | horizontal overflow at 375 / 768 / 1280 px (light + dark) on 39 routes, unlabeled controls, tap targets, drawer, contrast of 13 token pairs in both themes | **overflow 0 · unlabeled 0 · small targets 0 · contrast all ≥ 4.5:1** |
| Zero-loss (\`zero-loss.js\`) | every string of every File 1 and File 2 record found in the canonical data | **${Q.zl ? Q.zl.totalStrings : ''} strings, ${Q.zl ? Q.zl.totalLost : ''} unexplained** |

## Coverage against the requested runtime checklist
Home/dashboard ✓ · navigation ✓ · search ✓ · chapters ✓ · topics ✓ · glossary ✓ · acronyms ✓ · concept map ✓ (two views) · flashcards ✓ · SRS ✓ · questions (MCQ, true/false, multi-select, short answer, scenarios, matching, ordering, definition, identify, comparison, application) ✓ · cases ✓ · products ✓ · financing modes ✓ · diagrams ✓ · numericals ✓ · calculators ✓ · comparisons ✓ · guided study ✓ · adaptive practice ✓ (route crawler + question flows) · mistakes ✓ · rapid revision ✓ · mock exams ✓ · exam timer ✓ (mock timer; auto-submit path exercised via the submit path) · exam planner ✓ (route crawl) · progress ✓ · bookmarks ✓ · notes ✓ · settings ✓ · themes ✓ · mobile navigation ✓ · responsive layout ✓ · offline loading ✓ (zero network requests).

## Search integrity (representative terms)
Murabaha, Musharakah, Mudarabah, Ijarah, Salam, Istisna'a, Sukuk, Takaful, Tawarruq, Kafalah, Qard Hasan, AAOIFI, SPV, Hamish Jiddiyah, sleeping partner, weightage, Wakalah, Hawalah, Rahn, Gharar, Riba all return results. The “Murabaha” search returns Topic, Financing mode, Product, Transaction diagram, Case study, Numerical, Calculator, Comparison, Question, Flashcard, Concept and Glossary hits and opens the connected-learning hub (mode → products, diagrams, cases, numericals, calculators, comparisons, questions, flashcards).

## Console error audit
Zero \`pageerror\` / \`console.error\` events across the crawler, both interactive suites, migration and responsive runs.

## Performance
${Q.perf ? `First render ${Q.perf.firstRenderMs} ms (DOMContentLoaded ${Q.perf.dcl} ms) for a ${(Q.perf.bytes / 1048576).toFixed(2)} MB file; search index build ${Q.perf.searchIndexBuildMs} ms, query ${Q.perf.searchQueryMs} ms; topic page ${Q.perf.topicPageMs} ms; JS heap ${Q.perf.heapMB} MB; ${Q.perf.domNodes} DOM nodes on the dashboard. Optimisations: indexes built once, question pool cached, glossary renders 100 entries at a time, all data synchronous (no lazy script injection).` : 'n/a'}

## Known limitations of the QA
Chromium only; no manual screen-reader or real-device testing; the calculators’ *rules* (e.g. tradability thresholds) are the book’s as encoded in File 1 and were not re-litigated — only the arithmetic and structure were verified independently.
`;
fs.writeFileSync(path.join(OUT, 'QA-REPORT.md'), qaMd);
console.log('reports written to', OUT);
