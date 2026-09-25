/* Case Study Lab: scenario -> attempt -> reveal textbook-grounded answer. */
(function () {
  "use strict";
  var esc = IFLDom.esc, fmt = IFLDom.formatText;

  function list() {
    var root = IFLRouter.outlet();
    var cases = IFLData.caseStudies();
    if (!cases.length) {
      root.innerHTML = '<div class="empty-state"><h3>Case Study Lab is still being generated</h3></div>';
      return;
    }
    var byChapter = {};
    cases.forEach(function (c) { byChapter[c.chapter] = byChapter[c.chapter] || []; byChapter[c.chapter].push(c); });
    root.innerHTML =
      '<div class="section-header"><h1>Case Study Lab</h1></div>' +
      '<p class="text-secondary">Apply concepts to realistic business situations, then compare your reasoning to the textbook-grounded answer.</p>' +
      '<div class="callout callout-note">Educational scenarios for applying the textbook\'s framework — not Shari\'ah rulings or professional advice.</div>' +
      Object.keys(byChapter).sort(function (a, b) { return a - b; }).map(function (chNum) {
        var chapter = IFLData.getChapter(chNum);
        return '<h3 class="mt-4">Ch ' + chNum + (chapter ? ": " + esc(chapter.title) : "") + '</h3><div class="card-grid">' +
          byChapter[chNum].map(function (c) {
            var done = IFLStore.get().progress.caseStudiesCompleted[c.id];
            return '<button class="card card-clickable" data-nav="#/case-studies/' + esc(c.id) + '">' +
              '<div class="flex items-center justify-between mb-1"><span class="pill pill-brand">' + esc(c.concept) + '</span>' + (done ? '<span class="pill pill-success">✓ Done</span>' : "") + '</div>' +
              '<div class="card-title">' + esc(c.title) + '</div>' +
              '<p class="text-sm mb-0">' + esc((c.scenario || "").slice(0, 100)) + '…</p></button>';
          }).join("") + '</div>';
      }).join("");
  }

  function detail(params) {
    var root = IFLRouter.outlet();
    var c = IFLData.getCaseStudy(params.id);
    if (!c) { root.innerHTML = '<div class="empty-state"><h3>Not found</h3><button class="btn btn-primary" data-nav="#/case-studies">Back</button></div>'; return; }
    root.innerHTML =
      '<nav class="text-sm text-muted mb-3"><a data-nav="#/case-studies">Case Study Lab</a> › ' + esc(c.title) + '</nav>' +
      '<span class="pill pill-brand mb-2" style="display:inline-block;">' + esc(c.concept) + '</span>' +
      '<h1>' + esc(c.title) + '</h1>' +
      '<div class="card mb-4"><h3>Scenario</h3><p class="mb-0">' + fmt(c.scenario) + '</p></div>' +
      '<div class="card mb-4"><h3>Your Task</h3><p>' + fmt(c.problemPrompt) + '</p>' +
        (c.analysisPrompts && c.analysisPrompts.length ? '<ul class="mb-0">' + c.analysisPrompts.map(function (p) { return "<li>" + fmt(p) + "</li>"; }).join("") + '</ul>' : "") +
        '<textarea id="cs-attempt" placeholder="Write your analysis before revealing the answer…" class="mt-3"></textarea>' +
      '</div>' +
      '<button class="btn btn-primary" id="reveal-btn">Reveal Textbook-Grounded Answer</button>' +
      '<div id="cs-answer" class="mt-4" style="display:none;">' +
        '<div class="card mb-3"><h3>Answer</h3><p class="mb-0">' + fmt(c.textbookAnswer) + '</p></div>' +
        '<div class="card mb-3"><h3>Why?</h3><p class="mb-0">' + fmt(c.whyExplanation) + '</p></div>' +
        '<div class="callout mb-3"><div class="callout-title">Exam Takeaway</div><p class="mb-0">' + fmt(c.examTakeaway) + '</p></div>' +
        (c.source ? '<div class="source-footer"><span class="icon">📖</span> Source: Chapter ' + c.source.chapter + (c.source.section ? ", §" + esc(c.source.section) : "") + (c.source.pages ? ", p. " + c.source.pages.join(",") : "") + '</div>' : "") +
        '<p class="text-xs text-muted mt-2">' + esc(c.disclaimer || "Educational scenario — not a Shari'ah ruling or professional advice.") + '</p>' +
        '<button class="btn btn-outline mt-2" id="mark-done-btn">Mark Case Study Complete</button>' +
      '</div>';

    document.getElementById("reveal-btn").addEventListener("click", function () {
      document.getElementById("cs-answer").style.display = "block";
      this.style.display = "none";
    });
    document.getElementById("mark-done-btn").addEventListener("click", function () {
      IFLStore.update(function (s) { s.progress.caseStudiesCompleted[c.id] = Date.now(); });
      IFLProgress.checkAchievements();
      IFLDom.toast("Marked complete");
      this.textContent = "✓ Completed";
      this.disabled = true;
    });
  }

  IFLRouter.register("/case-studies", list);
  IFLRouter.register("/case-studies/:id", detail);
})();
