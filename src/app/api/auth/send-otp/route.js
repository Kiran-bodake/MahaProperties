import { connectDB } from "@/lib/db";
import Otp from "@/models/Otp";

export async function POST(req) {
  const { phone } = await req.json();

  await connectDB();

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.findOneAndUpdate(
    { phone },
    { otp, expiresAt },
    { upsert: true }
  );

  console.log("OTP:", otp); // 👈 check terminal

  return Response.json({ message: "OTP sent", otp });
}