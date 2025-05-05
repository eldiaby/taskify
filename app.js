// Load environment variables from the config.env file
require('dotenv').config({ path: './config.env' });

/* ─────────────────────────────────────────────────────── */
/* 📦 Core Packages */
/* ─────────────────────────────────────────────────────── */
const express = require('express'); // Import the express framework to create the server
const app = express(); // Initialize the express application
const morgan = require('morgan'); // Import morgan for logging HTTP requests
// const cors = require('cors'); // Import cors for Cross-Origin Resource Sharing

/* ─────────────────────────────────────────────────────── */
/* 🛠️ Custom Middleware */
/* ─────────────────────────────────────────────────────── */
const notFoundMiddleware = require('./middleware/notFoundHandlerMiddleware.js'); // Import custom 404 middleware
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware'); // Import custom error handling middleware

/* ─────────────────────────────────────────────────────── */
/* 🌐 App Configuration */
/* ─────────────────────────────────────────────────────── */
const port = process.env.PORT || 5000; // Set the port, using the one from environment variables or default to 5000

/* ─────────────────────────────────────────────────────── */
/* 🧰 Custom Modules */
/* ─────────────────────────────────────────────────────── */
const connectDB = require('./db/server.js'); // Import custom database connection module

// Routes
const authRouter = require('./routes/authRoutes.js');
const cookieParser = require('cookie-parser');

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

app.use(cookieParser(process.env.JWT_SECRET_KEY)); // Middleware to parse cookies from requests

// app routings

// app.use('/', (req, res) => {
//   res.send('API is working'); // Test route to check if the API is working
// });

app.use('/api/v1/auth', authRouter);

/* ─────────────────────────────────────────────────────── */
/* ⚠️ Error Handling Middleware */
/* ─────────────────────────────────────────────────────── */
app.use(notFoundMiddleware); // Middleware to handle 404 errors
// app.use(errorHandlerMiddleware); // Middleware to handle other errors

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
