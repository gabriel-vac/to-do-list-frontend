import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { SaveIcon } from '@heroicons/react/outline';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import { ProjectContext } from '../../contexts/Project';

function Feed() {
  const { projectSelected }: any = useContext(ProjectContext);
  const [projectName, setProjectName] = useState<string>('');

  const [checked, setChecked] = useState<boolean>(false);

  const handleProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value);
  };

  useEffect(() => {
    setProjectName(projectSelected.name);
  }, [projectSelected]);

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <div className="col-span-9 md:col-span-7 lg:col-span-5 ml-5 mr-4">
      <div className="flex items-center justify-between mt-5 p-2 text-xl font-bold bg-white rounded-lg">
        <input
          className="outline-none flex-grow"
          value={projectName}
          onChange={e => handleProjectNameChange(e)}
          maxLength={30}
        />
        {projectName && projectName !== projectSelected?.name && (
          <SaveIcon className="mr-2 h-8 w-8 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
        )}
        {/* <RefreshIcon className="mr-5 h-8 w-8 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125" /> */}
      </div>
      <h2 className="text-xl font-semibold mt-5">Today’s activities</h2>
      <div className="mt-2">
        <CheckboxGroup colorScheme="teal">
          <div className="flex flex-col">
            <Checkbox isChecked={checked} onChange={e => handleCheckBox(e)}>
              Task 1
            </Checkbox>
          </div>
        </CheckboxGroup>
      </div>
    </div>
  );
}

export default Feed;
