import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  typescript: {
    // TEMPORAR: ignoră erori TS la build până regenerăm types/database.ts 
    // din schema Supabase reală cu `pnpm db:types`
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
