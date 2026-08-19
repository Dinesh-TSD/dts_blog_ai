import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleDetailContent,
  ArticleSidebar,
  RelatedArticles,
  type AiTool,
} from "../../components/article-detail";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { BRAND_NAME } from "../../lib/site";
import type { PostDocument } from "../../models/post";


type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  categorySlug: string;
  date: string;
  readTime: string;
  readMinutes: number;
  popular: boolean;
  image: string;
  imageAlt: string;
};

type Props = { params: Promise<{ slug: string }> };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL.trim();
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

async function fetchPost(slug: string): Promise<PostDocument | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/posts/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? (json.data as PostDocument) : null;

  } catch {
    return null;
  }
}

async function fetchRelated(slug: string, categorySlug: string): Promise<PostDocument[]> {
  try {
    const res = await fetch(
      `${getBaseUrl()}/api/posts?category=${categorySlug}&limit=4`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const json = await res.json();
    const all: PostDocument[] = json.success ? json.data : [];
    return all.filter((p) => p.slug !== slug).slice(0, 3);
  } catch {
    return [];
  }
}

async function fetchAiTools(): Promise<AiTool[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/ai-tools`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.success ? (json.data as AiTool[]) : [];
  } catch {
    return [];
  }
}

async function fetchAllSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/posts?limit=100`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.success ? json.data.map((p: PostDocument) => p.slug) : [];
  } catch {
    return [];
  }
}

function postToArticle(post: PostDocument): Article {
  return {
    slug:          post.slug,
    title:         post.title,
    excerpt:       post.excerpt,
    category:      post.category,
    categoryColor: post.categoryColor,
    categorySlug:  post.categorySlug,
    date:          post.date,
    readTime:      post.readTime,
    readMinutes:   post.readMinutes,
    popular:       post.popular ?? false,
    image:         post.image,
    imageAlt:      post.imageAlt,
  };
}

// ─── Static params — from DB only ────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Metadata — from DB only ─────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title:       `${post.title} | ${BRAND_NAME}`,
    description: post.excerpt,
  };
}

// ─── Page — DB only, notFound() if missing ────────────────────────────────────

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const [post, aiTools] = await Promise.all([
    fetchPost(slug),
    fetchAiTools(),
  ]);

  // Hard 404 if post not in DB
  if (!post) notFound();

  const article = postToArticle(post);

  const content = {
    author:          post.author,
    authorRole:      post.authorRole,
    tags:            [...(post.tags ?? [])] as string[],
    tableOfContents: (post.tableOfContents ?? []) as {
      id: string; title: string; level: number;
    }[],
    sections: (post.sections ?? []) as {
      heading?: string;
      paragraphs: string[];
      list?: string[];
      image?: string;
      imageCaption?: string;
    }[],
  };

  const relatedPosts = await fetchRelated(slug, post.categorySlug);
  const related = relatedPosts.map(postToArticle);

  return (
    <>
      <Navbar />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[1fr_300px]">
        <div>
          <ArticleDetailContent article={article} content={content} aiTools={aiTools} />
          <RelatedArticles articles={related} />
        </div>
        <ArticleSidebar
          tableOfContents={content.tableOfContents}
          aiTools={aiTools}
        />
      </div>

      <Footer />
    </>
  );
}
