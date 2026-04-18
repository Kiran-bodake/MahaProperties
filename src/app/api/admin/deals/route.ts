import { NextRequest, NextResponse } from "next/server";
import { setupDatabase } from "@/lib/db-init";
import Deal from "@/models/Deal";
import { requireAdminUser } from "@/lib/admin-auth";

async function seedDeals() {
  const count = await Deal.countDocuments();
  if (count > 0) return;
  await Deal.create([
    { title: "Office lease", status: "negotiation", value: 7500000 },
    { title: "Plot sale", status: "closed", value: 3200000 },
  ]);
}

export async function GET(req: NextRequest) {
  const auth = await requireAdminUser(req);
  if (auth instanceof NextResponse) {
    return auth;
  }

  await setupDatabase();
  await seedDeals();

  const deals = await Deal.find().sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ deals });
}
