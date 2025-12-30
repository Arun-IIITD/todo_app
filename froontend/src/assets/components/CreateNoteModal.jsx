import NoteForm from "./NoteForm";
import "./CreateNoteModal.css";

function CreateNoteModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Create Note</h2>
        <NoteForm onSuccess={onClose} />
      </div>
    </div>
  );
}


export default CreateNoteModal;



