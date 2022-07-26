import { useEffect, useState } from 'react';
import { FaSun } from 'react-icons/fa';
import Search from '@components/common/Search';

const Sun = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: Dark)').matches;
      const sessionDark = window.sessionStorage.getItem('isDarkMode');

      setIsDarkMode(
        sessionDark === null
          ? prefersDark
          : sessionDark === 'true'
          ? true
          : false
      );
    }
  }, []);
  useEffect(() => {
    document.getElementsByTagName('html')[0].className = isDarkMode
      ? 'dark'
      : 'light';
  }, [isDarkMode]);

  const [SessionStorage, setSessionStorage] = useState(false);
  useEffect(() => {
    if (SessionStorage && window) {
      window.sessionStorage.setItem('isDarkMode', isDarkMode + '');
      setSessionStorage(false);
    }
  });

  return (
    <div
      className={`animate-spin-slow cursor-pointer ${
        isDarkMode ? 'text-yellow-400' : 'text-gray-800'
      }`}
      onClick={() => {
        setSessionStorage(true);
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
