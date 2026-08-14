"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { resetPasswordWithApi } from "../lib/auth";

const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:outline-none";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const result = await resetPasswordWithApi({ token, password });
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setMessage(result.message);
    setTimeout(() => router.push("/login"), 1500);
  };

  if (!token) {
    return (
      <div className="w-full max-w-md rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 text-center md:p-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Invalid reset link</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          This password reset link is invalid or has expired.
        </p>
        <Link
          href="/forgot-password"
          className="mt-6 inline-flex font-medium text-[var(--accent-purple)] no-underline hover:underline"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8"
      >
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Reset password</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Choose a new password for your account.
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

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
              New password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength={6}
              autoComplete="new-password"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              minLength={6}
              autoComplete="new-password"
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-lg border-none bg-[var(--accent-purple)] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update password"}
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
