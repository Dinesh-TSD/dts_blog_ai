"use client";

import { panel } from "../../lib/dashboard";

const metrics = [
  { label: "Page Views", value: "48.2K", period: "Last 30 days", trend: "+14%" },
  { label: "Unique Visitors", value: "31.5K", period: "Last 30 days", trend: "+9%" },
  { label: "Avg. Read Time", value: "4m 12s", period: "Last 30 days", trend: "+3%" },
  { label: "Bounce Rate", value: "38%", period: "Last 30 days", trend: "-5%" },
];

const topArticles = [
  { title: "10 AI Tools That Can Save You Hours", views: "12.4K" },
  { title: "How to Build a Modern Website From Scratch", views: "9.8K" },
  { title: "Best Developer Tools for Faster Coding", views: "7.1K" },
];

export function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <p className="text-sm font-medium text-[var(--accent-purple)]">Analytics</p>
        <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          Performance Analytics
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Track traffic, engagement, and top-performing content.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className={panel}>
            <p className="text-sm text-[var(--text-secondary)]">{m.label}</p>
            <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
              {m.value}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-[var(--text-secondary)]">{m.period}</span>
              <span className="font-medium text-green-400">{m.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={panel}>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Traffic Overview
          </h2>
          <div className="mt-4 flex h-48 items-end justify-between gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-[var(--accent-purple)] opacity-80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-[var(--text-secondary)]">
            Daily page views over the last 12 days
          </p>
        </div>

        <div className={panel}>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Top Articles
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {topArticles.map((article, i) => (
              <li
                key={article.title}
                className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[var(--trending-num)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-[var(--text-primary)]">
                    {article.title}
                  </span>
                </div>
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  {article.views}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
