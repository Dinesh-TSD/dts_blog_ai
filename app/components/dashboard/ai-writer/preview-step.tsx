"use client";

import { useState } from "react";
import { btnPrimary, btnSecondary, panel } from "../../../lib/dashboard";
import type { WriterData } from "../ai-writer-page";

type PreviewStepProps = { data: WriterData; onSave: () => void };

const metrics = [
  ["SEO score", "92/100"],
  ["Readability", "95/100"],
  ["Word count", "1,800"],
  ["Reading time", "8 min"],
];

export function PreviewStep({ data, onSave }: PreviewStepProps) {
  const [published, setPublished] = useState(false);
  const post = data.post;

  return (
    <section>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value]) => (
          <div key={label} className={panel}>
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
            <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{value}</p>
          </div>
        ))}
      </div>

      {published ? (
        <div className={`${panel} mt-4 border-emerald-400/50`}>
          <p className="text-lg font-bold text-emerald-400">Article successfully published</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Research, outline, content, images, and publishing are complete.</p>
        </div>
      ) : (
        <>
          <article className={`${panel} mt-4`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded bg-[var(--badge-bg)] px-2 py-1 text-xs font-semibold text-[var(--accent-purple)]">{post?.category ?? "Article"}</span>
              <span className="text-sm text-[var(--text-secondary)]">{post?.readingTime ?? 0} min read</span>
              <span className="text-sm text-[var(--text-secondary)]">{post?.views ?? 0} views</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-[var(--text-primary)]">{post?.title || data.title || "Your article preview"}</h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">By {post?.author.name ?? "DTS Tech AI"} · {post?.publishedAt ?? "Draft"}</p>
            {post?.featuredImage.url && <img src={post.featuredImage.url} alt={post.featuredImage.alt} className="mt-6 h-64 w-full rounded-lg object-cover" />}
            <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">{post?.excerpt ?? data.excerpt}</p>
            {post?.sections.map((section) => (
              <section key={section.id} className="mt-8 space-y-3">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{section.heading}</h3>
                {section.image && <img src={section.image} alt={section.imageAlt ?? section.heading} className="max-h-72 w-full rounded-lg object-cover" />}
                <p className="whitespace-pre-line text-base leading-7 text-[var(--text-secondary)]">{section.paragraph}</p>
                <ul className="list-disc space-y-2 pl-5 text-[var(--text-secondary)]">
                  {section.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </section>
            ))}
            {post?.faq.length ? (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">Frequently Asked Questions</h3>
                {post.faq.map((faq) => <details key={faq.question} className="mt-3 rounded-lg border border-[var(--border)] p-4"><summary className="cursor-pointer font-semibold text-[var(--text-primary)]">{faq.question}</summary><p className="mt-2 text-[var(--text-secondary)]">{faq.answer}</p></details>)}
              </div>
            ) : null}
            {post?.conclusion.paragraphs.length ? (
              <div className="mt-8 rounded-lg border-2 border-[var(--accent-purple)] bg-[var(--accent-purple)]/10 p-6">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{post.conclusion.heading}</h3>
                {post.conclusion.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 leading-7 text-[var(--text-secondary)]">{paragraph}</p>)}
              </div>
            ) : null}
            {post?.tags.length ? <div className="mt-8 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]">#{tag}</span>)}</div> : null}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {data.imageUrls.slice(0, 3).map((url) => <img key={url} src={url} alt="Article section" className="aspect-video rounded-lg border border-[var(--border)] object-cover" />)}
            </div>
          </article>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className={btnSecondary} onClick={onSave}>Save draft</button>
            <button type="button" className={btnPrimary} onClick={() => setPublished(true)}>Publish article</button>
          </div>
        </>
      )}
    </section>
  );
}
