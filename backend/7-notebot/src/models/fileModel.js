const mongoose = require("./dbconnection.js");
const {Schema} = mongoose;

// Define the schema for uploading files
const fileSchema = new Schema({
  filename: String,
  url: String,
  size: Number,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;