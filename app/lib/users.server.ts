import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectDB } from "./mongodb";
import { User, type UserDocument } from "../models/user";

export type StoredUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string | null;
  provider: "email" | "google";
  picture?: string;
  resetTokenHash?: string;
  resetTokenExpiry?: number;
  createdAt: number;
};

function mapUser(user: UserDocument): StoredUser {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    passwordHash: user.passwordHash ?? null,
    provider: user.provider,
    picture: user.picture,
    resetTokenHash: user.resetTokenHash,
    resetTokenExpiry: user.resetTokenExpiry?.getTime(),
    createdAt: user.createdAt.getTime(),
  };
}

export async function findUserByEmail(email: string) {
  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase() });
  return user ? mapUser(user) : null;
}

export async function createEmailUser(input: {
  email: string;
  name: string;
  password: string;
}) {
  await connectDB();

  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  if (!name) throw new Error("Name is required");
  if (input.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("An account with this email already exists");
  }

  try {
    const user = await User.create({
      email,
      name,
      passwordHash: await bcrypt.hash(input.password, 12),
      provider: "email",
    });

    return mapUser(user);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      throw new Error("An account with this email already exists");
    }
    throw error;
  }
}

export async function verifyEmailPassword(email: string, password: string) {
  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user?.passwordHash) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? mapUser(user) : null;
}

export async function upsertGoogleUser(input: {
  email: string;
  name: string;
  picture?: string;
}) {
  await connectDB();

  const email = input.email.trim().toLowerCase();
  const user = await User.findOneAndUpdate(
    { email },
    {
      email,
      name: input.name,
      picture: input.picture,
      provider: "google",
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  return mapUser(user);
}

export async function createPasswordResetToken(email: string) {
  await connectDB();

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user?.passwordHash) return null;

  const token = crypto.randomBytes(32).toString("hex");
  user.resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");
  user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  return { user: mapUser(user), token };
}

export async function resetPasswordWithToken(token: string, newPassword: string) {
  if (newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  await connectDB();

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetTokenHash: tokenHash,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!user) throw new Error("Invalid or expired reset link");

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  user.resetTokenHash = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return mapUser(user);
}

export function toPublicUser(user: StoredUser) {
  return {
    email: user.email,
    name: user.name,
    picture: user.picture,
    provider: user.provider,
  };
}
