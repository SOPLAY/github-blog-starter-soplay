import React, { useEffect } from 'react';
import { Post } from '@root/.contentlayer/generated';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/autoloader/prism-autoloader';
import Image from './Image';
import { navData, navDataClear } from './Nav/navData';
const MDXComponents = (post: Post) => {
  //fixed md, mdx file path
  const fixFilePath = (str: string) => {
    ['https://', 'http://'];
    if (
      str.slice(0, 8).includes('https://') ||
      str.slice(0, 7).includes('http://')
    )
      return str;

    return require(`../../posts/${post._raw.sourceFileDir}/${str.replace(
      './',
      ''
    )}`).default.src;
  };

  //code style
  const Code = (props: { children: string; className: string }) => {
    useEffect(() => {
      Prism.plugins.autoloader.languages_path =
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/';
      Prism.highlightAll();
    }, []);
    return <code className={props.className}>{props.children}</code>;
  };

  const Img = (props: { src: string; alt: string }) => (
    <div className='flex justify-center '>
      <img src={fixFilePath(props.src)} alt={props.alt} />
    </div>
  );

  //add MdxNav data
  navDataClear();
  function setMdxNavData(text: string, type: string) {
    const id = text.replaceAll(' ', '_');
    navData.push({ id, title: text, type });
    if (type === 'h1') return <h1 id={id}>{text}</h1>;
    else return <h2 id={id}>{text}</h2>;
  }

  const MDXStyle = {
    code: Code,
    Image: (props: any) => Image({ ...props, post }),
    img: Img,
    h1: (props: { children: string }) => {
      return setMdxNavData(props.children, 'h1');
    },
    h2: (props: { children: string }) => {
      return setMdxNavData(props.children, 'h2');
    },
  };
  return MDXStyle;
};

export default MDXComponents;
