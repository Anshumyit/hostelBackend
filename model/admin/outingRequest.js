const mongoose = require('mongoose');

const approvalSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin","manager","parent"]
  },
  decision: {
    type: String,
    enum: ["approved","rejected"]
  },
  reason: String,
  decidedAt: Date
});

const OutingRequestSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegistrationForm"
  },

  reason: String,
  outingDate: Date,

  approvals: [approvalSchema],   // history array

  finalStatus: {
    type: String,
    enum: ["pending","approved","rejected"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("OutingRequest", OutingRequestSchema);
