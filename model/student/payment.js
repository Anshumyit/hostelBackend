const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Student"
},

amount:Number,

paymentDate:{
type:Date,
default:Date.now
},

expiryDate:Date,

status:{
type:String,
enum:["paid","expired"]
}

});

module.exports = mongoose.model("Payment",paymentSchema);
