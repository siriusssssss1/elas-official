const mongoose = require("./dbconnection.js");
const collectionName_file = 'file';

const fileSchema = new mongoose.Schema({
  filename: String,
  url: String,
  size: Number,
});

const fileModel = mongoose.model(collectionName_file, fileSchema);

module.exports = fileModel;