import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Make sure the workspace package is transpiled by Next so we can import
  // its TS source while developing without rebuilding on every change.
  transpilePackages: ["@asafarim/password-checklist"],
};

export default nextConfig;
