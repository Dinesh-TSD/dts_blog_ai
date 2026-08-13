import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";
import type { Article } from "../lib/articles";
import { card } from "../lib/site";

export function ArticleDetailContent({
  article,
  content,
}: {
  article: Article;
  content: {
    author: string;
    authorRole: string;
    tags: string[];
    sections: {
      heading?: string;
      paragraphs: string[];
      list?: string[];
    }[];
  };
}) {
  return (
    <article>
      <div className="overflow-hidden rounded-xl border border-[var(--border)]">
        <img
          src={article.image}
          alt={article.imageAlt}
          className="h-64 w-full object-cover md:h-80 lg:h-96"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span
          className="inline-flex rounded px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase"
          style={{ backgroundColor: article.categoryColor }}
        >
          {article.category}
        </span>
        <span className="text-sm text-[var(--text-secondary)]">📅 {article.date}</span>
        <span className="text-sm text-[var(--text-secondary)]">⏱️ {article.readTime}</span>
      </div>

      <h1 className="mt-4 text-3xl leading-tight font-bold text-[var(--text-primary)] md:text-4xl lg:text-5xl">
        {article.title}
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
        {article.excerpt}
      </p>

      <div className="mt-6 flex items-center gap-3 border-b border-[var(--border)] pb-6">
        <div className="flex size-10 items-center justify-center rounded-full bg-[var(--accent-purple)] text-sm font-bold text-white">
          {content.author
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {content.author}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">{content.authorRole}</p>
        </div>
      </div>

      <div className="prose-custom mt-8 flex flex-col gap-8">
        {content.sections.map((section, i) => (
          <section key={i}>
            {section.heading && (
              <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)] md:text-2xl">
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((p, j) => (
              <p
                key={j}
                className="mb-4 text-base leading-relaxed text-[var(--text-secondary)] last:mb-0"
              >
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="mt-2 flex flex-col gap-2">
                {section.list.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <span className="mt-1 text-[var(--accent-purple)]">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--border)] pt-6">
        {content.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function ArticleSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <div className={card}>
        <h3 className="text-sm font-bold text-[var(--text-primary)]">Stay Updated</h3>
        <p className="mt-2 text-xs text-[var(--text-secondary)]">
          Get new articles delivered to your inbox.
        </p>
        <div className="mt-4">
          <NewsletterForm />
        </div>
      </div>

      <div className={`${card} flex min-h-[250px] flex-col items-center justify-center text-center`}>
        <span className="text-xs font-semibold tracking-wide text-[var(--accent-purple)] uppercase">
          Advertisement
        </span>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">300 × 250 Ad Slot</p>
      </div>
    </aside>
  );
}

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12 border-t border-[var(--border)] pt-10">
      <h2 className="mb-6 text-xl font-bold text-[var(--text-primary)]">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((related) => (
          <Link
            key={related.slug}
            href={`/articles/${related.slug}`}
            className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] no-underline transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-purple)]"
          >
            <img
              src={related.image}
              alt={related.imageAlt}
              className="h-36 w-full object-cover"
            />
            <div className="p-4">
              <span
                className="inline-flex rounded px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase"
                style={{ backgroundColor: related.categoryColor }}
              >
                {related.category}
              </span>
              <h3 className="mt-2 text-sm font-bold leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent-purple)]">
                {related.title}
              </h3>
              <p className="mt-2 text-xs text-[var(--text-secondary)]">
                {related.readTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
