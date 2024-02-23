const mongoose = require("mongoose");

const {Schema} = mongoose;

// Define the schema for notes
const noteSchema = new Schema({

  // archive_from_id: {
  //   type: String,
  // },
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
  course_id: {
    type: String,
    ref:'Course'
  },
  sections: [{
    type: mongoose.Types.ObjectId, //Schema.Types.ObjectId?
    ref:'Section'
  }],
  saved_by: [{
    type: String, 
    ref: 'User'
  }],
  ratings: [{
      userId: { 
        type: String, 
        ref: 'User',
        required: true
      }, 
      rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
        required: true 
      },
  }],
},
{ timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
