"use client";

import { useState } from "react";
import { btnPrimary, card, inputClass } from "../lib/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className={`${card} text-center`}>
        <p className="text-lg font-bold text-[var(--text-primary)]">
          Message sent!
        </p>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Thanks for reaching out. We&apos;ll get back to you within 24–48 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      className={`${card} flex flex-col gap-4`}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Name
          </label>
          <input className={inputClass} placeholder="Your name" required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Email
          </label>
          <input
            type="email"
            className={inputClass}
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
          Subject
        </label>
        <input className={inputClass} placeholder="How can we help?" required />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
          Message
        </label>
        <textarea
          className={`${inputClass} min-h-[140px] resize-y`}
          placeholder="Write your message..."
          required
        />
      </div>
      <button type="submit" className={`${btnPrimary} w-fit`}>
        Send Message →
      </button>
    </form>
  );
}
