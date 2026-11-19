import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  env: {
    DRIVE_RESUME: process.env.DRIVE_RESUME || process.env.NEXT_PUBLIC_DRIVE_RESUME || "",
    NEXT_PUBLIC_DRIVE_RESUME: process.env.NEXT_PUBLIC_DRIVE_RESUME || process.env.DRIVE_RESUME || "",
  },
};

export default nextConfig;
