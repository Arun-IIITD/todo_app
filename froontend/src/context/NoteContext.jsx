import { createContext, useEffect, useState } from "react";
import api from "../api/axios"

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  // GET NOTES
  const getNotes = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        "http://localhost:5000/api/v1/noteapp/get-notes",
        { headers: getHeaders() }
      );
      //const data = await res.json();



      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  // CREATE NOTE
  const createNote = async (note) => {
    try {
      const res = await api.post(
        "http://localhost:5000/api/v1/noteapp/create-note",
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(note),
        }
      );
      //const data = await res.json();

      setNotes((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE NOTE
  const updateNote = async (id, updatedData) => {
    try {
      const res = await api.put(
        `http://localhost:5000/api/v1/noteapp/update-note/${id}`,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(updatedData),
        }
      );
      //const data = await res.json();

      if (res.ok) {
        setNotes((prev) =>
          prev.map((note) => (note._id === id ? res.data : note))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id) => {
  try {
    const res = await api.patch( `http://localhost:5000/api/v1/noteapp/update-status/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
    });

    //const updatedNote = await res.json();

    setNotes((prev) =>
      prev.map((note) =>
        note._id === id ? res.data : note
      )
    );
  } 
  
  
  catch (err) {
    console.error("Failed to update status");
  }
};


  // DELETE NOTE
  const deleteNote = async (id) => {
    try {
      await api.delete(
        `http://localhost:5000/api/v1/noteapp/delete-note/${id}`,
        { method: "DELETE", headers: getHeaders() }
      );
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) getNotes();
    else setNotes([]);
  }, [token]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        setToken,
        createNote,
        updateNote,
        toggleStatus,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
