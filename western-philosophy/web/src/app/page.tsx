import Link from "next/link";
import { getContentStatus, getStructure } from "@/lib/content";

export default function LandingPage() {
  const structure = getStructure();
  const { totalChapters, generatedChapters } = getContentStatus();

  const ctas = [
    { label: "Start Learning", href: "/library", primary: true },
    { label: "Continue Learning", href: "/dashboard", primary: false },
    { label: "Explore Philosophers", href: "/philosophers", primary: false },
    { label: "Explore Timeline", href: "/timeline", primary: false },
    { label: "Test Yourself", href: "/quiz", primary: false },
    { label: "Browse the Knowledge Graph", href: "/graph", primary: false },
  ];

  return (
    <div className="min-h-screen bg-page">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-surface font-serif text-sm font-semibold">
              Φ
            </div>
            <span className="text-sm font-semibold">Western Philosophy Study Companion</span>
          </div>
          <Link
            href="/dashboard"
            className="rounded-md border border-line px-3 py-1.5 text-[13px] text-ink-2 hover:bg-surface-2"
          >
            Open the app →
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 pt-16 pb-10 text-center">
        <p className="mb-3 text-[13px] font-medium uppercase tracking-widest text-brand">
          Based on Bertrand Russell&apos;s 1945 masterwork
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Master the History of Western Philosophy
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ink-2">
          Study all {totalChapters || 76} chapters of Russell&apos;s <em>A History of Western
          Philosophy</em> in depth — every philosopher, argument, school and historical
          current — through structured lessons, an interactive timeline, a philosophy
          knowledge graph, spaced-repetition flashcards, and exam-style practice. Built
          as an original teaching companion to the book, with every claim traceable back
          to its page.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {ctas.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={
                c.primary
                  ? "rounded-md bg-brand px-5 py-2.5 text-[14px] font-medium text-white hover:bg-brand-strong"
                  : "rounded-md border border-line bg-surface px-4 py-2.5 text-[14px] text-ink-2 hover:bg-surface-2 hover:text-ink"
              }
            >
              {c.label}
            </Link>
          ))}
        </div>

        {generatedChapters < totalChapters && totalChapters > 0 && (
          <p className="mt-6 text-[12.5px] text-ink-3">
            Content build in progress: {generatedChapters} / {totalChapters} chapters have
            full structured lessons so far.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-1 text-center font-serif text-xl font-semibold text-ink">
          The course follows Russell&apos;s own structure
        </h2>
        <p className="mb-8 text-center text-[13.5px] text-ink-3">
          Three books, {structure.books.reduce((s, b) => s + b.parts.length, 0) || 7} parts,{" "}
          {totalChapters || 76} chapters — nothing collapsed, nothing skipped.
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          {(structure.books.length
            ? structure.books
            : PLACEHOLDER_BOOKS
          ).map((book) => (
            <div
              key={book.id}
              className="rounded-lg border border-line bg-surface p-5 shadow-[var(--shadow)]"
            >
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-brand">
                Book {book.order}
              </div>
              <h3 className="mb-3 font-serif text-lg font-semibold text-ink">{book.title}</h3>
              <ul className="space-y-1.5">
                {book.parts.map((part) => (
                  <li key={part.id} className="flex items-baseline justify-between text-[13px]">
                    <span className="text-ink-2">{part.title}</span>
                    <span className="ml-2 shrink-0 text-ink-3">
                      {part.chapters.length} ch.
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-line py-6 text-center text-[12px] text-ink-3">
        An original study companion built for Russell&apos;s <em>A History of Western
        Philosophy</em> (1945). Educational summaries and commentary only — not a
        substitute for the book.
      </footer>
    </div>
  );
}

// Fallback shape used only if structure.json hasn't been generated yet.
const PLACEHOLDER_BOOKS = [
  { id: "book-1", order: 1, title: "Ancient Philosophy", start_page: 19, parts: [
    { id: "p1", order: 1, title: "The Pre-Socratics", start_page: 20, chapters: new Array(10).fill(0) },
    { id: "p2", order: 2, title: "Socrates, Plato, and Aristotle", start_page: 98, chapters: new Array(14).fill(0) },
    { id: "p3", order: 3, title: "Ancient Philosophy after Aristotle", start_page: 233, chapters: new Array(6).fill(0) },
  ]},
  { id: "book-2", order: 2, title: "Catholic Philosophy", start_page: 311, parts: [
    { id: "p4", order: 1, title: "The Fathers", start_page: 317, chapters: new Array(6).fill(0) },
    { id: "p5", order: 2, title: "The Schoolmen", start_page: 393, chapters: new Array(9).fill(0) },
  ]},
  { id: "book-3", order: 3, title: "Modern Philosophy", start_page: 489, parts: [
    { id: "p6", order: 1, title: "From the Renaissance to Hume", start_page: 490, chapters: new Array(17).fill(0) },
    { id: "p7", order: 2, title: "From Rousseau to the Present Day", start_page: 669, chapters: new Array(14).fill(0) },
  ]},
] as unknown as ReturnType<typeof getStructure>["books"];
