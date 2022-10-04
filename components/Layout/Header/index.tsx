import BlogTitle from './BlogTitle';
import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';
const Header: React.FC = () => {
  return (
    <header className='md:h-16 fixed h-12 top-1 w-[98%] xl:w-[calc(98%-250px)] mx-[1%] my-1 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-[8px] border rounded-xl z-10'>
      <div className='flex items-center justify-between h-full mx-5 duration-300 text-md md:text-xl '>
        <div className='w-1/3 text-2xl'>
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