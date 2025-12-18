import { createContext, useEffect, useState } from "react";

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ token as state
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Helper headers
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

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
    } finally {
      setLoading(false);
    }
  };

  // 🔥 THIS will now re-run after login
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
        setToken, // 👈 expose setter
        createNote: async (note) => {
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
        },
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
