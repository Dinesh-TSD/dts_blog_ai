import { NextResponse } from "next/server";
import { jsonWithAuth } from "../../../lib/auth-cookie.server";
import { createEmailUser, toPublicUser } from "../../../lib/users.server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 },
      );
    }

    const user = await createEmailUser({ name, email, password });
    const publicUser = toPublicUser(user);

    return jsonWithAuth({ ok: true, user: publicUser }, publicUser);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    const isDbError =
      message.includes("MongoDB") ||
      message.includes("MONGODB_URI") ||
      message.includes("Database connection");
    return NextResponse.json({ error: message }, { status: isDbError ? 503 : 400 });
  }
}
