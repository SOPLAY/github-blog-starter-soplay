import { HiMenu } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { atomActiveMenu } from '../Menu/atom/atomActiveMenu';
const LeftHeader: React.FC = () => {
  const [isActiveMenu, setIsActiveMenu] = useRecoilState(atomActiveMenu);
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
