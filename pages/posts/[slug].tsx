import { allPosts, Post } from '@root/.contentlayer/generated';
import _ from 'lodash';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Meta from '@root/components/Meta';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useEffect, useState } from 'react';
import { BsTagsFill } from 'react-icons/bs';
import Link from 'next/link';
import MDXComponents from '@root/components/MDX';
export const getStaticPaths = async () => {
  const paths = _.map(allPosts, (post) => post.url);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  interface IParams extends ParsedUrlQuery {
    slug: string;
  }
  const { slug } = params as IParams;
  const post: Post =
    allPosts.find((post) => post.fixedTitle === slug) || allPosts[0];

  return { props: { post } };
};

const SeriseHader = (props: { post: Post }) => (
  <div className={'mb-20'}>
    <blockquote>
      {' '}
      <h2>
        {' '}
        해당 게시글은{' '}
        <Link href={`/post?serise=${props.post.serise}`}>
          <span className='text-red-400 underline cursor-pointer'>
            {props.post.serise}
          </span>
        </Link>
        시리즈 입니다.
      </h2>
    </blockquote>
    <pre>
      <ul>
        {_.orderBy(
          _.filter(allPosts, { serise: props.post.serise }),
          'date',
          'asc'
        ).map((serirsePost, index) => (
          <li key={index}>
            {serirsePost.title === props.post.title ? (
              <div>
                <span>🚩 </span>
                {props.post.title}
              </div>
            ) : (
              <Link href={serirsePost.url}>
                <span className='underline cursor-pointer'>
                  {serirsePost.title}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </pre>
  </div>
);

const PostFooter = (props: { isSerise: boolean; post: Post }) => {
  const fixedAllllPosts = _.orderBy(allPosts, 'date');
  let postIndex;
  let prevPost, nextPost;

  if (props.isSerise) {
    const serisesPost = _.orderBy(
      _.filter(allPosts, { serise: props.post.serise }),
      'date',
      'asc'
    );
    postIndex = _.findIndex(serisesPost, { title: props.post.title });
    if (postIndex !== 0) prevPost = serisesPost[postIndex - 1];
    if (postIndex !== serisesPost.length - 1)
      nextPost = serisesPost[postIndex + 1];
  } else {
    postIndex = _.findIndex(fixedAllllPosts, { title: props.post.title });
    if (postIndex !== 0) prevPost = fixedAllllPosts[postIndex - 1];
    if (postIndex !== fixedAllllPosts.length - 1)
      nextPost = fixedAllllPosts[postIndex + 1];
  }

  const Card = (props: { post: Post; title: string }) => (
    <Link href={props.post.url}>
      <div
        className={
          'bg-base-main p-2 rounded-md md:w-1/3 w-2/5 hover:scale-110 duration-300 cursor-pointer'
        }
      >
        <span className={'text-base-bg my-0 py-0 mt-0 text-2xl font-bold'}>
          {props.title}
        </span>
        <div>
          <span className='text-base-bg'>
            {props.post.title.slice(0, 15)}...
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <div>
      <div className='flex justify-between px-0 my-12 list-none'>
        {prevPost ? <Card post={prevPost} title='Prev' /> : <div />}
        {nextPost ? <Card post={nextPost} title='Next' /> : <div />}
      </div>
    </div>
  );
};

const PostsPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [year, month, day] = post.date.split('T')[0].split('-');

  const MDXContent = useMDXComponent(post.body.code);

  const [fixHydraionUiRenderServerErr, setFixHydraionUiRenderServerErr] =
    useState('');
  useEffect(() => {
    setFixHydraionUiRenderServerErr(post.body.code);
  }, []);

  return (
    <>
      <Meta
        title={post.title}
        description={post.description}
        url={router.asPath}
      />
      <div className='flex flex-col items-center justify-center h-screen text-center bg-base-title dark:bg-dark-footerBg'>
        <h1 className='mx-20 text-2xl font-bold text-white xl:text-4xl md:text-3xl'>
          {post.title}
        </h1>
        <time className='pt-2 pb-3 text-white'>{`${year}-${month}-${day}`}</time>
        <div className='flex items-center font-bold md:text-xl'>
          <div className='px-3 md:text-2xl text-base-bg'>
            <BsTagsFill />
          </div>
          <div className='flex flex-wrap'>
            {post.tags.map((v, index) => (
              <div
                className='px-3 py-1 mx-1 rounded-full bg-base-bg dark:bg-dark-bg '
                key={index}
              >
                <p className='text-base'>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='min-h-screen mx-auto mt-5 md:prose-lg xl:prose-xl prose dark:prose-invert prose-pre:bg-[#2d2d2d] pt-16'>
        {post.serise && <SeriseHader post={post} />}
        {fixHydraionUiRenderServerErr && (
          <MDXContent components={MDXComponents(post)} />
        )}
        <PostFooter isSerise={post.serise ? true : false} post={post} />
      </div>
    </>
  );
};

export default PostsPage;
