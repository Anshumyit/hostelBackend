router.get("/dashboard",async(req,res)=>{

const Student = require("../models/Student");
const Room = require("../models/Room");
const Outing = require("../models/OutingRequest");

const totalStudents = await Student.countDocuments();

const pendingOutings = await Outing.countDocuments({status:"pending"});

const approvedOutings = await Outing.countDocuments({status:"approved"});

const rejectedOutings = await Outing.countDocuments({status:"rejected"});

const rooms = await Room.find();

res.json({
totalStudents,
pendingOutings,
approvedOutings,
rejectedOutings,
rooms
});

});
