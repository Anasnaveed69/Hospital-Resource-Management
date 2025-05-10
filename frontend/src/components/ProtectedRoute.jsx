import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  console.log('ProtectedRoute: isAuthenticated =', isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;