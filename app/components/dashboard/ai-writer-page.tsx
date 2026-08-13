"use client";

import { useState } from "react";
import { btnPrimary, btnSecondary, inputClass, panel } from "../../lib/dashboard";

export function AiWriterPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [output, setOutput] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setOutput(
        `# ${topic}\n\nIn today's fast-moving tech landscape, ${topic.toLowerCase()} has become essential for developers and creators. This article explores practical strategies, real-world tools, and actionable steps you can apply immediately.\n\n## Key Takeaways\n- Start with clear goals and audience intent\n- Use AI tools to accelerate research and drafting\n- Edit for clarity, accuracy, and your unique voice\n\n## Next Steps\nExpand each section with examples, screenshots, and links to trusted resources.`,
      );
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <p className="text-sm font-medium text-[var(--accent-purple)]">AI Writer</p>
        <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          AI Content Writer
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Generate blog drafts from a topic, tone, and keywords.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={`${panel} flex flex-col gap-4`}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
              Article Topic
            </label>
            <input
              className={inputClass}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Best React Hooks Patterns in 2026"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
              Tone
            </label>
            <select
              className={inputClass}
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="technical">Technical</option>
              <option value="beginner">Beginner-friendly</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={handleGenerate} className={btnPrimary}>
              {generating ? "Generating..." : "✨ Generate Draft"}
            </button>
            <button
              type="button"
              onClick={() => {
                setTopic("");
                setOutput("");
              }}
              className={btnSecondary}
            >
              Clear
            </button>
          </div>
        </div>

        <div className={panel}>
          <h2 className="mb-3 text-lg font-bold text-[var(--text-primary)]">
            Generated Output
          </h2>
          <textarea
            readOnly
            value={output}
            placeholder="Your AI-generated draft will appear here..."
            className={`${inputClass} min-h-[280px] resize-y font-mono leading-relaxed`}
          />
        </div>
      </div>
    </div>
  );
}
