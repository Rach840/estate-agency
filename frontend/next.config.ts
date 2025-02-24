import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost', "frontend"],
        }
    },
    typescript: {
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
