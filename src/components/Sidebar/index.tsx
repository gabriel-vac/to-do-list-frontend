import React from 'react';
import { HomeIcon } from '@heroicons/react/outline';
import SidebarRow from '../SidebarRow';
import Logo from '../Logo';
import CustomButton from '../CustomButton';

function Sidebar() {
  return (
    <div className="col-span-2 pb-6 flex flex-col items-center px-4 md:items-start">
      <div className="flex items-center">
        <Logo />
        <p className="font-semibold text-lg">Projects</p>
      </div>
      <SidebarRow Icon={HomeIcon} title="Projeto 1" />
      <SidebarRow Icon={HomeIcon} title="Projeto 2" />
      <SidebarRow Icon={HomeIcon} title="Projeto 3" />
      <SidebarRow Icon={HomeIcon} title="Projeto 4" />
      <SidebarRow Icon={HomeIcon} title="Projeto 5" />
      <CustomButton title="New Project" />
    </div>
  );
}

export default Sidebar;
