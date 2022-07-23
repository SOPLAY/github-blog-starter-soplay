import UserLogo from '@components/common/UserLogo';
import { author } from '@root/blog.config';

const UserInfo = () => {
  return (
    <div className='relative'>
      <div className='h-20 bg-gradient-to-tr from-blue-400 to-purple-400' />
      <div className='-translate-y-[50px] '>
        <UserLogo />
        <h3 className='mt-2 font-bold text-center text-base-title'>{author}</h3>
      </div>
    </div>
  );
};

export default UserInfo;
