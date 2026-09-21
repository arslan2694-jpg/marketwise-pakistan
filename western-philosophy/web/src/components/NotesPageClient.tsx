"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadProgress, deleteNote, type ProgressState } from "@/lib/progress";

export default function NotesPageClient({ chapterTitles }: { chapterTitles: Record<string, string> }) {
  const [progress, setProgress] = useState<ProgressState | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!progress) return <div className="h-40 animate-pulse rounded-lg bg-surface-2" />;

  const bookmarkedChapters = Object.entries(progress.bookmarks).filter(([, v]) => v).map(([k]) => k);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 font-serif text-lg font-semibold text-ink">Bookmarked chapters</h2>
        {bookmarkedChapters.length === 0 ? (
          <p className="text-[13.5px] text-ink-3">No bookmarks yet.</p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {bookmarkedChapters.map((id) => (
              <li key={id}>
                <Link href={`/library/${id}`} className="block rounded-md border border-line bg-surface p-3 text-[13.5px] hover:bg-surface-2">
                  ★ {chapterTitles[id] ?? id}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-serif text-lg font-semibold text-ink">All notes</h2>
        {progress.notes.length === 0 ? (
          <p className="text-[13.5px] text-ink-3">No notes yet. Add some from any chapter page.</p>
        ) : (
          <ul className="space-y-2">
            {[...progress.notes].reverse().map((n) => (
              <li key={n.id} className="rounded-md border border-line bg-surface p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[14px] text-ink">{n.text}</p>
                  <button
                    onClick={() => setProgress(deleteNote(n.id))}
                    className="shrink-0 text-[12px] text-ink-3 hover:text-bad"
                  >
                    remove
                  </button>
                </div>
                <Link href={`/library/${n.chapterId}`} className="mt-1.5 inline-block text-[11.5px] text-ink-3 hover:text-brand">
                  {chapterTitles[n.chapterId] ?? n.chapterId} · {new Date(n.createdAt).toLocaleDateString()}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
