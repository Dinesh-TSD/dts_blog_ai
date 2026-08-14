"use client";

import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { setAuthSession, setGoogleAuthSession } from "../lib/auth";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

function isValidGoogleClientId(clientId: string) {
  return clientId.endsWith(".apps.googleusercontent.com");
}

function getGoogleConfigError(clientId: string): string | null {
  if (!clientId) return null;
  if (clientId.startsWith("GOCSPX-")) {
    return "Invalid Google config: you pasted the Client Secret (GOCSPX-...) instead of the Client ID. Use the value ending in .apps.googleusercontent.com from Google Cloud Console.";
  }
  if (!isValidGoogleClientId(clientId)) {
    return "Invalid Google Client ID. It must end with .apps.googleusercontent.com";
  }
  return null;
}

function isGoogleScriptLoaded() {
  if (typeof window === "undefined") return false;
  return Boolean(
    (window as typeof window & { google?: { accounts?: { id?: unknown } } }).google
      ?.accounts?.id,
  );
}

async function verifyGoogleCredential(credential: string) {
  const response = await fetch("/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });

  if (!response.ok) {
    throw new Error("Google sign-in failed");
  }

  const data = (await response.json()) as {
    profile?: {
      email: string;
      name: string;
      picture?: string;
      provider: "google";
    };
    session?: {
      email: string;
      name: string;
      picture?: string;
      provider: "google";
      loggedInAt: number;
    };
  };

  if (data.session) {
    return { kind: "session" as const, session: data.session };
  }

  const profile = data.profile;
  if (!profile?.email) {
    throw new Error("Google sign-in failed");
  }

  return { kind: "profile" as const, profile };
}

type GoogleAccountsId = {
  initialize: (config: {
    client_id: string;
    callback: (response: { credential: string }) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: Record<string, string | number | boolean>,
  ) => void;
};

let googleAuthInitialized = false;

function GoogleSignInButtonInner({
  mode,
  onError,
}: {
  mode: "signin" | "signup";
  onError: (message: string) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("next") || "/dashboard";
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isGoogleScriptLoaded()) {
      setScriptReady(true);
    }
  }, []);

  const handleCredential = useCallback(
    async (credential: string) => {
      setLoading(true);
      onError("");

      try {
        const result = await verifyGoogleCredential(credential);
        if (result.kind === "session") {
          setAuthSession(result.session);
        } else {
          setGoogleAuthSession(result.profile);
        }
        router.push(redirectTo);
      } catch {
        onError("Google sign-in failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [onError, redirectTo, router],
  );

  useEffect(() => {
    if (scriptReady) return;

    const interval = window.setInterval(() => {
      if (isGoogleScriptLoaded()) {
        setScriptReady(true);
        window.clearInterval(interval);
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, [scriptReady]);

  useEffect(() => {
    if (!scriptReady || !buttonRef.current) return;

    const google = (
      window as typeof window & { google?: { accounts: { id: GoogleAccountsId } } }
    ).google;

    if (!google?.accounts?.id) return;

    const container = buttonRef.current;
    container.innerHTML = "";

    if (!googleAuthInitialized) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          void handleCredential(response.credential);
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      googleAuthInitialized = true;
    }

    google.accounts.id.renderButton(container, {
      type: "standard",
      theme: "outline",
      size: "large",
      width: 380,
      text: mode === "signup" ? "signup_with" : "continue_with",
      shape: "rectangular",
    });

    return () => {
      container.innerHTML = "";
    };
  }, [scriptReady, mode, handleCredential]);

  return (
    <>
      {!scriptReady && (
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onReady={() => setScriptReady(true)}
          onLoad={() => setScriptReady(true)}
        />
      )}
      <div
        className={`relative flex min-h-[46px] w-full items-center justify-center ${loading ? "pointer-events-none opacity-60" : ""}`}
      >
        {!scriptReady && (
          <div className="flex w-full items-center justify-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)]">
            Loading Google sign-in...
          </div>
        )}
        <div
          ref={buttonRef}
          className={`flex w-full justify-center ${scriptReady ? "" : "hidden"}`}
        />
      </div>
    </>
  );
}

export function GoogleSignInButton({
  mode,
  onError,
}: {
  mode: "signin" | "signup";
  onError: (message: string) => void;
}) {
  const configError = getGoogleConfigError(GOOGLE_CLIENT_ID);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
        Google sign-in is not configured. Add{" "}
        <code className="text-xs">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> to{" "}
        <code className="text-xs">.env.local</code>, or use email sign-in.
      </p>
    );
  }

  if (configError) {
    return (
      <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
        {configError}
      </p>
    );
  }

  return <GoogleSignInButtonInner mode={mode} onError={onError} />;
}
