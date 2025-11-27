import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <p className="notfound-message">Oops! Looks like you're lost.</p>

      <Link to="/login" className="notfound-button">
        Take me Home
      </Link>
    </div>
  );
}
