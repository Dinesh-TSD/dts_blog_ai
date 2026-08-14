import { SignJWT, jwtVerify } from "jose";

export const AUTH_COOKIE = "dts-auth";
export const AUTH_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type AuthProvider = "email" | "google";

export type JwtPayload = {
  email: string;
  name: string;
  picture?: string;
  provider: AuthProvider;
};

export type SessionPayload = JwtPayload & {
  loggedInAt: number;
};

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is required in production");
  }
  return new TextEncoder().encode(secret ?? "dts-dev-jwt-secret-change-me");
}

export async function signAuthToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${AUTH_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifyAuthToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const email = payload.email;
    const name = payload.name;
    const provider = payload.provider;

    if (
      typeof email !== "string" ||
      typeof name !== "string" ||
      (provider !== "email" && provider !== "google")
    ) {
      return null;
    }

    return {
      email,
      name,
      picture: typeof payload.picture === "string" ? payload.picture : undefined,
      provider,
    };
  } catch {
    return null;
  }
}

export function toSession(payload: JwtPayload): SessionPayload {
  return { ...payload, loggedInAt: Date.now() };
}
