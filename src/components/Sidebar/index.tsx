/* eslint-disable import/extensions */
import React, { useContext, useEffect } from 'react';
import { HomeIcon } from '@heroicons/react/outline';
import toast, { Toaster } from 'react-hot-toast';
import SidebarRow from '../SidebarRow';
import Logo from '../Icons/Logo';
import CustomButton from '../CustomButton';
import { useAxios } from '../../hooks/useAxios';
import { IProject } from '../../types/typings';
import { ProjectContext } from '../../contexts/Project';

function Sidebar() {
  const api = useAxios<IProject[]>(
    { method: 'get' },
    'projects',
    () => toast.error('Ocorreu um erro'),
    true,
  );
  const { selectProject }: any = useContext(ProjectContext);

  useEffect(() => {
    if (api.data && api.data.length > 0) {
      selectProject(api.data[0]);
    }
  }, [api.data]);

  return (
    <div className="col-span-9 md:col-span-2 pb-6 flex flex-col items-center px-4 md:items-start">
      <Toaster />
      <div className="flex items-center">
        <Logo />
        <p className="font-semibold text-lg">Projects</p>
      </div>

      {api.data?.map(project => (
        <SidebarRow key={project.id} Icon={HomeIcon} project={project} />
      ))}

      <CustomButton title="New Project" />
    </div>
  );
}

export default Sidebar;
