import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

import { useNavigate , Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        { username, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Response:", response);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Register failed. Please try again."
      );
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Register</h1>
      <div className="login-input-box">
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="login-input-box">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="login-input-box">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="login-remember-forgot">
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <a href="#">Forgot Password?</a>
      </div>
      <button onClick={handleSubmit} className="login-continue">
        Continue
      </button>

      <div className="login-register">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
