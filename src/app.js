const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

/*app.post("/students",(req,res)=>{
    //fetching from postman
    const user = new Student(req.body);
    res.send("Students Details");
    //sending data to mongodb
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((error)=>{
        res.status(400).send(error);
    })
})*/

app.post("/students", async (req, res) => {
    try {
        //fetching data from postman
        const user = new Student(req.body);
        //pushing data into mongodb
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.get("/students", async(req, res)=>{
    try{
        const studentData = await Student.find();
        res.send(studentData);
    }catch(error){
        res.send(error);
    }
})

app.get("/students/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
         const studentsData = await Student.findById(_id);
        res.send(studentsData);
        if(!studentsData){
            return res.status(404).send();
        }
        else{
            return res.send(studentsData);
        }
    }catch(error){
        res.send(error);
    }
})

app.patch("/students/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateStudent);
    }catch(error){
        res.send(error);
    }
})

app.delete("/students/:id", async(req, res)=>{
    try{
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
        if(!deleteStudent){
            return res.status(404).send();
        }else{
        res.send(deleteStudent);
        }
    }catch(error){
        res.send(error);
    }
})

app.listen(port, () => {
    console.log(`Connection is successful at ${port}`);
})