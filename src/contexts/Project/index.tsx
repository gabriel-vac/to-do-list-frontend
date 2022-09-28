/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState } from 'react';
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

export function ProjectProvider({ children }: IProjectContextProps) {
  const [projects, setProjects] = useState<IProject[]>(initialValue.projects);
  const [projectSelected, setProjectSelected] = useState<IProject>(
    initialValue.projectSelected,
  );

  const selectProject = (project: IProject) => {
    setProjectSelected(project);
  };

  const addProject = (project: IProject) => {
    projects.push(project);
    if (projects.length === 1) {
      setProjectSelected(project);
    }
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
    let newSelectedProject = newArray[newArray.length - 1];
    if (!newSelectedProject) {
      newSelectedProject = {
        id: initialValue.projectSelected.id,
        name: initialValue.projectSelected.name,
      };
    }
    setProjectSelected(newSelectedProject);
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

export default function useProject() {
  return useContext(ProjectContext);
}
