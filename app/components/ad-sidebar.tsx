function AdPlaceholder({ label }: { label: string }) {
  return (
    <aside className="sticky top-24 hidden h-fit flex-col gap-4 lg:flex">
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] p-6 text-center">
        <span className="mb-2 text-xs font-semibold tracking-wide text-[var(--accent-purple)] uppercase">
          Advertisement
        </span>
        <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
        <p className="mt-2 text-xs text-[var(--text-secondary)]">
          300 × 250 ad slot
        </p>
      </div>
      <div className="flex min-h-[600px] flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] p-6 text-center">
        <span className="mb-2 text-xs font-semibold tracking-wide text-[var(--accent-purple)] uppercase">
          Advertisement
        </span>
        <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
        <p className="mt-2 text-xs text-[var(--text-secondary)]">
          160 × 600 ad slot
        </p>
      </div>
    </aside>
  );
}

export function AdSidebar({ side }: { side: "left" | "right" }) {
  const label = side === "left" ? "Left Sidebar Ad" : "Right Sidebar Ad";
  return <AdPlaceholder label={label} />;
}
