var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var app=express();
app.use(bodyParser.json());
var user=require('./router');
app.use('/router',user)
app.listen(8000);
console.log('test localhost');