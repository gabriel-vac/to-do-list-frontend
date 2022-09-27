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
import React, { ChangeEvent, useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { baseURL, headers } from '../../consts';
import { ProjectContext } from '../../contexts/Project';

interface IProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: IProjectModalProps) {
  const initialRef = React.useRef(null);
  const [projectName, setProjectName] = useState<string>('');
  const { listProjects } = useContext(ProjectContext);

  const saveButtonHandler = async () => {
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: projectName }),
    };

    try {
      const response = await fetch(`${baseURL}projects`, requestOptions);
      if (response.status === 200 || response.status === 201) {
        toast.success('Projeto cadastrado com sucesso!!');
        listProjects();
        onClose();
        return;
      }
      toast.error('Erro ao cadastrar projeto...');
    } finally {
      setProjectName('');
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <Toaster />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              ref={initialRef}
              value={projectName}
              onChange={e => inputChangeHandler(e)}
              placeholder="Project name"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={() => saveButtonHandler()}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}