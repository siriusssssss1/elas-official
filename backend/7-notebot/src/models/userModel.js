const mongoose = require("mongoose");
const {Schema} = mongoose;

// Schema for user
const userSchema = new Schema({

  uid: {
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  notes: [{
      type: mongoose.Types.ObjectId, 
      ref: 'Note'
  }], 
  courses: [{
      type: mongoose.Types.ObjectId, 
      ref: 'Course'
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;