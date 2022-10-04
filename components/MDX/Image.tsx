import React from 'react';
import NextImage from 'next/image';
import { Post } from '@root/.contentlayer/generated';
const baseSize = {
  sm: {
    width: '480',
    height: '240',
    h: 'h-[240px]',
  },
  md: {
    width: '720',
    height: '360',
    h: 'h-[360px]',
  },
  xl: {
    h: 'h-[720px]',
  },
};

interface ImageType {
  src: string;
  alt?: string;
  size: 'sm' | 'md';
  post: Post;
  width?: string;
  height?: string;
}
const Image = ({
  src,
  alt,
  size = 'md',
  width,
  height,
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

    return `../../${
      require(`../../posts/${post._raw.sourceFileDir}/${str.replace('./', '')}`)
        .default.src
    }`;
  };
  let fill = true;
  if (width || height) fill = false;

  const h = height ? `h-${height}` : baseSize[size].h;
  return (
    <div className={`relative z-100 flex justify-center item-center m-8 ${h}`}>
      <NextImage
        src={fixFilePath(src)}
        placeholder='blur'
        width={width ? width : baseSize[size].width}
        height={height ? height : baseSize[size].height}
        blurDataURL={fixFilePath(src)}
        draggable='false'
        alt={alt}
        layout={fill ? 'fill' : 'fixed'}
        objectFit={fill ? 'contain' : 'fill'}
        {...rest}
      />
    </div>
  );
};

export default Image;
