const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({

    notes: [{ 
        type: mongoose.Types.ObjectId,
        ref:'notes'
    }],
    user_id: {
        type: String,
        required: true,
        ref:'users'
    },
    isPublic: {
        type: Boolean,
        default: false
    }
});

const Draft = mongoose.model('Draft', draftSchema);

module.exports = Draft;
