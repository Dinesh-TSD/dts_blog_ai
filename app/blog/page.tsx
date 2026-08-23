import type { Metadata } from "next";
import { AdSidebar } from "../components/ad-sidebar";
import { BlogListing } from "../components/blog-listing";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import {getPosts} from ".././lib/actions/posts";
import type { Article } from ".././components/article-detail";

export const metadata: Metadata = {
  title: "Blog | DTS TECH AI",
  description:
    "Browse practical tech articles on AI, web development, developer tools, and the latest trends.",
};

export default async function BlogPage() {
  const posts = await getPosts({ limit: 12 });
  return (
    <>
      <Navbar />

      <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)] px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--tag-bg)] px-[13px] py-[5px]">
            <span className="text-xs">📚</span>
            <span className="text-xs font-medium text-[var(--text-secondary)]">
              All Articles
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
            DTS TECH{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
              AI Blog
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
            Practical guides, tutorials, and insights on AI, web development,
            apps, and developer tools—updated regularly for builders and learners.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[1fr_6fr_1fr]">
        <AdSidebar side="left" />
        <BlogListing articles={posts as unknown as Article[]} />
        <AdSidebar side="right" />
      </div>

      <div className="px-6 lg:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 pb-8 sm:grid-cols-2">
          <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-center text-sm text-[var(--text-secondary)]">
            Mobile Ad Placeholder
          </div>
          <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-center text-sm text-[var(--text-secondary)]">
            Mobile Ad Placeholder
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
