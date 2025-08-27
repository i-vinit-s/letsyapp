import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
    domains: ["i.bxby.xyz", "res.cloudinary.com"],
  },
};

export default nextConfig;
