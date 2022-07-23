import { title } from '@root/blog.config';
import BlogTitle from './BlogTitle';
import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';
const Header: React.FC = () => {
  return (
    <header className='sticky top-0 h-12 bg-white/10 backdrop-blur-md '>
      <div className='flex items-center justify-between h-full mx-5 '>
        <div className='w-1/3'>
          <LeftHeader />
        </div>
        <div className='w-1/3 text-center'>
          <BlogTitle />
        </div>
        <div className='w-1/3 text-right'>
          <RightHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
