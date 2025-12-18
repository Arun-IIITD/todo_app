import React, { useContext, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
import "./NoteCard.css";
import { toast } from "react-toastify";
import { handleSuccess } from "../../utils";
import { Delete, Edit, Trash } from "lucide-react";

function NoteCard({ note }) {
  const { deleteNote, updateNote } = useContext(NoteContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
  });

  const handleUpdate = () => {
    updateNote(note._id, editData);
    setIsEditing(false);
    //toast.success("Note updated successfully!");
    //handleSuccess("note updddddate");
  };

  const handleDelete = () => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this note?"
    // );
    if (true) {
      deleteNote(note._id);
      //toast.success("Note deleted successfully!");
      handleSuccess("note delete");
    }
  };

  return (
    <div className="note-card">
      {isEditing ? (
        <>
          {/* Edit Mode */}
          <input
            type="text"
            className="note-input"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />

          <textarea
            rows="3"
            className="note-textarea"
            value={editData.content}
            onChange={(e) =>
              setEditData({ ...editData, content: e.target.value })
            }
          />

          <div className="note-actions">
            <button className="btn btn-save" onClick={handleUpdate}>
              Save
            </button>
            <button
              className="btn btn-cancel"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <h2 className="note-title">{note.title}</h2>
          <p className="note-content">{note.content}</p>

          <div className="note-footer">
            <span className="note-date">
              {new Date(note.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>

            <div className="note-actions">
              <button
                className="btn btn-edit"
                onClick={() => setIsEditing(true)}
              >
                <Edit />
              </button>
              <button
                className="btn btn-delete"
                onClick={() => handleDelete(note._id)}
              >
                < Trash />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NoteCard;
