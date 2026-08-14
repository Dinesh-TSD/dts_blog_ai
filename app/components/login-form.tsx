"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GoogleSignInButton } from "./google-sign-in-button";
import { loginWithApi, registerWithApi } from "../lib/auth";

type AuthMode = "signin" | "signup";

const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2.5 text-sm text-[var(--text-primary)] transition-[border,background] duration-300 placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-purple)] focus:outline-none";

function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[var(--border)]" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-[var(--bg-secondary)] px-3 text-xs font-medium tracking-wide text-[var(--text-secondary)] uppercase">
          or
        </span>
      </div>
    </div>
  );
}

function AuthFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/dashboard";
  const [mode, setMode] = useState<AuthMode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup") {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      const result = await registerWithApi({
        name,
        email,
        password,
      });

      if (!result.ok) {
        setError(result.error);
        setLoading(false);
        return;
      }

      router.push(redirectTo);
      return;
    }

    const result = await loginWithApi({ email, password });
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8">
        <div className="mb-6 flex rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] p-1">
          <button
            type="button"
            onClick={() => switchMode("signin")}
            className={`flex-1 cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              mode === "signin"
                ? "bg-[var(--accent-purple)] text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`flex-1 cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              mode === "signup"
                ? "bg-[var(--accent-purple)] text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Sign Up
          </button>
        </div>

        <GoogleSignInButton mode={mode} onError={setError} />

        <AuthDivider />

        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {mode === "signin"
              ? "Sign in with email or use Google for fast login."
              : "Create an account with email and a secure password."}
          </p>

          {error && (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-4">
            {mode === "signup" && (
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className={inputClass}
                />
              </div>
            )}

            <div>
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

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-[var(--text-primary)]">
                  Password
                </label>
                {mode === "signin" && (
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-[var(--accent-purple)] no-underline hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signup" ? "At least 6 characters" : "Enter your password"}
                required
                minLength={mode === "signup" ? 6 : undefined}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                className={inputClass}
              />
            </div>

            {mode === "signup" && (
              <div>
                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Confirm password
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
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-lg border-none bg-[var(--accent-purple)] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? mode === "signin"
                ? "Signing in..."
                : "Creating account..."
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>
      </div>

      <p className="mt-4 text-center text-sm text-[var(--text-secondary)]">
        <Link href="/" className="font-medium text-[var(--accent-purple)] no-underline hover:underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

export function LoginForm() {
  return <AuthFormInner />;
}
