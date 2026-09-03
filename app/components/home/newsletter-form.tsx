"use client";

export function NewsletterForm({ fullWidth = false, compact = false }: { fullWidth?: boolean; compact?: boolean }) {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className={compact ? "" : "border-y border-[var(--border)] bg-[var(--bg-primary)] px-6 py-16"}
    >
      <div className={compact
        ? "rounded-lg border border-[var(--glass-border)] bg-[var(--bg-primary)] p-4"
        : "mx-auto max-w-7xl rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-10"}>
        <div className={compact ? "" : "mx-auto max-w-2xl"}>
          <p className={compact ? "mb-1 text-xs font-semibold text-[var(--accent-purple)]" : "mb-2 text-sm font-semibold text-[var(--accent-purple)]"}>
            📬 {compact ? "Newsletter" : "DTS Tech AI Newsletter"}
          </p>
          <h2
            id="newsletter-heading"
            className={compact
              ? "mb-2 text-lg leading-tight font-bold text-[var(--text-primary)]"
              : "mx-auto mb-3 max-w-2xl text-center text-3xl leading-tight font-bold text-[var(--text-primary)]"}
          >
            {compact ? "Useful tech updates, without the noise" : "Practical AI, web development, and technology insights in your inbox"}
          </h2>
          <p className={compact ? "text-xs leading-relaxed text-[var(--text-secondary)]" : "max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]"}>
            {compact ? "Clear tutorials and practical developer insights delivered occasionally." : "Join developers, builders, and curious minds who read DTS Tech AI for clear tutorials, useful developer tools, software guides, and actionable updates from the fast-moving world of technology."}
          </p>
        </div>

        <div className={compact ? "mt-4" : "mt-9 border-t border-[var(--border)] pt-8"}>
          <form
            className={`mb-3 grid gap-3 ${fullWidth ? "mx-auto max-w-2xl text-left md:grid-cols-1 xl:grid-cols-1" : "grid-cols-1"}`}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
          >
            <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text-primary)]">
              Name
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                className={`${compact ? "px-3 py-2.5 text-xs" : "px-[13px] py-3 text-sm"} w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] font-normal text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:bg-[rgba(109,40,217,0.05)] focus:outline-none`}
                required
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text-primary)]">
              Mobile number
              <input
                type="tel"
                name="mobile"
                autoComplete="tel"
                placeholder="Your mobile number"
                className={`${compact ? "px-3 py-2.5 text-xs" : "px-[13px] py-3 text-sm"} w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] font-normal text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:bg-[rgba(109,40,217,0.05)] focus:outline-none`}
                required
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text-primary)]">
              Email address
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`${compact ? "px-3 py-2.5 text-xs" : "px-[13px] py-3 text-sm"} w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] font-normal text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:bg-[rgba(109,40,217,0.05)] focus:outline-none`}
                required
              />
            </label>
            <button
              type="submit"
              className={`${compact ? "min-h-10 px-4 py-2.5 text-sm" : "min-h-[48px] px-6 py-3 text-base"} mt-auto inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-[var(--accent-purple)] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90`}
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-center text-[10px] leading-relaxed text-[var(--text-secondary)]">
            Free to join. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
