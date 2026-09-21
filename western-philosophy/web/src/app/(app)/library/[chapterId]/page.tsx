import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getChapter, getFlatChapterRefs } from "@/lib/content";
import ChapterActions from "@/components/reader/ChapterActions";
import ChapterNotes from "@/components/reader/ChapterNotes";
import LayerLabel from "@/components/reader/LayerLabel";
import QuizRunner from "@/components/QuizRunner";
import FlashcardDeck from "@/components/FlashcardDeck";

export function generateStaticParams() {
  return getFlatChapterRefs().map((c) => ({ chapterId: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}): Promise<Metadata> {
  const { chapterId } = await params;
  const ref = getFlatChapterRefs().find((c) => c.id === chapterId);
  return { title: ref ? `Ch. ${ref.roman} · ${ref.title}` : "Chapter" };
}

const LESSONS = [
  { key: "context", label: "Lesson 1 — Context" },
  { key: "concepts", label: "Lesson 2 — Core Ideas" },
  { key: "philosophers", label: "Lesson 3 — Detailed Thinkers" },
  { key: "arguments", label: "Lesson 4 — Arguments" },
  { key: "connections", label: "Lesson 5 — Comparisons & Connections" },
  { key: "context2", label: "Lesson 6 — Historical & Social Connections" },
  { key: "russell", label: "Lesson 7 — Russell's Interpretation" },
  { key: "critical", label: "Lesson 8 — Critical Review" },
  { key: "recall", label: "Lesson 9 — Active Recall" },
  { key: "quiz", label: "Lesson 10 — Quiz" },
  { key: "essay", label: "Lesson 11 — Essay & Discussion" },
  { key: "mastery", label: "Lesson 12 — Chapter Mastery" },
];

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const chapter = getChapter(chapterId);
  const flat = getFlatChapterRefs();
  const idx = flat.findIndex((c) => c.id === chapterId);
  if (idx === -1) notFound();
  const ref = flat[idx];
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  if (!chapter) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <p className="mb-4 text-[13px] text-ink-3">
          <Link href="/library" className="hover:text-ink">
            Library
          </Link>{" "}
          / {ref.book_title} / {ref.part_title}
        </p>
        <h1 className="font-serif text-2xl font-semibold text-ink">
          Ch. {ref.roman} — {ref.title}
        </h1>
        <p className="mt-2 text-[13px] text-ink-3">Pages {ref.start_page}–{ref.end_page}</p>
        <div className="mt-8 rounded-md border border-dashed border-line bg-surface-2 px-5 py-8 text-center text-[14px] text-ink-2">
          Full structured lessons for this chapter haven&apos;t been generated yet.
          Check back soon — extraction of the raw chapter text is already complete.
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="mx-auto max-w-3xl flex-1 px-6 py-8">
        <p className="mb-3 text-[13px] text-ink-3">
          <Link href="/library" className="hover:text-ink">
            Library
          </Link>{" "}
          / {ref.book_title} / {ref.part_title}
        </p>

        <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-brand">
              Chapter {chapter.roman}
            </div>
            <h1 className="font-serif text-3xl font-semibold text-ink">{chapter.title}</h1>
            <p className="mt-1 text-[12.5px] text-ink-3">
              Source: {ref.book_title} → {ref.part_title} → Chapter {chapter.roman} → PDF pp.{" "}
              {chapter.start_page}–{chapter.end_page}
            </p>
          </div>
          <ChapterActions chapterId={chapterId} />
        </div>

        <p className="prose-reading mt-6 text-[16px]">{chapter.orientation}</p>

        <section id="context" className="mt-10 scroll-mt-20">
          <h2 className="mb-3 font-serif text-xl font-semibold text-ink">
            {LESSONS[0].label}
          </h2>
          <LayerLabel label="Historical context" />
          <p className="prose-reading mt-3">{chapter.historical_background}</p>
          {chapter.philosophical_problems.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-2 text-[13px] font-semibold text-ink-2">
                Philosophical problems this chapter addresses
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-[14.5px] text-ink-2">
                {chapter.philosophical_problems.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section id="concepts" className="mt-10 scroll-mt-20">
          <h2 className="mb-3 font-serif text-xl font-semibold text-ink">{LESSONS[1].label}</h2>
          <LayerLabel label="Explanation" />
          <div className="mt-3 space-y-5">
            {chapter.core_concepts.map((c, i) => (
              <div
                key={i}
                className={`rounded-md border p-4 ${c.is_major ? "border-brand/40 bg-brand-soft/40" : "border-line bg-surface"}`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-serif text-[15.5px] font-semibold text-ink">{c.name}</h3>
                  {c.is_major && (
                    <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-medium text-white">
                      major concept
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-ink-2">{c.plain_explanation}</p>
                <p className="mt-2 text-[13px] text-ink-3">
                  <span className="font-medium text-ink-2">Precise definition: </span>
                  {c.precise_definition}
                </p>
                {c.why_it_mattered && (
                  <p className="mt-1.5 text-[13px] text-ink-3">
                    <span className="font-medium text-ink-2">Why it mattered: </span>
                    {c.why_it_mattered}
                  </p>
                )}
                {c.objections.length > 0 && (
                  <p className="mt-1.5 text-[13px] text-ink-3">
                    <span className="font-medium text-ink-2">Objections: </span>
                    {c.objections.join("; ")}
                  </p>
                )}
                {c.influence_on_later_thinkers && (
                  <p className="mt-1.5 text-[13px] text-ink-3">
                    <span className="font-medium text-ink-2">Later influence: </span>
                    {c.influence_on_later_thinkers}
                  </p>
                )}
              </div>
            ))}
          </div>
          {chapter.key_distinctions.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-2 text-[13px] font-semibold text-ink-2">Key distinctions</h3>
              <div className="flex flex-wrap gap-2">
                {chapter.key_distinctions.map((d, i) => (
                  <span key={i} className="rounded-full border border-line px-2.5 py-1 text-[12px] text-ink-2">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        <section id="philosophers" className="mt-10 scroll-mt-20">
          <h2 className="mb-3 font-serif text-xl font-semibold text-ink">{LESSONS[2].label}</h2>
          {chapter.philosophers_discussed.length === 0 ? (
            <p className="text-[13.5px] text-ink-3">No specific philosophers indexed for this chapter.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {chapter.philosophers_discussed.map((p, i) => (
                <Link
                  key={i}
                  href={`/philosophers/${slugify(p.name)}`}
                  className="rounded-md border border-line bg-surface p-3.5 hover:bg-surface-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-[14.5px] font-semibold text-ink">{p.name}</span>
                    {p.is_primary_subject && (
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent">
                        primary subject
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] text-ink-2">{p.role_in_chapter}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section id="arguments" className="mt-10 scroll-mt-20">
          <h2 className="mb-3 font-serif text-xl font-semibold text-ink">{LESSONS[3].label}</h2>
          {chapter.arguments.length === 0 ? (
            <p className="text-[13.5px] text-ink-3">No formally reconstructed arguments in this chapter.</p>
          ) : (
            <div className="space-y-4">
              {chapter.arguments.map((a, i) => (
                <div key={i} className="rounded-md border border-line bg-surface p-4">
                  <h3 className="font-serif text-[15px] font-semibold text-ink">
                    {a.title} <span className="text-ink-3 font-sans text-[12.5px]">— {a.philosopher}</span>
                  </h3>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-[14px] text-ink-2">
                    {a.premises.map((p, pi) => (
                      <li key={pi}>{p}</li>
                    ))}
                  </ol>
                  <p className="mt-2 text-[14px] text-ink">
                    <span className="font-medium">Therefore: </span>
                    {a.conclusion}
                  </p>
                  <p className="mt-2 text-[13px] text-ink-3">{a.explanation}</p>
                  {a.objections.length > 0 && (
                    <p className="mt-1.5 text-[13px] text-ink-3">
                      <span className="font-medium text-ink-2">Objections: </span>
                      {a.objections.join("; ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="connections" className="mt-10 scroll-mt-20">
          <h2 className="mb-3 font-serif text-xl font-semibold text-ink">{LESSONS[4].label}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-1 text-[13px] font-semibold text-ink-2">← Earlier philosophers</h3>
              <p className="text-[14px] text-ink-2">
                {chapter.connections_to_earlier_philosophers || "Not explicitly discussed in this chapter."}
              </p>
            </div>
            <div>
              <h3 className="mb-1 text-[13px] font-semibold text-ink-2">Later philosophers →</h3>
              <p className="text-[14px] text-ink-2">
                {chapter.connections_to_later_philosophers || "Not explicitly discussed in this chapter."}
              </p>
            </div>
          </div>
        </section>

        <section id="context2" className="mt-10 scroll-mt-20">
          <h2 className="mb-3 font-serif text-xl font-semibold text-ink">{LESSONS[5].label}</h2>
          <div className="space-y-3">
            <div>
              <h3 className="mb-1 text-[13px] font-semibold text-ink-2">Political & social context</h3>
              <p className="text-[14px] text-ink-2">{chapter.political_social_context || "—"}</p>
            </div>
            {chapter.religion_science_culture_context && (
              <div>
                <h3 className="mb-1 text-[13px] font-semibold text-ink-2">Religion, science & culture</h3>
                <p className="text-[14px] text-ink-2">{chapter.religion_science_culture_context}</p>
              </div>
            )}
          </div>
        </section>

        <section id="russell" className="mt-10 scroll-mt-20">
          <h2 className="mb-3 font-serif text-xl font-semibold text-ink">{LESSONS[6].label}</h2>
          <LayerLabel label="Russell's presentation" />
          <p className="prose-reading mt-3">{chapter.russell_presentation}</p>
        </section>

        {chapter.critical_context && (
          <section id="critical" className="mt-10 scroll-mt-20">
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">{LESSONS[7].label}</h2>
            <LayerLabel label="Interpretive issue" />
            <p className="prose-reading mt-3">{chapter.critical_context}</p>
          </section>
        )}

        <section id="recall" className="mt-10 scroll-mt-20">
          <h2 className="mb-3 font-serif text-xl font-semibold text-ink">{LESSONS[8].label}</h2>
          <div className="space-y-3">
            {chapter.questions.map((q, i) => (
              <details key={i} className="rounded-md border border-line bg-surface p-3.5">
                <summary className="cursor-pointer text-[14px] font-medium text-ink">
                  {q.prompt}
                </summary>
                <p className="mt-2 text-[13.5px] text-ink-2">
                  <span className="font-medium text-ink-2">Answer: </span>
                  {q.answer}
                </p>
                <p className="mt-1 text-[12.5px] text-ink-3">{q.explanation}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="quiz" className="mt-10 scroll-mt-20">
          <QuizRunner chapterId={chapterId} questions={chapter.quiz} title={LESSONS[9].label} />
        </section>

        {chapter.essay_prompts.length > 0 && (
          <section id="essay" className="mt-10 scroll-mt-20">
            <h2 className="mb-3 font-serif text-xl font-semibold text-ink">{LESSONS[10].label}</h2>
            <div className="space-y-3">
              {chapter.essay_prompts.map((e, i) => (
                <div key={i} className="rounded-md border border-line bg-surface p-4">
                  <span className="mb-1 inline-block rounded-full bg-accent-soft px-2 py-0.5 text-[10.5px] font-medium text-accent">
                    {e.task_type}
                  </span>
                  <p className="text-[14px] text-ink">{e.prompt}</p>
                  <p className="mt-2 text-[12.5px] text-ink-3">
                    <span className="font-medium text-ink-2">Rubric: </span>
                    {e.rubric.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="mastery" className="mt-10 scroll-mt-20">
          <h2 className="mb-3 font-serif text-xl font-semibold text-ink">{LESSONS[11].label}</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-[14.5px] text-ink-2">
            {chapter.key_takeaways.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>

          {chapter.flashcards.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-[13px] font-semibold text-ink-2">Flashcards for this chapter</h3>
              <FlashcardDeck
                cards={chapter.flashcards.map((f, i) => ({
                  ...f,
                  key: `${chapterId}-${i}`,
                }))}
              />
            </div>
          )}

          {chapter.glossary_terms.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-2 text-[13px] font-semibold text-ink-2">Glossary</h3>
              <dl className="space-y-2">
                {chapter.glossary_terms.map((g, i) => (
                  <div key={i} className="rounded-md border border-line bg-surface p-3">
                    <dt className="font-serif text-[14px] font-semibold text-ink">{g.term}</dt>
                    <dd className="mt-0.5 text-[13px] text-ink-2">{g.beginner_explanation}</dd>
                    <dd className="mt-1 text-[12px] text-ink-3">{g.academic_explanation}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-6">
            <h3 className="mb-2 text-[13px] font-semibold text-ink-2">Your notes</h3>
            <ChapterNotes chapterId={chapterId} />
          </div>
        </section>

        <nav className="mt-12 flex items-center justify-between border-t border-line pt-5 text-[13.5px]">
          {prev ? (
            <Link href={`/library/${prev.id}`} className="text-ink-2 hover:text-ink">
              ← Ch. {prev.roman}. {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/library/${next.id}`} className="text-ink-2 hover:text-ink">
              Ch. {next.roman}. {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>

      <aside className="sticky top-[var(--topbar-h)] hidden h-[calc(100vh-var(--topbar-h))] w-56 shrink-0 overflow-y-auto border-l border-line px-4 py-8 lg:block">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">On this page</div>
        <ul className="mt-3 space-y-1.5">
          {LESSONS.map((l) => (
            <li key={l.key}>
              <a href={`#${l.key}`} className="block text-[12.5px] text-ink-2 hover:text-brand">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
