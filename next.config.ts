import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/portfolio", destination: "/projects", permanent: true },
      { source: "/portfolio/:slug", destination: "/projects/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
