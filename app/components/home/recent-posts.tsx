import Link from "next/link";
import { Article } from "../../components/article-detail";
import { formatArticleDate } from "../../lib/site";
import { Icon } from "../ui-icon";


export function RecentPosts({ recentPost }: { recentPost: Article }) {
    const imageUrl = recentPost.featuredImage?.url ?? recentPost.image ?? "";
    const imageAlt = recentPost.featuredImage?.alt ?? recentPost.imageAlt ?? recentPost.title;

    return(
        <article className="flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-purple)]">
                        <img
                          src={imageUrl}
                          alt={imageAlt}
                          className="h-32 w-full bg-[var(--bg-primary)] object-cover"
                        />
                        <div className="flex flex-1 flex-col justify-between p-4">
                          <div>
                            <span
                              className="mb-2 inline-flex w-fit items-center rounded px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase"
                              style={{ backgroundColor: recentPost.categoryColor }}
                            >
                              {recentPost.category}
                            </span>
                            <h3 className="mb-2 text-sm leading-tight font-bold text-[var(--text-primary)]">
                              {recentPost.title}
                            </h3>
                            <p className="mb-4 text-xs leading-snug text-[var(--text-secondary)]">
                              {recentPost.excerpt}
                            </p>
                          </div>
                          <div>
                            <div className="mb-3 flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
                              <span className="flex items-center gap-1">
                                <Icon name="calendar" size={13} />
                                {formatArticleDate(recentPost.createdAt ?? recentPost.publishedAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="clock" size={13} />
                                {recentPost.readingTime} min read
                              </span>
                            </div>
                            <Link
                              href={`/blog/${recentPost.slug}`}
                              className="flex items-center gap-1 text-xs font-semibold text-[var(--accent-purple)] no-underline transition-all duration-300 hover:gap-2"
                            >
                              Read Article →
                            </Link>
                          </div>
                        </div>
                      </article>
    )
}