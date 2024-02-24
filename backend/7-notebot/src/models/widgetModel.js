const mongoose = require("mongoose");
const {Schema} = mongoose;

//Schema for widgets
const widgetSchema = new Schema({
  
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  layout_index: {
    type: Number,
    required: true,
  },
  section_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Widget',
  },
});

const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
