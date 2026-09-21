import Link from "next/link";
import type { Metadata } from "next";
import { getAllPhilosophers } from "@/lib/content";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Philosophers" };

export default function PhilosophersPage() {
  const philosophers = getAllPhilosophers();
  const byEra = new Map<string, typeof philosophers>();
  for (const p of philosophers) {
    const list = byEra.get(p.era) ?? [];
    list.push(p);
    byEra.set(p.era, list);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Philosophers</h1>
      <p className="mt-1 mb-6 text-[14px] text-ink-2">
        A dedicated profile for every major philosopher discussed in the book.
      </p>

      {philosophers.length === 0 ? (
        <EmptyState
          title="Philosopher profiles are being built"
          body="Profiles are consolidated from chapter content after chapters are generated. Check back soon, or browse the Library in the meantime."
          cta={{ label: "Browse the Library", href: "/library" }}
        />
      ) : (
        [...byEra.entries()].map(([era, list]) => (
          <section key={era} className="mb-8">
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-ink-3">{era}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <Link
                  key={p.slug}
                  href={`/philosophers/${p.slug}`}
                  className="rounded-md border border-line bg-surface p-4 hover:bg-surface-2"
                >
                  <div className="font-serif text-[15.5px] font-semibold text-ink">{p.name}</div>
                  <div className="text-[12px] text-ink-3">{p.dates}</div>
                  <div className="mt-1.5 text-[12.5px] text-ink-2">{p.school}</div>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
