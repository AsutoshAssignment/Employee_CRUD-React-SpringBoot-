import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "./OAuthCallback.css";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { setToken } = useAuth(); 
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        alert("No token found! OAuth failed.");
        navigate("/login");
        return;
      }


      setToken(token);
      localStorage.setItem("token", token);

      try {
        const response = await axios.get("http://localhost:8080/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data;

        if (data.employeeExists) {
          const isAdmin =data.employee.role;
          navigate(isAdmin ? "/employees/list" : `/employees/${data.employee.employee_id}`);
          // navigate(`/employees/${data.employee.employee_id}`);
        } else {
          navigate("/trespasser");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/trespasser");
      }
    };

    handleOAuthCallback();
  }, [navigate, setToken]); 

  return <div className="oauth-callback-loading">Completing Sign-In…</div>;
}
