import mongoose from "mongoose";
import { readFileSync } from "fs";

function getMongoUri() {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.startsWith("MONGODB_URI=")) {
      continue;
    }
    let value = trimmed.slice("MONGODB_URI=".length).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    return value;
  }
  throw new Error("MONGODB_URI not found in .env.local");
}

const uri = getMongoUri();

console.log("Testing MongoDB connection...");
try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
  console.log("SUCCESS: MongoDB connected to", mongoose.connection.name);
  await mongoose.disconnect();
} catch (error) {
  console.error("FAILED:", error.message);
  process.exitCode = 1;
}
