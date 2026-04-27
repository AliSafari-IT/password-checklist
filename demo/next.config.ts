import type { NextConfig } from "next";

// For GitHub Pages deployment, always use the fixed basePath
const basePath = "/password-checklist";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Make sure the workspace package is transpiled by Next so we can import
  // its TS source while developing without rebuilding on every change.
  transpilePackages: ["@asafarim/password-checklist"],
  basePath,
  assetPrefix: basePath,
  output: "export",
};

export default nextConfig;
