/* "Learn" section: all chapters grid, filterable by Part. */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  var PART_TITLES = {
    I: "Part I · Fundamentals",
    II: "Part II · Contractual Bases in Islamic Finance",
    III: "Part III · Islamic Finance — Products and Procedures"
  };

  function chapterCard(c) {
    var p = IFLData.chapterTopicProgress(c.chapterNumber);
    var quizAvg = IFLData.chapterQuizAverage(c.chapterNumber);
    var done = p.pct === 100;
    return '<button class="card card-clickable" data-nav="#/chapter/' + c.chapterNumber + '">' +
      '<div class="flex items-center justify-between mb-2">' +
        '<span class="pill pill-brand">Chapter ' + c.chapterNumber + '</span>' +
        (done ? '<span class="pill pill-success">✓ Completed</span>' : (p.done > 0 ? '<span class="pill pill-warning">In progress</span>' : '<span class="pill">Not started</span>')) +
      '</div>' +
      '<div class="card-title">' + esc(c.title) + '</div>' +
      '<p class="text-sm mb-2">' + (c.topics ? c.topics.length : 0) + ' topics · ~' + (c.estimatedMinutes || 30) + ' min · ' + esc(c.difficulty || "") + '</p>' +
      '<div class="progress-track progress-track-sm mb-2"><span class="progress-fill" style="width:' + p.pct + '%"></span></div>' +
      '<div class="flex items-center justify-between text-xs text-muted">' +
        '<span>' + p.done + '/' + p.total + ' topics</span>' +
        '<span>' + (quizAvg == null ? "No quiz yet" : "Quiz avg " + quizAvg + "%") + '</span>' +
      '</div>' +
    '</button>';
  }

  function renderList(chapters, title) {
    var root = IFLRouter.outlet();
    if (!chapters.length) {
      root.innerHTML = '<div class="empty-state"><h3>Content is still being prepared</h3><p>Chapter data hasn\'t loaded for this section yet — try refreshing in a moment.</p></div>';
      return;
    }
    root.innerHTML =
      '<div class="section-header"><h1>' + esc(title) + '</h1></div>' +
      '<div class="badge-row mb-4">' +
        '<a class="btn btn-sm ' + (title === "All Chapters" ? "btn-primary" : "btn-outline") + '" data-nav="#/learn">All</a>' +
        '<a class="btn btn-sm btn-outline" data-nav="#/learn/part/I">Part I</a>' +
        '<a class="btn btn-sm btn-outline" data-nav="#/learn/part/II">Part II</a>' +
        '<a class="btn btn-sm btn-outline" data-nav="#/learn/part/III">Part III</a>' +
      '</div>' +
      '<div class="card-grid">' + chapters.map(chapterCard).join("") + '</div>';
  }

  IFLRouter.register("/learn", function () {
    renderList(IFLData.allChapters(), "All Chapters");
  });

  IFLRouter.register("/learn/part/:part", function (params) {
    var chapters = IFLData.chaptersInPart(params.part);
    renderList(chapters, PART_TITLES[params.part] || ("Part " + params.part));
  });
})();
