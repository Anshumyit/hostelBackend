const express = require('express');
const router = express.Router();
const OutingRequest = require('./../model/student/outingRequest');

router.post('/create-outing', async  (req, res) => {
    try {

        const { studentName, studentId,  outingDate, returnDate, reason, sendTo } = req.body;
        const newOutingRequest =  await  OutingRequest.create({
            studentId,
            studentName,
            outingDate,
            returnDate,
            reason,
            sendTo,
    //          approvals: [],
      finalStatus: "pending"
        });
        res.status(201).json({
            message: "Outing request sent",
            status: newOutingRequest.finalStatus
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// Student — MY OUTINGS seen by studentId in query for simplicity, can be from token in real app with auth middleware
router.get('/my-outings', async (req, res) => {
    try {
        const { studentId } = req.query;
         if (!studentId) {
            return res.status(400).json({
                message: "studentId is required"
            });
        }

        // const list = await OutingRequest.find({ studentId: studentId }).sort({ createdAt: -1 });
        const list = await OutingRequest.find({
            studentId: new mongoose.Types.ObjectId(studentId)
        }).sort({ createdAt: -1 });

         res.json({
            count: list.length,
            data: list
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// single outing status for student, can be used by student to check status of their outing request

router.get("/outing-status/:id", async (req, res) => {
  try {

    const outing = await OutingRequest.findById(req.params.id);

    if (!outing) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      status: outing.status,
      adminRemark: outing.adminRemark,
      managerRemark: outing.managerRemark,
      parentRemark: outing.parentRemark
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






module.exports = router;
