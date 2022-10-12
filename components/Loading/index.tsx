import React from 'react';
import LoadingSpinner from 'public/assets/loading.svg';
const Loading = {
  default: () => <LoadingSpinner />,
  LoadPostCard: () => LoadPostCard(),
};
const LoadPostCard = () => {
  return (
    <div className='flex flex-col gap-2 p-3 border-b-2 dark:border-dark-main/80 animate-pulse'>
      <div className='w-2/3 h-6 bg-slate-700 ' />
      <div className='h-4 bg-slate-700' />
      <div className='w-1/2 h-4 bg-slate-700' />
      <div className='flex justify-end '>
        <p className='w-1/4 h-4 bg-slate-700' />
      </div>
    </div>
  );
};

export default Loading;
