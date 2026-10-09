import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Dev only: lets a phone on the same Wi-Fi load the dev server's scripts (this computer's LAN address)
  allowedDevOrigins: ["192.168.29.191"],
  turbopack: {
    rules: {
      "*.css": {
        // Only global CSS goes through Tailwind; CSS modules keep their scoped class names.
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
