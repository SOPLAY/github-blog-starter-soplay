import { title } from '@root/blog.config';
import Link from 'next/link';

const BlogTitle = () => {
  return (
    <Link href={'/'}>
      <h1 className='font-bold cursor-pointer text-base-title dark:text-dark-title'>
        {title}
      </h1>
    </Link>
  );
};

export default BlogTitle;
