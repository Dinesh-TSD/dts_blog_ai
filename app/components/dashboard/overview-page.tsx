"use client";

import Link from "next/link";
import { panel } from "../../lib/dashboard";

export function OverviewPage() {
  const stats = [
    { label: "Total Articles", value: "128", change: "+12%", icon: "📝" },
    { label: "Monthly Readers", value: "12.5K", change: "+8%", icon: "👥" },
    { label: "Draft Posts", value: "6", change: "2 new", icon: "📋" },
    { label: "Newsletter Subs", value: "3.2K", change: "+24", icon: "📬" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <p className="text-sm font-medium text-[var(--accent-purple)]">Overview</p>
        <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Your content performance at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={panel}>
            <div className="flex items-start justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs font-medium text-green-400">{stat.change}</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={panel}>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Recent Activity
          </h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {[
              "Published \"10 AI Tools That Can Save You Hours\"",
              "24 new newsletter subscribers today",
              "AI Writer generated 3 draft outlines",
              "Analytics report exported",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-secondary)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={panel}>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Quick Actions
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/dashboard/ai-writer"
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] no-underline transition-all hover:border-[var(--accent-purple)]"
            >
              ✨ Create with AI Writer
            </Link>
            <Link
              href="/dashboard/drafts"
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] no-underline transition-all hover:border-[var(--accent-purple)]"
            >
              📝 View Drafts
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] no-underline transition-all hover:border-[var(--accent-purple)]"
            >
              🌐 View Live Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
