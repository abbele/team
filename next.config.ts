import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Three.js from being bundled server-side
  serverExternalPackages: ["three"],
};

export default nextConfig;
