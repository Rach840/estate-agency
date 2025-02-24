import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost', "frontend"],
        }
    }
};

export default nextConfig;
