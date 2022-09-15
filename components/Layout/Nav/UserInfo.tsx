import UserLogo from '@root/components/UserLogo';
import { author } from '@root/blog.config';

const UserInfo = () => {
  return (
    <div className='relative'>
      <div className='h-20 bg-gradient-to-tr from-base-gradient-from to-base-gradient-to dark:from-dark-gradient-from dark:to-dark-gradient-to' />
      <div className='-translate-y-[50px] '>
        <UserLogo />
        <h3 className='mt-2 text-2xl font-bold text-center text-base-title dark:text-dark-title'>
          {author}
        </h3>
      </div>
    </div>
  );
};

export default UserInfo;
