export const TEMP_CREDENTIALS = {
  email: "admin@dtstech.ai",
  password: "admin123",
};

const AUTH_KEY = "dts-auth";

export function setAuthSession(email: string) {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ email, loggedInAt: Date.now() }),
  );
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_KEY);
}

export function getAuthSession(): { email: string; loggedInAt: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { email: string; loggedInAt: number };
  } catch {
    return null;
  }
}

export function validateCredentials(email: string, password: string) {
  return (
    email.trim().toLowerCase() === TEMP_CREDENTIALS.email.toLowerCase() &&
    password === TEMP_CREDENTIALS.password
  );
}
