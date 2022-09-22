import React from 'react';
import ProjectProvider from './contexts/Project';
import Home from './pages/Home';

function App() {
  return (
    <ProjectProvider>
      <Home />
    </ProjectProvider>
  );
}

export default App;
