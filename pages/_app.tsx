import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@root/components/Layout';
import { RecoilRoot, useRecoilState } from 'recoil';
import { allPosts } from '.contentlayer/generated';
import _ from 'lodash';
import {
  atomTaglist,
  atomSeriseList,
} from '@root/components/Layout/Nav/atom/atomNav';
import { useEffect } from 'react';

const MakeDataList = () => {
  const [tagList, setTagList] = useRecoilState(atomTaglist);
  const [seriseList, setSeriseList] = useRecoilState(atomSeriseList);
  useEffect(() => {
    if (!tagList[0]) {
      const tags = _.uniq(_.flattenDeep(_.map(allPosts, (post) => post.tags)));
      setTagList(tags);
      const serise = _.uniq(
        _.map(allPosts, (post) => (post.serise ? post.serise : ''))
      );
      setSeriseList(serise.filter((v) => v !== ''));
    }
  }, [tagList]);
  return <></>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <MakeDataList />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
