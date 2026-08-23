import type { Article } from "../components/article-detail";

export type PostsQuery = {
  category?: string;
  tab?: string;
  query?: string;
  published?: boolean;
  popular?: boolean;
  page?: number;
  limit?: number;
};

export type PostsResponse = {
  data: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

function createPostsQuery(options: PostsQuery) {
  const params = new URLSearchParams();

  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

export async function fetchPosts(options: PostsQuery = {}): Promise<PostsResponse> {
  const query = createPostsQuery(options);
  const response = await fetch(`/api/posts${query ? `?${query}` : ""}`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const result = (await response.json()) as {
    success: boolean;
    data?: Article[];
    pagination?: PostsResponse["pagination"];
    message?: string;
  };

  if (!result.success || !Array.isArray(result.data) || !result.pagination) {
    throw new Error(result.message ?? "Invalid posts data received");
  }

  return {
    data: result.data,
    pagination: result.pagination,
  };
}

export async function fetchAllPosts(
  options: Omit<PostsQuery, "page" | "limit"> = {},
): Promise<Article[]> {
  const limit = 100;
  const firstPage = await fetchPosts({ ...options, page: 1, limit });
  const posts = [...firstPage.data];

  for (let page = 2; page <= firstPage.pagination.totalPages; page += 1) {
    const nextPage = await fetchPosts({ ...options, page, limit });
    posts.push(...nextPage.data);
  }

  return posts;
}