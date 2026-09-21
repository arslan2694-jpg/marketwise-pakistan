"use client";

import { useEffect, useState } from "react";
import { dueFlashcardKeys } from "@/lib/progress";
import FlashcardDeck, { type KeyedFlashcard } from "./FlashcardDeck";

export default function FlashcardsPageClient({ allCards }: { allCards: KeyedFlashcard[] }) {
  const [due, setDue] = useState<KeyedFlashcard[] | null>(null);
  const [mode, setMode] = useState<"due" | "all">("due");

  useEffect(() => {
    const dueKeys = new Set(dueFlashcardKeys(allCards.map((c) => c.key)));
    setDue(allCards.filter((c) => dueKeys.has(c.key)));
  }, [allCards]);

  if (due === null) return <div className="h-40 animate-pulse rounded-lg bg-surface-2" />;

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
