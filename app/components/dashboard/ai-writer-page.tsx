"use client";

import { useState } from "react";
import { btnSecondary } from "../../lib/dashboard";
import { ContentStep } from "./ai-writer/content-step";
import { ImagesStep } from "./ai-writer/images-step";
import { OutlineStep } from "./ai-writer/outline-step";
import { PreviewStep } from "./ai-writer/preview-step";
import { PublishStep } from "./ai-writer/publish-step";
import { ResearchStep } from "./ai-writer/research-step";

export type GeneratedWriterPost = {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: { url: string; alt: string };
  author: { name: string; avatar?: string; role?: string };
  category: string;
  categorySlug: string;
  categoryColor: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  readingTime: number;
  views: number;
  publishedAt: string;
  tableOfContents: Array<{ id: string; title: string }>;
  sections: Array<{ id: string; heading: string; image?: string; imageAlt?: string; paragraph: string; points: string[] }>;
  faq: Array<{ question: string; answer: string }>;
  conclusion: { heading: string; paragraphs: string[] };
  relatedPosts: string[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
    openGraph?: { title?: string; description?: string; image?: string };
    twitter?: { title?: string; description?: string; image?: string };
  };
};

export type WriterData = {
  keyword: string;
  outline: string[];
  title: string;
  excerpt: string;
  content: string;
  imageUrls: string[];
  post: GeneratedWriterPost | null;
};

export type WriterAction = "research" | "outline" | "content";
export type WriterGenerate = (
  action: WriterAction,
  payload: Record<string, unknown>,
) => Promise<Record<string, unknown>>;

const steps = ["Research", "Outline", "Content", "Images", "Preview & Publish"];

export function AiWriterPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [data, setData] = useState<WriterData>({
    keyword: "",
    outline: [],
    title: "",
    excerpt: "",
    content: "",
    imageUrls: [],
    post: null,
  });

  const completeStep = (step: number) => {
    setCompleted((current) =>
      current.map((value, index) => (index === step ? true : value)),
    );
    if (step < steps.length - 1) {
      setActiveStep(step + 1);
    }
  };

  const updateData = (updates: Partial<WriterData>) => {
    setData((current) => ({ ...current, ...updates }));
  };

  const generateWriter: WriterGenerate = async (action, payload) => {
    const response = await fetch("/api/ai-writer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...payload }),
    });
    const body = (await response.json()) as { result?: Record<string, unknown>; message?: string };
    if (!response.ok || !body.result) {
      throw new Error(body.message ?? "Generation failed");
    }
    console.log("AI Writer result:", body.result);
    return body.result;
  };

  const handlePublishSuccess = (postId: string, postSlug: string) => {
    console.log("Article published successfully:", postId, postSlug);
    completeStep(4);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6">
        <p className="text-sm font-medium text-[var(--accent-purple)]">AI Writer</p>
        <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">Create an article</h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Build, refine, and publish a complete article in five guided steps.</p>
          </div>
          <span className="text-sm font-semibold text-[var(--text-secondary)]">
            {Math.round((completed.filter(Boolean).length / steps.length) * 100)}%
            complete
          </span>
        </div>
      </header>

      <nav
        className="sticky top-[61px] z-20 mb-6 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--nav-bg)] p-2 backdrop-blur-[5px]"
        aria-label="Article workflow"
      >
        <ol className="flex min-w-[680px] items-center">
          {steps.map((label, index) => {
            const available = index === 0 || completed[index - 1];
            return (
              <li key={label} className="flex flex-1 items-center">
                <button
                  type="button"
                  disabled={!available}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors ${activeStep === index ? "bg-[var(--accent-purple)] text-white" : completed[index] ? "text-emerald-400" : "text-[var(--text-secondary)] disabled:cursor-not-allowed"}`}
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-[11px] ${completed[index] ? "border-emerald-400 bg-emerald-400 text-slate-950" : activeStep === index ? "border-white" : "border-current"}`}
                  >
                    {completed[index] ? "✓" : index + 1}
                  </span>
                  <span>
                    Step {index + 1} {label}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <span
                    className={`mx-1 h-px flex-1 ${completed[index] ? "bg-emerald-400" : "bg-[var(--border)]"}`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-700"
          style={{
            width: `${(completed.filter(Boolean).length / steps.length) * 100}%`,
          }}
        />
      </div>

      {activeStep === 0 && (
        <ResearchStep
          keyword={data.keyword}
          onGenerate={generateWriter}
          onChange={(keyword) => updateData({ keyword })}
          onComplete={(keyword) => {
            updateData({ keyword });
            completeStep(0);
          }}
        />
      )}
      {activeStep === 1 && (
        <OutlineStep
          keyword={data.keyword}
          outline={data.outline}
          onGenerate={generateWriter}
          onComplete={(outline) => {
            updateData({ outline });
            completeStep(1);
          }}
        />
      )}
      {activeStep === 2 && (
        <ContentStep
          keyword={data.keyword}
          outline={data.outline}
          title={data.title}
          excerpt={data.excerpt}
          content={data.content}
          onGenerate={generateWriter}
          onComplete={(article) => {
                   updateData({ ...article, post: { ...article.post } });
            completeStep(2);
          }}
        />
      )}
      {activeStep === 3 && (
        <ImagesStep
          imageUrls={data.imageUrls}
          onComplete={(imageUrls) => {
            updateData({ imageUrls });
            completeStep(3);
          }}
        />
      )}
      {activeStep === 4 && (
        <PublishStep
          data={data}
          onPublishSuccess={handlePublishSuccess}
        />
      )}

      {activeStep > 0 && activeStep < 4 && (
        <button
          type="button"
          className={`${btnSecondary} mt-4`}
          onClick={() => setActiveStep((step) => step - 1)}
        >
          Back
        </button>
      )}
      <p className="mt-6 text-xs text-[var(--text-secondary)]">Step 5: Publish & Save your article directly to the database. Articles can be saved as drafts or published immediately.</p>
    </div>
  );
}