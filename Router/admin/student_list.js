


router.get("/admin/students",async(req,res)=>{

const students = await Student.find();

res.json(students);

});
