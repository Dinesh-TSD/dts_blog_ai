import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "./components/theme-provider";
import { BRAND_NAME, BRAND_TAGLINE } from "./lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${BRAND_NAME} - Practical Tech Insights for Developers`,
  description: BRAND_TAGLINE,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-full font-sans leading-relaxed">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
