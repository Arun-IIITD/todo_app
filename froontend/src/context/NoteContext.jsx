import { createContext, useEffect, useState } from "react";

// ✅ Create Context
export const NoteContext = createContext();

// ✅ Provider Component
const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Token from localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Helper to generate headers
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  // 🔹 GET NOTES
  const getNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://todo-app-4-7og2.onrender.com/api/v1/noteapp/get-notes",
        { headers: getHeaders() }
      );
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 CREATE NOTE
  const createNote = async (note) => {
    try {
      const res = await fetch(
        "https://todo-app-4-7og2.onrender.com/api/v1/noteapp/create-note",
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(note),
        }
      );
      const data = await res.json();
      setNotes((prev) => [data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 UPDATE NOTE
  const updateNote = async (id, updatedData) => {
    try {
      const res = await fetch(
        `https://todo-app-4-7og2.onrender.com/api/v1/noteapp/update-note/${id}`,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(updatedData),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setNotes((prev) =>
          prev.map((note) => (note._id === id ? data : note))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 DELETE NOTE
  const deleteNote = async (id) => {
    try {
      await fetch(
        `https://todo-app-4-7og2.onrender.com/api/v1/noteapp/delete-note/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Fetch notes whenever token changes
  useEffect(() => {
    if (token) {
      getNotes();
    } else {
      setNotes([]);
    }
  }, [token]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        setToken,
        createNote,
        updateNote, // ✅ must expose
        deleteNote, // ✅ must expose
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
