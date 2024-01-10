const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({

    
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

const Draft = mongoose.model('Draft', draftSchema);

module.exports = Draft;
