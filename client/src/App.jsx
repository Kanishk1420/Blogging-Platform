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

// Layout components
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

const AuthLayout = ({ children }) => (
  <>
    {children}
  </>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('accessToken'));
  
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes (no header) */}
          <Route path="/account" element={
            <AuthLayout>
              <Login isUserAuthenticated={setIsAuthenticated} />
            </AuthLayout>
          } />
          
          {/* Public routes with Header */}
          <Route path="/" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />
          
          <Route path="/about" element={
            <MainLayout>
              <About />
            </MainLayout>
          } />
          
          {/* Protected routes with Header */}
          <Route path="/create" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <CreatePost />
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/details/:id" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <DetailView />
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/update/:id" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <Update />
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/contact" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <Contact />
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/search" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <Home />
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/blog" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <Home />
              </MainLayout>
            </PrivateRoute>
          } />
          
          <Route path="/subscribe" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <Home />
              </MainLayout>
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;