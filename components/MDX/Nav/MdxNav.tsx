import { useRouter } from 'next/router';
import React, { RefObject, useEffect, useState } from 'react';
import { navData } from './navData';

const MdxNav = ({ mdxRef }: { mdxRef: RefObject<HTMLDivElement> }) => {
  const [viewTagId, setViewTagId] = useState('');
  const router = useRouter();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entris) => {
        const id = entris[0].target.id;
        viewTagId !== id && setViewTagId(id);
      },
      { threshold: 0, rootMargin: '-25% 0px' }
    );
    mdxRef.current &&
      mdxRef.current
        .querySelectorAll('.mdx-nav-item')
        .forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, [router.asPath]);

  return (
    <div className='sticky px-1 border-l-2 top-24 '>
      <ul>
        {navData.map((v, i) => (
          <li
            key={i}
            className='max-w-[1000px] cursor-default overflow-hidden text-md'
          >
            <a href={`#${v.id}`} onClick={() => setViewTagId(v.id)}>
              <pre
                className={`bg-inherit ${
                  v.id === viewTagId &&
                  ' to-dark-gradient-to from-dark-gradient-from bg-gradient-to-r bg-clip-text text-transparent font-extrabold'
                }`}
              >
                {v.type === 'h2' && ' '}
                {v.title}
              </pre>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MdxNav;
