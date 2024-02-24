const mongoose = require("mongoose");
const {Schema} = mongoose;

//Schema for sections
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
      type: String,
      ref: 'Widget',
  }],
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
