import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./effects.css";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/motion/ScrollProgress";
import PointerSystem from "@/components/motion/PointerSystem";
import Background from "@/components/Background";
import PortfolioBot from "@/components/PortfolioBotClient";
import CustomCursor from "@/components/motion/CustomCursor";
import PwaRegister from "@/components/PwaRegister";
import RouteScrollReset from "@/components/RouteScrollReset";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  themeColor: "#FFCF59",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Taskeen Haider | Software Engineer · Full-Stack · Backend · AI Automation",
  description:
    "Software Engineer with 5+ years of experience building full-stack applications, backend systems, AI automation, developer tooling, and deterministic static-analysis infrastructure.",
  keywords: [
    "Software Engineer",
    "Full-Stack Engineer",
    "Backend Engineer",
    "AI Automation Engineer",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "Developer Tooling",
    "Static Analysis",
    "Systems Engineering",
    "LLM Automation",
  ],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "raitaskeen",
  },
  icons: {
    icon: [
      { url: "/assets/images/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon-192.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Background />
        <PointerSystem>
          <RouteScrollReset />
          <CustomCursor />
          <ScrollProgress />
          <Nav />
          {children}
          <PortfolioBot />
          <PwaRegister />
        </PointerSystem>
      </body>
    </html>
  );
}

