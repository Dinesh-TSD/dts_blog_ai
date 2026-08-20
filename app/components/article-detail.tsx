import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";
import { btnPrimary, card } from "../lib/site";

type SectionGuidance = {
  keyFeatures: string[];
  bestUseCases: string[];
  tryNowUrl: string;
};

const defaultSectionGuidance: SectionGuidance = {
  keyFeatures: [
    "Clear, focused workflow",
    "Fast results with minimal setup",
    "Useful for everyday projects",
  ],
  bestUseCases: [
    "Exploring a new workflow",
    "Comparing practical options",
    "Getting a project started",
  ],
  tryNowUrl: "#",
};

const sectionGuidance: Record<string, SectionGuidance> = {
  chatgpt: {
    keyFeatures: ["Conversational assistance", "Writing and brainstorming", "Code and file analysis"],
    bestUseCases: ["Drafting content", "Learning a complex topic", "Working through ideas"],
    tryNowUrl: "https://chatgpt.com/",
  },
  "github copilot": {
    keyFeatures: ["Inline code suggestions", "IDE-aware context", "Natural-language coding help"],
    bestUseCases: ["Writing repetitive code", "Exploring unfamiliar APIs", "Reviewing implementation ideas"],
    tryNowUrl: "https://github.com/features/copilot",
  },
  cursor: {
    keyFeatures: ["AI-first code editor", "Codebase-aware chat", "Fast multi-file edits"],
    bestUseCases: ["Refactoring a codebase", "Building features quickly", "Debugging with context"],
    tryNowUrl: "https://www.cursor.com/",
  },
  claude: {
    keyFeatures: ["Long-context analysis", "Careful writing support", "Structured reasoning"],
    bestUseCases: ["Reviewing long documents", "Planning technical work", "Improving drafts"],
    tryNowUrl: "https://claude.ai/",
  },
};

const aiToolComparison = [
  ["ChatGPT", "Writing, Chatting", "Yes", "Yes", "$20/month", "★★★★★", "https://chatgpt.com/"],
  ["Claude", "Writing, Research", "Yes", "Yes", "$20/month", "★★★★★", "https://claude.ai/"],
  ["Gemini", "Research, Productivity", "Yes with Google", "Yes", "$0/month", "★★★★★", "https://gemini.google.com/"],
  ["Perplexity", "Research", "Yes", "Yes", "$20/month", "★★★★★", "https://www.perplexity.ai/"],
  ["GitHub Copilot", "Coding", "No", "Yes", "$10/month", "★★★★★", "https://github.com/features/copilot"],
  ["Cursor", "Coding", "Yes", "Yes", "$20/month", "★★★★★", "https://www.cursor.com/"],
  ["Midjourney", "Image Generation", "No", "Yes", "$10/month", "★★★★★", "https://www.midjourney.com/"],
  ["Runway", "Video Editing", "Yes", "Yes", "$15/month", "★★★★★", "https://runwayml.com/"],
  ["ElevenLabs", "Voice Generation", "Yes", "Yes", "$5/month", "★★★★★", "https://elevenlabs.io/"],
  ["Notion AI", "Productivity, Writing", "Yes", "Yes", "$8/month", "★★★★★", "https://www.notion.so/product/ai"],
] as const;

function getSectionGuidance(heading: string) {
  const key = heading.trim().toLowerCase();
  return sectionGuidance[key] ?? defaultSectionGuidance;
}

export type Article = {
  categorySlug: string;
  categoryColor: string | undefined;
  _id?: string;

  title: string;
  slug: string;
  excerpt: string;

  featuredImage: {
    url: string;
    alt: string;
  };
  image?: string;
  imageAlt?: string;

  author: {
    charAt(arg0: number): unknown;
    name: string;
    avatar?: string;
    role?: string;
  };

  category: string;
  tags: string[];

  published: boolean;
  featured: boolean;

  readingTime: number;
  views: number;

  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;

  tableOfContents: {
    id: string;
    title: string;
  }[];

  sections: {
    id: string;
    type: "text" | "list" | "table" | "pros-cons" | "tool-grid";
    heading: string;

    paragraphs?: string[];

    image?: string;
    imageCaption?: string;

    items?: string[];

    columns?: string[];
    rows?: string[][];

    pros?: string[];
    cons?: string[];

    tools?: {
      name: string;
      logo: string;
      description: string;
      pricing: string;
      website: string;
    }[];
  }[];

  faq: {
    question: string;
    answer: string;
  }[];

  conclusion: {
    heading: string;
    paragraphs: string[];
  };

  relatedPosts: string[];

  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];

    canonicalUrl: string;

    openGraph: {
      title: string;
      description: string;
      image: string;
    };

    twitter: {
      title: string;
      description: string;
      image: string;
    };
  };
};

