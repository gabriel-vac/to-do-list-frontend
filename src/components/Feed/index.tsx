/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import {
  TrashIcon,
  SaveIcon,
  ExclamationCircleIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import toast, { Toaster } from 'react-hot-toast';
import { CheckboxGroup } from '@chakra-ui/checkbox';
import { Stack } from '@chakra-ui/react';
import { ProjectContext } from '../../contexts/Project';
import { useAxios } from '../../hooks/useAxios';
import { ITask } from '../../types/typings';
import CustomCheckBox from '../CustomCheckBox';
import { useAlert } from '../../hooks/useAlert';
import { baseURL, headers } from '../../consts';

function Feed() {
  const { projectSelected, listProjects } = useContext(ProjectContext);
  const alert = useAlert();

  const [projectName, setProjectName] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [userTasks, setUserTasks] = useState<ITask[]>([]);
  const getTasksAPI = useAxios<ITask[]>(
    { method: 'GET' },
    `tasks/${projectSelected?.id}`,
    () => toast.error('Ocorreu um erro'),
    false,
  );

  const handleProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value);
  };

  const deleteProject = async () => {
    const requestOptions = {
      method: 'DELETE',
    };

    const response = await fetch(
      `${baseURL}projects/${projectSelected?.id}`,
      requestOptions,
    );
    if (response.status === 200) {
      listProjects();
      toast.success('Projeto deletado!!');
    }
  };

  const handleDeleteProject = () => {
    alert.confirm({
      deleteFunction: deleteProject,
      title: 'Deseja deletar o projeto?',
    });
  };

  const handleUpdateProject = async () => {
    const requestOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name: projectName }),
    };

    const response = await fetch(
      `${baseURL}projects/${projectSelected?.id}`,
      requestOptions,
    );
    if (response.status === 200 || response.status === 201) {
      toast.success('Projeto atualizado com sucesso!!');
      return;
    }
    toast.error('Erro ao atualizar projeto...');
  };

  useEffect(() => {
    if (projectSelected.name) {
      setProjectName(projectSelected.name);
    }
  }, [projectSelected]);

  useEffect(() => {
    if (projectSelected.id) {
      setTasks([]);
      setUserTasks([]);
      getTasksAPI.request();
    }
  }, [projectSelected]);

  useEffect(() => {
    if (selectedUser) {
      const userArrays = getTasksAPI?.data?.filter(
        item => item.responsible === selectedUser,
      );
      const rest = getTasksAPI?.data?.filter(
        item => item.responsible !== selectedUser,
      );
      setUserTasks(userArrays as ITask[]);
      setTasks(rest as ITask[]);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (getTasksAPI.data && getTasksAPI.data?.length > 0) {
      setTasks(getTasksAPI.data);
    }
  }, [getTasksAPI.data]);

  return (
    <div className="col-span-9 md:col-span-7 lg:col-span-5 ml-5 mr-4">
      <div>
        <Toaster />
      </div>

      {projectSelected?.id ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-grow justify-between mt-5 p-2 text-xl font-bold bg-white rounded-lg">
              <input
                className="outline-none flex-grow"
                value={projectName}
                onChange={e => handleProjectNameChange(e)}
                maxLength={30}
              />
              {projectName && projectName !== projectSelected?.name && (
                <SaveIcon
                  onClick={handleUpdateProject}
                  className="mr-2 h-7 w-7 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
                />
              )}
            </div>
            <TrashIcon
              className="mr-5 mt-4 h-8 w-8 cursor-pointer text-yellow-300  transition-all duration-500 ease-out hover:scale-125"
              onClick={handleDeleteProject}
            />
          </div>

          <div className="flex space-x-2 mt-5">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <button type="button" onClick={() => getTasksAPI.request()}>
              <RefreshIcon className="mr-2 h-7 w-7 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
            </button>
          </div>
          <div className="mt-2">
            <CheckboxGroup colorScheme="teal">
              <Stack pl={6} mt={1} spacing={1}>
                {tasks?.map(task => (
                  <div key={task.id} className="flex space-x-3">
                    <CustomCheckBox
                      id={task.id}
                      name={task.name}
                      deadline={task.deadline}
                      responsible={task.responsible}
                      done={task.done}
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedUser(task.responsible)}
                      className="text-blue-400 text-lg"
                    >
                      @{task.responsible}
                    </button>
                    <div className="text-gray-700 text-md">{task.deadline}</div>
                  </div>
                ))}
              </Stack>
            </CheckboxGroup>
          </div>

          {selectedUser && userTasks.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-5">
                {selectedUser}&apos;s tasks
              </h2>
              <div className="mt-2">
                <CheckboxGroup colorScheme="teal">
                  <Stack pl={6} mt={1} spacing={1}>
                    {userTasks.map(task => (
                      <div key={task.id} className="flex space-x-3">
                        <CustomCheckBox
                          id={task.id}
                          name={task.name}
                          deadline={task.deadline}
                          responsible={task.responsible}
                          done={task.done}
                        />
                        <button
                          type="button"
                          onClick={() => setSelectedUser(task.responsible)}
                          className="text-blue-400 text-lg"
                        >
                          @{task.responsible}
                        </button>
                        <div className="text-gray-700 text-md">
                          {task.deadline}
                        </div>
                      </div>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center space-x-1 mt-5 p-2 text-xl font-bold bg-white rounded-lg">
          <ExclamationCircleIcon className="mr-2 h-8 w-8 text-primary" />
          <p>Nenhum projeto encontrado :(</p>
        </div>
      )}
    </div>
  );
}

export default Feed;
