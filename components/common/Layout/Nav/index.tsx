import UserInfo from './UserInfo';
import { HiX } from 'react-icons/hi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { atomActiveNav, atomSeriseList, atomTaglist } from './atom/atomNav';
import TagList from './TagList';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SeriseList from './SeriseList';
const Nav = () => {
  const [isActivMenu, setIsActivMenu] = useRecoilState(atomActiveNav);
  const tagsListAtom = useRecoilValue(atomTaglist);
  const seriseListAtom = useRecoilValue(atomSeriseList);
  const router = useRouter();
  useEffect(() => {
    setIsActivMenu(false);
  }, [router.query.tags, router.query.serise]);
  return (
    <div className='sticky top-0 h-screen overflow-y-auto bg-white shadow-[1px_1px_10px_rgba(0,0,0,.2)] dark:bg-dark-bg xl:w-64 duration-0'>
      <div
        className={`text-white absolute z-20 inline text-2xl top-3 left-3 md:top-5 md:left-5 md:text-3xl cursor-pointer ${
          isActivMenu ? 'visible' : 'invisible'
        }`}
        onClick={() => {
          setIsActivMenu(false);
        }}
      >
        <HiX />
      </div>
      <UserInfo />
      {tagsListAtom.length !== 0 && <TagList />}

      {seriseListAtom.length !== 0 && <SeriseList />}
    </div>
  );
};

export default Nav;
