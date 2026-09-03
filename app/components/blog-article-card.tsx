import Link from "next/link";
import { Article } from "./article-detail";
import { formatArticleDate } from "../lib/site";


export function BlogArticleCard({
  article,
  reverse = false,
}: {
  article: Article;
  reverse?: boolean;
}) {
  const imageUrl = article.featuredImage?.url ?? article.image ?? "";
  const imageAlt = article.featuredImage?.alt ?? article.imageAlt ?? article.title;
  return (
    <article className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-purple)]">
      <div
        className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""}`}
      >
        <div className="md:w-[42%]">
          <img src={imageUrl} alt={imageAlt} />
        </div>
        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
          <div>
            <span
              className="mb-3 inline-flex w-fit items-center rounded px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase"
              style={{ backgroundColor: article.categoryColor }}
            >
              {article.category}
            </span>
            <h2 className="mb-3 text-lg leading-tight font-bold text-[var(--text-primary)] md:text-xl">
              {article.title}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {article.excerpt}
            </p>
          </div>
          <div className="mt-5">
            <div className="mb-3 flex flex-wrap items-center gap-4 text-[11px] text-[var(--text-secondary)]">
              <span className="flex items-center gap-1">
                📅 {formatArticleDate(article.createdAt ?? article.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                ⏱️ {article.readingTime}
              </span>
            </div>
            <Link
              href={`/blog/${article.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-purple)] no-underline transition-all duration-300 hover:gap-2"
            >
              Read Article →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
