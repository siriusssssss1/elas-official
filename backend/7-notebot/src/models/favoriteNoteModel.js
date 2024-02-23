const mongoose = require("mongoose");
const {Schema} = mongoose;

// Define the schema for favorite Notes
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