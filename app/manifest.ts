import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Taskeen Haider",
    short_name: "raitaskeen",
    description: "Founder and lead architect of LegacyExodus. Websites, web apps and JS/TS codebase audits.",
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#0b0d14",
    theme_color: "#0b0d14",
    categories: ["portfolio"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
