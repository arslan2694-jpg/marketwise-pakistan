"use client";

import { useEffect } from "react";
import { markChapterComplete, recordVisit, toggleBookmark, useProgress } from "@/lib/progress";

export default function ChapterActions({ chapterId }: { chapterId: string }) {
  const progress = useProgress();
  const complete = !!progress.completedChapters[chapterId];
  const bookmarked = !!progress.bookmarks[chapterId];

  useEffect(() => {
    recordVisit(chapterId);
  }, [chapterId]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => toggleBookmark(chapterId)}
        className={`rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
          bookmarked
            ? "border-brand bg-brand-soft text-brand-strong"
            : "border-line text-ink-2 hover:bg-surface-2"
        }`}
      >
        {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
      </button>
      <button
        onClick={() => markChapterComplete(chapterId, !complete)}
        className={`rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
          complete
            ? "bg-ok/15 text-ok"
            : "bg-brand text-white hover:bg-brand-strong"
        }`}
      >
        {complete ? "✓ Completed" : "Mark chapter complete"}
      </button>
    </div>
  );
}
