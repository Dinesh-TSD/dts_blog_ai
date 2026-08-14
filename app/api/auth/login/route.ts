import { NextResponse } from "next/server";
import { jsonWithAuth } from "../../../lib/auth-cookie.server";
import { toPublicUser, verifyEmailPassword } from "../../../lib/users.server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const user = await verifyEmailPassword(email, password);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const publicUser = toPublicUser(user);
    return jsonWithAuth({ ok: true, user: publicUser }, publicUser);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed.";
    const status = message.includes("MONGODB_URI") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
