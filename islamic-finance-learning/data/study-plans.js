/* Guided study programmes. Each segment lists items rendered from existing content:
   {type: "concept", ref: conceptId}      rapid-revision card
   {type: "topic", ref: topicId, level}   topic explanation (simple | academic | exam)
   {type: "diagram", ref: diagramId}      transaction flow
   {type: "compare", ref: pairId}         comparison table
   {type: "quiz", topics:[…], n}          quick questions drawn from those topics
   {type: "flashcards", topics:[…], n}    flashcards drawn from those topics  */
IFL_DATA.register('studyPlans', {
  crash45: {
    title: "45-Minute Crash Course", minutes: 45,
    intro: "A fast, guided pass through the book's core ideas, following the textbook's own sequence from foundations to Takaful.",
    segments: [
      { title: "Foundations", start: 0, end: 5, items: [{ type: "concept", ref: "islamic-economics" }, { type: "topic", ref: "t2.2.2", level: "exam" }, { type: "topic", ref: "t4.2", level: "simple" }] },
      { title: "Riba, Gharar, Maisir", start: 5, end: 10, items: [{ type: "concept", ref: "riba" }, { type: "concept", ref: "gharar" }, { type: "concept", ref: "maisir" }, { type: "compare", ref: "riba-trade" }] },
      { title: "Contracts", start: 10, end: 18, items: [{ type: "concept", ref: "aqd" }, { type: "topic", ref: "t5.4", level: "exam" }, { type: "compare", ref: "contracts-validity" }, { type: "concept", ref: "wad" }, { type: "concept", ref: "bai" }, { type: "concept", ref: "qard" }] },
      { title: "Murabaha", start: 18, end: 25, items: [{ type: "concept", ref: "murabaha" }, { type: "diagram", ref: "mpo" }, { type: "compare", ref: "murabaha-loan" }] },
      { title: "Salam & Istisna‘a", start: 25, end: 30, items: [{ type: "concept", ref: "salam" }, { type: "concept", ref: "istisna" }, { type: "compare", ref: "salam-istisna" }] },
      { title: "Ijarah", start: 30, end: 34, items: [{ type: "concept", ref: "ijarah" }, { type: "compare", ref: "ijarah-lease" }, { type: "concept", ref: "imbt" }] },
      { title: "Musharakah & Mudarabah", start: 34, end: 39, items: [{ type: "concept", ref: "musharakah" }, { type: "concept", ref: "mudarabah" }, { type: "compare", ref: "musharakah-mudarabah" }, { type: "concept", ref: "diminishing-musharakah" }] },
      { title: "Sukuk", start: 39, end: 42, items: [{ type: "concept", ref: "sukuk" }, { type: "compare", ref: "sukuk-bonds-shares" }] },
      { title: "Takaful", start: 42, end: 44, items: [{ type: "concept", ref: "takaful" }, { type: "compare", ref: "takaful-insurance" }] },
      { title: "Rapid-fire quiz", start: 44, end: 45, items: [{ type: "quiz", topics: ["t3.2.1", "t9.8", "t10.2", "t11.3", "t12.3.4", "t15.3.6", "t16.5"], n: 7 }] }
    ]
  },
  revision90: {
    title: "90-Minute Revision", minutes: 90,
    intro: "A structured revision programme covering foundations, prohibitions, contracts, the major modes, comparisons, Sukuk and Takaful, finishing with practice questions.",
    segments: [
      { title: "Foundations", start: 0, end: 10, items: [{ type: "concept", ref: "islamic-economics" }, { type: "topic", ref: "t2.5.1", level: "exam" }, { type: "topic", ref: "t4.2.6", level: "exam" }, { type: "concept", ref: "debt-equity" }, { type: "concept", ref: "money" }, { type: "flashcards", topics: ["t2.2.2", "t4.2", "t4.3"], n: 5 }] },
      { title: "Prohibitions", start: 10, end: 22, items: [{ type: "concept", ref: "riba" }, { type: "topic", ref: "t3.2.1.d", level: "exam" }, { type: "concept", ref: "gharar" }, { type: "concept", ref: "maisir" }, { type: "concept", ref: "inah" }, { type: "concept", ref: "bai-dayn" }, { type: "quiz", topics: ["t3.2.1", "t3.2.1.d", "t3.2.2", "t3.2.3"], n: 4 }] },
      { title: "Contracts", start: 22, end: 34, items: [{ type: "concept", ref: "aqd" }, { type: "compare", ref: "contracts-validity" }, { type: "concept", ref: "wad" }, { type: "concept", ref: "khiyar" }, { type: "concept", ref: "time-value" }, { type: "concept", ref: "late-payment-penalty" }, { type: "quiz", topics: ["t5.4", "t5.6", "t5.7", "t6.5.3", "t7.13"], n: 4 }] },
      { title: "Major financing modes", start: 34, end: 62, items: [{ type: "diagram", ref: "murabaha" }, { type: "topic", ref: "t9.8.3", level: "exam" }, { type: "diagram", ref: "salam" }, { type: "diagram", ref: "parallel-istisna" }, { type: "diagram", ref: "ijarah" }, { type: "diagram", ref: "imbt" }, { type: "diagram", ref: "musharakah" }, { type: "diagram", ref: "mudarabah" }, { type: "diagram", ref: "dm" }, { type: "concept", ref: "wakalah" }, { type: "concept", ref: "tawarruq" }, { type: "concept", ref: "jualah" }] },
      { title: "Comparisons", start: 62, end: 72, items: [{ type: "compare", ref: "murabaha-musawamah" }, { type: "compare", ref: "salam-murabaha" }, { type: "compare", ref: "ijarah-bai" }, { type: "compare", ref: "musharakah-debt" }, { type: "compare", ref: "tawarruq-inah" }, { type: "compare", ref: "islamic-conventional-banking" }] },
      { title: "Sukuk", start: 72, end: 79, items: [{ type: "diagram", ref: "sukuk" }, { type: "compare", ref: "sukuk-bonds-shares" }, { type: "topic", ref: "t15.3.6", level: "exam" }, { type: "topic", ref: "t15.3.7", level: "exam" }] },
      { title: "Takaful", start: 79, end: 84, items: [{ type: "diagram", ref: "takaful" }, { type: "topic", ref: "t16.4.1", level: "exam" }, { type: "compare", ref: "takaful-insurance" }] },
      { title: "Practice questions", start: 84, end: 90, items: [{ type: "quiz", topics: ["t9.9.6", "t10.4.2", "t11.3.6", "t12.5", "t12.8", "t13.3", "t15.3.5.b", "t16.4.2", "t17.4.3"], n: 9 }] }
    ]
  },
  deep180: {
    title: "3-Hour Deep Study", minutes: 180,
    intro: "Each block follows Concept → Explanation → Example → Comparison → Practice → Flashcards → Quiz → Review. Pause at any time; your position is saved.",
    segments: [
      { title: "Riba and the logic of trade", start: 0, end: 20, items: [{ type: "concept", ref: "riba" }, { type: "topic", ref: "t3.2.1", level: "academic" }, { type: "topic", ref: "t3.2.1.b", level: "simple" }, { type: "compare", ref: "riba-trade" }, { type: "quiz", topics: ["t3.2.1", "t3.2.1.b", "t3.2.1.e"], n: 3 }, { type: "flashcards", topics: ["t3.2.1", "t3.2.1.d"], n: 4 }] },
      { title: "Gharar, Maisir and ethics", start: 20, end: 35, items: [{ type: "concept", ref: "gharar" }, { type: "topic", ref: "t3.2.2", level: "academic" }, { type: "concept", ref: "maisir" }, { type: "topic", ref: "t3.3.1", level: "simple" }, { type: "quiz", topics: ["t3.2.2", "t3.2.3", "t3.3.1"], n: 3 }] },
      { title: "Contracts, promises and options", start: 35, end: 55, items: [{ type: "concept", ref: "aqd" }, { type: "topic", ref: "t5.4.2", level: "academic" }, { type: "topic", ref: "t5.6", level: "academic" }, { type: "compare", ref: "contracts-validity" }, { type: "concept", ref: "khiyar" }, { type: "quiz", topics: ["t5.4.2", "t5.5.5", "t5.6", "t5.7.2", "t6.12"], n: 4 }, { type: "flashcards", topics: ["t5.6", "t5.7"], n: 4 }] },
      { title: "Murabaha in depth", start: 55, end: 80, items: [{ type: "concept", ref: "murabaha" }, { type: "topic", ref: "t9.6", level: "academic" }, { type: "diagram", ref: "mpo" }, { type: "topic", ref: "t9.9", level: "academic" }, { type: "compare", ref: "murabaha-loan" }, { type: "quiz", topics: ["t9.6", "t9.8", "t9.8.3", "t9.9.1", "t9.9.6"], n: 5 }, { type: "flashcards", topics: ["t9.8", "t9.9"], n: 4 }] },
      { title: "Salam and Istisna‘a in depth", start: 80, end: 100, items: [{ type: "concept", ref: "salam" }, { type: "diagram", ref: "salam" }, { type: "diagram", ref: "parallel-salam" }, { type: "concept", ref: "istisna" }, { type: "diagram", ref: "parallel-istisna" }, { type: "compare", ref: "salam-istisna" }, { type: "quiz", topics: ["t10.2", "t10.4.1", "t10.6", "t10.11.3", "t10.11.7"], n: 4 }] },
      { title: "Ijarah and IMBT in depth", start: 100, end: 120, items: [{ type: "concept", ref: "ijarah" }, { type: "topic", ref: "t11.3.2", level: "academic" }, { type: "diagram", ref: "ijarah" }, { type: "diagram", ref: "imbt" }, { type: "compare", ref: "ijarah-lease" }, { type: "quiz", topics: ["t11.2", "t11.3", "t11.3.6", "t11.5", "t11.5.1"], n: 4 }, { type: "flashcards", topics: ["t11.3", "t11.5"], n: 4 }] },
      { title: "Partnerships in depth", start: 120, end: 145, items: [{ type: "concept", ref: "shirkah" }, { type: "topic", ref: "t12.3.4", level: "academic" }, { type: "diagram", ref: "musharakah" }, { type: "diagram", ref: "mudarabah" }, { type: "compare", ref: "musharakah-mudarabah" }, { type: "diagram", ref: "dm" }, { type: "compare", ref: "dm-milk-aqd" }, { type: "quiz", topics: ["t12.3.4", "t12.3.5", "t12.4.1", "t12.5", "t12.8"], n: 5 }] },
      { title: "Accessory contracts and practice", start: 145, end: 158, items: [{ type: "concept", ref: "wakalah" }, { type: "concept", ref: "tawarruq" }, { type: "compare", ref: "tawarruq-inah" }, { type: "concept", ref: "jualah" }, { type: "topic", ref: "t14.3.4", level: "exam" }, { type: "quiz", topics: ["t13.2", "t13.3", "t13.4.1", "t14.3.4"], n: 3 }] },
      { title: "Sukuk and Takaful", start: 158, end: 172, items: [{ type: "concept", ref: "sukuk" }, { type: "diagram", ref: "sukuk" }, { type: "topic", ref: "t15.3.6", level: "academic" }, { type: "concept", ref: "takaful" }, { type: "diagram", ref: "takaful" }, { type: "quiz", topics: ["t15.3", "t15.3.6", "t15.3.7", "t16.4.1", "t16.5"], n: 4 }] },
      { title: "Criticism and review", start: 172, end: 180, items: [{ type: "concept", ref: "criticism" }, { type: "topic", ref: "t17.4.3", level: "exam" }, { type: "flashcards", topics: ["t17.3.7", "t17.4.3", "t18.3.3"], n: 4 }] }
    ]
  }
});
