import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    title:              { type: String, required: true, trim: true },
    slug:               { type: String, required: true, unique: true, lowercase: true },
    category:           { type: String, required: true, enum: ["agriculture","na-plot","commercial","commercial-land","industrial-shed","warehouse","residential"] },
    status:             { type: String, default: "available", enum: ["available","sold","under-negotiation"] },
    constructionStatus: { type: String, default: "ready",     enum: ["ready","under-construction","new-launch"] },
    price:              { type: Number, required: true },
    priceMin:           Number,
    priceMax:           Number,
    pricePerUnit:       Number,
    area:               { type: Number, required: true },
    areaUnit:           { type: String, default: "sqft" },
    locality:           { type: String, required: true, trim: true },
    city:               { type: String, default: "Nashik" },
    state:              { type: String, default: "Maharashtra" },
    pincode:            String,
    lat:                Number,
    lng:                Number,
    description:        { type: String, default: "" },
    images: [{ url: { type: String, required: true }, caption: String, isPrimary: { type: Boolean, default: false } }],
    highlights:      [String],
    amenities:       [String],
    isRERA:          { type: Boolean, default: false },
    reraNumber:      String,
    isFeatured:      { type: Boolean, default: false },
    isZeroBrokerage: { type: Boolean, default: false },
    postedBy:        { type: String, default: "dealer" },
    agentName:       { type: String, default: "" },
    agentPhone:      String,
    agentId:         { type: Schema.Types.ObjectId, ref: "User" },
    views:           { type: Number, default: 0 },
    savedCount:      { type: Number, default: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

PropertySchema.index({ city: 1, locality: 1, price: 1, category: 1 });
PropertySchema.index({ isFeatured: -1, createdAt: -1 });
PropertySchema.index({ title: "text", description: "text", locality: "text" });

export default models.Property ?? model("Property", PropertySchema);
