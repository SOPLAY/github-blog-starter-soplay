import { allPosts, Post } from '@root/.contentlayer/generated';
import _ from 'lodash';
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Meta from '@components/common/Meta';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/autoloader/prism-autoloader';
import Image from 'next/image';
import { url } from '@root/blog.config';

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

  //fixed md, mdx file path
  const fixFilePath = (str: string) => {
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

  //code style
  const Code = (props: { children: string; className: string }) => {
    useEffect(() => {
      Prism.plugins.autoloader.languages_path =
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/';
      Prism.highlightAll();
    }, []);
    return <code className={props.className}>{props.children}</code>;
  };

  const MdxToNextIamge = (props: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  }) => (
    <div className='flex justify-center '>
      <Image {...props} src={fixFilePath(props.src)} />
    </div>
  );

  const Img = (props: { src: string; alt: string }) => (
    <div className='flex justify-center '>
      <img src={fixFilePath(props.src)} alt={props.alt} />
    </div>
  );

  const MdxContentParser = {
    code: Code,
    Image: MdxToNextIamge,
    img: Img,
  };
  return (
    <>
      <Meta
        title={post.title}
        description={post.description}
        url={router.asPath}
      />
      <div className='flex flex-col items-center justify-center h-screen text-center bg-base-title dark:bg-dark-footerBg'>
        <h1 className='mx-20 mb-3 text-2xl font-bold text-white xl:text-4xl md:text-3xl'>
          {post.title}
        </h1>
        <time>{`${year}-${month}-${day}`}</time>
      </div>
      <div className='w-4/5 min-h-screen mx-auto mt-5 prose dark:prose-invert prose-pre:bg-[#2d2d2d] pt-16'>
        {fixHydraionUiRenderServerErr && (
          <MDXContent components={MdxContentParser} />
        )}
      </div>
    </>
  );
};

export default PostsPage;
