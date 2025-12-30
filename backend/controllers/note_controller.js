const Note = require("../models/note_models");

// CREATE NOTE
const createNote = async (req, res) => {
  try {
    const { title, content, dueDate } = req.body;

    if (!title || !content || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const note = await Note.create({
      title,
      content,
      dueDate, // ← string saved directly
      userId: req.user.id,
    });
    console.log("Incoming dueDate:", req.body.dueDate, typeof req.body.dueDate);


    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL NOTES
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.status(200).json(notes); // ← no conversion
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE NOTE
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    if (req.body.title !== undefined) note.title = req.body.title;
    if (req.body.content !== undefined) note.content = req.body.content;
    if (req.body.dueDate !== undefined) note.dueDate = req.body.dueDate;

    await note.save();
    res.json(note); // ← send as-is
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStatus = async(req,res) => {

  try {
     const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });
    note.status = note.status === "pending" ? "completed" : "pending";
    await note.save();

    res.json(note);

  }
  catch (err){
    console.log("error",err)
    res.status(500).json({ message: err.message });
  }


};

// DELETE NOTE
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createNote, getAllNotes, updateNote, updateStatus, deleteNote };
