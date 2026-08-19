import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";
import type { Article } from "../lib/articles";
import { card } from "../lib/site";

export type AiTool = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  website: string;
  websiteLabel: string;
  description: string;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: { icon: string; label: string }[];
  useCases: { icon: string; text: string }[];
};

export function ArticleDetailContent({
  article,
  content,
}: {
  article: Article;
  aiTools: AiTool[];
  content: {
    author: string;
    authorRole: string;
    tags: string[];
    breadcrumbs?: { label: string; href: string }[];
    tableOfContents?: { id: string; title: string; level: number }[];
    faqs?: { question: string; answer: string }[];
    pros?: string[];
    cons?: string[];
    bestFor?: string[];
    sections: {
      heading?: string;
      paragraphs: string[];
      list?: string[];
      image?: string;
      imageCaption?: string;
    }[];
  };
}) {
  return (
    <article>
      {/* Outer wrapper - 75% width of browser */}
      <div className="mx-auto ">
        {/* Article Header Section - 75% width */}
        <div className="mb-6 space-y-3">
          {/* Title - 75% width */}
          <h1 className="text-4xl leading-tight font-bold text-[var(--text-primary)] md:text-5xl lg:text-4xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
            <span>📅 {article.date}</span>
            <span>⏱️ {article.readTime}</span>
            <div className="flex items-center gap-2">
              <span>Share:</span>
              <div className="flex gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600" title="Facebook">
                  f
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 text-white hover:bg-blue-500" title="Twitter">
                  𝕏
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800" title="LinkedIn">
                  in
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-900" title="Copy Link">
                  🔗
                </button>
              </div>

            </div>
            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-wide text-white uppercase"
              style={{ backgroundColor: article.categoryColor }}
            >
              {article.category}
            </span>
          </div>
        </div>

        {/* Main Content - Full Width */}
        <div className="space-y-8">
          {/* Featured Image - 75% width */}
          <div className="overflow-hidden rounded-xl border border-[var(--border)]">
            <img
              src={article.image}
              alt={article.imageAlt}
              className="h-64 w-full object-cover md:h-80 lg:h-96"
            />
          </div>

          {/* Article sections mapped from API */}
          {content.sections.map((section, sectionIdx) => (
            <div key={`${section.heading ?? "section"}-${sectionIdx}`} className="space-y-5 rounded-xl border border-[var(--border)] p-6 scroll-mt-6">
              {section.heading && (
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs?.map((paragraph, idx) => (
                <p key={`${section.heading ?? "paragraph"}-${idx}`} className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {paragraph}
                </p>
              ))}

              {section.list && section.list.length > 0 && (
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  {section.list.map((item, idx) => (
                    <li key={`${item}-${idx}`} className="flex items-start gap-2">
                      <span className="mt-1 text-teal-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.image && (
                <div className="overflow-hidden rounded-lg border border-[var(--border)]">
                  <img
                    src={section.image}
                    alt={section.imageCaption || section.heading || "Article section image"}
                    className="max-h-72 w-full object-cover"
                  />
                  {section.imageCaption && (
                    <p className="border-t border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-xs text-[var(--text-secondary)]">
                      {section.imageCaption}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* FAQ Section */}
          {content.faqs && content.faqs.length > 0 && (
            <div>
              <h3 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {content.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-4"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-[var(--text-primary)] hover:text-[var(--accent-purple)]">
                      <span>{faq.question}</span>
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Sample FAQ if none provided */}
          {(!content.faqs || content.faqs.length === 0) && (
            <div>
              <h3 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {[
                  {
                    question: "Which AI tool is best overall?",
                    answer: "The best AI tool depends on your specific needs. ChatGPT is versatile for writing and learning, Claude excels at research and analysis, while specialized tools like Jasper are great for marketing copy. Consider your primary use case when choosing.",
                  },
                  {
                    question: "Are these AI tools free to use?",
                    answer: "Many AI tools offer free versions with limitations, while premium features require paid subscriptions. ChatGPT has a free tier, but advanced features like GPT-4 access need a subscription. Check each tool's pricing page for details.",
                  },
                  {
                    question: "Which AI tool is best for content writing?",
                    answer: "For content writing, Jasper and Copy.ai are specifically designed for marketing content. ChatGPT and Claude are great for general content creation. The best choice depends on your specific content needs and budget.",
                  },
                  {
                    question: "Which AI tool is best for image generation?",
                    answer: "For image generation, tools like Midjourney, DALL-E, and Stable Diffusion are specialized options. ChatGPT now includes DALL-E integration, making it a convenient all-in-one solution.",
                  },
                  {
                    question: "Which AI tool is best for coding?",
                    answer: "GitHub Copilot is purpose-built for coding and integrates directly with your IDE. ChatGPT and Claude are also excellent for debugging and explaining code. Choose based on your programming language and development environment.",
                  },
                ].map((faq, idx) => (
                  <details
                    key={idx}
                    className="group rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-4"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-[var(--text-primary)] hover:text-[var(--accent-purple)]">
                      <span>{faq.question}</span>
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Conclusion Section */}
          <div className="rounded-lg border-2 border-[var(--accent-purple)] bg-[var(--accent-purple)]/10 p-6">
            <h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
              Conclusion
            </h3>
            <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
              AI tools are here to stay, and they are getting better. Choose the right tool based on your needs and start using AI to save time, work smarter, and achieve more.
            </p>
            <p className="text-lg font-bold text-[var(--accent-purple)]">
              "The best AI tool is the one that solves your problem and saves your time."
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ArticleSidebar({
  tableOfContents,
  aiTools = [],
}: {
  tableOfContents?: { id: string; title: string; level: number }[];
  aiTools?: AiTool[];
} = {}) {
  // Build TOC from aiTools if no explicit tableOfContents provided
  const generatedToc: { id: string; title: string; level: number }[] = [
    { id: "intro", title: "Introduction", level: 1 },
    ...aiTools.map((tool, idx) => ({
      id: tool.id,
      title: `${idx + 1}. ${tool.name}`,
      level: 1,
    })),
    { id: "faq", title: "Frequently Asked Questions", level: 1 },
    { id: "conclusion", title: "Conclusion", level: 1 },
  ];

  const tocData =
    tableOfContents && tableOfContents.length > 0
      ? tableOfContents
      : generatedToc;

  return (
    <aside className="flex flex-col gap-6">
      {/* Table of Contents */}
      <div className={card}>
        <h3 className="mb-4 text-sm font-bold text-[var(--text-primary)]">
          Table of Contents
        </h3>
        <nav className="flex flex-col gap-2">
          {tocData.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-xs hover:text-[var(--accent-purple)] transition-colors ${item.level > 1
                ? "ml-4 text-[var(--text-secondary)]"
                : "text-[var(--text-primary)] font-medium"
                }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      <div className={card}>
        <h3 className="text-sm font-bold text-[var(--text-primary)]">Stay Updated</h3>
        <p className="mt-2 text-xs text-[var(--text-secondary)]">
          Get new articles delivered to your inbox.
        </p>
        <div className="mt-4">
          <NewsletterForm />
        </div>
      </div>

      <div className={`${card} flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--border)] text-center`}>
        <span className="text-xs font-semibold tracking-wide text-[var(--accent-purple)] uppercase">
          Advertisement
        </span>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">300 × 250 Ad Slot</p>
      </div>

      <button className="w-full rounded-lg bg-[var(--accent-purple)] px-4 py-3 font-bold text-white hover:opacity-90 transition-opacity">
        Find My Tool →
      </button>
    </aside>
  );
}

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12 border-t border-[var(--border)] pt-10">
      <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((related) => (
          <Link
            key={related.slug}
            href={`/blog/${related.slug}`}
            className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] no-underline transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[var(--accent-purple)]"
          >
            <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={related.image}
                alt={related.imageAlt}
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <span
                  className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase"
                  style={{ backgroundColor: related.categoryColor }}
                >
                  {related.category}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">⏱️ {related.readTime}</span>
              </div>
              <h3 className="mt-3 text-sm font-bold leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">
                {related.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs text-[var(--text-secondary)]">
                {related.excerpt || "Read more to discover this article."}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
