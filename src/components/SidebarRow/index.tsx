import React, { SVGProps, useContext } from 'react';
import { ProjectContext } from '../../contexts/Project';

interface ISidebarRowProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
}

function SidebarRow({ title, Icon }: ISidebarRowProps) {
  const { selectProject }: any = useContext(ProjectContext);

  const handleButtonClick = (titleP: string) => {
    selectProject({ name: titleP });
  };

  return (
    <button
      type="button"
      onClick={() => handleButtonClick(title)}
      className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-2xl px-4 py-3 transition-all duration-200 hover:bg-white hover:shadow-md"
    >
      <Icon className="h-6 w-6" />
      <p className="font-semibold">{title}</p>
    </button>
  );
}

export default SidebarRow;
