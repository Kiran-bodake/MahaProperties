import { NextRequest, NextResponse } from "next/server";
import { setupDatabase } from "@/lib/db-init";
import User from "@/models/user";
import { hashToken, verifyAccessToken, signAccessToken, signRefreshToken } from "@/lib/jwt";

const openPaths = ["/x-admin/login", "/x-admin/logout", "/x-admin/assets", "/x-admin/auth/refresh", "/x-admin/auth/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/x-admin") || openPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("propvista-access-token")?.value;
  if (accessToken && verifyAccessToken(accessToken)) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get("propvista-refresh-token")?.value;
  if (refreshToken) {
    try {
      await setupDatabase();
      const user = await User.findOne({ refreshTokenHash: hashToken(refreshToken) });
      if (user) {
        const newAccessToken = signAccessToken(user._id.toString(), user.email, user.role);
        const { token: newRefreshToken, hash: newRefreshHash } = signRefreshToken();
        user.refreshTokenHash = newRefreshHash;
        await user.save();

        const response = NextResponse.next();
        response.cookies.set({
          name: "propvista-access-token",
          value: newAccessToken,
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
    } catch (error) {
      console.warn("Middleware refresh failed", error);
    }
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  return NextResponse.redirect(new URL("/x-admin/login", req.url));
}

export const config = { matcher: ["/x-admin/:path*"] };
