const express = require('express');
const router = express.Router();
const RegistrationFormPending =require('./../../model/student/Registration_form')



router.get('/pending', async (req, res) => {
  try {
    
     const students = await RegistrationFormPending
      .find({ isApproved: false }) // pending
      .select('-password');

    res.status(200).json({
    //   success: true,
    //   count: students.length,
      data: students
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.put('/approve/:id', async (req, res) => {
  try {
    const student = await RegistrationFormPending.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.isApproved) {
      return res.json({ message: 'Already approved' });
    }

    student.isApproved = true;  // approve student
    await student.save();

    res.json({
      message: 'Student approved successfully'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
