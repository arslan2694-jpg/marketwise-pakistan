/* Canonical data build.
   Reads BOTH original applications (read-only, from /source-backup), reconciles them into one
   canonical schema, and writes merged-src/data/*.js. Also writes data/_audit.json with every
   count and decision the reports are generated from.  Usage: node tools/build-data.js */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadF1, loadF2 } = require('./lib/load-sources');
const SEC = require('./lib/sections');

const OUT = path.join(__dirname, '..', 'data');
const D1 = loadF1();
const D2 = loadF2();

/* ---------------------------------------------------------------- helpers */
const STOP = new Set('the a an of to in and or is are was were be by for on with as that this it its at from which what who how does do did into per not no than then'.split(' '));
function norm(s) { return String(s == null ? '' : s).normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[‘’`´'ʿʾ]/g, '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim(); }
function toks(s) { return new Set(norm(s).split(' ').filter(w => w && !STOP.has(w))); }
function jac(a, b) { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i || 1); }
function sim(a, b) { return jac(toks(a), toks(b)); }
function slug(s) { return norm(s).replace(/ /g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''); }
function uniq(a) { return Array.from(new Set(a)); }
function pad(n) { return n < 10 ? '0' + n : String(n); }
const audit = { generated: new Date().toISOString(), counts: {}, duplicates: {}, merged: {}, conflicts: [], unmapped: [], notes: [] };
function count(name, f1, f2, dup, comp, final, extra) { audit.counts[name] = Object.assign({ f1, f2, trueDuplicates: dup, complementary: comp, final }, extra || {}); }

const DIFF = { E: 'easy', M: 'medium', H: 'hard' };
const PART_ROMAN = { 'part-i': 'I', 'part-ii': 'II', 'part-iii': 'III' };

/* ------------------------------------------------------- topic index (F1 is the granular spine) */
const topicIndex = {};                   // id -> topic (canonical, mutated below)
const chapterTopics = {};                // n -> [{id, section, title}]
for (const n of Object.keys(D1.chapters).map(Number).sort((a, b) => a - b)) {
  chapterTopics[n] = D1.chapters[n].topics.map(t => ({ id: t.id, section: t.section, title: t.title, pages: t.pages }));
}
const topicsOf = (n) => chapterTopics[n];
function topicMeta(id) { for (const n in chapterTopics) { const t = chapterTopics[n].find(x => x.id === id); if (t) return t; } return null; }
function resolveSection(section, chapter) { return SEC.resolve(section, chapter, topicsOf); }
function sourceFor(topicId, chapter) {
  const t = topicMeta(topicId);
  return t ? { chapter, section: t.section, pages: t.pages } : { chapter };
}

/* ---------------------------------------------------------------- chapters + topics */
function normQuickCheck(qc) {
  if (!qc) return undefined;
  return { prompt: qc.q, options: qc.options, correctAnswer: qc.answer, explanation: qc.explanation };
}
function canonicalTopicFromF1(t) {
  const o = {
    id: t.id, section: t.section, title: t.title, pages: t.pages, tier: t.tier, concepts: t.concepts || [],
    intuition: t.intuition, simpleExplanation: t.simple, academicExplanation: t.academic, examExplanation: t.exam,
    keyPoints: t.keyPoints || [],
    definitions: (t.definitions || []).map(d => ({ term: d.term, definition: d.meaning })),
    examples: (t.examples || []).map(e => ({ title: e.title, kind: e.kind, text: e.text })),
    commonConfusions: t.confusions || [], relatedTopics: t.related || [], quickCheck: normQuickCheck(t.quickCheck),
    origin: ['f1'], aliases: [], supplements: []
  };
  if (t.subsections && t.subsections.length) o.subsections = t.subsections;
  if (t.distinctions && t.distinctions.length) o.distinctions = t.distinctions;
  if (t.principles && t.principles.length) o.principles = t.principles;
  if (t.conditions && t.conditions.length) o.conditions = t.conditions;
  if (t.steps && t.steps.length) o.processSteps = t.steps;
  if (t.table) o.table = t.table;
  if (t.debate && t.debate.length) o.debate = t.debate;
  if (t.calc) o.calc = t.calc;
  return o;
}
function supplementFromF2(t, chNum, covers) {
  const s = {
    id: t.id, origin: 'f2', sectionRange: t.sectionNumber, sectionTitle: t.sectionTitle, title: t.title, covers,
    overview: t.overview, simpleExplanation: t.simpleExplanation, academicExplanation: t.academicExplanation, examExplanation: t.examExplanation,
    keyPoints: t.keyPoints || [], definitions: (t.definitions || []).map(d => ({ term: d.term, definition: d.definition })),
    conditions: t.conditions || [], principles: t.principles || [], processSteps: t.processSteps || [],
    examples: (t.examples || []).map(e => ({ title: e.title, kind: e.generated ? 'practice' : 'textbook', text: e.body != null ? e.body : e.text })),
    commonConfusions: t.commonConfusions || [], distinctions: t.importantDistinctions || [], relatedConcepts: t.relatedConcepts || [],
    examRelevance: t.examRelevance, difficulty: t.difficulty, source: t.source
  };
  ['transactionSteps', 'calculations', 'issue', 'alternativeView', 'authorsResponse', 'studentTakeaway', 'criticism'].forEach(k => { if (t[k] && (!Array.isArray(t[k]) || t[k].length)) s[k] = t[k]; });
  return s;
}

const chapters = {};
const topicAlias = {};          // F2 topic id -> {primary, covers}
for (let n = 1; n <= 18; n++) {
  const c1 = D1.chapters[n], c2 = D2.chapters[n];
  const topics = c1.topics.map(canonicalTopicFromF1);
  const byId = {}; topics.forEach(t => { byId[t.id] = t; });
  /* F2 topics -> F1 topic (section range; ties broken by title similarity) */
  const resolved = c2.topics.map(t => ({ t, r: resolveSection(t.sectionNumber, n) }));
  const groups = {};
  resolved.forEach(x => { const k = x.r.covers.join('|'); (groups[k] = groups[k] || []).push(x); });
  Object.values(groups).forEach(g => {
    if (g.length > 1 && g[0].r.covers.length > 1) {
      const free = g[0].r.covers.slice();
      g.forEach((x, i) => {
        let best = null;
        free.forEach(id => { const s = sim(x.t.title + ' ' + x.t.sectionTitle, byId[id].title); if (!best || s > best.s) best = { id, s }; });
        if (!best || best.s < 0.05) best = { id: free[Math.min(i, free.length - 1)], s: 0 };
        x.primary = best.id; const ix = free.indexOf(best.id); if (ix > -1 && free.length > 1) free.splice(ix, 1);
      });
    } else g.forEach(x => { x.primary = x.r.primary; });
  });
  resolved.forEach(x => {
    const sup = supplementFromF2(x.t, n, x.r.covers);
    byId[x.primary].supplements.push(sup);
    byId[x.primary].origin = uniq(byId[x.primary].origin.concat('f2'));
    topicAlias[x.t.id] = { primary: x.primary, covers: x.r.covers, how: x.r.how };
    byId[x.primary].aliases.push(x.t.id);
  });
  topics.forEach(t => { topicIndex[t.id] = t; });

  /* learning objectives: union with near-duplicate merge */
  const los = [];
  const addLO = (text, origin) => {
    const hit = los.find(l => sim(l.text, text) >= 0.6);
    if (hit) { if (hit.origin.indexOf(origin) < 0) hit.origin.push(origin); hit.altText = hit.altText || (norm(hit.text) === norm(text) ? undefined : text); }
    else los.push({ id: 'lo-ch' + n + '-' + (los.length + 1), text, origin: [origin] });
  };
  c1.objectives.forEach(t => addLO(t, 'f1')); c2.learningObjectives.forEach(t => addLO(t, 'f2'));
  const loMap = {};   // for question objective linking
  /* takeaways: union, near-duplicates collapsed */
  const tk = [];
  c1.takeaways.forEach(t => tk.push({ text: t, origin: 'f1' }));
  c2.keyTakeaways.forEach(t => { if (tk.some(x => norm(x.text) === norm(t))) audit.merged.takeaways = (audit.merged.takeaways || 0) + 1; else tk.push({ text: t, origin: 'f2' }); });   /* only exact repeats are collapsed */
  if (norm(c1.title) !== norm(c2.title)) audit.conflicts.push({ type: 'chapter-title', chapter: n, f1: c1.title, f2: c2.title, resolution: 'F1 title kept as canonical; F2 title stored as titleAlt' });
  if (c1.minutes !== c2.estimatedMinutes) audit.conflicts.push({ type: 'chapter-minutes', chapter: n, f1: c1.minutes, f2: c2.estimatedMinutes, resolution: 'F1 estimate kept for consistency with F1 planner; F2 kept in estimates.f2' });
  chapters[n] = {
    number: n, title: c1.title, titleAlt: norm(c1.title) !== norm(c2.title) ? c2.title : undefined, part: c1.part, partRoman: PART_ROMAN[c1.part], pages: c1.pages,
    minutes: c1.minutes, estimates: { f1: c1.minutes, f2: c2.estimatedMinutes }, difficulty: c1.difficulty, difficultyAlt: c2.difficulty,
    learningObjectives: los, why: c1.why, whyExpanded: c2.whyItMatters, overview: c1.overview, summary: c1.summary, summaryExpanded: c2.chapterSummary,
    summarySection: c1.summarySection, takeaways: tk.map(x => x.text), takeawayOrigins: tk.map(x => x.origin), checklist: c1.checklist,
    topics, questions: [], flashcards: [], exam: []
  };
  audit.merged['chapter' + n + 'LOs'] = { f1: c1.objectives.length, f2: c2.learningObjectives.length, merged: los.length };
}
count('chapters', 18, 18, 18, 0, 18);
count('topics', 311, 225, 0, 225, 311, { note: 'F2 topics are attached as supplements to their F1 spine topic; none discarded', supplements: 225 });

/* ---------------------------------------------------------------- questions */
const qDup = [];
function optText(q) {
  if (q.type === 'order') return (q.items || []).join(' ');
  if (q.type === 'match') return (q.pairs || []).map(p => p.join(' ')).join(' ');
  const a = q.correctAnswer, o = q.options || [];
  if (typeof a === 'number') return o[a];
  if (typeof a === 'boolean') return a ? 'true' : 'false';
  if (Array.isArray(a)) return a.map(i => typeof i === 'number' ? o[i] : i).join(' ');
  return String(a);
}
function fromF1Question(q, n) {
  const c = { id: q.id, type: q.type, prompt: q.q };
  if (q.options) c.options = q.options;
  if (q.pairs) c.pairs = q.pairs;
  if (q.items) c.items = q.items;
  if (q.keywords) c.keywords = q.keywords;
  c.correctAnswer = q.type === 'match' || q.type === 'order' ? undefined : q.answer;
  c.explanation = q.explanation; c.topicId = q.topic; c.chapter = n;
  const t = topicMeta(q.topic); c.section = t ? t.section : undefined;
  c.difficulty = DIFF[q.diff]; c.cognitiveLevel = q.level; c.objective = q.obj;
  c.source = sourceFor(q.topic, n); c.origin = ['f1']; c.aliases = [];
  return c;
}
function parseMatchPairs(q) {
  // "...: Capital, Land, Labour, Entrepreneur." with options in matching order
  const m = /:\s*([^:]+?)\.?\s*$/.exec(q.prompt);
  if (!m) return null;
  const left = m[1].split(/,\s*/).map(s => s.trim()).filter(Boolean);
  if (left.length !== q.options.length || left.length < 2) return null;
  if (!Array.isArray(q.correctAnswer) || q.correctAnswer.some((v, i) => v !== i)) return null;
  return left.map((l, i) => [l, q.options[q.correctAnswer[i]]]);
}
function fromF2Question(q) {
  const r = resolveSection(q.section, q.chapter);
  const c = { id: q.id, type: q.type, prompt: q.prompt };
  c.explanation = q.explanation; c.topicId = r.primary; c.chapter = q.chapter; c.section = q.section; c.topicLabel = q.topic;
  c.difficulty = q.difficulty; c.cognitiveLevel = q.cognitiveLevel; c.objective = q.learningObjective;
  c.source = q.source; c.origin = ['f2']; c.aliases = [];
  const opts = q.options || [];
  switch (q.type) {
    case 'truefalse': c.type = 'tf'; c.correctAnswer = q.correctAnswer === 0 || q.correctAnswer === true; break;
    case 'multiselect': c.type = 'multi'; c.options = opts; c.correctAnswer = q.correctAnswer; break;
    case 'ordering':
      if (Array.isArray(q.correctAnswer)) { c.type = 'order'; c.items = q.correctAnswer.map(i => opts[i]); }
      else { c.type = 'mcq'; c.format = 'ordering'; c.options = opts; c.correctAnswer = q.correctAnswer; }
      break;
    case 'matching': {
      const pairs = Array.isArray(q.correctAnswer) ? parseMatchPairs(q) : null;
      if (pairs) { c.type = 'match'; c.pairs = pairs; }
      else { c.type = 'mcq'; c.format = 'matching'; c.options = opts; c.correctAnswer = q.correctAnswer; }
      break;
    }
    case 'short': case 'definition':
      if (opts.length) { c.type = q.type; c.options = opts; c.correctAnswer = q.correctAnswer; }
      else { c.type = 'short'; if (q.type === 'definition') c.format = 'definition'; c.correctAnswer = q.correctAnswer; }
      break;
    default:
      if (!opts.length && typeof q.correctAnswer === 'string') { c.type = 'short'; c.format = q.type; c.correctAnswer = q.correctAnswer; }   /* written-answer form of identify / scenario / comparison items */
      else { c.options = opts; c.correctAnswer = q.correctAnswer; }
  }
  return c;
}
const allQ = { f1: 0, f2: 0, dup: 0 };
const qAlias = {};
for (let n = 1; n <= 18; n++) {
  const list = D1.chapters[n].questions.map(q => fromF1Question(q, n));
  allQ.f1 += list.length;
  const f2 = D2.questions.filter(q => q.chapter === n).map(fromF2Question);
  allQ.f2 += f2.length;
  f2.forEach(b => {
    const cand = list.filter(a => a.origin[0] === 'f1').map(a => ({ a, ps: sim(a.prompt, b.prompt), as: sim(String(optText(a)), String(optText(b))) }))
      .filter(x => x.ps >= 0.5 && x.as >= 0.8).sort((x, y) => y.ps - x.ps)[0];
    if (cand && cand.a.type === b.type || (cand && ['mcq', 'identify', 'comparison', 'scenario', 'application', 'definition'].indexOf(cand.a.type) > -1 && ['mcq', 'identify', 'comparison', 'scenario', 'application', 'definition'].indexOf(b.type) > -1)) {
      cand.a.aliases.push(b.id); cand.a.origin = uniq(cand.a.origin.concat('f2'));
      if (norm(cand.a.explanation) !== norm(b.explanation)) cand.a.explanationAlt = b.explanation;
      qAlias[b.id] = cand.a.id; qDup.push({ keep: cand.a.id, dropped: b.id, promptSim: +cand.ps.toFixed(2), answerSim: +cand.as.toFixed(2), keptPrompt: cand.a.prompt, droppedPrompt: b.prompt });
    } else list.push(b);
  });
  chapters[n].questions = list;
}
allQ.dup = qDup.length;
audit.duplicates.questions = qDup;
count('questions', allQ.f1, allQ.f2, qDup.length, 0, Object.values(chapters).reduce((s, c) => s + c.questions.length, 0));

/* ---------------------------------------------------------------- flashcards */
const fDup = [];
const fAlias = {};
let f1cards = 0, f2cards = 0;
for (let n = 1; n <= 18; n++) {
  const list = D1.chapters[n].flashcards.map(f => ({ id: f.id, front: f.front, back: f.back, category: f.cat, topicId: f.topic, chapter: n, source: sourceFor(f.topic, n), origin: ['f1'], aliases: [] }));
  f1cards += list.length;
  const f2 = D2.flashcards.filter(f => f.chapter === n);
  f2cards += f2.length;
  f2.forEach(b => {
    const r = resolveSection(b.source && b.source.section, n);
    const c = { id: b.id, front: b.front, back: b.back, category: b.category, topicId: r.primary, chapter: n, source: b.source, origin: ['f2'], aliases: [] };
    const hit = list.filter(a => a.origin[0] === 'f1').map(a => ({ a, fs: sim(a.front, b.front), bs: sim(a.back, b.back) })).filter(x => x.fs >= 0.6 && x.bs >= 0.8).sort((x, y) => y.fs - x.fs)[0];
    if (hit) {
      hit.a.aliases.push(c.id); hit.a.origin = uniq(hit.a.origin.concat('f2')); fAlias[c.id] = hit.a.id;
      if (norm(hit.a.back) !== norm(c.back)) hit.a.backAlt = c.back;
      fDup.push({ keep: hit.a.id, dropped: c.id, frontSim: +hit.fs.toFixed(2), backSim: +hit.bs.toFixed(2), keptFront: hit.a.front, droppedFront: c.front });
    } else list.push(c);
  });
  chapters[n].flashcards = list;
}
audit.duplicates.flashcards = fDup;
count('flashcards', f1cards, f2cards, fDup.length, 0, Object.values(chapters).reduce((s, c) => s + c.flashcards.length, 0));

/* ---------------------------------------------------------------- exam prompts (long/short answer trainer) */
const eDup = [];
let e1 = 0, e2 = 0;
for (let n = 1; n <= 18; n++) {
  const list = D1.chapters[n].exam.map(e => ({ id: e.id, kind: e.kind, prompt: e.q, expectedStructure: e.structure, keyConcepts: e.keyConcepts, essentialPoints: e.points, commonMistakes: e.mistakes, topicId: e.topic, chapter: n, source: sourceFor(e.topic, n), origin: ['f1'], aliases: [] }));
  e1 += list.length;
  D2.examPrep.trainerSets.filter(t => t.chapter === n).forEach(t => {
    e2++;
    const r = resolveSection(t.source && t.source.section, n);
    const c = { id: t.id, kind: 'answer-plan', prompt: t.question, expectedStructure: t.expectedStructure, keyConcepts: t.keyConcepts, essentialPoints: t.essentialPoints, commonMistakes: t.commonMistakes, topicId: r.primary, chapter: n, source: t.source, origin: ['f2'], aliases: [] };
    const hit = list.filter(a => a.origin[0] === 'f1').map(a => ({ a, s: sim(a.prompt, c.prompt) })).filter(x => x.s >= 0.65).sort((x, y) => y.s - x.s)[0];
    if (hit) { eDup.push({ f1: hit.a.id, f2: c.id, sim: +hit.s.toFixed(2), action: 'kept both: F2 essential points/structure differ; linked as related' }); c.relatedPrompt = hit.a.id; }
    list.push(c);
  });
  chapters[n].exam = list;
}
audit.duplicates.examPrompts = eDup;
count('examPrompts', e1, e2, 0, eDup.length, Object.values(chapters).reduce((s, c) => s + c.exam.length, 0));

/* ---------------------------------------------------------------- glossary + acronyms */
function gkey(t) { return norm(t).replace(/[^a-z]/g, '').replace(/h/g, 'h'); }
function lev(a, b) { const m = []; for (let i = 0; i <= a.length; i++) m[i] = [i]; for (let j = 0; j <= b.length; j++) m[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return m[a.length][b.length]; }
/* Transliteration variants of the same glossary term (verified by reading both definitions). */
const GLOSS_MANUAL = { 'Hilah, Hiyal (plural)': 'Hilah (Hiyal)', '‘Inan (a type of Shirkah)': '‘Inan', 'W‘adah': 'Wa‘d', 'Zakah/Zakat': 'Zakah', 'Saw´am-bi-sawaa´': 'Sawa’an bi-sawa’in' };
const g2 = new Map();
{
  const f1keys = D1.sets.glossary.map(g => gkey(g.term));
  D2.glossary.forEach(g => {
    let k = gkey(g.term);
    if (GLOSS_MANUAL[g.term]) k = gkey(GLOSS_MANUAL[g.term]);
    else if (f1keys.indexOf(k) < 0) { const near = f1keys.find(x => lev(x, k) <= 1); if (near) k = near; }
    if (g2.has(k)) g2.get(k).extra = (g2.get(k).extra || []).concat(g); else g2.set(k, Object.assign({}, g));
  });
}
const usedG2 = new Set();
const glossary = [];
function topicByPage(chapter, page) {
  const list = chapterTopics[chapter] || [];
  let best = null;
  list.forEach(t => { if (t.pages && page >= t.pages[0] && page <= t.pages[1]) best = best || t; });
  return best ? best.id : null;
}
D1.sets.glossary.forEach(g => {
  const m = g2.get(gkey(g.term));
  const e = { id: 'g-' + slug(g.term), term: g.term, category: g.cat, definition: g.def, glossaryPage: g.page, topicId: g.topic || null, origin: ['f1'], aliases: [], source: { book: 'Understanding Islamic Finance (Ayub)', section: 'Glossary', pages: [g.page] } };
  if (m) {
    usedG2.add(gkey(g.term)); e.origin.push('f2');
    if (norm(m.term) !== norm(g.term)) e.aliases.push(m.term);
    if (norm(g.def) !== norm(m.definition) && sim(g.def, m.definition) < 0.95) e.extendedDefinition = m.definition;
    if (m.relatedTerms && m.relatedTerms.length) e.relatedTerms = m.relatedTerms;
    if (m.chapter) e.chapter = m.chapter;
    if (m.pages) e.discussedOnPages = m.pages;
    if (!e.topicId && m.chapter && m.pages) e.topicId = topicByPage(m.chapter, m.pages[0]);
  }
  glossary.push(e);
});
const f2OnlyGlossary = [];
D2.glossary.forEach(g => {
  const kk = GLOSS_MANUAL[g.term] ? gkey(GLOSS_MANUAL[g.term]) : gkey(g.term);
  if (usedG2.has(kk) || g2.has(kk) && D1.sets.glossary.some(x => gkey(x.term) === kk)) return;
  if ([...g2.keys()].some(k => usedG2.has(k) && lev(k, kk) <= 1)) return;
  const e = { id: 'g-' + slug(g.term), term: g.term, category: 'Additional terms', definition: g.definition, origin: ['f2'], aliases: [], source: { book: 'Understanding Islamic Finance (Ayub)', section: 'Glossary' } };
  if (g.relatedTerms && g.relatedTerms.length) e.relatedTerms = g.relatedTerms;
  if (g.chapter) e.chapter = g.chapter;
  if (g.pages) { e.discussedOnPages = g.pages; e.source.pages = g.pages; }
  if (g.chapter && g.pages) e.topicId = topicByPage(g.chapter, g.pages[0]);
  glossary.push(e); f2OnlyGlossary.push(g.term);
});
/* ensure unique ids */
{ const seen = {}; glossary.forEach(g => { if (seen[g.id]) g.id += '-' + (seen[g.id]++); else seen[g.id] = 1; }); }
audit.merged.glossaryF2Only = f2OnlyGlossary;
count('glossary', D1.sets.glossary.length, D2.glossary.length, usedG2.size, 0, glossary.length, { note: 'duplicates = same term in both glossaries; definitions from both retained where they differ' });
const acronyms = D2.acronyms.map(a => ({ id: 'ac-' + slug(a.acronym), acronym: a.acronym, expansion: a.expansion, origin: ['f2'], source: { book: 'Understanding Islamic Finance (Ayub)', section: 'Acronyms and Abbreviations' } }));
{ const seen = {}; acronyms.forEach(a => { if (seen[a.id]) a.id += '-' + (seen[a.id]++); else seen[a.id] = 1; }); }
count('acronyms', 0, D2.acronyms.length, 0, 0, acronyms.length);

/* ---------------------------------------------------------------- financing modes (contracts) */
const MODE_ALIAS = { istisna: 'istisnaa', imbt: 'ijarah-muntahia-bi-tamleek', dm: 'diminishing-musharakah', jualah: 'juaalah', istijrar: 'bai-al-istijrar', qard: 'qard-hasan' };
const CONCEPT_OF_MODE = { istisnaa: 'istisna', 'ijarah-muntahia-bi-tamleek': 'imbt', 'diminishing-musharakah': 'diminishing-musharakah', juaalah: 'jualah', 'bai-al-istijrar': 'istijrar', 'qard-hasan': 'qard', kafalah: 'security', rahn: 'security' };
const modeIdOf = (id) => MODE_ALIAS[id] || id;
const cmpModes = {}; D1.sets.comparisons.modes.forEach(m => { cmpModes[modeIdOf(m.id)] = m; });
const modes = D2.productsMatrix.map(m => {
  const c = {
    id: m.id, name: m.name, category: m.category, chapter: m.chapter, conceptId: CONCEPT_OF_MODE[m.id] || m.id,
    shariahBasis: m.shariahBasis, subjectMatter: m.subjectMatter, ownershipRiskTiming: m.ownershipRiskTiming, returnType: m.returnType, returnTypeDetail: m.returnTypeDetail,
    typicalTenor: m.typicalTenor, liquidityTradability: m.liquidityTradability, commonUse: m.commonUse, keyConditions: m.keyConditions, majorRisks: m.majorRisks,
    distinguishingFeature: m.distinguishingFeature, source: m.source, origin: ['f2'], aliases: []
  };
  const a = cmpModes[m.id];
  if (a) {
    c.attributes = { category: a.category, nature: a.nature, ownership: a.ownership, return: a.return, payment: a.payment, late: a.late, tenor: a.tenor, uses: a.uses, keyRule: a.keyRule, pitfall: a.pitfall };
    c.topicId = a.topic; c.origin.push('f1'); c.aliases.push(a.id); if (a.name !== c.name) c.altNames = [a.name];
  }
  return c;
});
D1.sets.comparisons.modes.forEach(m => { if (!modes.find(x => x.id === modeIdOf(m.id))) audit.unmapped.push({ type: 'mode', id: m.id }); });
/* modes lacking an F1 topic get the first topic of their chapter's source section */
modes.forEach(m => {
  if (!m.topicId && m.source && m.source.section) { const r = resolveSection(m.source.section, m.chapter); if (r) m.topicId = r.primary; }
  if (!m.topicId && m.chapter) m.topicId = chapterTopics[m.chapter][0].id;
});
count('financingModes', D1.sets.comparisons.modes.length, D2.productsMatrix.length, D1.sets.comparisons.modes.length, D2.productsMatrix.length - D1.sets.comparisons.modes.length, modes.length, { note: 'the 12 F1 comparison modes are a subset of the 19 F2 modes; attribute matrices merged' });

/* ---------------------------------------------------------------- concepts + edges */
const CONCEPT_ALIAS = { 'maisir-qimar': 'maisir', istisnaa: 'istisna', 'ijarah-muntahia-bi-tamleek': 'imbt', juaalah: 'jualah', 'bai-al-istijrar': 'istijrar', 'qard-hasan': 'qard',
  'islamic-economic-system': 'islamic-economics', 'khiyar-options': 'khiyar', 'islamic-banking-overview': 'islamic-banking', 'bai-al-dayn': 'bai-dayn', 'wadah-promise': 'wad',
  'bai-exchange': 'bai', 'mal-usufruct-ownership': 'mal', 'contract-elements': 'aqd', kafalah: 'security', rahn: 'security', 'investment-funds': 'islamic-funds' };
const STAGE_GROUP = { foundations: 'Foundations', prohibitions: 'Prohibitions', contracts: 'Principles', modes: 'Sale-based modes', markets: 'Banking & markets', appraisal: 'Principles' };
const concepts = D1.sets.concepts.map(c => ({
  id: c.id, name: c.name, group: c.group, tags: c.tags, oneLine: c.oneLine, points: c.points, distinction: c.distinction, trigger: c.trigger, topicIds: c.topics, origin: ['f1'], aliases: []
}));
const cById = {}; concepts.forEach(c => { cById[c.id] = c; });
let conceptMerged = 0;
D2.conceptMap.nodes.forEach(n => {
  const target = CONCEPT_ALIAS[n.id] || n.id;
  if (cById[target]) {
    const c = cById[target]; conceptMerged++;
    c.stage = c.stage || n.group; c.chapter = c.chapter || n.chapter; c.origin = uniq(c.origin.concat('f2'));
    if (n.id !== target) c.aliases.push(n.id);
    if (norm(n.label) !== norm(c.name) || n.label !== c.name && n.id !== target) (c.altNames = c.altNames || []).push(n.label);
  } else {
    const c = { id: n.id, name: n.label, group: STAGE_GROUP[n.group] || 'Principles', groupDerivedFromStage: true, tags: [n.id], stage: n.group, chapter: n.chapter, topicIds: [], origin: ['f2'], aliases: [], mapNodeOnly: true };
    concepts.push(c); cById[c.id] = c;
  }
});
const conceptAlias = {}; D2.conceptMap.nodes.forEach(n => { conceptAlias[n.id] = CONCEPT_ALIAS[n.id] || n.id; });
const edges = []; const seenEdge = new Set();
function addEdge(from, to, kind, label, origin) {
  if (from === to) return;
  const k = from + '|' + to + '|' + kind; if (seenEdge.has(k)) { const e = edges.find(x => x.from === from && x.to === to && x.kind === kind); if (e && origin && e.origin.indexOf(origin) < 0) e.origin.push(origin); return; }
  seenEdge.add(k); const e = { from, to, kind, origin: [origin] }; if (label) e.label = label; edges.push(e);
}
D1.sets.concepts.forEach(c => (c.links || []).forEach(l => addEdge(c.id, l.to, 'relation', l.label, 'f1')));
D2.conceptMap.edges.forEach(e => addEdge(conceptAlias[e.from], conceptAlias[e.to], 'flow', null, 'f2'));
edges.forEach(e => { if (!cById[e.from] || !cById[e.to]) audit.unmapped.push({ type: 'concept-edge', from: e.from, to: e.to }); });
/* concept -> topic links for F2-only nodes: none invented (chapter only) */
count('concepts', D1.sets.concepts.length, D2.conceptMap.nodes.length, conceptMerged, 0, concepts.length, { note: 'duplicates = F2 map nodes that are the same concept as an F1 concept (merged, F2 id kept as alias)' });
count('conceptEdges', D1.sets.concepts.reduce((s, c) => s + (c.links || []).length, 0), D2.conceptMap.edges.length, D1.sets.concepts.reduce((s, c) => s + (c.links || []).length, 0) + D2.conceptMap.edges.length - edges.length, 0, edges.length);

/* ---------------------------------------------------------------- diagrams */
const products = D1.sets.products.map(p => ({
  id: p.id, name: p.name, category: p.cat, who: p.who, use: p.use, need: p.need, contracts: p.contracts, modeIds: uniq(p.contracts.map(modeIdOf).filter(id => modes.find(m => m.id === id))),
  topicIds: p.topics, how: p.how, numerical: p.numerical, controls: p.controls, risks: p.risks, conventional: p.conventional,
  diagramId: p.diagram, calcId: p.calc, caseIds: p.cases, origin: ['f1']
}));
const diagrams = D1.sets.diagrams.map(d => ({
  id: d.id, title: d.title, topicId: d.topic, conceptId: d.concept, modeId: modes.find(m => m.id === modeIdOf(d.concept)) ? modeIdOf(d.concept) : undefined,
  productIds: products.filter(p => p.diagramId === d.id).map(p => p.id), summary: d.summary, parties: d.parties, steps: d.steps, rules: d.rules, pitfalls: d.pitfalls, origin: ['f1']
}));
count('products', D1.sets.products.length, 0, 0, 0, products.length, { note: 'F2 has no product records at product granularity; its 19-record matrix is the financing-mode layer' });
count('diagrams', D1.sets.diagrams.length, 0, 0, 0, diagrams.length, { note: 'F2 topic transactionSteps (18) are step lists without parties and were kept as topic supplements, not converted into diagrams' });

/* ---------------------------------------------------------------- comparisons */
const CMP_PAIR = { 'riba-trade': 'riba-vs-trade', 'murabaha-musawamah': 'murabaha-vs-musawamah', 'salam-istisna': 'salam-vs-istisnaa', 'ijarah-bai': 'ijarah-vs-bai',
  'ijarah-lease': 'ijarah-vs-conventional-leasing', 'musharakah-mudarabah': 'mudarabah-vs-musharakah', 'sukuk-bonds-shares': 'sukuk-vs-conventional-bonds',
  'takaful-insurance': 'takaful-vs-conventional-insurance', 'islamic-conventional-banking': 'islamic-vs-conventional-banking', 'musharakah-debt': 'musharakah-vs-debt-financing',
  'tawarruq-inah': 'tawarruq-vs-bai-al-inah', 'wakalah-mudarabah': 'wakalah-vs-mudarabah' };
const f2cmp = {}; D2.comparisons.forEach(c => { f2cmp[c.id] = c; });
const usedF2cmp = new Set();
const comparisons = D1.sets.comparisons.pairs.map(p => ({ id: p.id, title: p.title, topicId: p.topic, columns: p.cols, rows: p.rows.map(r => r.slice()), origin: ['f1'], aliases: [] }));
comparisons.forEach(p => {
  const f2id = CMP_PAIR[p.id]; if (!f2id) return;
  const c = f2cmp[f2id]; usedF2cmp.add(f2id);
  p.origin.push('f2'); p.aliases.push(f2id); p.titleAlt = c.title; p.summary = c.summary; p.source = c.source;
  p.columnsAlt = [c.itemALabel, c.itemBLabel];
  const have = p.rows.map(r => r[0]);
  /* align the two F2 items with the F1 columns (by label similarity, else by position); other columns stay empty */
  const colOf = (label, dflt) => { let best = -1, bs = 0.25; p.columns.forEach((cl, i) => { const s2 = sim(cl, label); if (s2 > bs) { bs = s2; best = i; } }); return best > -1 ? best : dflt; };
  let ia = colOf(c.itemALabel, 0), ib = colOf(c.itemBLabel, 1); if (ib === ia) ib = ia === 0 ? 1 : 0;
  c.dimensions.forEach(d => {
    const label = have.some(h => sim(h, d.dimension) >= 0.6) ? d.dimension + ' (extended)' : d.dimension;
    const row = [label].concat(p.columns.map(() => '—')); row[1 + ia] = d.itemA; row[1 + ib] = d.itemB;
    p.rows.push(row);
  });
});
D2.comparisons.forEach(c => {
  if (usedF2cmp.has(c.id)) return;
  const sec = c.source && c.source.sections && c.source.sections[0], ch = c.source && c.source.chapters && c.source.chapters[0];
  const r = sec && ch ? resolveSection(sec, ch) : null;
  comparisons.push({ id: c.id, title: c.title, topicId: r ? r.primary : undefined, columns: [c.itemALabel, c.itemBLabel], rows: c.dimensions.map(d => [d.dimension, d.itemA, d.itemB]), summary: c.summary, source: c.source, origin: ['f2'], aliases: [] });
});
count('comparisons', D1.sets.comparisons.pairs.length, D2.comparisons.length, 0, usedF2cmp.size, comparisons.length, { note: 'duplicates column = 0 (no comparison was dropped); ' + usedF2cmp.size + ' F1/F2 pairs on the same topic were merged with all rows from both kept' });
const compareAspects = D1.sets.comparisons.aspects.map(a => ({ key: a.key, label: a.label, origin: 'f1' })).concat([
  { key: 'shariahBasis', label: 'Shari’ah basis', origin: 'f2' }, { key: 'subjectMatter', label: 'Subject matter', origin: 'f2' }, { key: 'ownershipRiskTiming', label: 'Ownership, risk and timing', origin: 'f2' },
  { key: 'returnType', label: 'Return type', origin: 'f2' }, { key: 'returnTypeDetail', label: 'Return detail', origin: 'f2' }, { key: 'typicalTenor', label: 'Typical tenor (detail)', origin: 'f2' },
  { key: 'liquidityTradability', label: 'Liquidity and tradability', origin: 'f2' }, { key: 'commonUse', label: 'Common use (detail)', origin: 'f2' }, { key: 'keyConditions', label: 'Key conditions', origin: 'f2', list: true },
  { key: 'majorRisks', label: 'Major risks', origin: 'f2', list: true }, { key: 'distinguishingFeature', label: 'Distinguishing feature', origin: 'f2' }]);

/* ---------------------------------------------------------------- cases */
const MODE_KEYWORDS = [[/murabaha|mpo/i, 'murabaha'], [/musawamah/i, 'musawamah'], [/\bsalam\b/i, 'salam'], [/istisna/i, 'istisnaa'], [/muntahia|imbt/i, 'ijarah-muntahia-bi-tamleek'], [/ijarah/i, 'ijarah'],
  [/diminishing/i, 'diminishing-musharakah'], [/musharakah/i, 'musharakah'], [/mudarabah|mudarib/i, 'mudarabah'], [/wakalah|wakalatul/i, 'wakalah'], [/ju.?alah/i, 'juaalah'], [/hawalah/i, 'hawalah'],
  [/sukuk/i, 'sukuk'], [/takaful/i, 'takaful'], [/tawarruq/i, 'tawarruq'], [/qard/i, 'qard-hasan'], [/kafalah/i, 'kafalah'], [/\brahn\b/i, 'rahn'], [/istijrar/i, 'bai-al-istijrar']];
function modesFromText(text) { return uniq(MODE_KEYWORDS.filter(k => k[0].test(text)).map(k => k[1])); }
const cases = D1.sets.cases.map(c => {
  const t = topicMeta(c.topic); const ch = Number((/^t(\d+)/.exec(c.topic) || [])[1]);
  return { id: c.id, kind: c.kind, title: c.title, chapter: ch, topicId: c.topic, modeIds: uniq([modeIdOf(c.mode)].filter(id => modes.find(m => m.id === id))), scenario: c.scenario, facts: c.facts, questions: (c.questions || []).map(q => ({ prompt: q.q, options: q.options, correctAnswer: q.answer, explanation: q.explanation })), analysis: c.analysis, takeaways: c.takeaways, source: sourceFor(c.topic, ch), productIds: products.filter(p => (p.caseIds || []).indexOf(c.id) > -1).map(p => p.id), origin: ['f1'] };
});
D2.caseStudies.forEach(c => {
  const r = resolveSection(c.source && c.source.section, c.chapter);
  cases.push({ id: c.id, kind: 'scenario', title: c.title, chapter: c.chapter, topicId: r.primary, conceptLabel: c.concept, modeIds: modesFromText(c.title + ' ' + c.concept), scenario: c.scenario, problem: c.problemPrompt, prompts: c.analysisPrompts, answer: c.textbookAnswer, explanation: c.whyExplanation, examTakeaway: c.examTakeaway, source: c.source, disclaimer: c.disclaimer, productIds: [], origin: ['f2'] });
});
count('cases', D1.sets.cases.length, D2.caseStudies.length, 0, 0, cases.length, { note: 'no cases dropped: different applications of the same concept remain separate' });

/* ---------------------------------------------------------------- mode finder (two pathways, one tool) */
function optsF1(o) { return o.map(x => x.next ? { label: x.label, next: x.next } : { label: x.label, result: x.result }); }
const finderResults = {};
Object.entries(D1.sets.modeFinder.results).forEach(([id, r]) => {
  finderResults['n-' + id] = { id: 'n-' + id, title: r.title, why: r.why, topicIds: r.topics, cautions: r.cautions, modeIds: uniq([modeIdOf(id.replace('parallel-', '').replace('ujrah', 'ijarah'))].filter(m => modes.find(x => x.id === m))), pathway: 'need', origin: ['f1'] };
});
Object.entries(D2.decisionTree.results).forEach(([id, r]) => {
  const rid = id;
  finderResults[rid] = { id: rid, title: r.modes.join(' / '), why: r.whyRelevant, structure: r.basicStructure, keyConditions: r.keyConditions, risks: r.majorRisks, chapter: r.chapter, modeIds: modesFromText(r.modes.join(' ')), pathway: 'purpose', origin: ['f2'] };
});
function convNodes(nodes, prefixFor) {
  const out = {};
  Object.entries(nodes).forEach(([id, n]) => { out[id] = { id, q: n.q || n.prompt, options: n.options.map(o => { const r = { label: o.label }; const nx = o.next; if (nx && /^r-/.test(nx)) r.result = nx; else if (nx && nodes[nx]) r.next = nx; else if (nx && finderResults['n-' + nx]) r.result = 'n-' + nx; else if (o.result) r.result = 'n-' + o.result; else if (nx) r.next = nx; return r; }) }; });
  return out;
}
const needNodes = convNodes(D1.sets.modeFinder.nodes);
Object.values(needNodes).forEach(n => n.options.forEach(o => { if (o.next && !needNodes[o.next] && finderResults['n-' + o.next]) { o.result = 'n-' + o.next; delete o.next; } }));
const purposeNodes = convNodes(D2.decisionTree.questions);
const modeFinder = {
  disclaimers: [D1.sets.modeFinder.disclaimer, D2.decisionTree.disclaimer],
  pathways: [
    { id: 'need', title: 'By client need', start: D1.sets.modeFinder.start, nodes: needNodes, origin: 'f1' },
    { id: 'purpose', title: 'By financing purpose', start: D2.decisionTree.root, nodes: purposeNodes, origin: 'f2' }
  ],
  results: finderResults
};
count('modeFinderResults', Object.keys(D1.sets.modeFinder.results).length, Object.keys(D2.decisionTree.results).length, 0, Object.keys(finderResults).length, Object.keys(finderResults).length, { note: 'two pathways (by need / by purpose) share one renderer; results kept from both' });

/* ---------------------------------------------------------------- study plans */
const PLAN_MAP = { crash45: '45', revision90: '90', deep180: '180' };
const studyPlans = {};
Object.entries(D1.sets.studyPlans).forEach(([id, p]) => {
  const f2 = D2.studyModes[PLAN_MAP[id]];
  studyPlans[id] = Object.assign({}, p, { aliases: [PLAN_MAP[id]], roadmap: f2.segments.map(s => ({ label: s.label, startMin: s.startMin, endMin: s.endMin, chapters: s.chapters, summary: s.summary, comparisons: !!s.comparisons, topicRefs: s.topicRefs })), roadmapTitle: f2.title });
  if (f2.totalMinutes !== p.minutes) audit.conflicts.push({ type: 'study-plan-minutes', plan: id, f1: p.minutes, f2: f2.totalMinutes, resolution: 'F1 minutes kept' });
});
count('studyModes', 3, 3, 0, 3, 3, { note: 'F1 item lists drive the guided player; F2 time-boxed segment roadmaps retained as plan roadmaps' });

/* ---------------------------------------------------------------- book index / sources */
const bookIndex = D2.chapterIndex;

/* ---------------------------------------------------------------- course index (F1 shape, canonical topic rows) */
const courseIndex = {
  book: Object.assign({}, D1.courseIndex.book, { pdfPageOffset: D2.chapterIndex.book.pdfPageOffset, totalPdfPages: D2.chapterIndex.book.totalPdfPages, pageNote: D2.chapterIndex.book.note }),
  parts: D1.courseIndex.parts.map(p => Object.assign({}, p, { startPage: (D2.chapterIndex.parts.find(x => 'part-' + x.part.toLowerCase() === p.id) || {}).startPage })),
  chapters: Object.keys(chapters).map(Number).sort((a, b) => a - b).map(n => {
    const c1 = D1.courseIndex.chapters.find(c => c.n === n), c = chapters[n];
    return { n, title: c.title, part: c.part, pages: c.pages, minutes: c.minutes, difficulty: c.difficulty, why: c.why,
      topics: c.topics.map(t => [t.id, t.section, t.title, t.pages, t.tier, t.concepts]),
      counts: { topics: c.topics.length, questions: c.questions.length, flashcards: c.flashcards.length, exam: c.exam.length } };
  })
};

/* ---------------------------------------------------------------- relationship graph (explicit triples) */
const graph = [];
const G = (ft, fid, rel, tt, tid) => { if (fid && tid) graph.push([ft, fid, rel, tt, tid]); };
Object.values(chapters).forEach(ch => {
  ch.topics.forEach(t => {
    (t.concepts || []).forEach(tag => { const c = concepts.find(x => x.tags.indexOf(tag) > -1); if (c) G('topic', t.id, 'relatedConcepts', 'concept', c.id); });
    (t.relatedTopics || []).forEach(r => G('topic', t.id, 'relatedTopics', 'topic', r));
    if (t.calc) G('topic', t.id, 'relatedCalculators', 'calculator', t.calc.type);
  });
});
concepts.forEach(c => (c.topicIds || []).forEach(t => G('concept', c.id, 'relatedTopics', 'topic', t)));
diagrams.forEach(d => { G('diagram', d.id, 'relatedTopics', 'topic', d.topicId); G('diagram', d.id, 'relatedConcepts', 'concept', d.conceptId); G('diagram', d.id, 'relatedModes', 'mode', d.modeId); });
products.forEach(p => {
  p.topicIds.forEach(t => G('product', p.id, 'relatedTopics', 'topic', t)); p.modeIds.forEach(m => G('product', p.id, 'relatedModes', 'mode', m));
  p.contracts.forEach(c => G('product', p.id, 'relatedConcepts', 'concept', c)); G('product', p.id, 'relatedDiagrams', 'diagram', p.diagramId); G('product', p.id, 'relatedCalculators', 'calculator', p.calcId);
  (p.caseIds || []).forEach(c => G('product', p.id, 'relatedCases', 'case', c));
});
cases.forEach(c => { G('case', c.id, 'relatedTopics', 'topic', c.topicId); c.modeIds.forEach(m => G('case', c.id, 'relatedModes', 'mode', m)); (c.productIds || []).forEach(p => G('case', c.id, 'relatedProducts', 'product', p)); });
comparisons.forEach(c => G('comparison', c.id, 'relatedTopics', 'topic', c.topicId));
modes.forEach(m => { G('mode', m.id, 'relatedTopics', 'topic', m.topicId); G('mode', m.id, 'relatedConcepts', 'concept', m.conceptId); });
Object.values(finderResults).forEach(r => (r.modeIds || []).forEach(m => G('finderResult', r.id, 'relatedModes', 'mode', m)));


/* ---------------------------------------------------------------- aliases for state migration */
const aliases = { topics: {}, questions: qAlias, flashcards: fAlias, concepts: conceptAlias, comparisons: {}, cases: {}, modes: {}, studyPlans: { '45min': 'crash45', '90min': 'revision90', '180min': 'deep180', '45': 'crash45', '90': 'revision90', '180': 'deep180' }, examPrompts: {} };
Object.entries(topicAlias).forEach(([id, a]) => { aliases.topics[id] = a.covers; });
Object.entries(CMP_PAIR).forEach(([f1id, f2id]) => { aliases.comparisons[f2id] = f1id; });
D2.productsMatrix.forEach(m => { aliases.modes[m.id] = m.id; });

/* ---------------------------------------------------------------- write */
function w(file, body) { fs.mkdirSync(path.dirname(path.join(OUT, file)), { recursive: true }); fs.writeFileSync(path.join(OUT, file), body); }
function reg(name, obj, note) { return '/* ' + (note || name) + ' — canonical set generated by tools/build-data.js. Do not edit by hand. */\nIFL_DATA.register(' + JSON.stringify(name) + ', ' + JSON.stringify(obj) + ');\n'; }
fs.rmSync(OUT, { recursive: true, force: true });
Object.keys(chapters).forEach(n => {
  const c = chapters[n];
  w('chapters/ch' + pad(Number(n)) + '.js', '/* Chapter ' + n + ' — canonical topics, questions, flashcards and exam prompts. */\nIFL_DATA.registerChapter(' + JSON.stringify(c) + ');\n');
});
w('course-index.js', '/* Course index — generated by tools/build-data.js. */\nIFL_DATA.courseIndex = ' + JSON.stringify(courseIndex) + ';\n');
w('glossary.js', reg('glossary', glossary));
w('acronyms.js', reg('acronyms', acronyms));
w('concepts.js', reg('concepts', concepts));
w('concept-edges.js', reg('conceptEdges', edges));
w('diagrams.js', reg('diagrams', diagrams));
w('comparisons.js', reg('comparisons', { aspects: compareAspects, pairs: comparisons }));
w('case-studies.js', reg('cases', cases));
w('mode-finder.js', reg('modeFinder', modeFinder));
w('study-plans.js', reg('studyPlans', studyPlans));
w('products.js', reg('products', products));
w('modes.js', reg('modes', modes));
w('book-index.js', reg('bookIndex', bookIndex));
w('graph.js', reg('graph', graph));
w('aliases.js', reg('aliases', aliases));

audit.finalTotals = {
  chapters: 18, sections: Object.values(chapters).reduce((s, c) => s + c.topics.length, 0), topics: Object.keys(topicIndex).length,
  questions: Object.values(chapters).reduce((s, c) => s + c.questions.length, 0), flashcards: Object.values(chapters).reduce((s, c) => s + c.flashcards.length, 0),
  examPrompts: Object.values(chapters).reduce((s, c) => s + c.exam.length, 0), glossary: glossary.length, acronyms: acronyms.length, concepts: concepts.length, conceptEdges: edges.length,
  cases: cases.length, modes: modes.length, products: products.length, diagrams: diagrams.length, comparisons: comparisons.length, graphEdges: graph.length,
  learningObjectives: Object.values(chapters).reduce((s, c) => s + c.learningObjectives.length, 0), supplements: Object.values(topicIndex).reduce((s, t) => s + t.supplements.length, 0)
};
audit.topicAlias = topicAlias;
w('_audit.json', JSON.stringify(audit, null, 1));
console.log(JSON.stringify(audit.finalTotals, null, 1));
console.log('conflicts', audit.conflicts.length, 'unmapped', audit.unmapped.length);
console.log(JSON.stringify(audit.counts, null, 1));
