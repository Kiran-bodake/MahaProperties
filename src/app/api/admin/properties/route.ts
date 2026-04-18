import { NextResponse } from "next/server";

const properties = [
  { id: "P-001", title: "NA Plot Nashik", status: "Active" },
  { id: "P-002", title: "Commercial Space", status: "Booked" },
];

export async function GET() {
  return NextResponse.json({ properties });
}
