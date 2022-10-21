import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { navData } from './navData';

const MdxNav = ({ mdxRef }: { mdxRef: RefObject<HTMLDivElement> }) => {
  const [viewTagId, setViewTagId] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entris) => {
        const target = entris.filter((v) => v.isIntersecting)[0];
        if (target) {
          const id = target.target.id;
          viewTagId !== id && setViewTagId(id);
        }
      },
      { threshold: 0 }
    );
    mdxRef.current &&
      mdxRef.current
        .querySelectorAll('.mdx-nav-item')
        .forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, [router.asPath.split('#')[0]]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      window.addEventListener(
        'scroll',
        _.throttle(function () {
          const temp = window.scrollY > window.innerHeight;
          isVisible !== temp && setIsVisible(temp);
        }, 250)
      );
    }
  }, []);
  return (
    <div
      className={`sticky px-1 duration-300 border-l-2 w-44 top-24 2xl:w-72 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      ref={containerRef}
    >
      <ul>
        {navData.map((v, i) => (
          <li
            key={i}
            className='overflow-hidden cursor-default max-w-[170px] text-sm '
          >
            <a href={`#${v.id}`} onClick={() => setViewTagId(v.id)}>
              <div
                className={`bg-inherit flex ${
                  v.id === viewTagId &&
                  ' to-dark-gradient-to from-dark-gradient-from bg-gradient-to-r bg-clip-text text-transparent font-extrabold'
                }`}
              >
                <pre>
                  {v.type === 'h2' && ' '}
                  {v.type === 'h3' && '  '}
                </pre>
                {v.title}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MdxNav;
