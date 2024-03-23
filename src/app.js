const express = require("express");
const userRouter = require("./routes"); // Importing the user routes
const app = express(); // Creating an instance of the Express application

app.use(express.json()); // Middleware to parse incoming JSON requests

app.use("/api", userRouter); // Mounting the userRouter at the "/api" endpoint

// Default route handler for the root URL "/"
app.use("/", (req, res) =>
  res.status(200).send("<h2>GitHub Explorer server running............</h2>")
);

module.exports = app; // Exporting the Express application instance
