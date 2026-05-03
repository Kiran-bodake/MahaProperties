import { connectDB } from "@/lib/db";
import Otp from "@/models/Otp";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { phone, otp } = await req.json();

  await connectDB();

  const record = await Otp.findOne({ phone });

  if (!record) {
    return Response.json({ error: "OTP not found" }, { status: 400 });
  }

  if (record.otp !== otp) {
    return Response.json({ error: "Wrong OTP" }, { status: 400 });
  }

  if (record.expiresAt < new Date()) {
    return Response.json({ error: "OTP expired" }, { status: 400 });
  }

  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({ phone });
  }

  await Otp.deleteOne({ phone });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return Response.json({ message: "Login success", token });
}