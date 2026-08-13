"use client";

export function NewsletterForm() {
  return (
    <form
      className="mb-4 flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thank you for subscribing!");
      }}
    >
      <input
        type="email"
        className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-[13px] py-2.5 text-sm text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:bg-[rgba(109,40,217,0.05)] focus:outline-none"
        placeholder="Enter your email address"
        required
      />
      <button
        type="submit"
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-[var(--accent-purple)] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
      >
        Subscribe Free
      </button>
    </form>
  );
}
