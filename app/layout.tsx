import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./effects.css";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/motion/ScrollProgress";
import PointerSystem from "@/components/motion/PointerSystem";
import Background from "@/components/Background";
import PortfolioBot from "@/components/motion/PortfolioBot";
import CustomCursor from "@/components/motion/CustomCursor";
import PwaRegister from "@/components/PwaRegister";
import { profile } from "@/lib/data";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  themeColor: "#FFCF59",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.bio[0],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "raitaskeen",
  },
  icons: {
    icon: "/assets/images/logo.ico",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Background />
        <PointerSystem>
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

