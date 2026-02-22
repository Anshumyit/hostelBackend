const mongoose = require('mongoose');

const OutingRequestSchema = new mongoose.Schema({

    studentName: {
        type: String,
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegistrationForm",           
        required: true
    },

    outingDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },

//      approvals: [
//     {
//       role: String,
//       decision: String,
//       reason: String,
//       at: { type: Date, default: Date.now }
//     }
//   ],

    sendTo: {
        admin: { type: Boolean, default: true },
        manager: { type: Boolean, default: true },
        parent: { type: Boolean, default: true }
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    adminRemark: String,
   managerRemark: String,
   parentRemark: String

}, { timestamps: true })


module.exports = mongoose.model("OutingRequest", OutingRequestSchema);