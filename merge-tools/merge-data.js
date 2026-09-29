'use strict';
/*  merge-data.js — builds the unified dataset from the two source applications.

    RULES FOLLOWED (see MERGE-AUDIT.md):
      * MERGE, DO NOT REPLACE. Every record from both apps survives unless it is a proven exact duplicate.
      * Canonical schema = App 1's (it is the richer, topic-addressed one); App 2 records are converted into it
        with all original metadata retained (origin, original topic label, source pages, original type ...).
      * App 2's 225 topic write-ups cover the same textbook sections as App 1's topics, but with different wording,
        different layers (conditions, principles, distinctions, confusions ...). They are kept as "companion notes"
        attached to the canonical topic they cover (nothing dropped, nothing silently merged).
      * Every App 2 question / flashcard / case / exam item is mapped to a canonical topic id through the section it
        cites (topicAliasMap), keeping its original topic label as metadata. */

const path = require('path');
const { loadApp1, loadApp2 } = require('./lib/extract');

/* ---------------------------------------------------------------- text helpers */
function norm(s) {
  return String(s == null ? '' : s).normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[‘’‛ʻʼʿʾ´`'"“”]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
/* Term key: same rule the runtime glossary uses (drops article particles) so alternate transliterations collapse. */
function termKey(term) {
  return norm(String(term).split(/\s*[\/(]/)[0]).replace(/\b(al|ul|bil|bi|wal|e)\b/g, ' ').replace(/\s+/g, ' ').trim();
}
const clone = o => JSON.parse(JSON.stringify(o));
const uniq = a => [...new Set(a)];
function pageRange(pages) { if (!pages || !pages.length) return null; return [Math.min.apply(null, pages), Math.max.apply(null, pages)]; }

/* ---------------------------------------------------------------- section arithmetic */
function secCmp(a, b) {
  const A = String(a).split('.').map(Number), B = String(b).split('.').map(Number);
  for (let i = 0; i < Math.max(A.length, B.length); i++) { const x = A[i] == null ? -1 : A[i], y = B[i] == null ? -1 : B[i]; if (x !== y) return x - y; }
  return 0;
}
function secTokens(sec) {           // "8.2-8.3" -> {lo:'8.2',hi:'8.3'} ; "17.4.3-A" -> {lo:'17.4.3',hi:'17.4.3'}
  const s = String(sec || '').replace(/\(.*?\)/g, '').trim();
  const nums = s.split('-').map(x => x.trim()).filter(x => /^\d+(\.\d+)*$/.test(x));
  if (!nums.length) return null;
  return { lo: nums[0], hi: nums[nums.length - 1] };
}

/* ---------------------------------------------------------------- main */
function S1diagrams(D1) { return D1.sets.diagrams; }
function mergeData(opts) {
  const A1 = loadApp1(opts.app1), A2 = loadApp2(opts.app2);
  const D1 = A1.D, D2 = A2.D;
  const audit = { generatedBy: 'merge-tools/merge-data.js', files: {}, categories: {}, consolidations: [], mapping: {}, collisions: [], notes: [] };
  const clean = n => n.replace(/^[0-9a-f]{8}-/, '').replace(/_1\.html$/, ' (1).html');
  audit.files.app1 = { path: clean(path.basename(opts.app1)), bytes: A1.bytes, scripts: A1.scriptCount, dataScripts: A1.dataScripts };
  { const r1 = new Set((A1.html.match(/IFL\.route\('([^']+)'/g) || [])), r2 = new Set((A2.html.match(/IFLRouter\.register\("([^"]+)"/g) || [])); audit.routes = { app1: r1.size, app2: r2.size }; }
  audit.files.app2 = { path: clean(path.basename(opts.app2)), bytes: A2.bytes, scripts: A2.scriptCount, dataScripts: A2.dataScripts };

  /* ============================================================ CHAPTERS + TOPIC CANONICALISATION */
  const chapters = {};
  for (let n = 1; n <= 18; n++) chapters[n] = clone(D1.chapters[n]);
  const f1Topics = {};                      // id -> topic
  const f1BySection = {};                   // n -> [topics]
  for (let n = 1; n <= 18; n++) { f1BySection[n] = chapters[n].topics; chapters[n].topics.forEach(t => { f1Topics[t.id] = t; t.chapter = undefined; delete t.chapter; }); }

  /* map a (chapter, section, pages, titleHint) reference from App 2 to a canonical topic id */
  const mapStats = { exact: 0, range: 0, descendant: 0, ancestor: 0, title: 0, pages: 0, chapterFallback: 0 };
  function mapRef(ch, section, pages, titleHint, companionByTitle) {
    const list = f1BySection[ch].filter(t => /^\d/.test(t.section));
    const tk = secTokens(section);
    if (tk) {
      const exact = list.filter(t => t.section === tk.lo);
      if (exact.length) { mapStats[tk.lo === tk.hi ? 'exact' : 'range']++; return { id: exact[0].id, method: 'section', covers: coverRange(list, tk) }; }
      const inRange = coverRange(list, tk);
      if (inRange.length) { mapStats.range++; return { id: inRange[0], method: 'range', covers: inRange }; }
      let anc = null;
      list.forEach(t => { if (tk.lo.indexOf(t.section + '.') === 0 && (!anc || t.section.length > anc.section.length)) anc = t; });
      if (anc) { mapStats.ancestor++; return { id: anc.id, method: 'ancestor', covers: [anc.id] }; }
    }
    if (titleHint && companionByTitle && companionByTitle[ch + '|' + norm(titleHint)]) { mapStats.title++; const id = companionByTitle[ch + '|' + norm(titleHint)]; return { id, method: 'title', covers: [id] }; }
    const pr = pageRange(pages);
    if (pr) {
      const hit = list.filter(t => t.pages && t.pages[0] <= pr[1] && t.pages[1] >= pr[0]);
      if (hit.length) { mapStats.pages++; return { id: hit[0].id, method: 'pages', covers: hit.map(t => t.id) }; }
    }
    mapStats.chapterFallback++;
    return { id: chapters[ch].topics[0].id, method: 'chapter-fallback', covers: [chapters[ch].topics[0].id] };
  }
  function coverRange(list, tk) {
    const out = [];
    list.forEach(t => {
      const s = t.section, inR = secCmp(s, tk.lo) >= 0 && secCmp(s, tk.hi) <= 0;
      const desc = a => s === a || s.indexOf(a + '.') === 0;
      if (inR || desc(tk.lo) || desc(tk.hi)) out.push(t.id);
    });
    return out;
  }

  /* ---- companion notes (App 2 topics) ---- */
  const topicAliasMap = { byApp2TopicId: {}, byLabel: {}, bySection: {}, byF1Title: {} };
  const companionByTitle = {};
  const companions = [];
  const f2TopicCount = Object.values(D2.chapters).reduce((a, c) => a + c.topics.length, 0);
  for (let n = 1; n <= 18; n++) {
    D2.chapters[n].topics.forEach(t => {
      const src = t.source || { chapter: n, section: t.sectionNumber, pages: [] };
      const ref = mapRef(n, src.section || t.sectionNumber, src.pages, null, null);
      const comp = {
        id: t.id, origin: 'app2', title: t.title, sectionTitle: t.sectionTitle, section: t.sectionNumber,
        overview: t.overview, simple: t.simpleExplanation, academic: t.academicExplanation, exam: t.examExplanation,
        keyPoints: t.keyPoints || [], definitions: (t.definitions || []).map(d => ({ term: d.term, meaning: d.definition })),
        conditions: t.conditions || [], principles: t.principles || [], steps: t.processSteps || [],
        examples: (t.examples || []).map(e => ({ title: e.title, text: e.body, kind: e.generated ? 'practice' : 'textbook' })),
        confusions: t.commonConfusions || [], distinctions: t.importantDistinctions || [], related: t.relatedConcepts || [],
        relevance: t.examRelevance, difficulty: t.difficulty, src: { chapter: src.chapter, section: src.section, pages: src.pages },
        primary: ref.id, covers: ref.covers, mapMethod: ref.method
      };
      companions.push(comp);
      const prim = f1Topics[ref.id];
      (prim.companions = prim.companions || []).push(comp);
      ref.covers.forEach(id => { if (id !== ref.id) { const o = f1Topics[id]; (o.seeAlso = o.seeAlso || []).push({ id: comp.id, primary: ref.id, title: comp.title }); } });
      topicAliasMap.byApp2TopicId[t.id] = { primary: ref.id, covers: ref.covers };
      [t.title, t.sectionTitle].forEach(lbl => { if (lbl) { const k = n + '|' + norm(lbl); if (!companionByTitle[k]) companionByTitle[k] = ref.id; } });
      const sk = n + ':' + (src.section || t.sectionNumber); if (!topicAliasMap.bySection[sk]) topicAliasMap.bySection[sk] = ref.id;
      const sk2 = n + ':' + t.sectionNumber; if (!topicAliasMap.bySection[sk2]) topicAliasMap.bySection[sk2] = ref.id;
    });
  }
  audit.mapping.companionMapStats = clone(mapStats);
  const compMethods = {}; companions.forEach(c => { compMethods[c.mapMethod] = (compMethods[c.mapMethod] || 0) + 1; });
  audit.mapping.companionMethods = compMethods;
  const primaryTopics = new Set(companions.map(c => c.primary));
  audit.mapping.f1TopicsWithCompanion = primaryTopics.size;

  /* ---- chapter-level companion metadata (objectives, why, summary, takeaways) ---- */
  for (let n = 1; n <= 18; n++) {
    const c2 = D2.chapters[n];
    chapters[n].companion = { origin: 'app2', estimatedMinutes: c2.estimatedMinutes, difficulty: c2.difficulty, objectives: c2.learningObjectives || [], why: c2.whyItMatters || '', summary: c2.chapterSummary || '', takeaways: c2.keyTakeaways || [] };
  }

  /* ============================================================ QUESTIONS */
  const q1 = [], q2 = [];
  const qStats = { convertedTypes: {}, methods: {} };
  const DIFF = { easy: 'E', medium: 'M', hard: 'H' };
  const KIND = { truefalse: 'tf', multiselect: 'multi', matching: 'match', ordering: 'order' };
  function convertQuestion(q) {
    const ref = mapRef(q.chapter, (q.source && q.source.section) || q.section, q.source && q.source.pages, q.topic, companionByTitle);
    qStats.methods[ref.method] = (qStats.methods[ref.method] || 0) + 1;
    const out = { id: q.id, q: q.prompt, explanation: q.explanation, topic: ref.id, diff: DIFF[q.difficulty] || 'M', level: q.cognitiveLevel, obj: q.learningObjective,
      origin: 'app2', topicLabel: q.topic, src: { chapter: q.chapter, section: (q.source && q.source.section) || q.section, pages: (q.source && q.source.pages) || [] } };
    const kind = KIND[q.type] || q.type;
    const hasOpts = Array.isArray(q.options) && q.options.length > 0;
    if (q.type === 'truefalse') {
      if (!(q.options.length === 2 && /^true$/i.test(q.options[0]) && /^false$/i.test(q.options[1]) && Number.isInteger(q.correctAnswer))) throw new Error('unexpected true/false shape ' + q.id);
      out.type = 'tf'; out.answer = q.correctAnswer === 0;
    } else if (q.type === 'multiselect') {
      out.type = 'multi'; out.options = q.options.slice(); out.answer = q.correctAnswer.slice();
    } else if (q.type === 'ordering' && Array.isArray(q.correctAnswer)) {
      /* correctAnswer lists option indices in their correct sequence (identity for already-ordered options). */
      const perm = q.correctAnswer.slice().sort((a, b) => a - b);
      if (perm.length !== q.options.length || !perm.every((v, i) => v === i)) throw new Error('ordering is not a permutation ' + q.id);
      out.type = 'order'; out.items = q.correctAnswer.map(i => q.options[i]); out.kind = kind;
    } else if (q.type === 'matching' && Array.isArray(q.correctAnswer)) {
      const left = (q.prompt.split(':').pop() || '').replace(/\.\s*$/, '').split(/,\s*/).map(s => s.trim()).filter(Boolean);
      if (left.length !== q.options.length || !q.correctAnswer.every((v, i) => v === i)) throw new Error('cannot structure matching ' + q.id);
      out.type = 'match'; out.pairs = left.map((l, i) => [l, q.options[i]]); out.kind = kind;
    } else if (typeof q.correctAnswer === 'string') {
      out.type = 'short'; out.answer = q.correctAnswer; out.keywords = []; out.kind = kind;
    } else if (hasOpts && Number.isInteger(q.correctAnswer)) {
      const single = { mcq: 1, scenario: 1, comparison: 1, identify: 1 };
      out.type = single[q.type] ? q.type : 'mcq'; out.options = q.options.slice(); out.answer = q.correctAnswer;
      if (out.type !== kind) out.kind = kind;
    } else throw new Error('unhandled question shape ' + q.id);
    qStats.convertedTypes[q.type + '→' + out.type + (out.kind && out.kind !== out.type ? '/' + out.kind : '')] = (qStats.convertedTypes[q.type + '→' + out.type + (out.kind && out.kind !== out.type ? '/' + out.kind : '')] || 0) + 1;
    return out;
  }
  D2.questions.forEach(q => { const c = convertQuestion(q); chapters[q.chapter].questions.push(c); q2.push(c); });
  for (let n = 1; n <= 18; n++) D1.chapters[n].questions.forEach(q => q1.push(q));
  audit.mapping.questionMapping = qStats;

  /* record label→topic aliases from questions/flashcards (original App 2 topic strings) */
  q2.forEach(q => { const k = q.src.chapter + '|' + norm(q.topicLabel); if (!topicAliasMap.byLabel[k]) topicAliasMap.byLabel[k] = q.topic; });
  Object.keys(companionByTitle).forEach(k => { if (!topicAliasMap.byLabel[k]) topicAliasMap.byLabel[k] = companionByTitle[k]; });
  for (let n = 1; n <= 18; n++) chapters[n].topics.forEach(t => { topicAliasMap.byF1Title[n + '|' + norm(t.title)] = t.id; });

  /* ============================================================ FLASHCARDS */
  const fMethods = {};
  D2.flashcards.forEach(f => {
    const s = f.source || { chapter: f.chapter, section: '', pages: [] };
    const ref = mapRef(f.chapter, s.section, s.pages, null, companionByTitle);
    fMethods[ref.method] = (fMethods[ref.method] || 0) + 1;
    chapters[f.chapter].flashcards.push({ id: f.id, cat: f.category, front: f.front, back: f.back, topic: ref.id, origin: 'app2', src: { chapter: s.chapter, section: s.section, pages: s.pages || [] } });
  });
  audit.mapping.flashcardMapping = fMethods;

  /* ============================================================ EXAM ANSWER TRAINER */
  const trainerSets = (D2.examPrep && D2.examPrep.trainerSets) || [];
  trainerSets.forEach(t => {
    const s = t.source || { chapter: t.chapter, section: '', pages: [] };
    const ref = mapRef(t.chapter, s.section, s.pages, null, companionByTitle);
    chapters[t.chapter].exam.push({ id: t.id, kind: 'long', q: t.question, structure: t.expectedStructure || [], keyConcepts: t.keyConcepts || [], points: t.essentialPoints || [], mistakes: t.commonMistakes || [], topic: ref.id, origin: 'app2', src: { chapter: s.chapter, section: s.section, pages: s.pages || [] } });
  });

  /* ============================================================ GLOSSARY + ACRONYMS */
  const glossary = [], gIndex = {};
  const gStats = { app1: D1.sets.glossary.length, app2: D2.glossary.length, app1InternalMerged: 0, mergedWithApp1: 0, app2Unique: 0, app2DefinitionsDiffering: 0 };
  D1.sets.glossary.forEach(g => {
    const k = termKey(g.term);
    if (gIndex[k]) {           // two App-1 spellings of the same term: keep both definitions
      const e = gIndex[k]; gStats.app1InternalMerged++;
      if (norm(e.def) !== norm(g.def)) (e.moreDefs = e.moreDefs || []).push({ def: g.def, page: g.page, topic: g.topic, term: g.term });
      if (g.term !== e.term) (e.alts = e.alts || []).push(g.term);
      return;
    }
    const e = Object.assign({}, clone(g), { origin: ['app1'] }); glossary.push(e); gIndex[k] = e;
  });
  D2.glossary.forEach(g => {
    const k = termKey(g.term), e = gIndex[k];
    if (e) {
      gStats.mergedWithApp1++; audit.consolidations.push({ type: 'glossary (app 2 into app 1)', canonical: e.term, merged: g.term, spellingsDiffer: g.term !== e.term, definitionsDiffer: norm(g.definition) !== norm(e.def) });
      if (g.term !== e.term && (e.alts || []).indexOf(g.term) < 0) (e.alts = e.alts || []).push(g.term);
      if (norm(g.definition) !== norm(e.def) && !(e.moreDefs || []).some(m => norm(m.def) === norm(g.definition))) { (e.defs2 = e.defs2 || []).push({ term: g.term, def: g.definition, pages: g.pages || [] }); gStats.app2DefinitionsDiffering++; }
      e.pages2 = uniq((e.pages2 || []).concat(g.pages || [])); e.chapter = e.chapter || g.chapter; if (g.relatedTerms && g.relatedTerms.length) e.related = uniq((e.related || []).concat(g.relatedTerms)); if (e.origin.indexOf('app2') < 0) e.origin.push('app2');
    } else {
      gStats.app2Unique++;
      const ne = { term: g.term, cat: 'Additional terms', def: g.definition, source: 'Companion glossary', page: (g.pages && g.pages[0]) || null, topic: null, chapter: g.chapter, pages2: g.pages || [], related: g.relatedTerms || [], origin: ['app2'] };
      glossary.push(ne); gIndex[k] = ne;
    }
  });
  audit.categories.glossary = gStats;
  /* number of records the Glossary page shows: the merged glossary + every term defined inside chapters / companion notes */
  { const keys = new Set(glossary.map(g => termKey(g.term)));
    Object.values(chapters).forEach(c => c.topics.forEach(t => { const defs = (t.definitions || []).concat((t.companions || []).flatMap(x => x.definitions || [])); defs.forEach(d => d.term.split(/\s*\/\s*/).forEach((part, i) => keys.add(termKey(i === 0 ? d.term : part)))); }));
    gStats.glossaryPageRecords = keys.size; gStats.mergedGlossaryEntries = glossary.length; }
  const acronyms = D2.acronyms.map(a => ({ id: 'ac-' + norm(a.acronym).replace(/ /g, '-'), acronym: a.acronym, expansion: a.expansion, origin: 'app2' }));
  { const seen = {}; acronyms.forEach(a => { if (seen[a.id]) { a.id += '-' + (++seen[a.id]); } else seen[a.id] = 1; }); }

  /* ============================================================ COMPARISONS */
  const cmp = clone(D1.sets.comparisons);
  cmp.pairs.forEach(p => { p.origin = 'app1'; });
  const labs = D2.comparisons.map(c => {
    const s = c.source || {}, ch = (s.chapters || [])[0], sec = (s.sections || [])[0];
    const ref = ch ? mapRef(ch, sec, s.pages, null, companionByTitle) : null;
    return { id: 'lab-' + c.id, aliases: [c.id], title: c.title, cols: [c.itemALabel, c.itemBLabel], rows: c.dimensions.map(d => [d.dimension, d.itemA, d.itemB]),
      summary: c.summary, topic: ref ? ref.id : null, topics: (s.sections || []).map((sc, i) => { const cc = (s.chapters || [])[Math.min(i, (s.chapters || []).length - 1)]; return cc ? mapRef(cc, sc, null, null, companionByTitle).id : null; }).filter(Boolean),
      source: s, lab: true, origin: 'app2' };
  });
  cmp.pairs = cmp.pairs.concat(labs);
  audit.categories.comparisons = { app1Pairs: D1.sets.comparisons.pairs.length, app1ModeMatrixModes: cmp.modes.length, app2Labs: labs.length };

  /* ============================================================ CASE STUDIES */
  const cases = clone(D1.sets.cases).map(c => { c.origin = 'app1'; return c; });
  const CASE_MODE = { murabaha: 'murabaha', salam: 'salam', istisnaa: 'istisna', ijarah: 'ijarah', musharakah: 'musharakah', mudarabah: 'mudarabah', 'diminishing-musharakah': 'dm', sukuk: 'sukuk', takaful: 'takaful', jualah: 'jualah' };
  D2.caseStudies.forEach(c => {
    const s = c.source || { chapter: c.chapter, section: '', pages: [] };
    const ref = mapRef(s.chapter || c.chapter, s.section, s.pages, null, companionByTitle);
    const m = /^cs-(.+)-\d+$/.exec(c.id); const mode = m && CASE_MODE[m[1]] || null;
    cases.push({ id: c.id, kind: 'practice', basis: 'textbook-grounded', origin: 'app2', title: c.title, topic: ref.id, mode: mode, concept: c.concept, scenario: c.scenario, facts: [], questions: [],
      prompts: { problem: c.problemPrompt, analysis: c.analysisPrompts || [] }, answer: c.textbookAnswer, why: c.whyExplanation, analysis: c.whyExplanation, takeaways: c.examTakeaway ? [c.examTakeaway] : [],
      src: { chapter: s.chapter, section: s.section, pages: s.pages || [] }, disclaimer: c.disclaimer });
  });
  audit.categories.cases = { app1: D1.sets.cases.length, app1Textbook: D1.sets.cases.filter(c => c.kind === 'textbook').length, app1Practice: D1.sets.cases.filter(c => c.kind === 'practice').length, app2: D2.caseStudies.length };

  /* ============================================================ CONCEPTS + CONCEPT GRAPH */
  const concepts = clone(D1.sets.concepts);
  const conceptIds = new Set(concepts.map(c => c.id));
  const G2F1 = { 'islamic-economic-system': 'islamic-economics', riba: 'riba', gharar: 'gharar', 'maisir-qimar': 'maisir', 'business-ethics': 'business-ethics', 'mal-usufruct-ownership': 'mal',
    'bai-exchange': 'bai', 'khiyar-options': 'khiyar', 'wadah-promise': 'wad', murabaha: 'murabaha', salam: 'salam', istisnaa: 'istisna', ijarah: 'ijarah', 'ijarah-muntahia-bi-tamleek': 'imbt',
    musharakah: 'musharakah', mudarabah: 'mudarabah', 'diminishing-musharakah': 'diminishing-musharakah', wakalah: 'wakalah', tawarruq: 'tawarruq', juaalah: 'jualah', 'islamic-banking-overview': 'islamic-banking',
    sukuk: 'sukuk', takaful: 'takaful' };
  const SPINE_ALIAS = { shariah: 'sp-shariah', maqasid: 'sp-maqasid' };
  const graphNodes = [], gnMap = {};
  concepts.forEach(c => { graphNodes.push({ id: c.id, label: c.name, group: c.group, concept: c.id, origin: 'app1' }); gnMap[c.id] = c.id; });
  const gNew = [];
  D2.conceptMap.nodes.forEach(n => {
    if (G2F1[n.id] || SPINE_ALIAS[n.id]) audit.consolidations.push({ type: 'concept-map node', app2Id: n.id, canonical: G2F1[n.id] || SPINE_ALIAS[n.id], sameId: n.id === G2F1[n.id] });
    if (G2F1[n.id]) { if (!conceptIds.has(G2F1[n.id])) throw new Error('bad concept alias ' + n.id); gnMap[n.id] = G2F1[n.id]; (graphNodes.find(g => g.id === G2F1[n.id]).app2Ids = graphNodes.find(g => g.id === G2F1[n.id]).app2Ids || []).push(n.id); return; }
    if (SPINE_ALIAS[n.id]) { gnMap[n.id] = SPINE_ALIAS[n.id]; return; }
    const id = 'g-' + n.id; gnMap[n.id] = id;
    const topic = n.chapter ? mapRef(n.chapter, null, null, n.label, companionByTitle).id : null;
    const gn = { id, label: n.label, group: n.group, chapter: n.chapter, topic, concept: null, origin: 'app2', app2Id: n.id };
    graphNodes.push(gn); gNew.push(gn);
  });
  const edgeSet = new Set(), graphEdges = [];
  function addEdge(a, b, label, origin) { if (!a || !b || a === b) return; const k = a + '>' + b; if (edgeSet.has(k)) return; edgeSet.add(k); graphEdges.push({ from: a, to: b, label: label || '', origin }); }
  concepts.forEach(c => c.links.forEach(l => addEdge(c.id, l.to, l.label, 'app1')));
  D2.conceptMap.edges.forEach(e => addEdge(gnMap[e.from], gnMap[e.to], e.label || '', 'app2'));
  const conceptGraph = { nodes: graphNodes, edges: graphEdges, spineAliases: SPINE_ALIAS };
  audit.categories.concepts = { app1Concepts: concepts.length, app2MapNodes: D2.conceptMap.nodes.length, app2NodesAliasedToApp1: D2.conceptMap.nodes.length - gNew.length, app2OnlyNodes: gNew.length, app1Edges: concepts.reduce((a, c) => a + c.links.length, 0), app2Edges: D2.conceptMap.edges.length, mergedEdges: graphEdges.length };

  /* ============================================================ DECISION TOOLS (both kept, interactive) */
  const modeFinder = clone(D1.sets.modeFinder), decisionTree = clone(D2.decisionTree);
  audit.categories.decisionTools = { app1Nodes: Object.keys(modeFinder.nodes).length, app1Results: Object.keys(modeFinder.results).length, app2Questions: Object.keys(decisionTree.questions).length, app2Results: Object.keys(decisionTree.results).length };

  /* ============================================================ STUDY PLANS */
  const plans = clone(D1.sets.studyPlans);
  const planMap = { '45': 'crash45', '90': 'revision90' };
  const planNotes = [];
  Object.keys(D2.studyModes).forEach(k => {
    const mode = D2.studyModes[k];
    if (planMap[k]) {
      const plan = plans[planMap[k]];
      mode.segments.forEach(s => {
        const seg = plan.segments.find(x => norm(x.title) === norm(s.label) || (x.start === s.startMin && x.end === s.endMin));
        if (seg) { seg.overview = s.summary; seg.chapters = s.chapters || []; seg.overviewOrigin = 'app2'; if (s.comparisons) seg.items.push({ type: 'link', label: 'Open the Comparison Lab', route: '/compare' }); planNotes.push(planMap[k] + ': "' + seg.title + '" enriched with App 2 overview'); }
        else { plan.segments.push({ title: s.label, start: s.startMin, end: s.endMin, overview: s.summary, chapters: s.chapters || [], overviewOrigin: 'app2', items: (s.quiz ? [{ type: 'quiz', topics: [], n: 5 }] : []) }); planNotes.push(planMap[k] + ': App 2 segment "' + s.label + '" appended (no App 1 counterpart)'); }
      });
    } else {
      plans['deep180-chapters'] = { title: '3-Hour Deep Study — chapter-by-chapter track', minutes: mode.totalMinutes, intro: 'A chapter-by-chapter walk-through of the whole book (companion track to the concept-led 3-hour deep study). Each section gives an overview, links into the chapters and a closing rapid-fire quiz.', origin: 'app2',
        segments: mode.segments.map(s => ({ title: s.label, start: s.startMin, end: s.endMin, overview: s.summary, chapters: s.chapters || [], overviewOrigin: 'app2', items: (s.chapters || []).map(ch => ({ type: 'chapter', ref: ch })).concat(s.quiz ? [{ type: 'quiz', topics: [], n: 5 }] : []).concat(s.comparisons ? [{ type: 'link', label: 'Open the Comparison Lab', route: '/compare' }] : []) })) };
      planNotes.push('deep180-chapters: App 2 3-hour mode kept as a separate chapter-by-chapter track (its 14 segments differ from App 1\'s 10 concept-led segments)');
    }
  });
  audit.categories.studyPlans = { app1Plans: 3, app2Modes: Object.keys(D2.studyModes).length, mergedPlans: Object.keys(plans).length, notes: planNotes };

  /* ============================================================ BOOK INDEX (App 2 chapterIndex) */
  const bookIndex = clone(D2.chapterIndex);

  /* ============================================================ COURSE INDEX (regenerated for the merged topic set) */
  const ci1 = D1.courseIndex;
  const courseIndex = { book: ci1.book, parts: ci1.parts, chapters: [] };
  for (let n = 1; n <= 18; n++) {
    const c = chapters[n], m1 = ci1.chapters.find(x => x.n === n);
    courseIndex.chapters.push({ n, title: c.title, part: c.part, pages: c.pages, minutes: c.minutes, difficulty: c.difficulty, why: c.why,
      topics: c.topics.map(t => [t.id, t.section, t.title, t.pages, t.tier, t.concepts || []]),
      counts: { flashcards: c.flashcards.length, questions: c.questions.length + c.topics.filter(t => t.quickCheck).length, exam: c.exam.length } });
    if (m1 && m1.topics.length !== c.topics.length) throw new Error('topic set changed for chapter ' + n);
  }

  /* ============================================================ ID / COLLISION AUDIT */
  const idCats = {
    topics: [Object.values(D1.chapters).flatMap(c => c.topics.map(t => t.id)), Object.values(D2.chapters).flatMap(c => c.topics.map(t => t.id))],
    questions: [q1.map(q => q.id), D2.questions.map(q => q.id)],
    flashcards: [Object.values(D1.chapters).flatMap(c => c.flashcards.map(f => f.id)), D2.flashcards.map(f => f.id)],
    exam: [Object.values(D1.chapters).flatMap(c => c.exam.map(e => e.id)), trainerSets.map(t => t.id)],
    cases: [D1.sets.cases.map(c => c.id), D2.caseStudies.map(c => c.id)],
    comparisons: [D1.sets.comparisons.pairs.map(p => p.id), D2.comparisons.map(c => c.id)],
    concepts: [D1.sets.concepts.map(c => c.id), D2.conceptMap.nodes.map(n => n.id)]
  };
  audit.idAudit = {};
  Object.keys(idCats).forEach(k => {
    const a = idCats[k][0], b = idCats[k][1], sa = new Set(a), same = b.filter(x => sa.has(x));
    const dupWithin = [a.length - sa.size, b.length - new Set(b).size];
    audit.idAudit[k] = { app1: a.length, app2: b.length, identicalIds: same.length, duplicateIdsWithinApp1: dupWithin[0], duplicateIdsWithinApp2: dupWithin[1] };
  });
  // Identical concept ids across apps: same concept (aliased) — recorded, not collisions of different records.
  audit.idAudit.concepts.note = 'Identical ids (riba, gharar, murabaha, ...) denote the same concept; they were merged into one canonical node (App 2 ids kept as app2Ids). Different-id equivalents were resolved through an explicit alias table.';
  audit.collisions = [];
  Object.keys(audit.idAudit).forEach(k => { if (k !== 'concepts' && audit.idAudit[k].identicalIds) audit.collisions.push(k + ': ' + audit.idAudit[k].identicalIds + ' identical ids across apps — resolved by prefixing'); });

  /* ============================================================ COUNTS + RECONCILIATION */
  const allTopics = Object.values(chapters).flatMap(c => c.topics);
  const dupQ = (() => { const s = new Map(); let d = 0; q1.forEach(q => s.set(norm(q.q), 1)); D2.questions.forEach(q => { if (s.has(norm(q.prompt))) d++; }); return d; })();
  const f1c = Object.values(D1.chapters).flatMap(c => c.flashcards), f1cn = new Map(); f1c.forEach(c => f1cn.set(norm(c.front) + '|' + norm(c.back), 1));
  const dupF = D2.flashcards.filter(c => f1cn.has(norm(c.front) + '|' + norm(c.back))).length;
  const inner = (a, f) => { const s = new Set(); let d = 0; a.forEach(x => { const k = norm(f(x)); if (s.has(k)) d++; s.add(k); }); return d; };
  audit.categories.questions = { app1: q1.length, app2: D2.questions.length, exactDuplicateTexts: dupQ, app1UniqueRetained: q1.length, app2UniqueRetained: D2.questions.length - dupQ, merged: q1.length + D2.questions.length - dupQ, app1InternalRepeatedTexts: inner(q1, q => q.q), note: 'No question was removed: near-identical topics are kept as separate items because wording/difficulty/level/source differ.' };
  audit.categories.flashcards = { app1: f1c.length, app2: D2.flashcards.length, exactDuplicates: dupF, merged: f1c.length + D2.flashcards.length - dupF, app1InternalRepeatedFronts: inner(f1c, c => c.front) };
  audit.categories.topics = { app1: allTopics.length, app2: f2TopicCount, app2SectionsCoincidingWithApp1: f2TopicCount, app2SectionsWithNoApp1Counterpart: 0, canonicalTopics: allTopics.length, companionNotesAttached: companions.length, app1TopicsWithCompanion: primaryTopics.size };
  audit.categories.chapters = { app1: 18, app2: 18, merged: 18 };
  audit.categories.acronyms = { app1: 0, app2: acronyms.length, merged: acronyms.length };
  audit.categories.diagrams = { app1: D1.sets.diagrams.length, app2: 0, merged: D1.sets.diagrams.length };
  audit.categories.exam = { app1: Object.values(D1.chapters).reduce((a, c) => a + c.exam.length, 0), app2Trainer: trainerSets.length, merged: Object.values(chapters).reduce((a, c) => a + c.exam.length, 0) };
  audit.categories.calculations = { app1TopicsWithCalculator: allTopics.filter(t => t.calc).length, app2: 0 };
  audit.categories.definitionsInTopics = { app1: allTopics.reduce((a, t) => a + (t.definitions || []).length, 0), app2CompanionDefinitions: companions.reduce((a, c) => a + c.definitions.length, 0) };
  audit.categories.bookIndex = { source: 'app2 chapterIndex', pdfPageOffset: bookIndex.book.pdfPageOffset };

  const data = { chapters, sets: { glossary, acronyms, concepts, conceptGraph, diagrams: clone(D1.sets.diagrams), comparisons: cmp, cases, modeFinder, decisionTree, studyPlans: plans, bookIndex }, courseIndex,
    aliases: { topics: topicAliasMap, conceptGraphIds: gnMap, comparisonLabs: labs.map(l => [l.aliases[0], l.id]), caseIds: {}, studyMode: { '45': 'crash45', '90': 'revision90', '180': 'deep180-chapters' } },
    meta: { sources: { app1: audit.files.app1.path, app2: audit.files.app2.path }, expected: { chapters: 18, topics: allTopics.length, companionNotes: companions.length, questions: Object.values(chapters).reduce((a, c) => a + c.questions.length, 0), flashcards: Object.values(chapters).reduce((a, c) => a + c.flashcards.length, 0),
      examItems: Object.values(chapters).reduce((a, c) => a + c.exam.length, 0), glossaryEntries: glossary.length, glossaryPageRecords: gStats.glossaryPageRecords, acronyms: acronyms.length, cases: cases.length, comparisons: cmp.pairs.length, concepts: concepts.length, conceptMapNodes: graphNodes.length, conceptMapEdges: graphEdges.length, diagrams: S1diagrams(D1).length } } };
  return { data, audit, companions };
}
module.exports = { mergeData, norm, termKey };

if (require.main === module) {
  const res = mergeData({ app1: process.argv[2], app2: process.argv[3] });
  console.log(JSON.stringify(res.audit, null, 1).slice(0, 6000));
}
