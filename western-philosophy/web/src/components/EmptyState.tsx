import Link from "next/link";

export default function EmptyState({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-surface-2 px-6 py-12 text-center">
      <h2 className="font-serif text-lg font-semibold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-[13.5px] text-ink-2">{body}</p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-[13px] font-medium text-white hover:bg-brand-strong"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}
