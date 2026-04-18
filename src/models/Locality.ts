import { Schema, model, models } from "mongoose";

const LocalitySchema = new Schema(
  {
    name:          { type: String, required: true, trim: true },
    slug:          { type: String, required: true, unique: true },
    city:          { type: String, default: "Nashik" },
    state:         { type: String, default: "Maharashtra" },
    rating:        { type: Number, default: 4.0 },
    propertyCount: { type: Number, default: 0 },
    lat:           Number,
    lng:           Number,
    description:   String,
    imageUrl:      String,
  },
  { timestamps: true }
);

export default models.Locality ?? model("Locality", LocalitySchema);
