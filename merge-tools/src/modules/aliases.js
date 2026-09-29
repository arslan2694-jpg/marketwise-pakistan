
/* Route aliases: every route that existed in either source application resolves here to its canonical route.
   (Islamic-Finance-Learning routes are canonical; Understanding-Islamic-Finance routes are redirected.) */
(function () {
  var IFL = window.IFL, R = IFL.redirect, Q = IFL.qs;
  var PART = { I: 'part-i', II: 'part-ii', III: 'part-iii', i: 'part-i', ii: 'part-ii', iii: 'part-iii', '1': 'part-i', '2': 'part-ii', '3': 'part-iii' };
  var QTYPE = { truefalse: 'tf', multiselect: 'multi', matching: 'match', ordering: 'order' };
  var MODE = { '45': 'crash45', '90': 'revision90', '180': 'deep180-chapters' };

  R('/dashboard', function () { return '/'; });
  R('/learn/part/:part', function (p) { return '/learn/' + (PART[p.part] || p.part); });
  R('/chapter/:num/topic/:topicId', function (p) { var id = IFL.course.resolveTopic(p.topicId, p.num); return id ? '/topic/' + id : '/chapter/' + p.num; });
  R('/topic/:id', function (p) { if (IFL.course.topic(p.id)) return null; var id = IFL.course.resolveTopic(p.id); return id ? '/topic/' + id : null; });
  R('/teach/:id', function (p) { if (IFL.course.topic(p.id)) return null; var id = IFL.course.resolveTopic(p.id); return id ? '/teach/' + id : null; });
  R('/concept-map', function (p, q) { return '/concepts' + Q(q); });
  R('/comparisons', function () { return '/compare'; });
  R('/comparisons/:id', function (p) { return '/compare?id=' + encodeURIComponent(p.id); });
  R('/case-studies', function () { return '/cases'; });
  R('/case-studies/:id', function (p) { return '/case/' + p.id; });
  R('/decision-tool', function (p, q) { return '/finder' + Q({ tool: 'tree', node: q.node, trail: q.trail }); });
  R('/exam-prep', function () { return '/exam'; });
  R('/exam-prep/trainer', function () { return '/exam/trainer'; });
  R('/exam-prep/trainer/:id', function (p) { return '/exam/trainer?id=' + encodeURIComponent(p.id); });
  R('/exam-prep/rapid-revision', function () { return '/revision-cards'; });
  R('/crash-course/:mins', function (p) { return '/guided/' + (MODE[p.mins] || 'crash45'); });
  R('/adaptive', function () { return '/practice'; });
  R('/quiz/chapter/:num', function (p) { return '/quiz/run?chapter=' + p.num; });
  R('/quiz/mixed', function () { return '/quiz/run?n=15'; });
  R('/quiz/type/:type', function (p) { return '/quiz/run?types=' + encodeURIComponent(QTYPE[p.type] || p.type) + '&n=10'; });
  R('/flashcards', function (p, q) { return q.chapter ? '/flashcards/review?chapter=' + encodeURIComponent(q.chapter) : null; });
  R('/acronyms', function (p, q) { return '/glossary' + Q({ tab: 'acronyms', q: q.q }); });
})();
