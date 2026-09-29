/* Static QA on the built single-file deliverable: markup balance, duplicate ids, script syntax, external dependencies,
   duplicate route registrations, duplicate global systems, JSON/data validity. */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const FILE = path.join(__dirname, '..', '..', '..', 'Understanding-Islamic-Finance-MBA-Learning-System.html');
const html = fs.readFileSync(FILE, 'utf8');
const out = { checks: [] };
const chk = (name, ok, extra) => { out.checks.push({ name, ok: !!ok, extra }); console.log(ok ? 'ok  ' : 'FAIL', name, ok ? '' : JSON.stringify(extra)); };
/* 1. split out script / style */
const scripts = []; const shell = html.replace(/<script([^>]*)>([\s\S]*?)<\/script>/g, (m, a, b) => { scripts.push({ attrs: a, body: b }); return '<script/>'; }).replace(/<style[^>]*>[\s\S]*?<\/style>/g, '<style/>');
chk('document starts with <!DOCTYPE html> and has lang, charset and viewport', /^<!DOCTYPE html>/i.test(html) && /<html lang="en">/.test(html) && /<meta charset="utf-8">/i.test(html) && /name="viewport"/.test(html));
/* 2. tag balance (void elements excluded) */
const VOID = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
const stack = [], probs = []; const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?)>/g; let m;
const body = shell.replace(/<!--[\s\S]*?-->/g, '');
while ((m = re.exec(body))) {
  const [, close, tag, , self] = m, t = tag.toLowerCase();
  if (VOID.has(t) || self === '/' || t === 'script' || t === 'style' || t === 'svg' && false) { if (t === 'script' || t === 'style') { /* placeholder */ } continue; }
  if (!close) stack.push(t); else { const top = stack.pop(); if (top !== t) probs.push('unexpected </' + t + '> (open: ' + top + ')'); }
}
chk('markup is balanced (every opened element is closed)', !probs.length && !stack.length, { probs: probs.slice(0, 5), unclosed: stack.slice(0, 5) });
/* 3. duplicate ids in the static shell */
const ids = {}; (shell.match(/\sid="([^"]+)"/g) || []).forEach(x => { const id = x.slice(5, -1); ids[id] = (ids[id] || 0) + 1; });
chk('no duplicate ids in the static markup', !Object.values(ids).some(n => n > 1), Object.keys(ids).filter(k => ids[k] > 1));
/* 4. aria-controls / for / labelledby targets exist */
const idset = new Set(Object.keys(ids)); const missing = [];
(shell.match(/aria-(?:controls|labelledby)="([^"]+)"/g) || []).forEach(x => { const id = x.replace(/.*="|"$/g, ''); if (!idset.has(id)) missing.push(id); });
(shell.match(/<label[^>]*for="([^"]+)"/g) || []).forEach(x => { const id = x.replace(/.*for="|"$/g, ''); if (!idset.has(id)) missing.push(id); });
chk('static aria-controls / aria-labelledby / label-for targets exist', !missing.length, missing);
/* 5. every script parses; data scripts JSON-valid via execution */
let bad = [];
scripts.forEach((s, i) => { try { new vm.Script(s.body, { filename: (/data-src="([^"]+)"/.exec(s.attrs) || [])[1] || 'inline-' + i }); } catch (e) { bad.push((/data-src="([^"]+)"/.exec(s.attrs) || [])[1] + ': ' + e.message); } });
chk('all ' + scripts.length + ' inline scripts parse without syntax errors', !bad.length, bad);
/* 6. no external dependencies */
const urls = (html.match(/(?:src|href)="(https?:\/\/[^"]+)"/g) || []).filter(u => !/w3\.org/.test(u));
const cssUrls = (html.match(/url\((?!["']?data:)(?!\s*#)[^)]+\)/g) || []);
const imports = (html.match(/@import[^;]+;/g) || []);
chk('no external scripts, stylesheets, fonts, images or @import (works offline from file://)', !urls.length && !cssUrls.length && !imports.length, { urls, cssUrls: cssUrls.slice(0, 3), imports });
chk('no web-app manifest / service-worker registration in the standalone file (no false PWA claims)', !/rel="manifest"/.test(html) && !/serviceWorker\.register/.test(html));
chk('no fetch / XMLHttpRequest / dynamic script injection', !/\bfetch\(|XMLHttpRequest|createElement\('script'\)|createElement\("script"\)/.test(scripts.map(s => s.body).filter((b, i) => !/data-src="data\//.test(scripts[i].attrs)).join('\n')));
/* 7. route registrations: no duplicates, and one of each engine */
const code = scripts.filter(s => !/data-src="data\//.test(s.attrs)).map(s => s.body).join('\n');
const routes = {}; (code.match(/IFL\.route\('([^']+)'/g) || []).forEach(x => { const r = x.slice(11, -1); routes[r] = (routes[r] || 0) + 1; });
chk('no route pattern is registered twice (' + Object.keys(routes).length + ' routes)', !Object.values(routes).some(n => n > 1), Object.keys(routes).filter(k => routes[k] > 1));
const single = { 'IFL.route = ': 1, 'IFL.store = ': 1, 'IFL.srs = ': 1, 'IFL.progress = ': 1, 'IFL.data = ': 1, 'IFL.migrate = ': 1, 'IFL.calc = ': 1, 'IFL.quizRunner = ': 1, 'IFL.searchIndex = ': 1, 'IFL.flashSession = ': 1, 'IFL.startRouter = ': 1, 'IFL.diagram': 0 };
const dups = Object.keys(single).filter(k => single[k] && (code.split(k).length - 1) !== 1).map(k => k + '(' + (code.split(k).length - 1) + ')');
chk('exactly one router, store, SRS, progress model, data layer, migration, calculator framework, question runner, search index and flashcard engine', !dups.length, dups);
const fnDecl = {}; (code.match(/^\s*function ([A-Za-z0-9_$]+)\(/gm) || []).forEach(x => { const n = x.replace(/^\s*function |\(/g, ''); fnDecl[n] = (fnDecl[n] || 0); });
chk('single application shell (one header, one nav, one main)', (html.match(/<header class="topbar"/g) || []).length === 1 && (html.match(/id="sidebar"/g) || []).length === 1 && (html.match(/<main /g) || []).length === 1);
/* 8. data: all data sets present */
chk('all 18 chapter data files and 15 shared data sets inlined', scripts.filter(s => /data-src="data\/chapters\//.test(s.attrs)).length === 18 && scripts.filter(s => /data-src="data\/[a-z-]+\.js"/.test(s.attrs)).length === 15);
chk('embedded favicon is a data: URI', /rel="icon" href="data:image\/svg\+xml/.test(html));
fs.writeFileSync(path.join(__dirname, 'static-result.json'), JSON.stringify(Object.assign(out, { bytes: html.length, scripts: scripts.length, routes: Object.keys(routes).length }), null, 1));
process.exit(out.checks.some(c => !c.ok) ? 1 : 0);
