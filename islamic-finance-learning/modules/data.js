/* Aggregation layer over window.IFL_DATA (populated by data/*.js files) and
 * the static reference JSON copied into data/*.js at build time. Provides a
 * single query surface the view modules use instead of touching globals
 * directly, plus a lazily-built full-text search index. */
(function (global) {
  "use strict";

  function D() { return global.IFL_DATA || {}; }

  function chapterIndexMeta() {
    return (D().chapterIndex && D().chapterIndex.chapters) || [];
  }

  function allChapters() {
    var chapters = D().chapters || {};
    return Object.keys(chapters)
      .map(function (k) { return chapters[k]; })
      .sort(function (a, b) { return a.chapterNumber - b.chapterNumber; });
  }

  function getChapter(num) {
    var chapters = D().chapters || {};
    return chapters[num] || chapters[String(num)] || null;
  }

  function chaptersInPart(part) {
    return allChapters().filter(function (c) { return c.part === part; });
  }

  function allTopics() {
    var out = [];
    allChapters().forEach(function (c) {
      (c.topics || []).forEach(function (t) { out.push(t); });
    });
    return out;
  }

  function getTopic(topicId) {
    var chNum = (topicId.match(/^ch(\d+)-/) || [])[1];
    var chapter = chNum ? getChapter(Number(chNum)) : null;
    if (!chapter) return null;
    return (chapter.topics || []).find(function (t) { return t.id === topicId; }) || null;
  }

  function totalTopicCount() {
    return allTopics().length;
  }

  function allFlashcards() { return D().flashcards || []; }
  function flashcardsByChapter(num) { return allFlashcards().filter(function (f) { return f.chapter === Number(num); }); }
  function getFlashcard(id) { return allFlashcards().find(function (f) { return f.id === id; }) || null; }

  function allQuestions() { return D().questions || []; }
  function questionsByChapter(num) { return allQuestions().filter(function (q) { return q.chapter === Number(num); }); }
  function getQuestion(id) { return allQuestions().find(function (q) { return q.id === id; }) || null; }

  function glossaryTerms() { return D().glossary || []; }
  function acronyms() { return D().acronyms || []; }

  function comparisons() { return D().comparisons || []; }
  function getComparison(id) { return comparisons().find(function (c) { return c.id === id; }) || null; }

  function caseStudies() { return D().caseStudies || []; }
  function getCaseStudy(id) { return caseStudies().find(function (c) { return c.id === id; }) || null; }

  function conceptMap() { return D().conceptMap || { nodes: [], edges: [] }; }
  function decisionTree() { return D().decisionTree || null; }
  function studyModes() { return D().studyModes || {}; }
  function examPrepSets() { return D().examPrep || {}; }

  // ---- Progress-aware computed helpers ----

  function chapterTopicProgress(chapterNum) {
    var chapter = getChapter(chapterNum);
    if (!chapter) return { done: 0, total: 0, pct: 0 };
    var completed = global.IFLStore.get().progress.topicsCompleted;
    var total = (chapter.topics || []).length;
    var done = (chapter.topics || []).filter(function (t) { return completed[t.id]; }).length;
    return { done: done, total: total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function overallProgress() {
    var completed = global.IFLStore.get().progress.topicsCompleted;
    var total = totalTopicCount();
    var done = Object.keys(completed).filter(function (id) { return !!getTopic(id); }).length;
    return { done: done, total: total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function chapterQuizAverage(chapterNum) {
    var attempts = global.IFLStore.get().progress.quizAttempts.filter(function (a) { return a.chapter === Number(chapterNum); });
    if (!attempts.length) return null;
    var sum = attempts.reduce(function (acc, a) { return acc + a.scorePct; }, 0);
    return Math.round(sum / attempts.length);
  }

  function overallQuizAverage() {
    var attempts = global.IFLStore.get().progress.quizAttempts;
    if (!attempts.length) return null;
    var sum = attempts.reduce(function (acc, a) { return acc + a.scorePct; }, 0);
    return Math.round(sum / attempts.length);
  }

  // weak topics: based on per-question history correctness aggregated by chapter/topic
  function weakTopics(limit) {
    var qHistory = global.IFLStore.get().progress.questionHistory;
    var byChapter = {};
    allQuestions().forEach(function (q) {
      var h = qHistory[q.id];
      if (!h || !h.attempts) return;
      byChapter[q.chapter] = byChapter[q.chapter] || { correct: 0, attempts: 0 };
      byChapter[q.chapter].correct += h.correct;
      byChapter[q.chapter].attempts += h.attempts;
    });
    var rows = Object.keys(byChapter).map(function (chNum) {
      var stat = byChapter[chNum];
      var chapter = getChapter(chNum);
      return {
        chapter: Number(chNum),
        title: chapter ? chapter.title : ("Chapter " + chNum),
        pct: stat.attempts ? Math.round((stat.correct / stat.attempts) * 100) : 0,
        attempts: stat.attempts
      };
    }).filter(function (r) { return r.attempts >= 2; });
    rows.sort(function (a, b) { return a.pct - b.pct; });
    return rows.slice(0, limit || 5);
  }

  function recommendNext() {
    var progress = global.IFLStore.get().progress;
    var chapters = allChapters();
    // 1. continue a chapter that's partially done
    for (var i = 0; i < chapters.length; i++) {
      var p = chapterTopicProgress(chapters[i].chapterNumber);
      if (p.done > 0 && p.done < p.total) {
        return { type: "continue-chapter", chapter: chapters[i].chapterNumber, label: "Continue Chapter " + chapters[i].chapterNumber + ": " + chapters[i].title, href: "#/chapter/" + chapters[i].chapterNumber };
      }
    }
    // 2. weak topic review
    var weak = weakTopics(1);
    if (weak.length && weak[0].pct < 70) {
      return { type: "review-weak", chapter: weak[0].chapter, label: "Review weak area: " + weak[0].title + " (" + weak[0].pct + "%)", href: "#/quiz/chapter/" + weak[0].chapter };
    }
    // 3. next unopened chapter
    for (var j = 0; j < chapters.length; j++) {
      if (!progress.visitedChapters[chapters[j].chapterNumber]) {
        return { type: "start-chapter", chapter: chapters[j].chapterNumber, label: "Start Chapter " + chapters[j].chapterNumber + ": " + chapters[j].title, href: "#/chapter/" + chapters[j].chapterNumber };
      }
    }
    // 4. fallback: crash course
    return { type: "crash-course", label: "Take the 45-Minute Crash Course for rapid revision", href: "#/crash-course/45" };
  }

  // ---- Search index ----
  var searchIndex = null;
  function buildSearchIndex() {
    var idx = [];
    allChapters().forEach(function (c) {
      idx.push({ kind: "Chapter", title: "Chapter " + c.chapterNumber + ": " + c.title, context: c.whyItMatters || "", href: "#/chapter/" + c.chapterNumber, chapter: c.chapterNumber, section: "", text: (c.title + " " + (c.whyItMatters || "")).toLowerCase() });
      (c.topics || []).forEach(function (t) {
        idx.push({
          kind: "Topic", title: t.title, context: t.overview || t.simpleExplanation || "",
          href: "#/chapter/" + c.chapterNumber + "/topic/" + t.id, chapter: c.chapterNumber, section: t.sectionNumber,
          text: [t.title, t.overview, t.simpleExplanation, t.academicExplanation, (t.keyPoints || []).join(" ")].join(" ").toLowerCase()
        });
        (t.definitions || []).forEach(function (def) {
          idx.push({ kind: "Definition", title: def.term, context: def.definition, href: "#/chapter/" + c.chapterNumber + "/topic/" + t.id, chapter: c.chapterNumber, section: t.sectionNumber, text: (def.term + " " + def.definition).toLowerCase() });
        });
      });
    });
    glossaryTerms().forEach(function (g) {
      idx.push({ kind: "Glossary", title: g.term, context: g.definition, href: "#/glossary?q=" + encodeURIComponent(g.term), chapter: null, section: "", text: (g.term + " " + g.definition).toLowerCase() });
    });
    allFlashcards().forEach(function (f) {
      idx.push({ kind: "Flashcard", title: f.front, context: f.back, href: "#/flashcards?chapter=" + f.chapter, chapter: f.chapter, section: (f.source && f.source.section) || "", text: (f.front + " " + f.back).toLowerCase() });
    });
    allQuestions().forEach(function (q) {
      idx.push({ kind: "Question", title: q.prompt, context: q.topic || "", href: "#/quiz/chapter/" + q.chapter, chapter: q.chapter, section: q.section || "", text: (q.prompt + " " + (q.topic || "")).toLowerCase() });
    });
    comparisons().forEach(function (c) {
      idx.push({ kind: "Comparison", title: c.title, context: c.summary || "", href: "#/comparisons/" + c.id, chapter: null, section: "", text: (c.title + " " + (c.summary || "")).toLowerCase() });
    });
    caseStudies().forEach(function (c) {
      idx.push({ kind: "Case Study", title: c.title, context: c.scenario || "", href: "#/case-studies/" + c.id, chapter: c.chapter || null, section: "", text: (c.title + " " + (c.scenario || "")).toLowerCase() });
    });
    return idx;
  }

  function search(query, limit) {
    if (!searchIndex) searchIndex = buildSearchIndex();
    var q = (query || "").trim().toLowerCase();
    if (!q) return [];
    var terms = q.split(/\s+/).filter(Boolean);
    var scored = searchIndex.map(function (item) {
      var score = 0;
      terms.forEach(function (term) {
        if (item.title.toLowerCase().indexOf(term) !== -1) score += 3;
        if (item.text.indexOf(term) !== -1) score += 1;
      });
      return { item: item, score: score };
    }).filter(function (r) { return r.score > 0; });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, limit || 30).map(function (r) { return r.item; });
  }

  function invalidateSearchIndex() { searchIndex = null; }

  global.IFLData = {
    allChapters: allChapters, getChapter: getChapter, chaptersInPart: chaptersInPart,
    allTopics: allTopics, getTopic: getTopic, totalTopicCount: totalTopicCount,
    allFlashcards: allFlashcards, flashcardsByChapter: flashcardsByChapter, getFlashcard: getFlashcard,
    allQuestions: allQuestions, questionsByChapter: questionsByChapter, getQuestion: getQuestion,
    glossaryTerms: glossaryTerms, acronyms: acronyms,
    comparisons: comparisons, getComparison: getComparison,
    caseStudies: caseStudies, getCaseStudy: getCaseStudy,
    conceptMap: conceptMap, decisionTree: decisionTree, studyModes: studyModes, examPrepSets: examPrepSets,
    chapterTopicProgress: chapterTopicProgress, overallProgress: overallProgress,
    chapterQuizAverage: chapterQuizAverage, overallQuizAverage: overallQuizAverage,
    weakTopics: weakTopics, recommendNext: recommendNext,
    search: search, invalidateSearchIndex: invalidateSearchIndex,
    chapterIndexMeta: chapterIndexMeta
  };
})(window);
