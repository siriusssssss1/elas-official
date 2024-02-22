/******
 * @Note This is one example, you can create more model files under
 * the models folder and export them. Make sure you import the models
 * in the index.js file under models folder.
 */

const mongoose = require("mongoose");

/***************** START: DEFINE A SCHEMA *****************
 * @documentation
 * A user schema for MongoDB.
 */
const userModel = new mongoose.Schema({
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
  notes: [
    {
      type: mongoose.Types.ObjectId, 
      ref: 'Note'
    }
  ], 
  courses: [
    {
      type: mongoose.Types.ObjectId, 
      ref: 'Course'
    }
  ]
});
/***************** END: DEFINE A SCHEMA *****************/

const User = mongoose.model('User', widgetSchema);

module.exports = User;