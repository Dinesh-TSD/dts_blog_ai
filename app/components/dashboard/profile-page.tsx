"use client";

import { useEffect, useState } from "react";
import { getAuthSession } from "../../lib/auth";
import { btnPrimary, inputClass, panel } from "../../lib/dashboard";

export function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("Admin User");
  const [bio, setBio] = useState(
    "Content creator and tech writer at DTS TECH AI.",
  );

  useEffect(() => {
    const session = getAuthSession();
    if (session) setEmail(session.email);
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <p className="text-sm font-medium text-[var(--accent-purple)]">Profile</p>
        <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          Your Profile
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Manage your public author profile and account details.
        </p>
      </div>

      <div className={`${panel} mb-6 flex items-center gap-4`}>
        <div className="flex size-16 items-center justify-center rounded-full bg-[var(--accent-purple)] text-xl font-bold text-white">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-bold text-[var(--text-primary)]">{name}</p>
          <p className="text-sm text-[var(--text-secondary)]">{email}</p>
          <p className="mt-1 text-xs text-[var(--accent-purple)]">Administrator</p>
        </div>
      </div>

      <form
        className={`${panel} flex flex-col gap-4`}
        onSubmit={(e) => {
          e.preventDefault();
          alert("Profile updated!");
        }}
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Full Name
          </label>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Email
          </label>
          <input className={inputClass} value={email} readOnly />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Bio
          </label>
          <textarea
            className={`${inputClass} min-h-[100px] resize-y`}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <button type="submit" className={`${btnPrimary} w-fit`}>
          Save Profile
        </button>
      </form>
    </div>
  );
}
