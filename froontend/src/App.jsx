import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./assets/components/Navbar";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import RefrshHandler from "./RefrshHandler";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<ToastContainer position="top-right" autoClose={2000} />


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="page-root flex flex-col min-h-screen bg-gray-900 text-white">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />

      {/* NAVBAR (hidden on login & signup) */}
      {!hideNavbar && <Navbar />}

      

      {/* MAIN */}
      <main className="flex-1 container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-note"
            element={
              <PrivateRoute>
                <CreateNote />
              </PrivateRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
