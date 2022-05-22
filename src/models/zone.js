const mongoose = require('mongoose');

const zoneSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Zona', zoneSchema);