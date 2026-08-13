"use client";

import { btnPrimary, btnSecondary, panel } from "../../lib/dashboard";

const users = [
  { name: "Admin User", email: "admin@dtstech.ai", role: "Admin", status: "Active" },
  { name: "Editor One", email: "editor@dtstech.ai", role: "Editor", status: "Active" },
  { name: "Writer Two", email: "writer@dtstech.ai", role: "Writer", status: "Invited" },
];

export function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--accent-purple)]">Admin</p>
          <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Manage users, roles, and site configuration.
          </p>
        </div>
        <button type="button" className={btnPrimary}>
          + Invite User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Users", value: "12" },
          { label: "Active Editors", value: "5" },
          { label: "Pending Invites", value: "2" },
        ].map((item) => (
          <div key={item.label} className={panel}>
            <p className="text-sm text-[var(--text-secondary)]">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className={`${panel} mt-6 overflow-x-auto`}>
        <h2 className="mb-4 text-lg font-bold text-[var(--text-primary)]">
          User Management
        </h2>
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--text-secondary)]">
              <th className="pb-3 pr-4 font-medium">Name</th>
              <th className="pb-3 pr-4 font-medium">Email</th>
              <th className="pb-3 pr-4 font-medium">Role</th>
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="border-b border-[var(--border)]">
                <td className="py-3 pr-4 text-[var(--text-primary)]">{user.name}</td>
                <td className="py-3 pr-4 text-[var(--text-secondary)]">{user.email}</td>
                <td className="py-3 pr-4 text-[var(--text-secondary)]">{user.role}</td>
                <td className="py-3 pr-4">
                  <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs">
                    {user.status}
                  </span>
                </td>
                <td className="py-3">
                  <button type="button" className={`${btnSecondary} px-3 py-1.5 text-xs`}>
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
