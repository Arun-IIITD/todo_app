const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const noteRoutes = require("./routes/note.route");
//const url = "mongodb://localhost:27017/note_take_app";

const DB_URL = process.env.atlas_URL;
mongoose.connect(DB_URL);
const conn = mongoose.connection;

// used to convert response from server to json
app.use(express.json());

// Database connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(url);
//     console.log("DB connected");
//   } catch (error) {
//     console.log("Error in database connection", error);
//   }
// };

// connectDB();

conn.once('open', () => {
  console.log("connected to db")
})

conn.on('error', ( )=> {
  console.log("failed toconnect")
})

// Routing middleware
//middleware - code that runs b/w req and resp
app.use(express.json())
app.use(cors())
app.use(cors({ origin: "*" }));

app.use("/api/v1/noteapp", noteRoutes);//used to register middleware in express

// Test route
app.get("/", (req, res) => {
  res.send("hello woooorld");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

module.exports = app;
