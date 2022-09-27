import { Checkbox } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { baseURL } from '../../consts';
import { ITask } from '../../types/typings';

function CustomCheckBox({ id, name, deadline, responsible, done }: ITask) {
  const [checked, setChecked] = useState<boolean>(done);

  const handleCheckBox = async (e: ChangeEvent<HTMLInputElement>) => {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        name,
        deadline,
        responsible,
        done: e.target.checked,
      }),
    };

    const response = await fetch(`${baseURL}tasks/${id}`, requestOptions);
    if (response.status === 200) {
      setChecked(!e.target.checked);
    }
  };
  return (
    <Checkbox key={id} isChecked={checked} onChange={e => handleCheckBox(e)}>
      <span className={`${checked && 'line-through'} `}>{name}</span>
    </Checkbox>
  );
}

export default CustomCheckBox;
