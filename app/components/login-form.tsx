"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAuthSession, TEMP_CREDENTIALS, validateCredentials } from "../lib/auth";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (validateCredentials(email, password)) {
      setAuthSession(email.trim().toLowerCase());
      router.push("/dashboard");
      return;
    }

    setError("Invalid email or password. Use the demo credentials below.");
    setLoading(false);
  };

  const fillDemo = () => {
    setEmail(TEMP_CREDENTIALS.email);
    setPassword(TEMP_CREDENTIALS.password);
    setError("");
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8"
      >
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Sign in to access your DTS TECH AI dashboard.
        </p>

        {error && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-lg border-none bg-[var(--accent-purple)] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <button
          type="button"
          onClick={fillDemo}
          className="mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] bg-transparent px-6 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent-purple)] hover:bg-[rgba(109,40,217,0.1)]"
        >
          Use demo credentials
        </button>
      </form>

      <div className="mt-4 rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-center">
        <p className="text-xs font-semibold tracking-wide text-[var(--accent-purple)] uppercase">
          Demo Login
        </p>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Email:{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {TEMP_CREDENTIALS.email}
          </span>
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          Password:{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {TEMP_CREDENTIALS.password}
          </span>
        </p>
      </div>

      <p className="mt-4 text-center text-sm text-[var(--text-secondary)]">
        <Link
          href="/"
          className="font-medium text-[var(--accent-purple)] no-underline hover:underline"
        >
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
