import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/* =========================
   TOC Schema
========================= */

const TocSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

/* =========================
   Section Schema
========================= */

const SectionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },

    heading: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    imageAlt: {
      type: String,
      required: true,
    },

    paragraphs: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { _id: false }
);

/* =========================
   FAQ Schema
========================= */

const FaqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

/* =========================
   Conclusion Schema
========================= */

const ConclusionSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
      default: "Conclusion",
    },

    paragraphs: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { _id: false }
);

/* =========================
   SEO Schema
========================= */

const SeoSchema = new Schema(
  {
    metaTitle: {
      type: String,
      required: true,
    },

    metaDescription: {
      type: String,
      required: true,
    },

    keywords: [String],

    canonicalUrl: String,

    openGraph: {
      title: String,
      description: String,
      image: String,
    },

    twitter: {
      title: String,
      description: String,
      image: String,
    },
  },
  { _id: false }
);

/* =========================
   Author Schema
========================= */

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    avatar: String,

    role: String,
  },
  { _id: false }
);

/* =========================
   Featured Image Schema
========================= */

const FeaturedImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

/* =========================
   Post Schema
========================= */

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    excerpt: {
      type: String,
      required: true,
    },

    featuredImage: FeaturedImageSchema,

    author: AuthorSchema,

    category: {
      type: String,
      required: true,
      index: true,
    },
    categorySlug: String,

    categoryColor: String,

    tags: [String],

    published: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    readingTime: {
      type: Number,
      default: 1,
    },

    views: {
      type: Number,
      default: 0,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },

    toc: [TocSchema],

    sections: [SectionSchema],

    faq: [FaqSchema],

    conclusion: ConclusionSchema,

    relatedPosts: [String],

    seo: SeoSchema,
  },
  {
    timestamps: true,
  }
);





// ── Types ─────────────────────────────────────────────────────────────────────

export type PostDocument = InferSchemaType<typeof PostSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type PostModel = Model<PostDocument>;

// ── Safe model registration ───────────────────────────────────────────────────

export const Post =
  (mongoose.models.Post as PostModel | undefined) ??
  mongoose.model<PostDocument>("Post", PostSchema);
