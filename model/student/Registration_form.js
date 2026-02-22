const mongoose = require('mongoose');

const RegistrationFormSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      required: true
    },

    phoneNumber: {
      type: String,          // keep String (supports country code)
      required: true,
      unique: true,
      trim: true,
       match: [
        /^\+[1-9]\d{7,14}$/,
        'Please enter a valid international phone number with country code'
      ]
    },

    collegeName: {
      type: String,
      required: true
    },

    course: {
      type: String,
      required: true
    },

    fatherName: {
      type: String,
      required: true
    },

    hostelName: {
      type: String,
      required: true
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

     
    isApproved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('RegistrationForm', RegistrationFormSchema);
