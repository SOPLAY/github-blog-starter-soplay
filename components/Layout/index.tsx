import { useRecoilState, useRecoilValue } from 'recoil';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import { atomActiveNav } from './Nav/atom/atomNav';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

interface ILayout {
  children: JSX.Element;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const [isActiveMenu, setIsActiveMenu] = useRecoilState(atomActiveNav);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window &&
      window.addEventListener('scroll', function (event) {
        const current = Math.floor(
          (this.scrollY /
            (this.document.body.scrollHeight - this.innerHeight)) *
            100
        );

        if (mainRef.current)
          mainRef.current.getElementsByTagName('span')[0].style.width =
            current + '%';
      });
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (window && mainRef.current) {
      const beforeRouterPath =
        window.sessionStorage.getItem('beforeRouterPath');

      // if (beforeRouterPath !== router.asPath)
      //   mainRef.current.scrollTo({ top: 0 });
      window.sessionStorage.setItem('beforeRouterPath', router.asPath);
    }
  }, [router]);

  return (
    <div className='relative flex w-screen text-base-main dark:text-dark-main '>
      <div
        className={`z-10 fixed w-64 h-full xl:translate-x-0 xl:w-64 duration-500 ${
          isActiveMenu || '-translate-x-full '
        }`}
      >
        <Nav />
      </div>
      <div
        className={`w-full relative xl:ml-64 duration-500  ${
          isActiveMenu && 'translate-x-64 xl:translate-x-0'
        }`}
        ref={mainRef}
      >
        <span
          className={`fixed top-0 left-0 z-30 h-[4px] duration-300 ease-linear bg-gradient-to-tr from-base-gradient-from_per to-base-gradient-to_per dark:from-dark-gradient-from dark:to-dark-gradient-to `}
        />
        <Header />
        <div className='scroll-smooth'>{children}</div>
        <Footer />
      </div>
      {isActiveMenu && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm`}
          onClick={() => setIsActiveMenu(false)}
        />
      )}
    </div>
  );
};

export default Layout;
