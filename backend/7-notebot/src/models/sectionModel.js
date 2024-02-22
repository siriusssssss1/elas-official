const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  layout_field: {
    type: [Number],
  },
  note_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Note',
  },
  widgets: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Widget',
    },
  ],
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
