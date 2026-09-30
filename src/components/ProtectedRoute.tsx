// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

type Props = {
  children: React.ReactElement;
  requiredRoles?: string[];
};

export default function ProtectedRoute({ children, requiredRoles }: Props) {
  const { user, loading, hasRole } = useAuthContext();

  if (loading) return <div className="p-6">Checking authentication...</div>;
  if (!user?.authenticated) return <Navigate to="/auth/login" replace />;

  if (requiredRoles && requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    return <Navigate to="/no-access" replace />;
  }

  return children;
}
