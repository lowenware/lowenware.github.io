/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        imagesFolder: "assets",
        imagesName: "[name]-[hash].[ext]",
        handleImages: ["svg"],
        optimizeImages: true,

      },
    ],
  ],
  {
    webpack: (config, options) => {
      config.resolve.fallback = {fs: false};

      return config;
    },
    images: {
      loader: "akamai",
      path: ""
    },
    trailingSlash: true,
  },)

