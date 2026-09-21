import { Suspense } from "react";
import type { Metadata } from "next";
import { getSearchIndex } from "@/lib/content";
import SearchClient from "@/components/SearchClient";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  const docs = getSearchIndex();
  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="mb-6 font-serif text-2xl font-semibold text-ink">Search</h1>
      <Suspense fallback={<div className="h-12 animate-pulse rounded-md bg-surface-2" />}>
        <SearchClient docs={docs} />
      </Suspense>
    </div>
  );
}
