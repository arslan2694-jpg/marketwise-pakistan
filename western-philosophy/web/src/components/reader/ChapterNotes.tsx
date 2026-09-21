"use client";

import { useEffect, useState } from "react";
import { addNote, deleteNote, loadProgress, type Note } from "@/lib/progress";

export default function ChapterNotes({ chapterId }: { chapterId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setNotes(loadProgress().notes.filter((n) => n.chapterId === chapterId));
  }, [chapterId]);

  function submit() {
    if (!text.trim()) return;
    const s = addNote(chapterId, text.trim());
    setNotes(s.notes.filter((n) => n.chapterId === chapterId));
    setText("");
  }

  return (
    <div>
      <div className="mb-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Add a note on this chapter…"
          className="flex-1 rounded-md border border-line bg-page px-3 py-2 text-[13.5px] focus:outline-none focus:ring-1 focus:ring-brand"
        />
        <button
          onClick={submit}
          className="rounded-md bg-brand px-3.5 py-2 text-[13px] font-medium text-white hover:bg-brand-strong"
        >
          Add
        </button>
      </div>
      {notes.length === 0 ? (
        <p className="text-[13px] text-ink-3">No notes yet for this chapter.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((n) => (
            <li
              key={n.id}
              className="flex items-start justify-between gap-3 rounded-md border border-line bg-surface px-3 py-2 text-[13.5px]"
            >
              <span className="text-ink">{n.text}</span>
              <button
                onClick={() => {
                  const s = deleteNote(n.id);
                  setNotes(s.notes.filter((x) => x.chapterId === chapterId));
                }}
                className="shrink-0 text-[12px] text-ink-3 hover:text-bad"
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
