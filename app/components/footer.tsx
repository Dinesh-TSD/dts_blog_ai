import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { footerHref } from "../lib/site";

const footerSections = [
  {
    title: "Company",
    links: ["About Us", "Contact", "Careers", "Write for Us"],
  },
  {
    title: "Resources",
    links: ["Roadmaps", "Tutorials", "Cheat Sheets", "Newsletter"],
  },

  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--border)] bg-[var(--bg-secondary)] px-6 pt-[49px] pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 max-md:grid-cols-1">
          <div className="col-span-2 flex flex-col gap-4 max-md:col-span-1">
            <BrandLogo />
            <p className="max-w-[390px] text-sm leading-snug text-[var(--text-secondary)]">
              Your practical guide to the world of technology. We publish useful
              articles covering AI, web development, apps, developer tools, and
              software.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h4 className="text-base font-bold text-[var(--heading-strong)]">
                {section.title}
              </h4>
              <div className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <Link
                    key={link}
                    href={footerHref(link)}
                    className="text-sm text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--text-primary)]"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--footer-border)] pt-[33px] max-md:flex-col max-md:gap-4 max-md:text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            © 2026 DTS TECH AI. All rights reserved.
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Built for curious minds. Powered by technology.
          </p>
        </div>
      </div>
    </footer>
  );
}
