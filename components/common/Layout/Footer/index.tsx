import { author } from '@root/blog.config';
import Link from 'next/link';
import LinkIcons from './LinkIcons';

const Footer: React.FC = () => {
  return (
    <footer className='py-3 text-center border-t '>
      <p>
        <span className='text-sm font-[200]'>©copyright</span> {author}
      </p>
      <LinkIcons />
      <p>
        Powered by{' '}
        <Link href='https://github.com/soplay'>
          <span className='font-bold '>SOPLAY</span>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
