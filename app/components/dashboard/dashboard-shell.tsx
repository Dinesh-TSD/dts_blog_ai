"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "../brand-logo";
import { clearAuthSession, getAuthSession } from "../../lib/auth";
import { dashboardNav } from "../../lib/dashboard";

const notifications = [
  { id: 1, text: "New comment on your AI Tools article", time: "2m ago" },
  { id: 2, text: "Draft saved: React Performance Guide", time: "1h ago" },
  { id: 3, text: "Weekly analytics report is ready", time: "3h ago" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const session = getAuthSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setEmail(session.email);
    setReady(true);
  }, [router]);

  const handleLogout = () => {
    clearAuthSession();
    router.push("/login");
  };

  const initials = email
    ? email
        .split("@")[0]
        .slice(0, 2)
        .toUpperCase()
    : "DT";

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
        <p className="text-sm text-[var(--text-secondary)]">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--border)] bg-[var(--bg-secondary)] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-[var(--border)] px-5 py-5">
          <BrandLogo href="/dashboard" size="sm" />
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Dashboard</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {dashboardNav.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-all duration-300 ${
                      isActive
                        ? "bg-[var(--accent-purple)] text-white"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-[var(--border)] px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--text-primary)]"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--nav-bg)] px-4 py-3 backdrop-blur-[5px] md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] lg:hidden"
              aria-label="Open sidebar"
            >
              ☰
            </button>
            <p className="hidden text-sm text-[var(--text-secondary)] sm:block">
              {email}
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications((v) => !v)}
                className="relative flex size-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-base transition-all hover:bg-[var(--border)]"
                aria-label="Notifications"
              >
                🔔
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[var(--accent-purple)] text-[10px] font-bold text-white">
                  3
                </span>
              </button>

              {showNotifications && (
                <>
                  <button
                    type="button"
                    aria-label="Close notifications"
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-3 shadow-lg">
                    <p className="mb-2 px-1 text-xs font-semibold tracking-wide text-[var(--accent-purple)] uppercase">
                      Notifications
                    </p>
                    <ul className="flex flex-col gap-2">
                      {notifications.map((n) => (
                        <li
                          key={n.id}
                          className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2"
                        >
                          <p className="text-xs text-[var(--text-primary)]">
                            {n.text}
                          </p>
                          <p className="mt-1 text-[10px] text-[var(--text-secondary)]">
                            {n.time}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            <Link
              href="/dashboard/profile"
              className="flex size-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--accent-purple)] text-xs font-bold text-white no-underline"
              title="Profile"
            >
              {initials}
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[rgba(109,40,217,0.1)]"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden" aria-hidden>
                ⎋
              </span>
              <span className="sr-only sm:hidden">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
