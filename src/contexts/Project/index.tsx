/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { IProject } from '../../types/typings';

interface IProjectContextProps {
  children: React.ReactNode;
}

interface IProjectContext {
  projects: IProject[];
  setProjects: (projects: IProject[]) => void;
  projectSelected: IProject;
  selectProject: (project: IProject) => void;
  addProject: (project: IProject) => void;
  removeProject: (project: IProject) => void;
}

const initialValue = {
  projects: [],
  setProjects: () => {},
  projectSelected: {
    id: '',
    name: '',
  },
  selectProject: () => {},
  addProject: () => {},
  removeProject: () => {},
};

export const ProjectContext = createContext<IProjectContext>(initialValue);

function ProjectProvider({ children }: IProjectContextProps) {
  const [projects, setProjects] = useState<IProject[]>(initialValue.projects);
  const [projectSelected, setProjectSelected] = useState<IProject>(
    initialValue.projectSelected,
  );

  const selectProject = (project: IProject) => {
    setProjectSelected(project);
  };

  const addProject = (project: IProject) => {
    projects.push(project);
  };

  const removeProject = (project: IProject) => {
    const newArray = projects.filter(item => {
      return item !== project;
    });

    setProjects(newArray);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        projectSelected,
        selectProject,
        addProject,
        removeProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
