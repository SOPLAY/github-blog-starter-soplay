import Meta from '@root/components/Meta';
import PostCard from '@root/components/PostCard';
import postsData from '@root/lib/Posts/postsData';
import _ from 'lodash';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export const getStaticProps = async () => {
  return {
    props: { postsData: postsData.slice(0, 10) },
  };
};

const Card = () => {
  return <div>카드</div>;
};

const fixFilePath = (
  str: string,
  post: { _raw: { sourceFileDir: string } }
) => {
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

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  postsData,
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  });

  return (
    <div className='flex flex-col min-h-screen pt-20 h-fit' ref={pageRef}>
      <Meta />

      <div className='max-w-xl mx-auto w-[90%]'>
        <h1 className={'text-3xl font-bold border-b pb-4 mb-4'}>Latest</h1>
        <div className='flex flex-col gap-2'>
          {_.orderBy(postsData, ['date'], ['desc']).map((value, index) => {
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
            <p className='text-lg font-bold cursor-pointer text-end '>
              all Posts...
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
