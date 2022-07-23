import { useEffect, useState } from 'react';
import { FaSun, FaRegSun } from 'react-icons/fa';
import Search from '@components/common/Search';

const Sun = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: Dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);
  useEffect(() => {
    document.getElementsByTagName('html')[0].className = isDarkMode
      ? 'dark'
      : 'light';
  }, [isDarkMode]);

  return (
    <div
      className={`text-2xl animate-spin-slow cursor-pointer ${
        isDarkMode ? 'text-yellow-400' : 'text-gray-800'
      }`}
      onClick={() => {
        setIsDarkMode(!isDarkMode);
      }}
    >
      <FaSun />
    </div>
  );
};

const RightHeader: React.FC = () => {
  return (
    <div className='flex justify-end gap-2 text-2xl'>
      <Sun />
      <Search />
    </div>
  );
};

export default RightHeader;