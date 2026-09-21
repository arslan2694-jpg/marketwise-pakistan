"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadProgress, type ProgressState } from "@/lib/progress";
import type { FlatChapterRef } from "@/lib/content";

export default function DashboardClient({ chapters }: { chapters: FlatChapterRef[] }) {
  const [progress, setProgress] = useState<ProgressState | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!progress) {
    return <div className="h-40 animate-pulse rounded-lg bg-surface-2" />;
  }

  const completedCount = Object.values(progress.completedChapters).filter(Boolean).length;
  const totalChapters = chapters.length;
  const pct = totalChapters ? Math.round((completedCount / totalChapters) * 100) : 0;

  const lastChapter = progress.lastVisitedChapter
    ? chapters.find((c) => c.id === progress.lastVisitedChapter)
    : null;

  const nextChapter =
    chapters.find((c) => !progress.completedChapters[c.id]) ?? chapters[0];

  const recentAttempts = [...progress.quizAttempts].reverse().slice(0, 5);

  const weakConcepts = Object.entries(
    progress.quizAttempts
      .flatMap((a) => a.missedConcepts)
      .reduce<Record<string, number>>((acc, c) => {
        acc[c] = (acc[c] ?? 0) + 1;
        return acc;
      }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const streak = progress.streakDays.length;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Course completion" value={`${pct}%`} sub={`${completedCount}/${totalChapters} chapters`} />
        <StatCard label="Study streak" value={`${streak}`} sub="days active" />
        <StatCard label="Quizzes taken" value={`${progress.quizAttempts.length}`} sub="attempts logged" />
        <StatCard label="Notes" value={`${progress.notes.length}`} sub="saved" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-surface p-5">
          <h2 className="mb-3 font-serif text-lg font-semibold text-ink">Recommended next lesson</h2>
          {nextChapter ? (
            <Link
              href={`/library/${nextChapter.id}`}
              className="block rounded-md border border-brand/40 bg-brand-soft/50 p-4 hover:bg-brand-soft"
            >
              <div className="text-[11px] font-semibold uppercase tracking-wide text-brand">
                {nextChapter.book_title} · {nextChapter.part_title}
              </div>
              <div className="mt-1 font-serif text-[16px] font-semibold text-ink">
                Ch. {nextChapter.roman} — {nextChapter.title}
              </div>
            </Link>
          ) : (
            <p className="text-[13.5px] text-ink-3">You&apos;ve completed every chapter. Consider a review pass.</p>
          )}
          {lastChapter && (
            <p className="mt-3 text-[12.5px] text-ink-3">
              Last visited:{" "}
              <Link href={`/library/${lastChapter.id}`} className="text-ink-2 hover:text-brand">
                Ch. {lastChapter.roman}. {lastChapter.title}
              </Link>
            </p>
          )}
        </div>

        <div className="rounded-lg border border-line bg-surface p-5">
          <h2 className="mb-3 font-serif text-lg font-semibold text-ink">Weak areas</h2>
          {weakConcepts.length === 0 ? (
            <p className="text-[13.5px] text-ink-3">
              Take a few quizzes and this will fill in with concepts to review.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {weakConcepts.map(([concept, count]) => (
                <li key={concept} className="flex items-center justify-between text-[13.5px]">
                  <span className="text-ink-2">{concept}</span>
                  <span className="rounded-full bg-bad/10 px-2 py-0.5 text-[11px] text-bad">
                    missed ×{count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-line bg-surface p-5">
        <h2 className="mb-3 font-serif text-lg font-semibold text-ink">Recent activity</h2>
        {recentAttempts.length === 0 ? (
          <p className="text-[13.5px] text-ink-3">No quiz attempts yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {recentAttempts.map((a, i) => (
              <li key={i} className="flex items-center justify-between py-2 text-[13.5px]">
                <span className="text-ink-2">{a.chapterId}</span>
                <span className="text-ink-3">
                  {a.correct}/{a.total} · {new Date(a.timestamp).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">{label}</div>
      <div className="mt-1 font-serif text-2xl font-semibold text-ink">{value}</div>
      <div className="text-[12px] text-ink-3">{sub}</div>
    </div>
  );
}
