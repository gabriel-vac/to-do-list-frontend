import React, { useContext, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button, useDisclosure } from '@chakra-ui/react';
import BeatLoader from 'react-spinners/BeatLoader';
import SidebarRow from '../SidebarRow';
import Logo from '../Icons/Logo';
import { ProjectContext } from '../../contexts/Project';
import ProjectModal from '../ProjectModal';
import { useAxios } from '../../hooks/useAxios';
import { IProject } from '../../types/typings';

function Sidebar() {
  const { projects, projectSelected, setProjects, selectProject } =
    useContext(ProjectContext);
  const projectsApi = useAxios<IProject[]>(
    { method: 'get' },
    'projects',
    () => {
      toast.error('Error listing projects...');
    },
    true,
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (projectsApi.data && projectsApi.data?.length > 0) {
      setProjects(projectsApi.data);
      selectProject(projectsApi.data[0]);
      return;
    }
    selectProject({ id: '', name: '' });
  }, [projectsApi.data]);

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

      {projectsApi.loading && (
        <div className="w-full flex items-center justify-center">
          <BeatLoader color="#36d7b7" />
        </div>
      )}

      <Button onClick={onOpen} colorScheme="teal" className="mt-3">
        New Project
      </Button>

      <ProjectModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default Sidebar;
