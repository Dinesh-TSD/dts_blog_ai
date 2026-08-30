"use client";

import { useState } from "react";
import { btnPrimary, btnSecondary, inputClass, panel } from "../../../lib/dashboard";
import type { WriterGenerate } from "../ai-writer-page";

type OutlineStepProps = { keyword: string; outline: string[]; onGenerate: WriterGenerate; onComplete: (outline: string[]) => void };

export function OutlineStep({ keyword, outline, onGenerate, onComplete }: OutlineStepProps) {
  const [category, setCategory] = useState("AI Tools");
  const [tone, setTone] = useState("Practical");
  const [wordCount, setWordCount] = useState("1800");
  const [items, setItems] = useState(outline);
  const [generated, setGenerated] = useState(outline.length > 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await onGenerate("outline", { keyword, category, tone, wordCount: Number(wordCount) });
      if (!Array.isArray(result.outline) || result.outline.some((item) => typeof item !== "string")) {
        throw new Error("Gemini returned an invalid outline");
      }
      setItems(result.outline);
      setGenerated(true);
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "Could not generate outline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={panel}>
      <h2 className="text-xl font-bold text-[var(--text-primary)]">Build your outline</h2>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Shape a useful article around <strong className="text-[var(--text-primary)]">{keyword}</strong>.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <select className={inputClass} value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Category">
          <option>AI Tools</option><option>Web Development</option><option>Productivity</option>
        </select>
        <select className={inputClass} value={tone} onChange={(event) => setTone(event.target.value)} aria-label="Tone">
          <option>Practical</option><option>Expert</option><option>Conversational</option>
        </select>
        <input className={inputClass} type="number" value={wordCount} onChange={(event) => setWordCount(event.target.value)} aria-label="Word count" />
      </div>
      <button type="button" className={`${btnPrimary} mt-4`} onClick={() => void generate()} disabled={loading}>{loading ? "Generating..." : "Generate outline"}</button>
      {error && <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>}
      {generated && (
        <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-[var(--text-primary)]">{category} article outline</h3>
            <span className="text-xs text-[var(--text-secondary)]">{tone} · {wordCount} words</span>
          </div>
          <ol className="mt-4 flex flex-col gap-3">
            {items.map((item, index) => (
              <li key={item} className="flex gap-3 text-sm text-[var(--text-primary)]">
                <span className="text-emerald-400">0{index + 1}</span>{item}
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className={btnSecondary} onClick={() => void generate()} disabled={loading}>{loading ? "Generating..." : "Regenerate"}</button>
            <button type="button" className={btnPrimary} onClick={() => onComplete(items)}>Continue to content</button>
          </div>
        </div>
      )}
    </section>
  );
}
