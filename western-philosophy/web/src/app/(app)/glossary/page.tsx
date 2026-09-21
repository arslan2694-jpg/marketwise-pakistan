import type { Metadata } from "next";
import { getGlossary } from "@/lib/content";
import GlossaryClient from "@/components/GlossaryClient";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Glossary" };

export default function GlossaryPage() {
  const entries = getGlossary();
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Glossary</h1>
      <p className="mt-1 mb-6 text-[14px] text-ink-2">
        Every technical term, with a beginner explanation and an academic one.
      </p>
      {entries.length === 0 ? (
        <EmptyState
          title="The glossary is being built"
          body="Glossary terms are collected from every chapter's lesson content."
          cta={{ label: "Browse the Library", href: "/library" }}
        />
      ) : (
        <GlossaryClient entries={entries} />
      )}
    </div>
  );
}
