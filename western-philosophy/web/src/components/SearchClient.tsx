"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { SearchDoc } from "@/lib/content";

const TYPE_LABEL: Record<string, string> = {
  chapter: "Chapter",
  philosopher: "Philosopher",
  concept: "Concept",
  school: "School",
  glossary: "Glossary",
  event: "Timeline",
};

export default function SearchClient({ docs }: { docs: SearchDoc[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [params]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return docs
      .filter((d) => d.title.toLowerCase().includes(q) || d.snippet.toLowerCase().includes(q))
      .slice(0, 60);
  }, [docs, query]);

  return (
    <div>
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search chapters, philosophers, concepts, schools, glossary, timeline…"
        className="w-full rounded-md border border-line bg-surface px-4 py-3 text-[15px] focus:outline-none focus:ring-1 focus:ring-brand"
      />
      <p className="mt-2 text-[12.5px] text-ink-3">
        {query ? `${results.length} results` : "Start typing to search the whole course."}
      </p>
      <ul className="mt-4 space-y-2">
        {results.map((r) => (
          <li key={`${r.type}-${r.id}`}>
            <Link href={r.href} className="block rounded-md border border-line bg-surface p-3.5 hover:bg-surface-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10.5px] font-medium text-ink-3">
                  {TYPE_LABEL[r.type]}
                </span>
                <span className="font-serif text-[14.5px] font-semibold text-ink">{r.title}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-[12.5px] text-ink-2">{r.snippet}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
