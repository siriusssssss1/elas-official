/******
 * @Note This is one example, you can create more model files under
 * the models folder and export them. Make sure you import the models
 * in the index.js file under models folder.
 */

const mongoose = require("mongoose");
const {Schema} = mongoose;

/***************** START: DEFINE A SCHEMA *****************
 * @documentation
 * Schema for user
 */
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
/***************** END: DEFINE A SCHEMA *****************/

const User = mongoose.model('User', userSchema);

module.exports = User;