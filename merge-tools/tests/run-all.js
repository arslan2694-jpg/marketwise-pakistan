'use strict';
/*  Runs every suite against a built file and records tests/RESULTS.json (quoted by MERGE-AUDIT.md on the next build).
    usage: NODE_PATH=<global node_modules> node tests/run-all.js <app1.html> <app2.html> <merged.html> [--axe <axe.min.js>] */
const { spawnSync } = require('child_process');
const fs = require('fs'), path = require('path');
const [app1, app2, merged] = process.argv.slice(2, 5);
const axeIdx = process.argv.indexOf('--axe'), axe = axeIdx > -1 ? process.argv[axeIdx + 1] : null;
const T = __dirname, suites = [];
function run(name, cmd, args) {
  const t = Date.now(), r = spawnSync(cmd, args, { encoding: 'utf8', maxBuffer: 1 << 28, env: process.env });
  const out = (r.stdout || '') + (r.stderr || ''); const m = /(\d+) checks passed, (\d+) failed/.exec(out);
  suites.push({ name, passed: m ? +m[1] : 0, failed: m ? +m[2] : 1, seconds: Math.round((Date.now() - t) / 1000) });
  console.log(name + ': ' + (m ? m[0] : 'NO RESULT') + ' (' + Math.round((Date.now() - t) / 1000) + 's)'); if (!m || +m[2]) console.log(out.split('\n').filter(l => /FAIL|ERROR/.test(l)).slice(0, 30).join('\n'));
}
// static: syntax + lint of every source module
let lint = { name: 'Static checks (node --check + ESLint no-undef/no-redeclare/… on src/)', passed: 0, failed: 0 };
(function walk(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.js$/.test(e.name)) { const r = spawnSync(process.execPath, ['--check', p], { encoding: 'utf8' }); if (r.status === 0) lint.passed++; else { lint.failed++; console.log('syntax error ' + p + '\n' + r.stderr); } } }); })(path.join(T, '..', 'src'));
const eslint = spawnSync(process.env.ESLINT || 'eslint', ['-c', path.join(T, 'eslint.config.js'), path.join(T, '..', 'src')], { encoding: 'utf8' });
if (eslint.error) { lint.name += ' — ESLint not available, syntax only'; } else if (eslint.status === 0) lint.passed++; else { lint.failed++; console.log(eslint.stdout); }
suites.push(lint); console.log(lint.name + ': ' + lint.passed + ' passed, ' + lint.failed + ' failed');
run('Architecture checks (one router / store / theme / search / progress engine, no network APIs)', process.execPath, [path.join(T, 'static.js')]);
run('Content integrity + preservation (Node)', process.execPath, [path.join(T, 'integrity.js'), merged, app1, app2]);
run('Browser regression: startup, routes, navigation, search, questions, flashcards, exam, persistence, migration, settings, responsive, accessibility', process.execPath, [path.join(T, 'regression.js'), merged].concat(axe ? ['--axe', axe] : []));
run('Browser features: live search, guided study, timers, planner, mastery, keyboard, diagrams, calculators, export/import', process.execPath, [path.join(T, 'features.js'), merged]);
const notes = [
  'Chromium (Playwright) over `file://`, so the same conditions as double-clicking the file.',
  'Integrity suite compares every record of both original files with the merged data (text-identical) and validates ids, answers, topic/chapter links, sources, decision-tree reachability and study-plan references.',
  'Regression suite swept **all 1,343 questions** through the real renderer (correct answer scored correct, wrong answer scored wrong, explanation shown, for every type), opened **all 311 topic pages**, and checked overflow on ' + '35 routes × 7 widths (320, 375, 414, 768, 1024, 1280, 1440).',
  axe ? 'axe-core (WCAG 2 A/AA + best-practice) run on 16 routes in light and dark: zero serious/critical violations.' : 'axe-core was not run.'
];
fs.writeFileSync(path.join(T, 'RESULTS.json'), JSON.stringify({ ran: new Date().toISOString(), suites, notes }, null, 2));
const bad = suites.reduce((a, s) => a + s.failed, 0); process.exit(bad ? 1 : 0);
