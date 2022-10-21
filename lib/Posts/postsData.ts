import { allPosts } from '@root/.contentlayer/generated';

/**
 *
 * @returns allPosts의 정보는 너무 무거워서 페이지 구성에 필요한 정보들만 따로 추출
 */
const postsData = allPosts.map(
  ({
    url,
    date,
    description,
    title,
    image,
    serise,
    tags,
    fixedDescription,
    _raw: { sourceFileDir },
  }) => ({
    url,
    date,
    description: description || '',
    title,
    image: image || '',
    serise: serise || '',
    tags,
    fixedDescription,
    _raw: { sourceFileDir: sourceFileDir },
  })
);

export default postsData;
