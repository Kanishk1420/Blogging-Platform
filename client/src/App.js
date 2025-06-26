import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Import components
import Header from './components/header/Header';
import Home from './components/home/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Box style={{ marginTop: 0 }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;