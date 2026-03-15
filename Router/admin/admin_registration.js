const express = require("express");
const router = express.Router();
const Admin = require('./../../model/admin/Registration_Admin');
const Student = require('./../../model/student/Registration_form');
const OutingRequest = require('./../../model/student/outingRequest');


// router.post("/admin_register", async(req,res)=>{

// try{

//  const admin = new Admin(req.body);

// await admin.save();

// res.json({message:"Admin Registered"});

// }catch(err){

// res.status(500).json(err);

// }

// });

router.post("/admin_register", async (req, res) => {
  try {

    // const { phone } = req.body;
    const { name, phone, address, dob, gender, hostelName } = req.body;

    // Check if phone already exists
    const existingAdmin = await Admin.findOne({ phone ,name});

    if (existingAdmin) {
      return res.status(400).json({
        message: "Phone number already registered"
      });
    }

     // Phone length validation
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: "Phone number must be exactly 10 digits" });
    }

    const admin = new Admin(req.body);
    await admin.save();

    res.json({
      message: "Admin Registered Successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error",
      error: err.message
    });

  }
});

router.post("/login",async(req,res)=>{

const admin = await Admin.findOne({phone:req.body.phone});

if(!admin){

return res.json({message:"Admin not found"});

}

res.json({message:"Login success",admin});

});



// Student List API

router.get("/admin/students",async(req,res)=>{

const students = await Student.find();

res.json(students);

});

// Particular Student Details

router.get("/admin/student/:id",async(req,res)=>{

const student = await Student.findById(req.params.id);

res.json(student);

});

// Admin Dashboard API

router.get("/admin/dashboard",async(req,res)=>{

const totalStudents = await Student.countDocuments();

const paidStudents = await Student.countDocuments({
paymentStatus:"paid"
});

const unpaidStudents = await Student.countDocuments({
paymentStatus:"unpaid"
});

const pendingOuting = await OutingRequest.countDocuments({
status:"pending"
});

const approvedOuting = await OutingRequest.countDocuments({
status:"approved"
});

const rejectedOuting = await OutingRequest.countDocuments({
status:"rejected"
});

res.json({

totalStudents,
paidStudents,
unpaidStudents,
pendingOuting,
approvedOuting,
rejectedOuting

});

});


module.exports = router;
