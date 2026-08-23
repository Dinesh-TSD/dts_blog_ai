import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { NewsletterForm } from "../components/home/newsletter-form";
import { PageHero } from "../components/page-hero";
import { BRAND_NAME, btnPrimary, card } from "../lib/site";

export const metadata: Metadata = {
  title: `Resources | ${BRAND_NAME}`,
  description: "Free cheat sheets, guides, templates, and downloads for developers.",
};

const resourceTypes = ["All", "Cheat Sheets", "Templates", "Guides", "Downloads"];

const resources = [
  {
    title: "JavaScript ES6+ Cheat Sheet",
    type: "Cheat Sheets",
    desc: "Quick reference for arrow functions, destructuring, promises, and more.",
    format: "PDF",
    icon: "📄",
  },
  {
    title: "React Hooks Reference",
    type: "Cheat Sheets",
    desc: "All built-in hooks with usage examples and best practices.",
    format: "PDF",
    icon: "⚛️",
  },
  {
    title: "AI Prompt Templates Pack",
    type: "Templates",
    desc: "20 ready-to-use prompts for writing, coding, and research.",
    format: "Notion",
    icon: "✨",
  },
  {
    title: "Next.js Project Starter Guide",
    type: "Guides",
    desc: "Complete checklist for setting up a production Next.js project.",
    format: "Guide",
    icon: "▲",
  },
  {
    title: "CSS Grid & Flexbox Poster",
    type: "Cheat Sheets",
    desc: "Visual reference for modern CSS layout techniques.",
    format: "PNG",
    icon: "🎨",
  },
  {
    title: "Git Commands Cheat Sheet",
    type: "Cheat Sheets",
    desc: "Essential Git commands for daily development workflows.",
    format: "PDF",
    icon: "🔀",
  },
  {
    title: "Tailwind CSS Class Reference",
    type: "Downloads",
    desc: "Searchable Tailwind utility class reference for quick lookup.",
    format: "Web App",
    icon: "🌊",
  },
  {
    title: "Tech Blog Content Calendar",
    type: "Templates",
    desc: "Plan and schedule your blog posts with this Notion template.",
    format: "Notion",
    icon: "📅",
  },
];

const quickLinks = [
  { label: "Blog Articles", href: "/blog", icon: "📚" },
  { label: "AI Tools Directory", href: "/ai-tools", icon: "🤖" },
  { label: "Video Tutorials", href: "/tutorials", icon: "🎬" },
  { label: "Contact Us", href: "/contact", icon: "📬" },
];

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <PageHero
        tag="Resources"
        tagIcon="📦"
        title="Free"
        titleAccent="Resources"
        description="Cheat sheets, templates, guides, and downloads to help you build faster and learn smarter."
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {resourceTypes.map((type, i) => (
            <span
              key={type}
              className={`cursor-pointer rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ${
                i === 0
                  ? "border-[var(--accent-purple)] bg-[var(--accent-purple)] text-white"
                  : "border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[var(--accent-purple)]"
              }`}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resources.map((r) => (
            <article
              key={r.title}
              className={`${card} flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-purple)]`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl">{r.icon}</span>
                <span className="rounded bg-[var(--badge-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                  {r.format}
                </span>
              </div>
              <span className="mt-3 text-[10px] font-bold tracking-wide text-[var(--accent-purple)] uppercase">
                {r.type}
              </span>
              <h2 className="mt-1 text-sm font-bold text-[var(--text-primary)]">
                {r.title}
              </h2>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                {r.desc}
              </p>
              <button
                type="button"
                className="mt-4 w-fit cursor-pointer text-xs font-semibold text-[var(--accent-purple)]"
              >
                Download Free →
              </button>
            </article>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className={card}>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Quick Links
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] no-underline transition-all hover:border-[var(--accent-purple)]"
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={card}>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Get Resources in Your Inbox
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Subscribe for new cheat sheets, templates, and guides every week.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className={`${btnPrimary} inline-flex no-underline`}>
            Explore All Articles →
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
