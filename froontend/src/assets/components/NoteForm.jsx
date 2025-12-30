import { useContext, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
import "./NoteForm.css";
import { handleSuccess } from "../../utils";

function NoteForm({ onSuccess }) {
  const { createNote } = useContext(NoteContext);

  const [note, setNote] = useState({ title: "", content: "", dueDate: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.content || !note.dueDate ) return;

    createNote(note);
    handleSuccess("Note added successfully!");
    if (onSuccess) onSuccess();
    setNote({ title: "", content: "", dueDate: "" });
  };

  return (
    <div className="note-form-container">
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Enter title..."
          className="note-input"
          value={note.title}
          onChange={(e) =>
            setNote({ ...note, title: e.target.value.toUpperCase() })
          }
          required
        />

        <textarea
          placeholder="Write your note here..."
          className="note-textarea"
          rows="5"
          value={note.content}
          onChange={(e) =>
            setNote({
              ...note,
              content: e.target.value.replace(/(^\w|[.!?]\s*\w)/g, (c) =>
                c.toUpperCase()
              ),
            })
          }
          required
        />

        <input
        type="date"               
        className="note-date"
        value={note.dueDate}  
        min={new Date().toISOString().split("T")[0]}     
        onChange={(e) =>
          setNote({
            ...note,
            dueDate: e.target.value,
          })
        }
      />



        <button type="submit" className="note-submit-btn">
          Add Note
        </button>
      </form>
    </div>
  );
}

export default NoteForm;
