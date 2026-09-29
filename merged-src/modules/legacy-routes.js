/* Deep-link compatibility: hash links written by the two applications this platform combines keep working.
   Each rule redirects (replacing the history entry) to the canonical route. */
(function () {
  var IFL = window.IFL;
  function redirect(path) { return function (ctx) { var p = typeof path === 'function' ? path(ctx) : path; location.replace('#' + p); return null; }; }
  var PART = { I: 'part-i', II: 'part-ii', III: 'part-iii' };
  var CALC = { 'deposit-pool': 'pool-weightage', 'murabaha-pricing': 'credit-price', 'musharakah-split': 'musharakah-pl', 'qard-hasan-comparison': 'qard-vs-interest', 'salam-discount': 'salam-discount', 'sukuk-return': 'sukuk-distribution' };
  var rules = [
    ['/dashboard', '/'], ['/adaptive', '/practice'], ['/case-studies', '/cases'], ['/case-studies/:id', function (c) { return '/case/' + c.params.id; }],
    ['/comparisons', '/compare'], ['/comparisons/:id', function (c) { return '/compare?id=' + (IFL.data.canonicalComparison(c.params.id) || c.params.id); }],
    ['/concept-map', '/concepts'], ['/crash-course/:mins', function (c) { return '/guided/' + (IFL.data.canonicalPlan(c.params.mins) || 'crash45'); }],
    ['/decision-tool', '/finder?path=purpose'], ['/exam-prep', '/exam'], ['/exam-prep/rapid-revision', '/revision-cards'], ['/exam-prep/trainer', '/exam/trainer'],
    ['/exam-prep/trainer/:id', function (c) { return '/exam/trainer?id=' + c.params.id; }], ['/learn/part/:part', function (c) { return '/learn/' + (PART[c.params.part] || 'part-i'); }],
    ['/chapter/:num/topic/:topicId', function (c) { var t = IFL.data.canonicalTopics(c.params.topicId); return '/topic/' + (t[0] || c.params.topicId); }],
    ['/calculators', '/tools'], ['/calculators/:id', function (c) { return '/tools?tool=' + (CALC[c.params.id] || c.params.id); }],
    ['/quiz/chapter/:num', function (c) { return '/quiz/run?chapter=' + c.params.num; }], ['/quiz/mixed', '/quiz/run?n=10'], ['/quiz/type/:type', function (c) { return '/quiz/run?types=' + c.params.type + '&n=10'; }]
  ];
  rules.forEach(function (r) { IFL.route(r[0], redirect(r[1])); });
})();
