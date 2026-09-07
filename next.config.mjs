/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turns off the floating Next.js dev-mode badge in the corner of the screen.
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "komarev.com" },
      { protocol: "https", hostname: "streak-stats.demolab.com" },
    ],
  },
};
export default nextConfig;
