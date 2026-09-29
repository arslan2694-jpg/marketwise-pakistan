'use strict';
/* Reads the two source applications straight from their standalone HTML files and evaluates
   ONLY their embedded data scripts inside an isolated VM context (no DOM, no network).
   Nothing is copied by hand: every record in the merged app originates from these two files. */
const fs = require('fs'), vm = require('vm');

function scripts(html) {
  const out = [], re = /<script([^>]*)>([\s\S]*?)<\/script>/g; let m;
  while ((m = re.exec(html))) out.push({ attrs: m[1].trim(), body: m[2], dataSrc: (/data-src="([^"]+)"/.exec(m[1]) || [])[1] || null });
  return out;
}
function sandbox() {
  const win = {}; win.window = win;
  win.localStorage = { getItem() { return null; }, setItem() {} };
  win.document = { documentElement: { setAttribute() {}, style: { setProperty() {} } }, addEventListener() {}, querySelector() { return null; }, getElementById() { return null; } };
  win.matchMedia = () => ({ matches: false });
  return vm.createContext(win);
}
/* App 1 (Islamic-Finance-Learning): data scripts have data-src="data/…". */
function loadApp1(file) {
  const html = fs.readFileSync(file, 'utf8'), ctx = sandbox();
  const list = scripts(html).filter(s => s.dataSrc && /^data\//.test(s.dataSrc));
  list.forEach(s => vm.runInContext(s.body, ctx, { filename: s.dataSrc }));
  const D = ctx.window.IFL_DATA;
  return { html, D, scriptCount: scripts(html).length, dataScripts: list.length, bytes: Buffer.byteLength(html) };
}
/* App 2 (Understanding-Islamic-Finance-STANDALONE): inline scripts that start with window.IFL_DATA. */
function loadApp2(file) {
  const html = fs.readFileSync(file, 'utf8'), ctx = sandbox();
  const all = scripts(html), list = all.filter(s => /^\s*window\.IFL_DATA/.test(s.body));
  list.forEach((s, i) => vm.runInContext(s.body, ctx, { filename: 'app2-data-' + i }));
  return { html, D: ctx.window.IFL_DATA, scriptCount: all.length, dataScripts: list.length, bytes: Buffer.byteLength(html) };
}
module.exports = { scripts, loadApp1, loadApp2 };
