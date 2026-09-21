"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import NavIcon from "./NavIcon";
import { NAV_GROUPS } from "@/lib/nav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const current = NAV_GROUPS.flatMap((g) => g.items).find(
    (i) => pathname === i.href || pathname.startsWith(i.href + "/")
  );

  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar />

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-50 w-72 bg-surface">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[var(--topbar-h)] items-center gap-3 border-b border-line bg-surface px-4 md:px-6">
          <button
            className="rounded-md p-1.5 text-ink-2 hover:bg-surface-2 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <nav className="hidden min-w-0 flex-1 items-center gap-1.5 text-[13px] text-ink-3 sm:flex">
            <Link href="/dashboard" className="hover:text-ink">
              Study
            </Link>
            {current && (
              <>
                <span>/</span>
                <span className="truncate text-ink">{current.label}</span>
              </>
            )}
          </nav>

          <form
            className="ml-auto flex max-w-xs flex-1 items-center gap-2 rounded-md border border-line bg-page px-2.5 py-1.5 sm:max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              const q = new FormData(e.currentTarget).get("q");
              if (q) router.push(`/search?q=${encodeURIComponent(String(q))}`);
            }}
          >
            <NavIcon name="search" className="shrink-0 text-ink-3" />
            <input
              name="q"
              placeholder="Search the course…"
              className="w-full bg-transparent text-[13px] text-ink placeholder:text-ink-3 focus:outline-none"
            />
          </form>

          <ThemeToggle />
        </header>

        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
