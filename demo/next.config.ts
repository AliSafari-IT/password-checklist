import type { NextConfig } from "next";

const repo = process.env.GITHUB_REPOSITORY;
const basePath = process.env.GITHUB_ACTIONS && repo ? `/${repo.split("/")[1]}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Make sure the workspace package is transpiled by Next so we can import
  // its TS source while developing without rebuilding on every change.
  transpilePackages: ["@asafarim/password-checklist"],
  basePath,
  assetPrefix: basePath || undefined,
  output: "export",
};

export default nextConfig;
