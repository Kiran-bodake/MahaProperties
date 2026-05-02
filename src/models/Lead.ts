import mongoose, { Schema } from "mongoose";

const LeadSchema = new Schema(
  {
    propertyId: {
      type: String,
      required: true,
    },

    propertyName: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    interest: {
      type: String,
      required: true,
    },

    whatsappConsent: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lead ||
  mongoose.model("Lead", LeadSchema);