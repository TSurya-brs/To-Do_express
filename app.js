// server.js
const express = require("express");
const app = express();
const port = 3000;

let tasks = []; // Store tasks in memory (you could replace this with a database)

// Middleware to serve static files
app.use(express.static("public"));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Route to add a task
app.get("/add/:task", (req, res) => {
  const task = req.params.task;
  tasks.push(task);
  res.send(task);
});

// Route to remove a task
app.get("/remove/:task", (req, res) => {
  const task = req.params.task;
  tasks = tasks.filter((t) => t !== task);
  res.send("Task removed");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
