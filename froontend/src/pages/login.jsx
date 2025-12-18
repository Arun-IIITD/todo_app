import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import AppLogo from "../assets/components/AppLogo";
import "./login.css";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";


function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setToken } = useContext(NoteContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/noteapp/auth/login/",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
            // Authorization: `Bearer ${localStorage.getItem("token")}`
          
          },
          body: JSON.stringify(loginInfo),
        }
      );

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setToken(jwtToken);
        setTimeout(() => navigate("/home"), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError("Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="container">
      <AppLogo />

     

        <p className="auth-subtitle">Login to your account</p>

        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginInfo.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginInfo.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Login</button>

          <span className="auth-switch">
            Don't have an account?
            <Link to="/signup"> Signup</Link>
          </span>
        </form>

        <ToastContainer position="top-right" autoClose={2000} />





      </div>
    </div>
  );
}

export default Login;
