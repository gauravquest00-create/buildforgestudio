import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const ProtectedRoute = () => {
  const { admin, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen message="Authenticating session..." />;
  }

  if (!admin) {
    return <Navigate to="/Adminlogidashboard/login" replace />;
  }

  return <Outlet />;
};
