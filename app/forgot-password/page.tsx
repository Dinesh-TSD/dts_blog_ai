import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "../components/footer";
import { ForgotPasswordForm } from "../components/forgot-password-form";
import { Navbar } from "../components/navbar";

export const metadata: Metadata = {
  title: "Forgot Password | DTS TECH AI",
  description: "Reset your DTS TECH AI account password.",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <section className="flex min-h-[calc(100vh-200px)] items-center justify-center px-6 py-12">
        <Suspense fallback={<p className="text-sm text-[var(--text-secondary)]">Loading...</p>}>
          <ForgotPasswordForm />
        </Suspense>
      </section>
      <Footer />
    </>
  );
}
