// Import the mongoose library
const mongoose = require('mongoose');

// Create the MongoDB connection URL with the new URL
const dbURI = 'mongodb://localhost:27017';

// Connect to the MongoDB server with the provided URL and options 
mongoose.connect(dbURI, {
    // Options can be added here if needed
});

// Get a reference to the default Mongoose connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;
