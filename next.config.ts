import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  reactStrictMode: true,
  devIndicators: false
};

export default nextConfig;
