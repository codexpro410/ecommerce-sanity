import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   serverComponentsExternalPackages: ["swr"],
  // },
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     'swr/infinite': require.resolve('swr/infinite/dist/index.cjs'),
  //   };
  //   return config;
  // }

  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname:"cdn.sanity.io",
      }
    ]
  }
};

export default nextConfig;
