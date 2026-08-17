import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

// ── Sub-schemas ───────────────────────────────────────────────────────────────

const tocItemSchema = new Schema(
  {
    id:    { type: String, required: true },
    title: { type: String, required: true },
    level: { type: Number, required: true },
  },
  { _id: false },
);

const sectionSchema = new Schema(
  {
    heading:    { type: String },
    paragraphs: { type: [String], required: true, default: [] },
    list:       { type: [String], default: [] },
    image:      { type: String },
    imageCaption: { type: String },
  },
  { _id: false },
);

// ── Main Post schema ──────────────────────────────────────────────────────────

const postSchema = new Schema(
  {
    // ── Article (listing) fields ─────────────────────────────────────────────
    slug:          { type: String, required: true, unique: true, trim: true, index: true },
    title:         { type: String, required: true, trim: true },
    excerpt:       { type: String, required: true },
    category:      { type: String, required: true },
    categoryColor: { type: String, required: true },
    categorySlug:  { type: String, required: true, index: true },
    date:          { type: String, required: true },
    readTime:      { type: String, required: true },
    readMinutes:   { type: Number, required: true },
    popular:       { type: Boolean, default: false },
    image:         { type: String, required: true },
    imageAlt:      { type: String, required: true },

    // ── ArticleContent (detail) fields ───────────────────────────────────────
    author:           { type: String, required: true },
    authorRole:       { type: String, required: true },
    tags:             { type: [String], default: [] },
    tableOfContents:  { type: [tocItemSchema], default: [] },
    sections:         { type: [sectionSchema], default: [] },

    // ── Status ───────────────────────────────────────────────────────────────
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// ── Types ─────────────────────────────────────────────────────────────────────

export type PostDocument = InferSchemaType<typeof postSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type PostModel = Model<PostDocument>;

// ── Safe model registration ───────────────────────────────────────────────────

export const Post =
  (mongoose.models.Post as PostModel | undefined) ??
  mongoose.model<PostDocument>("Post", postSchema);
