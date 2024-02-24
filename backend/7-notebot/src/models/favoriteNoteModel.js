const mongoose = require("mongoose");
const {Schema} = mongoose;

//Schema for favorite notes
const favNotesSchema = new Schema({

  note_id: [{ 
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'Note'
  }],
  user_id: {
    type: String,
    required: true,
    ref:'User'
  },
});

const FavoriteNote = mongoose.model('FavoriteNote', favNotesSchema);

module.exports = FavoriteNote;