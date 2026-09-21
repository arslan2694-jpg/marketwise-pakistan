"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS } from "@/lib/nav";
import NavIcon from "./NavIcon";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-[var(--sidebar-w)] md:flex-col md:border-r md:border-line md:bg-surface">
      <div className="flex h-[var(--topbar-h)] items-center gap-2 border-b border-line px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-surface font-serif text-sm font-semibold">
          Φ
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-ink">Western Philosophy</div>
          <div className="text-[11px] text-ink-3">Study Companion</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="mb-5">
            <div className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wide text-ink-3">
              {group.title}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13.5px] transition-colors ${
                        active
                          ? "bg-brand-soft text-brand-strong font-medium"
                          : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                      }`}
                    >
                      <NavIcon name={item.icon} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-line p-3">
        <Link
          href="/"
          className="block rounded-md px-2.5 py-1.5 text-[12.5px] text-ink-3 hover:bg-surface-2 hover:text-ink"
        >
          ← Back to landing page
        </Link>
      </div>
    </aside>
  );
}
