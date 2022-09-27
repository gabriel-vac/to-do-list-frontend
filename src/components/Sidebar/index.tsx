/* eslint-disable import/extensions */
import React, { useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Button, useDisclosure } from '@chakra-ui/react';
import SidebarRow from '../SidebarRow';
import Logo from '../Icons/Logo';
import { ProjectContext } from '../../contexts/Project';
import ProjectModal from '../ProjectModal';

function Sidebar() {
  const { listProjects, projects, projectSelected } =
    useContext(ProjectContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
        projects?.map(project => (
          <SidebarRow key={project.id} project={project} />
        ))}

      <Button onClick={onOpen} colorScheme="teal" className="mt-3">
        New Project
      </Button>

      <ProjectModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default Sidebar;
