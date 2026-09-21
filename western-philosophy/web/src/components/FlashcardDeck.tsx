"use client";

import { useMemo, useState } from "react";
import type { Flashcard } from "@/lib/types";
import { reviewFlashcard } from "@/lib/progress";

export interface KeyedFlashcard extends Flashcard {
  key: string;
  chapterTitle?: string;
}

export default function FlashcardDeck({ cards }: { cards: KeyedFlashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const remaining = useMemo(() => cards.filter((c) => !done[c.key]), [cards, done]);
  const card = remaining[index % Math.max(remaining.length, 1)];

  if (cards.length === 0) {
    return <p className="text-[13.5px] text-ink-3">No flashcards available yet.</p>;
  }

  if (remaining.length === 0) {
    return (
      <div className="rounded-md border border-line bg-surface-2 px-4 py-6 text-center text-[14px] text-ink-2">
        All caught up — no cards due right now. Nice work.
      </div>
    );
  }

  function respond(remembered: boolean) {
    reviewFlashcard(card.key, remembered);
    setDone((d) => ({ ...d, [card.key]: true }));
    setFlipped(false);
    setIndex(0);
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-2 flex items-center justify-between text-[12px] text-ink-3">
        <span>
          {remaining.length} card{remaining.length === 1 ? "" : "s"} remaining
        </span>
        <span className="rounded bg-surface-2 px-1.5 py-0.5">{card.category}</span>
      </div>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[180px] w-full items-center justify-center rounded-lg border border-line bg-surface p-6 text-center shadow-[var(--shadow)]"
      >
        <p className="font-serif text-[16px] leading-relaxed text-ink">
          {flipped ? card.back : card.front}
        </p>
      </button>
      {card.chapterTitle && (
        <p className="mt-1.5 text-center text-[11.5px] text-ink-3">{card.chapterTitle}</p>
      )}
      <p className="mt-2 text-center text-[12px] text-ink-3">
        {flipped ? "" : "Click the card to reveal the answer"}
      </p>
      {flipped && (
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => respond(false)}
            className="rounded-md border border-bad px-4 py-2 text-[13px] font-medium text-bad hover:bg-bad/10"
          >
            Didn&apos;t know it
          </button>
          <button
            onClick={() => respond(true)}
            className="rounded-md border border-ok px-4 py-2 text-[13px] font-medium text-ok hover:bg-ok/10"
          >
            Knew it
          </button>
        </div>
      )}
    </div>
  );
}
