/** @type {import('next').NextConfig} */
const { url, remoteImageDomains } = require('./blog.config');
const { withContentlayer } = require('next-contentlayer');
const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
});
const debug = process.env.NODE_ENV !== 'production';
const targetUrl = url
  .replace('//', '')
  .split('/')
  .filter((v) => v !== '')
  .pop();
module.exports = withContentlayer(
  withMDX({
    output: 'standalone',
    basePath: !debug ? `/${targetUrl}` : '',
    images: {
      domains: [
        'localhost',
        'avatars.githubusercontent.com',
        ...remoteImageDomains,
      ],
      loader: 'akamai',
      path: '',
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
    experimental: {
      forceSwcTransforms: true,
    },
  })
);
