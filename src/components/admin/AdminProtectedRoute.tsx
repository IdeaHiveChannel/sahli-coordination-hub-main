import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { authService, AdminRole } from '@/lib/authService';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: AdminRole;
}

const AdminProtectedRoute = ({ children, requiredRole }: AdminProtectedRouteProps) => {
  const getAuthStatus = () => {
    try {
      const isAuthenticated = authService.isAuthenticated();
      const user = authService.getCurrentUser();
      
      return {
        isAuthenticated,
        mustResetPassword: user?.mustResetPassword ?? false,
        role: user?.role
      };
    } catch (error) {
      console.error('Auth check failed:', error);
      return { isAuthenticated: false, mustResetPassword: false };
    }
  };

  const [authStatus, setAuthStatus] = useState(getAuthStatus());
  const location = useLocation();

  useEffect(() => {
    const syncAuth = () => {
      setAuthStatus(getAuthStatus());
    };

    // Run sync check
    syncAuth();

    // Listen for storage changes (triggered by authService.updatePassword or other tabs)
    window.addEventListener('storage', syncAuth);
    
    // Periodic sync check (every 5 seconds) as a fallback
    const interval = setInterval(syncAuth, 5000);

    return () => {
      window.removeEventListener('storage', syncAuth);
      clearInterval(interval);
    };
  }, []);

  if (!authStatus.isAuthenticated) {
    // Only redirect if we are not already on the login page
    if (location.pathname === '/admin/login' || location.pathname === '/admin') {
      return <>{children}</>;
    }
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (authStatus.mustResetPassword && location.pathname !== '/admin/password-reset') {
    return <Navigate to="/admin/password-reset" state={{ forced: true }} replace />;
  }

  if (requiredRole && authStatus.role !== requiredRole && authStatus.role !== 'Super Admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
