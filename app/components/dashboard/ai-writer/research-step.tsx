"use client";

import { useState } from "react";
import { btnPrimary, panel, inputClass } from "../../../lib/dashboard";

type ResearchStepProps = {
  keyword: string;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
};

export function ResearchStep({
  keyword,
  onChange,
  onComplete,
}: ResearchStepProps) {
  const [searched, setSearched] = useState(Boolean(keyword));
  const [value, setValue] = useState(keyword);
  const search = () => {
    if (value.trim()) {
      onChange(value.trim());
      setSearched(true);
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
        <button type="button" className={btnPrimary} onClick={search}>
          Search keyword
        </button>
      </div>

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
                <td className="px-3 py-3">Informational</td>
                <td className="px-3 py-3">12,400</td>
                <td className="px-3 py-3">38</td>
                <td className="px-3 py-3">$1.20</td>
                <td className="px-3 py-3">$3.80</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Related keywords
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                AI tools, machine learning, AI software, generative AI
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Long-tail keywords
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                best AI development tools for beginners, AI development workflow
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