export function ArticleDetailContent({
  article,
}: {
  article: Article;
}) {
  return (
    <article>
      {/* Outer wrapper - 75% width of browser */}
      <div className="mx-auto ">
        {/* Article Header Section - 75% width */}
        <div className="mb-6 space-y-4">
          {/* Title - 75% width */}
          <h1 className="text-4xl leading-tight font-bold text-[var(--text-primary)] md:text-5xl lg:text-4xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
            <span>📅 {article.createdAt}</span>
            <span>⏱️ {article.readingTime}</span>
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

        {/* Main article - Full Width */}
        <div className="space-y-8">
          {/* Featured Image - 75% width */}
          <div className="overflow-hidden rounded-xl border border-[var(--border)]">
            <img
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              className="h-64 w-full object-cover md:h-80 lg:h-96"
            />
          </div>

          {/* Article sections mapped from API */}
          {article.sections.map((section, sectionIdx) => (
            <div
              id={section.id || (section.heading ? section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : undefined)}
              key={`${section.heading ?? "section"}-${sectionIdx}`}
              className="space-y-4  p-6 scroll-mt-6"
            >
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

              {section.items && section.items.length > 0 && (
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  {section.items.map((item, idx) => (
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

              {(() => {
                const guidance = getSectionGuidance(section.heading);

                return (
                  <div className="mt-6 grid gap-5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">Key features</h3>
                      <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                        {guidance.keyFeatures.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">Best use cases</h3>
                      <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                        {guidance.bestUseCases.map((useCase) => (
                          <li key={useCase} className="flex items-start gap-2">
                            <span className="text-teal-500">•</span>
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={guidance.tryNowUrl}
                      className={`${btnPrimary} w-fit text-sm no-underline md:col-span-2`}
                      target={guidance.tryNowUrl.startsWith("http") ? "_blank" : undefined}
                      rel={guidance.tryNowUrl.startsWith("http") ? "noreferrer" : undefined}
                    >
                      Try now →
                    </Link>
                  </div>
                );
              })()}
            </div>
          ))}

          <section className="space-y-4" aria-labelledby="ai-tool-comparison-heading">
            <div>
              <h2 id="ai-tool-comparison-heading" className="text-2xl font-bold text-[var(--text-primary)]">
                Top 10 AI Tools Comparison
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                A quick guide to choosing the right AI tool for your workflow.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                <caption className="sr-only">Comparison of 10 popular AI tools</caption>
                <thead className="bg-[var(--bg-secondary)] text-xs tracking-wide text-[var(--text-secondary)] uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Tool</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Best for</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Free plan</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Paid plan</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Starting price</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Our rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {aiToolComparison.map(([name, bestFor, freePlan, paidPlan, startingPrice, rating, website]) => (
                    <tr key={name} className="text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)]/60">
                      <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-[var(--text-primary)]">
                        <a href={website} target="_blank" rel="noreferrer" className="hover:text-[var(--accent-blue)] hover:underline">
                          {name}
                        </a>
                      </th>
                      <td className="px-4 py-3">{bestFor}</td>
                      <td className="px-4 py-3">{freePlan}</td>
                      <td className="px-4 py-3">{paidPlan}</td>
                      <td className="whitespace-nowrap px-4 py-3">{startingPrice}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-amber-500" aria-label={`${rating.length} out of 5 stars`}>{rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ Section */}
          {article.faq && article.faq.length > 0 && (
            <div>
              <h3 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {article.faq.map((faq, idx) => (
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
          {article.conclusion && article.conclusion.paragraphs.length > 0 && (
            <div id="conclusion" className="rounded-lg border-2 border-[var(--accent-purple)] bg-[var(--accent-purple)]/10 p-6">
              <h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
                {article.conclusion.heading || "Conclusion"}
              </h3>
              {article.conclusion.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function ArticleSidebar({ article }: { article: Article }) {
 
  return (
    <aside className="flex flex-col gap-6">
      {/* Table of articles */}
      <div className={card}>
        <h3 className="mb-4 text-sm font-bold text-[var(--text-primary)]">
          Table of articles
        </h3>
        <nav className="flex flex-col gap-2">
          {article.tableOfContents?.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-xs hover:text-[var(--accent-purple)] transition-colors `}
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
                src={related.featuredImage.url}
                alt={related.featuredImage.alt}
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
                <span className="text-xs text-[var(--text-secondary)]">⏱️ {related.readingTime}</span>
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
