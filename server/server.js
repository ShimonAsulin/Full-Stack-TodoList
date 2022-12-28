require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const cors = require('cors')
const app = express();

// routes
const todo = require("./routers/todo");

// Connect Database
connectDB();

app.use(cors({ origin: true, credentials: true }));

// initialize middleware
app.use(express.json({ extendedd: false })); //{extendedd:false}
// app.get("/", (req, res) => res.send("Server up and running!"));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "..", 'client', 'build', 'index.html'));
});

// use routes
app.use("/api/todo", todo);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});