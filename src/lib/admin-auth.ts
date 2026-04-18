import { NextRequest, NextResponse } from "next/server";
import { setupDatabase } from "@/lib/db-init";
import User from "@/models/user";
import { verifyAccessToken } from "@/lib/jwt";

export async function requireAdminUser(req: NextRequest, allowedRoles: string[] = ["admin", "super-admin"]) {
  await setupDatabase();
  const access = req.cookies.get("propvista-access-token")?.value;
  if (!access) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyAccessToken(access);
  if (!payload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(payload.sub);
  if (!user || !allowedRoles.includes(user.role)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  return user;
}
