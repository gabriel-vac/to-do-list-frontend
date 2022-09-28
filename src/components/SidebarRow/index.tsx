import React from 'react';
import useProject from '../../contexts/Project';
import { IProject } from '../../types/typings';

interface ISidebarRowProps {
  project: IProject;
}

function SidebarRow({ project }: ISidebarRowProps) {
  const { selectProject } = useProject();

  const handleButtonClick = () => {
    selectProject(project);
  };

  return (
    <button
      type="button"
      onClick={handleButtonClick}
      className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-2xl px-4 py-3 transition-all duration-200 hover:bg-white hover:shadow-md"
    >
      <p className="font-semibold">{project?.name}</p>
    </button>
  );
}

export default SidebarRow;
