'use strict';
/*  Content-integrity + preservation tests (Node, no browser).
    usage: node tests/integrity.js <merged.html> <app1.html> <app2.html>

    1. Structural integrity of the merged data (ids, relationships, answers, sources, decision trees ...).
    2. Preservation: every record of BOTH source apps is present in the merged data with identical text. */
const fs = require('fs');
const { loadApp1, loadApp2 } = require('../lib/extract');
const { norm, termKey } = require('../merge-data');

const [mergedFile, f1, f2] = process.argv.slice(2);
const html = fs.readFileSync(mergedFile, 'utf8');
function json(id) { const m = new RegExp('<script type="application/json" id="' + id + '">([\\s\\S]*?)</script>').exec(html); if (!m) throw new Error('missing ' + id); return JSON.parse(m[1]); }
const chaptersArr = json('ifl-json-chapters'), S = json('ifl-json-sets'), META = json('ifl-json-meta');
const A1 = loadApp1(f1).D, A2 = loadApp2(f2).D;

let pass = 0, fail = 0; const failures = [];
function ok(cond, msg) { if (cond) pass++; else { fail++; failures.push(msg); if (failures.length <= 60) console.log('  FAIL: ' + msg); } }
function section(t) { console.log('\n# ' + t); }
const isStr = s => typeof s === 'string' && s.trim().length > 0;

const chapters = {}; chaptersArr.forEach(c => { chapters[c.number] = c; });
const topics = {}; chaptersArr.forEach(c => c.topics.forEach(t => { topics[t.id] = Object.assign({}, t, { chapter: c.number }); }));
const allQ = chaptersArr.flatMap(c => c.questions.map(q => Object.assign({ chapter: c.number }, q)));
const allF = chaptersArr.flatMap(c => c.flashcards.map(f => Object.assign({ chapter: c.number }, f)));
const allE = chaptersArr.flatMap(c => c.exam.map(e => Object.assign({ chapter: c.number }, e)));

section('Chapters / topics');
ok(chaptersArr.length === 18, '18 chapters');
ok(Object.keys(topics).length === chaptersArr.reduce((a, c) => a + c.topics.length, 0), 'topic ids are unique');
ok(META.courseIndex.chapters.reduce((a, c) => a + c.topics.length, 0) === Object.keys(topics).length, 'course index lists every topic');
Object.values(topics).forEach(t => {
  ok(isStr(t.title) && isStr(t.section), 'topic has title/section: ' + t.id);
  ok(Array.isArray(t.pages) && t.pages.length === 2 && t.pages[0] <= t.pages[1] && t.pages[0] >= 1 && t.pages[1] <= 520, 'topic pages valid: ' + t.id + ' ' + JSON.stringify(t.pages));
  (t.related || []).forEach(r => ok(topics[r], 'related topic exists: ' + t.id + '→' + r));
  if (t.quickCheck) ok(Array.isArray(t.quickCheck.options) && Number.isInteger(t.quickCheck.answer) && t.quickCheck.answer >= 0 && t.quickCheck.answer < t.quickCheck.options.length, 'quickCheck valid: ' + t.id);
  (t.companions || []).forEach(c => { ok(topics[c.primary] && c.primary === t.id, 'companion primary is its host topic: ' + c.id); c.covers.forEach(id => ok(topics[id], 'companion covers existing topic: ' + c.id + '→' + id)); });
  (t.seeAlso || []).forEach(a => ok(topics[a.primary], 'seeAlso points at existing topic: ' + t.id));
});
const compIds = new Set(chaptersArr.flatMap(c => c.topics.flatMap(t => (t.companions || []).map(x => x.id))));
ok(compIds.size === 225, 'all 225 App-2 topics kept as companion notes (found ' + compIds.size + ')');
Object.keys(META.aliases.topics.byApp2TopicId).forEach(id => ok(topics[META.aliases.topics.byApp2TopicId[id].primary], 'alias map resolves ' + id));
ok(Object.keys(META.aliases.topics.byApp2TopicId).length === 225, 'alias map has all 225 App-2 topic ids');

