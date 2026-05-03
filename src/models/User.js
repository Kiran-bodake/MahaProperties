import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);