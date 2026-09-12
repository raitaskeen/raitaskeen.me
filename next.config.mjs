/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turns off the floating Next.js dev-mode badge in the corner of the screen.
  devIndicators: false,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "ghchart.rshah.org" },
    ],
  },
};
export default nextConfig;