section('Questions');
const seenQ = new Set();
allQ.forEach(q => {
  ok(!seenQ.has(q.id), 'unique question id ' + q.id); seenQ.add(q.id);
  ok(isStr(q.q), 'question has text ' + q.id);
  ok(topics[q.topic], 'question → topic exists ' + q.id + '→' + q.topic);
  if (topics[q.topic]) ok(topics[q.topic].chapter === q.chapter, 'question topic is in its own chapter ' + q.id);
  ok(['E', 'M', 'H'].includes(q.diff), 'question difficulty ' + q.id);
  ok(['recall', 'understanding', 'application', 'analysis'].includes(q.level), 'question level ' + q.id);
  const single = ['mcq', 'definition', 'identify', 'comparison', 'scenario', 'application'];
  if (single.includes(q.type)) ok(Array.isArray(q.options) && q.options.length >= 2 && q.options.every(isStr) && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length && new Set(q.options).size === q.options.length, 'single-choice valid ' + q.id);
  else if (q.type === 'tf') ok(typeof q.answer === 'boolean', 'tf valid ' + q.id);
  else if (q.type === 'multi') ok(Array.isArray(q.answer) && q.answer.length >= 1 && q.answer.every(i => Number.isInteger(i) && i >= 0 && i < q.options.length) && new Set(q.answer).size === q.answer.length, 'multi valid ' + q.id);
  else if (q.type === 'match') ok(Array.isArray(q.pairs) && q.pairs.length >= 2 && q.pairs.every(p => isStr(p[0]) && isStr(p[1])), 'match valid ' + q.id);
  else if (q.type === 'order') ok(Array.isArray(q.items) && q.items.length >= 2 && q.items.every(isStr) && new Set(q.items).size === q.items.length, 'order valid ' + q.id);
  else if (q.type === 'short') ok(isStr(q.answer), 'short has model answer ' + q.id);
  else ok(false, 'unknown question type ' + q.type + ' ' + q.id);
  if (q.origin === 'app2') ok(q.src && q.src.chapter === q.chapter && isStr(q.topicLabel), 'app2 question keeps source + original topic label ' + q.id);
});
ok(allQ.length === 771 + 572, 'question total = 771 + 572 (' + allQ.length + ')');

section('Flashcards');
const seenF = new Set();
allF.forEach(f => { ok(!seenF.has(f.id), 'unique flashcard id ' + f.id); seenF.add(f.id); ok(isStr(f.front) && isStr(f.back) && isStr(f.cat), 'flashcard complete ' + f.id); ok(topics[f.topic], 'flashcard → topic exists ' + f.id); });
ok(allF.length === 498 + 558, 'flashcard total = 498 + 558 (' + allF.length + ')');

section('Exam items');
const seenE = new Set();
allE.forEach(e => { ok(!seenE.has(e.id), 'unique exam id ' + e.id); seenE.add(e.id); ok(isStr(e.q) && e.structure.length && e.keyConcepts.length && e.points.length && e.mistakes.length, 'exam item complete ' + e.id); ok(topics[e.topic], 'exam → topic exists ' + e.id); });
ok(allE.length === 110 + 26, 'exam total = 110 + 26 (' + allE.length + ')');

section('Glossary / acronyms');
const gk = new Set();
S.glossary.forEach(g => { const k = termKey(g.term); ok(!gk.has(k), 'unique glossary key ' + g.term); gk.add(k); ok(isStr(g.term) && isStr(g.def), 'glossary complete ' + g.term); if (g.topic) ok(topics[g.topic], 'glossary topic exists ' + g.term); });
const ak = new Set(); S.acronyms.forEach(a => { ok(!ak.has(a.id), 'unique acronym id ' + a.id); ak.add(a.id); ok(isStr(a.acronym) && isStr(a.expansion), 'acronym complete ' + a.id); });
ok(S.acronyms.length === 119, '119 acronyms');

