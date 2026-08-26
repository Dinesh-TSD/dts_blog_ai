import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, verifyAuthToken } from "../../lib/jwt.server";

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-3.6-flash";
const MAX_INPUT_LENGTH = 500;

type WriterAction = "research" | "outline" | "content";

type WriterRequest = {
  action?: WriterAction;
  keyword?: string;
  outline?: string[];
  category?: string;
  tone?: string;
  wordCount?: number;
};

function isWriterAction(action: unknown): action is WriterAction {
  return action === "research" || action === "outline" || action === "content";
}

function jsonPrompt(prompt: string) {
  return {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
    },
  };
}

function promptFor(body: WriterRequest) {
  const keyword = body.keyword?.trim() ?? "";

  if (body.action === "research") {
    return jsonPrompt(`Research the blog topic "${keyword}" for a content writer. Return JSON only with this shape: {"intent":"informational|commercial|transactional|navigational","relatedKeywords":["..."],"longTailKeywords":["..."]}. Do not invent search volume, CPC, or keyword difficulty numbers.`);
  }

  if (body.action === "outline") {
    return jsonPrompt(`Create a useful blog outline for the topic "${keyword}". Category: ${body.category ?? "General"}. Tone: ${body.tone ?? "Practical"}. Target length: ${body.wordCount ?? 1800} words. Return JSON only with this shape: {"outline":["Introduction", "...", "Conclusion"]}. Use 5 to 9 specific section titles.`);
  }

  return jsonPrompt(`Write a complete blog article about "${keyword}" using this outline: ${(body.outline ?? []).join(" | ")}. Use a ${body.tone ?? "Practical"} tone and target approximately ${body.wordCount ?? 1800} words. Return JSON only with this shape: {"title":"...","excerpt":"...","content":"..."}. Use plain text with paragraph breaks in content. Do not include markdown fences or claim unsupported facts.`);
}

function getText(response: { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }) {
  return response.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim() ?? "";
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token || !(await verifyAuthToken(token))) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: "GEMINI_API_KEY is not configured" }, { status: 503 });
  }

  let body: WriterRequest;
  try {
    body = (await request.json()) as WriterRequest;
  } catch {
    return NextResponse.json({ message: "Invalid JSON request" }, { status: 400 });
  }

  if (!isWriterAction(body.action) || !body.keyword?.trim() || body.keyword.length > MAX_INPUT_LENGTH) {
    return NextResponse.json({ message: "A valid action and keyword are required" }, { status: 400 });
  }

  if (body.action === "content" && (!body.outline?.length || body.outline.join(" ").length > 3000)) {
    return NextResponse.json({ message: "A valid outline is required" }, { status: 400 });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promptFor(body)),
      },
    );

    if (!geminiResponse.ok) {
      console.error("Gemini API error:", await geminiResponse.text());
      return NextResponse.json({ message: "Gemini could not generate this result" }, { status: 502 });
    }

    const result = JSON.parse(getText(await geminiResponse.json()));
    return NextResponse.json({ result });
  } catch (error) {
    console.error("POST /api/ai-writer error:", error);
    return NextResponse.json({ message: "Failed to generate writer result" }, { status: 502 });
  }
}