import Image from 'next/image';
import Link from 'next/link';
import UserLogo from '../UserLogo';
interface IPostCard {
  title: string;
  date: string;
  description?: string;
  fixedDescription: string;
  url: string;
  tags?: string[];
  serise?: string;
  image?: string;
}
const PostCard: React.FC<IPostCard> = (props) => {
  const {
    url,
    date,
    description,
    title,
    image,
    serise,
    tags,
    fixedDescription,
  } = props;
  const fixFilePath =
    process.env.NODE_ENV === 'production' ? `../${image}` : image;

  const [year, month, day] = date
    .slice(0, 10)
    .split('-')
    .map((v) => +v);

  return (
    <div className='duration-300 border-b-2 min-h-32 group hover:scale-110 dark:border-dark-main/80 '>
      <Link href={url}>
        <div className='flex flex-col h-full cursor-pointer bg-base-bg dark:bg-dark-bg'>
          {image && fixFilePath && (
            <div className='relative h-52 '>
              <Image
                src={fixFilePath}
                layout='fill'
                objectFit='cover'
                draggable='false'
                alt={`${title} post 이미지`}
                placeholder='blur'
                blurDataURL={fixFilePath}
                width={200}
                height={300}
              />
            </div>
          )}
          <div className={`p-3 flex-col flex justify-between`}>
            <div>
              <h2 className='text-xl font-bold md:text-lg text-md group-hover:text-transparent group-hover:bg-clip-text group-hover:to-base-gradient-to group-hover:from-base-gradient-from group-hover:bg-gradient-to-l'>
                {title}
              </h2>
              <p className='pt-1 overflow-auto text-base-main/90 dark:text-dark-main/90'>
                {description || fixedDescription}
              </p>
            </div>
            <div className='flex justify-between w-full pt-3 text-sm font-light'>
              <p className='text-base-main/85 dark:text-dark-main/80'>
                {serise ||
                  (tags &&
                    tags.slice(0, 3).map((tagName, index) => (
                      <span key={index} className={`${index > 0 && 'ml-2'} `}>
                        {tagName}
                      </span>
                    )))}
              </p>
              <p className=' text-base-main/85 dark:text-dark-main/80'>{`${year}년 ${month}월 ${day}일`}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
