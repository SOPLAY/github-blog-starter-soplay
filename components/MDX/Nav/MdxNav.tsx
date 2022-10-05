import React from 'react';
import { navData } from './navData';

const MdxNav = ({ viewTagId }: { viewTagId: string }) => {
  console.log(navData);
  return (
    <div className='sticky pr-5 top-24'>
      <ul>
        {navData.map((v, i) => (
          <li
            key={i}
            className='max-w-[1000px] cursor-default overflow-hidden text-md'
          >
            <pre
              className={`duration-300  bg-inherit ${
                v.id === viewTagId &&
                ' to-dark-gradient-to from-dark-gradient-from bg-gradient-to-r bg-clip-text text-transparent  font-extrabold'
              }`}
            >
              {v.type === 'h2' && '  '}
              {v.title}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MdxNav;
