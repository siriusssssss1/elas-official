const mongoose = require("./dbconnection.js");

const fileSchema = new mongoose.Schema({
  filename: String,
  url: String,
  size: Number,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;