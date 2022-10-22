import { Head, Html, Main, NextScript } from 'next/document';
import { url } from '@root/blog.config';
const _document = () => {
  let fixedUrl = url;
  fixedUrl = '../../' + fixedUrl.split('/').filter((v) => v !== '')[2];
  const debug = process.env.NODE_ENV !== 'production';
  return (
    <Html lang='ko'>
      <Head>
        <link
          href={`${!debug ? fixedUrl : ''}/favicon/favicon-16x16.png`}
          rel='icon'
          type='image/png'
          sizes='16x16'
        />
        <link
          href={`${!debug ? fixedUrl : ''}/favicon/favicon-32x32.png`}
          rel='icon'
          type='image/png'
          sizes='32x32'
        />
      </Head>
      <body className=' dark:bg-dark-bg bg-base-bg'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;
