// Load environment variables from the config.env file
require('dotenv').config({ path: './config.env' });

/* ─────────────────────────────────────────────────────── */
/* 📦 Core Package */
/* ─────────────────────────────────────────────────────── */
const express = require('express'); // Import the express framework to create the server
const app = express(); // Initialize the express application
const morgan = require('morgan'); // Import morgan for logging HTTP requests
// const cors = require('cors'); // Import cors for Cross-Origin Resource Sharing

/* ─────────────────────────────────────────────────────── */
/* 🌐 App Configuration */
/* ─────────────────────────────────────────────────────── */
const port = process.env.PORT || 5000; // Set the port, using the one from environment variables or default to 5000

/* ─────────────────────────────────────────────────────── */
/* 🛠️ Custom Modules */
/* ─────────────────────────────────────────────────────── */
const connectDB = require('./db/connectDB'); // Import custom database connection module

/* ─────────────────────────────────────────────────────── */
/* 🔍 Dev Logging (only in development mode) */
/* ─────────────────────────────────────────────────────── */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny')); // Morgan logging for development environment
}

/* ─────────────────────────────────────────────────────── */
/* 🧰 Global Middleware */
/* ─────────────────────────────────────────────────────── */
app.use(express.json()); // Middleware to parse incoming JSON payloads from requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data (useful for form submissions)

/* ─────────────────────────────────────────────────────── */
/* 🚀 Start the Server and Connect to DB */
/* ─────────────────────────────────────────────────────── */
const start = async () => {
  try {
    await connectDB(); // Connect to the MongoDB database
    app.listen(port, () => {
      // Start the Express server on the specified port
      console.log(`Server is running on port ${port}`); // Log server start
    });
  } catch (error) {
    console.log(error); // Log any errors that occur during server startup or DB connection
  }
};

// Call the start function to initialize the application
start();
