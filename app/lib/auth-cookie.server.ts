import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  AUTH_MAX_AGE,
  signAuthToken,
  toSession,
  type JwtPayload,
} from "./jwt.server";

export async function setAuthCookie(payload: JwtPayload) {
  const token = await signAuthToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTH_MAX_AGE,
    path: "/",
  });
  return toSession(payload);
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function jsonWithAuth<T extends Record<string, unknown>>(
  data: T,
  payload: JwtPayload,
) {
  const token = await signAuthToken(payload);
  const session = toSession(payload);
  const response = NextResponse.json({ ...data, session });
  response.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTH_MAX_AGE,
    path: "/",
  });
  return response;
}

export function jsonLogout() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(AUTH_COOKIE);
  return response;
}
