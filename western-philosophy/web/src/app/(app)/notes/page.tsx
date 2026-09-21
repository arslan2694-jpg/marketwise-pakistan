import type { Metadata } from "next";
import { getFlatChapterRefs } from "@/lib/content";
import NotesPageClient from "@/components/NotesPageClient";

export const metadata: Metadata = { title: "Notes & Bookmarks" };

export default function NotesPage() {
  const chapterTitles = Object.fromEntries(
    getFlatChapterRefs().map((c) => [c.id, `Ch. ${c.roman}. ${c.title}`])
  );
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Notes & Bookmarks</h1>
      <p className="mt-1 mb-6 text-[14px] text-ink-2">
        Everything you&apos;ve saved while reading, stored locally in this browser.
      </p>
      <NotesPageClient chapterTitles={chapterTitles} />
    </div>
  );
}
