/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';

export const ProjectContext = createContext({});

interface IProject {
  name: string;
}

function ProjectProvider({ children }: any) {
  const [projectSelected, setProjectSelected] = useState<IProject>({
    name: 'teste',
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
