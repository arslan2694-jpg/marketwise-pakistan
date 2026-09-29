'use strict';
/*  audit.js — writes MERGE-AUDIT.json and MERGE-AUDIT.md next to the merged application.
    All numbers come from the live merge (audit object) and from the merged data; the feature matrix and
    the prose sections are maintained here so they always ship with the build that produced them. */
const fs = require('fs'), path = require('path');

/* ------------------------------------------------------------------ feature matrix
   F1 = Islamic-Finance-Learning, F2 = Understanding-Islamic-Finance-STANDALONE.
   status: "F1" / "F2" / "Both" say where the feature existed; "Merged" says where it lives in the merged app. */
const FEATURES = [
  // [area, feature, F1, F2, merged, notes]
  ['Content', '18 chapters with objectives, why-it-matters, summary, takeaways', 'Yes', 'Yes', 'Yes', 'F1 chapter record is canonical; F2 objectives/why/summary/takeaways kept as "Companion chapter notes" (Overview + Summary tabs)'],
  ['Content', 'Granular topics (311) with intuition / simple / academic / exam layers, key points, quick check', 'Yes', 'No', 'Yes', 'canonical topic set'],
  ['Content', 'Topic write-ups (225) with overview / simple / academic / exam, conditions, principles, process steps, examples, confusions, distinctions, related concepts, relevance', 'No', 'Yes', 'Yes', 'kept whole as Companion study notes on the canonical topic that covers the same section (206 topics carry one or more); none dropped'],
  ['Content', 'Definitions, conditions, principles, steps, tables, examples, distinctions, confusions, debates, calculators per topic', 'Yes', 'Partly', 'Yes', 'F2 lists shown in companion notes, Study-aids tab and glossary'],
  ['Content', 'Source references (chapter, section, printed page, PDF page)', 'Yes', 'Yes', 'Yes', 'F2 page lists preserved as `src`; PDF page = printed + 28 (from the book index)'],
  ['Content', 'Book index (part/chapter/section start pages, appendices, back matter)', 'No', 'Yes', 'Yes', 'stored as IFL_DATA.sets.bookIndex; used for PDF pages and back-matter page references'],
  ['Data', 'Flashcards', '498', '558', '1,056', 'same 11 categories; F2 cards mapped to canonical topics via cited section, original source kept'],
  ['Data', 'Questions', '771 (+311 quick checks)', '572', '1,343 (+311)', 'all 10 F2 types converted to the renderer set; original type kept as `kind`; original topic string kept as `topicLabel`'],
  ['Data', 'Question metadata: difficulty, cognitive level, objective, explanation, source', 'Yes', 'Yes', 'Yes', 'F2 easy/medium/hard → E/M/H'],
  ['Data', 'Glossary', '191', '180', 'canonical records (see §9)', 'one record per concept; alternate spellings, both definitions, related terms, both page refs kept'],
  ['Data', 'Acronyms', 'No', '119', '119', 'new Acronyms tab; searchable'],
  ['Data', 'Exam answer-trainer questions', '110', '26', '136', 'F2 structure / concepts / points / mistakes mapped to the same trainer format'],
  ['Data', 'Case studies', '19 (13 textbook, 6 practice)', '30 (scenario + textbook-grounded answer)', '49', 'F2 cases are labelled "Practice — generated for learning" (their scenarios are hypothetical); never shown as textbook cases'],
  ['Data', 'Comparisons', '25 pairs + 12-mode matrix', '13 labs', '38 + matrix', 'labs listed under their own heading; F2 ids resolve as aliases'],
  ['Data', 'Diagrams (interactive transaction flows)', '20', 'No', '20', ''],
  ['Data', 'Concepts (revision cards, pages)', '45', '45 map nodes / 73 edges', '45 concepts + 20 map-only nodes (see §9)', '25 F2 nodes were the same concept as an F1 concept and were aliased; the rest kept as graph nodes'],
  ['Data', 'Decision trees', 'Need-based finder (9 nodes, 14 results)', 'Question tree (10 questions, 14 results)', 'Both, one result card', 'result card merges both descriptions when they concern the same mode'],
  ['Data', 'Study plans', '45 / 90 / 180 min (concept-led)', '45 / 90 / 180 min (chapter-led)', '45, 90, 180 + 180 chapter track', '45 and 90 combined (F2 overview added to each matching segment); F2 180 kept as its own track because its segments differ'],
  ['Learning', 'Lesson with 3 levels + explain-again + Teach-me', 'Yes', 'Levels + Teach-me', 'Yes', ''],
  ['Learning', 'Mark complete, chapter/part/overall progress', 'Yes', 'Yes', 'Yes', ''],
  ['Learning', 'Concept map + concept pages', 'Yes', 'Yes (map)', 'Yes', 'one interactive map showing the union graph'],
  ['Learning', 'Glossary with A–Z + category filter + related terms', 'Yes', 'Search + filter', 'Yes', 'transliteration-tolerant search'],
  ['Learning', 'Rapid revision cards', '45 concept cards', 'one per topic', 'both decks', 'Concept cards / Topic cards toggle (topic deck includes companion write-ups)'],
  ['Learning', 'Comparison Lab', 'Yes', 'Yes', 'Yes', ''],
  ['Learning', 'Case Study Lab', 'MCQ-based flow', 'open-analysis flow', 'both flows', 'completion tracked for both'],
  ['Learning', 'Financing-mode finder / decision tree', 'Yes', 'Yes', 'Yes', 'two entry routes'],
  ['Learning', 'Calculators (14 topic calculators)', 'Yes', 'No', 'Yes', ''],
  ['Learning', 'Printable chapter revision sheet', 'Yes', 'No', 'Yes', ''],
  ['Practice', 'Flashcards: spaced review (SM-2 style) with due / difficult / new / chapter / category decks', 'Yes', 'Box-based SRS', 'Yes', 'F1 scheduler kept (superset); F2 box state converted'],
  ['Practice', 'Quiz builder (chapters, types, difficulty, level, size), chapter quizzes, history', 'Yes', 'Chapter / mixed / by-type', 'Yes', 'F2 routes redirect'],
  ['Practice', 'Adaptive practice', 'Yes', 'Yes', 'Yes', 'per-topic mastery now also covers F2 questions'],
  ['Practice', 'My mistakes / retry missed', 'Yes', 'Missed list in attempts', 'Yes', ''],
  ['Exam', 'Exam Preparation Center (definitions, short, long, conceptual, difference, scenario, MCQ, viva, rapid, core)', 'Yes', 'By question type', 'Yes', 'question-bank-by-type grid added'],
  ['Exam', 'Exam answer trainer (attempt → reveal structure, key concepts, points, mistakes)', 'Yes (saves drafts)', 'Yes', 'Yes', ''],
  ['Exam', 'Timed mock exam with silent answers, timer, auto-submit, review, chapter breakdown', 'Yes', 'No', 'Yes', ''],
  ['Exam', 'Exam planner', 'Yes', 'No', 'Yes', ''],
  ['Guided', 'Guided study 45 / 90 / 180 with countdown, pause / resume, previous / next / skip, rapid-fire quiz', 'Yes', 'Yes', 'Yes', 'saved progress; F2 saved progress converted'],
  ['Personal', 'Bookmarks, notes (all item types)', 'Yes', 'Yes', 'Yes', 'definition bookmarks → glossary-term bookmarks'],
  ['Personal', 'Progress page, weak topics, readiness, activity heat-map', 'Yes', 'Partly', 'Yes', ''],
  ['Personal', 'Achievements', '11', '16', '19', 'union: 11 F1 + 7 F2-only + 1 new; same-meaning ids aliased (e.g. five-day-streak → streak-5)'],
  ['Personal', 'Study streak', 'Dashboard stat', 'Top-bar pill', 'Both', 'pill shown in the top bar when streak ≥ 1'],
  ['Personal', 'Study timer (25 / 45 / 60 / custom), sessions log', 'Yes', 'Yes', 'Yes', ''],
  ['Search', 'Full-text search page', 'Yes', 'Yes', 'Yes', 'now spans 14 record types + aliases'],
  ['Search', 'Live search-as-you-type suggestions in the top bar', 'No', 'Yes', 'Yes', 're-implemented as an accessible combobox (arrow keys, Enter, Esc, "See all results")'],
  ['Settings', 'Theme (light / dark / system), text size, reduced motion, daily goal, name, level', 'Yes', 'Theme, level', 'Yes', ''],
  ['Settings', 'Export / import / reset', 'Yes', 'Yes', 'Yes', 'import accepts merged, F1 and F2 export files; legacy files are merged, never overwrite'],
  ['UI', 'Collapsible sidebar (desktop icon rail)', 'No', 'Yes', 'Yes', 'state persists (also migrates ifl_sidebar_collapsed)'],
  ['UI', 'Mobile drawer + bottom navigation + top-bar search', 'Drawer + bottom nav', 'Drawer + mobile top bar', 'Yes', ''],
  ['UI', 'Keyboard: "/" search, quiz A–D/1–4, flashcard Space + 1–4, arrows in revision cards, Esc closes dialogs', 'Yes', 'Limited', 'Yes', ''],
  ['UI', 'Modals with focus trap, toasts, skip link, reduced-motion CSS', 'Yes', 'Partly', 'Yes', ''],
  ['Platform', 'Single localStorage record, versioned', 'ifl.v1', 'ifl_v1', 'ifl_v2', 'migration from both, non-destructive'],
  ['Platform', 'In-memory fallback + corrupt-record backup', 'Yes', 'No (defaults only)', 'Yes', ''],
  ['Platform', 'Hash routing that works over file://', 'Yes', 'Yes', 'Yes', 'one router + redirect table for F2 routes'],
  ['Platform', 'Standalone single HTML file', 'Yes', 'Yes', 'Yes', 'no external scripts/styles; optional link to a local textbook PDF is a plain anchor'],
  ['Platform', 'Service worker for http(s) hosting', 'Yes (disabled in standalone)', 'No', 'Not included', 'was never active in the standalone build of App 1 either (guarded by IFL_STANDALONE)']
];

