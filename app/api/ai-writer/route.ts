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

  return jsonPrompt(`
    Write a complete blog article about "${keyword}" using this outline:
    ${(body.outline ?? []).join(" | ")}

    Use a ${body.tone ?? "Practical"} tone and target approximately ${body.wordCount ?? 1800} words.
    Return JSON only and always use this exact post shape.
    Use regular JSON numbers, not NumberInt or ObjectId:

    {
      "title": "...",
      "slug": "...",
      "excerpt": "...",
      "featuredImage": { "url": "...", "alt": "..." },
      "author": {
        "name": "Dinesh T",
        "avatar": "/authors/dinesh.jpg",
        "role": "AI Content Lead"
      },
      "category": "${body.category ?? "General"}",
      "categorySlug": "...",
      "categoryColor": "#10B981",
      "tags": ["..."],
      "published": true,
      "featured": false,
      "readingTime": 8,
      "views": 0,
      "publishedAt": "${new Date().toISOString()}",
      "tableOfContents": [{ "id": "...", "title": "..." }],
      "sections": [{
        "id": "...",
        "heading": "...",
        "image": "...",
        "imageAlt": "...",
        "paragraph": "...",
        "points": ["..."]
      }],
      "faq": [{ "question": "...", "answer": "..." }],
      "conclusion": {
        "heading": "Conclusion",
        "paragraphs": ["..."]
      },
      "relatedPosts": ["..."],
      "seo": {
        "metaTitle": "...",
        "metaDescription": "...",
        "keywords": ["..."],
        "canonicalUrl": "...",
        "openGraph": {
          "title": "...",
          "description": "...",
          "image": "..."
        },
        "twitter": {
          "title": "...",
          "description": "...",
          "image": "..."
        }
      }
    }

    Include all requested fields, create one section for each outline item,
    and write substantive paragraphs and points. Do not include markdown fences,
    NumberInt, ObjectId, or unsupported facts.
  `);
}

function getText(response: { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }) {
  const text = response.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim() ?? "";
  const unfencedText = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  const jsonStart = unfencedText.indexOf("{");
  const jsonEnd = unfencedText.lastIndexOf("}");
  return jsonStart >= 0 && jsonEnd > jsonStart
    ? unfencedText.slice(jsonStart, jsonEnd + 1)
    : unfencedText;
}

function isGeneratedPost(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") return false;
  const post = value as Record<string, unknown>;
  const sections = post.sections;

  const hasLegacyContent = typeof post.content === "string" && post.content.trim().length > 0;

  return typeof post.title === "string" && typeof post.excerpt === "string" && (hasLegacyContent || (Array.isArray(sections) && sections.length > 0 && sections.every((section) => {
    if (!section || typeof section !== "object") return false;
    const item = section as Record<string, unknown>;
    return typeof item.heading === "string" && (typeof item.paragraph === "string" || Array.isArray(item.paragraphs));
  }))); 
}

function normalizeGeneratedPost(value: Record<string, unknown>, body: WriterRequest) {
  const rawSections = Array.isArray(value.sections)
    ? value.sections as Array<Record<string, unknown>>
    : [{ heading: "Article", paragraph: value.content, points: [] }];
  const sections = rawSections.map((section, index) => ({
    id: typeof section.id === "string" ? section.id : `section-${index + 1}`,
    heading: section.heading,
    image: typeof section.image === "string" ? section.image : "",
    imageAlt: typeof section.imageAlt === "string" ? section.imageAlt : section.heading,
    paragraph: typeof section.paragraph === "string"
      ? section.paragraph
      : Array.isArray(section.paragraphs)
        ? section.paragraphs.filter((paragraph): paragraph is string => typeof paragraph === "string").join("\n\n")
        : "",
    points: Array.isArray(section.points)
      ? section.points.filter((point): point is string => typeof point === "string")
      : [],
  }));

  return {
    ...value,
    slug: typeof value.slug === "string" ? value.slug : body.keyword?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    sections,
    featuredImage: featuredImageObject(value.featuredImage) ? value.featuredImage : { url: "", alt: value.title },
    author: typeof value.author === "object" && value.author !== null ? value.author : { name: "Dinesh T", avatar: "/authors/dinesh.jpg", role: "AI Content Lead" },
    category: typeof value.category === "string" ? value.category : "General",
    categorySlug: typeof value.categorySlug === "string" ? value.categorySlug : "general",
    categoryColor: typeof value.categoryColor === "string" ? value.categoryColor : "#10B981",
    tags: Array.isArray(value.tags) ? value.tags.filter((tag): tag is string => typeof tag === "string") : [],
    published: typeof value.published === "boolean" ? value.published : false,
    featured: typeof value.featured === "boolean" ? value.featured : false,
    readingTime: typeof value.readingTime === "number" ? value.readingTime : 1,
    views: typeof value.views === "number" ? value.views : 0,
    publishedAt: typeof value.publishedAt === "string" ? value.publishedAt : new Date().toISOString(),
    tableOfContents: Array.isArray(value.tableOfContents) ? value.tableOfContents : sections.map(({ id, heading }) => ({ id, title: heading })),
    faq: Array.isArray(value.faq) ? value.faq : [],
    conclusion: typeof conclusionObject(value.conclusion) ? value.conclusion : { heading: "Conclusion", paragraphs: [] },
    relatedPosts: Array.isArray(value.relatedPosts) ? value.relatedPosts : [],
    seo: typeof value.seo === "object" && value.seo !== null ? value.seo : {},
  };
}

function featuredImageObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function conclusionObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
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

    const result = JSON.parse(getText(await geminiResponse.json())) as unknown;
    if (body.action === "content") {
      if (!isGeneratedPost(result)) {
        return NextResponse.json({ message: "Gemini returned an invalid post structure" }, { status: 502 });
      }
     
      return NextResponse.json({ result: normalizeGeneratedPost(result, body) });
    }
    return NextResponse.json({ result });
  } catch (error) {
    console.error("POST /api/ai-writer error:", error);
    return NextResponse.json({ message: "Failed to generate writer result" }, { status: 502 });
  }
}