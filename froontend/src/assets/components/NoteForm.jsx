import React, { useContext, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
import "./NoteForm.css";
import { handleSuccess } from "../../utils";

function NoteForm({onSuccess}) {
  const { createNote } = useContext(NoteContext);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.content) return;
    createNote(note);
    console.log("doneee")
    handleSuccess("Note added successfully!");
    if (onSuccess) onSuccess();
    setNote({ title: "", content: "" });
    
   // handleSuccess("Note added successfully!"); // toastify
  };

  return (
    <div className="note-form-container">
      <h2 className="note-form-title">Create a New Note</h2>

      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Enter title..."
          className="note-input"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />

        <textarea
          placeholder="Write your note here..."
          className="note-textarea"
          rows="5"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />

        <button 
        // type="submit" 
        className="note-submit-btn"
        onClick={handleSubmit}>
          Add Note
        </button>
      </form>
    </div>
  );
}

export default NoteForm;
