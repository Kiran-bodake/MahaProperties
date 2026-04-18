import { NextRequest, NextResponse } from "next/server";
import { setupDatabase } from "@/lib/db-init";
import User from "@/models/user";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";

async function initializeAdminUsers() {
  if (!process.env.ADMIN_SUPER_EMAIL || !process.env.ADMIN_SUPER_PASSWORD) return;
  const superEmail = process.env.ADMIN_SUPER_EMAIL.toLowerCase();
  const subEmail = process.env.ADMIN_SUB_EMAIL?.toLowerCase();

  const superAdmin = await User.findOne({ email: superEmail });
  if (!superAdmin) {
    await User.create({
      name: "Super Admin",
      email: superEmail,
      role: "super-admin",
      passwordHash: hashPassword(process.env.ADMIN_SUPER_PASSWORD),
      isVerified: true,
    });
  }

  if (subEmail && process.env.ADMIN_SUB_PASSWORD) {
    const subAdmin = await User.findOne({ email: subEmail });
    if (!subAdmin) {
      await User.create({
        name: "Sub Admin",
        email: subEmail,
        role: "admin",
        passwordHash: hashPassword(process.env.ADMIN_SUB_PASSWORD),
        isVerified: true,
      });
    }
  }
}

export async function POST(req: NextRequest) {
  const { email: e, password, securityCode } = await req.json();
  const email = String(e ?? "").toLowerCase().trim();

  if (!email || !password || !securityCode) {
    return NextResponse.json({ message: "Email, password and security code are required" }, { status: 400 });
  }

  await setupDatabase();
  await initializeAdminUsers();

  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  if (!verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const validCode = securityCode === process.env.ADMIN_SECURITY_CODE || securityCode === process.env.ADMIN_SUB_SECURITY_CODE;
  if (!validCode) {
    return NextResponse.json({ message: "Security code invalid" }, { status: 401 });
  }

  // assign strong JWT + refresh token from database
  const accessToken = signAccessToken(user._id.toString(), user.email, user.role);
  const { token: refreshToken, hash: refreshHash } = signRefreshToken();

  user.refreshTokenHash = refreshHash;
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
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return response;
}

