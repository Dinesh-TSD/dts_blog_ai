"use client";

import { useEffect, useMemo, useState } from "react";
import {
  articles,
  categoryOptions,
  filterTabs,
  type Article,
} from "../lib/articles";
import { BlogArticleCard } from "./blog-article-card";
import { Pagination } from "./pagination";

const PAGE_SIZE = 3;

function filterArticles(
  items: Article[],
  query: string,
  category: string,
  tab: string,
) {
  const normalizedQuery = query.trim().toLowerCase();

  let result = items.filter((article) => {
    const matchesSearch =
      !normalizedQuery ||
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.excerpt.toLowerCase().includes(normalizedQuery) ||
      article.category.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      category === "all" || article.categorySlug === category;

    return matchesSearch && matchesCategory;
  });

  if (tab === "popular") {
    result = result.filter((article) => article.popular);
  } else if (tab === "ai" || tab === "web" || tab === "tools") {
    result = result.filter((article) => article.categorySlug === tab);
  }

  return result;
}

export function BlogListing() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(
    () => filterArticles(articles, query, category, activeTab),
    [query, category, activeTab],
  );

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredArticles.slice(start, start + PAGE_SIZE);
  }, [filteredArticles, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, category, activeTab]);

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
              {categoryOptions.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.label}
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
