import { NextRequest, NextResponse } from "next/server";
import { setupDatabase } from "@/lib/db-init";
import Lead from "@/models/Lead";
import { requireAdminUser } from "@/lib/admin-auth";

async function seedLeads() {
  const count = await Lead.countDocuments();
  if (count > 0) return;
  await Lead.create([
    { name: "Amit Sharma", source: "Google", status: "new", contact: "9420123456" },
    { name: "Priya Patil", source: "Referral", status: "contacted", contact: "9123456789" },
    { name: "Ramesh Gupta", source: "Website", status: "follow-up", contact: "9876543210" },
  ]);
}

export async function GET(req: NextRequest) {
  const auth = await requireAdminUser(req);
  if (auth instanceof NextResponse) {
    return auth;
  }
  await setupDatabase();
  await seedLeads();
  const leads = await Lead.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ leads });
}
