/* Mutations for progress tracking + achievement unlocking.
 * All values here come from real user interaction — nothing is fabricated. */
(function (global) {
  "use strict";

  var ACHIEVEMENTS = [
    { id: "first-topic", label: "First Topic Completed", check: function (p) { return Object.keys(p.topicsCompleted).length >= 1; } },
    { id: "first-chapter", label: "First Chapter Completed", check: function (p) { return Object.keys(p.chapterCompleted).length >= 1; } },
    { id: "ten-topics", label: "10 Topics Completed", check: function (p) { return Object.keys(p.topicsCompleted).length >= 10; } },
    { id: "fifty-topics", label: "50 Topics Completed", check: function (p) { return Object.keys(p.topicsCompleted).length >= 50; } },
    { id: "fifty-flashcards", label: "50 Flashcards Reviewed", check: function (p) { return p.flashcardsReviewedCount >= 50; } },
    { id: "two-hundred-flashcards", label: "200 Flashcards Reviewed", check: function (p) { return p.flashcardsReviewedCount >= 200; } },
    { id: "first-quiz-passed", label: "First Quiz Passed", check: function (p) { return p.quizAttempts.some(function (a) { return a.scorePct >= 60; }); } },
    { id: "quiz-ace", label: "Scored 100% on a Quiz", check: function (p) { return p.quizAttempts.some(function (a) { return a.scorePct === 100; }); } },
    { id: "five-day-streak", label: "5-Day Study Streak", check: function (p) { return p.streakDays >= 5; } },
    { id: "fourteen-day-streak", label: "14-Day Study Streak", check: function (p) { return p.streakDays >= 14; } },
    { id: "part-1-complete", label: "Part I Fully Completed", check: function (p) { return [1, 2, 3, 4].every(function (c) { return p.chapterCompleted[c]; }); } },
    { id: "part-2-complete", label: "Part II Fully Completed", check: function (p) { return [5, 6, 7].every(function (c) { return p.chapterCompleted[c]; }); } },
    { id: "part-3-complete", label: "Part III Fully Completed", check: function (p) { return [8,9,10,11,12,13,14,15,16,17,18].every(function (c) { return p.chapterCompleted[c]; }); } },
    { id: "all-chapters-visited", label: "All 18 Chapters Visited", check: function (p) { for (var i = 1; i <= 18; i++) { if (!p.visitedChapters[i]) return false; } return true; } },
    { id: "crash-course-done", label: "Completed the 45-Minute Crash Course", check: function (p) { return p.crashCourseProgress["45min"] && p.crashCourseProgress["45min"].completedAt; } },
    { id: "case-study-explorer", label: "Completed 5 Case Studies", check: function (p) { return Object.keys(p.caseStudiesCompleted).length >= 5; } }
  ];

  function checkAchievements() {
    var newly = [];
    global.IFLStore.update(function (s) {
      ACHIEVEMENTS.forEach(function (a) {
        if (!s.achievements[a.id] && a.check(s.progress)) {
          s.achievements[a.id] = Date.now();
          newly.push(a);
        }
      });
    });
    newly.forEach(function (a) {
      global.IFLDom.toast("Achievement unlocked: " + a.label, { duration: 3200 });
    });
    return newly;
  }

  function visitChapter(chapterNum) {
    global.IFLStore.update(function (s) {
      s.progress.visitedChapters[chapterNum] = true;
      if (!s.progress.chapterOpened[chapterNum]) s.progress.chapterOpened[chapterNum] = Date.now();
    });
    global.IFLStore.touchStreak();
  }

  function completeTopic(topicId, chapterNum) {
    var already = global.IFLStore.get().progress.topicsCompleted[topicId];
    global.IFLStore.update(function (s) {
      s.progress.topicsCompleted[topicId] = Date.now();
    });
    global.IFLStore.touchStreak();
    maybeCompleteChapter(chapterNum);
    if (!already) checkAchievements();
  }

  function uncompleteTopic(topicId) {
    global.IFLStore.update(function (s) {
      delete s.progress.topicsCompleted[topicId];
    });
  }

  function maybeCompleteChapter(chapterNum) {
    var chapter = global.IFLData.getChapter(chapterNum);
    if (!chapter) return;
    var completed = global.IFLStore.get().progress.topicsCompleted;
    var allDone = (chapter.topics || []).every(function (t) { return completed[t.id]; });
    if (allDone) {
      global.IFLStore.update(function (s) {
        if (!s.progress.chapterCompleted[chapterNum]) s.progress.chapterCompleted[chapterNum] = Date.now();
      });
      checkAchievements();
    }
  }

  function recordQuizAttempt(attempt) {
    // attempt: { chapter, total, correct, missed: [qid], answers: {qid: {chosen, correct}} }
    var scorePct = attempt.total ? Math.round((attempt.correct / attempt.total) * 100) : 0;
    global.IFLStore.update(function (s) {
      s.progress.quizAttempts.push({
        id: "attempt-" + Date.now(),
        chapter: attempt.chapter != null ? Number(attempt.chapter) : null,
        total: attempt.total, correct: attempt.correct, scorePct: scorePct,
        missed: attempt.missed || [], ts: Date.now(), mode: attempt.mode || "chapter"
      });
      Object.keys(attempt.answers || {}).forEach(function (qid) {
        var rec = s.progress.questionHistory[qid] || { attempts: 0, correct: 0 };
        rec.attempts += 1;
        if (attempt.answers[qid].correct) rec.correct += 1;
        rec.lastCorrect = !!attempt.answers[qid].correct;
        rec.lastTs = Date.now();
        s.progress.questionHistory[qid] = rec;
      });
      s.progress.sessionsCompleted += 1;
    });
    global.IFLStore.touchStreak();
    checkAchievements();
    return scorePct;
  }

  function recordFlashcardReview(cardId, rating) {
    // rating: "again" | "hard" | "good" | "easy"
    global.IFLStore.update(function (s) {
      var rec = s.progress.flashcardReviews[cardId] || { box: 0, reps: 0, lapses: 0 };
      var now = Date.now();
      var DAY = 86400000;
      if (rating === "again") {
        rec.box = 0; rec.lapses += 1; rec.dueAt = now + 10 * 60000; // 10 min
      } else if (rating === "hard") {
        rec.box = Math.max(1, rec.box); rec.dueAt = now + 1 * DAY;
      } else if (rating === "good") {
        rec.box = Math.min(5, rec.box + 1); rec.dueAt = now + [1, 1, 2, 4, 8, 16][rec.box] * DAY;
      } else if (rating === "easy") {
        rec.box = Math.min(5, rec.box + 2); rec.dueAt = now + [2, 3, 5, 9, 16, 30][rec.box] * DAY;
      }
      rec.reps += 1;
      rec.lastRating = rating;
      rec.lastReviewed = now;
      s.progress.flashcardReviews[cardId] = rec;
      s.progress.flashcardsReviewedCount += 1;
    });
    global.IFLStore.touchStreak();
    checkAchievements();
  }

  function addStudySeconds(sec) {
    global.IFLStore.update(function (s) { s.progress.studySeconds += sec; });
    global.IFLStore.touchStreak();
  }

  global.IFLProgress = {
    ACHIEVEMENTS: ACHIEVEMENTS,
    checkAchievements: checkAchievements,
    visitChapter: visitChapter,
    completeTopic: completeTopic,
    uncompleteTopic: uncompleteTopic,
    recordQuizAttempt: recordQuizAttempt,
    recordFlashcardReview: recordFlashcardReview,
    addStudySeconds: addStudySeconds
  };
})(window);
