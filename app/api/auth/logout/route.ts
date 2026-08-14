import { NextResponse } from "next/server";
import { jsonLogout } from "../../../lib/auth-cookie.server";

export async function POST() {
  return jsonLogout();
}
