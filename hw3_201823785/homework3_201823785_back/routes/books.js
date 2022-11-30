var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

let db = connectDB();

router.post('/post', async function(req,res,next){
    const body = req.body.data;
    if(!db)
        res.status(500).send("DB is not connected");
    else{
        let data = await bookmodel.create({bookId: body.bookId, bookName: body.bookName,
            bookAuthor: body.bookAuthor, bookInfo: body.bookInfo, publishedYear: Number(body.bookPublishedYear)});
        if(!await data.save()){
            res.status(500).send("Error on data save");
        }
        res.send(data);
    }
});

router.delete("/delete", async function(req, res, next){
    let inputBookId = req.query.data;
    if(!db){
        res.status(500).send("DB is not connected");
    }
    else {
        const result = await bookmodel.findOne({bookId: inputBookId});
        if(!result)
            res.status(400).send("no data exits cannot delete");
        else{
            if(await bookmodel.deleteOne({bookId:inputBookId})){
                res.status(200).send("success");
            }
        }
    }
});

async function connectDB(){
    await mongoose.connect("mongodb://localhost:27017", {
        dbName: "homework3_201823785"
    });
    console.log("success");
    mongoose.connection.on('error', err=>{
        console.log(err);
    });
}

const bookSchema = new mongoose.Schema({
    bookId:{
        type: Number,
        required: true,
        unique: true
    },
    bookName: {
        type: String,
        required:true
    },
    bookAuthor: {
        type: String,
        required:true
    },
    bookInfo:{
        type: String
    },
    publishedYear:{
        type: Number,
        required:true
    },
});

const bookmodel = mongoose.model("books", bookSchema);

module.exports = router;