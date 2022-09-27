/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from 'react';
import { useAxios } from '../../hooks/useAxios';
import { IProject } from '../../types/typings';

interface IProjectContextProps {
  children: React.ReactNode;
}

interface IProjectContext {
  projects: IProject[];
  listProjects: () => void;
  projectSelected: IProject;
  selectProject: (project: IProject) => void;
}

const initialValue = {
  projects: [],
  listProjects: () => {},
  projectSelected: {
    id: '',
    name: '',
  },
  selectProject: () => {},
};

export const ProjectContext = createContext<IProjectContext>(initialValue);

function ProjectProvider({ children }: IProjectContextProps) {
  const projectsApi = useAxios<IProject[]>(
    { method: 'get' },
    'projects',
    () => {},
    false,
  );
  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectSelected, setProjectSelected] = useState<IProject>({
    id: '',
    name: '',
  });

  const selectProject = (project: IProject) => {
    setProjectSelected(project);
  };

  const listProjects = () => {
    projectsApi.request();
  };

  useEffect(() => {
    if (projectsApi.data && projectsApi.data?.length > 0) {
      setProjects(projectsApi.data);
      setProjectSelected(projectsApi.data[0]);
      return;
    }
    setProjectSelected({ id: '', name: '' });
  }, [projectsApi.data]);

  return (
    <ProjectContext.Provider
      value={{ projects, listProjects, projectSelected, selectProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
