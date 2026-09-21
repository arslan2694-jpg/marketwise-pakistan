import Link from "next/link";
import type { Metadata } from "next";
import { getAllConcepts } from "@/lib/content";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Concepts" };

export default function ConceptsPage() {
  const concepts = getAllConcepts();
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Concepts</h1>
      <p className="mt-1 mb-6 text-[14px] text-ink-2">
        Every major philosophical concept discussed in the book, with plain-language and precise definitions.
      </p>
      {concepts.length === 0 ? (
        <EmptyState
          title="The concept index is being built"
          body="Concepts are consolidated from chapter content. Check back soon."
          cta={{ label: "Browse the Library", href: "/library" }}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {concepts.map((c) => (
            <Link key={c.slug} href={`/concepts/${c.slug}`} className="rounded-md border border-line bg-surface p-4 hover:bg-surface-2">
              <div className="font-serif text-[15px] font-semibold text-ink">{c.name}</div>
              <div className="mt-1 line-clamp-2 text-[12.5px] text-ink-2">{c.plain_explanation}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
