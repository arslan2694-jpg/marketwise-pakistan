/* Adaptive practice: builds a personalized question set weighted toward
 * weak chapters/topics based on real question-history data (no server-side
 * AI — a simple deterministic weighting over recorded correctness). */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  function buildAdaptiveSet(size) {
    var history = IFLStore.get().progress.questionHistory;
    var all = IFLData.allQuestions();
    // weight: questions never seen get medium weight; questions answered
    // incorrectly more often get higher weight; mastered ones get low weight.
    var weighted = all.map(function (q) {
      var h = history[q.id];
      var weight = 3; // unseen
      if (h && h.attempts) {
        var accuracy = h.correct / h.attempts;
        weight = accuracy < 0.5 ? 6 : accuracy < 0.8 ? 3 : 1;
      }
      return { q: q, weight: weight };
    });
    var pool = [];
    weighted.forEach(function (w) { for (var i = 0; i < w.weight; i++) pool.push(w.q); });
    var picked = [];
    var seenIds = {};
    var attempts = 0;
    while (picked.length < size && attempts < size * 50 && pool.length) {
      attempts++;
      var candidate = pool[Math.floor(Math.random() * pool.length)];
      if (!seenIds[candidate.id]) { seenIds[candidate.id] = true; picked.push(candidate); }
    }
    return picked;
  }

  function render() {
    var root = IFLRouter.outlet();
    var weak = IFLData.weakTopics(5);
    root.innerHTML =
      '<div class="section-header"><h1>Adaptive Practice</h1></div>' +
      '<p class="text-secondary">Built from your real quiz history — questions you\'ve missed more often appear more, mastered ones appear less.</p>' +
      (weak.length ? '<div class="card mb-4"><h3>Your Weakest Areas</h3>' +
        weak.map(function (w) {
          return '<div class="card-row mb-2"><span class="text-sm">' + esc(w.title) + '</span>' +
            '<span class="flex items-center gap-2"><span class="progress-track" style="width:120px;"><span class="progress-fill ' + (w.pct < 50 ? "danger" : "warn") + '" style="width:' + w.pct + '%"></span></span><strong class="text-sm">' + w.pct + '%</strong>' +
            '<button class="btn btn-sm btn-outline" data-nav="#/chapter/' + w.chapter + '">Review</button></span></div>';
        }).join("") + '</div>' :
        '<div class="callout callout-note">Take a few chapter quizzes first — adaptive practice gets smarter as it learns your real performance.</div>') +
      '<button class="btn btn-primary btn-block" id="start-adaptive" style="max-width:320px;">Start 10-Question Adaptive Set</button>';

    document.getElementById("start-adaptive").addEventListener("click", function () {
      var set = buildAdaptiveSet(10);
      if (!set.length) { IFLDom.toast("No questions available yet."); return; }
      window.IFLQuizRunner ? window.IFLQuizRunner(set) : IFLDom.toast("Quiz engine not ready.");
    });
  }

  IFLRouter.register("/adaptive", render);
})();
