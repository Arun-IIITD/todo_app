const Note = require("../models/note_models");

// ✅ CREATE NOTE
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }

    const note = await Note.create({
      title,
      content,
      userId: req.user.id   // ✅ FIXED
    });
    console.log("req.user in controller:", req.user);


    res.status(201).json(note);

  } catch (error) {
    res.status(500).json({ messssage: error.message });
  }
};

// ✅ GET ONLY LOGGED-IN USER NOTES
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id   // ✅ FIXED
    });

    res.status(200).json(notes);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE NOTE (OWNERSHIP CHECK)
const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });

  if (note.userId.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  note.title = req.body.title;
  note.content = req.body.content;
  await note.save();

  res.json(note);
};

// ✅ DELETE NOTE (OWNERSHIP CHECK)
const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });

  if (note.userId.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  await note.deleteOne();
  res.json({ message: "Note deleted" });
};

module.exports = {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote
};
