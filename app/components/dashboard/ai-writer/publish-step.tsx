"use client";

import Link from "next/link";
import { useState } from "react";
import { btnPrimary, btnSecondary, panel } from "../../../lib/dashboard";
import type { WriterData } from "../ai-writer-page";

type PublishStepProps = {
  data: WriterData;
  onPublishSuccess: (postId: string, postSlug: string) => void;
};

export function PublishStep({ data, onPublishSuccess }: PublishStepProps) {
  const [publishStatus, setPublishStatus] = useState<"idle" | "saving" | "published" | "error">("idle");
  const [saveDraftStatus, setSaveDraftStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const post = data.post;

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const publishArticle = async () => {
    if (!post || !post.title) {
      setError("Article data is incomplete. Please complete all steps.");
      return;
    }

    setPublishStatus("saving");
    setError("");
    setSuccessMessage("");

    try {
      const slug = post.slug || generateSlug(post.title);

      const publishPayload = {
        title: post.title,
        slug,
        excerpt: post.excerpt,
        category: post.category,
        categorySlug: post.categorySlug,
        categoryColor: post.categoryColor || "#8b5cf6",
        tags: post.tags || [],
        featuredImage: post.featuredImage,
        author: post.author,
        sections: post.sections,
        faq: post.faq || [],
        conclusion: post.conclusion,
        seo: post.seo,
        toc: post.tableOfContents || [],
        relatedPosts: post.relatedPosts || [],
        readingTime: post.readingTime || 5,
        views: 0,
        published: true,
        featured: false,
        publishedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(publishPayload),
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
        data?: { _id?: string; slug?: string };
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to publish article");
      }

      const postId = result.data?._id || slug;
      const postSlug = result.data?.slug || slug;

      setPublishStatus("published");
      setSuccessMessage(`Article "${post.title}" published successfully!`);
      onPublishSuccess(postId, postSlug);
    } catch (publishError) {
      setPublishStatus("error");
      setError(publishError instanceof Error ? publishError.message : "Failed to publish article");
      console.error("Publish error:", publishError);
    }
  };

  const saveDraft = async () => {
    if (!post || !post.title) {
      setError("Article data is incomplete. Please complete all steps.");
      return;
    }

    setSaveDraftStatus("saving");
    setError("");
    setSuccessMessage("");

    try {
      const slug = post.slug || generateSlug(post.title);

      const draftPayload = {
        title: post.title,
        slug: `draft-${slug}`,
        excerpt: post.excerpt,
        category: post.category,
        categorySlug: post.categorySlug,
        categoryColor: post.categoryColor || "#8b5cf6",
        tags: post.tags || [],
        featuredImage: post.featuredImage,
        author: post.author,
        sections: post.sections,
        faq: post.faq || [],
        conclusion: post.conclusion,
        seo: post.seo,
        toc: post.tableOfContents || [],
        relatedPosts: post.relatedPosts || [],
        readingTime: post.readingTime || 5,
        views: 0,
        published: false,
        featured: false,
        publishedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftPayload),
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
        data?: { _id?: string; slug?: string };
      };

      if (!response.ok || !result.success) {
        // Check if it's a duplicate slug error
        if (response.status === 409) {
          setSaveDraftStatus("saved");
          setSuccessMessage("Draft already saved. You can publish when ready.");
          return;
        }
        throw new Error(result.message || "Failed to save draft");
      }

      setSaveDraftStatus("saved");
      setSuccessMessage(`Draft "${post.title}" saved successfully!`);
    } catch (draftError) {
      setSaveDraftStatus("error");
      setError(draftError instanceof Error ? draftError.message : "Failed to save draft");
      console.error("Draft save error:", draftError);
    }
  };

  return (
    <section>
      <div className="mb-6 space-y-4">
        {/* Status Messages */}
        {error && (
          <div className={`${panel} border-red-400/50`}>
            <p className="text-sm font-semibold text-red-400">Error</p>
            <p className="mt-1 text-sm text-red-300">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className={`${panel} border-emerald-400/50`}>
            <p className="text-sm font-semibold text-emerald-400">Success</p>
            <p className="mt-1 text-sm text-emerald-300">{successMessage}</p>
          </div>
        )}

        {publishStatus === "published" || saveDraftStatus === "saved" ? (
          <div className={`${panel} border-emerald-400/50 bg-emerald-400/5`}>
            <p className="text-lg font-bold text-emerald-400">✓ Article Ready</p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Your article has been {publishStatus === "published" ? "published" : "saved as a draft"}.
            </p>
            {publishStatus === "published" && (
              <a
                href={`/blog/${post?.slug || "article"}`}
                className="mt-3 inline-block text-emerald-400 underline hover:text-emerald-300"
              >
                View published article →
              </a>
            )}
            {saveDraftStatus === "saved" && (
              <Link
                href="/dashboard/drafts"
                className="mt-3 inline-block text-emerald-400 underline hover:text-emerald-300"
              >
                View your drafts →
              </Link>
            )}
          </div>
        ) : null}
      </div>

      {/* Article Preview */}
      <article className={`${panel} mb-6`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded bg-[var(--badge-bg)] px-2 py-1 text-xs font-semibold text-[var(--accent-purple)]">
            {post?.category ?? "Article"}
          </span>
          <span className="text-sm text-[var(--text-secondary)]">{post?.readingTime ?? 0} min read</span>
        </div>

        <h2 className="mt-4 text-3xl font-bold text-[var(--text-primary)]">{post?.title || "Article Title"}</h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          By {post?.author?.name ?? "DTS Tech AI"} · {post?.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}
        </p>

        {post?.featuredImage?.url && (
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || "Article featured image"}
            className="mt-6 h-64 w-full rounded-lg object-cover"
          />
        )}

        <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">{post?.excerpt}</p>

        {post?.sections && post.sections.length > 0 && (
          <>
            {post.sections.slice(0, 2).map((section) => (
              <section key={section.id} className="mt-8 space-y-3">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{section.heading}</h3>
                {section.image && (
                  <img
                    src={section.image}
                    alt={section.imageAlt || section.heading}
                    className="max-h-72 w-full rounded-lg object-cover"
                  />
                )}
                <p className="whitespace-pre-line text-base leading-7 text-[var(--text-secondary)]">{section.paragraph}</p>
                {section.points && section.points.length > 0 && (
                  <ul className="list-disc space-y-2 pl-5 text-[var(--text-secondary)]">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p className="mt-4 text-sm text-[var(--text-secondary)]">... and {post.sections.length - 2} more sections</p>
          </>
        )}

        {post?.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={btnSecondary}
          onClick={saveDraft}
          disabled={saveDraftStatus === "saving" || publishStatus === "saving"}
        >
          {saveDraftStatus === "saving" ? "Saving draft..." : saveDraftStatus === "saved" ? "Draft saved ✓" : "Save as draft"}
        </button>
        <button
          type="button"
          className={btnPrimary}
          onClick={publishArticle}
          disabled={publishStatus === "saving" || publishStatus === "published"}
        >
          {publishStatus === "saving" ? "Publishing..." : publishStatus === "published" ? "Published ✓" : "Publish article"}
        </button>
      </div>

      {/* Article Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className={panel}>
          <p className="text-sm text-[var(--text-secondary)]">Status</p>
          <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
            {publishStatus === "published" ? "Published" : saveDraftStatus === "saved" ? "Draft" : "Ready"}
          </p>
        </div>
        <div className={panel}>
          <p className="text-sm text-[var(--text-secondary)]">Reading time</p>
          <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{post?.readingTime || 5} min</p>
        </div>
        <div className={panel}>
          <p className="text-sm text-[var(--text-secondary)]">Sections</p>
          <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{post?.sections?.length || 0}</p>
        </div>
        <div className={panel}>
          <p className="text-sm text-[var(--text-secondary)]">Tags</p>
          <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{post?.tags?.length || 0}</p>
        </div>
      </div>
    </section>
  );
}
