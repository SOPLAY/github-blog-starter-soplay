import { allPosts, Post } from '.contentlayer/generated';
import Input from '@root/components/Input';
import PostCard from '@root/components/PostCard';
import _ from 'lodash';
import { NextPage } from 'next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Meta from '@root/components/Meta';
import { title, description, url } from '@root/blog.config';
import LoadingSpinner from 'public/assets/loading.svg';
import Loading from '@root/components/Loading';

const PostPage: NextPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState(allPosts);
  const router = useRouter();
  const { tags, serise, search } = router.query;
  //fixed md, mdx file path
  const fixFilePath = (str: string, post: Post) => {
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
  }, [router]);

  const debounceSearch = useMemo(
    () =>
      _.debounce(() => {
        let postList = allPosts;
        if (tags) {
          postList = _.filter(allPosts, {
            tags: typeof tags === 'object' ? [..._.flattenDeep(tags)] : [tags],
          });
        }
        if (serise && typeof serise === 'string') {
          postList = _.filter(allPosts, {
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
        setPosts(_.orderBy(postList, ['date'], ['desc']));
      }, 200),
    [router]
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

  const [targetPage, setTargetPage] = useState(1);

  return (
    <>
      <Meta title={title} description={description} url={router.asPath} />
      <div className='w-[90%] min-h-[87vh] pt-20 mx-auto h-fit'>
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
            {posts.slice(0, 6 * targetPage).map((value, index) => (
              <PostCard
                {...value}
                key={index}
                image={value.image ? fixFilePath(value.image, value) : ''}
              />
            ))}
          </div>
        </div>
      </div>
      {targetPage * 6 < posts.length && (
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
