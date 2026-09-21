const STYLES: Record<string, string> = {
  "Russell's presentation": "bg-accent-soft text-accent",
  "Historical context": "bg-surface-2 text-ink-2",
  "Interpretive issue": "bg-warn/15 text-warn",
  "Common scholarly criticism": "bg-warn/15 text-warn",
  "Later development": "bg-warn/15 text-warn",
  Explanation: "bg-brand-soft text-brand-strong",
};

export default function LayerLabel({ label }: { label: keyof typeof STYLES | string }) {
  const cls = STYLES[label] ?? "bg-surface-2 text-ink-2";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide ${cls}`}
    >
      {label}
    </span>
  );
}
