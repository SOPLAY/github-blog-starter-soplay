import { allPosts, Post } from '@root/.contentlayer/generated';
import _ from 'lodash';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Meta from '@components/common/Meta';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/autoloader/prism-autoloader';
import Image from 'next/image';
import { BsTagsFill } from 'react-icons/bs';
import Link from 'next/link';
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

    return require(`../../posts/${post._raw.sourceFileDir}/${str.replace(
      './',
      ''
    )}`).default.src;
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
                <h4 className='text-base'>{v}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/**
       * 글이 시리즈일 경우 처리 필요
       * 현재 -> 시리즈일 경우 시리즈 목록 출력 예정 ( 나미지 태그나 메인 화면긍 그대로 유지)
       */}
      <div className='w-4/5 min-h-screen mx-auto mt-5 prose dark:prose-invert prose-pre:bg-[#2d2d2d] pt-16'>
        {post.serise && (
          <div className={'mb-20'}>
            <blockquote>
              {' '}
              <h2>
                {' '}
                해당 게시글은{' '}
                <Link href={`/post?serise=${post.serise}`}>
                  <span className='text-red-400 underline cursor-pointer'>
                    {post.serise}
                  </span>
                </Link>
                시리즈 입니다.
              </h2>
            </blockquote>
            <pre>
              <ul>
                {_.orderBy(
                  _.filter(allPosts, { serise: post.serise }),
                  'date',
                  'asc'
                ).map((serirsePost, index) => (
                  <li key={index}>
                    {serirsePost.title === post.title ? (
                      <div>
                        <span>🚩 </span>
                        {post.title}
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
        )}
        {fixHydraionUiRenderServerErr && (
          <MDXContent components={MdxContentParser} />
        )}
      </div>
    </>
  );
};

export default PostsPage;
