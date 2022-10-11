import Image from 'next/image';
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
    <div className='duration-300 border-2 min-h-32 group hover:scale-110 dark:border-dark-main/80'>
      <Link href={url}>
        <div className='flex flex-col h-full cursor-pointer bg-base-bg dark:bg-dark-bg'>
          {image && (
            <div className='relative h-52 '>
              (
              <Image
                src={image}
                layout='fill'
                objectFit='cover'
                draggable='false'
              />
              )
            </div>
          )}
          <div className={`p-3 flex-col flex justify-between`}>
            <div>
              <h2 className='text-xl font-bold md:text-lg text-md group-hover:text-transparent group-hover:bg-clip-text group-hover:to-base-gradient-to group-hover:from-base-gradient-from group-hover:bg-gradient-to-l'>
                {title}
              </h2>
              <p className='pt-1 text-base-main/90 dark:text-dark-main/90'>
                {description}
              </p>
            </div>
            <p className='pt-3 text-base-main/70 text-end dark:text-dark-main/80'>{`${month} ${day}, ${year}`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
