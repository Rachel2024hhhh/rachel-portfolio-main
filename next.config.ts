import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* other config options here */
  turbopack: {
    root: path.resolve(__dirname), // Ensures Turbopack knows the root directory
  },
};

export default nextConfig;