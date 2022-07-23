import { title } from '@root/blog.config';
import BlogTitle from './BlogTitle';
import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';
const Header: React.FC = () => {
  return (
    <header className='sticky top-0 h-12 bg-white/10 backdrop-blur-md '>
      <style jsx>{`
        h1 {
          @apply text-xl;
        }
      `}</style>
      <div className='flex items-center justify-between h-full md:mx-5 '>
        <LeftHeader />
        <BlogTitle />
        <RightHeader />
      </div>
    </header>
  );
};

export default Header;
