// src/auth/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  user,
  allowedRoles,
  children,
}: {
  user: any;
  allowedRoles: string[];
  children: ReactNode;
}) {
  if (!user?.authenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = user.roles.some((r: string) =>
    allowedRoles.includes(r)
  );

  if (!hasAccess) {
    return <Navigate to="/no-access" replace />;
  }

  return children;
}
