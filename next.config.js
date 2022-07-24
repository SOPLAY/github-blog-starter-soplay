/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
  images: {
    domains: ['localhost', 'avatars.githubusercontent.com'],
  },
  reactStrictMode: true,
});
