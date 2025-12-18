//ALL IN COMMONJS
//All routing will implement here
const express = require('express');
const router = express.Router();
const Note = require("../models/note_models")
const authMiddleware = require("../middleware/authmiddleware");
const {createNote, getAllNotes, updateNote, deleteNote} = require('../controllers/note_controller')

router.get("/get-notes", authMiddleware, getAllNotes);
router.post("/create-note", authMiddleware, createNote);
router.put("/update-note/:id", authMiddleware, updateNote);
router.delete("/delete-note/:id", authMiddleware, deleteNote);
module.exports = router;

