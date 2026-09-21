import type { Metadata } from "next";
import { getGraphRelationships } from "@/lib/content";
import GraphClient from "@/components/GraphClient";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Knowledge Graph" };

export default function GraphPage() {
  const relationships = getGraphRelationships();
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Philosophy Knowledge Graph</h1>
      <p className="mt-1 mb-6 text-[14px] text-ink-2">
        How philosophers, schools, and concepts influenced, criticized, and responded to one
        another. Filter by relationship type; click a node to inspect it.
      </p>
      {relationships.length === 0 ? (
        <EmptyState
          title="The knowledge graph is being built"
          body="Relationships are derived from chapter content and philosopher profiles. Check back soon."
          cta={{ label: "Browse the Library", href: "/library" }}
        />
      ) : (
        <GraphClient relationships={relationships} />
      )}
    </div>
  );
}
