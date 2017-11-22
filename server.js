var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var app=express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/Person')
var db=mongoose.connection;
var user=require('./sehema')

app.get('/',function(req,res){
user.getuser(function(req,user){
    if(err){
        console.log(err)
    }
    else{
        res.json(user)
    }
})
})
app.listen(8000);
console.log('hello')