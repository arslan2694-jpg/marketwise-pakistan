/* Exam Preparation Center: browse questions by neutral category, plus the
 * Exam Answer Trainer (attempt first, then reveal expected structure). */
(function () {
  "use strict";
  var esc = IFLDom.esc, fmt = IFLDom.formatText;

  var TYPE_LABELS = {
    mcq: "MCQs", truefalse: "True/False", multiselect: "Multiple-select",
    definition: "Definitions", short: "Short Questions", scenario: "Scenario Questions",
    comparison: "Difference Questions", identify: "Conceptual Questions",
    matching: "Matching", ordering: "Ordering"
  };

  function center() {
    var root = IFLRouter.outlet();
    var all = IFLData.allQuestions();
    var byType = {};
    all.forEach(function (q) { byType[q.type] = byType[q.type] || []; byType[q.type].push(q); });
    var trainerSets = (IFLData.examPrepSets().trainerSets || []);

    root.innerHTML =
      '<div class="section-header"><h1>Exam Preparation Center</h1></div>' +
      '<div class="card-grid mb-4">' +
        '<button class="card card-clickable" data-nav="#/exam-prep/trainer"><div class="card-title">Exam Answer Trainer</div><p class="text-sm mb-0">' + trainerSets.length + ' essay/short-answer questions — attempt first, then compare to the expected answer structure</p></button>' +
        '<button class="card card-clickable" data-nav="#/exam-prep/rapid-revision"><div class="card-title">Rapid Revision Cards</div><p class="text-sm mb-0">One-line definitions, key points and exam triggers, chapter by chapter</p></button>' +
        '<button class="card card-clickable" data-nav="#/quiz/mixed"><div class="card-title">Mixed MCQ Practice</div><p class="text-sm mb-0">15 random questions across the whole book</p></button>' +
      '</div>' +
      '<h3>Browse by Question Type</h3>' +
      '<div class="card-grid">' +
        Object.keys(byType).map(function (t) {
          return '<div class="card"><div class="card-title">' + esc(TYPE_LABELS[t] || t) + '</div><p class="text-sm mb-0">' + byType[t].length + ' questions across the book</p></div>';
        }).join("") +
      '</div>';
  }

  function trainerList() {
    var root = IFLRouter.outlet();
    var sets = IFLData.examPrepSets().trainerSets || [];
    if (!sets.length) { root.innerHTML = '<div class="empty-state"><h3>Exam Answer Trainer is still being generated</h3></div>'; return; }
    root.innerHTML =
      '<nav class="text-sm text-muted mb-3"><a data-nav="#/exam-prep">Exam Prep Center</a> › Exam Answer Trainer</nav>' +
      '<h1>Exam Answer Trainer</h1>' +
      '<p class="text-secondary">Attempt each question in your own words first, then reveal how a strong MBA answer should be structured.</p>' +
      '<div class="card-grid">' + sets.map(function (t) {
        return '<button class="card card-clickable" data-nav="#/exam-prep/trainer/' + esc(t.id) + '"><div class="card-title">' + esc(t.question.slice(0, 90)) + '</div><p class="text-sm mb-0">Chapter ' + t.chapter + '</p></button>';
      }).join("") + '</div>';
  }

  function trainerDetail(params) {
    var root = IFLRouter.outlet();
    var sets = IFLData.examPrepSets().trainerSets || [];
    var t = sets.find(function (x) { return x.id === params.id; });
    if (!t) { root.innerHTML = '<div class="empty-state"><h3>Not found</h3><button class="btn btn-primary" data-nav="#/exam-prep/trainer">Back</button></div>'; return; }
    root.innerHTML =
      '<nav class="text-sm text-muted mb-3"><a data-nav="#/exam-prep/trainer">Exam Answer Trainer</a></nav>' +
      '<h1>' + esc(t.question) + '</h1>' +
      '<div class="card mb-4"><textarea id="trainer-attempt" placeholder="Write your full answer here before revealing the model structure…" style="min-height:160px;"></textarea></div>' +
      '<button class="btn btn-primary" id="reveal-trainer">Reveal Expected Answer Structure</button>' +
      '<div id="trainer-reveal" style="display:none;" class="mt-4">' +
        '<div class="card mb-3"><h3>Expected Answer Structure</h3><ol class="mb-0">' + (t.expectedStructure || []).map(function (s) { return "<li>" + fmt(s) + "</li>"; }).join("") + '</ol></div>' +
        '<div class="grid-2 mb-3">' +
          '<div class="card"><h4>Key Concepts</h4><div class="badge-row">' + (t.keyConcepts || []).map(function (k) { return '<span class="pill pill-brand">' + esc(k) + '</span>'; }).join("") + '</div></div>' +
          '<div class="card"><h4>Essential Points</h4><ul class="mb-0">' + (t.essentialPoints || []).map(function (p) { return "<li>" + fmt(p) + "</li>"; }).join("") + '</ul></div>' +
        '</div>' +
        '<div class="callout callout-warning mb-3"><div class="callout-title">Common Mistakes</div><ul class="mb-0">' + (t.commonMistakes || []).map(function (m) { return "<li>" + fmt(m) + "</li>"; }).join("") + '</ul></div>' +
        (t.source ? '<div class="source-footer"><span class="icon">📖</span> Source: Chapter ' + t.source.chapter + (t.source.section ? ", §" + esc(t.source.section) : "") + (t.source.pages ? ", p. " + t.source.pages.join(",") : "") + '</div>' : "") +
      '</div>';
    document.getElementById("reveal-trainer").addEventListener("click", function () {
      document.getElementById("trainer-reveal").style.display = "block";
      this.style.display = "none";
    });
  }

  function rapidRevision() {
    var root = IFLRouter.outlet();
    var chapters = IFLData.allChapters();
    var idx = 0;
    var cards = [];
    chapters.forEach(function (c) {
      (c.topics || []).forEach(function (t) {
        cards.push({
          concept: t.title, chapter: c.chapterNumber,
          oneLine: t.overview || (t.keyPoints && t.keyPoints[0]) || "",
          keyPoints: (t.keyPoints || []).slice(0, 3),
          distinction: (t.importantDistinctions && t.importantDistinctions[0]) || "",
          examTrigger: t.examRelevance,
          source: t.source
        });
      });
    });
    if (!cards.length) { root.innerHTML = '<div class="empty-state"><h3>No content yet</h3></div>'; return; }

    function paint() {
      var c = cards[idx];
      root.innerHTML =
        '<div class="section-header"><h1>Rapid Revision</h1><span class="text-sm text-muted">' + (idx + 1) + ' / ' + cards.length + '</span></div>' +
        '<div class="card">' +
          '<span class="pill pill-brand mb-2" style="display:inline-block;">Ch ' + c.chapter + '</span>' +
          '<h2>' + esc(c.concept) + '</h2>' +
          '<p class="text-secondary">' + esc(c.oneLine) + '</p>' +
          (c.keyPoints.length ? '<ul>' + c.keyPoints.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + '</ul>' : "") +
          (c.distinction ? '<div class="callout callout-note"><strong>Distinction:</strong> ' + esc(c.distinction) + '</div>' : "") +
          '<span class="pill ' + IFLDom.pillClassForExamRelevance(c.examTrigger) + ' mt-2" style="display:inline-block;">' + esc(c.examTrigger || "") + '</span>' +
        '</div>' +
        '<div class="flex items-center justify-between mt-4">' +
          '<button class="btn btn-outline" id="rr-prev" ' + (idx === 0 ? "disabled" : "") + '>← Previous</button>' +
          '<button class="btn btn-primary" id="rr-next">' + (idx + 1 < cards.length ? "Next →" : "Restart") + '</button>' +
        '</div>';
      document.getElementById("rr-prev").addEventListener("click", function () { idx = Math.max(0, idx - 1); paint(); });
      document.getElementById("rr-next").addEventListener("click", function () { idx = (idx + 1) % cards.length; paint(); });
    }
    paint();
  }

  IFLRouter.register("/exam-prep", center);
  IFLRouter.register("/exam-prep/trainer", trainerList);
  IFLRouter.register("/exam-prep/trainer/:id", trainerDetail);
  IFLRouter.register("/exam-prep/rapid-revision", rapidRevision);
})();
