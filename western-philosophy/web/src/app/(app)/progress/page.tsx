import type { Metadata } from "next";
import { getFlatChapterRefs } from "@/lib/content";
import ProgressPageClient from "@/components/ProgressPageClient";

export const metadata: Metadata = { title: "Progress" };

export default function ProgressPage() {
  const chapters = getFlatChapterRefs();
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Progress</h1>
      <p className="mt-1 mb-6 text-[14px] text-ink-2">A closer look at how your study is going.</p>
      <ProgressPageClient chapters={chapters} />
    </div>
  );
}
