var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

let db = connectDB();
/* GET users listing. */
router.get('/', function(req, res, next) {
    if(db) {
        res.send("DB is connected");
    }
    else res.send("DB is not connected");
});

router.get("/all", async function(req, res, next){
    if(!db){
        res.status(500).send("DB is not connected");
    }
    else{
        const result = await studentmodel.find();
        res.send(result);
    }
});

router.get("/:studentId", async function(req, res, next){
    if(!db){
        res.status(500).send("DB is not connected");
    }
    else{
        const studentId = req.params.studentId;
        const result = await studentmodel.findOne({studentID: studentId});
        res.send(result);
    }
});

router.post("/", async function(req,res,next){
    const body = req.body;
    if(!db){
        res.status(500).send("DB is not connected");
    }
    else if(!body.studentID){
        res.status(400).send("no student id input");
    }
    else if(await studentmodel.findOne({studentID: body.studentID})){
        res.status(400).send("student already exists");
    }
    else{
        let data = await studentmodel.create({studentID: body.studentID, name: body.name, score: body.score});
        if(!await data.save()){
            res.status(500).send("Error on data save");
        }
        res.send(data);
    }
});

router.put("/:studentId", async function(req,res,next){
    const body = req.body;
    if(!db){
        res.status(500).send("DB is not connected");
    }
    else if(!req.params.studentId){
        res.status(400).send("no id input!");
    }
    else if(!await studentmodel.findOne({studentID: req.params.studentId})){
        res.status(404).send("student not exists");
    }
    else if(body.studentID){
        res.status(400).send("you can't update studentid");
    }
    else{
        const result = await studentmodel.updateOne({studentID: req.params.studentId}, {name: body.name ,
            score:body.score});

        res.send(await studentmodel.findOne({studentID: req.params.studentId}));
    }
})

router.delete("/:studentId", async function(req, res, next){
    if(!db){
        res.status(500).send("DB is not connected");
    }
    else if(!await studentmodel.findOne({studentID: req.params.studentId})){
        res.status(404).send("student not exists");
    }
    else{
        if(await studentmodel.deleteOne({studentId: req.params.studentId})){
            res.send("success");
        };
    }
})

async function connectDB(){
    await mongoose.connect("mongodb://localhost:27017", {
        dbName: "Lab09_201823785"
    });
    mongoose.connection.on('error', err =>{
        console.log(err);
    });
}

const studentSchema = new mongoose.Schema({
    studentID: {
        type: Number,
        required: true,
        unique: true
    },
    name: String,
    score: Number
});

const studentmodel = mongoose.model("students", studentSchema);

module.exports = router;