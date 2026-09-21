const PATHS: Record<string, string> = {
  dashboard: "M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6ZM13 9h8V3h-8v6Z",
  book: "M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z M4 19.5V21.5 M4 4.5v13",
  timeline: "M3 12h18M3 12l4-4M3 12l4 4M21 6h-6M21 18h-6",
  graph: "M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 3a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.5 6.5l7 2M9 17l7-4",
  person: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0",
  concept: "M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  school: "M12 3 2 8l10 5 10-5-10-5ZM6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5",
  glossary: "M5 4h11a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1-1-2Z M5 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2",
  cards: "M4 7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z M8 3.5 19 6l-1 10.5",
  quiz: "M9 9a3 3 0 1 1 4 2.8c-.7.3-1 .9-1 1.7v.5 M12 17.5h.01 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  essay: "M4 4h13l3 3v13H4V4Z M17 4v3h3 M8 10h8M8 14h8M8 18h5",
  notes: "M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z",
  progress: "M4 19V9M10 19V5M16 19v-7M22 19H2",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35",
  sun: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z",
  chevronRight: "M9 6l6 6-6 6",
  chevronDown: "M6 9l6 6 6-6",
  flame: "M12 2c1 4-4 6-4 10a4 4 0 0 0 8 0c0-1.5-1-2-1-3.5 2 1 3 3 3 5.5a6 6 0 1 1-12 0C6 9 9 7 12 2Z",
  bookmark: "M6 3h12v18l-6-4-6 4V3Z",
};

export default function NavIcon({ name, className }: { name: string; className?: string }) {
  const d = PATHS[name] ?? PATHS.concept;
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
