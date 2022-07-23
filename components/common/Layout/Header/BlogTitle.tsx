import { title } from '@root/blog.config';

const BlogTitle = () => {
  return (
    <h1 className='text-2xl font-bold text-base-title dark:text-dark-title'>
      {title}
    </h1>
  );
};

export default BlogTitle;
