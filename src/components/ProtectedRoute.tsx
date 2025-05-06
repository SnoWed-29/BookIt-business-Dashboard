// components/ProtectedRoute.tsx
import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, user } = useAuthStore(); // Access token and user from Zustand state
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: 'Access denied. Admins only.', from: location.pathname }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;