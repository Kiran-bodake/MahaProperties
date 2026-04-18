import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { setupDatabase } from "@/lib/db-init";
import { verifyAccessToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await setupDatabase();
    const access = req.cookies.get("propvista-access-token")?.value;
    const payload = access ? verifyAccessToken(access) : null;
    if (payload) {
      const user = await User.findById(payload.sub);
      if (user) {
        user.refreshTokenHash = null;
        await user.save();
      }
    }
  } catch {
    // ignore
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: "propvista-access-token", value: "", maxAge: 0, path: "/" });
  res.cookies.set({ name: "propvista-refresh-token", value: "", maxAge: 0, path: "/" });
  return res;
}
