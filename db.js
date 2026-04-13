const mongoose =require("mongoose");


// const mongoUrl ="mongodb://localhost:27017/Hostel_Management_System";
const mongoUrl = "mongodb+srv://raghuveersonkar827_db_user:SFLWNg3MjCovopkd@cluster0.akqp8xq.mongodb.net/";

// set up mongoDb

mongoose.connect(mongoUrl,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true

});


const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Connected mongoDb database");
    
});

db.on("disconnected",()=>{
    console.error("disconnect database");
    
});

db.on("error",(err)=>{
    console.error("MongoDb connection error :",err);
    
});


module.exports =db;