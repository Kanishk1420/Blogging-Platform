import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DataProvider from './context/DataProvider';

// Components
import Home from './components/home/Home';
import Login from './components/account/Login';
import Header from './components/header/Header';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import DetailView from './components/details/DetailView';
import CreatePost from './components/create/CreatePost';
import Update from './components/create/Update';

// Auth check component
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/account" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('accessToken'));
  
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Public routes - always accessible without login */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Login isUserAuthenticated={setIsAuthenticated} />} />
          
          {/* Protected routes - require authentication */}
          <Route path="/create" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CreatePost />
            </PrivateRoute>
          } />
          
          <Route path="/details/:id" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <DetailView />
            </PrivateRoute>
          } />
          
          <Route path="/update/:id" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Update />
            </PrivateRoute>
          } />
          
          <Route path="/contact" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Contact />
            </PrivateRoute>
          } />
          
          <Route path="/search" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          } />
          
          <Route path="/blog" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          } />
          
          <Route path="/subscribe" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;