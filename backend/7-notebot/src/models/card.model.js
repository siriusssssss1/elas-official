/******
 * @Note This is one example, you can create more model files under
 * the models folder and export them. Make sure you import the models
 * in the index.js file under models folder.
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/***************** START: DEFINE A SCHEMA *****************
 * @documentation
 * A card schema for MongoDB.
 */
const Card = new Schema({
  title: { type: String, required: true },
  isFavorite: { type: Boolean, required: true },
  rating: { type: Number, required: true },
});
/***************** END: DEFINE A SCHEMA *****************/

module.exports = mongoose.model("card", Card);
