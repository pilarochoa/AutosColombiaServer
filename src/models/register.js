const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = mongoose.Schema({
  placa: {
    type: String,
    required: true,
  },
  typeVehicle: {
    type: Schema.Types.ObjectId,
    ref: "TypeVehicle",
    required: true
  },
  userEnter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userRemove: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  cell: {
    type: Schema.Types.ObjectId,
    ref: "Cell",
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  dateInicio: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('Register', registerSchema);
