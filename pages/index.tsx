import { allPosts, Post } from '@root/.contentlayer/generated';
import Meta from '@root/components/Meta';
import PostCard from '@root/components/PostCard';
import _ from 'lodash';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const Card = () => {
  return <div>카드</div>;
};

const fixFilePath = (str: string, post: Post) => {
  ['https://', 'http://'];
  if (
    str.slice(0, 8).includes('https://') ||
    str.slice(0, 7).includes('http://')
  )
    return str;
  const fixedUrl = `${post._raw.sourceFileDir}/${str}`.replaceAll('./', '');

  return require(`../posts/${post._raw.sourceFileDir}/${str.replace('./', '')}`)
    .default.src;
};

const Home: NextPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  });
  return (
    <div className='flex flex-col min-h-[87vh] pt-20 h-fit' ref={pageRef}>
      <Meta />

      <div className='max-w-xl mx-auto w-[90%]'>
        <h1 className={'text-3xl font-bold border-b pb-4 mb-4  '}>Latest</h1>
        <div className='flex flex-col gap-2'>
          {_.orderBy(allPosts, ['date'], ['desc']).map((value, index) => {
            if (index >= 10) return;
            return (
              <PostCard
                key={index}
                {...value}
                image={value.image ? fixFilePath(value.image, value) : ''}
              />
            );
          })}
        </div>
        <div className='mt-5'>
          <Link href={'/post'}>
            <p className='text-lg font-bold cursor-pointer text-end'>
              all Posts...
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
