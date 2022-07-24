import { author, links } from '@root/blog.config';
import Link from 'next/link';
import LinkIcons from './LinkIcons';

const Footer: React.FC = () => {
  return (
    <footer className='py-3 mt-5 text-center border-t bg-base-footerBg text-base-footerText dark:bg-dark-footerBg dark:text-dark-footerText'>
      <p>
        <span className='text-sm font-[200]'>©copyright</span>{' '}
        <Link href={links.github}>{author}</Link>
      </p>
      <LinkIcons />
      <p>
        Powered by{' '}
        <Link href='https://github.com/soplay'>
          <span className='font-bold cursor-pointer'>SOPLAY</span>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
