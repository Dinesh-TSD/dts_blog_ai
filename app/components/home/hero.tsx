import { btnPrimary, btnSecondary } from "@/app/lib/dashboard";
import Link from "next/link";
import { Icon } from "../icon";


export default function Hero() {
  return (
    <>
      <section className="relative w-full min-h-[500px] overflow-hidden pb-8">
        {/* Background Image */}
        <div className="absolute inset-0 h-full w-full min-w-full bg-[image:var(--bg-img)] bg-cover bg-right" />
        
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-12 px-6 py-[49px] max-lg:grid-cols-1 max-lg:gap-6">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--tag-bg)] px-[13px] py-[5px]">
              <Icon name="fire" size={14} />
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                Tech • AI • Web Development • Apps
              </span>
            </div>

            <h1 className="m-0 text-5xl leading-[1.2] font-bold text-[var(--text-primary)]">
              Learn Build Grow with
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
                <Icon name="archive" size={16} />
                Browse Tech Topics
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

    </>
  )
}