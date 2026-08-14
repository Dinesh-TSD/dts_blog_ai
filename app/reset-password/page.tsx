import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { ResetPasswordForm } from "../components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password | DTS TECH AI",
  description: "Set a new password for your DTS TECH AI account.",
};

export default function ResetPasswordPage() {
  return (
    <>
      <Navbar />
      <section className="flex min-h-[calc(100vh-200px)] items-center justify-center px-6 py-12">
        <Suspense fallback={<p className="text-sm text-[var(--text-secondary)]">Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </section>
      <Footer />
    </>
  );
}
