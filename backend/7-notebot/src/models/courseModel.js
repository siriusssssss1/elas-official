const mongoose = require('mongoose');
// Initialize parameters
const collectionName_courses = 'courses';
//2
//define structure of the documents in a collection
const courseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  notes: [{ 
    type: mongoose.Types.ObjectId,
    ref:'notes'
  }],
  user_id: {
    type: String,
    required: true,
    ref:'users'
  },

});

const courseModel = mongoose.model(collectionName_courses, courseSchema);

module.exports = courseModel;