import connectDB from "@/lib/mongodb";

let changeStream: { close: () => Promise<void> } | null = null;

export async function startLeadChangeStream() {
  const conn = await connectDB();
  const db = conn?.connection?.db;
  if (!db) {
    console.warn("Skipping change stream: database instance unavailable.");
    return;
  }

  if (changeStream) return;

  // MongoDB change streams require a replica set or sharded cluster.
  // Skip this for local standalone DB and continue safely.
  try {
    const info = await db.admin().command({ isMaster: 1 });
    if (!info.setName) {
      console.warn("Skipping change stream: MongoDB is not a replica set (setName missing).");
      return;
    }
  } catch (err) {
    console.warn("Skipping change stream: admin command failed", err);
    return;
  }

  const stream = db.collection("leads").watch();
  changeStream = stream;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stream.on("change", (event: any) => {
    // App-specific trigger-like logic
    console.log("Lead collection changed", event.operationType, event.documentKey || null);
  });
}


export async function stopLeadChangeStream() {
  if (changeStream) {
    await changeStream.close();
    changeStream = null;
  }
}
