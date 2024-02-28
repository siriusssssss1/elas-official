const mongoose = require('mongoose');
const {Schema} = mongoose;

// Schema for courses
const courseSchema = new Schema({
  
  title: {
    type: String,
    required: true, 
  },
  notes: [{ 
    type: mongoose.Types.ObjectId, 
    ref: 'Note' 
  }],
  user_id: {
    type: String,
    required: true, 
    ref: 'User' 
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
