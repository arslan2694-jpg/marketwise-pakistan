/* Loads the data layers of the two ORIGINAL applications (read-only) straight from the
   backed-up HTML files in /source-backup, by executing their embedded data scripts inside a
   sandbox. Nothing here modifies the originals. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const F1_PATH = path.join(ROOT, 'source-backup', 'Islamic-Finance-Learning (1)(1).html');
const F2_PATH = path.join(ROOT, 'source-backup', 'Understanding-Islamic-Finance-STANDALONE (1)(2).html');

function scripts(html) {
  const out = [];
  const re = /<script([^>]*)>/g;
  let m;
  while ((m = re.exec(html))) {
    const end = html.indexOf('</script>', re.lastIndex);
    out.push({ attrs: m[1], body: html.slice(re.lastIndex, end) });
    re.lastIndex = end;
  }
  return out;
}
function sandbox() {
  const sb = { console, setTimeout, clearTimeout, setInterval: () => 0, navigator: {},
    localStorage: { getItem() { return null; }, setItem() {} }, matchMedia: () => ({ matches: false }) };
  sb.window = sb;
  sb.document = { documentElement: { setAttribute() {}, style: { setProperty() {} } }, addEventListener() {}, createElement: () => ({}), querySelector: () => null, getElementById: () => null };
  vm.createContext(sb);
  return sb;
}

function loadF1() {
  const html = fs.readFileSync(F1_PATH, 'utf8');
  const sb = sandbox();
  const D = { chapters: {}, sets: {} };
  D.register = (name, value) => { D.sets[name] = value; };
  D.registerChapter = (c) => { D.chapters[c.number] = c; };
  sb.IFL_DATA = D; sb.window.IFL_DATA = D;
  for (const s of scripts(html)) {
    const ds = /data-src="([^"]+)"/.exec(s.attrs);
    if (!ds || !/^data\/(?!registry)/.test(ds[1])) continue;
    vm.runInContext(s.body, sb, { filename: ds[1] });
  }
  return JSON.parse(JSON.stringify(D));
}
function loadF2() {
  const html = fs.readFileSync(F2_PATH, 'utf8');
  const sb = sandbox();
  for (const s of scripts(html)) {
    if (!/^\s*window\.IFL_DATA/.test(s.body)) continue;
    vm.runInContext(s.body, sb, { filename: 'f2-data' });
  }
  return JSON.parse(JSON.stringify(sb.IFL_DATA));
}
module.exports = { loadF1, loadF2, ROOT, scripts };
