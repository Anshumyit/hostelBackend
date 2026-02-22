const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  breakfast: {
    items: [String],
    time: String
  },
  lunch: {
    items: [String],
    time: String
  },
  dinner: {
    items: [String],
    time: String
  }
});

module.exports = mongoose.model('Menu', menuSchema);
