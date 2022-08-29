import { allPosts, Post } from '.contentlayer/generated';
import Input from '@root/components/common/Input';
import PostCard from '@root/components/common/PostCard';
import _ from 'lodash';
import { NextPage } from 'next';
import React, { useEffect, useMemo, useState } from 'react';
import { url } from '@root/blog.config';
import { useRouter } from 'next/router';
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

    return `${
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/posts'
        : `${url}/posts`
    }/${fixedUrl}`;
  };

  useEffect(() => {
    debounceSearch();
  }, [search]);

  const debounceSearch = useMemo(
    () =>
      _.debounce(() => {
        let postList = allPosts;
        if (tags) {
          console.log('tags', tags);
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
        setPosts(postList);
      }, 200),
    [search]
  );

  return (
    <div className='min-h-screen mx-auto mt-20 md:w-4/6'>
      <div className='pt-5'>
        <h1 className='py-10 text-6xl'>Post</h1>
        <div className='pb-10'>
          <Input set={setInputValue} />
        </div>
      </div>
      {_.orderBy(posts, ['date'], ['desc']).map((value, index) => (
        <PostCard
          key={index}
          {...value}
          image={value.image ? fixFilePath(value.image, value) : ''}
        />
      ))}
    </div>
  );
};

export default PostPage;