"use client";

import { useEffect, useRef, useState } from "react";
import {
  exportProgress,
  importProgress,
  loadProgress,
  resetProgress,
  type ProgressState,
} from "@/lib/progress";
import type { FlatChapterRef } from "@/lib/content";

export default function ProgressPageClient({ chapters }: { chapters: FlatChapterRef[] }) {
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!progress) return <div className="h-40 animate-pulse rounded-lg bg-surface-2" />;

  const byPart = new Map<string, { total: number; done: number; title: string }>();
  for (const c of chapters) {
    const key = c.part_id;
    const entry = byPart.get(key) ?? { total: 0, done: 0, title: `${c.book_title} — ${c.part_title}` };
    entry.total += 1;
    if (progress.completedChapters[c.id]) entry.done += 1;
    byPart.set(key, entry);
  }

  const avgQuizScore = progress.quizAttempts.length
    ? Math.round(
        (progress.quizAttempts.reduce((s, a) => s + a.score, 0) / progress.quizAttempts.length) * 100
      )
    : null;

  function download() {
    const blob = new Blob([exportProgress()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "western-philosophy-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((text) => {
      try {
        importProgress(text);
        setProgress(loadProgress());
      } catch {
        alert("That file doesn't look like a valid progress export.");
      }
    });
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 font-serif text-lg font-semibold text-ink">Completion by part</h2>
        <div className="space-y-3">
          {[...byPart.values()].map((p) => (
            <div key={p.title}>
              <div className="mb-1 flex items-center justify-between text-[12.5px] text-ink-2">
                <span>{p.title}</span>
                <span>
                  {p.done}/{p.total}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-brand"
                  style={{ width: `${(p.done / p.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat label="Avg. quiz score" value={avgQuizScore !== null ? `${avgQuizScore}%` : "—"} />
        <Stat label="Flashcards tracked" value={`${Object.keys(progress.flashcards).length}`} />
        <Stat label="Active days" value={`${progress.streakDays.length}`} />
      </section>

      <section className="rounded-lg border border-line bg-surface p-5">
        <h2 className="mb-3 font-serif text-lg font-semibold text-ink">Your data</h2>
        <p className="mb-3 text-[13px] text-ink-2">
          All progress lives only in this browser&apos;s local storage. Export it to back it up
          or move it to another device.
        </p>
        <div className="flex flex-wrap gap-2">
          <button onClick={download} className="rounded-md border border-line px-3 py-1.5 text-[12.5px] text-ink-2 hover:bg-surface-2">
            Export progress
          </button>
          <button onClick={() => fileRef.current?.click()} className="rounded-md border border-line px-3 py-1.5 text-[12.5px] text-ink-2 hover:bg-surface-2">
            Import progress
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
          <button
            onClick={() => {
              if (confirm("Reset all local progress? This cannot be undone.")) {
                resetProgress();
                setProgress(loadProgress());
              }
            }}
            className="rounded-md border border-bad px-3 py-1.5 text-[12.5px] text-bad hover:bg-bad/10"
          >
            Reset progress
          </button>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">{label}</div>
      <div className="mt-1 font-serif text-2xl font-semibold text-ink">{value}</div>
    </div>
  );
}
