const mongoose = require("mongoose");
const {Schema} = mongoose;

// Define the schema for sections
const sectionSchema = new Schema({

  layout_field: {
    type: [Number],
  },
  note_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Note',
  },
  widgets: [{
      type: mongoose.Types.ObjectId,
      ref: 'Widget',
  }],
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
