import { NextResponse } from "next/server";
import { resetPasswordWithToken } from "../../../lib/users.server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      token?: string;
      password?: string;
    };

    const token = body.token?.trim() ?? "";
    const password = body.password ?? "";

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and new password are required." },
        { status: 400 },
      );
    }

    await resetPasswordWithToken(token, password);

    return NextResponse.json({
      ok: true,
      message: "Password updated. You can sign in with your new password.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Password reset failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
