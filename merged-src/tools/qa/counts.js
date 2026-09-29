const { launch, FILE } = require('./pw');
(async () => {
  const b = await launch(); const page = await (await b.newContext()).newPage(); await page.goto(FILE); await page.waitForTimeout(400);
  const c = await page.evaluate(() => {
    const D = IFL.data, kinds = {}; D.exam.forEach(e => { kinds[e.kind] = (kinds[e.kind] || 0) + 1; });
    const types = {}; D.questions.forEach(q => { types[q.type] = (types[q.type] || 0) + 1; });
    const sup = D.topics.reduce((s, t) => s + t.supplements.length, 0);
    return { numericals: Object.keys(IFL.numericalDefs).length, numericalsWithBookFigures: Object.values(IFL.numericalDefs).filter(g => g.book).length, calculators: Object.keys(IFL.calcTypes).length, calcKinds: Object.values(IFL.calcTypes).reduce((o, c) => { const k = c.kind === 'checker' ? 'checker' : 'calculator'; o[k] = (o[k] || 0) + 1; return o; }, {}),
      questionTypes: types, examKinds: kinds, quickChecks: D.topics.filter(t => t.quickCheck).length, productQuestions: IFL.productQuestions(D.products, D.concepts).length, supplements: sup, definitionsInTopics: D.topics.reduce((s, t) => s + (t.definitions || []).length, 0), supplementDefinitions: D.topics.reduce((s, t) => s + t.supplements.reduce((a, x) => a + (x.definitions || []).length, 0), 0),
      routes: null, achievements: IFL.progress.achievements.length, guidedPlans: Object.keys(D.plans).length, planSegments: Object.values(D.plans).map(p => p.segments.length), finderPathways: D.finder.pathways.length, finderResults: Object.keys(D.finder.results).length, graphTriples: D.sets.graph.length,
      chapters: D.chapterNums.length, sections: D.topics.length, parts: IFL_DATA.courseIndex.parts.length, bookSections: D.bookIndex.chapters.reduce((s, c) => s + c.sections.length, 0) };
  });
  console.log(JSON.stringify(c, null, 1));
  require('fs').writeFileSync(__dirname + '/counts-result.json', JSON.stringify(c, null, 1));
  await b.close();
})();
