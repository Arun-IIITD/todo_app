//controllers -- all routes's logic will implement here
const Note = require("../models/note_models");

//CREATING NOTE
const createNote = async(req, res) => {

    try {

        const {title, content} = req.body;
    if (!title || !content){
        return res.status(400).json({message: "title and content are required"})
    }

   const newNote = new Note({title,content})
   await newNote.save();
   res.status(201).json(newNote)

  }
    catch(error) {
        res.status(500).json({message: error.message})
        
    }

};


//GETTING ALL NOTES
const getAllNotes = async(req,res) => {

    try{
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes)
    }
    catch(error){
         res.status(500).json({message: error.message})


    }
}

//UPDATING ALL NOTES
const updateNote = async(req,res) => {
    try{
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        if(!updatedNote){
            return res.status(404).json({message:"Note not updated"})
        }
        res.status(200).json(updatedNote)
        }


    catch(error){
        res.status(500).json({message: error.message})
    }
}

//DELETE NOTE
const deleteNote = async(req,res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote){
            return res.status(404).json({message: "note not deleted"})
        }
        res.status(200).json({message:"note deleted successfully"})
    }
    
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote
};
