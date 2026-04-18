import { Schema, model, models } from "mongoose";

const DealSchema = new Schema(
  {
    title:    { type: String, required: true, index: true },
    value:    { type: Number, default: 0 },
    status:   { type: String, default: "open", index: true },
    lead:     { type: Schema.Types.ObjectId, ref: "Lead", index: true },
    owner:    { type: String, index: true },
  },
  { timestamps: true }
);

export default models.Deal ?? model("Deal", DealSchema);
