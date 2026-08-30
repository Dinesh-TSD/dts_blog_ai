import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import { Post } from "../../models/post";

// ─── GET /api/posts ───────────────────────────────────────────────────────────
// Query params:
//   ?category=ai        filter by categorySlug
//   ?tab=popular        filter by tab: all|latest|popular|ai|web|tools
//   ?query=javascript    search posts by title/excerpt/category
//   ?popular=true       legacy alias for popular tab
//   ?limit=6            limit results (default 20)
//   ?page=1             pagination (default 1)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? "all";
    const tab = searchParams.get("tab") ?? "all";
    const popular = searchParams.get("popular");
    const publishedParam = searchParams.get("published");
    const query = (searchParams.get("query") ?? searchParams.get("q") ?? "").trim();
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);
    const page = Math.max(parseInt(searchParams.get("page") ?? "1"), 1);
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (publishedParam !== null) {
      filter.published = publishedParam === "true";
    }

    if (category && category !== "all") {
      filter.categorySlug = category;
    }

    if (tab === "popular" || popular === "true") {
      filter.popular = true;
    }

    if (tab === "ai" || tab === "web" || tab === "tools") {
      filter.categorySlug = tab;
    }

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { excerpt: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { categorySlug: { $regex: query, $options: "i" } },
      ];
    }

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select(
          "slug title excerpt featuredImage category categoryColor categorySlug date readTime readMinutes popular tags author authorRole",
        )
        .lean(),
      Post.countDocuments(filter),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: posts,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

// ─── POST /api/posts ──────────────────────────────────────────────────────────
// Create a new post from AI writer output
// Body:
//   title, slug, excerpt, category, categorySlug, categoryColor, tags
//   featuredImage { url, alt }, author { name, avatar, role }
//   content (string - will be parsed into sections)
//   sections, faq, conclusion, seo, toc, published (default: true)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const required = ["title", "slug", "excerpt", "category", "categorySlug"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Check if slug already exists
    const existingPost = await Post.findOne({ slug: body.slug });
    if (existingPost) {
      return NextResponse.json(
        { success: false, message: "Post with this slug already exists" },
        { status: 409 },
      );
    }

    // Create post document
    const postData = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      category: body.category,
      categorySlug: body.categorySlug,
      categoryColor: body.categoryColor || "#8b5cf6",
      tags: Array.isArray(body.tags) ? body.tags : [],
      featuredImage: body.featuredImage || { url: "", alt: "" },
      author: body.author || { name: "DTS Tech AI", role: "AI Writer" },
      sections: Array.isArray(body.sections) ? body.sections : [],
      faq: Array.isArray(body.faq) ? body.faq : [],
      conclusion: body.conclusion || { heading: "Conclusion", paragraphs: [] },
      seo: body.seo || {
        metaTitle: body.title,
        metaDescription: body.excerpt,
        keywords: body.tags || [],
      },
      toc: Array.isArray(body.toc) ? body.toc : [],
      relatedPosts: Array.isArray(body.relatedPosts) ? body.relatedPosts : [],
      readingTime: body.readingTime || 5,
      views: body.views || 0,
      published: typeof body.published === "boolean" ? body.published : true,
      featured: typeof body.featured === "boolean" ? body.featured : false,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    };

    const post = await Post.create(postData);

    return NextResponse.json(
      {
        success: true,
        message: "Post created successfully",
        data: post,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to create post",
      },
      { status: 500 },
    );
  }
}
