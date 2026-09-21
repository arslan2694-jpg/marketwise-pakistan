"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion, Difficulty } from "@/lib/types";
import QuizRunner from "./QuizRunner";

interface ChapterQuizSet {
  chapterId: string;
  title: string;
  quiz: QuizQuestion[];
}

const DIFFICULTIES: (Difficulty | "all")[] = ["all", "beginner", "intermediate", "advanced", "university", "expert"];

export default function QuizPageClient({ chapters }: { chapters: ChapterQuizSet[] }) {
  const [chapterId, setChapterId] = useState<string>("mixed");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [key, setKey] = useState(0);

  const pool = useMemo(() => {
    const source =
      chapterId === "mixed"
        ? chapters.flatMap((c) => c.quiz)
        : chapters.find((c) => c.chapterId === chapterId)?.quiz ?? [];
    const filtered = difficulty === "all" ? source : source.filter((q) => q.difficulty === difficulty);
    return chapterId === "mixed" ? shuffle(filtered).slice(0, 15) : filtered;
  }, [chapters, chapterId, difficulty]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        <select
          value={chapterId}
          onChange={(e) => {
            setChapterId(e.target.value);
            setKey((k) => k + 1);
          }}
          className="rounded-md border border-line bg-surface px-3 py-2 text-[13px]"
        >
          <option value="mixed">Mixed (random 15, all chapters)</option>
          {chapters.map((c) => (
            <option key={c.chapterId} value={c.chapterId}>
              {c.title}
            </option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value as Difficulty | "all");
            setKey((k) => k + 1);
          }}
          className="rounded-md border border-line bg-surface px-3 py-2 text-[13px] capitalize"
        >
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d === "all" ? "All difficulties" : d}
            </option>
          ))}
        </select>
      </div>
      <QuizRunner key={key} chapterId={chapterId} questions={pool} />
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
