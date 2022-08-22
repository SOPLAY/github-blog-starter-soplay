import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

interface IInput {
  set: (value?: any) => void;
}
const Input: React.FC<IInput> = ({ set }) => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  return (
    <div className='relative'>
      <input
        type='text'
        className='w-full h-12 px-4 text-2xl rounded-full bg-base-bg border-[3px] dark:bg-dark-bg placeholder:text-dark-footerText dark:text-dark-title '
        placeholder='Search...'
        onChange={(e) => {
          setInputValue(e.target.value);
          set(e.target.value);
          router.push({ query: { ...router.query, search: e.target.value } });
        }}
        value={inputValue}
      />
      <div className='absolute top-0 text-3xl right-4'>
        <div className='flex items-center h-12 '>
          <HiSearch />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Input);
