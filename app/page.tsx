import Link from "next/link";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { NewsletterForm } from "./components/newsletter-form";
import { card } from "./lib/site";
import { getPosts } from "./lib/actions/posts";
import type { PostDocument } from "./models/post";
import { Article } from "./components/article-detail";
import { FeaturedPosts } from "./components/home/featured-posts";
import { TrendingPosts } from "./components/home/trending-posts";
import { RecentPosts } from "./components/home/recent-posts";

const btnPrimary =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg border-none bg-[var(--accent-purple)] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90";
const btnSecondary =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-transparent px-[25px] py-[13px] text-base font-semibold text-[var(--btn-secondary-text)] transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[rgba(109,40,217,0.1)]";

export default async function Home() {
  type HomeData = {
    featuredPosts: Article[];
    trendingPosts: Article[];
    recentPosts: Article[];
  };
  const homeData = await getPosts({
    type: "home",
  }) as unknown as HomeData;

  const {
    featuredPosts,
    trendingPosts,
    recentPosts,
  } = homeData;
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
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_284px] gap-8 px-6 py-8 max-lg:grid-cols-1 max-lg:gap-6">

        {/*Featured Articles*/}
        <main className="flex flex-col gap-1 lg:col-start-1 lg:row-span-2 lg:row-start-1">

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

          <div className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-lg:grid-cols-1">

            {featuredPosts.map((post) => (
              <FeaturedPosts key={post.slug} featuredPost={post} />
            ))}  
          </div>

          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--text-primary)]">
                🔥 Trending Articles
              </h2>
              <Link
                href="/blog"
                className="flex cursor-pointer items-center gap-1 rounded border border-[var(--border)] bg-transparent px-[13px] py-[5px] text-sm text-[var(--text-primary)] no-underline transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[rgba(109,40,217,0.1)]"
              >
                View All →
              </Link>
            </div>

            <p className="mb-3 text-sm text-[var(--text-secondary)]">
              The conversations and guides readers are exploring most this week.
            </p>

            <div className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-lg:grid-cols-1">
              {trendingPosts.map((post) => (
                <TrendingPosts key={post.slug} trendingPost={post} />
              ))}
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--text-primary)]">
                🕒 Recent Articles
              </h2>
              <Link
                href="/blog"
                className="flex cursor-pointer items-center gap-1 rounded border border-[var(--border)] bg-transparent px-[13px] py-[5px] text-sm text-[var(--text-primary)] no-underline transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[rgba(109,40,217,0.1)]"
              >
                View All →
              </Link>
            </div>

            <p className="mb-3 text-sm text-[var(--text-secondary)]">
              The conversations and guides readers are exploring most this week.
            </p>

            <div className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-lg:grid-cols-1">
              {recentPosts.map((post) => (
                <RecentPosts key={post.slug} recentPost={post} />
              ))}
            </div>
          </section>


        </main>



        <aside className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1">
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

      <section
        aria-labelledby="newsletter-heading"
        className="border-y border-[var(--border)] bg-[var(--bg-primary)] px-6 py-16"
      >
        <div className="mx-auto max-w-7xl rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-10">
          <div className="mx-auto max-w-2xl">
            <p className="mb-2 text-sm font-semibold text-[var(--accent-purple)]">
              📬 DTS Tech AI Newsletter
            </p>
            <h2
              id="newsletter-heading"
              className="mx-auto mb-3 max-w-2xl text-center text-3xl leading-tight font-bold text-[var(--text-primary)]"
            >
              Practical AI, web development, and technology insights in your inbox
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Join developers, builders, and curious minds who read DTS Tech AI
              for clear tutorials, useful developer tools, software guides, and
              actionable updates from the fast-moving world of technology.
            </p>
          </div>

          <div className="mt-9 border-t border-[var(--border)] pt-8">
            <NewsletterForm fullWidth />
            <p className="text-center text-xs leading-relaxed text-[var(--text-secondary)]">
              Free to join. We use your details only to send relevant AI, web
              development, and technology updates. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
