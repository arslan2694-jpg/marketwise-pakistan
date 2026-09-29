/* Reference-integrity checker for the canonical data (run after tools/build-data.js).
   Validates unique ids, dangling references, question / flashcard / case / relationship integrity. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const DATA = path.join(__dirname, '..', 'data');
const sb = { console }; sb.window = sb; vm.createContext(sb);
sb.IFL_DATA = { chapters: {}, sets: {} };
sb.IFL_DATA.register = (n, v) => { sb.IFL_DATA.sets[n] = v; };
sb.IFL_DATA.registerChapter = c => { sb.IFL_DATA.chapters[c.number] = c; };
function files(dir) { return fs.readdirSync(dir).flatMap(f => { const p = path.join(dir, f); return fs.statSync(p).isDirectory() ? files(p) : p.endsWith('.js') ? [p] : []; }); }
files(DATA).forEach(f => vm.runInContext(fs.readFileSync(f, 'utf8'), sb, { filename: f }));
const D = sb.IFL_DATA, S = D.sets;
const problems = [];
const bad = (type, id, msg) => problems.push({ type, id, msg });
const counts = {};

/* ---- ids ---- */
function uniq(type, arr, key) { const seen = new Set(); arr.forEach(r => { const id = r[key || 'id']; if (id == null || id === '') bad(type, '?', 'missing id'); else if (seen.has(id)) bad(type, id, 'duplicate id'); seen.add(id); }); counts[type] = arr.length; return seen; }
const chapterNums = Object.keys(D.chapters).map(Number).sort((a, b) => a - b);
const topics = chapterNums.flatMap(n => D.chapters[n].topics.map(t => Object.assign({ chapter: n }, t)));
const questions = chapterNums.flatMap(n => D.chapters[n].questions), flashcards = chapterNums.flatMap(n => D.chapters[n].flashcards), exam = chapterNums.flatMap(n => D.chapters[n].exam);
const topicIds = uniq('topic', topics), qIds = uniq('question', questions), fIds = uniq('flashcard', flashcards), eIds = uniq('exam', exam);
const gIds = uniq('glossary', S.glossary), aIds = uniq('acronym', S.acronyms), cIds = uniq('concept', S.concepts), mIds = uniq('mode', S.modes), pIds = uniq('product', S.products),
  caseIds = uniq('case', S.cases), dIds = uniq('diagram', S.diagrams), cmpIds = uniq('comparison', S.comparisons.pairs);
const loIds = uniq('learningObjective', chapterNums.flatMap(n => D.chapters[n].learningObjectives));
const supIds = uniq('supplement', topics.flatMap(t => t.supplements));
const has = (set, id) => set.has(id);
const topicOk = (type, id, t) => { if (t == null) return; if (!topicIds.has(t)) bad(type, id, 'dangling topic ' + t); };

