#!/usr/bin/env node
/* Merges a content supplement into a chapter file and rewrites it in the house style.
   Usage: node tools/merge-content.cjs path/to/supplement.cjs [--dry]
          node tools/merge-content.cjs --roundtrip   (re-serialise all chapters; checks the writer is lossless)

   Supplement format (CommonJS):
   module.exports = {
     chapter: 9,
     topics: { 't9.2': { examples: [...], confusions: [...], academic: [...], ... } },  // arrays append, scalars set
     replace: { 't9.2': { simple: '...' } },                                            // fields overwritten
     flashcards: [{ cat, front, back, topic }], questions: [{ type, q, ... }], exam: [{ kind, q, ... }],
     chapterFields: { takeaways: [...] },                                                // arrays append, scalars set
     remove: ['exact question stem or flashcard front', ...]                             // delete items
   };
   Ids for new flashcards/questions/exam items are assigned automatically (f9.N, q9.N, e9.N). */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const file = (n) => path.join(root, 'data/chapters/ch' + String(n).padStart(2, '0') + '.js');

function loadChapter(n) {
  const src = fs.readFileSync(file(n), 'utf8');
  let ch; vm.runInNewContext(src, { IFL_DATA: { registerChapter: (c) => { ch = c; } } });
  const header = src.slice(0, src.indexOf('IFL_DATA.registerChapter')).trimEnd();
  return { ch, header };
}

/* ---------- Writer (unquoted keys, double-quoted strings, one record per line) ---------- */
const IDENT = /^[A-Za-z_$][\w$]*$/;
const key = (k) => (IDENT.test(k) ? k : JSON.stringify(k));
function inline(v) {
  if (Array.isArray(v)) return '[' + v.map(inline).join(', ') + ']';
  if (v && typeof v === 'object') return '{ ' + Object.keys(v).filter((k) => v[k] !== undefined).map((k) => key(k) + ': ' + inline(v[k])).join(', ') + ' }';
  return JSON.stringify(v);
}
function list(arr, ind) {
  if (!arr.length) return '[]';
  return '[\n' + arr.map((x) => ind + '  ' + inline(x)).join(',\n') + '\n' + ind + ']';
}
const HEAD = ['id', 'section', 'title', 'pages', 'tier'];
function topic(t, ind) {
  const lines = [ind + HEAD.filter((k) => t[k] !== undefined).map((k) => key(k) + ': ' + inline(t[k])).join(', ')];
  Object.keys(t).filter((k) => !HEAD.includes(k) && t[k] !== undefined).forEach((k) => {
    const v = t[k];
    const objArr = Array.isArray(v) && v.some((x) => x && typeof x === 'object');
    const longArr = Array.isArray(v) && !objArr && inline(v).length > 140;
    lines.push(ind + key(k) + ': ' + (objArr ? list(v, ind) : longArr ? '[\n' + v.map((x) => ind + '  ' + inline(x)).join(',\n') + '\n' + ind + ']' : inline(v)));
  });
  return ind.slice(2) + '{\n' + lines.join(',\n') + '\n' + ind.slice(2) + '}';
}
function write(ch, header) {
  const out = [];
  Object.keys(ch).forEach((k) => {
    const v = ch[k];
    if (v === undefined) return;
    if (k === 'topics') out.push('  topics: [\n' + v.map((t) => topic(t, '      ')).join(',\n') + '\n  ]');
    else if (Array.isArray(v) && v.some((x) => x && typeof x === 'object')) out.push('  ' + key(k) + ': ' + list(v, '  '));
    else if (Array.isArray(v) && v.length > 3) out.push('  ' + key(k) + ': [\n' + v.map((x) => '    ' + inline(x)).join(',\n') + '\n  ]');
    else out.push('  ' + key(k) + ': ' + inline(v));
  });
  return header + '\nIFL_DATA.registerChapter({\n' + out.join(',\n') + '\n});\n';
}

/* ---------- Merge ---------- */
function nextId(arr, prefix) {
  let max = 0; arr.forEach((x) => { const m = String(x.id).match(/\.(\d+)$/); if (m) max = Math.max(max, Number(m[1])); });
  return () => prefix + (++max);
}
function merge(ch, sup) {
  const byId = {}; ch.topics.forEach((t) => { byId[t.id] = t; });
  const report = { fields: 0, flashcards: 0, questions: 0, exam: 0 };
  const apply = (target, fields, overwrite, where) => Object.keys(fields).forEach((f) => {
    const v = fields[f];
    if (!overwrite && Array.isArray(v)) {
      const cur = target[f] || [];
      const seen = new Set(cur.map((x) => JSON.stringify(x)));
      target[f] = cur.concat(v.filter((x) => !seen.has(JSON.stringify(x))));
    } else target[f] = v;
    report.fields++;
    if (where && !target.id) throw new Error('bad target ' + where);
  });
  Object.keys(sup.topics || {}).forEach((id) => { if (!byId[id]) throw new Error('Unknown topic ' + id); apply(byId[id], sup.topics[id], false, id); });
  Object.keys(sup.replace || {}).forEach((id) => { if (!byId[id]) throw new Error('Unknown topic ' + id); apply(byId[id], sup.replace[id], true, id); });
  if (sup.chapterFields) apply(ch, sup.chapterFields, false);
  (sup.remove || []).forEach((text) => {  // remove questions/flashcards/exam items by their exact stem
    ['questions', 'flashcards', 'exam'].forEach((k) => { const n = ch[k].length; ch[k] = ch[k].filter((x) => (x.q || x.front) !== text); if (ch[k].length < n) report.removed = (report.removed || 0) + 1; });
  });
  [['flashcards', 'f', 'front'], ['questions', 'q', 'q'], ['exam', 'e', 'q']].forEach(([k, p, textKey]) => {
    if (!sup[k]) return;
    const gen = nextId(ch[k], p + ch.number + '.');
    const seen = new Set(ch[k].map((x) => x[textKey]));
    sup[k].forEach((x) => {
      if (!byId[x.topic]) throw new Error(k + ' item points to unknown topic ' + x.topic + ': ' + x[textKey]);
      if (seen.has(x[textKey])) return;
      seen.add(x[textKey]);
      ch[k].push(Object.assign({ id: gen() }, x));
      report[k]++;
    });
  });
  return report;
}

const args = process.argv.slice(2);
if (args[0] === '--roundtrip') {
  for (let n = 1; n <= 18; n++) {
    const { ch, header } = loadChapter(n);
    const text = write(ch, header);
    let back; vm.runInNewContext(text, { IFL_DATA: { registerChapter: (c) => { back = c; } } });
    if (JSON.stringify(back) !== JSON.stringify(ch)) throw new Error('Round-trip mismatch in chapter ' + n);
    if (!args.includes('--dry')) fs.writeFileSync(file(n), text);
  }
  console.log('Round-trip OK for 18 chapters');
} else {
  const sup = require(path.resolve(args[0]));
  const { ch, header } = loadChapter(sup.chapter);
  const r = merge(ch, sup);
  if (!args.includes('--dry')) fs.writeFileSync(file(sup.chapter), write(ch, header));
  console.log('Chapter ' + sup.chapter + ': ' + JSON.stringify(r) + ' → now ' + ch.questions.length + ' questions, ' + ch.flashcards.length + ' flashcards, ' + ch.exam.length + ' exam items');
}
