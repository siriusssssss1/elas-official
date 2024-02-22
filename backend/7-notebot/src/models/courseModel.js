// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for the course
const courseSchema = new mongoose.Schema({
  // Title of the course
  title: {
    type: String,
    required: true, // Title is required
  },
  // Notes related to the course,
  notes: [{ 
    type: mongoose.Types.ObjectId, 
    ref: 'Note' // Notes are referenced from the Note model
  }],
  // User ID of the user who owns the course, a required field of type String
  user_id: {
    type: String,
    required: true, 
    ref: 'User' // User is referenced from the User model
  },
});

// Create the Course model using the defined schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
