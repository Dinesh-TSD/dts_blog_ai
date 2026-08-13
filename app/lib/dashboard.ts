export const dashboardNav = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/ai-writer", label: "AI Writer", icon: "✨" },
  { href: "/dashboard/drafts", label: "Drafts", icon: "📝" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "📈" },
  { href: "/dashboard/admin", label: "Admin", icon: "🛡️" },
  { href: "/dashboard/profile", label: "Profile", icon: "👤" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export const panel =
  "rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 md:p-6";

export const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:outline-none";

export const btnPrimary =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-[var(--accent-purple)] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90";

export const btnSecondary =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[rgba(109,40,217,0.1)]";
