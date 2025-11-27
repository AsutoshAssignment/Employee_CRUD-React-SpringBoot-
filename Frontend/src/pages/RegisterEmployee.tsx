import React, { useEffect, useState } from "react";
import "./RegisterEmployee.css";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import type { Department } from "../models/models";
import { useDepartments } from "../contexts/DeptContext";

export default function RegisterEmployee() {
  const navigate = useNavigate();
 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [departmentId, setDepartmentId] = useState<number | "">("");
  const [photoLink, setPhotoLink] = useState("");
  const {departments} = useDepartments();

  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");

  // useEffect(() => {
  //   axiosClient.get("/auth/me").then(res => setEmail(res.data));
  // }, [token]);

  // useEffect(() => {
  //   axiosClient.get("/departments").then(res => setDepartments(res.data));
  // }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photoLink.trim()) {
      alert("Please enter a Google Drive photo link.");
      return;
    }

    try {
      const employeePayload = {
        first_name: firstName,
        last_name: lastName,
        title: title,
        email: email,
        department: {
          departmentId: departmentId
        },
        photograph_path: photoLink   
      };

      console.log(employeePayload);

      await axiosClient.post("/employees", employeePayload);

      alert("Registration successful!");
      navigate("/employees");

    } catch (err: any) {
      console.error(err);
      alert("Registration failed: " + (err.response?.data?.message || "Error"));
    }
  };

  return (
  <div className="register-page">

    <div className="bg-blob bg-blob-left"></div>
    <div className="bg-blob bg-blob-right"></div>
    <div className="bg-halo"></div>

    <h2>Complete Your Employee Registration</h2>

    <div className="register-box">
      <form className="register-form" onSubmit={handleSubmit}>
        
        <label>Email (from Google)</label>
        <input type="text" value={email} 
        onChange={(e) => setEmail(e.target.value)}
        required />

        <label>First Name</label>
        <input 
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label>Last Name</label>
        <input 
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Department</label>
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(Number(e.target.value))}
          required
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.departmentId} value={d.departmentId}>
              {d.name}
            </option>
          ))}
        </select>

        <label>Photograph (Google Drive Link)</label>
        <input
          type="text"
          placeholder="https://drive.google.com/..."
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          required
        />

        <button type="submit" className="register-btn">
          Register Employee
        </button>
      </form>
    </div>
  </div>
);

}
