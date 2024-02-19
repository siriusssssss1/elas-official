const mongoose = require('mongoose');
const collectionName_courses = 'courses';
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