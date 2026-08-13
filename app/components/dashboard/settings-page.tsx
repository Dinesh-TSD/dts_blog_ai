"use client";

import { useState } from "react";
import { btnPrimary, inputClass, panel } from "../../lib/dashboard";

export function SettingsPage() {
  const [siteName, setSiteName] = useState("DTS TECH AI");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <p className="text-sm font-medium text-[var(--accent-purple)]">Settings</p>
        <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Configure your dashboard and notification preferences.
        </p>
      </div>

      <div className={`${panel} mb-6 flex flex-col gap-4`}>
        <h2 className="text-lg font-bold text-[var(--text-primary)]">General</h2>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Site Name
          </label>
          <input
            className={inputClass}
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
        </div>
      </div>

      <div className={`${panel} mb-6 flex flex-col gap-4`}>
        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          Notifications
        </h2>
        {[
          {
            label: "Email notifications",
            desc: "Receive alerts for comments and new subscribers",
            checked: emailNotifs,
            onChange: setEmailNotifs,
          },
          {
            label: "Weekly analytics report",
            desc: "Get a summary of traffic and top articles every Monday",
            checked: weeklyReport,
            onChange: setWeeklyReport,
          },
          {
            label: "Public author profile",
            desc: "Show your profile on published articles",
            checked: publicProfile,
            onChange: setPublicProfile,
          },
        ].map((item) => (
          <label
            key={item.label}
            className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {item.label}
              </p>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                {item.desc}
              </p>
            </div>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => item.onChange(e.target.checked)}
              className="mt-1 size-4 accent-[var(--accent-purple)]"
            />
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={() => alert("Settings saved!")}
        className={btnPrimary}
      >
        Save Settings
      </button>
    </div>
  );
}
