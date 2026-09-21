import Link from "next/link";
import type { Metadata } from "next";
import { getAllChapters, getStructure } from "@/lib/content";

export const metadata: Metadata = { title: "Library" };

export default function LibraryPage() {
  const structure = getStructure();
  const chapterIds = new Set(getAllChapters().map((c) => c.chapter_id));

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Library</h1>
      <p className="mt-1 text-[14px] text-ink-2">
        The full course, in Russell&apos;s own structure — {structure.books.length} books,
        every part, every chapter.
      </p>

      <div className="mt-8 space-y-10">
        {structure.books.map((book) => (
          <section key={book.id}>
            <div className="mb-3 flex items-baseline gap-2 border-b border-line pb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-brand">
                Book {book.order}
              </span>
              <h2 className="font-serif text-lg font-semibold text-ink">{book.title}</h2>
            </div>

            <div className="space-y-6">
              {book.parts.map((part) => (
                <div key={part.id}>
                  <h3 className="mb-2 text-[13px] font-semibold text-ink-2">
                    Part {part.order} · {part.title}
                  </h3>
                  <ul className="divide-y divide-line rounded-md border border-line bg-surface">
                    {part.chapters.map((ch) => {
                      const ready = chapterIds.has(ch.id);
                      return (
                        <li key={ch.id}>
                          <Link
                            href={`/library/${ch.id}`}
                            className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-[13.5px] hover:bg-surface-2"
                          >
                            <span className="flex min-w-0 items-baseline gap-2">
                              <span className="w-9 shrink-0 font-mono text-[11px] text-ink-3">
                                {ch.roman}
                              </span>
                              <span className="truncate text-ink">{ch.title}</span>
                            </span>
                            <span className="flex shrink-0 items-center gap-2">
                              <span className="text-[11px] text-ink-3">
                                pp. {ch.start_page}&ndash;{ch.end_page}
                              </span>
                              {ready ? (
                                <span className="rounded-full bg-ok/15 px-2 py-0.5 text-[10.5px] font-medium text-ok">
                                  ready
                                </span>
                              ) : (
                                <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10.5px] text-ink-3">
                                  coming soon
                                </span>
                              )}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
