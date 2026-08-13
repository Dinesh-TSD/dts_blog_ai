import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { PageHero } from "../components/page-hero";
import { BRAND_NAME, btnPrimary, card } from "../lib/site";

export const metadata: Metadata = {
  title: `Tutorials | ${BRAND_NAME}`,
  description: "Step-by-step tutorials on AI, web development, and developer tools.",
};

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const tutorials = [
  {
    title: "Getting Started with Next.js 16",
    level: "Beginner",
    duration: "45 min",
    topic: "Web Development",
    lessons: 8,
    color: "#9333ea",
  },
  {
    title: "Build an AI Chatbot with OpenAI API",
    level: "Intermediate",
    duration: "60 min",
    topic: "AI",
    lessons: 10,
    color: "#2563eb",
  },
  {
    title: "React Server Components Explained",
    level: "Intermediate",
    duration: "35 min",
    topic: "React",
    lessons: 6,
    color: "#4f46e5",
  },
  {
    title: "Tailwind CSS: From Zero to Production",
    level: "Beginner",
    duration: "50 min",
    topic: "CSS",
    lessons: 12,
    color: "#0891b2",
  },
  {
    title: "TypeScript for JavaScript Developers",
    level: "Beginner",
    duration: "40 min",
    topic: "TypeScript",
    lessons: 9,
    color: "#2563eb",
  },
  {
    title: "Deploying Next.js Apps to Vercel",
    level: "Beginner",
    duration: "25 min",
    topic: "DevOps",
    lessons: 5,
    color: "#059669",
  },
  {
    title: "Advanced AI Prompt Engineering",
    level: "Advanced",
    duration: "55 min",
    topic: "AI",
    lessons: 11,
    color: "#d97706",
  },
  {
    title: "Building REST APIs with Node.js",
    level: "Intermediate",
    duration: "70 min",
    topic: "Backend",
    lessons: 14,
    color: "#6d28d9",
  },
];

export default function TutorialsPage() {
  return (
    <>
      <Navbar />
      <PageHero
        tag="Tutorials"
        tagIcon="🎓"
        title="Learn with"
        titleAccent="Tutorials"
        description="Hands-on, step-by-step tutorials designed to take you from beginner to confident builder."
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {levels.map((level, i) => (
            <span
              key={level}
              className={`cursor-pointer rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ${
                i === 0
                  ? "border-[var(--accent-purple)] bg-[var(--accent-purple)] text-white"
                  : "border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--accent-purple)]"
              }`}
            >
              {level}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {tutorials.map((t) => (
            <article
              key={t.title}
              className={`${card} flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-purple)]`}
            >
              <div
                className="hidden w-1.5 shrink-0 rounded-full sm:block"
                style={{ backgroundColor: t.color }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.topic}
                  </span>
                  <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--text-secondary)]">
                    {t.level}
                  </span>
                </div>
                <h2 className="mt-2 text-base font-bold text-[var(--text-primary)]">
                  {t.title}
                </h2>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
                  <span>⏱️ {t.duration}</span>
                  <span>📖 {t.lessons} lessons</span>
                </div>
                <button
                  type="button"
                  className="mt-3 cursor-pointer text-sm font-semibold text-[var(--accent-purple)]"
                >
                  Start Tutorial →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            New tutorials every week
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Subscribe to get notified when we publish new step-by-step guides.
          </p>
          <Link href="/blog" className={`${btnPrimary} mt-4 inline-flex no-underline`}>
            Browse All Tutorials →
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
