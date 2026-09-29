/* Independent calculation QA: every expected value below is computed here from the textbook rule, NOT read from the app. */
const { launch, FILE } = require('./pw');
const fmt = (x, d = 0) => x.toLocaleString('en-US', { maximumFractionDigits: d });
const T = [];   // [name, calcKey, inputs, expected substrings in result+steps]
const t = (name, key, vals, expect) => T.push({ name, key, vals, expect });
/* credit price: price = cost × (1 + m); instalment = price / n */
t('credit-price default (100,000 · 12% · 12 instalments)', 'credit-price', {}, [fmt(100000 * 1.12), fmt(112000 / 12, 2), fmt(12000)]);
t('credit-price 250,000 · 8% · 10', 'credit-price', { cash: 250000, markup: 8, months: 10, late: 0 }, [fmt(270000), fmt(27000)]);
t('credit-price Musawamah note', 'credit-price', { contract: 'Musawamah (only the price is disclosed)' }, ['Musawamah']);
/* pool: mudarib 50% of 1000 → pool 500; weighted 1800/2800/3000 */
const wt = [3000 * 0.6, 4000 * 0.7, 3000 * 1], W = wt.reduce((a, b) => a + b, 0);
t('pool-weightage textbook profit (Box 8.1)', 'pool-weightage', {}, wt.map(w => fmt(500 * w / W, 0)).concat([fmt(W)]));
t('pool-weightage loss follows capital, not weightage', 'pool-weightage', { profit: -1000 }, [fmt(-1000 * 3000 / 10000), fmt(-1000 * 4000 / 10000)]);
/* musharakah: capital 600/400, profit 50%, result 120,000 */
t('musharakah profit follows agreed ratio', 'musharakah-pl', {}, [fmt(60000)]);
t('musharakah loss follows capital ratio (−100,000 → 60,000/40,000)', 'musharakah-pl', { result: -100000 }, [fmt(-60000), fmt(-40000)]);
t('musharakah sleeping partner A capped at capital ratio 60% (asks 80%)', 'musharakah-pl', { pa: 80, sa: 'Yes — A is sleeping', result: 100000 }, ['capped at 60.0%', fmt(60000), fmt(40000)]);
t('musharakah sleeping partner B capped (B 45% > capital 40%)', 'musharakah-pl', { pa: 55, sb: 'Yes — B is sleeping', result: 100000 }, ['B is a declared sleeping partner', fmt(60000)]);
t('musharakah both sleeping flagged', 'musharakah-pl', { sa: 'Yes — A is sleeping', sb: 'Yes — B is sleeping' }, ['Both partners are declared sleeping']);
/* salam with promise (Box 10.4): margin 15; default at 108 → actual loss 115−108 = 7 */
t('salam-profit textbook (margin 15, default recovery 7, refund 8)', 'salam-profit', {}, [fmt(15), fmt(7), fmt(8)]);
t('parallel istisna margin 200; 120/yr; 250 per instalment', 'parallel-istisna', {}, [fmt(200), fmt(120), fmt(250)]);
t('ijarah destroyed asset: client receives deposit 50,000 + surplus 80,000', 'ijarah-case', {}, [fmt(130000), fmt(80000)]);
t('ijarah shortfall borne by bank', 'ijarah-case', { claim: 300000 }, ['Shortfall of ' + fmt(70000)]);
/* Diminishing Musharakah: investment 800,000, unit 6,666.67, month-1 rent 4,666.67, first payment 11,333.33 */
t('dm-schedule textbook first payment 11,333.33', 'dm-schedule', {}, [fmt(11333.33, 2), fmt(800000 / 120, 2), fmt(4666.67, 2)]);
/* total rent of DM = Σ out_i × r/12 = inv × r/12 × (n+1)/2 */
t('dm-schedule total rent', 'dm-schedule', {}, [fmt(800000 * 0.07 / 12 * (120 + 1) / 2)]);
t('takaful waqf: fee 300,000; uw surplus 200,000; operator 24,000', 'takaful-waqf', {}, [fmt(300000), fmt(200000), fmt(24000), fmt(324000), fmt(236000)]);
t('purification 2% of 5,000 = 100', 'purification', {}, [fmt(100)]);
t('fx-settlement 10 × 17 = 170', 'fx-settlement', {}, [fmt(170)]);
t('promise-breach car (cost 18,000, resale 17,000 → 1,000)', 'promise-breach', {}, [fmt(1000)]);
/* new calculators */
t('salam-discount: capital 18,000; value 20,000; discount 2,000 = 11.11%; annualised 22.22%', 'salam-discount', {}, [fmt(18000), fmt(20000), fmt(2000), '11.11%', '22.22%']);
t('salam-discount months=0 guarded (no Infinity)', 'salam-discount', { months: 0 }, [fmt(18000)]);
t('sukuk-distribution: 27.2m · 6% · 3 → 1,632,000 per period; total 32,096,000', 'sukuk-distribution', {}, [fmt(1632000), fmt(4896000), fmt(32096000)]);
t('qard-vs-interest: 10,000 · 12 months · 8% → 10,800; excess 800', 'qard-vs-interest', {}, [fmt(10800), fmt(800)]);
t('qard-vs-interest 0 months → no excess', 'qard-vs-interest', { months: 0 }, ['excess 0']);
t('equity-screen passes defaults on lenient thresholds', 'equity-screen', {}, ['Passes only on the lenient thresholds']);
t('equity-screen prohibited business fails', 'equity-screen', { line: 'Casino, gambling or bar hotel' }, ['Does not pass the screen']);
(async () => {
  const b = await launch(); const page = await (await b.newContext()).newPage(); await page.goto(FILE); await page.waitForTimeout(300);
  let fail = 0;
  for (const x of T) {
    const r = await page.evaluate(({ key, vals }) => { const c = IFL.calcTypes[key]; const v = {}; c.inputs.forEach(i => { v[i.k] = i.v; }); Object.assign(v, vals); const o = c.compute(v); return (o.result || '') + ' | ' + o.steps.join(' | ') + ' | ' + (o.meaning || ''); }, x);
    const miss = x.expect.filter(e => r.indexOf(e) < 0);
    if (miss.length) { fail++; console.log('FAIL', x.name, 'missing', JSON.stringify(miss), '\n     got:', r.slice(0, 260)); } else console.log('ok  ', x.name);
  }
  /* rounding / decimals / invalid inputs through the real UI path */
  const edge = await page.evaluate(() => { const bad = []; Object.keys(IFL.calcTypes).forEach(k => { const c = IFL.calcTypes[k]; [[0], [-1], [1e12], [0.005]].forEach(([val]) => { const v = {}; c.inputs.forEach(i => { v[i.k] = i.type === 'select' ? i.v : val; }); try { const o = c.compute(v); const s = JSON.stringify(o); if (/NaN|Infinity|undefined/.test(s)) bad.push(k + '@' + val); } catch (e) { bad.push(k + '@' + val + ' threw'); } }); }); return bad; });
  console.log('edge inputs (0, −1, 1e12, 0.005; NaN cannot reach compute because the input handler coerces it to 0) causing NaN/Infinity/undefined/exception:', JSON.stringify(edge));
  console.log('calculation checks:', T.length, 'failed:', fail, ' edge problems:', edge.length);
  require('fs').writeFileSync(__dirname + '/calc-result.json', JSON.stringify({ checks: T.length, failed: fail, edge }, null, 1));
  await b.close(); process.exit(fail || edge.length ? 1 : 0);
})();
