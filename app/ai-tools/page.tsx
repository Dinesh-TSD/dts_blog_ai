import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { PageHero } from "../components/page-hero";
import { BRAND_NAME, btnPrimary, card } from "../lib/site";

export const metadata: Metadata = {
  title: `AI Tools | ${BRAND_NAME}`,
  description: "Discover the best AI tools for writing, coding, design, and productivity.",
};

const categories = ["All", "Writing", "Coding", "Design", "Research", "Productivity"];

const tools = [
  {
    name: "ChatGPT",
    category: "Writing",
    desc: "Versatile AI assistant for writing, brainstorming, and problem-solving.",
    tag: "Popular",
    color: "#2563eb",
  },
  {
    name: "GitHub Copilot",
    category: "Coding",
    desc: "AI pair programmer that suggests code completions in your IDE.",
    tag: "Dev Favorite",
    color: "#4f46e5",
  },
  {
    name: "Cursor",
    category: "Coding",
    desc: "AI-first code editor built for fast, intelligent development workflows.",
    tag: "Trending",
    color: "#9333ea",
  },
  {
    name: "Midjourney",
    category: "Design",
    desc: "Generate stunning visuals and illustrations from text prompts.",
    tag: "Creative",
    color: "#db2777",
  },
  {
    name: "Perplexity AI",
    category: "Research",
    desc: "AI-powered search engine with cited sources and real-time answers.",
    tag: "Research",
    color: "#0891b2",
  },
  {
    name: "Notion AI",
    category: "Productivity",
    desc: "Write, summarize, and organize notes and docs with built-in AI.",
    tag: "Productivity",
    color: "#059669",
  },
  {
    name: "Claude",
    category: "Writing",
    desc: "Long-context AI for detailed analysis, writing, and coding tasks.",
    tag: "Popular",
    color: "#d97706",
  },
  {
    name: "v0 by Vercel",
    category: "Coding",
    desc: "Generate UI components and full pages from natural language prompts.",
    tag: "New",
    color: "#6d28d9",
  },
];

export default function AiToolsPage() {
  return (
    <>
      <Navbar />
      <PageHero
        tag="AI Tools"
        tagIcon="✨"
        title="Best"
        titleAccent="AI Tools"
        description="Curated AI tools for developers, writers, and creators—tested and reviewed by our team."
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <span
              key={cat}
              className={`cursor-pointer rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ${
                i === 0
                  ? "border-[var(--accent-purple)] bg-[var(--accent-purple)] text-white"
                  : "border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--accent-purple)]"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <article
              key={tool.name}
              className={`${card} flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-purple)]`}
            >
              <div className="flex items-start justify-between">
                <span
                  className="inline-flex rounded px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase"
                  style={{ backgroundColor: tool.color }}
                >
                  {tool.category}
                </span>
                <span className="text-[10px] font-medium text-[var(--accent-purple)]">
                  {tool.tag}
                </span>
              </div>
              <h2 className="mt-3 text-base font-bold text-[var(--text-primary)]">
                {tool.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {tool.desc}
              </p>
              <button
                type="button"
                className="mt-4 w-fit cursor-pointer text-sm font-semibold text-[var(--accent-purple)] transition-all hover:gap-2"
              >
                Learn More →
              </button>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Want our full AI Tools guide?
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Read our in-depth article comparing the top AI tools for developers.
          </p>
          <Link href="/blog" className={`${btnPrimary} mt-4 inline-flex no-underline`}>
            Read on the Blog →
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
