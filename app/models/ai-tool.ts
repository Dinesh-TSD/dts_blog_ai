import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const bestForSchema = new Schema(
  {
    icon: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false },
);

const useCaseSchema = new Schema(
  {
    icon: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false },
);

const aiToolSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    emoji: { type: String, required: true },
    tagline: { type: String, required: true },
    website: { type: String, required: true },
    websiteLabel: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], required: true },
    pros: { type: [String], required: true },
    cons: { type: [String], required: true },
    bestFor: { type: [bestForSchema], required: true },
    useCases: { type: [useCaseSchema], required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type AiToolDocument = InferSchemaType<typeof aiToolSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type AiToolModel = Model<AiToolDocument>;

export const AiTool =
  (mongoose.models.AiTool as AiToolModel | undefined) ??
  mongoose.model<AiToolDocument>("AiTool", aiToolSchema);
