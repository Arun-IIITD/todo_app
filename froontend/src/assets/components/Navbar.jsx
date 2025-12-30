import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Plus} from "lucide-react";
import { useState, useEffect } from "react";
import "./navbar.css";
import { handleSuccess } from "../../utils";
import CreateNoteModal from "./CreateNoteModal";

function Navbar() {
  const location = useLocation();
  const [openCreateNote, setOpenCreateNote] = useState(false);

  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");

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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <span className="navbar-logo">
          <BookOpen className="logo-icon" />
          <span className="logo-text">NoteKeeper</span>
        </span>

        {/* Links and buttons */}
        <div className="navbar-links">
       

          <button 
          className= {`nav-link plus-btn ${openCreateNote ? "active" : ""}`}
          onClick={() => setOpenCreateNote(true)}
          title="Create Note"
          >
            <Plus size={22}/>
          </button>

          {openCreateNote && (
                <CreateNoteModal onClose={() => setOpenCreateNote(false)} />
              )}


          

         



         

          {/* Logout */}
          {loggedInUser && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
