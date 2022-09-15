import React from 'react';
import NextImage from 'next/image';
import { Post } from '@root/.contentlayer/generated';
const baseSize = {
  sm: {
    width: '480',
    height: '240',
  },
  md: {
    width: '720',
    height: '360',
  },
};

interface ImageType {
  src: string;
  alt?: string;
  size: 'sm' | 'md';
  fill: boolean;
  post: Post;
}
const Image = ({
  src,
  alt,
  size = 'md',
  fill = false,
  post,
  ...rest
}: ImageType) => {
  const fixFilePath = (str: string) => {
    ['https://', 'http://'];
    if (
      str.slice(0, 8).includes('https://') ||
      str.slice(0, 7).includes('http://')
    )
      return str;
    const fixedUrl = `${post._raw.sourceFileDir}/${str}`.replaceAll('./', '');

    return require(`../posts/${post._raw.sourceFileDir}/${str.replace(
      './',
      ''
    )}`).default.src;
  };
  const fixedSrc = fixFilePath(src);
  return (
    <NextImage
      src={fixedSrc}
      placeholder='blur'
      blurDataURL={fixedSrc}
      width={baseSize[size].width}
      height={baseSize[size].height}
      alt={alt}
      layout={fill ? 'fill' : 'fixed'}
      objectFit={fill ? 'contain' : 'fill'}
      {...rest}
    />
  );
};

export default Image;
