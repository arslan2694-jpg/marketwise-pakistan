"use client";

import { useEffect, useState } from "react";
import { loadProgress, markChapterComplete, recordVisit, toggleBookmark } from "@/lib/progress";

export default function ChapterActions({ chapterId }: { chapterId: string }) {
  const [complete, setComplete] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    recordVisit(chapterId);
    const s = loadProgress();
    setComplete(!!s.completedChapters[chapterId]);
    setBookmarked(!!s.bookmarks[chapterId]);
  }, [chapterId]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          const s = toggleBookmark(chapterId);
          setBookmarked(!!s.bookmarks[chapterId]);
        }}
        className={`rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
          bookmarked
            ? "border-brand bg-brand-soft text-brand-strong"
            : "border-line text-ink-2 hover:bg-surface-2"
        }`}
      >
        {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
      </button>
      <button
        onClick={() => {
          const s = markChapterComplete(chapterId, !complete);
          setComplete(!!s.completedChapters[chapterId]);
        }}
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
