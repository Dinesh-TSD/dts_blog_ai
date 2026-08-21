import {connectDB} from "../mongodb";
import {Post} from "../../models/post";

interface GetPostsOptions {
  slug?: string;
  category?: string;
  excludeSlug?: string;
  limit?: number;
}

export async function getPosts({
  slug,
  category,
  excludeSlug,
  limit = 6,
}: GetPostsOptions = {}) {
  await connectDB();

  // --------------------------------
  // SINGLE ARTICLE
  // --------------------------------
  if (slug) {
    return await Post.findOne({
      slug,
      published: true,
    }).lean();
  }

  // --------------------------------
  // RELATED ARTICLES
  // --------------------------------
  const query: Record<string, any> = {
    published: true,
  };

  if (category) {
    query.category = category;
  }

  if (excludeSlug) {
    query.slug = { $ne: excludeSlug };
  }

  return await Post.find(query)
    .sort({ publishedAt: -1 })
    .limit(limit)
    .lean();
}