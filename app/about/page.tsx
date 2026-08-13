import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { PageHero } from "../components/page-hero";
import { BRAND_NAME, btnPrimary, card } from "../lib/site";

export const metadata: Metadata = {
  title: `About | ${BRAND_NAME}`,
  description: `Learn about ${BRAND_NAME} — our mission, team, and values.`,
};

const stats = [
  { value: "128+", label: "Articles Published" },
  { value: "12.5K", label: "Monthly Readers" },
  { value: "50+", label: "Tech Topics Covered" },
  { value: "3.2K", label: "Newsletter Subscribers" },
];

const values = [
  {
    icon: "🎯",
    title: "Practical First",
    desc: "We focus on actionable guides you can apply immediately—not fluff or hype.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Learning",
    desc: "We embrace AI tools to help developers write, learn, and build faster.",
  },
  {
    icon: "🌍",
    title: "Open Knowledge",
    desc: "Quality tech education should be accessible to everyone, everywhere.",
  },
  {
    icon: "⚡",
    title: "Always Current",
    desc: "Our content is updated regularly to reflect the latest tools and trends.",
  },
];

const team = [
  { name: "Dinesh T.", role: "Founder & Editor", emoji: "👨‍💻" },
  { name: "Sarah K.", role: "AI Content Lead", emoji: "👩‍🔬" },
  { name: "Alex M.", role: "Web Dev Writer", emoji: "🧑‍💻" },
  { name: "Priya R.", role: "Community Manager", emoji: "👩‍💼" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PageHero
        tag="About Us"
        tagIcon="🏢"
        title="About"
        titleAccent="DTS TECH AI"
        description="We're on a mission to make tech learning practical, accessible, and powered by the best of AI and human expertise."
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className={`${card} text-center`}>
              <p className="text-2xl font-bold text-[var(--accent-purple)]">{s.value}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className={`${card} mt-8`}>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Our Mission</h2>
          <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
            {BRAND_NAME} was built for developers, creators, and curious learners who
            want clear answers in a fast-moving tech world. We publish in-depth
            tutorials, AI tool reviews, and practical guides on web development,
            software, and emerging technologies—without unnecessary jargon.
          </p>
        </div>

        <h2 className="mt-10 mb-4 text-xl font-bold text-[var(--text-primary)]">
          Our Values
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className={card}>
              <span className="text-2xl">{v.icon}</span>
              <h3 className="mt-3 font-bold text-[var(--text-primary)]">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mt-10 mb-4 text-xl font-bold text-[var(--text-primary)]">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className={`${card} text-center`}>
              <span className="text-4xl">{member.emoji}</span>
              <h3 className="mt-3 font-bold text-[var(--text-primary)]">{member.name}</h3>
              <p className="mt-1 text-sm text-[var(--accent-purple)]">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Want to collaborate?
          </h2>
          <p className="mt-2 max-w-md text-sm text-[var(--text-secondary)]">
            We&apos;re always looking for writers, partners, and contributors.
          </p>
          <Link href="/contact" className={`${btnPrimary} mt-4 no-underline`}>
            Get in Touch →
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
