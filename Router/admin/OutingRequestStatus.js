const express = require('express');
const router = express.Router();
const OutingRequest = require('./../../model/student/outingRequest');
const mongoose = require("mongoose");
const StudentModel = require('./../../model/student/Registration_form');

// router.put('/update-outing-status/:id', async (req, res) => {
//     try {
    

//         const { decision, reason } = req.body;
       
        
//         const role = req.user.role;
//         const outing = await OutingRequest.findById(req.params.id);
//         if (!outing) {
//             return res.status(404).json({ message: "Outing not found" });
//         }

//         // add decision history
//         outing.approvals.push({
//             role,
//             decision,
//             reason
//         });
//         // update final status
//         updateFinalStatus(outing);

//         await outing.save();

//         res.json({ message: "Decision updated" });
//     } catch (error) {
//         res.status(500).json({
//       message: error.message
//     });

//     }
// });

// ✅ STUDENT — MY OUTINGS
// exports.myOutings = async (req,res)=>{
//   const list = await OutingRequest
//     .find({ studentId: req.user.id })
//     .sort({createdAt:-1});

//   res.json(list);
// };


// ✅ ADMIN/MANAGER/PARENT — DECISION (PUT)
// exports.makeDecision = async (req,res)=>{
//   try {

//     const { decision, reason } = req.body;
//     const role = req.user.role;

//     if (!["approved","rejected"].includes(decision)) {
//       return res.status(400).json({
//         message:"Decision invalid"
//       });
//     }

//     const outing = await OutingRequest.findById(req.params.id);
//     if (!outing) {
//       return res.status(404).json({message:"Not found"});
//     }

//  exports.makeDecision = async (req,res)=>{
//   try {

//     const { decision, reason } = req.body;
//     const role = req.user.role;

//     if (!["approved","rejected"].includes(decision)) {
//       return res.status(400).json({
//         message:"Decision invalid"
//       });
//     }

//     const outing = await OutingRequest.findById(req.params.id);
//     if (!outing) {
//       return res.status(404).json({message:"Not found"});
//     }

//     // history add
//     outing.approvals.push({
//       role,
//       decision,
//       reason
//     });

//     updateFinalStatus(outing);

//     await outing.save();

//     notify(`Outing ${outing.finalStatus} by ${role}`);

//     res.json({
//       message:"Decision saved",
//       finalStatus: outing.finalStatus
//     });

//   } catch (err) {
//     res.status(500).json({error: err.message});
//   }
// };

router.put('/outing-decision/:id', async (req, res) => {
  try {

    console.log("body  dd:",req.body);
    

    const { decision, reason } = req.body;
    console.log(req.body);
    
    const role = req.user?.role;
    console.log(role);
    

    if (!role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!["approved", "rejected"].includes(decision)) {
      return res.status(400).json({ message: "Invalid decision" });
    }

    const outing = await OutingRequest.findById(req.params.id);

    if (!outing) {
      return res.status(404).json({ message: "Outing not found" });
    }

    outing.approvals.push({
      role,
      decision,
      reason
    });

    updateFinalStatus(outing);

    await outing.save();

    res.json({
      message: "Decision saved",
      finalStatus: outing.finalStatus
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// router.put('/outing-decision/:id', async (req, res) => {
//     try {
//         console.log("codn");
        
//         const { decision, reason } = req.body;
  

//          console.log("body ", req.body);
//         const role = req.user.role;
//         if (!["approved", "rejected"].includes(decision)) {
//             return res.status(400).json({
//                 message: "Decision invalid"
//             });
//         }
//         const outing = await OutingRequest.findById(req.params.id);
//         if (!outing) {
//             return res.status(404).json({ message: "Not found" });
//         }
//         // history add
//         outing.approvals.push({
//             role,
//             decision,
//             reason
//         });
//         updateFinalStatus(outing);  
//         await outing.save();
//         // notify(`Outing ${outing.finalStatus} by ${role}`);
//         res.json({ message: "Decision saved", finalStatus: outing.finalStatus });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     };

// });


  
  


//  ADMIN — ALL OUTINGS

router.get('/all-outings', async (req, res) => {
  try {
    const list = await OutingRequest
      .find()
      .populate("studentId", "name email")
      .sort({ createdAt: -1 });

    res.json(list);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//  FINAL STATUS LOGIC
function updateFinalStatus(outing){

  const latest = {};

  outing.approvals.forEach(a=>{
    latest[a.role] = a.decision;
  });

  if (Object.values(latest).includes("rejected")) {
    outing.finalStatus = "rejected";
  }
  else if (
    latest.admin === "approved" &&
    latest.manager === "approved" &&
    latest.parent === "approved"
  ){
    outing.finalStatus = "approved";
  }
  else {
    outing.finalStatus = "pending";
  }
}




module.exports = router;



