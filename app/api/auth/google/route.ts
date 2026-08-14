import { NextResponse } from "next/server";
import { jsonWithAuth } from "../../../lib/auth-cookie.server";
import { toPublicUser, upsertGoogleUser } from "../../../lib/users.server";

type GoogleTokenPayload = {
  email?: string;
  name?: string;
  picture?: string;
  aud?: string;
  email_verified?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { credential?: string };
    const credential = body.credential?.trim();

    if (!credential) {
      return NextResponse.json({ error: "Missing credential" }, { status: 400 });
    }

    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`,
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Invalid Google token" }, { status: 401 });
    }

    const payload = (await response.json()) as GoogleTokenPayload;
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (clientId && payload.aud !== clientId) {
      return NextResponse.json({ error: "Token audience mismatch" }, { status: 401 });
    }

    if (!payload.email || payload.email_verified !== "true") {
      return NextResponse.json(
        { error: "Google email not verified" },
        { status: 401 },
      );
    }

    const user = await upsertGoogleUser({
      email: payload.email,
      name: payload.name ?? payload.email.split("@")[0],
      picture: payload.picture,
    });

    const publicUser = toPublicUser(user);
    return jsonWithAuth({ ok: true, profile: publicUser }, publicUser);
  } catch {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
