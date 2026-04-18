import { NextResponse } from "next/server";

const enquiries = [
  { id: "E-001", name: "Rohit", property: "NA Plot Nashik", status: "New" },
  { id: "E-002", name: "Sneha", property: "Commercial Space", status: "Contacted" },
];

export async function GET() {
  return NextResponse.json({ enquiries });
}
