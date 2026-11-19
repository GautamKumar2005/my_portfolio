import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  env: {
    DRIVE_RESUME:
      process.env.DRIVE_RESUME ||
      "https://drive.google.com/file/d/1SjVhMYuKTjkjlu_6BDjNQje68FLuXc6J/view?usp=drive_link",
    EMAIL: process.env.EMAIL || "gautam96544@gmail.com",
  },
};

export default nextConfig;
