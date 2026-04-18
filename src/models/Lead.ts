import { Schema, model, models } from "mongoose";

const LeadSchema = new Schema(
  {
    name:       { type: String, required: true, index: true },
    source:     { type: String, default: "website", index: true },
    status:     { type: String, default: "new", index: true },
    assignedTo: { type: String, default: "unassigned", index: true },
    stage:      { type: String, default: "prospect", index: true },
    contact:    { type: String },
    email:      { type: String, lowercase: true, index: true },
    properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  { timestamps: true }
);

LeadSchema.statics.getSourceSummary = async function() {
  return this.aggregate([
    { $group: { _id: "$source", count: { $sum: 1 } } },
    { $project: { source: "$_id", count: 1, _id: 0 } },
  ]);
};

LeadSchema.statics.getStatusFlow = async function() {
  return this.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
    { $project: { status: "$_id", count: 1, _id: 0 } },
  ]);
};

export default models.Lead ?? model("Lead", LeadSchema);
