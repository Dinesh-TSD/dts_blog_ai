import Link from "next/link";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { NewsletterForm } from "./components/newsletter-form";
import { card } from "./lib/site";

const btnPrimary =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg border-none bg-[var(--accent-purple)] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90";
const btnSecondary =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-transparent px-[25px] py-[13px] text-base font-semibold text-[var(--btn-secondary-text)] transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[rgba(109,40,217,0.1)]";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[500px] overflow-hidden pb-8">
        <img
          src="/herobg.png"
          alt=""
          aria-hidden
          className="hero-bg-img absolute inset-0 h-full w-full min-w-full object-cover object-right"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-12 px-6 py-[49px] max-lg:grid-cols-1 max-lg:gap-6">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--tag-bg)] px-[13px] py-[5px]">
              <span className="text-xs">🔥</span>
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                Tech • AI • Web Development • Apps
              </span>
            </div>

            <h1 className="m-0 text-5xl leading-[1.2] font-bold text-[var(--text-primary)]">
              Learn, Build, and Grow with
              <br />
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
                AI Tech Insights
              </span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-[var(--text-secondary)]">
              Stay ahead of the fast-moving world of technology with clear,
              practical guides on AI, web development, apps, software, developer
              tools, and the latest tech trends.
            </p>

            <div className="mt-2 flex gap-4 max-md:flex-col">
              <Link href="/blog" className={btnPrimary}>
                Explore Latest Articles →
              </Link>
              <button type="button" className={btnSecondary}>
                📂 Browse Tech Topics
              </button>
            </div>

            <p className="mt-4 text-sm font-medium text-[var(--text-secondary)]">
              Fresh guides, useful tools, and tech insights—without the
              unnecessary jargon.
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute size-full rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.2)_0%,transparent_70%)] blur-[32px]" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="min-w-[200px] rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] p-[13px] backdrop-blur-[5px]">
                <div className="mb-2 text-xs font-semibold text-[var(--text-primary)]">
                  Top Topics
                </div>
                <div className="mb-1 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <div className="size-2 rounded-full bg-[var(--accent-blue)]" />
                  <span>React</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <div className="size-2 rounded-full bg-[var(--accent-blue)]" />
                  <span>Next.js</span>
                </div>
              </div>
            </div>
            <div className="absolute right-4 bottom-4 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] p-[13px] text-center backdrop-blur-[5px]">
              <div className="mb-1 text-xs text-[var(--text-secondary)]">Readers</div>
              <div className="text-lg font-bold text-[var(--text-primary)]">12.5K+</div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <div className="mx-auto grid max-w-7xl grid-cols-[284px_1fr_284px] gap-8 px-6 py-8 max-lg:grid-cols-1 max-lg:gap-6">
        <aside id="categories" className="flex flex-col gap-4">
          <div className={`${card} flex flex-col gap-4`}>
            <div className="flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
              <span>🏷️</span>
              Explore by Category
            </div>

            <div className="flex flex-col gap-[11.5px]">
              {[
                ["#ai", "🤖", "Artificial Intelligence", "28"],
                ["#web", "🌐", "Web Development", "42"],
                ["#apps", "📱", "App Development", "35"],
                ["#tools", "⚙️", "Developer Tools", "18"],
                ["#software", "💾", "Software & Apps", "25"],
                ["#guides", "📖", "Tech Guides", "30"],
              ].map(([href, icon, label, count]) => (
                <Link
                  key={href}
                  href={`/${href}`}
                  className="flex items-center justify-between text-sm font-medium text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text-primary)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-3.5 w-4">{icon}</span>
                    <span>{label}</span>
                  </div>
                  <span className="rounded bg-[var(--badge-bg)] px-2 py-0.5 text-xs text-[var(--text-secondary)]">
                    {count}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/blog"
              className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-[var(--border)] bg-transparent p-[9px] text-sm font-medium text-[var(--text-primary)] no-underline transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[rgba(109,40,217,0.1)]"
            >
              View All Categories →
            </Link>
          </div>
        </aside>

        <main className="flex flex-col gap-1">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--text-primary)]">
              ⭐ Featured Articles
            </h2>
            <Link
              href="/blog"
              className="flex cursor-pointer items-center gap-1 rounded border border-[var(--border)] bg-transparent px-[13px] py-[5px] text-sm text-[var(--text-primary)] no-underline transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[rgba(109,40,217,0.1)]"
            >
              View All →
            </Link>
          </div>

          <p className="mb-3 text-sm text-[var(--text-secondary)]">
            Our hand-picked guides covering the tech topics worth your attention
            right now.
          </p>

          <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
            <article className="flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-purple)]">
              <img
                src="https://www.figma.com/api/mcp/asset/a5e49b01-92e9-4de6-a15d-f70d8d594cbe.png"
                alt="AI Tools"
                className="h-32 w-full bg-[var(--bg-primary)] object-cover"
              />
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <span className="mb-2 inline-flex w-fit items-center rounded bg-[#2563eb] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                    AI TOOLS
                  </span>
                  <h3 className="mb-2 text-sm leading-tight font-bold text-[var(--text-primary)]">
                    10 AI Tools That Can Save You Hours Every Week
                  </h3>
                  <p className="mb-4 text-xs leading-snug text-[var(--text-secondary)]">
                    From writing and research to coding and automation, discover
                    practical AI tools...
                  </p>
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1">📅 Jul 28, 2026</span>
                    <span className="flex items-center gap-1">⏱️ 8 min read</span>
                  </div>
                  <Link
                    href="/blog/ai-tools-that-save-hours"
                    className="flex items-center gap-1 text-xs font-semibold text-[var(--accent-purple)] no-underline transition-all duration-300 hover:gap-2"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>

            <article className="flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-purple)]">
              <img
                src="https://www.figma.com/api/mcp/asset/f93eda2e-a012-476d-a63b-90bd8b74c16b.png"
                alt="Web Development"
                className="h-32 w-full bg-[var(--bg-primary)] object-cover"
              />
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <span className="mb-2 inline-flex w-fit items-center rounded bg-[#9333ea] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                    WEB DEVELOPMENT
                  </span>
                  <h3 className="mb-2 text-sm leading-tight font-bold text-[var(--text-primary)]">
                    How to Build a Modern Website From Scratch
                  </h3>
                  <p className="mb-4 text-xs leading-snug text-[var(--text-secondary)]">
                    A beginner-friendly look at the essential technologies,
                    tools, and steps you need...
                  </p>
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1">📅 Jul 27, 2026</span>
                    <span className="flex items-center gap-1">⏱️ 10 min read</span>
                  </div>
                  <Link
                    href="/blog/build-modern-website-from-scratch"
                    className="flex items-center gap-1 text-xs font-semibold text-[var(--accent-purple)] no-underline transition-all duration-300 hover:gap-2"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>

            <article className="col-span-2 flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-purple)] max-lg:col-span-1">
              <img
                src="https://www.figma.com/api/mcp/asset/1598bfc7-929a-46ea-8ea3-24b48cb8ae66.png"
                alt="Developer Tools"
                className="h-32 w-full bg-[var(--bg-primary)] object-cover"
              />
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <span className="mb-2 inline-flex w-fit items-center rounded bg-[#4f46e5] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                    DEVELOPER TOOLS
                  </span>
                  <h3 className="mb-2 text-sm leading-tight font-bold text-[var(--text-primary)]">
                    Best Developer Tools for Faster Coding in 2026
                  </h3>
                  <p className="mb-4 text-xs leading-snug text-[var(--text-secondary)]">
                    Explore the tools developers are using to write better code,
                    debug faster...
                  </p>
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1">📅 Jul 26, 2026</span>
                    <span className="flex items-center gap-1">⏱️ 7 min read</span>
                  </div>
                  <Link
                    href="/blog/best-developer-tools-2026"
                    className="flex items-center gap-1 text-xs font-semibold text-[var(--accent-purple)] no-underline transition-all duration-300 hover:gap-2"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </main>

        <aside className="flex flex-col gap-4">
          <div className={`${card} flex flex-col gap-1`}>
            <div className="text-xs font-semibold text-[var(--accent-purple)]">
              Stay in the Loop
            </div>

            <div className="mb-1 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
              <span>📬</span>
              Get the Best of Tech, Straight to Your Inbox
            </div>

            <p className="mb-3 text-xs leading-snug text-[var(--text-secondary)]">
              Get our latest AI guides, developer tutorials, and software
              recommendations delivered directly to your inbox.
            </p>

            <NewsletterForm />

            <p className="text-center text-[10px] leading-normal text-[var(--text-secondary)]">
              No spam. Just useful tech content. Unsubscribe anytime.
            </p>
          </div>
        </aside>
      </div>

      {/* TRENDING SECTION */}
      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-6 pb-8">
        <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--text-primary)]">
          🔥 Trending Now
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 max-md:grid-cols-1">
          {[
            {
              num: "01",
              img: "https://www.figma.com/api/mcp/asset/768e86ad-b702-4d0a-ae6b-5774779cc3f3.png",
              alt: "JavaScript",
              title: "How AI Coding Tools Are Changing Software Development",
              category: "Artificial Intelligence",
            },
            {
              num: "02",
              img: "https://www.figma.com/api/mcp/asset/50ff4793-8f1e-4f28-8b06-189ea5d73c2c.png",
              alt: "VS Code",
              title: "The Best Free Tools Every Web Developer Should Know",
              category: "Web Development",
            },
            {
              num: "03",
              img: "https://www.figma.com/api/mcp/asset/0439b866-6790-4f4c-a57f-80cf1c703879.png",
              alt: "Python",
              title: "What Is Generative AI? A Simple Guide for Beginners",
              category: "AI",
            },
          ].map((item) => (
            <article
              key={item.num}
              className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-[21px] transition-all duration-300 hover:border-[var(--accent-purple)]"
            >
              <div className="min-w-[30px] text-center text-xl font-bold text-[var(--trending-num)]">
                {item.num}
              </div>
              <img
                src={item.img}
                alt={item.alt}
                className="size-16 rounded bg-[var(--bg-primary)] object-cover"
              />
              <div className="flex flex-1 flex-col gap-2">
                <h3 className="text-sm leading-snug font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">{item.category}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
