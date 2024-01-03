const mongoose = require("mongoose");
// Initialize parameters
const collectionName_favoriteCourse = 'favoriteCourses';

const favCoursesSchema = new mongoose.Schema({


  course_id: [{ 
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'courses'
  }],
  user_id: {
    type: String,
    required: true,
    ref:'users'
  },

});

const favoriteCourseModel = mongoose.model(collectionName_favoriteCourse, favCoursesSchema);

module.exports = favoriteCourseModel; 