import Meta from '@root/components/common/Meta';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Meta />
    </div>
  );
};

export default Home;
