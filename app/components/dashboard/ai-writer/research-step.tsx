"use client";

import { useState } from "react";
import { btnPrimary, panel, inputClass } from "../../../lib/dashboard";
import type { WriterGenerate } from "../ai-writer-page";

type ResearchStepProps = {
  keyword: string;
  onGenerate: WriterGenerate;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
};

export function ResearchStep({
  keyword,
  onGenerate,
  onChange,
  onComplete,
}: ResearchStepProps) {
  const [searched, setSearched] = useState(Boolean(keyword));
  const [value, setValue] = useState(keyword);
  const [research, setResearch] = useState<{ intent: string; relatedKeywords: string[]; longTailKeywords: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    if (value.trim()) {
      const cleanValue = value.trim();
      setLoading(true);
      setError("");
      try {
        const result = await onGenerate("research", { keyword: cleanValue });
        if (typeof result.intent !== "string" || !Array.isArray(result.relatedKeywords) || !Array.isArray(result.longTailKeywords)) {
          throw new Error("Gemini returned invalid research");
        }
        onChange(cleanValue);
        setResearch({
          intent: result.intent,
          relatedKeywords: result.relatedKeywords.filter((item): item is string => typeof item === "string"),
          longTailKeywords: result.longTailKeywords.filter((item): item is string => typeof item === "string"),
        });
        setSearched(true);
      } catch (researchError) {
        setError(researchError instanceof Error ? researchError.message : "Could not research keyword");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className={panel}>
      <div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          Keyword research
        </h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Find a focused topic and a search opportunity for your next article.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          className={inputClass}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="e.g. AI development tools"
          aria-label="Keyword"
        />
        <button type="button" className={btnPrimary} onClick={() => void search()} disabled={loading}>
          {loading ? "Researching..." : "Research keyword"}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>}

      {searched && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--text-secondary)]">
              <tr>
                {["Keyword", "Intent", "Volume", "KD", "CPC low", "CPC high"].map(
                  (heading) => (
                    <th key={heading} className="px-3 py-3">
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--border)] text-[var(--text-primary)]">
                <td className="px-3 py-3 font-medium">{value}</td>
                <td className="px-3 py-3 capitalize">{research?.intent ?? "Informational"}</td>
                <td className="px-3 py-3 text-[var(--text-secondary)]" colSpan={4}>Search metrics require a keyword data provider</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Related keywords
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {research?.relatedKeywords.join(", ") || "No related keywords returned"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Long-tail keywords
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {research?.longTailKeywords.join(", ") || "No long-tail keywords returned"}
              </p>
            </div>
          </div>

          <button
            type="button"
            className={`${btnPrimary} mt-6`}
            onClick={() => onComplete(value)}
          >
            Continue to outline
          </button>
        </div>
      )}
    </section>
  );
}