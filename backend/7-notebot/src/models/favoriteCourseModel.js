const mongoose = require("mongoose");

const favCoursesSchema = new mongoose.Schema({


  course_id: [{ 
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'Course'
  }],
  user_id: {
    type: String,
    required: true,
    ref:'User'
  },

});

const FavoriteCourse = mongoose.model('FavoriteCourse', favCoursesSchema);

module.exports = FavoriteCourse; 