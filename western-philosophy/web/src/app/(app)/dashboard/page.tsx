import type { Metadata } from "next";
import { getFlatChapterRefs } from "@/lib/content";
import DashboardClient from "@/components/DashboardClient";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const chapters = getFlatChapterRefs();
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-1 mb-6 text-[14px] text-ink-2">
        Your progress is stored locally in this browser — nothing leaves your device.
      </p>
      <DashboardClient chapters={chapters} />
    </div>
  );
}
