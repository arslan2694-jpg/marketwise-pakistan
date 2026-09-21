import type { Metadata } from "next";
import { getAllChapters } from "@/lib/content";
import EssayPracticeClient from "@/components/EssayPracticeClient";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Essay Practice" };

export default function EssaysPage() {
  const items = getAllChapters().flatMap((c) =>
    c.essay_prompts.map((e) => ({
      chapterId: c.chapter_id,
      chapterTitle: `Ch. ${c.roman}. ${c.title}`,
      taskType: e.task_type,
      prompt: e.prompt,
      rubric: e.rubric,
    }))
  );

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Essay Practice</h1>
      <p className="mt-1 mb-6 text-[14px] text-ink-2">
        Prompts drawn from the actual chapter content. Drafts save automatically in this
        browser; rubrics are for self-assessment, not automated grading.
      </p>
      {items.length === 0 ? (
        <EmptyState
          title="No essay prompts yet"
          body="Essay prompts are generated per chapter. Check back once chapters are ready."
          cta={{ label: "Browse the Library", href: "/library" }}
        />
      ) : (
        <EssayPracticeClient items={items} />
      )}
    </div>
  );
}
