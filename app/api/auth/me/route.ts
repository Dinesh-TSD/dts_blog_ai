import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, toSession, verifyAuthToken } from "../../../lib/jwt.server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  const payload = token ? await verifyAuthToken(token) : null;

  if (!payload) {
    return NextResponse.json({ session: null }, { status: 401 });
  }

  return NextResponse.json({ session: toSession(payload) });
}
