const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true
  }],
  icon: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Menu', menuSchema);
