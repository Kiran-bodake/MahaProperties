import { Schema, model, models } from "mongoose";

const AIConversationSchema = new Schema(
  {
    sessionId:    { type: String, required: true, unique: true },
    userId:       String,
    phone:        String,
    messages: [{
      role:      { type: String, enum: ["user","assistant"], required: true },
      content:   { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    }],
    leadCaptured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

AIConversationSchema.index({ sessionId: 1 });

export default models.AIConversation ?? model("AIConversation", AIConversationSchema);
