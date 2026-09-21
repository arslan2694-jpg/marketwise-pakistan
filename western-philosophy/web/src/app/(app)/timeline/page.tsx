import type { Metadata } from "next";
import { getTimeline } from "@/lib/content";
import TimelineClient from "@/components/TimelineClient";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Timeline" };

export default function TimelinePage() {
  const events = getTimeline();
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="font-serif text-2xl font-semibold text-ink">Timeline</h1>
      <p className="mt-1 mb-6 text-[14px] text-ink-2">
        Philosophers, empires, wars, and intellectual transitions across the full historical
        span of the book.
      </p>
      {events.length === 0 ? (
        <EmptyState
          title="The timeline is being built"
          body="Timeline events are derived from chapter content once all chapters are generated."
          cta={{ label: "Browse the Library", href: "/library" }}
        />
      ) : (
        <TimelineClient events={events} />
      )}
    </div>
  );
}
