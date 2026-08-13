"use client";

import Link from "next/link";
import { btnPrimary, panel } from "../../lib/dashboard";

const drafts = [
  {
    id: 1,
    title: "React Server Components: A Practical Guide",
    category: "Web Development",
    updated: "2 hours ago",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Top 5 AI Prompts for Blog Writing",
    category: "AI Tools",
    updated: "Yesterday",
    status: "Draft",
  },
  {
    id: 3,
    title: "Next.js 16 Features Developers Should Know",
    category: "Web Development",
    updated: "Jul 26, 2026",
    status: "Review",
  },
  {
    id: 4,
    title: "Building a Newsletter Funnel for Tech Blogs",
    category: "Marketing",
    updated: "Jul 24, 2026",
    status: "Draft",
  },
];

export function DraftsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--accent-purple)]">Drafts</p>
          <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
            Saved Drafts
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {drafts.length} drafts waiting to be published.
          </p>
        </div>
        <Link href="/dashboard/ai-writer" className={`${btnPrimary} no-underline`}>
          + New Draft
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {drafts.map((draft) => (
          <article
            key={draft.id}
            className={`${panel} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}
          >
            <div>
              <span className="inline-flex rounded bg-[var(--badge-bg)] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[var(--text-secondary)] uppercase">
                {draft.category}
              </span>
              <h2 className="mt-2 text-base font-bold text-[var(--text-primary)]">
                {draft.title}
              </h2>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Updated {draft.updated}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                {draft.status}
              </span>
              <button
                type="button"
                className="cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-all hover:border-[var(--accent-purple)]"
              >
                Edit
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
