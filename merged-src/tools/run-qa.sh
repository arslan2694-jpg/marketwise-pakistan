#!/usr/bin/env bash
# Full rebuild + QA. Usage: bash tools/run-qa.sh   (run from merged-src/). The crawler takes a few minutes.
set -u
cd "$(dirname "$0")/.."
NODE=${NODE:-node}
step() { echo; echo "=== $1"; }
step "1 build canonical data";       $NODE tools/build-data.js | head -3
step "2 reference integrity";        $NODE tools/check-integrity.js | tail -3
step "3 build standalone file";      $NODE tools/build-standalone.js
step "4 static QA";                  $NODE tools/qa/static.js | tail -16
step "5 lint (no-undef etc.)";       /opt/node22/bin/node /opt/node22/lib/node_modules/eslint/bin/eslint.js -c tools/qa/eslint.config.js app.js modules -f json | $NODE -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const r=JSON.parse(s);const o={files:r.length,errors:r.reduce((a,f)=>a+f.errorCount,0),warnings:r.reduce((a,f)=>a+f.warningCount,0)};console.log(JSON.stringify(o));require('fs').writeFileSync('tools/qa/lint-result.json',JSON.stringify(o))})"
step "6 zero-loss audit";            $NODE tools/qa/zero-loss.js | tail -3
step "7 calculations";               $NODE tools/qa/calc.js | tail -3
step "8 migration";                  $NODE tools/qa/migrate.js | tail -2
step "9 interactive flows 1";        $NODE tools/qa/flows.js | tail -3
step "10 interactive flows 2";       $NODE tools/qa/flows2.js | tail -3
step "11 responsive + a11y";         $NODE tools/qa/responsive.js | tail -8
step "12 counts + perf";             $NODE tools/qa/counts.js >/dev/null; $NODE tools/qa/perf.js | tail -12
step "13 route crawler + broken links"; $NODE tools/qa/crawl.js | tail -6
step "14 reports";                   $NODE tools/build-reports.js
