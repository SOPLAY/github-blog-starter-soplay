import Footer from './Footer';
import Header from './Header';

interface ILayout {
  children: JSX.Element;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className='relative text-base-main'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
