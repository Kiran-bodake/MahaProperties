import { Schema, model, models } from "mongoose";

const EnquirySchema = new Schema(
  {
    name:       { type: String, required: true, trim: true },
    phone:      { type: String, required: true },
    email:      String,
    propertyId: { type: Schema.Types.ObjectId, ref: "Property" },
    message:    String,
    source:     { type: String, default: "enquiry", enum: ["enquiry","ai-chat","callback","whatsapp"] },
    status:     { type: String, default: "new",     enum: ["new","contacted","converted","closed"] },
    isRead:     { type: Boolean, default: false },
    notes:      String,
  },
  { timestamps: true }
);

EnquirySchema.index({ status: 1, createdAt: -1 });

export default models.Enquiry ?? model("Enquiry", EnquirySchema);
