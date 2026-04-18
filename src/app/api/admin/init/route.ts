import { NextResponse } from "next/server";
import { setupDatabase } from "@/lib/db-init";

export async function POST(req: Request) {
  const payload = await req.json().catch(() => ({}));
  if (payload.secret !== process.env.ADMIN_INIT_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await setupDatabase();
  return NextResponse.json({ ok: true, result });
}
