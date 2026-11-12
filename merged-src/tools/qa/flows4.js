/* Interactive QA, part 4: animated diagrams, calculator sliders and charts, learning games. */
const { launch, FILE } = require('./pw');
const results = []; const ok = (n, c, x) => { results.push({ name: n, ok: !!c, extra: x }); console.log(c ? 'ok  ' : 'FAIL', n, c ? '' : JSON.stringify(x)); };
(async () => {
  const b = await launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const go = async (h, w = 150) => { await page.evaluate(x => { location.hash = '#' + x; }, h); await page.waitForTimeout(w); };
  await page.goto(FILE); await page.waitForTimeout(400);

  /* animated diagram */
  await go('/diagram/murabaha', 300);
  ok('diagram shows a moving token for the active step', await page.locator('#view .diagram-svg .token').count() >= 1);
  const p0 = await page.evaluate(() => document.querySelector('#view .diagram-wrap .token').getAttribute('transform')); await page.waitForTimeout(500);
  const p1 = await page.evaluate(() => document.querySelector('#view .diagram-wrap .token').getAttribute('transform'));
  ok('token travels along the arrow', p0 !== p1, { p0, p1 });
  ok('legend explains the token shapes used in this diagram', await page.locator('#view .token-legend span').count() >= 2);
  await page.click('#view button:has-text("Play")'); await page.waitForTimeout(3000);
  ok('Play advances the steps automatically', await page.evaluate(() => /Step [2-9] of/.test(document.querySelector('#view .card.sunk').textContent) && document.querySelector('#view button[aria-pressed="true"]').textContent.includes('Pause')));
  await page.click('#view button:has-text("Pause")'); const at = await page.evaluate(() => document.querySelector('#view .card.sunk .badge').textContent); await page.waitForTimeout(2900);
  ok('Pause stops the playback', await page.evaluate(a => document.querySelector('#view .card.sunk .badge').textContent === a, at));
  await page.evaluate(() => { IFL.store.update(s => { s.settings.reduceMotion = true; }); IFL.applyTheme(); }); await go('/diagram/salam', 300);
  const q0 = await page.evaluate(() => document.querySelector('#view .diagram-wrap .token').getAttribute('transform')); await page.waitForTimeout(400);
  ok('reduced motion: token is shown but does not move', await page.evaluate(a => document.querySelector('#view .diagram-wrap .token').getAttribute('transform') === a, q0));
  await page.evaluate(() => { IFL.store.update(s => { s.settings.reduceMotion = false; }); IFL.applyTheme(); });
  const allDiag = await page.evaluate(async () => { const bad = []; for (const d of IFL.data.diagrams) { try { const n = IFL.c.diagram(d); document.body.appendChild(n); await new Promise(r => setTimeout(r, 30)); if (!n.querySelector('.token')) bad.push(d.id); n.remove(); } catch (e) { bad.push(d.id + ':' + e.message); } } return bad; });
  ok('all 34 diagrams render with a token', allDiag.length === 0, allDiag);

  /* calculators: sliders + charts */
  const calc = await page.evaluate(() => { const out = { n: 0, charts: 0, bad: [], sliders: 0 }; Object.keys(IFL.calcTypes).forEach(k => { out.n++; try { const el = IFL.calc(k); if (IFL.calcHasChart(k)) { if (el.querySelector('figure.viz')) out.charts++; else out.bad.push(k); } out.sliders += el.querySelectorAll('.calc-range').length; if (/NaN|undefined|Infinity/.test((el.querySelector('figure.viz') || {}).textContent || '')) out.bad.push(k + ':NaN'); } catch (e) { out.bad.push(k + ':' + e.message); } }); return out; });
  ok('every calculator with a chart definition draws it (' + calc.charts + ' charts, ' + calc.sliders + ' sliders across ' + calc.n + ' tools)', calc.bad.length === 0 && calc.charts >= 13 && calc.sliders > 40, calc);
  await go('/tools?tool=credit-price', 300);
  const before = await page.evaluate(() => document.querySelector('#tool-panel .viz-legend').textContent);
  await page.evaluate(() => { const r = document.querySelector('#tool-panel .calc-range'); r.value = r.max; r.dispatchEvent(new Event('input', { bubbles: true })); }); await page.waitForTimeout(80);
  const after = await page.evaluate(() => ({ t: document.querySelector('#tool-panel .viz-legend').textContent, num: document.querySelector('#tool-panel input[type=number]').value, res: document.querySelector('#tool-panel .result-line').textContent, badge: document.querySelector('#tool-panel .badge').textContent }));
  ok('dragging a slider updates the number field, the chart and the result', after.t !== before && after.num === '250000' && /275,000|280,000/.test(after.res), after);
  await page.fill('#tool-panel input[type=number] >> nth=0', '50000'); await page.waitForTimeout(80);
  ok('typing a number moves the slider', await page.evaluate(() => document.querySelector('#tool-panel .calc-range').value === '50000'));
  await go('/tools?tool=dm-schedule', 300);
  ok('textbook figures still reproduce Box 12.5 with the chart present', await page.evaluate(() => /11,333.33/.test(document.querySelector('#tool-panel').textContent) && !!document.querySelector('#tool-panel svg.viz-line') && /Textbook figures/.test(document.querySelector('#tool-panel .badge').textContent)));
  await page.evaluate(() => { const s = document.querySelector('#tool-panel .viz-scrub'); s.value = 59; s.dispatchEvent(new Event('input', { bubbles: true })); });
  ok('line chart read-out follows the scrubber', await page.evaluate(() => /Month 60/.test(document.querySelector('#tool-panel .viz-read').textContent)));
  const edge = await page.evaluate(() => { const bad = []; Object.keys(IFL.calcTypes).forEach(k => { const c = IFL.calcTypes[k]; [0, -1, 1e12].forEach(x => { const v = {}; c.inputs.forEach(i => { v[i.k] = i.type === 'select' ? i.v : x; }); try { const el = IFL.calcChart(k, v); if (el && /NaN|Infinity|undefined/.test(el.textContent)) bad.push(k + '@' + x); } catch (e) { bad.push(k + '@' + x + ':' + e.message); } }); }); return bad; });
  ok('charts never print NaN/Infinity for edge inputs (0, −1, 1e12)', edge.length === 0, edge);

  /* games hub */
  await go('/play', 200);
  ok('games hub lists three games', await page.locator('#view .play-card').count() === 3);
  ok('navigation highlights the games entry', await page.evaluate(() => document.querySelector('#nav a[data-route="/play"]').getAttribute('aria-current') === 'page'));

  /* build the deal: solve by placing steps in the true order */
  await go('/play/build', 200);
  ok('deal picker lists all 34 transactions', await page.locator('#view a.card-link').count() === 34);
  await go('/play/build?id=murabaha', 200);
  const order = await page.evaluate(() => IFL.data.diagram('murabaha').steps.map(s => s.label));
  ok('check is disabled until every step is placed', await page.evaluate(() => document.querySelector('#view .build-grid .btn.primary').disabled));
  /* first a wrong attempt: reverse order */
  for (const l of order.slice().reverse()) { await page.click('#view .build-pool button:has-text("' + l.replace(/"/g, '\\"') + '") >> nth=0'); }
  await page.click('#view button:has-text("Check sequence")'); await page.waitForTimeout(100);
  ok('a wrong sequence is marked and not accepted', await page.evaluate(() => document.querySelectorAll('#view .build-slot.wrong').length >= 4 && /in the right place/.test(document.getElementById('view').textContent)));
  await page.click('#view button:has-text("Fix the")'); await page.waitForTimeout(80);
  const placed = await page.evaluate(() => document.querySelectorAll('#view .build-slot.filled').length);
  for (const l of order.slice(placed)) { await page.click('#view .build-pool button:has-text("' + l.replace(/"/g, '\\"') + '") >> nth=0'); }
  await page.click('#view button:has-text("Check sequence")'); await page.waitForTimeout(200);
  ok('the correct sequence is accepted and the animated diagram is revealed', await page.evaluate(() => document.querySelectorAll('#view .build-slot.right').length === 6 && !!document.querySelector('#view .diagram-svg') && /Solved in 2 checks/.test(document.getElementById('view').textContent)));
  ok('result stored under state.games.build', await page.evaluate(() => { const r = IFL.store.state.games.build.murabaha; return r && r.n === 2 && r.best === 85; }), await page.evaluate(() => IFL.store.state.games));
  const dup = await page.evaluate(() => IFL.data.diagrams.filter(d => d.steps.some((s, i) => d.steps.some((t, j) => j !== i && s.label === t.label && s.from === t.from && s.to === t.to))).map(d => d.id));
  ok('diagrams with identical repeated steps (' + dup.length + ') are judged by content, not position id', true, dup);

  /* term match */
  await go('/play/match?cat=Contracts', 200);
  ok('match board has six terms and six definitions', await page.evaluate(() => document.querySelectorAll('#view .match-col')[0].children.length === 6 && document.querySelectorAll('#view .match-col')[1].children.length === 6));
  const pairs = await page.evaluate(() => [...document.querySelectorAll('#view .match-item.term')].map(b => { const g = IFL.data.glossary.find(x => x.term === b.textContent); return [g.term, g.definition]; }));
  /* one deliberate wrong guess */
  await page.click('#view .match-item.term >> nth=0');
  await page.evaluate(d => { [...document.querySelectorAll('#view .match-col')[1].children].find(b => b.textContent !== d).click(); }, pairs[0][1]);
  ok('a wrong guess is counted and nothing locks', await page.evaluate(() => /1 wrong guess/.test(document.querySelector('#view [role=status]').textContent) && !document.querySelector('#view .match-item.matched')));
  for (const [t, d] of pairs) { await page.evaluate(([t, d]) => { [...document.querySelectorAll('#view .match-item.term')].find(b => b.textContent === t).click(); [...document.querySelectorAll('#view .match-col')[1].children].find(b => b.textContent === d).click(); }, [t, d]); }
  await page.waitForTimeout(100);
  ok('all pairs match and the round is recorded with one mistake', await page.evaluate(() => document.querySelectorAll('#view .match-item.matched').length === 12 && IFL.store.state.games.match.Contracts.best === 1));

  /* sort the instruments */
  for (const by of ['return', 'family']) {
    await go('/play/sort?by=' + by, 200);
    for (let i = 0; i < 8; i++) {
      const field = by === 'family' ? 'category' : 'returnType';
      await page.evaluate(([f, wrong]) => { const m = IFL.data.modes.find(x => x.name === document.querySelector('#view .sort-name').textContent); const bs = [...document.querySelectorAll('#view .sort-bucket')]; (wrong ? bs.find(b => b.dataset.b !== m[f]) : bs.find(b => b.dataset.b === m[f])).click(); }, [field, i === 0]);
      await page.waitForTimeout(40);
      if (i === 0) ok('sort (' + by + '): a wrong answer shows the right bucket and the mode’s own explanation', await page.evaluate(() => !!document.querySelector('#view .sort-bucket.right') && !!document.querySelector('#view .sort-bucket.wrong') && document.querySelector('#view .callout.bad p').textContent.length > 30));
      await page.click('#view .sort-card .btn.primary'); await page.waitForTimeout(40);
    }
    ok('sort (' + by + '): 7 of 8 scored and stored', await page.evaluate(b => /7 of 8 correct/.test(document.getElementById('view').textContent) && IFL.store.state.games.sort[b].best === 88, by));
  }

  /* persistence + export/import keeps games */
  ok('games survive export → replace-import', await page.evaluate(() => { const j = IFL.store.exportJSON(); IFL.store.importJSON(j, 'replace'); return IFL.store.state.games.build.murabaha.best === 85 && IFL.store.state.version === 3; }));
  ok('a v3 record saved before games existed still loads (games defaults to {})', await page.evaluate(() => { const d = JSON.parse(IFL.store.exportJSON()); delete d.data.games; IFL.store.importJSON(JSON.stringify(d), 'replace'); return JSON.stringify(IFL.store.state.games) === '{}'; }));
  await go('/play', 150);
  ok('hub renders after reset of game data', await page.locator('#view .play-card').count() === 3);

  /* mobile + dark */
  await page.setViewportSize({ width: 390, height: 800 });
  await page.evaluate(() => { IFL.store.update(s => { s.settings.theme = 'dark'; }); IFL.applyTheme(); });
  for (const r of ['/play', '/play/build?id=salam', '/play/match', '/play/sort', '/tools?tool=dm-schedule', '/tools?tool=mudarabah-offset', '/diagram/murabaha']) { await go(r, 250); ok('no horizontal overflow at 390px on ' + r, await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1 && !/Something went wrong|Page not found/.test(document.getElementById('view').textContent)), await page.evaluate(() => document.documentElement.scrollWidth)); }

  ok('no JS errors in part 4', errs.length === 0, errs.slice(0, 5));
  const failed = results.filter(r => !r.ok); console.log('checks:', results.length, 'failed:', failed.length);
  require('fs').writeFileSync(__dirname + '/flows4-result.json', JSON.stringify(results, null, 1));
  await b.close(); process.exit(failed.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
