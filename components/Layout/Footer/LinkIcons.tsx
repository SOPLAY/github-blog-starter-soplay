import { links } from '@root/blog.config';
import Link from 'next/link';
import {
  SiDiscord,
  SiGithub,
  SiInstagram,
  SiKakaotalk,
  SiLinkedin,
  SiNotion,
} from 'react-icons/si';

const LinkIcons: React.FC = () => {
  const linksData = [
    { title: 'github', links: links.github, icons: <SiGithub /> },
    { title: 'linkedin', links: links.linkedin, icons: <SiLinkedin /> },
    { title: 'notion', links: links.notion, icons: <SiNotion /> },
    { title: 'kakao', links: links.kakao, icons: <SiKakaotalk /> },
    { title: 'discord', links: links.discord, icons: <SiDiscord /> },
    { title: 'instagram', links: links.instagram, icons: <SiInstagram /> },
  ];
  return (
    <div className='flex justify-center'>
      {linksData.map(
        (v, i) =>
          v.links && (
            <Link href={v.links} key={i}>
              <div className='m-1 text-2xl cursor-pointer '>{v.icons}</div>
            </Link>
          )
      )}
    </div>
  );
};
export default LinkIcons;
