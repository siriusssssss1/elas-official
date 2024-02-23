const mongoose = require('mongoose');

// Define the schema for drafts
const draftSchema = new mongoose.Schema({

    
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

const Draft = mongoose.model('Draft', draftSchema);

module.exports = Draft;
