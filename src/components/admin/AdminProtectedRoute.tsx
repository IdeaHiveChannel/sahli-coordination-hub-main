import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { authService, AdminRole } from '@/lib/authService';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: AdminRole;
}

const AdminProtectedRoute = ({ children, requiredRole }: AdminProtectedRouteProps) => {
  const [authStatus, setAuthStatus] = useState<{
    isAuthenticated: boolean;
    mustResetPassword: boolean;
    role?: AdminRole;
  } | null>(null);
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    const user = authService.getCurrentUser();
    
    setAuthStatus({
      isAuthenticated,
      mustResetPassword: user?.mustResetPassword ?? false,
      role: user?.role
    });
  }, []);

  if (authStatus === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authStatus.isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (authStatus.mustResetPassword && location.pathname !== '/admin/password-reset') {
    return <Navigate to="/admin/password-reset" state={{ forced: true }} replace />;
  }

  if (requiredRole && authStatus.role !== requiredRole && authStatus.role !== 'Super Admin') {
    // If a specific role is required, and user doesn't have it (and isn't a Super Admin who has access to everything)
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
