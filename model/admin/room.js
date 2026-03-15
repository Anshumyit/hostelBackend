const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({

roomNumber:Number,

type:{
type:String,
enum:["single","double","triple"]
},

capacity:Number,

occupiedBeds:{
type:Number,
default:0
}

});

module.exports = mongoose.model("Room",roomSchema);
