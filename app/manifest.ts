import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Taskeen Haider — Full-Stack Engineer",
    short_name: "raitaskeen",
    description: "Portfolio and systems architecture work of Taskeen Haider",
    start_url: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#FFCF59",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
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
      {
        src: "/assets/images/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
