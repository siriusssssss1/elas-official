const mongoose = require("mongoose");
const collectionName_notes = 'notes';

const noteSchema = new mongoose.Schema({

  archive_from_id: {
    type: String,
  },
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
    ref:'courses'
  },
  sections: [{
    type: mongoose.Types.ObjectId,
    ref:'sections'
  }],
 
  saved_by: [{
    type: String, 
    ref: 'users'
  }],
  ratings: [
    {
      userId: { type: String, ref: "users" }, 
      rating: { type: Number, min: 1, max: 5, required: true },
    },
  ],
},
{ timestamps: true }
);

const noteModel = mongoose.model(collectionName_notes, noteSchema);

module.exports = noteModel;
