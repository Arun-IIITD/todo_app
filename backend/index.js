const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const noteRoutes = require("./routes/note.route");
const userRoute = require("./routes/user");

const DB_URL = process.env.atlas_URL;

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));

// MongoDB connection
mongoose.connect(DB_URL);

const conn = mongoose.connection;

conn.once("open", () => {
  console.log("Connected to DB");
});

conn.on("error", () => {
  console.log("Failed to connect DB");
});

// Routes
app.use("/api/v1/noteapp", noteRoutes);
app.use("/api/v1/noteapp/auth", userRoute);


// Test route
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

module.exports = app;
