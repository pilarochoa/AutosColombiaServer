const mongoose = require('mongoose');

const typeVehicleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tafifaMes: {
    type: Number,
    required: true,
  },
  tafifaDia: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('TypeVehicle', typeVehicleSchema);