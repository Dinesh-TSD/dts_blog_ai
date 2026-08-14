export type AuthProvider = "email" | "google";

export type AuthSession = {
  email: string;
  name?: string;
  picture?: string;
  provider: AuthProvider;
  loggedInAt: number;
};

const AUTH_KEY = "dts-auth";

export function setAuthSession(session: Omit<AuthSession, "loggedInAt">) {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ ...session, loggedInAt: Date.now() }),
  );
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_KEY);
}

export function isValidAuthSession(
  session: AuthSession | null | undefined,
): session is AuthSession {
  return Boolean(
    session?.email &&
      session.provider &&
      typeof session.loggedInAt === "number",
  );
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AuthSession;
    if (!isValidAuthSession(session)) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    return session;
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

export function setGoogleAuthSession(profile: {
  email: string;
  name: string;
  picture?: string;
}) {
  setAuthSession({
    email: profile.email,
    name: profile.name,
    picture: profile.picture,
    provider: "google",
  });
}

type AuthResponse = {
  ok?: boolean;
  error?: string;
  session?: AuthSession;
  user?: { email: string; name: string; picture?: string; provider: AuthProvider };
  profile?: { email: string; name: string; picture?: string; provider: AuthProvider };
};

function saveAuthResponse(data: AuthResponse) {
  const user = data.session ?? data.user ?? data.profile;
  if (!user) return false;
  setAuthSession({
    email: user.email,
    name: user.name,
    picture: user.picture,
    provider: user.provider,
  });
  return true;
}

export async function registerWithApi(input: {
  name: string;
  email: string;
  password: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await response.json()) as AuthResponse;
    if (!response.ok) {
      return { ok: false, error: data.error ?? "Registration failed." };
    }
    if (!saveAuthResponse(data)) {
      return { ok: false, error: "Could not create session." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Registration failed. Please try again." };
  }
}

export async function loginWithApi(input: {
  email: string;
  password: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await response.json()) as AuthResponse;
    if (!response.ok) {
      return { ok: false, error: data.error ?? "Invalid email or password." };
    }
    if (!saveAuthResponse(data)) {
      return { ok: false, error: "Could not create session." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Login failed. Please try again." };
  }
}

export async function requestPasswordReset(
  email: string,
): Promise<
  | { ok: true; message: string; resetLink?: string }
  | { ok: false; error: string }
> {
  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = (await response.json()) as {
      ok?: boolean;
      error?: string;
      message?: string;
      resetLink?: string;
    };
    if (!response.ok) {
      return { ok: false, error: data.error ?? "Request failed." };
    }
    return {
      ok: true,
      message:
        data.message ??
        "If an account exists, reset instructions have been sent.",
      resetLink: data.resetLink,
    };
  } catch {
    return { ok: false, error: "Request failed. Please try again." };
  }
}

export async function resetPasswordWithApi(input: {
  token: string;
  password: string;
}): Promise<{ ok: true; message: string } | { ok: false; error: string }> {
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await response.json()) as {
      ok?: boolean;
      error?: string;
      message?: string;
    };
    if (!response.ok) {
      return { ok: false, error: data.error ?? "Password reset failed." };
    }
    return {
      ok: true,
      message: data.message ?? "Password updated successfully.",
    };
  } catch {
    return { ok: false, error: "Password reset failed. Please try again." };
  }
}

export async function logoutFromServer(): Promise<void> {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    // ignore network errors during logout
  }
  clearAuthSession();
}

export async function syncSessionFromServer(): Promise<AuthSession | null> {
  try {
    const response = await fetch("/api/auth/me");
    if (!response.ok) return null;
    const data = (await response.json()) as { session: AuthSession | null };
    if (!isValidAuthSession(data.session)) return null;
    setAuthSession(data.session);
    return data.session;
  } catch {
    return null;
  }
}
