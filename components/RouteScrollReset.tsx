"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * RouteScrollReset ensures every Next.js page transition begins instantaneously
 * at the top of the viewport (window.scrollY === 0) with zero animated scroll lag,
 * zero layout offset artifacts, and zero hydration instability.
 */
export default function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}
