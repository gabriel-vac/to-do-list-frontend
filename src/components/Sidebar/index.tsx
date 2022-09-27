/* eslint-disable import/extensions */
import React, { useContext, useEffect } from 'react';
import { HomeIcon } from '@heroicons/react/outline';
import { Toaster } from 'react-hot-toast';
import SidebarRow from '../SidebarRow';
import Logo from '../Icons/Logo';
import CustomButton from '../CustomButton';
import { ProjectContext } from '../../contexts/Project';
import { IProject } from '../../types/typings';

function Sidebar() {
  const { listProjects, projects, projectSelected } =
    useContext(ProjectContext);

  useEffect(() => {
    listProjects();
  }, []);

  return (
    <div className="col-span-9 md:col-span-2 pb-6 flex flex-col items-center px-4 md:items-start">
      <Toaster />
      <div className="flex items-center">
        <Logo />
        <p className="font-semibold text-lg">Projects</p>
      </div>

      {projectSelected.id &&
        projects?.map((project: IProject) => (
          <SidebarRow key={project.id} Icon={HomeIcon} project={project} />
        ))}

      <CustomButton title="New Project" />
    </div>
  );
}

export default Sidebar;
