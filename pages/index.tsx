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
    <div
      className='flex flex-col items-center justify-center min-h-screen '
      ref={pageRef}
    >
      <Meta />

      <div className={'w-[90%] '}>
        <h1 className={'text-3xl font-bold border-b pb-4 mb-4'}>
          최신 포스트를 살펴보세요!
        </h1>

        <div className={'md:w-4/5 mx-auto '}>
          {_.orderBy(allPosts, ['date'], ['desc']).map((value, index) => {
            if (index >= 5) return;
            return (
              <PostCard
                key={index}
                {...value}
                image={value.image ? fixFilePath(value.image, value) : ''}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
