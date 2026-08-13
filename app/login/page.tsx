import type { Metadata } from "next";
import { Footer } from "../components/footer";
import { LoginForm } from "../components/login-form";
import { Navbar } from "../components/navbar";

export const metadata: Metadata = {
  title: "Login | DTS TECH AI",
  description: "Sign in to your DTS TECH AI dashboard.",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <section className="flex min-h-[calc(100vh-200px)] items-center justify-center px-6 py-12">
        <LoginForm />
      </section>
      <Footer />
    </>
  );
}
