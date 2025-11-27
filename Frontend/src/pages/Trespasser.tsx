import "./Trespasser.css";
import { useNavigate } from "react-router-dom";

export default function Trespasser() {
  const navigate = useNavigate();

  return (
    <div className="trespasser-page">
      <div className="warning-card fade-up">
        <h1> Unauthorized Access</h1>
        <p>You are not recognized as an employee in our system.</p>
        <p>If you believe this is a mistake, please contact admin.</p>

        <button onClick={() => navigate("/login")} className="go-back-btn">
          Go Back to Login
        </button>
      </div>
    </div>
  );
}