import { useContext, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
import "./NoteCard.css";
import { handleSuccess } from "../../utils";
import { Edit, Trash } from "lucide-react";

function NoteCard({ note }) {
  const { deleteNote, updateNote } = useContext(NoteContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
  });

  const handleUpdate = () => {
  if (!editData.title.trim() || !editData.content.trim()) {
    handleSuccess("Title and content cannot be empty");
    return;
  }

  updateNote(note._id, editData);
  handleSuccess("Note updated successfully");
  setIsEditing(false);
};




  const handleDelete = () => {
      deleteNote(note._id);
      handleSuccess("Note deleted successfully");

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
            <button 
            className="btn btn-save" 
             disabled={
    editData.title === note.title &&
    editData.content === note.content
  }
            onClick={handleUpdate}
            >
              Save
            </button>

            <button
              className="btn btn-cancel"
              onClick={() => {
                setIsEditing(false);
                setEditData({ title: note.title, content: note.content });
              
              }}
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
                <Edit size={15}
                />
              </button>
              <button
                className="btn btn-delete"
                onClick={handleDelete}
              >
                < Trash size={15} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NoteCard;
