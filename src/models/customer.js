const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  typeDocument: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Customer', customerSchema);
