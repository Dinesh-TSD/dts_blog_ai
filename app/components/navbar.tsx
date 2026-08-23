"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./brand-logo";
import { Icon } from "./icon";
import { ThemeToggle } from "./theme-toggle";
import { iconBtn, navLinkActiveClass } from "../lib/site";

const navItems = [
  { href: "/", label: "Home", match: (path: string) => path === "/" },
  { href: "/blog", label: "Blog", match: (path: string) => path.startsWith("/blog") },
  { href: "/ai-tools", label: "AI Tools", match: (path: string) => path.startsWith("/ai-tools") },
  { href: "/tutorials", label: "Tutorials", match: (path: string) => path.startsWith("/tutorials") },
  { href: "/resources", label: "Resources", match: (path: string) => path.startsWith("/resources") },
  { href: "/about", label: "About", match: (path: string) => path.startsWith("/about") },
  { href: "/contact", label: "Contact", match: (path: string) => path.startsWith("/contact") },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-[1000] border-b border-[var(--border)] bg-[var(--nav-bg)] px-[49px] py-[17px] backdrop-blur-[5px] max-md:px-4 max-md:py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 max-lg:flex-wrap max-lg:gap-4">
        <BrandLogo href="/" />

        <div className="flex flex-1 items-center justify-center gap-5 max-lg:order-3 max-lg:basis-full max-lg:flex-wrap max-lg:justify-start max-lg:gap-3 max-md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkActiveClass(item.match(pathname))}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button type="button" className={iconBtn} title="Search" aria-label="Search">
            <Icon name="search" />
          </button>
          <button type="button" className={iconBtn} title="Favorites" aria-label="Favorites">
            <Icon name="star" />
          </button>
          <Link
            href="/login"
            className="flex cursor-pointer items-center gap-2 rounded-lg border-none bg-[var(--accent-purple)] px-5 py-2 text-sm font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
          >
            <span>Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
