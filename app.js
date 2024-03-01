const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

// Connect to Database
const MongoURI = process.env.MongoURI;
mongoose
  .connect(MongoURI)
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error(`Error connecting to MongoDB: ${err.message}`));

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  !err
    ? console.log(`Server is running on port ${PORT}`)
    : console.error(`Error starting server: ${err.message}`)
);
