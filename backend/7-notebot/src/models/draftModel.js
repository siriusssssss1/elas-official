const mongoose = require("mongoose");
// Initialize parameters
const collectionName_draft = 'draftNotes';

//define structure of the documents in a collection
const draftNotesSchema = new mongoose.Schema({


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

const draftModel = mongoose.model(collectionName_draft, draftNotesSchema);

module.exports = draftModel;