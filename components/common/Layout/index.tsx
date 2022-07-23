import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';

interface ILayout {
  children: JSX.Element;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className='relative flex text-base-main dark:text-dark-main'>
      <div className='relative w-0 md:w-64'>
        <Menu />
      </div>
      <div className=''>
        <Header />
        <div className='w-full overflow-y-auto'>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
