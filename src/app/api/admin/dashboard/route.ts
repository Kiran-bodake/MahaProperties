import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Deal from "@/models/Deal";
import Task from "@/models/Task";
import { requireAdminUser } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAdminUser(req);
  if (auth instanceof NextResponse) {
    return auth;
  }

  await connectDB();

  const [leadsCount, dealsCount, tasksCount] = await Promise.all([
    Lead.countDocuments(),
    Deal.countDocuments(),
    Task.countDocuments(),
  ]);

  return NextResponse.json({ leadsCount, dealsCount, tasksCount, featureCards: [
    { title: "Automated pipeline", desc: "Drag & drop stages with smart transitions" },
    { title: "AI-powered insights", desc: "AI suggestions and source attribution" },
    { title: "Custom columns", desc: "Save column views, show/hide, reorder" },
    { title: "Google integration", desc: "Analytics + email + meetings sync" },
  ] });
}