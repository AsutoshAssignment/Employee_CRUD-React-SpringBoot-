import  { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeList.css";
import { useNavigate } from "react-router-dom";
import type{ Employee } from "../models/models";

const convertDriveLink = (url: string): string => {
  const match = url.match(/\/d\/(.+?)(?:\/|$)/);
  if (!match) return url;

  const fileId = match[1];
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
};

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8080/employees", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load employees");
      }
    };

    loadEmployees();
  }, [token]);

  const handleDelete = async (employeeId: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`http://localhost:8080/employees/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setEmployees((prev) => prev.filter((e) => e.employee_id !== employeeId));
      alert("Employee deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee");
    }
  };

  return (
  <div className="employee-list-page">

  <div className="bg-blob bg-blob-left" />
  <div className="bg-blob bg-blob-right" />
  <div className="bg-halo" />

  <h1 className="employee-title">All Employees</h1>

  <div className="employee-grid">
    {employees.map(emp => (
      <div key={emp.employee_id} className="emp-card">

        <img className="emp-photo"
             src={`${convertDriveLink(emp.photograph_path)}`} />

        <h2 className="emp-name">{emp.first_name} {emp.last_name}</h2>
        <p className="emp-title">{emp.title}</p>

        <div className="emp-info">
          <div className="emp-row">
            <span className="emp-label">ID</span>
            <span className="emp-value">{emp.employee_id}</span>
          </div>
          <div className="emp-row">
            <span className="emp-label">Department</span>
            <span className="emp-value">{emp.department?.name}</span>
          </div>
        </div>

        <div className="emp-buttons">
          <button className="btn edit"
            onClick={() => navigate(`/employees/${emp.employee_id}`)}>
            View
          </button>

          <button className="btn edit"
            onClick={() => navigate(`/employees/${emp.employee_id}/edit`)}>
            Edit
          </button>

          <button className="btn delete"
            onClick={() => handleDelete(emp.employee_id)}>
            Delete
          </button>
        </div>

      </div>
    ))}
 


    {employees.length === 0 && (
      <h3>No employees found</h3>
    )}
  </div>
</div>

  );
}
