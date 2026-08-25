"use client";

import { useState } from "react";
import { btnPrimary, btnSecondary, panel } from "../../../lib/dashboard";
import type { WriterData } from "../ai-writer-page";

type PreviewStepProps = { data: WriterData; onSave: () => void };

const metrics = [
  ["SEO score", "92/100"],
  ["Readability", "95/100"],
  ["Word count", "1,800"],
  ["Reading time", "8 min"],
];

export function PreviewStep({ data, onSave }: PreviewStepProps) {
  const [published, setPublished] = useState(false);

  return (
    <section>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value]) => (
          <div key={label} className={panel}>
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
            <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{value}</p>
          </div>
        ))}
      </div>

      {published ? (
        <div className={`${panel} mt-4 border-emerald-400/50`}>
          <p className="text-lg font-bold text-emerald-400">Article successfully published</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Research, outline, content, images, and publishing are complete.</p>
        </div>
      ) : (
        <>
          <article className={`${panel} mt-4`}>
            <span className="rounded bg-[var(--badge-bg)] px-2 py-1 text-xs font-semibold text-[var(--accent-purple)]">AI Tools</span>
            <h2 className="mt-4 text-3xl font-bold text-[var(--text-primary)]">{data.title || "Your article preview"}</h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">By DTS Tech AI · August 25, 2026</p>
            <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">{data.excerpt}</p>
            <div className="mt-6 whitespace-pre-line text-sm leading-7 text-[var(--text-primary)]">{data.content}</div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {data.imageUrls.slice(0, 3).map((url) => (
                <img key={url} src={url} alt="Article section" className="aspect-video rounded-lg border border-[var(--border)] object-cover" />
              ))}
            </div>
          </article>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className={btnSecondary} onClick={onSave}>Save draft</button>
            <button type="button" className={btnPrimary} onClick={() => setPublished(true)}>Publish article</button>
          </div>
        </>
      )}
    </section>
  );
}
