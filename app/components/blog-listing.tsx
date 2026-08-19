"use client";

import { useEffect, useMemo, useState } from "react";
import { BlogArticleCard } from "./blog-article-card";
import { Pagination } from "./pagination";

const PAGE_SIZE = 6;
const filterTabs = [
  { id: "all", label: "All" },
  { id: "latest", label: "Latest" },
  { id: "popular", label: "Popular" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web Dev" },
  { id: "tools", label: "Tools" },
];

const categoryLabelMap: Record<string, string> = {
  ai: "AI & Machine Learning",
  web: "Web Development",
  tools: "Developer Tools",
};

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

type PostsApiResponse = {
  success: boolean;
  data?: Article[];
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export function BlogListing() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, category, activeTab]);

  useEffect(() => {
    async function loadPosts() {
      try { 
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          limit: String(PAGE_SIZE),
          page: String(currentPage),
          category,
          tab: activeTab,
        });

        if (query.trim()) {
          params.set("query", query.trim());
        }

        const res = await fetch(`/api/posts?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch posts");

        const json = (await res.json()) as PostsApiResponse;
        if (!json.success) throw new Error(json.message ?? "Unknown error");
        if (!Array.isArray(json.data)) {
          throw new Error("Invalid posts data received");
        }
        setArticles(json.data as Article[]);
        setTotalPages(json.pagination?.totalPages ?? 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [category, activeTab, query, currentPage]);

  const categoryOptions = useMemo(() => {
    const uniqueSlugs = Array.from(new Set(articles.map((article) => article.categorySlug))).sort();

    return [
      { slug: "all", label: "All Categories" },
      ...uniqueSlugs.map((slug) => ({
        slug,
        label: categoryLabelMap[slug] ?? slug,
      })),
    ];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles;
  }, [articles]);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredArticles.slice(start, start + PAGE_SIZE);
  }, [filteredArticles, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setActiveTab("all");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-10 text-center">
          <p className="text-sm text-[var(--text-secondary)]">Loading posts…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center dark:border-red-800 dark:bg-red-950">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
            Failed to load posts
          </p>
          <p className="mt-1 text-xs text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg border border-red-300 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-100 dark:border-red-700 dark:text-red-400"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[var(--text-secondary)]">
              🔍
            </span> 
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, topics, or keywords..."
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] py-2.5 pr-4 pl-10 text-sm text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:bg-[rgba(109,40,217,0.05)] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 lg:w-64">
            <label htmlFor="category-filter" className="sr-only">
              Filter by category
            </label>
            <span className="hidden text-sm text-[var(--text-secondary)] sm:inline">
              Category
            </span>
            <select
              id="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] transition-[border,background] duration-300 focus:border-[var(--accent-purple)] focus:outline-none"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.slug} value={opt.slug}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--border)] pt-4">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "border-[var(--accent-purple)] bg-[var(--accent-purple)] text-white"
                    : "border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:border-[var(--accent-purple)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          {activeTab === "popular"
            ? "Popular Articles"
            : activeTab === "latest"
              ? "Latest Articles"
              : "Articles"}
        </h2>
        <span className="text-sm text-[var(--text-secondary)]">
          {filteredArticles.length} article
          {filteredArticles.length !== 1 ? "s" : ""}
          {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
        </span>
      </div>

      {filteredArticles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {paginatedArticles.length > 0 ? (
        paginatedArticles.map((article, index) => (
          <BlogArticleCard
            key={article.slug}
            article={article}
            reverse={index % 2 === 1}
          />
        ))
      ) : (
        <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] px-6 py-12 text-center">
          <p className="text-base font-semibold text-[var(--text-primary)]">
            No articles found
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Try a different search term, category, or filter tab.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 cursor-pointer rounded-lg border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[rgba(109,40,217,0.1)]"
          >
            Clear all filters
          </button>
        </div>
      )}

      {filteredArticles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
