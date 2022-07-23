import { useEffect, useState } from 'react';
import { FaSun, FaRegSun } from 'react-icons/fa';

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
      className='text-2xl animate-spin-slow'
      onClick={() => {
        setIsDarkMode(!isDarkMode);
      }}
    >
      {isDarkMode ? <FaSun /> : <FaRegSun />}
    </div>
  );
};

const RightHeader: React.FC = () => {
  return (
    <div className='flex justify-end gap-2 '>
      <Sun />
      RightHeader
    </div>
  );
};

export default RightHeader;
