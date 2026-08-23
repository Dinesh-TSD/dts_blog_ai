import Link from "next/link";
import { Article } from "../article-detail";
import { getPosts } from "@/app/lib/actions/posts";
import { FeaturedPosts } from "./featured-posts";
import { RecentPosts } from "./recent-posts";
import { TrendingPosts } from "./trending-posts";
import { HomeSideContent } from "./home-side-content";

export async function HomePosts() {

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
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_284px] gap-8 px-6 py-8 max-lg:grid-cols-1 max-lg:gap-6">
            <main className="flex flex-col gap-1 lg:col-start-1 lg:row-span-2 lg:row-start-1">
                {/*Featured Articles*/}
                <section className="mb-8">
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

                </section>
                {/*Trending Articles*/}
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
                {/*Recent Articles*/}
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
            <HomeSideContent />
        </div>
    )
}