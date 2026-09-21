"use client";

import { useState } from "react";

interface EssayItem {
  chapterId: string;
  chapterTitle: string;
  taskType: string;
  prompt: string;
  rubric: string[];
}

const DRAFT_KEY = "wp-essay-drafts-v1";

function loadDrafts(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveDraft(id: string, text: string) {
  const drafts = loadDrafts();
  drafts[id] = text;
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
  } catch {
    // ignore
  }
}

export default function EssayPracticeClient({ items }: { items: EssayItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  // Lazy initializer: safe because the textarea that reads `drafts` only
  // renders once an item is opened (a client-only interaction), so there's
  // no SSR/client markup to mismatch.
  const [drafts, setDrafts] = useState<Record<string, string>>(() => loadDrafts());
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const id = `${item.chapterId}-${i}`;
        const open = openId === id;
        return (
          <div key={id} className="rounded-md border border-line bg-surface p-4">
            <button className="w-full text-left" onClick={() => setOpenId(open ? null : id)}>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10.5px] font-medium text-accent">
                  {item.taskType}
                </span>
                <span className="text-[11.5px] text-ink-3">{item.chapterTitle}</span>
              </div>
              <p className="mt-1.5 text-[14px] text-ink">{item.prompt}</p>
            </button>
            {open && (
              <div className="mt-3 border-t border-line pt-3">
                <textarea
                  value={drafts[id] ?? ""}
                  onChange={(e) => {
                    setDrafts((d) => ({ ...d, [id]: e.target.value }));
                    saveDraft(id, e.target.value);
                  }}
                  rows={8}
                  placeholder="Draft your response here — it's saved automatically in this browser…"
                  className="w-full rounded-md border border-line bg-page p-3 text-[14px] leading-relaxed focus:outline-none focus:ring-1 focus:ring-brand"
                />
                <div className="mt-3">
                  <h4 className="mb-1.5 text-[12px] font-semibold text-ink-2">
                    Self-assessment rubric
                  </h4>
                  <ul className="space-y-1">
                    {item.rubric.map((r, ri) => {
                      const key = `${id}-${ri}`;
                      return (
                        <li key={key} className="flex items-center gap-2 text-[13px] text-ink-2">
                          <input
                            type="checkbox"
                            checked={!!checked[key]}
                            onChange={(e) => setChecked((c) => ({ ...c, [key]: e.target.checked }))}
                          />
                          {r}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
