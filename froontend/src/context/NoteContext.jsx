import React, { useEffect,useState } from "react";
import { createContext } from "react";
import BACKEND_URL from "../api/url";

export const NoteContext = createContext();
//const backed_url = "https://localhost:5000/api/v1/noteapp"
export const NoteProvider = ({children}) => {

    const [notes,setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

//FETCH ALL NOTES
const getNotes = async() => {
    setLoading(true);
    try {
        const response = await BACKEND_URL.get("/get-notes");
        setNotes(response.data);
    } catch (error) {
        console.error("Error fetchiiiing notes:", error);
    } finally {
        setLoading(false);
    }
}

useEffect(()=>{
    getNotes();
},[])




//creating notes
const createNote = async(note) => {

     const res=await BACKEND_URL.post("/create-note",note)
    setNotes([res.data,...notes])


}


//updating notes
const updateNote = async(id, updateNote) => {
    const res=await BACKEND_URL.put(`/update-note/${id}`,updateNote)
    setNotes(notes.map((note)=>(note._id===id ? res.data : note)))
}

//deleting notes
const deleteNote = async(id) => {
    await BACKEND_URL.delete(`/delete-note/${id}`)
    setNotes(notes.filter((note)=>(note._id!==id)))
}


return (
    <NoteContext.Provider value={{notes,loading,createNote,updateNote,deleteNote}}>

        {children}

    </NoteContext.Provider>

)





}

