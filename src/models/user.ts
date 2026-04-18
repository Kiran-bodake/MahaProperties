import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    phone:           { type: String, required: false, unique: true, sparse: true },
    name:            { type: String, trim: true },
    email:           { type: String, lowercase: true, unique: true, index: true },
    passwordHash:    { type: String },
    role:            { type: String, default: "user", enum: ["user","admin","super-admin"] },
    refreshTokenHash:{ type: String, default: null },
    savedProperties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
    isVerified:      { type: Boolean, default: false },
    otp:             String,
    otpExpiresAt:    Date,
  },
  { timestamps: true }
);

export default models.User ?? model("User", UserSchema);
