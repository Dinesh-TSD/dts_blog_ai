export function PageHero({
  tag,
  tagIcon,
  title,
  titleAccent,
  description,
}: {
  tag: string;
  tagIcon: string;
  title: string;
  titleAccent?: string;
  description: string;
}) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--tag-bg)] px-[13px] py-[5px]">
          <span className="text-xs">{tagIcon}</span>
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            {tag}
          </span>
        </div>
        <h1 className="mt-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          {title}{" "}
          {titleAccent && (
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
              {titleAccent}
            </span>
          )}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </section>
  );
}
