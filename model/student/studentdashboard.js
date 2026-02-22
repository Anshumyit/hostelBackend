const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  roomType: {
    type: String,
    enum: ["single", "double", "triple"]
  },

  roomNumber: String,

  planType: {
    type: String,
    enum: ["monthly", "yearly"]
  },

  planStart: Date,
  planEnd: Date,

  status: {
    type: String,
    enum: ["pending","approved","rejected"],
    default: "pending"
  }
});

module.exports = mongoose.model('Student', studentSchema);
