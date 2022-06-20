const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymnetSchema = mongoose.Schema({
  placa: {
    type: String,
    required: true,
  },
  datePayment: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model('Payment', paymnetSchema);