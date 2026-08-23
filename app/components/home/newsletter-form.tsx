"use client";

export function NewsletterForm({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="border-y border-[var(--border)] bg-[var(--bg-primary)] px-6 py-16"
    >
      <div className="mx-auto max-w-7xl rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-10">
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-sm font-semibold text-[var(--accent-purple)]">
            📬 DTS Tech AI Newsletter
          </p>
          <h2
            id="newsletter-heading"
            className="mx-auto mb-3 max-w-2xl text-center text-3xl leading-tight font-bold text-[var(--text-primary)]"
          >
            Practical AI, web development, and technology insights in your inbox
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
            Join developers, builders, and curious minds who read DTS Tech AI
            for clear tutorials, useful developer tools, software guides, and
            actionable updates from the fast-moving world of technology.
          </p>
        </div>

        <div className="mt-9 border-t border-[var(--border)] pt-8">
          <form
            className={`mb-4 grid gap-4 ${fullWidth ? "mx-auto max-w-2xl text-left md:grid-cols-1 xl:grid-cols-1" : "grid-cols-1"}`}
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
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-[13px] py-3 text-sm font-normal text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:bg-[rgba(109,40,217,0.05)] focus:outline-none"
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
                className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-[13px] py-3 text-sm font-normal text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:bg-[rgba(109,40,217,0.05)] focus:outline-none"
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
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-[13px] py-3 text-sm font-normal text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:bg-[rgba(109,40,217,0.05)] focus:outline-none"
                required
              />
            </label>
            <button
              type="submit"
              className="mt-auto inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-[var(--accent-purple)] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-center text-xs leading-relaxed text-[var(--text-secondary)]">
            Free to join. We use your details only to send relevant AI, web
            development, and technology updates. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
