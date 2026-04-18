import { NextResponse } from "next/server";

export async function GET() {
  // TODO: integrate real Google OAuth using next-auth or manual OAuth flow.
  return NextResponse.json({ message: "Google OAuth is not yet fully implemented. Add client id/secret in .env" });
}
