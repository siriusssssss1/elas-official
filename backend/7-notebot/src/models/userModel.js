/******
 * @Note This is one example, you can create more model files under
 * the models folder and export them. Make sure you import the models
 * in the index.js file under models folder.
 */

const mongoose = require("mongoose");
const collectionName_user = 'user';

/***************** START: DEFINE A SCHEMA *****************
 * @documentation
 * A user schema for MongoDB.
 */
const User = new mongoose.Schema({
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
      ref: 'notes'
    }
  ], 
  courses: [
    {
      type: mongoose.Types.ObjectId, 
      ref: 'courses'
    }
  ]
});
/***************** END: DEFINE A SCHEMA *****************/

module.exports = mongoose.model(collectionName_user, User);
