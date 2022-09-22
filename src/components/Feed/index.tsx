import React, { useContext } from 'react';
import { RefreshIcon } from '@heroicons/react/outline';
import { ProjectContext } from '../../contexts/Project';

function Feed() {
  const { projectSelected }: any = useContext(ProjectContext);

  return (
    <div className="col-span-7 lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">{projectSelected?.name}</h1>
        <RefreshIcon className="mr-5 mt-5 h-8 w-8 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>
    </div>
  );
}

export default Feed;
