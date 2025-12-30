import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "./signup.css";
import AppLogo from "../assets/components/AppLogo";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   const { name, email, password } = signupInfo;

  //   if (!name || !email || !password) {
  //     return handleError("Name, email and password are required");
  //   }

  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/v1/noteapp/auth/signup",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(signupInfo),
  //       }
  //     );

  //     const result = await response.json();
  //     const { success, message, error } = result;

  //     if (success) {
  //       handleSuccess(message || "signup sucessful");
  //       setTimeout(() => navigate("/login"), 1000);
  //     } 
  //     else if (error) {
  //       handleError(error?.details?.[0]?.message || message || "signup failed");
  //     }
  //   } 
  //   catch(err){
  //     handleError("something went wrong")
  //   }
  // };

  const handleSignup = async (e) => {
  e.preventDefault();
  const { name, email, password } = signupInfo;

  if (!name || !email || !password) {
    return handleError("Name, email and password are required");
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/noteapp/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      }
    );

    const result = await response.json();
    const { success, message, error } = result;

    // ❌ account exists / validation error / server error
    if (!response.ok || success === false) {
      handleError(
        error?.details?.[0]?.message ||
        message ||
        "User already exists"
      );
      return;
    }

    // ✅ signup success
    handleSuccess(message || "Signup successful");
    setTimeout(() => navigate("/login"), 1000);

  } catch (err) {
    console.error(err);
    handleError("Something went wrong");
  }
};









  return (
    <div className="signup-page">
      <div className="container">
        <AppLogo />


        <p className="auth-subtitle">Create your account</p>

        <form onSubmit={handleSignup}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={signupInfo.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={signupInfo.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={signupInfo.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Signup</button>

          <span className="auth-switch">
            Already have an account?
            <Link to="/login"> Login</Link>
          </span>
        </form>

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
}

export default Signup;
