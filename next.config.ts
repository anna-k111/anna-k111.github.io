import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a fully static site into `out/` for GitHub Pages.
  output: "export",
  // Emit /work/index.html etc. so URLs like /work/ resolve on GitHub Pages.
  trailingSlash: true,
  // GitHub Pages has no image-optimization server.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
