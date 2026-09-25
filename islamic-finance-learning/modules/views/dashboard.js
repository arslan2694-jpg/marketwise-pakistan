/* Dashboard: welcome, overall progress, continue-learning, stats, weak
 * topics, bookmarks, recent activity, streak, recommended next lesson. */
(function () {
  "use strict";
  var el = IFLDom.el, esc = IFLDom.esc;

  function ring(pct, size, label) {
    size = size || 84;
    var r = (size - 10) / 2;
    var c = 2 * Math.PI * r;
    var offset = c - (pct / 100) * c;
    return '<span class="ring-progress" style="width:' + size + 'px;height:' + size + 'px;">' +
      '<svg width="' + size + '" height="' + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke="var(--color-border)" stroke-width="8" fill="none"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke="var(--color-brand)" stroke-width="8" fill="none" ' +
      'stroke-dasharray="' + c + '" stroke-dashoffset="' + offset + '" stroke-linecap="round"/>' +
      '</svg><span class="ring-progress-label">' + (label || (pct + "%")) + '</span></span>';
  }

  function statTile(value, label) {
    return '<div class="card stat-tile"><span class="stat-value">' + esc(value) + '</span><span class="stat-label">' + esc(label) + '</span></div>';
  }

  function render() {
    var root = IFLRouter.outlet();
    var s = IFLStore.get();
    var overall = IFLData.overallProgress();
    var quizAvg = IFLData.overallQuizAverage();
    var chaptersCompleted = Object.keys(s.progress.chapterCompleted).length;
    var flashcardsReviewed = s.progress.flashcardsReviewedCount;
    var recommendation = IFLData.recommendNext();
    var weak = IFLData.weakTopics(3);
    var bookmarks = s.bookmarks.slice(-5).reverse();
    var notes = s.notes.slice(-3).reverse();

    var currentChapterNum = null;
    IFLData.allChapters().forEach(function (c) {
      var p = IFLData.chapterTopicProgress(c.chapterNumber);
      if (p.done > 0 && p.done < p.total && currentChapterNum === null) currentChapterNum = c.chapterNumber;
    });
    var currentChapter = currentChapterNum ? IFLData.getChapter(currentChapterNum) : null;

    var totalChapters = IFLData.allChapters().length;
    var examReadiness = totalChapters ? Math.round(
      (overall.pct * 0.5) + ((quizAvg || 0) * 0.35) + (Math.min(100, chaptersCompleted / totalChapters * 100) * 0.15)
    ) : 0;

    root.innerHTML =
      '<div class="section-header">' +
        '<div><h1>Welcome back</h1><p class="text-secondary mb-0">Understanding Islamic Finance — your study companion based on Muhammad Ayub\'s textbook.</p></div>' +
        '<button class="btn btn-primary" data-nav="' + esc(recommendation.href) + '">Continue Learning →</button>' +
      '</div>' +

      '<div class="grid-2 mb-4" style="grid-template-columns: 1.3fr 1fr;">' +
        '<div class="card">' +
          '<div class="flex items-center gap-4">' +
            ring(overall.pct, 96) +
            '<div>' +
              '<div class="card-title">Overall Course Progress</div>' +
              '<p class="text-sm mb-1">' + overall.done + ' of ' + overall.total + ' topics completed across all 18 chapters.</p>' +
              (currentChapter ? '<p class="text-sm mb-0"><strong>Currently in:</strong> Chapter ' + currentChapter.chapterNumber + ' — ' + esc(currentChapter.title) + '</p>' : '<p class="text-sm mb-0 text-muted">No chapter in progress — start with Chapter 1.</p>') +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card">' +
          '<div class="card-title">Exam Readiness</div>' +
          '<div class="flex items-center gap-3 mt-2">' + ring(examReadiness, 72, examReadiness + "%") +
          '<p class="text-sm mb-0">Composite of topic completion, quiz average and chapters fully completed. Improves as you study, quiz and review.</p></div>' +
        '</div>' +
      '</div>' +

      '<div class="card-grid mb-4">' +
        statTile(chaptersCompleted + " / " + totalChapters, "Chapters completed") +
        statTile(overall.done + " / " + overall.total, "Topics completed") +
        statTile(quizAvg == null ? "—" : quizAvg + "%", "Quiz average") +
        statTile(flashcardsReviewed, "Flashcards reviewed") +
        statTile(s.progress.streakDays, "Day study streak") +
        statTile(IFLDom.formatDuration(s.progress.studySeconds), "Total study time") +
      '</div>' +

      '<div class="card mb-4" style="border-color:var(--color-brand);background:var(--color-brand-soft);">' +
        '<div class="flex items-center justify-between" style="flex-wrap:wrap;gap:var(--sp-3);">' +
          '<div><div class="card-title" style="color:var(--color-brand-strong);">What should I study next?</div><p class="text-sm mb-0">' + esc(recommendation.label) + '</p></div>' +
          '<button class="btn btn-primary" data-nav="' + esc(recommendation.href) + '">Go →</button>' +
        '</div>' +
      '</div>' +

      '<div class="grid-2">' +
        '<div class="card">' +
          '<div class="section-header mb-2"><h3 class="mb-0">Weak Topics</h3><a data-nav="#/adaptive" class="text-sm">Practice weak areas →</a></div>' +
          (weak.length ? weak.map(function (w) {
            return '<div class="card-row mb-2"><span class="text-sm" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px;" title="' + esc(w.title) + '">' + esc(IFLDom.truncate(w.title, 34)) + '</span>' +
              '<span class="flex items-center gap-2"><span class="progress-track" style="width:100px;"><span class="progress-fill ' + (w.pct < 50 ? "danger" : "warn") + '" style="width:' + w.pct + '%"></span></span><strong class="text-sm">' + w.pct + '%</strong></span></div>';
          }).join("") : '<p class="text-sm text-muted">Take a few quizzes and weak topics will show up here automatically.</p>') +
        '</div>' +
        '<div class="card">' +
          '<div class="section-header mb-2"><h3 class="mb-0">Recent Bookmarks</h3><a data-nav="#/bookmarks" class="text-sm">View all →</a></div>' +
          (bookmarks.length ? bookmarks.map(function (b) {
            return '<div class="text-sm mb-2">🔖 ' + esc(b.label) + '<br><small>' + IFLDom.relativeTime(b.createdAt) + '</small></div>';
          }).join("") : '<p class="text-sm text-muted">Bookmark topics, definitions or questions as you study — they\'ll appear here.</p>') +
        '</div>' +
      '</div>' +

      '<div class="grid-2 mt-4">' +
        '<div class="card">' +
          '<div class="section-header mb-2"><h3 class="mb-0">My Notes</h3><a data-nav="#/notes" class="text-sm">View all →</a></div>' +
          (notes.length ? notes.map(function (n) {
            return '<div class="text-sm mb-2">' + esc(n.text.slice(0, 90)) + (n.text.length > 90 ? "…" : "") + '<br><small>' + IFLDom.relativeTime(n.updatedAt) + '</small></div>';
          }).join("") : '<p class="text-sm text-muted">Add notes on any chapter, topic or flashcard — they\'ll appear here.</p>') +
        '</div>' +
        '<div class="card">' +
          '<div class="section-header mb-2"><h3 class="mb-0">Quick Access</h3></div>' +
          '<div class="badge-row">' +
            '<button class="btn btn-outline btn-sm" data-nav="#/crash-course/45">45-min Crash Course</button>' +
            '<button class="btn btn-outline btn-sm" data-nav="#/flashcards">Flashcards</button>' +
            '<button class="btn btn-outline btn-sm" data-nav="#/quiz">Quiz</button>' +
            '<button class="btn btn-outline btn-sm" data-nav="#/glossary">Glossary</button>' +
            '<button class="btn btn-outline btn-sm" data-nav="#/concept-map">Concept Map</button>' +
            '<button class="btn btn-outline btn-sm" data-nav="#/exam-prep">Exam Prep Center</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  IFLRouter.register("/dashboard", render);
  IFLRouter.register("/", render);
})();
