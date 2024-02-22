const mongoose = require("mongoose");
const collectionName_favorite = 'favoriteNotes';

const favNotesSchema = new mongoose.Schema({


  note_id: [{ 
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'notes'
  }],
  user_id: {
    type: String,
    required: true,
    ref:'users'
  },

});

const favoriteModel = mongoose.model(collectionName_favorite, favNotesSchema);

module.exports = favoriteModel;