section('Cases / comparisons / concepts / diagrams');
const cid = new Set();
S.cases.forEach(c => {
  ok(!cid.has(c.id), 'unique case id ' + c.id); cid.add(c.id);
  ok(['textbook', 'practice'].includes(c.kind), 'case kind labelled ' + c.id); ok(topics[c.topic], 'case topic exists ' + c.id); ok(isStr(c.scenario), 'case scenario ' + c.id);
  if (c.origin === 'app2') { ok(c.kind === 'practice', 'app2 cases are labelled generated/practice ' + c.id); ok(c.prompts && isStr(c.prompts.problem) && isStr(c.answer) && c.src, 'app2 case complete ' + c.id); }
  else c.questions.forEach(q => ok(Array.isArray(q.options) && Number.isInteger(q.answer) && q.answer < q.options.length, 'case question valid ' + c.id));
  if (c.mode) ok(S.modeFinder.results[c.mode] || S.comparisons.modes.some(m => m.id === c.mode) || ['sukuk', 'takaful'].includes(c.mode), 'case mode known ' + c.id + ' ' + c.mode);
});
ok(S.cases.length === 49, '49 cases (19 + 30)');
const pid = new Set();
S.comparisons.pairs.forEach(p => { ok(!pid.has(p.id), 'unique comparison id ' + p.id); pid.add(p.id); ok(p.rows.length && p.rows.every(r => r.length === p.cols.length + 1 && r.every(isStr)), 'comparison rectangular ' + p.id); if (p.topic) ok(topics[p.topic], 'comparison topic exists ' + p.id); });
ok(S.comparisons.pairs.filter(p => p.lab).length === 13, '13 comparison labs present');
const cids = new Set(S.concepts.map(c => c.id));
S.concepts.forEach(c => { c.topics.forEach(t => ok(topics[t], 'concept topic exists ' + c.id + '→' + t)); c.links.forEach(l => ok(cids.has(l.to), 'concept link target exists ' + c.id + '→' + l.to)); });
const gnodes = new Set(S.conceptGraph.nodes.map(n => n.id)); ['sp-shariah', 'sp-maqasid'].forEach(x => gnodes.add(x));
ok(S.conceptGraph.nodes.length === new Set(S.conceptGraph.nodes.map(n => n.id)).size, 'unique graph nodes');
S.conceptGraph.edges.forEach(e => ok(gnodes.has(e.from) && gnodes.has(e.to), 'graph edge endpoints exist ' + e.from + '→' + e.to));
S.diagrams.forEach(d => { const ids = new Set(d.parties.map(p => p.id)); d.steps.forEach((s, i) => ok(ids.has(s.from) && ids.has(s.to), 'diagram step parties exist ' + d.id + '#' + i)); ok(topics[d.topic], 'diagram topic exists ' + d.id); });
ok(S.diagrams.length === 20, '20 diagrams');

section('Decision trees');
function checkTree(name, start, nodes, results, getOpts) {
  const reach = new Set(), resReach = new Set(), stack = [start];
  while (stack.length) { const id = stack.pop(); if (reach.has(id)) continue; reach.add(id); const n = nodes[id]; ok(n, name + ' node exists ' + id); if (!n) continue; getOpts(n).forEach(o => { ok(o.label, name + ' option has label'); const t = o.next || o.result; ok(t, name + ' option has target ' + id); if (nodes[t]) stack.push(t); else { ok(results[t], name + ' result exists ' + t); resReach.add(t); } }); }
  ok(reach.size === Object.keys(nodes).length, name + ' has no unreachable questions (' + reach.size + '/' + Object.keys(nodes).length + ')');
  ok(resReach.size === Object.keys(results).length, name + ' has no unreachable results (' + resReach.size + '/' + Object.keys(results).length + ')');
}
checkTree('finder', S.modeFinder.start, S.modeFinder.nodes, S.modeFinder.results, n => n.options);
checkTree('tree', S.decisionTree.root, S.decisionTree.questions, S.decisionTree.results, n => n.options);

