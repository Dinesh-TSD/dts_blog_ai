import { NextResponse } from "next/server";
import { createPasswordResetToken } from "../../../lib/users.server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim() ?? "";

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const reset = await createPasswordResetToken(email);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    if (reset) {
      const resetLink = `${baseUrl}/reset-password?token=${reset.token}`;
      if (process.env.NODE_ENV !== "production") {
        console.log(`[Password reset] ${reset.user.email}: ${resetLink}`);
      }
      return NextResponse.json({
        ok: true,
        message:
          "If an account exists for that email, password reset instructions have been sent.",
        ...(process.env.NODE_ENV !== "production" ? { resetLink } : {}),
      });
    }

    return NextResponse.json({
      ok: true,
      message:
        "If an account exists for that email, password reset instructions have been sent.",
    });
  } catch {
    return NextResponse.json(
      { error: "Could not process reset request." },
      { status: 500 },
    );
  }
}
