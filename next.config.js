/** @type {import('next').NextConfig} */

module.exports = {
    webpack: (config, options) => {
      config.resolve.fallback = {fs: false};
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      })
      return config;
    },
    images: {
      loader: "akamai",
      path: ""
    },
    trailingSlash: true,
  }
  

