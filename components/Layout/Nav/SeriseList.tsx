import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { atomSeriseList } from './atom/atomNav';

const SeriseList = () => {
  const serises = useRecoilValue(atomSeriseList);
  const router = useRouter();

  return (
    <div className='pt-12'>
      {serises[0] && (
        <div className='w-[80%] mx-auto'>
          <h3 className='pb-5 text-2xl font-semibold'>
            <span className='relative inline-block before:block before:absolute before:-inset-1 before:-skew-y-3 before:to-base-gradient-from before:from-base-gradient-to before:bg-gradient-to-tr'>
              <span className='relative text-white'>SeriseList</span>
            </span>
          </h3>
          <div>
            {serises.map((serise, index) => (
              <div
                key={index}
                className={`${
                  router.query.serise === serise &&
                  'text-2xl font-bold duration-300 ease-out'
                } py-[1px]`}
              >
                <Link href={`/post?serise=${serise}`}>{serise}</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeriseList;
