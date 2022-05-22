const mongoose = require('mongoose');

const cellStatusSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  available: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('CellStatus', cellStatusSchema);
