import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Pages
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import JobDetails from '../pages/JobDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Unauthorized from '../pages/Unauthorized';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminJobs from '../pages/admin/Jobs';
import AdminApplications from '../pages/admin/Applications';

// Student Pages
import StudentDashboard from '../pages/student/Dashboard';
import StudentApplications from '../pages/student/Applications';
import StudentHours from '../pages/student/Hours';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import StudentLayout from '../layouts/StudentLayout';

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: (
      <ProtectedRoute element={<PublicLayout />} isPublic={true} />
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'jobs',
        element: <Jobs />,
      },
      {
        path: 'jobs/:id',
        element: <JobDetails />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />,
      },
    ],
  },
  // Admin Routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute
        element={<AdminLayout />}
        requiredRole="admin"
      />
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'jobs',
        element: <AdminJobs />,
      },
      {
        path: 'applications',
        element: <AdminApplications />,
      },
    ],
  },
  // Student Routes
  {
    path: '/student',
    element: (
      <ProtectedRoute
        element={<StudentLayout />}
        requiredRole="student"
      />
    ),
    children: [
      {
        index: true,
        element: <StudentDashboard />,
      },
      {
        path: 'applications',
        element: <StudentApplications />,
      },
      {
        path: 'hours',
        element: <StudentHours />,
      },
    ],
  },
  // Catch-all 404
  {
    path: '*',
    element: (
      <PublicLayout>
        <div className="page-container">
          <div className="error-page">
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <a href="/" className="btn btn-primary">Go Home</a>
          </div>
        </div>
      </PublicLayout>
    ),
  },
]);
