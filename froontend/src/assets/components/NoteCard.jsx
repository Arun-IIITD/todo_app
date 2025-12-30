import { useContext, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
import "./NoteCard.css";
import { handleSuccess } from "../../utils";
import { Edit, Trash } from "lucide-react";

function NoteCard({ note }) {
  const { deleteNote, updateNote, toggleStatus } = useContext(NoteContext);
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
    dueDate: note.dueDate,
  });

  // 🔹 Date formatter
  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  // 🔹 Overdue logic (FIXED)
  const isOverdue =
    note.status === "pending" &&
    note.dueDate &&
    new Date(note.dueDate) < new Date();

  // 🔹 Update Note
  const handleUpdate = () => {
    if (!editData.title || !editData.content) {
      handleSuccess("Title and content cannot be empty");
      return;
    }

    updateNote(note._id, editData);
    handleSuccess("Note updated successfully");
    setIsEditing(false);
  };

  // 🔹 Delete Note
  const handleDelete = () => {
    deleteNote(note._id);
    handleSuccess("Note deleted successfully");
  };

  return (
    <div
      className={`note-card ${
        note.status === "completed" ? "completed" : ""
      }`}
    >
      {isEditing ? (
        <>
          {/* Title */}
          <input
            type="text"
            className="note-input"
            value={editData.title}
            onChange={(e) =>
              setEditData({
                ...editData,
                title: e.target.value.toUpperCase(),
              })
            }
          />

          {/* Content */}
          <textarea
            rows="3"
            className="note-textarea"
            value={editData.content}
            onChange={(e) =>
              setEditData({
                ...editData,
                content: e.target.value.replace(
                  /(^\w|[.!?]\s*\w)/g,
                  (c) => c.toUpperCase()
                ),
              })
            }
          />

          {/* Buttons */}
          <div className="note-actions">
            <button className="btn btn-save" onClick={handleUpdate}>
              Save
            </button>
            <button
              className="btn btn-cancel"
              onClick={() => {
                setIsEditing(false);
                setEditData({
                  title: note.title,
                  content: note.content,
                  dueDate: note.dueDate,
                });
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Header */}
          <div className="note-header">
            <input
              type="checkbox"
              checked={note.status === "completed"}
              onChange={() => toggleStatus(note._id)}
            />
            <h2 className="note-title">{note.title}</h2>
          </div>

          {/* Content */}
          <div className="note-content">
            <ul>
              {note.content
                .split(".")
                .filter((s) => s.trim() !== "")
                .map((sentence, idx) => (
                  <li key={idx}>{sentence.trim()}.</li>
                ))}
            </ul>
          </div>

          {/* Due Date */}
          {note.dueDate && (
            <span>
              Due Date: {formatDate(new Date(note.dueDate))}
            </span>
          )}

          {/* Footer */}
          <div className="note-footer">
            <span>{formatDate(new Date(note.createdAt))}</span>

            <div className="note-actions">
              {isOverdue && (
                <span className="overdue">Overdue</span>
              )}

              <button
                className="btn btn-edit"
                disabled={note.status === "completed"}
                onClick={() => setIsEditing(true)}
              >
                <Edit size={14} />
              </button>

              <button
                className="btn btn-delete"
                onClick={handleDelete}
              >
                <Trash size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NoteCard;
