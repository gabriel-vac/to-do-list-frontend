/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { IProject } from '../../types/typings';

interface IProjectContextProps {
  children: React.ReactNode;
}

export const ProjectContext = createContext({});

function ProjectProvider({ children }: IProjectContextProps) {
  const [projectSelected, setProjectSelected] = useState<IProject>({
    id: '',
    name: '',
  });

  const selectProject = (project: IProject) => {
    setProjectSelected(project);
  };

  return (
    <ProjectContext.Provider value={{ projectSelected, selectProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
