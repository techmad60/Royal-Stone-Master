import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "static.nike.com",
      },
      {
        protocol: "https",
        hostname: "api.polygon.io",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*", // When frontend calls /api/xyz
  //       destination: "https://api-royal-stone.softwebdigital.com/api/:path*", // It redirects to backend
  //     },
  //   ];
  // },
};

export default nextConfig;
