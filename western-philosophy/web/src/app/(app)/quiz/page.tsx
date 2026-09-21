import type { Metadata } from "next";
import { getAllChapters } from "@/lib/content";
import QuizPageClient from "@/components/QuizPageClient";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Quiz" };

export default function QuizPage() {
  const chapters = getAllChapters().map((c) => ({
    chapterId: c.chapter_id,
    title: `Ch. ${c.roman}. ${c.title}`,
    quiz: c.quiz,
  }));

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Exam Mode</h1>
      <p className="mt-1 mb-6 text-[14px] text-ink-2">
        Practice by chapter, or take a mixed quiz drawn from every chapter generated so far.
      </p>
      {chapters.length === 0 ? (
        <EmptyState
          title="No quizzes yet"
          body="Quiz questions are generated per chapter. Check back once chapters are ready."
          cta={{ label: "Browse the Library", href: "/library" }}
        />
      ) : (
        <QuizPageClient chapters={chapters} />
      )}
    </div>
  );
}
