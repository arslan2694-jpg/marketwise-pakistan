import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPhilosophers, getPhilosopher } from "@/lib/content";
import LayerLabel from "@/components/reader/LayerLabel";

export function generateStaticParams() {
  return getAllPhilosophers().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPhilosopher(slug);
  return { title: p?.name ?? "Philosopher" };
}

export default async function PhilosopherPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPhilosopher(slug);
  if (!p) notFound();

  const Field = ({ label, value }: { label: string; value?: string }) =>
    value ? (
      <div className="mb-3">
        <h3 className="mb-1 text-[12.5px] font-semibold text-ink-2">{label}</h3>
        <p className="text-[14px] text-ink-2">{value}</p>
      </div>
    ) : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <p className="mb-3 text-[13px] text-ink-3">
        <Link href="/philosophers" className="hover:text-ink">
          Philosophers
        </Link>
      </p>
      <h1 className="font-serif text-3xl font-semibold text-ink">{p.name}</h1>
      <p className="mt-1 text-[14px] text-ink-2">
        {p.dates} · {p.geography}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {p.major_ideas.map((idea) => (
          <span key={idea} className="rounded-full border border-line px-2.5 py-0.5 text-[11.5px] text-ink-2">
            {idea}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-1">
        <Field label="Biography" value={p.biography} />
        <Field label="Central doctrines" value={p.central_doctrines} />
        <Field label="Metaphysics" value={p.metaphysics} />
        <Field label="Epistemology" value={p.epistemology} />
        <Field label="Ethics" value={p.ethics} />
        <Field label="Politics" value={p.politics} />
        <Field label="Philosophy of science" value={p.philosophy_of_science} />
        <Field label="Religion & theology" value={p.religion_theology} />
      </div>

      {p.notable_quotations.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-[12.5px] font-semibold text-ink-2">Notable quotations</h3>
          {p.notable_quotations.map((q, i) => (
            <blockquote key={i} className="border-l-2 border-brand pl-3 text-[14px] italic text-ink-2">
              &ldquo;{q.text}&rdquo;
              <footer className="mt-1 text-[12px] not-italic text-ink-3">
                {q.attribution}
                {q.is_paraphrase ? " (paraphrase)" : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {p.predecessors.length > 0 && (
          <div>
            <h3 className="mb-1.5 text-[12.5px] font-semibold text-ink-2">Predecessors</h3>
            <div className="flex flex-wrap gap-1.5">
              {p.predecessors.map((s) => (
                <Link key={s} href={`/philosophers/${s}`} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[12px] text-ink-2 hover:bg-brand-soft">
                  {s.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>
        )}
        {p.successors.length > 0 && (
          <div>
            <h3 className="mb-1.5 text-[12.5px] font-semibold text-ink-2">Successors</h3>
            <div className="flex flex-wrap gap-1.5">
              {p.successors.map((s) => (
                <Link key={s} href={`/philosophers/${s}`} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[12px] text-ink-2 hover:bg-brand-soft">
                  {s.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {p.russell_view && (
        <div className="mt-6">
          <LayerLabel label="Russell's presentation" />
          <p className="prose-reading mt-2">{p.russell_view}</p>
        </div>
      )}

      {p.why_this_matters && (
        <div className="mt-4">
          <LayerLabel label="Explanation" />
          <p className="prose-reading mt-2">{p.why_this_matters}</p>
        </div>
      )}

      {p.appears_in_chapters.length > 0 && (
        <div className="mt-8 border-t border-line pt-5">
          <h3 className="mb-2 text-[12.5px] font-semibold text-ink-2">Appears in these chapters</h3>
          <ul className="space-y-1">
            {p.appears_in_chapters.map((a) => (
              <li key={a.chapter_id}>
                <Link href={`/library/${a.chapter_id}`} className="text-[13.5px] text-ink-2 hover:text-brand">
                  {a.chapter_id} <span className="text-ink-3">— {a.role}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
