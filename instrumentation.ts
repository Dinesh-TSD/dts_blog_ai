export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const port = process.env.PORT ?? "3000";
  console.log(`Server running on port ${port} successfully`);

  try {
    const { connectDB } = await import("./app/lib/mongodb");
    await connectDB();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("MongoDB connection failed:", message);
  }
}
