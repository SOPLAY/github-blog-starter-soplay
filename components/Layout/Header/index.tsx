import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import BlogTitle from './BlogTitle';
import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLHeadElement>(null);
  const [isDown, setIsDown] = useState(false);
  useEffect(() => {
    let beforeScrollY = 0;
    document.addEventListener(
      'scroll',
      _.throttle(() => {
        const currentY = window.scrollY;

        setIsDown(
          scrollY > window.innerHeight && scrollY >= beforeScrollY
            ? true
            : false
        );
        beforeScrollY = currentY;
      }, 250)
    );
  }, []);

  return (
    <header
      className={`md:h-16 fixed h-12 top-1 w-[98%] xl:w-[calc(98%-250px)] mx-[1%] my-1 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-[8px] border rounded-xl z-10 duration-500 ease-in-out ${
        isDown && '-translate-y-24'
      }`}
      ref={headerRef}
    >
      <div className='flex items-center justify-between h-full mx-5 duration-300 text-md md:text-xl '>
        <div className='w-1/3 text-2xl'>
          <LeftHeader />
        </div>
        <div className='w-1/3 text-center'>
          <BlogTitle />
        </div>
        <div className='w-1/3 text-right'>
          <RightHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