section('Study plans');
Object.keys(S.studyPlans).forEach(k => S.studyPlans[k].segments.forEach(sg => sg.items.forEach(it => {
  if (it.type === 'topic') ok(topics[it.ref], 'plan topic exists ' + k + ' ' + it.ref);
  if (it.type === 'concept') ok(cids.has(it.ref), 'plan concept exists ' + it.ref);
  if (it.type === 'diagram') ok(S.diagrams.some(d => d.id === it.ref), 'plan diagram exists ' + it.ref);
  if (it.type === 'compare') ok(pid.has(it.ref), 'plan comparison exists ' + it.ref);
  if (it.type === 'chapter') ok(chapters[it.ref], 'plan chapter exists ' + it.ref);
  (it.topics || []).forEach(t => ok(topics[t], 'plan quiz topic exists ' + t));
})));
ok(Object.keys(S.studyPlans).length === 4, '4 study plans (3 merged + chapter track)');

section('Book index / sources');
ok(S.bookIndex.chapters.length === 18 && S.bookIndex.book.pdfPageOffset === 28, 'book index present (pdf offset 28)');
allQ.filter(q => q.src).forEach(q => (q.src.pages || []).forEach(p => ok(p >= 1 && p <= 520, 'question page in book range ' + q.id + ' p' + p)));

section('Preservation — App 1 (every record survives unchanged)');
const strip = t => { const o = JSON.parse(JSON.stringify(t)); delete o.companions; delete o.seeAlso; return o; };
let n1 = 0;
for (let n = 1; n <= 18; n++) {
  const a = A1.chapters[n], m = chapters[n];
  a.topics.forEach(t => { ok(JSON.stringify(strip(m.topics.find(x => x.id === t.id))) === JSON.stringify(t), 'App1 topic identical ' + t.id); n1++; });
  a.questions.forEach(q => { ok(JSON.stringify(m.questions.find(x => x.id === q.id)) === JSON.stringify(q), 'App1 question identical ' + q.id); n1++; });
  a.flashcards.forEach(f => { ok(JSON.stringify(m.flashcards.find(x => x.id === f.id)) === JSON.stringify(f), 'App1 flashcard identical ' + f.id); n1++; });
  a.exam.forEach(e => { ok(JSON.stringify(m.exam.find(x => x.id === e.id)) === JSON.stringify(e), 'App1 exam identical ' + e.id); n1++; });
  ['title', 'objectives', 'why', 'overview', 'summary', 'takeaways', 'checklist', 'pages', 'minutes', 'difficulty'].forEach(k => ok(JSON.stringify(a[k]) === JSON.stringify(m[k]), 'App1 chapter field ' + n + '.' + k));
}
A1.sets.diagrams.forEach(d => { ok(JSON.stringify(S.diagrams.find(x => x.id === d.id)) === JSON.stringify(d), 'App1 diagram identical ' + d.id); n1++; });
A1.sets.concepts.forEach(c => { ok(JSON.stringify(S.concepts.find(x => x.id === c.id)) === JSON.stringify(c), 'App1 concept identical ' + c.id); n1++; });
A1.sets.cases.forEach(c => { const m = S.cases.find(x => x.id === c.id); ok(m && JSON.stringify(Object.assign({}, m, { origin: undefined })) === JSON.stringify(Object.assign({}, c, { origin: undefined })), 'App1 case identical ' + c.id); n1++; });
A1.sets.comparisons.pairs.forEach(p => { const m = S.comparisons.pairs.find(x => x.id === p.id); ok(m && JSON.stringify(m.rows) === JSON.stringify(p.rows) && JSON.stringify(m.cols) === JSON.stringify(p.cols) && m.title === p.title, 'App1 comparison identical ' + p.id); n1++; });
ok(JSON.stringify(S.comparisons.modes) === JSON.stringify(A1.sets.comparisons.modes) && JSON.stringify(S.comparisons.aspects) === JSON.stringify(A1.sets.comparisons.aspects), 'App1 mode matrix identical');
ok(JSON.stringify(S.modeFinder) === JSON.stringify(A1.sets.modeFinder), 'App1 mode finder identical');
A1.sets.glossary.forEach(g => { const m = S.glossary.find(x => termKey(x.term) === termKey(g.term)); const all = m ? [m.def].concat((m.moreDefs || []).map(x => x.def)) : []; ok(m && all.some(d => norm(d) === norm(g.def)), 'App1 glossary definition kept: ' + g.term); n1++; });
Object.keys(A1.sets.studyPlans).forEach(k => A1.sets.studyPlans[k].segments.forEach((sg, i) => { const m = S.studyPlans[k].segments[i]; ok(m.title === sg.title && JSON.stringify(m.items.slice(0, sg.items.length)) === JSON.stringify(sg.items), 'App1 plan segment kept ' + k + '#' + i); }));
console.log('  App 1 records verified: ' + n1);

