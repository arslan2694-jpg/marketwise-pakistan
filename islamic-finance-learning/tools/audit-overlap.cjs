/* Copyright audit: finds runs of N+ consecutive words in the app's content that also appear verbatim
   in the locally extracted textbook text (source/extraction-notes/chapters, git-ignored).
   Usage: node tools/audit-overlap.cjs [N=25]  — exits 1 if any run is found. */
const fs = require('fs'), path = require('path');
const N = Number(process.argv[2]) || 25;
const ROOT = path.join(__dirname, '..');
const dir = path.join(ROOT, 'source/extraction-notes/chapters');
if (!fs.existsSync(dir)) { console.log('Extracted text not present (run tools/fetch-textbook.sh and tools/extract_source.py); skipping.'); process.exit(0); }
const norm = (s) => s.toLowerCase().replace(/\[\[p\. ?\d+\]\]/g, ' ').replace(/[‘’´`']/g, '').replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
const book = new Set();
fs.readdirSync(dir).forEach((f) => { const w = norm(fs.readFileSync(path.join(dir, f), 'utf8').replace(/-\n/g, '')); for (let i = 0; i + N <= w.length; i++) book.add(w.slice(i, i + N).join(' ')); });
const { chapters, reg } = require('./load-data.cjs')(ROOT);
const strings = [];
(function walk(o, where) { if (typeof o === 'string') { if (o.split(' ').length >= N) strings.push([where, o]); } else if (o && typeof o === 'object') Object.keys(o).forEach((k) => walk(o[k], where + '.' + k)); })({ chapters, reg }, 'data');
let hits = 0;
strings.forEach(([where, s]) => {
  const w = norm(s.replace(/“[^”]*”/g, ' | '));  // attributed quotations (in “…”) are allowed; short, cited
  for (let i = 0; i + N <= w.length; i++) { if (book.has(w.slice(i, i + N).join(' '))) { hits++; console.log(where + ': "' + w.slice(i, i + N + 4).join(' ') + '…"'); break; } }
});
console.log(strings.length + ' strings checked; ' + hits + ' with a verbatim run of ' + N + '+ words.');
process.exit(hits ? 1 : 0);
