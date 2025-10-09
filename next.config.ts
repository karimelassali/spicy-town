import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
      {
        protocol: "https",
        hostname: "www.seriouseats.com",
      },
      {
        protocol: "https",
        hostname: "www.chompslurrpburp.com",
      },
    ],
  },
};

export default nextConfig;
