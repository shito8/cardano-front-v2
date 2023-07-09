/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  webpack: (config) => {
    config.experiments.topLevelAwait = true;
    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
