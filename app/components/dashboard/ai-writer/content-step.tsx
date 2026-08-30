"use client";

import { useState } from "react";
import { btnPrimary, btnSecondary, panel } from "../../../lib/dashboard";
import type { GeneratedWriterPost, WriterGenerate } from "../ai-writer-page";

type ArticleContent = { title: string; excerpt: string; content: string };
type ContentStepProps = ArticleContent & { keyword: string; outline: string[]; onGenerate: WriterGenerate; onComplete: (article: ArticleContent & { post: GeneratedWriterPost }) => void };

export function ContentStep({ keyword, outline, title, excerpt, content, onGenerate, onComplete }: ContentStepProps) {
  const [article, setArticle] = useState({ title, excerpt, content });
  const [generatedPost, setGeneratedPost] = useState<GeneratedWriterPost | null>(null);
  const [generated, setGenerated] = useState(Boolean(content));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await onGenerate("content", { keyword, outline });
      console.log("Step 3 received Gemini result:", result);
      const post = normalizeGeneratedPost(result, keyword);
      console.log("Step 3 normalized post:", post);
      if (!post) {
        console.error("Step 3 could not normalize Gemini result:", result);
        throw new Error("Gemini returned an invalid article");
      }
      setGeneratedPost(post);
      setArticle({
        title: post.title,
        excerpt: post.excerpt,
        content: post.sections
          .map((section) => {
            return `${section.heading}\n\n${section.paragraph}\n\n${section.points.map((point) => `- ${point}`).join("\n")}`;
          })
          .join("\n\n"),
      });
      setGenerated(true);
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "Could not generate article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className={`${panel} mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center`}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-purple)]">Selected outline</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{outline.length} sections for {keyword}</p>
        </div>
        <button type="button" className={btnPrimary} onClick={() => void generate()} disabled={loading}>{loading ? "Generating..." : "Generate full article"}</button>
      </div>
      {error && <p className="mb-4 text-sm text-red-400" role="alert">{error}</p>}
      {generated && (
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
          <article className={panel}>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">Full article content</p>
            <input className="mt-4 w-full border-0 border-b border-[var(--border)] bg-transparent pb-3 text-2xl font-bold text-[var(--text-primary)] focus:border-[var(--accent-purple)] focus:outline-none" value={article.title} onChange={(event) => setArticle({ ...article, title: event.target.value })} aria-label="Article title" />
            <textarea className="mt-4 min-h-28 w-full resize-y border-0 bg-transparent text-sm leading-7 text-[var(--text-secondary)] focus:outline-none" value={article.excerpt} onChange={(event) => setArticle({ ...article, excerpt: event.target.value })} aria-label="Article excerpt" />
            <textarea className="mt-3 min-h-80 w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] p-4 text-sm leading-7 text-[var(--text-primary)] focus:border-[var(--accent-purple)] focus:outline-none" value={article.content} onChange={(event) => setArticle({ ...article, content: event.target.value })} aria-label="Article content" />
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" className={btnSecondary} onClick={() => void generate()} disabled={loading}>{loading ? "Generating..." : "Regenerate"}</button>
              <button
                type="button"
                className={btnPrimary}
                onClick={() => generatedPost && onComplete({ ...article, post: { ...generatedPost, title: article.title, excerpt: article.excerpt } })}
                disabled={!generatedPost}
              >
                Continue to images
              </button>
            </div>
          </article>
          <aside className={panel}>
            <h3 className="font-semibold text-[var(--text-primary)]">Image prompts</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
              {["Featured image", ...outline.slice(1, 6)].map((item) => (
                <li key={item} className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] p-3">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">{item}</span>
                  <p className="mt-1">Editorial, high-detail visual for {keyword}.</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </section>
  );
}

function normalizeGeneratedPost(result: Record<string, unknown>, keyword: string): GeneratedWriterPost | null {
  if (typeof result.title !== "string" || typeof result.excerpt !== "string") {
    return null;
  }

  const rawSections = Array.isArray(result.sections)
    ? result.sections
    : typeof result.content === "string"
      ? [{ heading: "Article", paragraph: result.content, points: [] }]
      : [];

  const sections = rawSections
    .filter((section): section is Record<string, unknown> => typeof section === "object" && section !== null)
    .map((section, index) => ({
      id: typeof section.id === "string" ? section.id : `section-${index + 1}`,
      heading: typeof section.heading === "string" ? section.heading : `Section ${index + 1}`,
      image: typeof section.image === "string" ? section.image : undefined,
      imageAlt: typeof section.imageAlt === "string" ? section.imageAlt : undefined,
      paragraph: typeof section.paragraph === "string"
        ? section.paragraph
        : Array.isArray(section.paragraphs)
          ? section.paragraphs.filter((paragraph): paragraph is string => typeof paragraph === "string").join("\n\n")
          : "",
      points: Array.isArray(section.points)
        ? section.points.filter((point): point is string => typeof point === "string")
        : [],
    }))
    .filter((section) => section.paragraph.trim().length > 0);

  if (sections.length === 0) {
    return null;
  }

  return {
    title: result.title,
    slug: typeof result.slug === "string" ? result.slug : keyword.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    excerpt: result.excerpt,
    featuredImage: isObject(result.featuredImage) ? {
      url: typeof result.featuredImage.url === "string" ? result.featuredImage.url : "",
      alt: typeof result.featuredImage.alt === "string" ? result.featuredImage.alt : result.title,
    } : { url: "", alt: result.title },
    author: isObject(result.author) ? {
      name: typeof result.author.name === "string" ? result.author.name : "Dinesh T",
      avatar: typeof result.author.avatar === "string" ? result.author.avatar : "/authors/dinesh.jpg",
      role: typeof result.author.role === "string" ? result.author.role : "AI Content Lead",
    } : { name: "Dinesh T", avatar: "/authors/dinesh.jpg", role: "AI Content Lead" },
    category: typeof result.category === "string" ? result.category : "General",
    categorySlug: typeof result.categorySlug === "string" ? result.categorySlug : "general",
    categoryColor: typeof result.categoryColor === "string" ? result.categoryColor : "#10B981",
    tags: stringArray(result.tags),
    published: typeof result.published === "boolean" ? result.published : false,
    featured: typeof result.featured === "boolean" ? result.featured : false,
    readingTime: typeof result.readingTime === "number" ? result.readingTime : 1,
    views: typeof result.views === "number" ? result.views : 0,
    publishedAt: typeof result.publishedAt === "string" ? result.publishedAt : new Date().toISOString(),
    tableOfContents: isObjectArray(result.tableOfContents)
      ? result.tableOfContents.filter((item) => typeof item.id === "string" && typeof item.title === "string") as Array<{ id: string; title: string }>
      : sections.map(({ id, heading }) => ({ id, title: heading })),
    sections,
    faq: isObjectArray(result.faq) ? result.faq.filter((item) => typeof item.question === "string" && typeof item.answer === "string") as Array<{ question: string; answer: string }> : [],
    conclusion: isObject(result.conclusion) && Array.isArray(result.conclusion.paragraphs)
      ? { heading: typeof result.conclusion.heading === "string" ? result.conclusion.heading : "Conclusion", paragraphs: result.conclusion.paragraphs.filter((paragraph): paragraph is string => typeof paragraph === "string") }
      : { heading: "Conclusion", paragraphs: [] },
    relatedPosts: stringArray(result.relatedPosts),
    seo: isObject(result.seo) ? result.seo : {},
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isObjectArray(value: unknown): value is Array<Record<string, unknown>> {
  return Array.isArray(value) && value.every(isObject);
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}
