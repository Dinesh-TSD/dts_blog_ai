"use client";

import Link from "next/link";
import { useState } from "react";
import { requestPasswordReset } from "../lib/auth";

const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:outline-none";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setResetLink("");
    setLoading(true);

    const result = await requestPasswordReset(email);
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setMessage(result.message);
    if (result.resetLink) {
      setResetLink(result.resetLink);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8"
      >
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Forgot password</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>

        {error && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        {message && (
          <p className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-300">
            {message}
          </p>
        )}

        {resetLink && (
          <div className="mt-4 rounded-lg border border-dashed border-[var(--border)] bg-[var(--bg-primary)] p-3">
            <p className="text-xs font-semibold tracking-wide text-[var(--accent-purple)] uppercase">
              Dev reset link
            </p>
            <Link
              href={`/reset-password?token=${new URL(resetLink).searchParams.get("token") ?? ""}`}
              className="mt-2 block break-all text-sm text-[var(--text-primary)] no-underline hover:underline"
            >
              Open reset password page
            </Link>
          </div>
        )}

        <div className="mt-6">
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-lg border-none bg-[var(--accent-purple)] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-[var(--text-secondary)]">
        <Link href="/login" className="font-medium text-[var(--accent-purple)] no-underline hover:underline">
          ← Back to login
        </Link>
      </p>
    </div>
  );
}
