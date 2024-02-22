const mongoose = require("mongoose");
const collectionName_sections = 'sections';

const sectionSchema = new mongoose.Schema({
  layout_field: {
    type: [Number],
  },
  note_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "notes",
  },
  widgets: [
    {
      type: mongoose.Types.ObjectId,
      ref: "widgets",
    },
  ],
});

const sectionModel = mongoose.model(collectionName_sections, sectionSchema);

module.exports = sectionModel;
