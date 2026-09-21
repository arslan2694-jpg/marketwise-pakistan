import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSchools, getSchool } from "@/lib/content";

export function generateStaticParams() {
  return getAllSchools().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSchool(slug);
  return { title: s?.name ?? "School" };
}

export default async function SchoolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSchool(slug);
  if (!s) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <p className="mb-3 text-[13px] text-ink-3">
        <Link href="/schools" className="hover:text-ink">Schools</Link>
      </p>
      <h1 className="font-serif text-3xl font-semibold text-ink">{s.name}</h1>
      <p className="mt-1 text-[14px] text-ink-2">{s.period}</p>

      {s.doctrines.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-2 text-[12.5px] font-semibold text-ink-2">Doctrines</h3>
          <ul className="list-disc space-y-1 pl-5 text-[14px] text-ink-2">
            {s.doctrines.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      )}

      {s.philosophers.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-2 text-[12.5px] font-semibold text-ink-2">Philosophers</h3>
          <div className="flex flex-wrap gap-1.5">
            {s.philosophers.map((p) => (
              <Link key={p} href={`/philosophers/${p}`} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[12px] text-ink-2 hover:bg-brand-soft">
                {p.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      )}

      {s.appears_in_chapters.length > 0 && (
        <div className="mt-6 border-t border-line pt-5">
          <h3 className="mb-2 text-[12.5px] font-semibold text-ink-2">Chapters</h3>
          <ul className="space-y-1">
            {s.appears_in_chapters.map((c) => (
              <li key={c}>
                <Link href={`/library/${c}`} className="text-[13.5px] text-ink-2 hover:text-brand">{c}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