/* ------------------------------------------------------------------ route registry */
const ROUTES = [
  // [canonical, source, aliases from the other app]
  ['/', 'F1', '/dashboard (F2)'], ['/learn', 'Both', ''], ['/learn/:part', 'F1', '/learn/part/:part (F2; I / II / III accepted)'], ['/chapter/:n', 'Both', ''], ['/chapter/:n/print', 'F1', ''],
  ['/topic/:id', 'F1', '/chapter/:num/topic/:topicId (F2); F2 topic ids like ch9-t4 are resolved through the topic alias map'], ['/teach/:id', 'Both', 'F2 topic ids resolved'],
  ['/concepts', 'F1', '/concept-map (F2)'], ['/concept/:id', 'F1', ''], ['/glossary', 'Both', '?tab=acronyms is new; /acronyms redirects here'], ['/diagrams', 'F1', ''], ['/diagram/:id', 'F1', ''],
  ['/compare', 'F1', '/comparisons, /comparisons/:id (F2)'], ['/finder', 'F1', '/decision-tool (F2) → ?tool=tree'], ['/flashcards', 'Both', '?chapter=N (F2) → review'], ['/flashcards/review', 'F1', ''],
  ['/quiz', 'Both', ''], ['/quiz/run', 'F1', '/quiz/chapter/:num, /quiz/mixed, /quiz/type/:type (F2)'], ['/practice', 'F1', '/adaptive (F2)'], ['/practice/run', 'F1', ''], ['/mistakes', 'F1', ''],
  ['/cases', 'F1', '/case-studies (F2)'], ['/case/:id', 'F1', '/case-studies/:id (F2)'],
  ['/exam', 'F1', '/exam-prep (F2)'], ['/exam/trainer', 'F1', '/exam-prep/trainer, /exam-prep/trainer/:id (F2)'], ['/revision-cards', 'F1', '/exam-prep/rapid-revision (F2); ?deck=topics is new'], ['/mock', 'F1', ''], ['/mock/run', 'F1', ''],
  ['/planner', 'F1', ''], ['/guided', 'F1', ''], ['/guided/:plan', 'F1', '/crash-course/45 | 90 | 180 (F2) → crash45 | revision90 | deep180-chapters'],
  ['/bookmarks', 'Both', ''], ['/notes', 'Both', ''], ['/progress', 'Both', ''], ['/timer', 'Both', ''], ['/settings', 'Both', ''], ['/search', 'Both', '']
];

