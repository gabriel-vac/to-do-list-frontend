import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ProjectProvider } from './contexts/Project';
import Home from './pages/Home';

const theme = extendTheme({
  colors: {
    mycolor: '#3BB3BD',
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ProjectProvider>
        <Home />
      </ProjectProvider>
    </ChakraProvider>
  );
}

export default App;
