"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { btnPrimary, panel } from "../../lib/dashboard";

type Draft = {
  _id: string;
  title: string;
  category: string;
  categorySlug: string;
  slug: string;
  publishedAt: string;
  published: boolean;
};

export function DraftsPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/posts?published=false");
        const result = (await response.json()) as {
          success: boolean;
          data?: Draft[];
          message?: string;
        };

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch drafts");
        }

        setDrafts(result.data || []);
        setError("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch drafts");
        setDrafts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--accent-purple)]">Drafts</p>
          <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
            Saved Drafts
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {drafts.length} draft{drafts.length !== 1 ? "s" : ""} waiting to be published.
          </p>
        </div>
        <Link href="/dashboard/ai-writer" className={`${btnPrimary} no-underline`}>
          + New Draft
        </Link>
      </div>

      {error && (
        <div className={`${panel} mb-6 border-red-400/50`}>
          <p className="text-sm font-semibold text-red-400">Error</p>
          <p className="mt-1 text-sm text-red-300">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent-purple)]" />
            <p className="text-sm text-[var(--text-secondary)]">Loading drafts...</p>
          </div>
        </div>
      ) : drafts.length === 0 ? (
        <div className={`${panel} flex flex-col items-center justify-center gap-4 py-12 text-center`}>
          <p className="text-base font-semibold text-[var(--text-primary)]">No drafts yet</p>
          <p className="text-sm text-[var(--text-secondary)]">Start creating a new draft to see it here.</p>
          <Link href="/dashboard/ai-writer" className={`${btnPrimary} no-underline`}>
            Create your first draft
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {drafts.map((draft) => (
            <article
              key={draft._id}
              className={`${panel} flex flex-col gap-4 transition-all hover:border-[var(--accent-purple)]`}
            >
              <div className="flex-1">
                <span className="inline-flex rounded bg-[var(--badge-bg)] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[var(--accent-purple)] uppercase">
                  {draft.category}
                </span>
                <h2 className="mt-3 line-clamp-2 text-base font-bold text-[var(--text-primary)] hover:text-[var(--accent-purple)]">
                  {draft.title}
                </h2>
                <p className="mt-2 text-xs text-[var(--text-secondary)]">
                  Updated {formatDate(draft.publishedAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/blog/${draft.slug}`}
                  className="flex-1 cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-center text-xs font-medium text-[var(--text-primary)] transition-all hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)]"
                >
                  View
                </Link>
                <button
                  type="button"
                  className="flex-1 cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-center text-xs font-medium text-[var(--text-primary)] transition-all hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)]"
                >
                  Edit
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
