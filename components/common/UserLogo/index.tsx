import { useEffect } from 'react';
import { links } from '@root/blog.config';
import { useRecoilState } from 'recoil';
import { atomUserLogo } from './atom/atomUserLogo';
import _ from 'lodash';
import Image from 'next/image';

const UserLogo: React.FC = () => {
  const [userLogo, setUserLogo] = useRecoilState(atomUserLogo);

  useEffect(() => {
    const getGitUserData = async () => {
      const gitLinks = _.split(links.github, '/');
      const userNick =
        gitLinks[_.findIndex(gitLinks, (v) => v === 'github.com') + 1];
      const data: { avatar_url: string } = await fetch(
        `https://api.github.com/users/${userNick}`
      ).then((res) => res.json());
      setUserLogo(data.avatar_url);
    };
    !userLogo && getGitUserData();
  }, [userLogo]);

  return (
    <div className='text-center'>
      <div className='inline-block overflow-hidden rounded-full w-[100px] h-[100px] ring'>
        {userLogo && (
          <Image
            src={userLogo}
            width={100}
            height={100}
            alt='userGitAvatar'
            priority={true}
          />
        )}
      </div>
    </div>
  );
};

export default UserLogo;
