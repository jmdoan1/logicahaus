import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // ppr: "incremental",
    useLightningcss: true,
  },
};

export default nextConfig;
