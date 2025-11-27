import React, { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import type { Department } from "../models/models";
import { useAuth } from "./AuthContext";

interface DepartmentContextType {
  departments: Department[];
  loading: boolean;
}

const DepartmentContext = createContext<DepartmentContextType>({
  departments: [],
  loading: true,
});

export const DeptProvider = ({ children }: { children: React.ReactNode }) => {
 console.log("DeptProvider rendered");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const { token,user } = useAuth();

  useEffect(() => {
    console.log("Token inside DeptContext:", token);

    const loadDepartments = async () => {
      if (!token) {
        setDepartments([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const { data } = await axiosClient.get("/departments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDepartments(data);
        console.log(data)
      } catch (err) {
        console.error("Failed to load departments", err);
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, [token]);

  return (
    <DepartmentContext.Provider value={{ departments, loading }}>
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartments = () => useContext(DepartmentContext);