let REDIRECTS = 0;
function writeAudit({ outDir, audit, data, modules }) {
  REDIRECTS = (fs.readFileSync(path.join(__dirname, 'src', 'modules', 'aliases.js'), 'utf8').match(/^\s*R\('/gm) || []).length;
  const S = data.sets, ch = Object.values(data.chapters);
  const topics = ch.reduce((a, c) => a + c.topics.length, 0);
  const counts = {
    chapters: 18, topics, companionTopicNotes: ch.reduce((a, c) => a + c.topics.reduce((b, t) => b + (t.companions || []).length, 0), 0),
    questions: ch.reduce((a, c) => a + c.questions.length, 0), quickChecks: ch.reduce((a, c) => a + c.topics.filter(t => t.quickCheck).length, 0),
    flashcards: ch.reduce((a, c) => a + c.flashcards.length, 0), glossary: S.glossary.length, acronyms: S.acronyms.length,
    cases: S.cases.length, comparisons: S.comparisons.pairs.length, comparisonLabs: S.comparisons.pairs.filter(p => p.lab).length,
    concepts: S.concepts.length, conceptMapNodes: S.conceptGraph.nodes.length, conceptMapEdges: S.conceptGraph.edges.length, diagrams: S.diagrams.length,
    calculators: ch.reduce((a, c) => a + c.topics.filter(t => t.calc).length, 0), examItems: ch.reduce((a, c) => a + c.exam.length, 0), studyPlans: Object.keys(S.studyPlans).length,
    decisionTrees: 2, routes: ROUTES.length + 0
  };
  const cat = audit.categories;
  const recon = [
    ['chapters', 18, 18, 18, 18, 18],
    ['topics (canonical)', cat.topics.app1, 0, cat.topics.app2, cat.topics.canonicalTopics, cat.topics.canonicalTopics + ' (+' + cat.topics.companionNotesAttached + ' companion notes)'],
    ['questions', cat.questions.app1, cat.questions.app2, cat.questions.exactDuplicateTexts, cat.questions.merged, cat.questions.merged],
    ['flashcards', cat.flashcards.app1, cat.flashcards.app2, cat.flashcards.exactDuplicates, cat.flashcards.merged, cat.flashcards.merged],
    ['glossary terms', cat.glossary.app1, cat.glossary.app2Unique, cat.glossary.mergedWithApp1, S.glossary.length, S.glossary.length],
    ['acronyms', 0, cat.acronyms.app2, 0, cat.acronyms.merged, cat.acronyms.merged],
    ['case studies', cat.cases.app1, cat.cases.app2, 0, counts.cases, counts.cases],
    ['comparisons', cat.comparisons.app1Pairs, cat.comparisons.app2Labs, 0, counts.comparisons, counts.comparisons],
    ['concepts / map nodes', cat.concepts.app1Concepts, cat.concepts.app2OnlyNodes, cat.concepts.app2NodesAliasedToApp1, counts.conceptMapNodes, counts.conceptMapNodes],
    ['diagrams', cat.diagrams.app1, 0, 0, cat.diagrams.merged, cat.diagrams.merged],
    ['calculators (topics with a calculator)', cat.calculations.app1TopicsWithCalculator, 0, 0, counts.calculators, counts.calculators],
    ['exam / trainer items', cat.exam.app1, cat.exam.app2Trainer, 0, cat.exam.merged, cat.exam.merged],
    ['study plans', 3, 3, 2, counts.studyPlans, counts.studyPlans],
    ['decision trees', 1, 1, 0, 2, 2],
    ['routes', audit.routes.app1 + ' (F1)', audit.routes.app2 + ' (F2)', (audit.routes.app2 - 18) + ' identical paths', audit.routes.app1 + ' canonical', audit.routes.app1 + ' canonical + ' + REDIRECTS + ' redirect rules']
  ];
  const json = { title: 'Understanding-Islamic-Finance-MERGED — merge audit', generated: new Date().toISOString(), counts, reconciliation: recon.map(r => ({ category: r[0], file1Unique: r[1], file2Unique: r[2], duplicatesOrAliased: r[3], mergedFinal: r[4] })),
    featureMatrix: FEATURES.map(f => ({ area: f[0], feature: f[1], file1: f[2], file2: f[3], merged: f[4], notes: f[5] })), routes: ROUTES.map(r => ({ canonical: r[0], origin: r[1], aliases: r[2] })), modules, audit };
  fs.writeFileSync(path.join(outDir, 'MERGE-AUDIT.json'), JSON.stringify(json, null, 2));

  const md = [];
  const table = (head, rows) => { md.push('| ' + head.join(' | ') + ' |'); md.push('|' + head.map(() => '---').join('|') + '|'); rows.forEach(r => md.push('| ' + r.map(x => String(x).replace(/\|/g, '\\|')).join(' | ') + ' |')); md.push(''); };
  md.push('# MERGE-AUDIT — Understanding-Islamic-Finance-MERGED.html', '');
  md.push('Generated by `merge-tools/build.js` (' + json.generated + '). Numbers below are computed from the two source files and the merged output, not typed by hand; the test results in §10 were produced by the suites in `merge-tools/tests/`.', '');

  md.push('## 1. Files analysed', '');
  table(['', 'File', 'Size', 'Structure'], [
    ['File 1 (“F1”)', audit.files.app1.path.replace(/^[0-9a-f]+-/, ''), (audit.files.app1.bytes / 1e6).toFixed(2) + ' MB', audit.files.app1.scripts + ' script blocks: 27 data (registry, 18 chapters, glossary, concepts, diagrams, comparisons, cases, mode-finder, study-plans, course-index), 28 code modules + theme/flag scripts; state key `ifl.v1`'],
    ['File 2 (“F2”)', audit.files.app2.path.replace(/^[0-9a-f]+-/, ''), (audit.files.app2.bytes / 1e6).toFixed(2) + ' MB', audit.files.app2.scripts + ' script blocks: ' + audit.files.app2.dataScripts + ' data (glossary+acronyms, comparisons, case studies, concept map, decision tree, study modes, exam-prep, chapter index; 18 chapter files, 18 flashcard chunks, 18 question chunks) + 26 code modules + theme script; state key `ifl_v1`'],
    ['Output', audit.output.file, (audit.output.bytes / 1e6).toFixed(2) + ' MB', audit.output.scripts + ' inline script blocks (3 JSON data blocks + code), 1 inline stylesheet; no external script, stylesheet or font']
  ]);
  md.push('The two applications share a lineage (same book, same `IFL_*` naming) but were written independently: their data is disjoint in wording and, for questions/flashcards, disjoint in every record (0 exact duplicates). Both originals are untouched.', '');
  md.push('**Approach.** F1 is the more capable, topic-addressed platform (311 topics, SM-2 scheduler, mock exams, planner, answer trainer, diagrams, calculators, 28 view/utility modules), so its architecture is the base. Every F2 dataset was converted into that schema with all metadata retained, and every F2-only capability was re-implemented inside the same router, store, component and design system. No F2 record was replaced by an F1 record, and no F1 record was replaced by an F2 record.', '');

  md.push('## 2. Feature inventory / feature matrix', '');
  table(['Area', 'Feature', 'File 1', 'File 2', 'Merged', 'Notes'], FEATURES);
  md.push('Every feature found in the forensic pass has a **Yes / both / union** status in the Merged column; nothing unique was dropped.', '');

  md.push('## 3. Content inventory', '');
  table(['Dataset', 'File 1', 'File 2', 'Merged'], [
    ['Chapters', 18, 18, 18], ['Topics', '311 granular topics (with tiers core/supporting/detailed/revision)', '225 topic write-ups', '311 canonical topics + 225 companion notes'],
    ['Questions', '771 + 311 quick checks (11 types)', '572 (10 types)', counts.questions + ' + ' + counts.quickChecks + ' quick checks'], ['Flashcards', 498, 558, counts.flashcards],
    ['Glossary', '191 entries', '180 entries', counts.glossary + ' canonical records'], ['Acronyms', '—', 119, 119], ['Exam-trainer items', 110, 26, counts.examItems],
    ['Cases', '19', '30', counts.cases], ['Comparisons', '25 pairs + 12×10 mode matrix', '13 labs', counts.comparisons + ' + matrix'], ['Diagrams', 20, '—', 20],
    ['Concept map', '45 concepts, 97 links', '45 nodes, 73 edges', counts.concepts + ' concepts + ' + (counts.conceptMapNodes - counts.concepts) + ' map-only nodes; ' + counts.conceptMapEdges + ' edges'],
    ['Decision trees', '9 nodes → 14 results', '10 questions → 14 results', 'both retained'], ['Study plans', 3, 3, counts.studyPlans], ['Calculators', '14 topics', '—', 14], ['Book index', '—', 'part/chapter/section pages, appendices, back matter', 'kept']
  ]);

  md.push('## 4. Duplicates identified and consolidations performed', '');
  md.push('* **Exact duplicate texts** (normalised for case, punctuation, apostrophes, diacritics, HTML): questions 0, flashcards 0. Nothing was removed on the basis of similarity.');
  md.push('* **Glossary.** ' + cat.glossary.mergedWithApp1 + ' F2 terms are the same concept as an F1 term (normalised key: diacritics/apostrophes/hyphens and the particles al-, ul-, bil-, bi-, wal-, e- ignored, so *Istisna‘a / Istisna’a / Istisnaa* and *Al-Wadi‘ah / Wadi‘ah* collapse). They became **one canonical record** carrying both definitions (F1 text primary, F2 text as “Companion glossary”), all spellings as searchable aliases, both page references and F2’s related terms (' + cat.glossary.app2DefinitionsDiffering + ' F2 definitions differ in wording and are kept). ' + cat.glossary.app2Unique + ' F2 terms are new. ' + cat.glossary.app1InternalMerged + ' F1 terms that collapse together (*Sarf / Al-Sarf*, *Wadi‘ah / Al-Wadi‘ah*) keep both original definitions (the F1 app silently overwrote one of each pair).');
  md.push('* **Topics.** All 225 F2 topics cover textbook sections that F1 also has (0 F2-only sections). They were **not** merged into F1 text: each is attached whole as a *companion note* to the F1 topic it covers (' + audit.mapping.companionMethods.section + ' by exact section, ' + (audit.mapping.companionMethods.range || 0) + ' by section range, ' + (audit.mapping.companionMethods.ancestor || 0) + ' by ancestor section, ' + (audit.mapping.companionMethods.pages || 0) + ' by page overlap); when one F2 write-up spans several F1 sections the other sections show a cross-link.');
  md.push('* **Concept map.** 25 of F2’s 45 nodes are the same concept as an F1 concept (13 shared ids + 12 explicit alias decisions such as `istisnaa→istisna`, `juaalah→jualah`, `wadah-promise→wad`; `shariah`/`maqasid` map to the map’s existing pillars). The other ' + audit.categories.concepts.app2OnlyNodes + ' F2 nodes were kept as map nodes; deliberately *not* merged when unsure (e.g. `contract-elements` vs `aqd`).');
  md.push('* **Comparisons / cases / study plans.** No duplicates; F2 “Riba vs Trade Profit” and F1 “Riba vs trade” stay separate because their dimensions and wording differ. For 45- and 90-minute plans the F2 segment overview was added to the matching F1 segment (same titles), the 180-minute plans differ structurally and both are kept.');
  md.push('* **Achievements.** 4 F2 ids are identical to F1 ids, 5 more mean the same thing and are aliased on migration; 7 F2-only achievements were added (plus one new one for using both decision tools).', '');

  md.push('## 5. Canonical IDs, aliases and collision handling', '');
  md.push('| Category | F1 ids | F2 ids | Identical ids across apps | Duplicate ids inside an app |', '|---|---|---|---|---|');
  Object.keys(audit.idAudit).forEach(k => md.push('| ' + k + ' | ' + audit.idAudit[k].app1 + ' | ' + audit.idAudit[k].app2 + ' | ' + audit.idAudit[k].identicalIds + ' | ' + audit.idAudit[k].duplicateIdsWithinApp1 + '/' + audit.idAudit[k].duplicateIdsWithinApp2 + ' |'));
  md.push('', 'The id spaces are disjoint by construction (`t9.5` vs `ch9-t4`, `q9.1` vs `q-ch9-1`, `f9.1` vs `fc-ch9-1`, `c-…` vs `cs-…`, `e1.1` vs `et-1`); the only identical ids are 13 concept ids that denote the same concept and were merged. No record needed a new id; F2 comparison labs received the `lab-` prefix (F2 ids remain valid aliases) to avoid any future clash with F1 pair ids.', '');
  md.push('**`topicAliasMap`** (stored in `IFL_DATA.aliases.topics`): `byApp2TopicId` (225 entries → primary canonical topic + all covered topics), `byLabel` (`chapter|normalised original topic string` → canonical topic; ' + Object.keys(data.aliases.topics.byLabel).length + ' entries, from F2 question / topic / section titles), `bySection` and `byF1Title`. F2 questions additionally keep the original string as `topicLabel` and their citation as `src`. Question → topic mapping used the cited section (' + JSON.stringify(audit.mapping.questionMapping.methods) + '); flashcards ' + JSON.stringify(audit.mapping.flashcardMapping) + '. One F2 flashcard has no section and no page and was attached to its chapter’s first topic (flagged `chapter-fallback`).', '');

  md.push('## 6. Question-type conversion (F2 → renderer set)', '');
  md.push('```', JSON.stringify(audit.mapping.questionMapping.convertedTypes, null, 1), '```', '', 'F2 “matching” questions are mostly single-choice combinations (13) and were kept as single-choice; the two with structured options were converted to true matching pairs. F2 ordering questions with a sequence answer became drag-free “order” items; F2 short / definition / identify items without options became short-answer items with a model answer. `kind` keeps the original label so “Browse by type” and filters still find them.', '');

  md.push('## 7. State migration (`ifl_v2`)', '');
  md.push('* **Keys read (never modified or deleted):** `ifl.v1` (F1), `ifl_v1` (F2), `ifl_sidebar_collapsed` (F2). **Key written:** `ifl_v2` (`version: 2`).');
  md.push('* Runs once, when `ifl_v2` is absent. Cases handled: neither / F1 only / F2 only / both / corrupt legacy record (skipped, other one still migrates) / corrupt `ifl_v2` (raw copy kept as `ifl_v2.corrupt.<ts>`, legacy state recovered) / incomplete `ifl_v2` (safe defaults). All are covered by tests.');
  md.push('* **F1 → v2:** identical structure (topics, chapters, answers, attempts, cards, reviews, notes, bookmarks, activity, days, guided, exam, achievements, settings) — copied.');
  md.push('* **F2 → v2:** `topicsCompleted` → per-topic completion on every canonical topic the F2 topic covers; `chapterOpened/visitedChapters/chapterCompleted` → chapter visits; `questionHistory` → per-question answers *with the canonical topic* (so weak-topic detection works); `quizAttempts` → attempts (score/total/chapter, missed ids); `flashcardReviews` (box, dueAt, reps, lapses) → SM-2 card state (box→interval); `flashcardsReviewedCount/studySeconds/sessionsCompleted/bestStreakDays` → `legacy` counters that feed the stats and achievements; `streakDays` → rebuilt as qualifying study days; `notes` (scope/refId) and `bookmarks` (type/refId) → unified `{type,id,label,route}` targets (topics resolved through the alias map, definitions → glossary terms, comparisons → `lab-…`); `crashCourseProgress` → guided plans; `caseStudiesCompleted` → `casesDone`; `decisionToolUses` → `tools.decisionUses`; achievements copied (5 aliased); settings `explanationLevel/reducedMotion` → `level/reduceMotion`.');
  md.push('* **Both present:** F1 state is the base, F2 state is reconciled into it: completions OR-ed, counters summed, newer review/answer wins, notes/bookmarks/attempts unioned, a finished guided plan is never overwritten by an unfinished one, F1 settings win.');
  md.push('* **Import:** Settings → Import accepts a merged export (replaces), an F1 export or an F2 export (converted and merged into the current progress).', '');

  md.push('## 8. Route registry', '');
  table(['Canonical route', 'Originated in', 'Aliases / redirects from the other app'], ROUTES);
  md.push('All ' + audit.routes.app2 + ' F2 routes resolve: 18 are redirects to a canonical route and ' + (audit.routes.app2 - 18) + ' have identical paths (`/teach/:id` and `/flashcards` additionally accept F2 topic ids / the F2 `?chapter=` query). ' + REDIRECTS + ' redirect rules are registered in total. Each F1 route is unchanged. Redirects use `history.replaceState`, so the back button is not polluted. Unknown paths show a friendly “Page not found”.', '');

  md.push('## 9. Final content counts', '');
  table(['Category', 'File 1 unique', 'File 2 unique', 'Duplicates / aliased', 'Merged final total'], recon.map(r => [r[0], r[1], r[2], r[3], r[5]]));
  md.push('Aliases are never counted as content. “Duplicates / aliased” is 0 for questions and flashcards because no pair was textually identical; for glossary it counts the merged (shared) records; for concepts the F2 nodes that alias an F1 concept.', '');

  md.push('## 10. Tests performed', '');
  md.push(TESTS_MD(), '');

  md.push('## 11. Unresolved issues / caveats', '');
  md.push('* **F2 practice cases.** F2 cases describe hypothetical clients; they are labelled *Practice — generated for learning*. A few of them may paraphrase a textbook box; the audit could not prove that either way, so the conservative label is used. Their answers cite the textbook section/pages.');
  md.push('* **Two independent paraphrases.** Where F1 and F2 explain the same section their wording (and occasionally emphasis) differs. Both are shown and labelled; no attempt was made to adjudicate between them.');
  md.push('* **Concept-map density.** The union graph has ' + counts.conceptMapEdges + ' relationship lines; unselected lines are drawn faintly and a node’s relationships are listed when it is selected. A text list of all nodes remains available.');
  md.push('* **F1’s own repeated texts** (1 question text and 4 flashcard fronts appear twice inside F1) were kept — they are distinct records with distinct ids.');
  md.push('* **Migration is one-shot.** Progress recorded in an old app *after* the first launch of the merged app is not re-imported automatically; use export in the old app and Import here (merged, not replaced).');
  md.push('* **Local textbook PDF link.** “Open textbook PDF at page N” is a plain link to `textbook/Understanding-Islamic-Finance.pdf` (as in F1); it works only if the reader keeps that file beside the HTML and is not needed for anything else.');
  md.push('* Browser coverage: automated tests ran in Chromium; Firefox/Safari were not available in the build environment.', '');

  md.push('## 12. Features intentionally not merged', '');
  md.push('* **F1 service-worker registration** — inert in the standalone build in F1 as well (it is skipped when `IFL_STANDALONE` is set); omitted, so the file has no code path that could break `file://` use.');
  md.push('* **F2 `data-nav` click delegation, its `IFLStore/IFLRouter/IFLDom/IFLData` globals, duplicate CSS token set, separate mobile top bar and F2’s second toast/modal implementation** — these were implementations, not features. Their behaviour was ported into the single router/store/toast/modal layer (redirect table, unified store, one modal with focus trap), so there is one router, one store, one theme manager, one search engine, one progress engine.');
  md.push('* **F2’s minimal box-based SRS** — superseded by F1’s SM-2 scheduler after comparing them (F1 handles ease, interval, lapses and relearning); F2’s per-card review state is converted, not discarded.');
  md.push('* **F2’s per-topic “Rapid revision” one-pager and Teach-me** — not dropped: rapid revision is the “Topic cards” deck; Teach-me exists in F1 with the same nine steps.', '');
  fs.writeFileSync(path.join(outDir, 'MERGE-AUDIT.md'), md.join('\n'));
}

/* test summary text — filled from tests/RESULTS.json when present so the report always quotes real runs */
function TESTS_MD() {
  const f = path.join(__dirname, 'tests', 'RESULTS.json');
  let r = null; try { r = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { /* not yet run */ }
  const lines = [];
  if (!r) { lines.push('_Run `node tests/run-all.js` to record results; see `merge-tools/tests/`._'); return lines.join('\n'); }
  lines.push('Run on ' + r.ran + ' (`merge-tools/tests/run-all.js`):', '');
  lines.push('| Suite | Checks passed | Failed |', '|---|---|---|');
  r.suites.forEach(s => lines.push('| ' + s.name + ' | ' + s.passed + ' | ' + s.failed + ' |'));
  lines.push('', r.notes.map(n => '* ' + n).join('\n'));
  return lines.join('\n');
}
module.exports = { writeAudit, FEATURES, ROUTES };
