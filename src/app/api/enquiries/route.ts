import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/enquiry";
import { leadSchema } from "@/lib/validations";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    await connectDB();
    const enquiries = await Enquiry.find().populate("propertyId", "title slug").sort({ createdAt: -1 }).limit(100).lean();
    return NextResponse.json(enquiries);
  } catch (e) {
    logger.error("GET /api/enquiries", e);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const parsed = leadSchema.parse(await req.json());
    const enquiry = await Enquiry.create(parsed);
    return NextResponse.json({ success: true, id: enquiry._id }, { status: 201 });
  } catch (e) {
    logger.error("POST /api/enquiries", e);
    return NextResponse.json({ error: "Failed to save" }, { status: 400 });
  }
}
