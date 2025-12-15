//ALL IN COMMONJS
//All routing will implement here
const express = require('express');
const router = express.Router();

const {createNote, getAllNotes, updateNote, deleteNote} = require('../controllers/note_controller')

router.post("/create-note", createNote);
router.get("/get-notes",getAllNotes);
router.put("/update-note/:id", updateNote);
router.delete("/delete-note/:id", deleteNote)
module.exports = router;

