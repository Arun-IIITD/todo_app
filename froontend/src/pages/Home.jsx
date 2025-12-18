import  { useContext, useEffect, useState } from "react";
import { NoteContext} from "../context/NoteContext";
import NoteCard from "../assets/components/NoteCard";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import "./home.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Home() {
  const { notes, loading } = useContext(NoteContext);
  const [loggedInUser, setLoggedInUser] = useState("");
 

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* HEADER */}
      <div className="home-header">
        <div className="home-logo">
          {/* <BookOpen size={28} /> */}
          <h1>Welcome, {loggedInUser}</h1>
        </div>

        
      </div>

      {/* NOTES */}
      {notes.length === 0 ? (
        <div className="empty-state">
          <p>No notes available.</p>
        </div>
      ) : (

        <div className="notes-wrapper">
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        </div>

        
      )}
    </div>
  );
}

export default Home;
