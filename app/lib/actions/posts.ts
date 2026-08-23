import {connectDB} from "../mongodb";
import {Post} from "../../models/post";

interface GetPostsOptions {
  type?:
    | "home"
    | "listing"
    | "detail"
    | "related";

  slug?: string;
  category?: string;
  excludeSlug?: string;

  page?: number;
  limit?: number;
}

export async function getPosts({
  type = "listing",
  slug,
  category,
  excludeSlug,
  page = 1,
  limit = 9,
}: GetPostsOptions = {}) {
  await connectDB();

  // ========================
  // BLOG DETAIL
  // ========================
  if (type === "detail" && slug) {
    return await Post.findOne({
      slug,
      published: true,
    }).lean();
  }

  // ========================
  // HOME PAGE
  // ========================
  if (type === "home") {
    const [featuredPosts, trendingPosts, recentPosts] =
      await Promise.all([
        Post.find({
          published: true,
          featured: true,
        })
          .sort({ publishedAt: -1 })
          .limit(3)
          .lean(),

        Post.find({
          published: true,
        })
          .sort({ views: -1 })
          .limit(3)
          .lean(),

        Post.find({
          published: true,
        })
          .sort({ publishedAt: -1 })
          .limit(3)
          .lean(),
      ]);

    return {
      featuredPosts,
      trendingPosts,
      recentPosts,
    };
  }

  // ========================
  // RELATED POSTS
  // ========================
  if (type === "related") {
    return await Post.find({
      published: true,
      category,
      slug: { $ne: excludeSlug },
    })
      .limit(4)
      .lean();
  }

  // ========================
  // BLOG LISTING
  // ========================
  const skip = (page - 1) * limit;

  return await Post.find({
    published: true,
  })
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
}