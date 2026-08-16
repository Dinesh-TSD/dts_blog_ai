import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArticleDetailContent,
  ArticleSidebar,
  RelatedArticles,
} from "../../components/article-detail";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { getArticleContent } from "../../lib/article-content";
import { articles, getArticleBySlug, getRelatedArticles } from "../../lib/articles";
import { BRAND_NAME } from "../../lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} | ${BRAND_NAME}`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const content = getArticleContent(slug);

  if (!article || !content) notFound();

  const related = getRelatedArticles(slug);

  return (
    <>
      <Navbar />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[1fr_300px]">
        <div>
          <ArticleDetailContent article={article} content={content} />
          <RelatedArticles articles={related} />
        </div>
        <ArticleSidebar tableOfContents={content.tableOfContents} />
      </div>

      <Footer />
    </>
  );
}
