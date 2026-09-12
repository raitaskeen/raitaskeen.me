"use client";

import dynamic from "next/dynamic";

const PortfolioBot = dynamic(() => import("@/components/motion/PortfolioBot"), {
  ssr: false,
});

export default function PortfolioBotClient() {
  return <PortfolioBot />;
}
