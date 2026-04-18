import { NextRequest, NextResponse } from "next/server";
import { setupDatabase } from "@/lib/db-init";
import Task from "@/models/Task";
import { requireAdminUser } from "@/lib/admin-auth";

async function seedTasks() {
  const count = await Task.countDocuments();
  if (count > 0) return;
  await Task.create([
    { title: "Call lead Amit", dueDate: new Date("2026-03-17"), completed: false, owner: "hashkishor@gmail.com" },
    { title: "Update property list", dueDate: new Date("2026-03-18"), completed: false, owner: "pritee@mahaproperties.in" },
  ]);
}

export async function GET(req: NextRequest) {
  const auth = await requireAdminUser(req);
  if (auth instanceof NextResponse) {
    return auth;
  }

  await setupDatabase();
  await seedTasks();
  const tasks = await Task.find().sort({ dueDate: 1 }).lean();
  return NextResponse.json({ tasks });
}
