const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const noteRoutes = require("./routes/note.route");
const url = "mongodb://localhost:27017/note_take_app";

// used to convert response from server to json
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (error) {
    console.log("Error in database connection", error);
  }
};

connectDB();

// Routing middleware
//middleware - code that runs b/w req and resp
app.use(express.json())
app.use(cors())
app.use("/api/v1/noteapp", noteRoutes);//used to register middleware in express

// Test route
app.get("/", (req, res) => {
  res.send("hello woooorld");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

module.exports = app;
