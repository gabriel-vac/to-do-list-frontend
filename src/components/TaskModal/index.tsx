import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { ChangeEvent, useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { baseURL, headers } from '../../consts';
import { ProjectContext } from '../../contexts/Project';
import { ITask } from '../../types/typings';

interface ITaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: ITask[];
  setTasks: (t: ITask[]) => void;
}

export default function TaskModal({
  isOpen,
  onClose,
  tasks,
  setTasks,
}: ITaskModalProps) {
  const initialRef = React.useRef(null);
  const [taskName, setTaskName] = useState<string>('');
  const [responsible, setResponsible] = useState<string>('');
  const [deadline, setDeadline] = useState<Date>(new Date());
  const { projectSelected } = useContext(ProjectContext);

  const saveButtonHandler = async () => {
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: taskName,
        deadline: format(deadline, 'yyyy-MM-dd'),
        responsible,
        done: false,
        projectId: projectSelected.id,
      }),
    };

    try {
      const response = await fetch(`${baseURL}tasks`, requestOptions);
      if (response.status === 200 || response.status === 201) {
        toast.success('Task registered successfully!!');
        const content: ITask = await response.json();
        setTasks([...tasks, content]);
        onClose();
        return;
      }
      toast.error('Error...');
    } finally {
      setTaskName('');
      setResponsible('');
      setDeadline(new Date());
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const responsibleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setResponsible(e.target.value);
  };

  const deadlineChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDeadline(new Date(e.target.value));
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <Toaster />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Title *</FormLabel>
            <Input
              value={taskName}
              onChange={e => inputChangeHandler(e)}
              placeholder="Title"
              maxLength={50}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Responsible *</FormLabel>
            <Input
              value={responsible}
              onChange={e => responsibleChangeHandler(e)}
              placeholder="Responsible"
              maxLength={50}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Deadline</FormLabel>
            <Input
              type="date"
              placeholder="Deadline"
              onChange={e => deadlineChangeHandler(e)}
              value={deadline.toISOString().split('T')[0]}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => saveButtonHandler()}
            disabled={!taskName || !responsible}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
