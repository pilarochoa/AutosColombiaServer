const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cellSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  zone: {
    type: Schema.Types.ObjectId,
    ref: "Zone",
    required: true
  },
  cellStatus: {
    type: Schema.Types.ObjectId,
    ref: "CellStatus",
    required: true
  }
});

module.exports = mongoose.model('Cell', cellSchema);
