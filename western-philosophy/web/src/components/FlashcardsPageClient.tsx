"use client";

import { useMemo, useState } from "react";
import { useProgress } from "@/lib/progress";
import FlashcardDeck, { type KeyedFlashcard } from "./FlashcardDeck";

export default function FlashcardsPageClient({ allCards }: { allCards: KeyedFlashcard[] }) {
  const progress = useProgress();
  const [mode, setMode] = useState<"due" | "all">("due");

  const due = useMemo(() => {
    // Spaced-repetition "due" filtering is inherently time-dependent; a
    // snapshot of the current time when progress/cards last changed is
    // the correct due-date cutoff here, not a stale or precomputed one.
    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();
    return allCards.filter((c) => {
      const st = progress.flashcards[c.key];
      return !st || st.dueAt <= now;
    });
  }, [allCards, progress.flashcards]);

  const cards = mode === "due" ? due : allCards;

  return (
    <div>
      <div className="mb-6 flex items-center justify-center gap-2">
        <button
          onClick={() => setMode("due")}
          className={`rounded-md px-3 py-1.5 text-[12.5px] font-medium ${mode === "due" ? "bg-brand text-white" : "border border-line text-ink-2 hover:bg-surface-2"}`}
        >
          Due today ({due.length})
        </button>
        <button
          onClick={() => setMode("all")}
          className={`rounded-md px-3 py-1.5 text-[12.5px] font-medium ${mode === "all" ? "bg-brand text-white" : "border border-line text-ink-2 hover:bg-surface-2"}`}
        >
          All cards ({allCards.length})
        </button>
      </div>
      <FlashcardDeck cards={cards} />
    </div>
  );
}
