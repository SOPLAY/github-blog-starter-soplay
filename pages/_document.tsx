import { Head, Html, Main, NextScript } from 'next/document';

const _document = () => {
  return (
    <Html lang='ko'>
      <Head>
        <link
          href='/favicon-16x16.png'
          rel='icon'
          type='image/png'
          sizes='16x16'
        />
        <link
          href='/favicon-32x32.png'
          rel='icon'
          type='image/png'
          sizes='32x32'
        />
      </Head>
      <body className='duration-300 dark:bg-dark-bg bg-base-bg'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;
