import React, { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import type { Employee } from "../models/models";

interface AuthUser {
  email: string;
  name: string;
  photoUrl?: string;
  employeeExists: boolean;
  employee: Employee;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  logout: () => {},
  setUser: () => {},
  setToken: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axiosClient.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
      }

      setLoading(false);
    };

    fetchAuthUser();
   
  }, [token]);

  useEffect(() => {
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    setToken(savedToken);
  }
}, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        logout,
        setUser,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
