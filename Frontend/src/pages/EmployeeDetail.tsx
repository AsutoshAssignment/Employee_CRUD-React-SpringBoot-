import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeeDetails.css";
import { useAuth } from "../contexts/AuthContext";


const convertDriveLink = (url: string): string => {
  const match = url.match(/\/d\/(.+?)(?:\/|$)/);
  if (!match) return url;

  const fileId = match[1];
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
};

export default function EmployeeDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [employee, setEmployee] = useState<any>(user?.employee);

useEffect(() => {
  const fetchEmployee = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/employees/${id}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmployee(res.data);
    } catch (err) {
      console.error("Failed to fetch employee", err);
    }
  };

  if (id) fetchEmployee();
}, [id, token]);


  
  if (!employee) {
    return <h2 className="emp-loading">Loading...</h2>;
  }

  return (
    <div className="employee-details-page">

  
      <div className="bg-blob bg-blob-left" />
      <div className="bg-blob bg-blob-right" />
      <div className="bg-halo" />

      <div className="profile-card fade-up">

        <img
          src={`${convertDriveLink(employee.photograph_path)}`}
          alt="Employee"
          className="profile-photo"
        />

        <h2 className="profile-name">
          {employee.first_name} {employee.last_name}
        </h2>

        <p className="profile-title">{employee.title}</p>

        <div className="profile-info">

          <div className="info-row">
            <div className="info-label">
              <span className="field-icon">
               
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="4.5"
                    y="4.5"
                    width="15"
                    height="15"
                    rx="3"
                    ry="3"
                    fill="none"
                  />
                  <circle cx="9" cy="10" r="1.4" fill="none" />
                  <path d="M7.2 14.3h3.6" fill="none" />
                  <path d="M13.2 10h3" fill="none" />
                  <path d="M13.2 14h3" fill="none" />
                </svg>
              </span>
              <span className="label-text">Employee ID</span>
            </div>
            <span className="value">{employee.employee_id}</span>
          </div>

          <div className="info-row">
            <div className="info-label">
              <span className="field-icon">
              
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="4.5"
                    y="6"
                    width="15"
                    height="12"
                    rx="2"
                    ry="2"
                    fill="none"
                  />
                  <path d="M5.5 7.5 12 12.2 18.5 7.5" fill="none" />
                </svg>
              </span>
              <span className="label-text">Email</span>
            </div>
            <span className="value">{employee.email}</span>
          </div>

          <div className="info-row">
            <div className="info-label">
              <span className="field-icon">
             
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M7 5.5h6.2L18.5 10l-5.3 5.3L6 10.1V5.5z"
                    fill="none"
                  />
                  <circle cx="9" cy="8" r="1" fill="none" />
                </svg>
              </span>
              <span className="label-text">Title</span>
            </div>
            <span className="value">{employee.title}</span>
          </div>

          <div className="info-row">
            <div className="info-label">
              <span className="field-icon">
             
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="6.5"
                    y="5"
                    width="11"
                    height="14"
                    rx="2"
                    ry="2"
                    fill="none"
                  />
                  <path d="M9 8h2M13 8h2M9 11h2M13 11h2M9 14h2M13 14h2" fill="none" />
                  <path d="M11 19.5h2" fill="none" />
                </svg>
              </span>
              <span className="label-text">Department</span>
            </div>
            <span className="value">{employee.department?.name}</span>
          </div>
        </div>

        <div className="profile-buttons">
          <button
            className="btn edit"
            onClick={() =>
              navigate(`/employees/${employee.employee_id}/edit`)
            }
          >
            Edit
          </button>

 
        </div>
      </div>
    </div>
  );
}
