export const BRAND_NAME = "DTS TECH AI";
export const BRAND_TAGLINE =
  "Practical tech insights for developers, builders, and learners.";

export const btnPrimary =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg border-none bg-[var(--accent-purple)] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90";

export const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:outline-none";

export function footerHref(label: string) {
  const map: Record<string, string> = {
    "AI Tools": "/ai-tools",
    "Web Development": "/#web",
    "App Development": "/#apps",
    "Tech Guides": "/#guides",
    Roadmaps: "/#roadmaps",
    Tutorials: "/tutorials",
    Newsletter: "/#newsletter",
    "About Us": "/about",
    Contact: "/contact",
    Careers: "/careers",
    "Write for Us": "/write-for-us",
    "Privacy Policy": "/privacy",
    "Terms of Service": "/terms",
    "Cookie Policy": "/cookies",
    "Cheat Sheets": "/resources",
    Resources: "/resources",
  };
  return map[label] ?? `/${label.toLowerCase().replace(/\s+/g, "-")}`;
}

export const navLink =
  "flex items-center gap-1 pb-[5px] text-sm font-medium text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text-primary)]";

export function navLinkActiveClass(isActive: boolean) {
  return isActive
    ? `${navLink} border-b-2 border-[var(--accent-purple)] text-[var(--text-primary)]`
    : navLink;
}

export const iconBtn =
  "flex size-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] transition-all duration-300 hover:bg-[var(--border)]";

export const card =
  "rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-[21px]";