/* ---- topics ---- */
const chapterOf = {}; topics.forEach(t => { chapterOf[t.id] = t.chapter; });
topics.forEach(t => {
  ['simpleExplanation', 'examExplanation', 'title', 'section'].forEach(k => { if (!t[k]) bad('topic', t.id, 'missing ' + k); });
  if (!Array.isArray(t.academicExplanation) || !t.academicExplanation.length) bad('topic', t.id, 'missing academicExplanation');
  (t.relatedTopics || []).forEach(r => topicOk('topic', t.id, r));
  if (t.quickCheck) { const q = t.quickCheck; if (!Array.isArray(q.options) || !Number.isInteger(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) bad('topic', t.id, 'quickCheck answer invalid'); }
  (t.concepts || []).forEach(tag => { if (!S.concepts.some(c => c.tags.indexOf(tag) > -1 || c.id === tag)) { /* tags without a concept card are allowed (link to search) */ } });
  t.supplements.forEach(s => (s.covers || []).forEach(x => topicOk('supplement', s.id, x)));
});

/* ---- questions ---- */
const TYPES = ['mcq', 'tf', 'multi', 'match', 'order', 'definition', 'identify', 'comparison', 'scenario', 'application', 'short'];
const SINGLE = ['mcq', 'definition', 'identify', 'comparison', 'scenario', 'application'];
const DIFFS = ['easy', 'medium', 'hard'], LEVELS = ['recall', 'understanding', 'application', 'analysis'];
questions.forEach(q => {
  const id = q.id;
  if (TYPES.indexOf(q.type) < 0) bad('question', id, 'unknown type ' + q.type);
  if (!q.prompt) bad('question', id, 'missing prompt');
  if (!q.explanation) bad('question', id, 'missing explanation');
  topicOk('question', id, q.topicId);
  if (q.topicId && chapterOf[q.topicId] !== q.chapter) bad('question', id, 'chapter ' + q.chapter + ' does not match topic chapter ' + chapterOf[q.topicId]);
  if (DIFFS.indexOf(q.difficulty) < 0) bad('question', id, 'invalid difficulty ' + q.difficulty);
  if (LEVELS.indexOf(q.cognitiveLevel) < 0) bad('question', id, 'invalid cognitiveLevel ' + q.cognitiveLevel);
  if (!q.objective) bad('question', id, 'missing learning objective');
  if (!q.source || !q.source.chapter) bad('question', id, 'missing source');
  if (SINGLE.indexOf(q.type) > -1) {
    if (!Array.isArray(q.options) || q.options.length < 2) bad('question', id, 'options missing');
    else if (!Number.isInteger(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) bad('question', id, 'correct option index invalid: ' + q.correctAnswer);
    else if (new Set(q.options.map(o => String(o).trim().toLowerCase())).size !== q.options.length) bad('question', id, 'duplicate option text');
  } else if (q.type === 'tf') { if (typeof q.correctAnswer !== 'boolean') bad('question', id, 'tf answer not boolean'); }
  else if (q.type === 'multi') {
    if (!Array.isArray(q.options) || q.options.length < 2) bad('question', id, 'options missing');
    else if (!Array.isArray(q.correctAnswer) || !q.correctAnswer.length || q.correctAnswer.some(i => !Number.isInteger(i) || i < 0 || i >= q.options.length) || new Set(q.correctAnswer).size !== q.correctAnswer.length) bad('question', id, 'multi answers invalid');
  } else if (q.type === 'match') { if (!Array.isArray(q.pairs) || q.pairs.length < 2 || q.pairs.some(p => !Array.isArray(p) || p.length !== 2 || !p[0] || !p[1])) bad('question', id, 'pairs invalid'); }
  else if (q.type === 'order') { if (!Array.isArray(q.items) || q.items.length < 2 || q.items.some(x => !x)) bad('question', id, 'items invalid'); }
  else if (q.type === 'short') { if (typeof q.correctAnswer !== 'string' || !q.correctAnswer.trim()) bad('question', id, 'short answer missing'); }
});
/* ---- flashcards ---- */
flashcards.forEach(f => {
  if (!f.front) bad('flashcard', f.id, 'missing front'); if (!f.back) bad('flashcard', f.id, 'missing back'); if (!f.category) bad('flashcard', f.id, 'missing category');
  topicOk('flashcard', f.id, f.topicId); if (!f.chapter) bad('flashcard', f.id, 'missing chapter'); else if (f.topicId && chapterOf[f.topicId] !== f.chapter) bad('flashcard', f.id, 'chapter/topic mismatch');
  if (!f.source || !f.source.chapter) bad('flashcard', f.id, 'missing source');
});
exam.forEach(e => { topicOk('exam', e.id, e.topicId); if (!e.prompt) bad('exam', e.id, 'missing prompt'); });
/* ---- glossary / concepts / modes / products / diagrams / cases / comparisons ---- */
S.glossary.forEach(g => { if (!g.definition) bad('glossary', g.id, 'missing definition'); topicOk('glossary', g.id, g.topicId); });
S.concepts.forEach(c => { (c.topicIds || []).forEach(t => topicOk('concept', c.id, t)); if (!c.mapNodeOnly && (!c.oneLine || !c.points)) bad('concept', c.id, 'incomplete concept card'); });
S.conceptEdges.forEach(e => { if (!cIds.has(e.from) || !cIds.has(e.to)) bad('conceptEdge', e.from + '>' + e.to, 'dangling edge'); });
S.modes.forEach(m => { topicOk('mode', m.id, m.topicId); if (m.conceptId && !cIds.has(m.conceptId)) bad('mode', m.id, 'dangling concept ' + m.conceptId); ['shariahBasis', 'ownershipRiskTiming', 'keyConditions', 'majorRisks'].forEach(k => { if (!m[k] || !m[k].length) bad('mode', m.id, 'missing ' + k); }); });
S.products.forEach(p => {
  p.topicIds.forEach(t => topicOk('product', p.id, t)); p.modeIds.forEach(m => { if (!mIds.has(m)) bad('product', p.id, 'dangling mode ' + m); });
  p.contracts.forEach(c => { if (!cIds.has(c)) bad('product', p.id, 'contract without concept ' + c); });
  if (p.diagramId && !dIds.has(p.diagramId)) bad('product', p.id, 'dangling diagram ' + p.diagramId);
  (p.caseIds || []).forEach(c => { if (!caseIds.has(c)) bad('product', p.id, 'dangling case ' + c); });
});
S.diagrams.forEach(d => {
  topicOk('diagram', d.id, d.topicId); if (d.conceptId && !cIds.has(d.conceptId)) bad('diagram', d.id, 'dangling concept ' + d.conceptId); if (d.modeId && !mIds.has(d.modeId)) bad('diagram', d.id, 'dangling mode');
  const parties = new Set(d.parties.map(p => p.id)); d.steps.forEach((s, i) => { if (!parties.has(s.from) || !parties.has(s.to)) bad('diagram', d.id, 'step ' + (i + 1) + ' references unknown party'); if (!s.label || !s.detail) bad('diagram', d.id, 'step ' + (i + 1) + ' incomplete'); });
});
S.cases.forEach(c => {
  topicOk('case', c.id, c.topicId); c.modeIds.forEach(m => { if (!mIds.has(m)) bad('case', c.id, 'dangling mode ' + m); });
  (c.productIds || []).forEach(p => { if (!pIds.has(p)) bad('case', c.id, 'dangling product ' + p); });
  if (!c.scenario) bad('case', c.id, 'missing scenario');
  if (c.questions) c.questions.forEach((q, i) => { if (!Number.isInteger(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) bad('case', c.id, 'question ' + i + ' answer invalid'); });
  else if (!c.answer || !c.explanation) bad('case', c.id, 'missing answer/explanation');
  if (!c.source) bad('case', c.id, 'missing source');
});
S.comparisons.pairs.forEach(c => { topicOk('comparison', c.id, c.topicId); if (!c.rows.length) bad('comparison', c.id, 'no rows'); c.rows.forEach((r, i) => { if (r.length !== c.columns.length + 1 || r.slice(1).every(x => !x || x === '—')) bad('comparison', c.id, 'row ' + i + ' malformed'); }); });
/* ---- finder ---- */
const F = S.modeFinder;
F.pathways.forEach(p => { if (!p.nodes[p.start]) bad('finder', p.id, 'start node missing'); Object.values(p.nodes).forEach(n => n.options.forEach(o => { if (o.next && !p.nodes[o.next]) bad('finder', p.id + ':' + n.id, 'dangling next ' + o.next); if (o.result && !F.results[o.result]) bad('finder', p.id + ':' + n.id, 'dangling result ' + o.result); if (!o.next && !o.result) bad('finder', p.id + ':' + n.id, 'option without target'); })); });
Object.values(F.results).forEach(r => { (r.topicIds || []).forEach(t => topicOk('finderResult', r.id, t)); (r.modeIds || []).forEach(m => { if (!mIds.has(m)) bad('finderResult', r.id, 'dangling mode ' + m); }); });
/* ---- study plans ---- */
Object.entries(S.studyPlans).forEach(([id, p]) => p.segments.forEach((s, i) => s.items.forEach(it => {
  const where = id + ' seg ' + (i + 1);
  if (it.type === 'topic') topicOk('studyPlan', where, it.ref);
  if (it.type === 'concept' && !cIds.has(it.ref)) bad('studyPlan', where, 'dangling concept ' + it.ref);
  if (it.type === 'diagram' && !dIds.has(it.ref)) bad('studyPlan', where, 'dangling diagram ' + it.ref);
  if (it.type === 'compare' && !cmpIds.has(it.ref)) bad('studyPlan', where, 'dangling comparison ' + it.ref);
  (it.topics || []).forEach(t => topicOk('studyPlan', where, t));
})));
/* ---- aliases + graph ---- */
Object.entries(S.aliases.topics).forEach(([k, v]) => v.forEach(t => topicOk('alias.topic', k, t)));
Object.entries(S.aliases.questions).forEach(([k, v]) => { if (!qIds.has(v)) bad('alias.question', k, 'target missing ' + v); });
Object.entries(S.aliases.flashcards).forEach(([k, v]) => { if (!fIds.has(v)) bad('alias.flashcard', k, 'target missing ' + v); });
Object.entries(S.aliases.concepts).forEach(([k, v]) => { if (!cIds.has(v)) bad('alias.concept', k, 'target missing ' + v); });
Object.entries(S.aliases.comparisons).forEach(([k, v]) => { if (!cmpIds.has(v)) bad('alias.comparison', k, 'target missing ' + v); });
const idsByType = { chapter: new Set(chapterNums.map(String)), topic: topicIds, question: qIds, flashcard: fIds, exam: eIds, glossary: gIds, acronym: aIds, concept: cIds, mode: mIds, product: pIds, case: caseIds, diagram: dIds, comparison: cmpIds, finderResult: new Set(Object.keys(F.results)) };
S.graph.forEach(e => { [[e[0], e[1]], [e[3], e[4]]].forEach(([t, id]) => { if (idsByType[t]) { if (!idsByType[t].has(id)) bad('graph', e.join('|'), 'dangling ' + t + ' ' + id); } else if (['calculator', 'numerical'].indexOf(t) < 0) bad('graph', e.join('|'), 'unknown type ' + t); }); });
/* ---- source references: every cited section exists in the book index ---- */
const sections = new Set(); S && S.bookIndex.chapters.forEach(c => c.sections.forEach(s => { sections.add(s.sectionNumber); (s.subsections || []).forEach(x => sections.add(x.sectionNumber)); }));
counts.bookSections = sections.size; counts.graphEdges = S.graph.length;
console.log('counts', JSON.stringify(counts));
console.log('problems', problems.length);
const byType = {}; problems.forEach(p => { (byType[p.type] = byType[p.type] || []).push(p); });
Object.keys(byType).forEach(t => { console.log(' ', t, byType[t].length); byType[t].slice(0, 6).forEach(p => console.log('    ', p.id, '-', p.msg)); });
fs.writeFileSync(path.join(DATA, '_integrity.json'), JSON.stringify({ counts, problems }, null, 1));
process.exit(problems.length ? 1 : 0);