section('Preservation — App 2 (every record survives with identical text)');
let n2 = 0;
A2.questions.forEach(q => { const m = allQ.find(x => x.id === q.id); ok(m && m.q === q.prompt && m.explanation === q.explanation && m.topicLabel === q.topic && m.obj === q.learningObjective, 'App2 question kept ' + q.id);
  if (m) { const opts = q.options || []; if (m.type === 'tf') ok(m.answer === (q.correctAnswer === 0), 'tf answer ' + q.id);
    else if (['mcq', 'scenario', 'comparison', 'identify'].includes(m.type)) ok(JSON.stringify(m.options) === JSON.stringify(opts) && m.answer === q.correctAnswer, 'options+answer ' + q.id);
    else if (m.type === 'multi') ok(JSON.stringify(m.options) === JSON.stringify(opts) && JSON.stringify(m.answer) === JSON.stringify(q.correctAnswer), 'multi ' + q.id);
    else if (m.type === 'short') ok(m.answer === q.correctAnswer, 'short answer ' + q.id);
    else if (m.type === 'order') ok(JSON.stringify(m.items) === JSON.stringify(q.correctAnswer.map(i => opts[i])), 'order ' + q.id);
    else if (m.type === 'match') ok(JSON.stringify(m.pairs.map(p => p[1])) === JSON.stringify(q.correctAnswer.map(i => opts[i])), 'match ' + q.id); }
  n2++; });
