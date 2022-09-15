import { HiMenu } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { atomActiveNav } from '../Nav/atom/atomNav';
const LeftHeader: React.FC = () => {
  const [isActiveMenu, setIsActiveMenu] = useRecoilState(atomActiveNav);
  return (
    <div className='gap-2'>
      <div className='xl:invisible'>
        <HiMenu
          className='cursor-pointer'
          onClick={() => {
            if (window) {
              window.innerWidth < 1279
                ? setIsActiveMenu(true)
                : setIsActiveMenu(false);
            }
          }}
        />
      </div>
    </div>
  );
};

export default LeftHeader;
