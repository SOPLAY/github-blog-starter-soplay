import Link from 'next/link';
import UserLogo from '../UserLogo';

interface IPostCard {
  title: string;
  date: string;
  description: string;
  url: string;
  tags?: string[];
  serise?: string;
  image?: string;
}
const PostCard: React.FC<IPostCard> = (props) => {
  const { url, date, description, title, image, serise, tags } = props;

  const [month, day, year] = new Date(date.slice(0, 10))
    .toString()
    .split(' ')
    .slice(1, 4);

  return (
    <div className='w-full mx-auto my-1 overflow-hidden ease-in-out cursor-pointer hover:duration-300 hover:scale-110'>
      <Link href={url}>
        <div className='flex w-full h-full px-8 '>
          <div className='flex flex-col justify-between w-full py-4 '>
            <div>
              <h1 className='text-3xl font-bold'> {title}</h1>
              <h2 className='pt-2 text-md'>{description}</h2>
            </div>
            <p className='text-base-footerText/70 '>{`${month} ${day}, ${year}`}</p>
          </div>
          <div className='relative flex items-center justify-center w-32 overflow-hidden '>
            {image ? (
              <img src={image} className='w-12 shadow-sm md:w-32 rounded-2xl' />
            ) : (
              <div className='duration-300 scale-75 md:scale-90 xl:scale-100'>
                <UserLogo />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
