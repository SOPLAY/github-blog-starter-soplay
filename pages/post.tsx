import Input from '@root/components/Input';
import PostCard from '@root/components/PostCard';
import _ from 'lodash';
import { InferGetStaticPropsType, NextPage } from 'next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Meta from '@root/components/Meta';
import { title, description } from '@root/blog.config';
import Loading from '@root/components/Loading';
import postsData from '@root/lib/Posts/postsData';

export const getStaticProps = async () => {
  return {
    props: { postsData: postsData },
  };
};

const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  postsData,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState(postsData);
  const [targetPage, setTargetPage] = useState(1);
  const router = useRouter();
  const { tags, serise, search } = router.query;
  //fixed md, mdx file path
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

    return require(`../posts/${post._raw.sourceFileDir}/${str.replace(
      './',
      ''
    )}`).default.src;
  };

  useEffect(() => {
    debounceSearch();
  }, [router, targetPage]);

  const debounceSearch = useMemo(
    () =>
      _.debounce(() => {
        let postList = postsData;
        if (tags) {
          postList = _.filter(postsData, {
            tags: typeof tags === 'object' ? [..._.flattenDeep(tags)] : [tags],
          });
        }
        if (serise && typeof serise === 'string') {
          postList = _.filter(postsData, {
            serise: serise,
          });
        }
        if (search && typeof search === 'string') {
          postList = _.filter(postList, (value) =>
            _.includes(
              value.title.toLowerCase().replace(' ', ''),
              search.toLowerCase().replace(' ', '')
            )
          );
        }
        setPosts(
          _.orderBy(postList, ['date'], ['desc']).slice(0, 6 * targetPage)
        );
      }, 0),
    [router, targetPage]
  );

  const loadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entris) => {
      entris[0].isIntersecting && setTargetPage(targetPage + 1);
    });
    if (loadRef.current) {
      observer.observe(loadRef.current);
    }
    return () => observer.disconnect();
  });

  return (
    <>
      <Meta title={title} description={description} url={router.asPath} />
      <div className='w-[90%] min-h-screen pt-20 mx-auto h-fit'>
        <div className='max-w-xl mx-auto'>
          <div className='px-3'>
            <h1 className='pb-5 text-3xl font-bold'>
              <Link href={'/post'}>Post</Link>
            </h1>
            <div className='pb-10'>
              <Input set={setInputValue} />
            </div>
          </div>
          <div className={'flex flex-col gap-2'}>
            {posts.map((value, index) => (
              <PostCard
                {...value}
                key={index}
                image={value.image ? fixFilePath(value.image, value) : ''}
              />
            ))}
          </div>
        </div>
      </div>
      {targetPage * 6 < postsData.length && (
        <div className='' ref={loadRef}>
          <div className='text-center w-[90%] mx-auto max-w-xl'>
            <Loading.LoadPostCard />
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;
