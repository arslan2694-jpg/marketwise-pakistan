"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { TimelineEvent } from "@/lib/types";

const CATEGORIES: TimelineEvent["category"][number][] = [
  "philosophy",
  "politics",
  "religion",
  "science",
  "culture",
];

const CATEGORY_COLOR: Record<string, string> = {
  philosophy: "bg-brand text-white",
  politics: "bg-accent text-white",
  religion: "bg-warn text-white",
  science: "bg-ok text-white",
  culture: "bg-ink-3 text-white",
};

export default function TimelineClient({ events }: { events: TimelineEvent[] }) {
  const [active, setActive] = useState<Set<string>>(new Set(CATEGORIES));
  const [selected, setSelected] = useState<TimelineEvent | null>(null);

  const filtered = useMemo(
    () => events.filter((e) => e.category.some((c) => active.has(c))),
    [events, active]
  );

  function toggle(cat: string) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => toggle(cat)}
            className={`rounded-full border px-3 py-1 text-[12px] font-medium capitalize transition-colors ${
              active.has(cat)
                ? "border-transparent " + CATEGORY_COLOR[cat]
                : "border-line text-ink-3 hover:bg-surface-2"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-[13.5px] text-ink-3">No events match the selected filters.</p>
      ) : (
        <div className="relative border-l-2 border-line pl-6">
          {filtered.map((e) => (
            <div key={e.id} className="relative mb-6">
              <div className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-page bg-brand" />
              <button
                onClick={() => setSelected(selected?.id === e.id ? null : e)}
                className="text-left"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[12.5px] text-ink-3">{e.date}</span>
                  {e.category.map((c) => (
                    <span key={c} className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium capitalize ${CATEGORY_COLOR[c]}`}>
                      {c}
                    </span>
                  ))}
                </div>
                <div className="font-serif text-[15px] font-semibold text-ink hover:text-brand">
                  {e.name}
                </div>
              </button>
              {selected?.id === e.id && (
                <div className="mt-2 rounded-md border border-line bg-surface p-3.5">
                  <p className="text-[13.5px] text-ink-2">{e.description}</p>
                  {e.related_chapters.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {e.related_chapters.map((c) => (
                        <Link key={c} href={`/library/${c}`} className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-ink-2 hover:bg-brand-soft">
                          {c}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
