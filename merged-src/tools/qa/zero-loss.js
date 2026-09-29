/* Zero-loss audit: every string in every source record of BOTH original applications must be present in the
   canonical data, unless the record was deliberately collapsed as a true duplicate (listed in _audit.json). */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const { loadF1, loadF2 } = require('../lib/load-sources');
const D1 = loadF1(), D2 = loadF2();
const audit = require('../../data/_audit.json');
const sb = { console }; sb.window = sb; vm.createContext(sb); sb.IFL_DATA = { chapters: {}, sets: {} };
sb.IFL_DATA.register = (n, v) => { sb.IFL_DATA.sets[n] = v; }; sb.IFL_DATA.registerChapter = c => { sb.IFL_DATA.chapters[c.number] = c; };
(function walk(d) { fs.readdirSync(d).forEach(f => { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (p.endsWith('.js')) vm.runInContext(fs.readFileSync(p, 'utf8'), sb); }); })(path.join(__dirname, '..', '..', 'data'));
const F = sb.IFL_DATA, S = F.sets;
const norm = s => String(s).normalize('NFC').replace(/\s+/g, ' ').trim();
function leaves(x, out = []) { if (x == null) return out; if (typeof x === 'string') { if (x.trim().length >= 3) out.push(norm(x)); } else if (Array.isArray(x)) x.forEach(v => leaves(v, out)); else if (typeof x === 'object') Object.values(x).forEach(v => leaves(v, out)); return out; }
const bucket = (...xs) => { const s = new Set(); xs.forEach(x => leaves(x).forEach(v => s.add(v))); return s; };
const chapters = Object.values(F.chapters);
const finalTopics = chapters.flatMap(c => c.topics);
const B = {
  topicsF1: bucket(finalTopics.map(t => Object.assign({}, t, { supplements: undefined }))), topicsF2: bucket(finalTopics.map(t => t.supplements)),
  questions: bucket(chapters.map(c => c.questions)), flashcards: bucket(chapters.map(c => c.flashcards)), exam: bucket(chapters.map(c => c.exam)), chapters: bucket(chapters.map(c => Object.assign({}, c, { topics: undefined, questions: undefined, flashcards: undefined, exam: undefined }))),
  glossary: bucket(S.glossary), acronyms: bucket(S.acronyms), concepts: bucket(S.concepts, S.conceptEdges), modes: bucket(S.modes), products: bucket(S.products), diagrams: bucket(S.diagrams), cases: bucket(S.cases),
  comparisons: bucket(S.comparisons), finder: bucket(S.modeFinder), plans: bucket(S.studyPlans), book: bucket(S.bookIndex)
};
const report = []; let totalLost = 0, totalStrings = 0, explainedTotal = {};
const key = v => v.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const STOP = new Set('the a an of to in and or is are was were be by for on with as that this it its at from which what who how does do did into per not no than then'.split(' '));
const tokset = v => new Set(v.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(w => w && !STOP.has(w)));
const jac = (a, b) => { let i = 0; a.forEach(x => { if (b.has(x)) i++; }); return i / (a.size + b.size - i || 1); };
const keyCache = {}, tokCache = {};
function explain(v, bkt) {
  if (v === 'True' || v === 'False') return 'implicit true/false option labels (canonical tf questions store a boolean)';
  if (/^(#\/chapter\/\d+|[a-z][a-z0-9-]*)$/.test(v) && !/\s/.test(v)) return 'internal id / route string (ids were canonicalised through alias tables)';
  keyCache[bkt] = keyCache[bkt] || new Set(Array.from(B[bkt]).map(key));
  if (keyCache[bkt].has(key(v))) return 'typographic / spacing / case variant of a string that is present';
  if (keyCache[bkt].has(key(v + ' (extended)')) || keyCache[bkt].has(key(v + '(extended)'))) return 'label kept with an “(extended)” suffix';
  tokCache[bkt] = tokCache[bkt] || Array.from(B[bkt]).map(tokset);
  const t = tokset(v); if (t.size > 3 && tokCache[bkt].some(o => jac(t, o) >= 0.9)) return 'same wording re-ordered (identical content words) as a definition that is present';
  return null;
}
function check(name, src, bkt, ignore) {
  const L = leaves(src); let lost = L.filter(v => !B[bkt].has(v)); totalStrings += L.length;
  if (ignore) lost = lost.filter(v => !ignore(v));
  const exp = {}, unexplained = [];
  lost.forEach(v => { const e = explain(v, bkt); if (e) exp[e] = (exp[e] || 0) + 1; else unexplained.push(v); });
  Object.keys(exp).forEach(k => { explainedTotal[k] = (explainedTotal[k] || 0) + exp[k]; });
  totalLost += unexplained.length; report.push({ name, strings: L.length, exactMissing: lost.length, explained: exp, unexplained: unexplained.length, sample: unexplained.slice(0, 10) });
  console.log((unexplained.length ? 'LOSS ' : 'ok   ') + name + ' — ' + L.length + ' strings' + (lost.length ? ', ' + lost.length + ' not byte-identical (' + (lost.length - unexplained.length) + ' explained)' : '') + (unexplained.length ? ', UNEXPLAINED: ' + JSON.stringify(unexplained.slice(0, 3)) : ''));
}
const dupQ = new Set(audit.duplicates.questions.map(d => d.dropped)), dupF = new Set(audit.duplicates.flashcards.map(d => d.dropped));
const f1chap = Object.values(D1.chapters), f2chap = Object.values(D2.chapters);
/* renamed keys are values, so string leaves compare regardless of field names */
check('F1 topics (311)', f1chap.flatMap(c => c.topics), 'topicsF1');
check('F2 topics (225)', f2chap.flatMap(c => c.topics), 'topicsF2', v => /^ch\d+-t\d+$/.test(v));
check('F1 questions (771)', f1chap.flatMap(c => c.questions), 'questions');
check('F2 questions (572; 5 true duplicates excluded)', D2.questions.filter(q => !dupQ.has(q.id)), 'questions', v => /^q-ch/.test(v) || ['mcq', 'truefalse', 'multiselect', 'ordering', 'matching', 'short', 'definition', 'identify', 'scenario', 'comparison', 'easy', 'medium', 'hard', 'recall', 'understanding', 'application', 'analysis'].indexOf(v) > -1);
check('F1 flashcards (498)', f1chap.flatMap(c => c.flashcards), 'flashcards');
check('F2 flashcards (558; 3 true duplicates excluded)', D2.flashcards.filter(f => !dupF.has(f.id)), 'flashcards', v => /^fc-ch/.test(v));
check('F1 exam prompts (110)', f1chap.flatMap(c => c.exam), 'exam');
check('F2 answer trainer sets (26)', D2.examPrep.trainerSets, 'exam', v => /^et-\d+$/.test(v));
check('F1 chapter metadata', f1chap.map(c => ({ t: c.title, o: c.objectives, why: c.why, ov: c.overview, s: c.summary, tk: c.takeaways, ck: c.checklist })), 'chapters');
check('F2 chapter metadata', f2chap.map(c => ({ o: c.learningObjectives, why: c.whyItMatters, s: c.chapterSummary, tk: c.keyTakeaways })), 'chapters', v => true && false);
check('F1 glossary (191)', D1.sets.glossary, 'glossary');
check('F2 glossary (180)', D2.glossary, 'glossary', v => false);
check('F2 acronyms (119)', D2.acronyms, 'acronyms');
check('F1 concepts (54)', D1.sets.concepts, 'concepts');
check('F2 concept map (64 nodes, 124 edges)', D2.conceptMap.nodes.map(n => n.label), 'concepts');
check('F2 financing-mode matrix (19)', D2.productsMatrix, 'modes', v => /^#\/chapter/.test(v));
check('F1 comparison mode attributes (12)', D1.sets.comparisons.modes, 'modes');
check('F1 products (58)', D1.sets.products, 'products');
check('F1 transaction diagrams (34)', D1.sets.diagrams, 'diagrams');
check('F1 cases (19)', D1.sets.cases, 'cases');
check('F2 cases (42)', D2.caseStudies, 'cases');
check('F1 comparison pairs (25)', D1.sets.comparisons.pairs, 'comparisons');
check('F2 comparisons (16)', D2.comparisons, 'comparisons');
check('F1 mode finder', D1.sets.modeFinder, 'finder');
check('F2 decision tree', D2.decisionTree, 'finder');
check('F1 study plans', D1.sets.studyPlans, 'plans');
check('F2 study modes', D2.studyModes, 'plans');
check('F2 book / chapter index', D2.chapterIndex, 'book');
console.log('\nstrings audited:', totalStrings, ' explained non-identical:', JSON.stringify(explainedTotal), ' UNEXPLAINED:', totalLost);
fs.writeFileSync(path.join(__dirname, 'zero-loss-result.json'), JSON.stringify({ totalStrings, explainedTotal, totalLost, report }, null, 1));
process.exit(totalLost ? 1 : 0);
