import Head from 'next/head';
import {
  description as blogDescription,
  url as blogUrl,
  title as blogTitle,
} from '@root/blog.config';
import { useRouter } from 'next/router';

interface IMeta {
  title?: string;
  image?: string;
  description?: string;
  url?: string;
}

const Meta = ({
  title = blogTitle,
  image = `${blogUrl}/favicon/favicon_fill.webp`,
  description = blogDescription,
  url = '',
}) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:title' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url || router.asPath} />
      <meta property='og:image' content={`${image}`} />
      <meta property='og:article:author' content={title} />
    </Head>
  );
};

export default Meta;
