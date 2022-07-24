import { useRef } from 'react';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

const Search = () => {
  const [isActive, setIsActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const onClick = (x: number, y: number) => {
    let addWidth = 0;
    if (window) {
      //w-64
      addWidth = window.innerWidth > 1279 ? 256 : 0;
    }
    if (searchRef.current) {
      const { offsetHeight, offsetTop, offsetLeft, offsetWidth } =
        searchRef.current;
      const target = {
        top: offsetTop,
        bottom: offsetTop + offsetHeight,
        left: offsetLeft + addWidth,
        right: offsetLeft + offsetWidth + addWidth,
      };

      if (
        !(
          x > target.left &&
          x < target.right &&
          y > target.top &&
          y < target.bottom
        )
      ) {
        setIsActive(false);
      }
    }
  };

  const SearchModal = () => {
    return (
      <div
        className={`absolute top-0 left-0 w-full h-screen overflow-hidden ${
          isActive ? 'visible' : 'invisible'
        }`}
      >
        <div
          className='w-full h-screen pt-20'
          onClick={(event) => onClick(event.clientX, event.clientY)}
        >
          <div
            className='w-[80%] mx-auto relative text-left bg-base-bg rounded-xl p-5'
            ref={searchRef}
          >
            asd
          </div>
        </div>
      </div>
    );
  };

  // console.log('isActive', isActive);
  return (
    <>
      <div className='duration-300 cursor-pointer hover:text-base-hover'>
        <HiSearch onClick={() => setIsActive(!isActive)} />
      </div>
      <SearchModal />
    </>
  );
};

export default Search;
