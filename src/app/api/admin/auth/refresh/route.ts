import { NextRequest, NextResponse } from "next/server";
import { setupDatabase } from "@/lib/db-init";
import User from "@/models/user";
import { hashToken, signAccessToken, signRefreshToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  await setupDatabase();

  const refreshToken = req.cookies.get("propvista-refresh-token")?.value;
  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  const user = await User.findOne({ refreshTokenHash: hashToken(refreshToken) });
  if (!user) {
    return NextResponse.json({ message: "Invalid or expired refresh token" }, { status: 401 });
  }

  const accessToken = signAccessToken(user._id.toString(), user.email, user.role);
  const { token: newRefreshToken, hash: newRefreshHash } = signRefreshToken();

  user.refreshTokenHash = newRefreshHash;
  await user.save();

  const response = NextResponse.json({ ok: true, role: user.role, email: user.email, name: user.name });
  response.cookies.set({
    name: "propvista-access-token",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });
  response.cookies.set({
    name: "propvista-refresh-token",
    value: newRefreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return response;
}
