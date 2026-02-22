// const express =require('express');
// const router=express.Router();
// const RegistrationForm =require('./../model/student/Registration_form')


// router.post('/',async(req,res)=>{
//     try {

//         const data=req.body;

//         // Create new Person document
//         const Registration_Student =new RegistrationForm(data);

//         // Save to database
//         const response = await Registration_Student.save();
//         console.log("data saved");

//         res.status(200).json({
//             success: true,
//             message:"Student registered successfully"

//         })

//         return response;


//     } catch (error) {
//         console.log(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
// })


// module.exports = router;


const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const RegistrationForm = require('./../model/student/Registration_form')
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

router.post('/', async (req, res) => {
  try {
    const { password, confirmPassword, ...data } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({ message: 'Password is required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const exists = await RegistrationForm.findOne({
      $or: [
        { emailId: data.emailId },
        { phoneNumber: data.phoneNumber }
      ]
    });

    if (exists) {
      return res.status(400).json({ message: 'Already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new RegistrationForm({
      ...data,
      password: hashedPassword,
      status: 'pending' // optional but useful  for admin approval flow
    });

    await student.save();
    const payload = {
      id: student._id,
      email: student.emailId
    };

    // console.log(JSON.stringify("Stringify : ",payload));
    JSON.stringify("Stringify : ", payload)
    console.log
      ("Payload is: ", payload);


    const token = generateToken("Token Generate", payload);
    console.log("Token is: ", token);



    res.status(201).json({
      success: true,
      message: 'Registration submitted. Wait for admin approval.',
      // response: student,
      token: token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// router.get('/', async (req, res) => {
//   try {
//     const students = await RegistrationForm.find(); 
//     res.status(200).json(students);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }});


// LOGIN
router.post('/login', async (req, res) => {
  try {
     const { emailId, password } = req.body;

  const student = await RegistrationForm.findOne({ emailId });

  if (!student || !student.isApproved) {
    return res.status(403).json({ message: 'Not approved' });
  }

  const match = await bcrypt.compare(password, student.password);

  if (!match) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

 
  const payload = {
    id: student._id,
    email: student.emailId
  };
  const token = generateToken("Token Generate", payload);
   res.json({ message: 'Login success', token });
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


//  get all registrations

router.get('/', async (req, res) => {
  try {
    const students = await RegistrationForm.find();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
