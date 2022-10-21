import { utterancRepoUrl } from '@root/blog.config';
import React, { useEffect, useRef, useState } from 'react';

const Utteranc = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(
      document.getElementsByTagName('html')[0].classList[0] === 'dark'
    );
  });
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('theme', `github-light`);
    script.setAttribute('issue-term', 'title');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('repo', utterancRepoUrl);
    ref1.current && ref1.current.appendChild(script);
  }, []);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('theme', `github-dark`);
    script.setAttribute('issue-term', 'title');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('repo', utterancRepoUrl);
    ref2.current && ref2.current.appendChild(script);
  }, []);
  return (
    <>
      <div className='dark:hidden'>
        <div ref={ref1}></div>
      </div>
      <div className='hidden dark:block '>
        <div ref={ref2}></div>
      </div>
    </>
  );
};

export default Utteranc;
