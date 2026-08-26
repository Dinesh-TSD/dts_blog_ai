import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleDetailContent,
  ArticleSidebar,
  RelatedArticles,
} from "../../components/article-detail";
import type { Article } from "../../components/article-detail";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { BRAND_NAME } from "../../lib/site";
import type { PostDocument } from "../../models/post";
import {getPosts} from "../../lib/actions/posts";

type Props = { params: Promise<{ slug: string }> };
// ─── Helpers ──────────────────────────────────────────────────────────────────



// ─── Page — DB only, notFound() if missing ────────────────────────────────────

export default async function ArticlePage({ params }: Props) {
  const result = await getPosts({
    type: "detail",
    slug: (await params).slug,
  });
  const post = (Array.isArray(result) ? result[0] : result) as PostDocument | null;

  if (!post) {
    notFound();
  }
  
  // Get related articles
  const relatedArticles = await getPosts({
    type: "related",
    category: post.category,
    excludeSlug: post.slug,
    limit: 4,
  });
  
  return (
    <>
      <Navbar />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[1fr_300px]">
        <div>
          <ArticleDetailContent article={post as unknown as Article} />
          <RelatedArticles articles={relatedArticles as unknown as Article[]} />
        </div>
        <ArticleSidebar
          article={post as unknown as Article}
        />
      </div>

      <Footer />
    </>
  );
}
