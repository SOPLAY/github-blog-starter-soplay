import { allPosts } from '.contentlayer/generated';
import _ from 'lodash';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { atomTaglist } from './atom/atomNav';

const TagList = () => {
  const tags = useRecoilValue(atomTaglist);
  return (
    <div className='pt-5 border-t'>
      <div className='w-[80%] mx-auto'>
        <h3 className='pb-5 text-2xl font-semibold'>
          <span className='relative inline-block before:block before:absolute before:-inset-1 before:-skew-y-3 before:to-base-gradient-from before:from-base-gradient-to before:bg-gradient-to-tr'>
            <span className='relative text-white'>TagList</span>
          </span>
        </h3>
        <div>
          {tags.map((tag, index) => (
            <div key={index}>
              <Link href={`/post?tags=${tag}`}>{tag}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagList;
