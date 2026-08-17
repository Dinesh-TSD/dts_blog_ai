import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import { AiTool } from "../../models/ai-tool";

// ─── GET /api/ai-tools ───────────────────────────────────────────────────────
export async function GET() {
  try {
    await connectDB();
    const tools = await AiTool.find().sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: tools }, { status: 200 });
  } catch (error) {
    console.error("GET /api/ai-tools error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch AI tools" },
      { status: 500 },
    );
  }
}

// ─── POST /api/ai-tools  (seed sample data) ──────────────────────────────────
// Call once to populate DB: POST /api/ai-tools  { "seed": true }
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     if (!body.seed) {
//       return NextResponse.json(
//         { success: false, message: "Pass { seed: true } to seed sample data" },
//         { status: 400 },
//       );
//     }

//     await connectDB();

//     const sampleTools = [
//       {
//         id: "chatgpt",
//         order: 1,
//         name: "ChatGPT",
//         emoji: "🤖",
//         tagline: "Best AI Chatbot for Writing, Learning & Productivity",
//         website: "https://chatgpt.com",
//         websiteLabel: "chatgpt.com",
//         description:
//           "ChatGPT is an advanced AI chatbot developed by OpenAI. It can understand natural language and generate human-like responses, making it perfect for writing, brainstorming, coding, learning, and automating daily tasks.",
//         features: [
//           "Human-like conversations",
//           "Content generation & editing",
//           "Code writing & debugging",
//           "Supports plugins & GPTs",
//           "Image understanding (Vision)",
//           "Web browsing (with Bing)",
//           "Voice interaction",
//           "Custom GPT creation",
//         ],
//         pros: [
//           "Very easy to use",
//           "Great for writing & brainstorming",
//           "Saves a lot of time",
//           "Available on web, mobile & API",
//           "Regular updates & new features",
//         ],
//         cons: [
//           "Free version has usage limits",
//           "May give incorrect information",
//           "Internet connection required",
//           "Advanced features are paid",
//         ],
//         bestFor: [
//           { icon: "✏️", label: "Writers" },
//           { icon: "🎓", label: "Students" },
//           { icon: "</>", label: "Developers" },
//           { icon: "📢", label: "Marketers" },
//           { icon: "💼", label: "Business Owners" },
//         ],
//         useCases: [
//           { icon: "📝", text: "Write blogs, articles & emails" },
//           { icon: "🌍", text: "Translate languages" },
//           { icon: "📋", text: "Summarize long content" },
//           { icon: "💡", text: "Generate ideas & outlines" },
//           { icon: "🐛", text: "Solve coding problems" },
//           { icon: "📚", text: "Create study notes" },
//         ],
//       },
//       {
//         id: "claude",
//         order: 2,
//         name: "Claude",
//         emoji: "🧠",
//         tagline: "Best AI for Research, Analysis & Long Documents",
//         website: "https://claude.ai",
//         websiteLabel: "claude.ai",
//         description:
//           "Claude is an AI assistant built by Anthropic, known for its strong reasoning, safety, and ability to handle very long documents. It excels at research, analysis, summarization, and thoughtful writing.",
//         features: [
//           "200k token context window",
//           "Deep document analysis",
//           "Code generation",
//           "Nuanced writing",
//           "Strong reasoning",
//           "Safe & aligned responses",
//           "File & image uploads",
//           "API access",
//         ],
//         pros: [
//           "Handles very long documents",
//           "Excellent reasoning skills",
//           "More accurate than most models",
//           "Great for research tasks",
//           "Safety-focused responses",
//         ],
//         cons: [
//           "No internet browsing",
//           "Limited free usage",
//           "Less creative than ChatGPT",
//           "No image generation",
//         ],
//         bestFor: [
//           { icon: "🔬", label: "Researchers" },
//           { icon: "📖", label: "Readers" },
//           { icon: "</>", label: "Developers" },
//           { icon: "✏️", label: "Writers" },
//           { icon: "⚖️", label: "Legal Pros" },
//         ],
//         useCases: [
//           { icon: "📄", text: "Analyze long PDFs & docs" },
//           { icon: "🔍", text: "Deep research & summaries" },
//           { icon: "✍️", text: "Thoughtful long-form writing" },
//           { icon: "💡", text: "Complex problem solving" },
//           { icon: "🐛", text: "Code review & debugging" },
//           { icon: "📊", text: "Data analysis & reports" },
//         ],
//       },
//       {
//         id: "gemini",
//         order: 3,
//         name: "Gemini",
//         emoji: "✨",
//         tagline: "Best AI for Google Workspace & Multimodal Tasks",
//         website: "https://gemini.google.com",
//         websiteLabel: "gemini.google.com",
//         description:
//           "Gemini is Google's most capable AI model, deeply integrated with Google Search, Docs, Gmail, and other Google services. It excels at multimodal tasks including text, images, audio, and video understanding.",
//         features: [
//           "Google Search integration",
//           "Multimodal understanding",
//           "Google Workspace sync",
//           "Real-time information",
//           "Image & video analysis",
//           "Code generation",
//           "Voice interaction",
//           "Multi-language support",
//         ],
//         pros: [
//           "Free with generous limits",
//           "Real-time web access",
//           "Deep Google integration",
//           "Excellent multimodal skills",
//           "Fast response speed",
//         ],
//         cons: [
//           "Less accurate for niche tasks",
//           "Privacy concerns with Google",
//           "Advanced plan can be costly",
//           "Inconsistent with complex code",
//         ],
//         bestFor: [
//           { icon: "🔍", label: "Researchers" },
//           { icon: "📧", label: "Gmail Users" },
//           { icon: "📊", label: "Analysts" },
//           { icon: "🎨", label: "Creators" },
//           { icon: "💼", label: "Professionals" },
//         ],
//         useCases: [
//           { icon: "📧", text: "Draft & reply to emails" },
//           { icon: "🔍", text: "Search & summarize web info" },
//           { icon: "📊", text: "Analyze images & charts" },
//           { icon: "📝", text: "Write docs in Google Docs" },
//           { icon: "🌍", text: "Translate & localize content" },
//           { icon: "💡", text: "Brainstorm with real-time data" },
//         ],
//       },
//     ];

//     // Upsert each tool by its unique `id` field
//     const results = await Promise.all(
//       sampleTools.map((tool) =>
//         AiTool.findOneAndUpdate({ id: tool.id }, tool, {
//           upsert: true,
//           new: true,
//           setDefaultsOnInsert: true,
//         }),
//       ),
//     );

//     return NextResponse.json(
//       { success: true, message: `${results.length} tools seeded`, data: results },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("POST /api/ai-tools error:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to seed AI tools" },
//       { status: 500 },
//     );
//   }
// }
