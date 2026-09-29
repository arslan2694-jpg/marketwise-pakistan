#!/usr/bin/env node
'use strict';
/*  build.js — assembles the single-file merged application.

    usage: node merge-tools/build.js <app1.html> <app2.html> [outDir]

    Reads both source apps, merges their data (merge-data.js), inlines the merged data, the unified
    styles and the unified application code into ONE standalone HTML file, and writes the audit files. */
const fs = require('fs'), path = require('path');
const { mergeData } = require('./merge-data');
const { writeAudit } = require('./audit');

const SRC = path.join(__dirname, 'src');
const app1 = process.argv[2], app2 = process.argv[3], outDir = process.argv[4] || process.cwd();
if (!app1 || !app2) { console.error('usage: node build.js <app1.html> <app2.html> [outDir]'); process.exit(2); }

const { data, audit } = mergeData({ app1, app2 });

function jsonScript(id, obj) {
  // "<" is escaped so the payload can never close its own <script> element; U+2028/2029 are escaped for old parsers.
  const LS = String.fromCharCode(0x2028), PS = String.fromCharCode(0x2029);
  const txt = JSON.stringify(obj).replace(/</g, '\\u003c').split(LS).join('\\u2028').split(PS).join('\\u2029');
  return '<script type="application/json" id="' + id + '">' + txt + '</script>';
}
const read = f => fs.readFileSync(path.join(SRC, f), 'utf8');

/* ---- data scripts ---- */
const setNames = Object.keys(data.sets);
const dataScripts = [
  jsonScript('ifl-json-chapters', Object.keys(data.chapters).map(n => data.chapters[n])),
  jsonScript('ifl-json-sets', data.sets),
  jsonScript('ifl-json-meta', { courseIndex: data.courseIndex, aliases: data.aliases, meta: data.meta })
].join('\n');
const dataLoader = `
(function () {
  var D = window.IFL_DATA;
  function J(id) { return JSON.parse(document.getElementById(id).textContent); }
  var chapters = J('ifl-json-chapters'); chapters.forEach(function (c) { D.registerChapter(c); });
  var sets = J('ifl-json-sets'); Object.keys(sets).forEach(function (k) { D.register(k, sets[k]); });
  var m = J('ifl-json-meta'); D.courseIndex = m.courseIndex; D.aliases = m.aliases; D.meta = m.meta;
})();`;

/* ---- code, in dependency order ---- */
const MODULES = ['util', 'store', 'progress', 'srs', 'router', 'components', 'calculators',
  'views/dashboard', 'views/learn', 'views/topic', 'views/glossary', 'views/flashcards', 'views/quiz', 'views/practice', 'views/cases', 'views/compare',
  'views/diagrams', 'views/concept-map', 'views/finder', 'views/exam', 'views/mock', 'views/planner', 'views/guided', 'views/personal', 'views/search', 'views/settings',
  'timer', 'aliases', 'livesearch'].map(m => ({ name: 'modules/' + m + '.js', code: read('modules/' + m + '.js') }));
MODULES.push({ name: 'app.js', code: read('app.js') });

const headScript = `(function () {
  /* Apply the saved theme before first paint (unified key first, then either legacy key). */
  try {
    var s = null, keys = ['ifl_v2', 'ifl.v1'];
    for (var i = 0; i < keys.length && !s; i++) { var r = localStorage.getItem(keys[i]); if (r) { var o = JSON.parse(r); if (o && o.settings) s = o.settings; } }
    var t = (s && s.theme) || 'system';
    if (!s) { var r2 = localStorage.getItem('ifl_v1'); if (r2) { var o2 = JSON.parse(r2); if (o2 && o2.settings && o2.settings.theme) t = o2.settings.theme; } }
    if (t === 'system') t = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    if (s && s.fontScale) document.documentElement.style.setProperty('--font-scale', s.fontScale);
  } catch (e) { document.documentElement.setAttribute('data-theme', 'light'); }
})();`;

let shell = read('shell.html');
const css = read('css/base.css') + '\n' + read('css/merged.css');
const bodyScripts = [
  '<script>window.IFL_STANDALONE = true;</script>',
  '<script>\n' + read('registry.js') + '\n</script>',
  dataScripts,
  '<script>' + dataLoader + '\n</script>',
  ...MODULES.map(m => '<script>\n/* ' + m.name + ' */\n' + m.code.replace(/<\/script/gi, '<\\/script') + '\n</script>')
].join('\n');
shell = shell.replace('<!--STYLE-->', () => '<style>\n' + css + '\n</style>')
  .replace('<!--HEAD_SCRIPT-->', () => '<script>\n' + headScript + '\n</script>')
  .replace('<!--BODY_SCRIPTS-->', () => bodyScripts);

const outFile = path.join(outDir, 'Understanding-Islamic-Finance-MERGED.html');
fs.writeFileSync(outFile, shell);
audit.output = { file: path.basename(outFile), bytes: Buffer.byteLength(shell), scripts: (shell.match(/<script/g) || []).length, externalReferences: (shell.match(/(?:src|href)="(?!#|data:)[^"]+"/g) || []).filter(x => !/textbook\/Understanding/.test(x)) };
writeAudit({ outDir, audit, data, modules: MODULES.map(m => m.name) });
console.log('wrote', outFile, (audit.output.bytes / 1e6).toFixed(2) + ' MB');
