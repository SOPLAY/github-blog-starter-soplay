/** @type {import('next').NextConfig} */
const { url } = require('./blog.config');
const { withContentlayer } = require('next-contentlayer');
const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
});
const debug = process.env.NODE_ENV !== 'production';
const targetUrl = url.replace('//', '').split('/').pop();
module.exports = withContentlayer(
  withMDX({
    basePath: targetUrl !== '' ? `/${targetUrl}` : '',
    assetPrefix: !debug ? targetUrl : '',
    images: {
      domains: ['localhost', 'avatars.githubusercontent.com'],
      loader: 'akamai',
      path: '',
    },
  })
);
