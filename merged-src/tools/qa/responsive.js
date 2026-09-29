/* Responsive + accessibility audit: horizontal overflow, tap targets, unlabeled controls, landmarks, focus, contrast. */
const { launch, FILE } = require('./pw');
const routes = ['/', '/learn', '/chapter/9?tab=topics', '/topic/t9.8.3', '/glossary', '/glossary?tab=acronyms', '/concepts', '/concepts?view=flow', '/flashcards', '/flashcards/review?chapter=9&n=3', '/quiz', '/quiz/run?n=3', '/modes', '/mode/salam', '/products', '/product/import-murabaha', '/diagrams', '/diagram/murabaha', '/cases', '/case/cs-murabaha-1', '/compare', '/finder', '/numericals?p=pool-profit', '/tools?tool=musharakah-pl', '/exam', '/exam/trainer?id=et-1', '/mock', '/planner', '/guided/crash45', '/timer', '/sources', '/search?q=murabaha', '/progress', '/settings', '/bookmarks', '/notes', '/practice', '/mistakes'];
function lum(c) { const a = c.map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]; }
(async () => {
  const b = await launch();
  const out = { overflow: [], unlabeled: [], smallTargets: [], contrast: [] };
  for (const [w, scheme] of [[375, 'light'], [768, 'light'], [1280, 'dark'], [375, 'dark']]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 800 }, colorScheme: scheme, hasTouch: w < 800 });
    const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE); await page.waitForTimeout(300);
    for (const r of routes) {
      await page.evaluate(h => { location.hash = '#' + h; }, r); await page.waitForTimeout(150);
      const res = await page.evaluate(() => {
        const de = document.documentElement, over = de.scrollWidth - de.clientWidth;
        const unl = Array.from(document.querySelectorAll('#view input:not([type=hidden]):not([type=checkbox]), #view select, #view textarea')).filter(e => !(e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') || (e.id && document.querySelector('label[for="' + e.id + '"]')) || e.closest('label'))).map(e => e.tagName + '#' + e.id + '.' + e.className);
        const unlBtn = Array.from(document.querySelectorAll('#view button, #view a')).filter(e => !e.textContent.trim() && !e.getAttribute('aria-label') && !e.getAttribute('title')).length;
        const h1 = document.querySelectorAll('#view h1').length;
        return { over, unl, unlBtn, h1 };
      });
      if (res.over > 2) out.overflow.push({ w, scheme, r, over: res.over });
      if (res.unl.length || res.unlBtn) out.unlabeled.push({ w, r, unl: res.unl.slice(0, 3), unlBtn: res.unlBtn });
    }
    if (w === 375) {
      /* tap targets on the mobile chrome */
      const t = await page.evaluate(() => Array.from(document.querySelectorAll('.topbar button, .topbar a, .bottom-nav a')).map(e => { const r = e.getBoundingClientRect(); return { n: (e.getAttribute('aria-label') || e.textContent.trim()).slice(0, 20), w: Math.round(r.width), h: Math.round(r.height) }; }).filter(x => x.w && (x.w < 36 || x.h < 36)));
      if (t.length) out.smallTargets.push({ scheme, t });
      await page.evaluate(h => { location.hash = '#/'; }, ''); await page.waitForTimeout(150);
      await page.click('#menu-btn'); await page.waitForTimeout(300);
      const drawer = await page.evaluate(() => ({ open: document.getElementById('sidebar').classList.contains('open'), exp: document.getElementById('menu-btn').getAttribute('aria-expanded'), sc: !document.getElementById('scrim').hidden }));
      out.drawer = drawer;
      await page.keyboard.press('Escape'); await page.waitForTimeout(200);
      out.drawerClosed = await page.evaluate(() => !document.getElementById('sidebar').classList.contains('open'));
    }
    if (errs.length) out.errors = (out.errors || []).concat(errs);
    await ctx.close();
  }
  /* contrast of design tokens, both themes */
  const ctx = await b.newContext({ viewport: { width: 1000, height: 800 } }); const page = await ctx.newPage(); await page.goto(FILE); await page.waitForTimeout(300);
  for (const theme of ['light', 'dark']) {
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    const pairs = await page.evaluate(() => {
      const cs = getComputedStyle(document.documentElement), g = n => cs.getPropertyValue(n).trim();
      const px = (c) => { const d = document.createElement('div'); d.style.color = c; document.body.appendChild(d); const m = getComputedStyle(d).color.match(/[\d.]+/g).map(Number); d.remove(); return m.slice(0, 3); };
      const P = [['text/bg', '--text', '--bg'], ['text/elev', '--text', '--bg-elev'], ['text-2/elev', '--text-2', '--bg-elev'], ['text-3/elev', '--text-3', '--bg-elev'], ['text-3/bg', '--text-3', '--bg'], ['accent/elev', '--accent', '--bg-elev'], ['accent/soft', '--accent', '--accent-soft'], ['gold/gold-soft', '--gold', '--gold-soft'], ['ok/ok-soft', '--ok', '--ok-soft'], ['warn/warn-soft', '--warn', '--warn-soft'], ['bad/bad-soft', '--bad', '--bad-soft'], ['info/info-soft', '--info', '--info-soft'], ['contrast/accent', '--accent-contrast', '--accent']];
      return P.map(p => ({ n: p[0], a: px(g(p[1])), b: px(g(p[2])) }));
    });
    pairs.forEach(p => { const L1 = lum(p.a), L2 = lum(p.b), r = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); out.contrast.push({ theme, pair: p.n, ratio: +r.toFixed(2), pass: r >= 4.5 }); });
  }
  console.log('overflow issues:', out.overflow.length); out.overflow.slice(0, 20).forEach(o => console.log('  ', JSON.stringify(o)));
  console.log('unlabeled controls:', out.unlabeled.length); out.unlabeled.slice(0, 10).forEach(o => console.log('  ', JSON.stringify(o)));
  console.log('small tap targets:', JSON.stringify(out.smallTargets)); console.log('drawer:', JSON.stringify(out.drawer), 'closed on Escape:', out.drawerClosed);
  console.log('contrast below 4.5:', JSON.stringify(out.contrast.filter(c => !c.pass))); console.log('errors:', out.errors);
  require('fs').writeFileSync(__dirname + '/responsive-result.json', JSON.stringify(out, null, 1));
  await b.close();
})().catch(e => { console.error(e); process.exit(2); });
