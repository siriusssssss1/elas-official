const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  notes: [{ 
    type: mongoose.Types.ObjectId,
    ref:'Note'
  }],
  user_id: {
    type: String,
    required: true,
    ref:'User'
  },

});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;