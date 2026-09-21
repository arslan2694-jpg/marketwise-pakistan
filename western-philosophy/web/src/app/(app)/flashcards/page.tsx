import type { Metadata } from "next";
import { getAllChapters } from "@/lib/content";
import FlashcardsPageClient from "@/components/FlashcardsPageClient";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Flashcards" };

export default function FlashcardsPage() {
  const chapters = getAllChapters();
  const allCards = chapters.flatMap((ch) =>
    ch.flashcards.map((f, i) => ({
      ...f,
      key: `${ch.chapter_id}-${i}`,
      chapterTitle: `Ch. ${ch.roman}. ${ch.title}`,
    }))
  );

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="mb-1 text-center font-serif text-2xl font-semibold text-ink">Flashcards</h1>
      <p className="mb-6 text-center text-[14px] text-ink-2">
        Spaced repetition across the whole course. Cards you know move further out; cards you
        miss come back tomorrow.
      </p>
      {allCards.length === 0 ? (
        <EmptyState
          title="No flashcards yet"
          body="Flashcards are generated per chapter. Check back once chapters are ready."
          cta={{ label: "Browse the Library", href: "/library" }}
        />
      ) : (
        <FlashcardsPageClient allCards={allCards} />
      )}
    </div>
  );
}
