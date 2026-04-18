import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title:    { type: String, required: true, index: true },
    dueDate:  { type: Date, index: true },
    completed:{ type: Boolean, default: false, index: true },
    owner:    { type: String, index: true },
    relation: { type: String, enum: ["lead","deal","customer"], default: "lead", index: true },
  },
  { timestamps: true }
);

export default models.Task ?? model("Task", TaskSchema);
