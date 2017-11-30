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
   MongoClient.connect(db,function(err,db){
       if(err){
           console.log(err)
       }
        
       db.collection('User').find({}).toArray(function(err,result){
           if(err){
               res.send('error')
           }
           else{
               res.json(result)
           }
       })
   })
       
})
app.listen(8000);
console.log('test localhost')