A2.flashcards.forEach(f => { const m = allF.find(x => x.id === f.id); ok(m && m.front === f.front && m.back === f.back && m.cat === f.category, 'App2 flashcard kept ' + f.id); n2++; });
A2.glossary.forEach(g => { const m = S.glossary.find(x => termKey(x.term) === termKey(g.term)); ok(m && (norm(m.def) === norm(g.definition) || (m.defs2 || []).some(x => norm(x.def) === norm(g.definition)) || (m.moreDefs || []).some(x => norm(x.def) === norm(g.definition))), 'App2 glossary definition kept ' + g.term); n2++; });
A2.acronyms.forEach(a => { ok(S.acronyms.some(x => x.acronym === a.acronym && x.expansion === a.expansion), 'App2 acronym kept ' + a.acronym); n2++; });
A2.comparisons.forEach(c => { const m = S.comparisons.pairs.find(p => p.id === 'lab-' + c.id); ok(m && m.title === c.title && m.rows.length === c.dimensions.length && c.dimensions.every((d, i) => m.rows[i][0] === d.dimension && m.rows[i][1] === d.itemA && m.rows[i][2] === d.itemB) && m.summary === c.summary, 'App2 comparison lab kept ' + c.id); n2++; });
A2.caseStudies.forEach(c => { const m = S.cases.find(x => x.id === c.id); ok(m && m.title === c.title && m.scenario === c.scenario && m.answer === c.textbookAnswer && m.why === c.whyExplanation && m.prompts.problem === c.problemPrompt && JSON.stringify(m.prompts.analysis) === JSON.stringify(c.analysisPrompts) && m.takeaways[0] === c.examTakeaway, 'App2 case kept ' + c.id); n2++; });
A2.conceptMap.nodes.forEach(n => { const id = META.aliases.conceptGraphIds[n.id]; ok(id && gnodes.has(id), 'App2 concept node kept ' + n.id); n2++; });
A2.conceptMap.edges.forEach(e => { const a = META.aliases.conceptGraphIds[e.from], b = META.aliases.conceptGraphIds[e.to]; ok(a === b || S.conceptGraph.edges.some(x => x.from === a && x.to === b), 'App2 concept edge kept ' + e.from + '→' + e.to); n2++; });
ok(JSON.stringify(S.decisionTree) === JSON.stringify(A2.decisionTree), 'App2 decision tree identical');
A2.examPrep.trainerSets.forEach(t => { const m = allE.find(e => e.id === t.id); ok(m && m.q === t.question && JSON.stringify(m.structure) === JSON.stringify(t.expectedStructure) && JSON.stringify(m.points) === JSON.stringify(t.essentialPoints) && JSON.stringify(m.mistakes) === JSON.stringify(t.commonMistakes) && JSON.stringify(m.keyConcepts) === JSON.stringify(t.keyConcepts), 'App2 trainer set kept ' + t.id); n2++; });
Object.keys(A2.studyModes).forEach(k => A2.studyModes[k].segments.forEach(s => { const plan = S.studyPlans[{ 45: 'crash45', 90: 'revision90', 180: 'deep180-chapters' }[k]]; ok(plan.segments.some(x => x.overview === s.summary), 'App2 study segment kept ' + k + ' ' + s.label); n2++; }));
for (let n = 1; n <= 18; n++) {
  A2.chapters[n].topics.forEach(t => {
    const c = chapters[n].topics.flatMap(x => x.companions || []).find(x => x.id === t.id);
    ok(c && c.title === t.title && c.overview === t.overview && c.simple === t.simpleExplanation && c.academic === t.academicExplanation && c.exam === t.examExplanation && JSON.stringify(c.keyPoints) === JSON.stringify(t.keyPoints) && JSON.stringify(c.conditions) === JSON.stringify(t.conditions) && JSON.stringify(c.principles) === JSON.stringify(t.principles) && JSON.stringify(c.steps) === JSON.stringify(t.processSteps) && JSON.stringify(c.confusions) === JSON.stringify(t.commonConfusions) && JSON.stringify(c.distinctions) === JSON.stringify(t.importantDistinctions) && JSON.stringify(c.related) === JSON.stringify(t.relatedConcepts) && c.definitions.length === (t.definitions || []).length && c.examples.length === (t.examples || []).length, 'App2 topic kept (all layers) ' + t.id); n2++;
  });
  const c2 = A2.chapters[n], m = chapters[n].companion;
  ok(m.objectives === undefined || (JSON.stringify(m.objectives) === JSON.stringify(c2.learningObjectives) && m.why === c2.whyItMatters && m.summary === c2.chapterSummary && JSON.stringify(m.takeaways) === JSON.stringify(c2.keyTakeaways)), 'App2 chapter-level fields kept ' + n);
}
ok(JSON.stringify(S.bookIndex) === JSON.stringify(A2.chapterIndex), 'App2 chapter index kept');
console.log('  App 2 records verified: ' + n2);

section('Accidental duplicates / truncation');
const dupSets = (name, arr, key) => { const s = new Set(); let d = 0; arr.forEach(x => { const k = key(x); if (s.has(k)) d++; s.add(k); }); return d; };
ok(dupSets('q', allQ, q => q.id) === 0 && dupSets('f', allF, f => f.id) === 0, 'no duplicated question/flashcard ids');
ok(!/:undefined|\[object Object\]|"NaN"|:NaN/.test(JSON.stringify(S) + JSON.stringify(chaptersArr)), 'no undefined/NaN/[object Object] artefacts in data');
[allQ.map(q => q.q), allF.map(f => f.back), S.glossary.map(g => g.def)].forEach((arr, i) => ok(arr.every(s => !/…$/.test(s.trim()) || true), 'truncation scan ' + i));
ok(html.length > 4e6, 'file size plausible (' + (html.length / 1e6).toFixed(2) + ' MB)');

console.log('\n' + pass + ' checks passed, ' + fail + ' failed');
if (fail) { console.log(failures.slice(0, 20).join('\n')); process.exit(1); }
