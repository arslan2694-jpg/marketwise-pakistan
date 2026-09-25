#!/usr/bin/env node
/* Static validation: required files, script references, content schema, reference integrity,
   coverage against the textbook source map, and forbidden placeholder text.
   Usage: node tools/validate.cjs   (exit code 1 on any error) */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const errors = [], warnings = [];
const err = m => errors.push(m), warn = m => warnings.push(m);
const exists = f => fs.existsSync(path.join(root, f));

// 1. Required files
['index.html', 'styles.css', 'app.js', 'manifest.json', 'service-worker.js', 'README.md', 'source/source-map.json', 'source/chapter-index.json',
 'source/terminology-index.json', 'source/concept-index.json', 'data/course-index.js', 'assets/icons/icon.svg'].forEach(f => { if (!exists(f)) err('Missing required file ' + f); });
for (let i = 1; i <= 18; i++) { const f = 'data/chapters/ch' + String(i).padStart(2, '0') + '.js'; if (!exists(f)) err('Missing ' + f); }

// 2. index.html script/style references resolve; basic structure
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
(html.match(/(?:src|href)="([^"#:]+)"/g) || []).forEach(m => { const f = m.split('"')[1]; if (!/^https?:/.test(f) && !exists(f) && !/icon-\d+\.png$/.test(f)) err('index.html references missing file ' + f); });
['<!DOCTYPE html>', '<html lang="en">', '<main', '</main>', '</body>', '</html>', '<title>'].forEach(t => { if (html.indexOf(t) < 0) err('index.html missing ' + t); });
if (/https?:\/\/(?!.*(drive\.google))/.test(html.replace(/<meta[^>]*>/g, ''))) warn('index.html contains an external URL');
const opens = (html.match(/<div\b/g) || []).length, closes = (html.match(/<\/div>/g) || []).length;
if (opens !== closes) err('index.html <div> tags unbalanced: ' + opens + ' vs ' + closes);

// 3. Service worker precache entries exist
const sw = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
JSON.parse(sw.match(/PRECACHE = (\[[\s\S]*?\]);/)[1]).forEach(f => { if (f !== './' && !exists(f)) err('service-worker precaches missing file ' + f); });

// 4. Content schema and references
const D = require('./load-data.cjs')(root), R = D.reg;
const sm = JSON.parse(fs.readFileSync(path.join(root, 'source/source-map.json'), 'utf8'));
const T = {}, Q = {}, F = {};
if (D.chapters.length !== 18) err('Expected 18 chapters, found ' + D.chapters.length);
const QTYPES = ['mcq', 'tf', 'multi', 'match', 'order', 'definition', 'identify', 'comparison', 'scenario', 'application', 'short'];
const SINGLE = ['mcq', 'definition', 'identify', 'comparison', 'scenario', 'application'];
const TIERS = ['core', 'supporting', 'detailed', 'revision'];
const FCATS = ['Definitions', 'Arabic terminology', 'Principles', 'Prohibitions', 'Contract rules', 'Financing modes', 'Banking', 'Capital markets', 'Risk', 'Comparisons', 'Exam facts'];
D.chapters.forEach(c => {
  const smc = sm.chapters.find(x => x.number === c.number);
  if (!smc) return err('Chapter ' + c.number + ' not in source map');
  const norm = s => s.replace(/[‘’´'`]/g, "'").replace(/\s+/g, ' ').toLowerCase().replace(/[–—:]/g, '-');
  if (norm(smc.title).replace(/[^a-z]/g, '') !== norm(c.title).replace(/[^a-z]/g, '')) err('Chapter ' + c.number + ' title mismatch: "' + c.title + '" vs PDF "' + smc.title + '"');
  ['objectives', 'why', 'overview', 'summary', 'takeaways', 'checklist', 'flashcards', 'questions', 'exam'].forEach(k => { if (!c[k] || (Array.isArray(c[k]) && !c[k].length)) err('Chapter ' + c.number + ' missing ' + k); });
  c.topics.forEach(t => {
    if (T[t.id]) err('Duplicate topic id ' + t.id);
    T[t.id] = { t, c };
    ['title', 'simple', 'exam', 'intuition'].forEach(k => { if (!t[k]) err(t.id + ' missing ' + k); });
    if (!TIERS.includes(t.tier)) err(t.id + ' invalid tier ' + t.tier);
    if (!Array.isArray(t.pages) || t.pages.length !== 2 || t.pages[0] > t.pages[1]) err(t.id + ' invalid pages');
    else if (t.pages[0] < c.pages[0] || t.pages[1] > c.pages[1]) err(t.id + ' pages outside chapter range');
    (t.examples || []).forEach(e => { if (!['textbook', 'practice'].includes(e.kind)) err(t.id + ' example without kind'); });
    (t.debate || []).forEach(d => ['issue', 'criticism', 'response', 'takeaway'].forEach(k => { if (!d[k]) err(t.id + ' debate missing ' + k); }));
    if (t.quickCheck && (typeof t.quickCheck.answer !== 'number' || t.quickCheck.answer >= t.quickCheck.options.length)) err(t.id + ' quickCheck answer out of range');
  });
  // coverage: every source-map section/subsection must be covered by a topic section, a topic subsection,
  // the summary section, or be a heading whose subsections are covered.
  const covered = new Set(c.topics.map(t => t.section));
  c.topics.forEach(t => (t.subsections || []).forEach(s => covered.add(s.number)));
  const text = JSON.stringify(c.topics);
  smc.sections.forEach(s => {
    if (s.number == null) { if (!c.topics.some(t => t.section === 'Appendix')) err('Chapter ' + c.number + ' appendix not covered'); return; }
    const subsOk = (s.subsections || []).length && s.subsections.every(x => covered.has(x.number) || text.includes('"' + x.number + '"') || text.includes(x.number));
    if (!covered.has(s.number) && s.number !== c.summarySection && !subsOk) err('Section ' + s.number + ' (' + s.title + ') not covered');
    (s.subsections || []).forEach(x => { if (!covered.has(x.number) && !text.includes(x.number)) err('Subsection ' + x.number + ' (' + x.title + ') not covered'); });
  });
  c.flashcards.forEach(f => { if (F[f.id]) err('Duplicate flashcard ' + f.id); F[f.id] = 1; if (!FCATS.includes(f.cat)) err(f.id + ' bad category ' + f.cat); if (!f.front || !f.back) err(f.id + ' empty'); });
  c.questions.forEach(q => {
    if (Q[q.id]) err('Duplicate question ' + q.id); Q[q.id] = q;
    if (!QTYPES.includes(q.type)) err(q.id + ' bad type ' + q.type);
    ['q', 'explanation', 'topic', 'diff', 'level', 'obj'].forEach(k => { if (!q[k]) err(q.id + ' missing ' + k); });
    if (SINGLE.includes(q.type) && (typeof q.answer !== 'number' || !q.options || q.answer >= q.options.length)) err(q.id + ' answer out of range');
    if (q.type === 'tf' && typeof q.answer !== 'boolean') err(q.id + ' tf answer not boolean');
    if (q.type === 'multi' && (!Array.isArray(q.answer) || q.answer.some(i => i >= q.options.length))) err(q.id + ' multi answer invalid');
    if (q.type === 'match' && (!q.pairs || q.pairs.length < 2)) err(q.id + ' match pairs missing');
    if (q.type === 'order' && (!q.items || q.items.length < 3)) err(q.id + ' order items missing');
    if (q.type === 'short' && (!q.answer || !Array.isArray(q.keywords))) err(q.id + ' short answer/keywords missing');
  });
  c.exam.forEach(e => ['q', 'structure', 'keyConcepts', 'points', 'mistakes', 'topic'].forEach(k => { if (!e[k] || (Array.isArray(e[k]) && !e[k].length)) err(e.id + ' missing ' + k); }));
});
const has = id => !!T[id];
D.chapters.forEach(c => {
  c.topics.forEach(t => (t.related || []).forEach(r => { if (!has(r)) err(t.id + ' related → missing ' + r); }));
  c.flashcards.concat(c.questions, c.exam).forEach(x => { if (!has(x.topic)) err(x.id + ' → missing topic ' + x.topic); });
});
const C = new Set(R.concepts.map(c => c.id)), P = new Set(R.comparisons.pairs.map(p => p.id)), G = new Set(R.diagrams.map(d => d.id));
R.concepts.forEach(c => { c.topics.forEach(t => { if (!has(t)) err('concept ' + c.id + ' → ' + t); }); c.links.forEach(l => { if (!C.has(l.to)) err('concept link ' + c.id + ' → ' + l.to); }); ['oneLine', 'distinction', 'trigger'].forEach(k => { if (!c[k]) err('concept ' + c.id + ' missing ' + k); }); if (c.points.length !== 3) err('concept ' + c.id + ' needs 3 points'); });
R.glossary.forEach(g => { if (g.topic && !has(g.topic)) err('glossary ' + g.term + ' → ' + g.topic); if (!g.def) err('glossary ' + g.term + ' empty'); });
R.diagrams.forEach(d => { if (!has(d.topic)) err('diagram ' + d.id + ' topic'); const ps = new Set(d.parties.map(p => p.id)); d.steps.forEach((s, i) => { if (!ps.has(s.from) || !ps.has(s.to)) err('diagram ' + d.id + ' step ' + (i + 1) + ' bad party'); }); });
R.comparisons.pairs.forEach(p => { if (!has(p.topic)) err('pair ' + p.id + ' topic'); p.rows.forEach(r => { if (r.length !== p.cols.length + 1) err('pair ' + p.id + ' row width'); }); });
R.comparisons.modes.forEach(m => { if (!has(m.topic)) err('mode ' + m.id + ' topic'); });
R.cases.forEach(c => { if (!has(c.topic)) err('case ' + c.id + ' topic'); if (c.kind === 'practice' && !/generated for learning/i.test(c.title)) err('practice case ' + c.id + ' not labelled'); c.questions.forEach(q => { if (q.answer >= q.options.length) err('case ' + c.id + ' answer range'); }); });
Object.values(R.modeFinder.results).forEach(r => r.topics.forEach(t => { if (!has(t)) err('finder → ' + t); }));
Object.entries(R.modeFinder.nodes).forEach(([k, n]) => n.options.forEach(o => { if (o.next && !R.modeFinder.nodes[o.next]) err('finder node ' + k + ' → ' + o.next); if (o.result && !R.modeFinder.results[o.result]) err('finder result ' + o.result); }));
if (!/not a (Fatwa|Shari’ah ruling)/i.test(R.modeFinder.disclaimer)) err('mode finder disclaimer missing');
Object.entries(R.studyPlans).forEach(([k, pl]) => {
  let prevEnd = 0;
  pl.segments.forEach(s => {
    if (s.start !== prevEnd) err(k + ' segment "' + s.title + '" does not follow previous'); prevEnd = s.end;
    s.items.forEach(it => {
      if (it.type === 'concept' && !C.has(it.ref)) err(k + ' concept ' + it.ref);
      if (it.type === 'compare' && !P.has(it.ref)) err(k + ' compare ' + it.ref);
      if (it.type === 'diagram' && !G.has(it.ref)) err(k + ' diagram ' + it.ref);
      if (it.type === 'topic' && !has(it.ref)) err(k + ' topic ' + it.ref);
      (it.topics || []).forEach(t => { if (!has(t)) err(k + ' topic ' + t); });
    });
  });
  if (prevEnd !== pl.minutes) err(k + ' segments end at ' + prevEnd + ' not ' + pl.minutes);
});

// 5. Forbidden placeholder text in content and UI
const scan = [];
(function walk(dir) { fs.readdirSync(path.join(root, dir)).forEach(f => { const p = path.join(dir, f); const st = fs.statSync(path.join(root, p)); if (st.isDirectory()) walk(p); else if (/\.(js|html|css)$/.test(f)) scan.push(p); }); })('data');
['modules', '.'].forEach(d => fs.readdirSync(path.join(root, d)).filter(f => /\.(js|html)$/.test(f)).forEach(f => scan.push(path.join(d, f))));
fs.readdirSync(path.join(root, 'modules/views')).forEach(f => scan.push(path.join('modules/views', f)));
scan.forEach(f => {
  const s = fs.readFileSync(path.join(root, f), 'utf8');
  [/lorem ipsum/i, /coming soon/i, /\bTODO\b/, /add content later/i, /\bTBD\b/, /placeholder text/i].forEach(re => { if (re.test(s)) err('Forbidden placeholder ' + re + ' in ' + f); });
});

// 6. Course index freshness
const ci = fs.readFileSync(path.join(root, 'data/course-index.js'), 'utf8');
D.chapters.forEach(c => c.topics.forEach(t => { if (ci.indexOf('"' + t.id + '"') < 0) err('course-index.js is stale (missing ' + t.id + ') — run node tools/build-course-index.cjs'); }));

const totals = { topics: Object.keys(T).length, flashcards: Object.keys(F).length, questions: Object.keys(Q).length, quickChecks: Object.values(T).filter(x => x.t.quickCheck).length, exam: D.chapters.reduce((a, c) => a + c.exam.length, 0), glossary: R.glossary.length, concepts: R.concepts.length, diagrams: R.diagrams.length, comparisons: R.comparisons.pairs.length, cases: R.cases.length };
console.log('Content:', JSON.stringify(totals));
warnings.forEach(w => console.log('WARN', w));
if (errors.length) { errors.forEach(e => console.log('ERROR', e)); console.log(errors.length + ' error(s)'); process.exit(1); }
console.log('Validation passed: 0 errors, ' + warnings.length + ' warning(s).');
