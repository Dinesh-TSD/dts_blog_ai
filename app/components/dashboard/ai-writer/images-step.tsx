"use client";

import { useState } from "react";
import { btnPrimary, inputClass, panel } from "../../../lib/dashboard";

type ImagesStepProps = { imageUrls: string[]; onComplete: (urls: string[]) => void };

export function ImagesStep({ imageUrls, onComplete }: ImagesStepProps) {
  const [urls, setUrls] = useState<string[]>(imageUrls.length ? imageUrls : Array(6).fill(""));
  const [error, setError] = useState("");

  const update = (index: number, value: string) => {
    setUrls((current) => current.map((url, position) => position === index ? value : url));
  };

  const upload = () => {
    const clean = urls.map((url) => url.trim());
    const isImageUrl = (url: string) => /^https?:\/\/.+\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(url);
    if (clean.some((url) => !url || !isImageUrl(url))) {
      setError("Enter six valid image URLs ending in jpg, png, or webp.");
      return;
    }
    if (new Set(clean).size !== clean.length) {
      setError("Each image URL must be unique.");
      return;
    }
    setError("");
    onComplete(clean);
  };

  return (
    <section className={panel}>
      <h2 className="text-xl font-bold text-[var(--text-primary)]">Add article images</h2>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">Paste Cloudinary or other hosted image URLs. Six unique images are required.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {urls.map((url, index) => (
          <label key={index} className="text-sm font-medium text-[var(--text-primary)]">
            {index === 0 ? "Featured image URL" : `Section image URL ${index}`}
            <input className={`${inputClass} mt-2`} type="url" value={url} onChange={(event) => update(index, event.target.value)} placeholder="https://res.cloudinary.com/.../image.jpg" />
          </label>
        ))}
      </div>
      {error && <p className="mt-4 text-sm text-red-400" role="alert">{error}</p>}
      <button type="button" className={`${btnPrimary} mt-6`} onClick={upload}>Upload images</button>
    </section>
  );
}
