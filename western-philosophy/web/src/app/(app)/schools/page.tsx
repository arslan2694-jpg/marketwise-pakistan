import Link from "next/link";
import type { Metadata } from "next";
import { getAllSchools } from "@/lib/content";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Schools" };

export default function SchoolsPage() {
  const schools = getAllSchools();
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Schools of Thought</h1>
      <p className="mt-1 mb-6 text-[14px] text-ink-2">
        Traditions and movements that group philosophers by shared doctrine.
      </p>
      {schools.length === 0 ? (
        <EmptyState
          title="School profiles are being built"
          body="Schools are consolidated from chapter content. Check back soon."
          cta={{ label: "Browse the Library", href: "/library" }}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {schools.map((s) => (
            <Link key={s.slug} href={`/schools/${s.slug}`} className="rounded-md border border-line bg-surface p-4 hover:bg-surface-2">
              <div className="font-serif text-[15.5px] font-semibold text-ink">{s.name}</div>
              <div className="text-[12px] text-ink-3">{s.period}</div>
              <div className="mt-1.5 text-[12.5px] text-ink-2">{s.philosophers.length} philosophers</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
