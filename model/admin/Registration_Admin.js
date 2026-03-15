const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

name:{type:String, required:true},

phone:{
type:String,
unique:true
},

address:{type:String, required:true},

dob:{type:Date, required:true},

gender:{type:String, required:true},

// hostelName:{type:String, required:true}
  hostelName:[{ 
    type:String,
    required:true
  }]

});

module.exports = mongoose.model("Admin",adminSchema);
