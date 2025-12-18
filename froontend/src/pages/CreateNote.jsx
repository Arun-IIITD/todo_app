import NoteForm from '../assets/components/NoteForm';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Note.css"

function CreateNote() {
  return (
    <div className='create-note-page'>
      <NoteForm />
      <ToastContainer 
        position="top-center" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
    </div>
  );
}

export default CreateNote;
