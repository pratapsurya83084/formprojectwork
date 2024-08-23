// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check for token in local storage
  const adminExistes = localStorage.getItem('Adlogin');

  // Redirect to login if no token is found
  if (!adminExistes) {
    return <Navigate to="/login" replace />;
  }

  // Render child routes if token is present
  return <Outlet />;
};

export default ProtectedRoute;
