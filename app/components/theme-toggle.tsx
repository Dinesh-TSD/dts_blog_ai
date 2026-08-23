"use client";

import { useTheme } from "./theme-provider";
import { Icon } from "./icon";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-transparent bg-transparent text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--border)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-purple)]"
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <Icon name={isDark ? "moon" : "sun"} />
    </button>
  );
}
