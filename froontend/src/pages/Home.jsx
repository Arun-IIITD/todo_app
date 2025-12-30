import { useContext, useEffect, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import NoteCard from "../assets/components/NoteCard";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import "./home.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const { notes, loading } = useContext(NoteContext);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [sortOption, setSortOption] = useState("due");

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  // 🔹 Sorting logic (fixed order, no toggle)
  const sortedNotes = [...notes]
    .filter(Boolean)
    .sort((a, b) => {
      if (sortOption === "status") {
        // Pending first
        if (a.status === b.status) return 0;
        return a.status === "pending" ? -1 : 1;
      }

      if (sortOption === "due") {

        notes.sort((a, b) => {

           if (a.status !== b.status) {
    return a.status === "completed" ? 1 : -1;
  }


  return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
});

      
      }

      if (sortOption === "title") {
        return a.title.localeCompare(b.title); // A → Z
      }

      return 0;
    });

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

      {/* Header */}
      <div className="home-header">
        <div className="home-logo">
          <h1>Welcome, {loggedInUser}</h1>
        </div>

        <div className="sort-controls">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="due">Due Date</option>
            <option value="title">Title</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Notes */}
      {notes.length === 0 ? (
        <div className="empty-state">
          <p>No notes available.</p>
        </div>
      ) : (
        <div className="notes-wrapper">
          <div className="notes-grid">
            {sortedNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
