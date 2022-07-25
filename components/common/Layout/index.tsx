import { useRecoilState, useRecoilValue } from 'recoil';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import { atomActiveNav } from './Nav/atom/atomNav';
import { useState, useEffect, useRef } from 'react';

interface ILayout {
  children: JSX.Element;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const [isActiveMenu, setIsActiveMenu] = useRecoilState(atomActiveNav);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mainRef.current?.addEventListener('scroll', function (event) {
      const current = Math.floor(
        (this.scrollTop / (this.scrollHeight - this.offsetHeight)) * 100
      );
      if (mainRef.current)
        mainRef.current.getElementsByTagName('span')[0].style.width =
          current + '%';
    });
  }, []);

  return (
    <div className='relative flex w-screen overflow-x-hidden text-base-main dark:text-dark-main'>
      <div
        className={`z-10 absolute w-64 h-full xl:translate-x-0 xl:w-64 duration-500 ${
          isActiveMenu || '-translate-x-full '
        }`}
      >
        <Nav />
      </div>
      <div
        className={`w-full h-screen relative xl:ml-64 overflow-y-scroll duration-500  ${
          isActiveMenu && 'translate-x-64 xl:translate-x-0'
        }`}
        ref={mainRef}
      >
        {/* <div className='fixed top-0 left-0 z-20 w-full border-t-2 dark:border-dark-bg' /> */}
        <span
          className={`fixed top-0 left-0 z-30 h-[4px] duration-100 ease-linear bg-gradient-to-tr from-base-gradient-from_per to-base-gradient-to_per dark:from-dark-gradient-from dark:to-dark-gradient-to `}
        />
        <Header />
        <div className=''>{children}</div>
        <Footer />
      </div>
      {isActiveMenu && (
        <div
          className={`absolute top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-sm`}
          onClick={() => setIsActiveMenu(false)}
        />
      )}
    </div>
  );
};

export default Layout;
