import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      enum: ["email", "google"],
      required: true,
    },
    picture: {
      type: String,
    },
    resetTokenHash: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type UserModel = Model<UserDocument>;

export const User =
  (mongoose.models.User as UserModel | undefined) ??
  mongoose.model<UserDocument>("User", userSchema);
