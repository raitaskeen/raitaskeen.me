import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Fluid } from "@/components/Fluid";
import { person } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://raitaskeen.me"),
  title: {
    default: "Taskeen Haider, founder and lead architect of LegacyExodus",
    template: "%s · Taskeen Haider",
  },
  description:
    "Software engineer in Lahore with 3+ years of professional experience. I build LegacyExodus, a modernization engine for legacy JavaScript and TypeScript, and take on websites, web apps and codebase audits.",
  openGraph: {
    title: "Taskeen Haider",
    description: person.headline,
    url: "https://raitaskeen.me",
    type: "profile",
    images: [{ url: "/media/legacyexodus.jpg", width: 1592, height: 1088 }],
  },
  twitter: { card: "summary_large_image", creator: "@raitaskeen786" },
  icons: { icon: "/icon.svg", apple: "/icon-192.png" },
};

export const viewport: Viewport = {
  themeColor: "#07080d",
  colorScheme: "dark",
};

// Marks JS as available before first paint, so reveal-on-scroll never hides content without JS.
const jsFlag = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <div className="ambient" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <a className="skip" href="#content">
          Skip to content
        </a>
        {children}
        <Fluid />
      </body>
    </html>
  );
}
