import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { SaveIcon } from '@heroicons/react/outline';
import toast, { Toaster } from 'react-hot-toast';
import { CheckboxGroup } from '@chakra-ui/checkbox';
import { Stack } from '@chakra-ui/react';
import { ProjectContext } from '../../contexts/Project';
import { useAxios } from '../../hooks/useAxios';
import { ITask } from '../../types/typings';
import CustomCheckBox from '../Checkbox';

function Feed() {
  const { projectSelected }: any = useContext(ProjectContext);

  const [projectName, setProjectName] = useState<string>('');
  const getTasksAPI = useAxios<ITask[]>(
    { method: 'GET' },
    `tasks/${projectSelected?.id}`,
    () => toast.error('Ocorreu um erro'),
    false,
  );

  const handleProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value);
  };

  useEffect(() => {
    setProjectName(projectSelected?.name);
  }, [projectSelected]);

  useEffect(() => {
    if (projectSelected.id) {
      getTasksAPI.request();
    }
  }, [projectSelected]);

  return (
    <div className="col-span-9 md:col-span-7 lg:col-span-5 ml-5 mr-4">
      <div>
        <Toaster />
      </div>

      <div className="flex items-center justify-between mt-5 p-2 text-xl font-bold bg-white rounded-lg">
        <input
          className="outline-none flex-grow"
          value={projectName}
          onChange={e => handleProjectNameChange(e)}
          maxLength={30}
        />
        {projectName && projectName !== projectSelected?.name && (
          <SaveIcon className="mr-2 h-7 w-7 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
        )}
        {/* <RefreshIcon className="mr-5 h-8 w-8 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125" /> */}
      </div>
      <h2 className="text-xl font-semibold mt-5">Today’s activities</h2>
      <div className="mt-2">
        <CheckboxGroup colorScheme="teal">
          <Stack pl={6} mt={1} spacing={1}>
            {getTasksAPI.data?.map(task => (
              <div key={task.id} className="flex space-x-3">
                <CustomCheckBox
                  id={task.id}
                  name={task.name}
                  deadline={task.deadline}
                  responsible={task.responsible}
                  done={task.done}
                />
                <div>aaa</div>
              </div>
            ))}
          </Stack>
        </CheckboxGroup>
      </div>
    </div>
  );
}

export default Feed;
