var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

let db = connectDB();
/* GET users listing. */
router.get('/get', async function(req, res, next) {
    if(!db) {
        res.status(500).send("DB is not connected");
    }
    else{
        let studentId = req.query.data;
        const result = await studentmodel.findOne({studentID:studentId});
        if(result)
            res.status(200).send("data exists");
        else
            res.status(500).send("no data");
    }
});

router.post("/post", async function(req,res,next){
    const body = req.body.data;
    if(!db){
        res.status(500).send("DB is not connected");
    }
    else{
        let data = await studentmodel.create({studentID: body.studentId, koreanName: body.koreanName,
        englishName: body.englishName, subject: body.subject, imageUrl : body.imageUrl});
        if(!await data.save()){
            res.status(500).send("Error on data save");
        }
        res.send(data);
    }
});

router.delete("/delete", async function(req, res, next){
    let studentId = req.query.data
    if(!db){
        res.status(500).send("DB is not connected");
    }
    else{
        if(await studentmodel.deleteOne({studentId:studentId})){
            res.status(200).send("success");
        };
    }
})

async function connectDB(){
    await mongoose.connect("mongodb://localhost:27017", {
        dbName: "Lab12_201823785"
    });
    console.log("success");
    mongoose.connection.on('error', err =>{
        console.log(err);
    });
}

const studentSchema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true,
        unique: true
    },
    koreanName: String,
    englishName: String,
    subject: String,
    imageUrl: '',
});

const studentmodel = mongoose.model("students", studentSchema);

module.exports = router;