"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GlossaryEntry } from "@/lib/types";

export default function GlossaryClient({ entries }: { entries: GlossaryEntry[] }) {
  const [query, setQuery] = useState("");
  const [academic, setAcademic] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.beginner_explanation.toLowerCase().includes(q) ||
        e.academic_explanation.toLowerCase().includes(q)
    );
  }, [entries, query]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms…"
          className="flex-1 rounded-md border border-line bg-surface px-3 py-2 text-[13.5px] focus:outline-none focus:ring-1 focus:ring-brand"
        />
        <label className="flex items-center gap-2 text-[12.5px] text-ink-2">
          <input type="checkbox" checked={academic} onChange={(e) => setAcademic(e.target.checked)} />
          Academic explanations
        </label>
      </div>
      <dl className="divide-y divide-line rounded-md border border-line bg-surface">
        {filtered.map((e) => (
          <div key={e.slug} className="px-4 py-3">
            <dt className="font-serif text-[15px] font-semibold text-ink">{e.term}</dt>
            <dd className="mt-1 text-[13.5px] text-ink-2">
              {academic ? e.academic_explanation : e.beginner_explanation}
            </dd>
            {e.appears_in_chapters.length > 0 && (
              <dd className="mt-1.5 flex flex-wrap gap-1.5">
                {e.appears_in_chapters.slice(0, 5).map((c) => (
                  <Link key={c} href={`/library/${c}`} className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-ink-3 hover:bg-brand-soft">
                    {c}
                  </Link>
                ))}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}
