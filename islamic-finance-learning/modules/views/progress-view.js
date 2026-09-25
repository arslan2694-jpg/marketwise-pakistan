/* My Progress: chapter-by-chapter completion, quiz history, flashcard
 * stats, streak, and achievements — all computed from real stored data. */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  function render() {
    var root = IFLRouter.outlet();
    var s = IFLStore.get();
    var chapters = IFLData.allChapters();
    var overall = IFLData.overallProgress();
    var recentAttempts = s.progress.quizAttempts.slice(-10).reverse();
    var unlocked = IFLProgress.ACHIEVEMENTS.filter(function (a) { return s.achievements[a.id]; });
    var locked = IFLProgress.ACHIEVEMENTS.filter(function (a) { return !s.achievements[a.id]; });

    root.innerHTML =
      '<div class="section-header"><h1>My Progress</h1></div>' +
      '<div class="card-grid mb-4">' +
        '<div class="card stat-tile"><span class="stat-value">' + overall.pct + '%</span><span class="stat-label">Overall course progress</span></div>' +
        '<div class="card stat-tile"><span class="stat-value">' + s.progress.streakDays + '</span><span class="stat-label">Current streak (best ' + s.progress.bestStreakDays + ')</span></div>' +
        '<div class="card stat-tile"><span class="stat-value">' + IFLDom.formatDuration(s.progress.studySeconds) + '</span><span class="stat-label">Total study time</span></div>' +
        '<div class="card stat-tile"><span class="stat-value">' + s.progress.sessionsCompleted + '</span><span class="stat-label">Sessions completed</span></div>' +
      '</div>' +

      '<h3>Chapters</h3>' +
      '<div class="card mb-4"><table><thead><tr><th>Chapter</th><th>Topics</th><th>Quiz Avg</th><th>Status</th></tr></thead><tbody>' +
        chapters.map(function (c) {
          var p = IFLData.chapterTopicProgress(c.chapterNumber);
          var avg = IFLData.chapterQuizAverage(c.chapterNumber);
          return '<tr><td><a data-nav="#/chapter/' + c.chapterNumber + '">Ch ' + c.chapterNumber + ': ' + esc(c.title.slice(0, 36)) + '</a></td>' +
            '<td>' + p.done + '/' + p.total + '</td><td>' + (avg == null ? "—" : avg + "%") + '</td>' +
            '<td>' + (p.pct === 100 ? '<span class="pill pill-success">Completed</span>' : p.done > 0 ? '<span class="pill pill-warning">In progress</span>' : '<span class="pill">Not started</span>') + '</td></tr>';
        }).join("") +
      '</tbody></table></div>' +

      '<h3>Recent Quiz Attempts</h3>' +
      '<div class="card mb-4">' + (recentAttempts.length ? recentAttempts.map(function (a) {
        var chapter = a.chapter ? IFLData.getChapter(a.chapter) : null;
        return '<div class="card-row mb-2"><span class="text-sm">' + (chapter ? "Ch " + a.chapter + ": " + esc(chapter.title.slice(0, 30)) : "Mixed quiz") + ' · ' + IFLDom.relativeTime(a.ts) + '</span>' +
          '<span class="pill ' + (a.scorePct >= 70 ? "pill-success" : a.scorePct >= 40 ? "pill-warning" : "pill-danger") + '">' + a.scorePct + '%</span></div>';
      }).join("") : '<p class="text-muted mb-0">No quizzes taken yet.</p>') + '</div>' +

      '<h3>Achievements</h3>' +
      '<div class="card-grid">' +
        unlocked.map(function (a) { return '<div class="card"><div class="flex items-center gap-2"><span style="font-size:1.4rem;">🏅</span><div><strong class="text-sm">' + esc(a.label) + '</strong><br><small class="text-muted">' + IFLDom.formatDate(s.achievements[a.id]) + '</small></div></div></div>'; }).join("") +
        locked.map(function (a) { return '<div class="card" style="opacity:0.55;"><div class="flex items-center gap-2"><span style="font-size:1.4rem;">🔒</span><strong class="text-sm">' + esc(a.label) + '</strong></div></div>'; }).join("") +
      '</div>';
  }

  IFLRouter.register("/progress", render);
})();
