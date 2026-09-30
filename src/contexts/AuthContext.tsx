// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  roles: string[];
  authenticated: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (creds: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  hasRole: (roles?: string[]) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: hydrate from localStorage / cookie / API
    const stored = null; // replace
    if (stored) setUser(stored as User);
    else {
      // example dev user
      setUser({ id: "u_001", name: "Santhosh", roles: ["admin", "ops", "sales"], authenticated: true });
    }
    setLoading(false);
  }, []);

  const login = async (creds: { username: string; password: string }) => {
    // TODO: call auth API and set user + tokens
    setUser({ id: "u_002", name: creds.username, roles: ["sales"], authenticated: true });
  };

  const logout = () => {
    setUser(null);
  };

  const hasRole = (roles?: string[]) => {
    if (!roles || roles.length === 0) return true;
    if (!user) return false;
    return roles.some((r) => user.roles.includes(r));
  };

  return <AuthContext.Provider value={{ user, loading, login, logout, hasRole }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
};
