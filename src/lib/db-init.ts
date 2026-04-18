import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import Lead from "@/models/Lead";
import Deal from "@/models/Deal";
import Task from "@/models/Task";

export async function setupDatabase() {
  await connectDB();

  // enforce indexes
  await Promise.all([
    User.createIndexes(),
    Lead.createIndexes(),
    Deal.createIndexes(),
    Task.createIndexes(),
  ]);

  const conn = await connectDB();
  const db = conn?.connection?.db;
  if (!db) {
    throw new Error("Unable to access MongoDB database instance.");
  }

  const collections = await db.listCollections({ name: "vw_leads_by_source" }).toArray();
  if (collections.length === 0) {
    await db.createCollection("vw_leads_by_source", {
      viewOn: "leads",
      pipeline: [
        { $group: { _id: "$source", count: { $sum: 1 } } },
        { $project: { source: "$_id", count: 1, _id: 0 } },
      ],
    });
  }

  // Start lead change stream as a trigger-like watcher.
  try {
    const { startLeadChangeStream } = await import("@/lib/db-triggers");
    await startLeadChangeStream();
  } catch (error) {
    console.warn("Change stream not started (environment may not support it):", error);
  }

  return { status: "ok" };
}
