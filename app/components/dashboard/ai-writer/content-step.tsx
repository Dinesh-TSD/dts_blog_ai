"use client";

import { useState } from "react";
import { btnPrimary, btnSecondary, panel } from "../../../lib/dashboard";

type ArticleContent = { title: string; excerpt: string; content: string };
type ContentStepProps = ArticleContent & { keyword: string; outline: string[]; onComplete: (article: ArticleContent) => void };

export function ContentStep({ keyword, outline, title, excerpt, content, onComplete }: ContentStepProps) {
  const [article, setArticle] = useState({ title, excerpt, content });
  const [generated, setGenerated] = useState(Boolean(content));

  const generate = () => {
    setArticle({
      title: `The Practical Guide to ${keyword}`,
      excerpt: `A clear, practical look at ${keyword} and the tools that make modern work easier.`,
      content: `Introduction\n\n${keyword} is changing how teams research, build, and publish. This guide breaks down the essential ideas and practical choices.\n\n${outline.slice(1, -1).join("\n\n")}\n\nConclusion\n\nStart with one focused use case, measure the result, and expand your workflow from there.`,
    });
    setGenerated(true);
  };

  return (
    <section>
      <div className={`${panel} mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center`}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-purple)]">Selected outline</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{outline.length} sections for {keyword}</p>
        </div>
        <button type="button" className={btnPrimary} onClick={generate}>Generate full article</button>
      </div>
      {generated && (
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
          <article className={panel}>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">Full article content</p>
            <input className="mt-4 w-full border-0 border-b border-[var(--border)] bg-transparent pb-3 text-2xl font-bold text-[var(--text-primary)] focus:border-[var(--accent-purple)] focus:outline-none" value={article.title} onChange={(event) => setArticle({ ...article, title: event.target.value })} aria-label="Article title" />
            <textarea className="mt-4 min-h-28 w-full resize-y border-0 bg-transparent text-sm leading-7 text-[var(--text-secondary)] focus:outline-none" value={article.excerpt} onChange={(event) => setArticle({ ...article, excerpt: event.target.value })} aria-label="Article excerpt" />
            <textarea className="mt-3 min-h-80 w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] p-4 text-sm leading-7 text-[var(--text-primary)] focus:border-[var(--accent-purple)] focus:outline-none" value={article.content} onChange={(event) => setArticle({ ...article, content: event.target.value })} aria-label="Article content" />
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" className={btnSecondary} onClick={generate}>Regenerate</button>
              <button type="button" className={btnPrimary} onClick={() => onComplete(article)}>Continue to images</button>
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
