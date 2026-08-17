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
          "slug title excerpt category categoryColor categorySlug date readTime readMinutes popular image imageAlt tags author authorRole",
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
