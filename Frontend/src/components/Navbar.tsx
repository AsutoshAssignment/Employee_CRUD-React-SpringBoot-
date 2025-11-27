import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../contexts/AuthContext";



export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const hideCreate =location.pathname.startsWith("/register")
  const tres = location.pathname.startsWith("/trespasser")
  const { token, logout, user } = useAuth();

  const handleLogout = async () => {
    localStorage.removeItem("token");

    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });

    logout();
    navigate("/login");
  };


  if (location.pathname === "/login" || tres) return null;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-title" onClick={() => navigate("/")}>
          Employee Manager
        </h2>
      </div>

{token && user?.employee && (
  <div className="navbar-right">
    {user.employee.role === "ADMIN" && (!hideCreate || !tres) &&(
      <button className="create-btn" onClick={() => navigate("/register")}>
        Create
      </button>
    )}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
