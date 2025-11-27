import "./Login.css";
import PNG from "../assets/Monkey.png"
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  //   {token && user?.employee && (
  // <div className="navbar-right">
  //   {user.employee.role === "ADMIN" && (
  //     <button className="create-btn" onClick={() => navigate("/register")}>
  //       Create
  //     </button>
  //   )}

    if (token && user?.employee) {
     
      const isAdmin = user.employee.role === "ADMIN";
      const redirectPath = isAdmin
        ? "/employees/list"
        : `/employees/${user.employee.employee_id}`;

      navigate(redirectPath);
    }
  }, [token, user, navigate]);

  const handleGoogleLogin = () => {
    console.log("Redirecting to Google OAuth...");
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="illustration-box">
          <img src={PNG} alt="panda" className="panda-img" />
          <div className="speech">Welcome!</div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h1>Employee Management</h1>

          <button className="google-btn" onClick={handleGoogleLogin}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="google"
            />
            Continue with Google
          </button>

          <p className="powered">Powered by Google Authentication</p>
        </div>
      </div>
    </div>
  );
}
