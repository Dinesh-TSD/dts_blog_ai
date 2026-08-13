import type { Metadata } from "next";
import { ContactForm } from "../components/contact-form";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { PageHero } from "../components/page-hero";
import { BRAND_NAME, card } from "../lib/site";

export const metadata: Metadata = {
  title: `Contact | ${BRAND_NAME}`,
  description: `Get in touch with the ${BRAND_NAME} team.`,
};

const contactInfo = [
  { icon: "📧", label: "Email", value: "hello@dtstech.ai" },
  { icon: "💬", label: "Support", value: "support@dtstech.ai" },
  { icon: "🌐", label: "Website", value: "www.dtstech.ai" },
  { icon: "⏰", label: "Response Time", value: "24–48 hours" },
];

const faqs = [
  {
    q: "Can I write for DTS TECH AI?",
    a: "Yes! We accept guest posts on AI, web development, and developer tools. Email us with your pitch.",
  },
  {
    q: "Do you offer sponsored content?",
    a: "We occasionally partner with relevant tech brands. Contact us for our media kit.",
  },
  {
    q: "How do I report an issue with an article?",
    a: "Use the contact form below with the article URL and we'll review it promptly.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <PageHero
        tag="Contact"
        tagIcon="📬"
        title="Get in"
        titleAccent="Touch"
        description="Have a question, partnership idea, or feedback? We'd love to hear from you."
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className={card}>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Contact Information
            </h2>
            <ul className="mt-4 flex flex-col gap-4">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[var(--accent-purple)] uppercase">
                      {item.label}
                    </p>
                    <p className="text-sm text-[var(--text-primary)]">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={card}>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">FAQ</h2>
            <ul className="mt-4 flex flex-col gap-4">
              {faqs.map((faq) => (
                <li key={faq.q}>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {faq.q}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {faq.a}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
