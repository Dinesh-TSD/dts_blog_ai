import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import { Post } from "../../../models/post";

type Params = { params: Promise<{ slug: string }> };

// ─── GET /api/posts/[slug] ────────────────────────────────────────────────────
export async function GET(_request: Request, { params }: Params) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug is required" },
        { status: 400 },
      );
    }

    await connectDB();

    const post = await Post.findOne({ slug }).lean();

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error) {
    console.error("GET /api/posts/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch post" },
      { status: 500 },
    );
  }
}

// ─── PATCH /api/posts/[slug] ──────────────────────────────────────────────────
// Update any fields of a post by slug.
export async function PATCH(request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // Protect slug from being overwritten
    delete body.slug;

    await connectDB();

    const updated = await Post.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true },
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/posts/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update post" },
      { status: 500 },
    );
  }
}

// ─── DELETE /api/posts/[slug] ─────────────────────────────────────────────────
// Soft-delete: sets published = false
export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { slug } = await params;

    await connectDB();

    const deleted = await Post.findOneAndUpdate(
      { slug },
      { $set: { published: false } },
      { new: true },
    ).lean();

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Post unpublished" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /api/posts/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete post" },
      { status: 500 },
    );
  }
}
