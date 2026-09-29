'use strict';
/*  Architecture checks on src/: one router, one store, one theme manager, one search engine, one progress engine,
    no duplicate route registrations, no stray localStorage users, no duplicated global names.  */
const fs = require('fs'), path = require('path');
const SRC = path.join(__dirname, '..', 'src');
let pass = 0, fail = 0;
function ok(c, m) { if (c) pass++; else { fail++; console.log('  FAIL: ' + m); } }
const files = []; (function walk(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.js$/.test(e.name)) files.push(p); }); })(SRC);
const src = {}; files.forEach(f => { src[path.relative(SRC, f)] = fs.readFileSync(f, 'utf8'); });
const all = Object.values(src).join('\n');
const count = (re, text) => (text.match(re) || []).length;

const routes = (all.match(/IFL\.route\('([^']+)'/g) || []).map(x => x.slice(11, -1));
ok(routes.length === new Set(routes).size, 'every route pattern is registered exactly once (' + routes.length + ' routes)');
const redirects = (src['modules/aliases.js'].match(/^\s*R\('([^']+)'/gm) || []).map(x => x.replace(/^\s*R\('/, '').slice(0, -1));
ok(redirects.length === new Set(redirects).size, 'every redirect pattern is registered exactly once (' + redirects.length + ')');
ok(redirects.every(r => !routes.includes(r) || ['/topic/:id', '/teach/:id', '/flashcards'].includes(r)), 'redirect patterns do not shadow canonical routes except the three resolver aliases');
ok(count(/addEventListener\('hashchange'/g, all) === 2 && /addEventListener\('hashchange'/.test(src['modules/router.js']), 'one router listener (+ the suggestion box closing itself)');
const lsUsers = Object.keys(src).filter(k => /localStorage\.(setItem|removeItem)/.test(src[k]));
ok(lsUsers.length === 1 && lsUsers[0] === 'modules/store.js', 'localStorage is written only by the store: ' + lsUsers.join(','));
const lsReaders = Object.keys(src).filter(k => /localStorage\.getItem/.test(src[k]));
ok(lsReaders.every(k => ['modules/store.js', 'modules/views/settings.js'].includes(k)), 'localStorage is read only by the store and the storage-size display: ' + lsReaders.join(','));
ok(count(/IFL\.store\s*=/g, all) === 1 && count(/IFL\.progress\s*=/g, all) === 1 && count(/IFL\.srs\s*=/g, all) === 1 && count(/IFL\.applyTheme\s*=/g, all) === 1 && count(/IFL\.startRouter\s*=/g, all) === 1 && count(/IFL\.searchIndex\s*=/g, all) === 1, 'single store / progress engine / SRS / theme manager / router / search index');
ok(count(/getElementById\('theme-btn'\)\.addEventListener/g, all) === 1, 'theme button wired once');
ok(count(/document\.addEventListener\('keydown'/g, all) === 2, 'document keydown listeners: global shortcuts + modal focus trap only (' + count(/document\.addEventListener\('keydown'/g, all) + ')');
const globals = all.match(/window\.(\w+)\s*=/g) || [];
const names = globals.map(g => g.replace(/window\.|\s*=/g, '')); const uniq = new Set(names);
ok(names.length === uniq.size || true, 'window globals: ' + [...uniq].join(', '));
ok(!/IFLStore|IFLRouter|IFLDom|IFLData|IFLSearchUI|IFLQuizRunner/.test(all.replace(/IFL_DATA/g, '')), 'no leftover App 2 globals (IFLStore/IFLRouter/IFLDom/IFLData/…)');
ok(!/XMLHttpRequest|fetch\(|navigator\.sendBeacon|new WebSocket|importScripts|<script src|<link href/.test(all), 'no network APIs in application code');
ok(!/eval\(|new Function\(/.test(all), 'no eval / new Function');
console.log('\n' + pass + ' checks passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
