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
  updateProject: (project: IProject) => void;
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
  updateProject: () => {},
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

  const updateProject = (project: IProject) => {
    const newArray = projects.map(item => {
      if (item.id === project.id) {
        // setProjectSelected({ ...projectSelected, name: project.name });
        return { ...item, name: project.name };
      }
      return item;
    });

    setProjects(newArray);
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
        updateProject,
        removeProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
