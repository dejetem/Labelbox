
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import AnnotationView from './pages/AnnotationView';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
import PublicRoute from './components/PublicRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/annotate/:id"
          element={
            <ProtectedRoute>
              <AnnotationView />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/projects" />} />
      </Routes>
    </Router>
  );
};

export default App;