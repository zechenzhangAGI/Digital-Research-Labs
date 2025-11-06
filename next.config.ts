import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'mundy.physics.harvard.edu',
      },
      {
        protocol: 'https',
        hostname: 'mundy.physics.harvard.edu',
      },
      {
        protocol: 'https',
        hostname: '*.cern',
      },
      {
        protocol: 'https',
        hostname: 'cohenweb.rc.fas.harvard.edu',
      },
      {
        protocol: 'https',
        hostname: 'www.manoharan.seas.harvard.edu',
      },
      {
        protocol: 'https',
        hostname: 'www.quantamagazine.org',
      },
      {
        protocol: 'https',
        hostname: 'mitrano.physics.harvard.edu',
      },
      {
        protocol: 'https',
        hostname: 'atlas.cern',
      },
    ],
  },
};

export default nextConfig;
