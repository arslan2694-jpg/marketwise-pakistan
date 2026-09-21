import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllConcepts, getConcept } from "@/lib/content";

export function generateStaticParams() {
  return getAllConcepts().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getConcept(slug);
  return { title: c?.name ?? "Concept" };
}

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getConcept(slug);
  if (!c) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <p className="mb-3 text-[13px] text-ink-3">
        <Link href="/concepts" className="hover:text-ink">Concepts</Link>
      </p>
      <h1 className="font-serif text-3xl font-semibold text-ink">{c.name}</h1>

      <div className="mt-5 space-y-4">
        <div>
          <h3 className="mb-1 text-[12.5px] font-semibold text-ink-2">Plain-language explanation</h3>
          <p className="text-[14.5px] text-ink-2">{c.plain_explanation}</p>
        </div>
        <div>
          <h3 className="mb-1 text-[12.5px] font-semibold text-ink-2">Precise definition</h3>
          <p className="text-[14.5px] text-ink-2">{c.precise_definition}</p>
        </div>
        {c.historical_origin && (
          <div>
            <h3 className="mb-1 text-[12.5px] font-semibold text-ink-2">Historical origin</h3>
            <p className="text-[14.5px] text-ink-2">{c.historical_origin}</p>
          </div>
        )}
        {c.why_it_mattered && (
          <div>
            <h3 className="mb-1 text-[12.5px] font-semibold text-ink-2">Why it mattered</h3>
            <p className="text-[14.5px] text-ink-2">{c.why_it_mattered}</p>
          </div>
        )}
        {c.competing_positions.length > 0 && (
          <div>
            <h3 className="mb-1 text-[12.5px] font-semibold text-ink-2">Competing positions</h3>
            <ul className="list-disc space-y-1 pl-5 text-[14px] text-ink-2">
              {c.competing_positions.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        )}
        {c.objections.length > 0 && (
          <div>
            <h3 className="mb-1 text-[12.5px] font-semibold text-ink-2">Objections</h3>
            <ul className="list-disc space-y-1 pl-5 text-[14px] text-ink-2">
              {c.objections.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        )}
        {c.evolution.length > 0 && (
          <div>
            <h3 className="mb-2 text-[12.5px] font-semibold text-ink-2">How this concept evolved</h3>
            <ol className="space-y-2 border-l-2 border-line pl-4">
              {c.evolution.map((e, i) => (
                <li key={i}>
                  <div className="text-[13.5px] font-medium text-ink">{e.philosopher}</div>
                  <div className="text-[13px] text-ink-2">{e.treatment}</div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {c.appears_in_chapters.length > 0 && (
        <div className="mt-6 border-t border-line pt-5">
          <h3 className="mb-2 text-[12.5px] font-semibold text-ink-2">Appears in</h3>
          <ul className="space-y-1">
            {c.appears_in_chapters.map((ch) => (
              <li key={ch}>
                <Link href={`/library/${ch}`} className="text-[13.5px] text-ink-2 hover:text-brand">{ch}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
