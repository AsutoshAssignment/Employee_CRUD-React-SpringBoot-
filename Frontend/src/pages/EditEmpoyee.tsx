import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import "./EditEmployee.css";
import { useDepartments } from "../contexts/DeptContext";
import { useAuth } from "../contexts/AuthContext";

const convertDriveLink = (url: string): string => {
  const match = url.match(/\/d\/(.+?)(?:\/|$)/);
  if (!match) return url;

  const fileId = match[1];
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
};


function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div className={`local-toast ${type}`}>
      <span className="toast-icon">{type === "success" ? "✔" : "✖"}</span>
      {message}
    </div>
  );
}


export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();
  const { departments } = useDepartments();
  const [error, setError] = useState<string | null>(null);

  const [employee, setEmployee] = useState<any>(null);
  const [photograph_path, setPhotographPath] = useState("");
  const [success, setSuccess] = useState(false);

  const isAdmin = user?.employee.role === "ADMIN";
  const loggedInEmployeeId = user?.employee?.employee_id;
  const employeeId = id ? Number(id) : null;



  useEffect(() => {


    const fetchEmployee = async () => {
      try {
        const res = await axiosClient.get(`/employees/${id}`);
        setEmployee(res.data);
      } catch (err) {
        console.error("Failed to fetch employee", err);
        alert("Employee not found!");
        navigate("/employees/list");
      }
    };

    fetchEmployee();
  }, [id, navigate, loggedInEmployeeId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    const payload: any = {
      employee_id: employee.employee_id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      title: employee.title,
      photograph_path: photograph_path || employee.photograph_path,
    };

  
      payload.email = employee.email;
      payload.department = {
        departmentId: employee.department.departmentId,
      }
    try {
      await axiosClient.put(`/employees/${id}`, payload);

    
setUser((prev: any) => ({
  ...prev, 
  employee: {
    ...prev.employee,
    ...payload,
    department:
      isAdmin
        ? departments.find(
            (d) =>
              d.departmentId === employee.department.departmentId
          ) || prev.employee.department
        : prev.employee.department,
  },
}));

      
      setSuccess(true);
      console.log("admin: ",isAdmin)
    
setSuccess(true);

setTimeout(() => {
  navigate(isAdmin ? "/employees/list" : `/employees/${id}`);
}, 1200);

       

      
    } catch (err) {
      console.error(err);
       setError("Failed to update employee!");
        setTimeout(() => {
    setError(null);
  }, 2000);
    
    }
  };

  if (loading || !employee) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <>
      {success && <Toast message="Employee updated successfully!" type="success" />}
       {error && <Toast message={error} type="error" />}
      <div className="edit-page">
        <div className="bg-blob-left" />
        <div className="bg-blob-right" />
        <div className="bg-halo" />

        <div className="edit-card fade-up">
          <h2 className="edit-title">
            Edit {isAdmin ? "" : "Your"} Profile
          </h2>

          <form className="edit-form" onSubmit={handleUpdate}>
            {/* ID */}
            <label className="lbl">Employee ID</label>
            <input value={employee.employee_id} disabled />

            {/* Email */}
            <label className="lbl">Email</label>
            <input
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              disabled={!isAdmin}
            />

            {/* First Name */}
            <label className="lbl">First Name</label>
            <input
              value={employee.first_name}
              onChange={(e) =>
                setEmployee({ ...employee, first_name: e.target.value })
              }
              required
            />

            {/* Last Name */}
            <label className="lbl">Last Name</label>
            <input
              value={employee.last_name}
              onChange={(e) =>
                setEmployee({ ...employee, last_name: e.target.value })
              }
              required
            />

            {/* Title */}
            <label className="lbl">Title</label>
            <input
              value={employee.title}
              onChange={(e) =>
                setEmployee({ ...employee, title: e.target.value })
              }
              required
            />

            {/* Department */}
            <label className="lbl">Department</label>
            <select
              value={employee.department.departmentId}
              disabled={!isAdmin}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  department: {
                    ...employee.department,
                    departmentId: Number(e.target.value),
                  },
                })
              }
              required
            >
              {departments.map((d: any) => (
                <option key={d.departmentId} value={d.departmentId}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Current Photo */}
            <label className="lbl">Current Photo</label>
       
            <img
              src={`${convertDriveLink(employee.photograph_path)}`}
              alt="Employee"
              className="current-photo"
              referrerPolicy="no-referrer"
            />

            {/* New Photo Link */}
            <label className="lbl">Google Drive Image Link</label>
            <input
              type="text"
              placeholder="Paste new image link"
              value={photograph_path}
              onChange={(e) => setPhotographPath(e.target.value)}
            />

            <button type="submit" className="update-btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
