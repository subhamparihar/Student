import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute component - Restricts access based on authentication and role
 * @param {Object} props - Component props
 * @param {React.Component} props.element - The component to render if authorized
 * @param {string} props.requiredRole - The role required to access ('admin', 'student', or null for any authenticated user)
 * @param {boolean} props.isPublic - If true, doesn't require authentication
 */
export const ProtectedRoute = ({ element, requiredRole, isPublic = false }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Public routes - no authentication required
  if (isPublic) {
    return element;
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has the required role
  return element;
};

export default ProtectedRoute;
