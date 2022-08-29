/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');
const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
});
module.exports = withContentlayer(
  withMDX({
    images: {
      domains: ['localhost', 'avatars.githubusercontent.com'],
      loader: 'akamai',
      path: '',
    },
  })
);
