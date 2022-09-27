export interface IProject {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITask {
  id: string;
  name: string;
  responsible: string;
  deadline: string;
  done: boolean;
  projectId?: string;
  createdAt?: string;
  updatedAt?: string;
}
