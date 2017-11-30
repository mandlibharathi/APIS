var express=require('express');
var bodyParser=require('body-parser');
var MongoClient=require('mongodb').MongoClient;
var db='mongodb://localhost/Person';
var mongoose=require('mongoose');
var app=express();
app.use(bodyParser.json());
mongoose.connect(db);
var User=require('./schema')
app.get('/signup',function(req,res){
    User.find({}).exec(function(err,result){
        if(err){
            console.log(err)
        }
        else{
            res.json(results)
        }
    
    })
})
       

app.listen(8000);
console.log('test localhost')